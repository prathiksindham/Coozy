#!/usr/bin/env python3
"""Static file server for the app + a keyless YouTube search endpoint.

Run:  python3 server.py   (serves http://localhost:4747)
Search: GET /api/search?q=...  -> {"items":[{id,title,artist}, ...]}

Search works server-side (no API key, no browser CORS limits) by reading the
ytInitialData JSON that YouTube embeds in its results page.
"""
import base64
import hashlib
import hmac
import json
import os
import re
import tarfile
import time
import threading
import urllib.request
import urllib.parse
import urllib.error
import zipfile
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

import auth   # Google sign-in + per-user playlist storage

PORT = 4747

# ---- Vosk on-device wake-word model ----------------------------------------
# The browser runs the "Maya" wake word fully locally (no cloud, nothing sent
# until she's called). It needs a small speech model. This machine has internet,
# so we fetch it once on first launch, repackage it as the .tar.gz vosk-browser
# expects, and serve it from /models. The client polls /api/wake-status.
VOSK_MODEL = "vosk-model-small-en-us-0.15"
VOSK_ZIP_URL = f"https://alphacephei.com/vosk/models/{VOSK_MODEL}.zip"
MODELS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models")
VOSK_TARGZ = os.path.join(MODELS_DIR, f"{VOSK_MODEL}.tar.gz")
VOSK = {"ready": False, "state": "idle", "error": None}   # surfaced at /api/wake-status


def _ensure_vosk_model():
    """Download + repackage the wake-word model once; idempotent."""
    try:
        if os.path.exists(VOSK_TARGZ) and os.path.getsize(VOSK_TARGZ) > 1_000_000:
            VOSK.update(ready=True, state="ready"); return
        os.makedirs(MODELS_DIR, exist_ok=True)
        VOSK.update(state="downloading")
        zip_path = os.path.join(MODELS_DIR, VOSK_MODEL + ".zip")
        req = urllib.request.Request(VOSK_ZIP_URL, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=180) as r, open(zip_path, "wb") as f:
            while True:
                chunk = r.read(262144)
                if not chunk:
                    break
                f.write(chunk)
        VOSK.update(state="unpacking")
        with zipfile.ZipFile(zip_path) as z:
            z.extractall(MODELS_DIR)
        model_dir = os.path.join(MODELS_DIR, VOSK_MODEL)
        if not os.path.isdir(model_dir):
            raise RuntimeError("model folder missing after unzip")
        tmp = VOSK_TARGZ + ".part"
        with tarfile.open(tmp, "w:gz") as t:
            t.add(model_dir, arcname=VOSK_MODEL)   # keep the top-level folder in the tar
        os.replace(tmp, VOSK_TARGZ)
        try:
            os.remove(zip_path)
        except OSError:
            pass
        VOSK.update(ready=True, state="ready", error=None)
        print(f"Wake-word model ready ({VOSK_MODEL}).")
    except Exception as e:  # noqa — wake word just stays unavailable
        VOSK.update(ready=False, state="error", error=str(e))
        print(f"Wake-word model unavailable ({e}).")


def _load_env():
    """Pull persona/.env (KEY=VALUE per line) into os.environ without clobbering
    the shell — one gitignored file holds every secret (LLM + LiveKit keys)."""
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "persona", ".env")
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


_load_env()
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
# The googlevideo URL yt-dlp resolves via the "android" client expects this UA.
ANDROID_UA = "com.google.android.youtube/19.09.37 (Linux; U; Android 12) gzip"

# Resolve a YouTube video id -> a direct audio stream URL (cached; those URLs
# stay valid for hours). This is what lets playback bypass the blocked IFrame
# embed entirely: the browser just plays /api/audio?id=... as a normal <audio>.
_audio_cache = {}          # id -> (stream_url, expiry_epoch)
_audio_lock = threading.Lock()


def resolve_audio(vid):
    now = time.time()
    with _audio_lock:
        hit = _audio_cache.get(vid)
        if hit and hit[1] > now:
            return hit[0]
    import yt_dlp  # imported lazily so the server still starts if it's missing
    opts = {
        "format": "bestaudio[ext=m4a]/bestaudio/best",
        "quiet": True, "no_warnings": True, "noplaylist": True,
        "extractor_args": {"youtube": {"player_client": ["android"]}},
    }
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info("https://www.youtube.com/watch?v=" + vid, download=False)
    url = info["url"]
    with _audio_lock:
        _audio_cache[vid] = (url, now + 5 * 3600)
    return url


def yt_search(query, limit=12):
    url = "https://www.youtube.com/results?" + urllib.parse.urlencode(
        {"search_query": query, "sp": "EgIQAQ%3D%3D"}  # sp = filter: videos
    )
    req = urllib.request.Request(
        url, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"}
    )
    html = urllib.request.urlopen(req, timeout=12).read().decode("utf-8", "replace")

    m = re.search(r"var ytInitialData = (\{.*?\});</script>", html)
    if not m:
        m = re.search(r'ytInitialData"\]\s*=\s*(\{.*?\});', html)
    if not m:
        return []
    data = json.loads(m.group(1))

    out, seen = [], set()

    def text_of(node):
        if not isinstance(node, dict):
            return ""
        if "runs" in node:
            return "".join(r.get("text", "") for r in node["runs"])
        return node.get("simpleText", "")

    def walk(o):
        if len(out) >= limit:
            return
        if isinstance(o, dict):
            vr = o.get("videoRenderer")
            if vr and vr.get("videoId"):
                vid = vr["videoId"]
                if vid not in seen:
                    seen.add(vid)
                    artist = ""
                    for k in ("ownerText", "longBylineText", "shortBylineText"):
                        artist = text_of(vr.get(k, {}))
                        if artist:
                            break
                    out.append({
                        "id": vid,
                        "title": text_of(vr.get("title", {})),
                        "artist": artist,
                    })
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)

    walk(data)
    return out[:limit]


def itunes_cover(term):
    """Look up the real square album cover for a song (no API key)."""
    url = "https://itunes.apple.com/search?" + urllib.parse.urlencode(
        {"term": term, "media": "music", "entity": "song", "limit": 1}
    )
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    j = json.loads(urllib.request.urlopen(req, timeout=8).read().decode("utf-8", "replace"))
    results = j.get("results") or []
    if not results:
        return None
    art = results[0].get("artworkUrl100") or ""
    if not art:
        return None
    # upscale the 100x100 thumbnail URL to a large square cover
    return art.replace("100x100bb", "600x600bb")


# ============================================================
# Lyrics — time-synced ("Apple Music style") lyrics from LRCLIB (free, keyless,
# https://lrclib.net). We ask for an exact match first (artist+title+duration),
# then fall back to a fuzzy search. LRC is parsed server-side into a simple
# [{t: seconds, text}] list so the client just highlights + scrolls.
# ============================================================

_LYR_CACHE = {}   # key -> parsed result (small in-memory cache)

_LRC_RE = re.compile(r"\[(\d+):(\d+(?:\.\d+)?)\]")


def _parse_lrc(lrc):
    """Turn an LRC string into a sorted [{t, text}] list (t = seconds)."""
    out = []
    for line in (lrc or "").splitlines():
        stamps = list(_LRC_RE.finditer(line))
        if not stamps:
            continue
        text = _LRC_RE.sub("", line).strip()
        for m in stamps:                       # a line can carry several timestamps
            t = int(m.group(1)) * 60 + float(m.group(2))
            out.append({"t": round(t, 2), "text": text})
    out.sort(key=lambda r: r["t"])
    return out


def _lrclib_fetch(url):
    """Fetch a URL from lrclib.net, retrying on connection failures.

    The network path to lrclib.net can be flaky (intermittent connection-refused
    and slow responses that still finish around 6-8s), so we use a generous
    per-attempt timeout and several retries — a tight timeout was cutting off
    responses that would otherwise have succeeded.
    """
    req = urllib.request.Request(url, headers={
        "User-Agent": "retro-music-player (https://github.com/local/music)",
    })
    last_err = None
    for attempt in range(5):
        try:
            return urllib.request.urlopen(req, timeout=12).read().decode("utf-8", "replace")
        except urllib.error.HTTPError:
            raise  # don't retry HTTP errors (404 etc), only connection issues
        except Exception as e:
            last_err = e
            time.sleep(0.5 * (attempt + 1))
    raise last_err


def _lrclib_get(params):
    url = "https://lrclib.net/api/get?" + urllib.parse.urlencode(params)
    return json.loads(_lrclib_fetch(url))


def _lrclib_search(q):
    url = "https://lrclib.net/api/search?" + urllib.parse.urlencode({"q": q})
    arr = json.loads(_lrclib_fetch(url))
    return arr if isinstance(arr, list) else []


def fetch_lyrics(artist, title, duration=None):
    """Return {synced:[{t,text}]|None, plain:str|None, found:bool, error:str|None}."""
    key = (artist or "").lower().strip() + "|" + (title or "").lower().strip()
    if key in _LYR_CACHE:
        return _LYR_CACHE[key]

    rec = None
    api_error = None
    # 1) exact get (best quality; needs a decent artist/title/duration)
    if artist and title:
        p = {"artist_name": artist, "track_name": title}
        if duration:
            p["duration"] = int(float(duration))
        try:
            rec = _lrclib_get(p)
        except urllib.error.HTTPError as e:
            if e.code != 404:
                api_error = "lrclib HTTP %d" % e.code
            rec = None
        except Exception as e:
            api_error = str(e)
            rec = None

    # 2) fuzzy search fallback — pick the first hit that has synced lyrics.
    #    Runs even when the exact get errored: lrclib's search endpoint often
    #    succeeds where a slow/timed-out get didn't, and it's our ONLY source of
    #    *synced* lyrics (the yt/gemini fallbacks below are plain-text only).
    if not rec:
        try:
            hits = _lrclib_search(((title or "") + " " + (artist or "")).strip())
            api_error = None       # search reached lrclib, so clear the get error
        except Exception as e:
            hits = []
            api_error = api_error or str(e)
        if hits:
            rec = next((h for h in hits if h.get("syncedLyrics")), None) or hits[0]

    # 3) YouTube lyrics-video fallback — scrape lyrics from video descriptions
    #    (YouTube is reachable even when lrclib is slow, and covers tracks that
    #    lrclib simply doesn't have). Plain-text only.
    #    NB: these plain-text fallbacks are NOT cached — they're a best-effort
    #    substitute used when lrclib was unreachable, so we want to retry lrclib
    #    (for real *synced* lyrics) next time rather than pin the song to plain.
    if not rec:
        try:
            plain_text = _yt_lyrics(artist, title)
            if plain_text:
                return {"synced": None, "plain": plain_text, "found": True, "error": None}
        except Exception:
            pass

    # 4) Gemini AI fallback — when both lrclib and YouTube fail
    if not rec:
        try:
            plain_text = _gemini_lyrics(artist, title)
            if plain_text:
                return {"synced": None, "plain": plain_text, "found": True, "error": None}
        except Exception:
            pass

    if not rec:
        res = {"synced": None, "plain": None, "found": False, "error": api_error}
        if not api_error:
            _LYR_CACHE[key] = res  # only cache true negatives, not network errors
        return res

    synced = _parse_lrc(rec.get("syncedLyrics")) or None
    plain = rec.get("plainLyrics") or None
    res = {"synced": synced, "plain": plain, "found": bool(synced or plain), "error": None}
    _LYR_CACHE[key] = res
    return res


def _yt_lyrics(artist, title):
    """Search YouTube for a lyrics video and extract lyrics from its description."""
    query = "%s %s lyrics" % (artist, title)
    # 1. Search YouTube for lyrics videos (reuses the same scraping as yt_search)
    url = "https://www.youtube.com/results?" + urllib.parse.urlencode(
        {"search_query": query, "sp": "EgIQAQ%3D%3D"})
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
    html = urllib.request.urlopen(req, timeout=12).read().decode("utf-8", "replace")
    m = re.search(r"var ytInitialData = (\{.*?\});</script>", html)
    if not m:
        m = re.search(r'ytInitialData"]\s*=\s*(\{.*?\});', html)
    if not m:
        return None
    data = json.loads(m.group(1))

    # 2. Collect video IDs that have "lyric" in the title
    vids = []
    def _walk(o):
        if len(vids) >= 3:
            return
        if isinstance(o, dict):
            vr = o.get("videoRenderer")
            if vr and vr.get("videoId"):
                t = ""
                title_obj = vr.get("title", {})
                if "runs" in title_obj:
                    t = "".join(r.get("text", "") for r in title_obj["runs"])
                elif "simpleText" in title_obj:
                    t = title_obj["simpleText"]
                if "lyric" in t.lower():
                    vids.append(vr["videoId"])
            for v in o.values():
                _walk(v)
        elif isinstance(o, list):
            for v in o:
                _walk(v)
    _walk(data)
    if not vids:
        return None

    # 3. Fetch each video page and extract description
    for vid in vids:
        vurl = "https://www.youtube.com/watch?v=" + vid
        vreq = urllib.request.Request(vurl, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
        try:
            vhtml = urllib.request.urlopen(vreq, timeout=12).read().decode("utf-8", "replace")
        except Exception:
            continue
        pm = re.search(r"var ytInitialPlayerResponse\s*=\s*(\{.*?\});\s*(?:var|</)", vhtml)
        if not pm:
            continue
        pdata = json.loads(pm.group(1))
        desc = pdata.get("videoDetails", {}).get("shortDescription", "")
        text = _extract_lyrics_from_desc(desc)
        if text and len(text) > 50:
            return text
    return None


def _extract_lyrics_from_desc(desc):
    """Parse the lyrics block out of a YouTube video description."""
    lines = desc.split("\n")
    start = -1
    for i, line in enumerate(lines):
        s = line.strip().lower()
        if s in ("lyrics:", "lyrics", "lyrics :", "lyrics:", "♪ lyrics"):
            start = i + 1
            break
        if re.match(r"^\[?(verse|chorus|intro|hook|refrain|bridge|pre.chorus|outro)", s):
            start = i
            break
    if start < 0:
        return None

    lyric_lines = []
    blank_count = 0
    for line in lines[start:]:
        stripped = line.strip()
        # Stop at common footer markers
        low = stripped.lower()
        if re.match(r"^(#|🎵|⚡|⏬|📸|📷|🚫|http|follow|subscribe|copyright|©|\(c\)|credits|produced|written by|more from|connect with|listen to|download|stream|if you want)", low):
            break
        if not stripped:
            blank_count += 1
            if blank_count > 3:
                break
            lyric_lines.append("")
            continue
        blank_count = 0
        lyric_lines.append(stripped)

    # Remove section headers like [Chorus], [Verse 1]
    cleaned = []
    for l in lyric_lines:
        if re.match(r"^\[.*\]$", l):
            cleaned.append("")
        else:
            cleaned.append(l)

    text = "\n".join(cleaned).strip()
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text if len(text) > 30 else None

def _gemini_lyrics(artist, title):
    """Ask Gemini for plain lyrics as a fallback when lrclib is unreachable."""
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        return None
    url = ("https://generativelanguage.googleapis.com/v1beta/models/"
           "gemini-2.0-flash-lite:generateContent?key=" + api_key)
    prompt = (
        'Return ONLY the complete plain-text lyrics for the song "%s" by "%s". '
        'Rules: output ONLY the lyrics, one line per line. No title, no credits, '
        'no commentary, no markdown, no annotations, no section labels like [Chorus]. '
        'If you do not know the lyrics, respond with exactly: NO_LYRICS_FOUND'
    ) % (title, artist)
    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.0, "maxOutputTokens": 3000},
    }).encode()
    req = urllib.request.Request(url, data=body,
                                headers={"Content-Type": "application/json"})
    resp = urllib.request.urlopen(req, timeout=15)
    data = json.loads(resp.read().decode("utf-8", "replace"))
    text = (data.get("candidates") or [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
    text = text.strip()
    if not text or "NO_LYRICS_FOUND" in text:
        return None
    return text


# ============================================================
# LiveKit — mint a short-lived join token server-side so the API SECRET never
# reaches the browser. A LiveKit access token is just a JWT (HS256) signed with
# the API secret; we build it with stdlib to avoid a server-sdk dependency.
# Credentials come from persona/.env:  LIVEKIT_URL / LIVEKIT_API_KEY / LIVEKIT_API_SECRET
# ============================================================

def _b64url(raw):
    return base64.urlsafe_b64encode(raw).rstrip(b"=").decode("ascii")


def livekit_config():
    return (os.environ.get("LIVEKIT_URL", ""),
            os.environ.get("LIVEKIT_API_KEY", ""),
            os.environ.get("LIVEKIT_API_SECRET", ""))


def _lk_jwt(video_grant, identity, name=None, ttl=6 * 3600):
    """Sign a LiveKit access token (JWT/HS256) with the given VideoGrant."""
    _, api_key, api_secret = livekit_config()
    if not api_key or not api_secret:
        raise RuntimeError("LiveKit not configured (set LIVEKIT_API_KEY / LIVEKIT_API_SECRET in persona/.env)")
    now = int(time.time())
    payload = {"iss": api_key, "sub": identity, "nbf": now - 10, "iat": now,
               "exp": now + ttl, "video": video_grant}
    if name:
        payload["name"] = name
    header = _b64url(json.dumps({"alg": "HS256", "typ": "JWT"}, separators=(",", ":")).encode())
    body = _b64url(json.dumps(payload, separators=(",", ":")).encode())
    signing_input = header + "." + body
    sig = hmac.new(api_secret.encode(), signing_input.encode(), hashlib.sha256).digest()
    return signing_input + "." + _b64url(sig)


def mint_livekit_token(room, identity, name, ttl=6 * 3600):
    """A member JOIN token — the browser uses this to connect. Data channel is
    how Phase 3/4 sync playback + chat."""
    return _lk_jwt({"room": room, "roomJoin": True, "canPublish": True,
                    "canSubscribe": True, "canPublishData": True}, identity, name, ttl)


def _lk_http_base():
    url, _, _ = livekit_config()
    return url.replace("wss://", "https://").replace("ws://", "http://").rstrip("/")


def _lk_rpc(method, body, grant):
    token = _lk_jwt(grant, "server-persona", ttl=120)
    req = urllib.request.Request(
        _lk_http_base() + "/twirp/livekit.RoomService/" + method,
        data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.status


def livekit_send_data(room, obj):
    """Inject a JSON data message into a room server-side (RoomService.SendData),
    signed with an admin token. This is how the AI persona 'speaks' into the room
    without running a separate bot participant — the server is her voice."""
    payload = base64.b64encode(json.dumps(obj, separators=(",", ":")).encode()).decode("ascii")
    body = {"room": room, "data": payload, "kind": "RELIABLE", "destination_identities": []}
    grant = {"room": room, "roomAdmin": True}
    try:
        return _lk_rpc("SendData", body, grant)
    except urllib.error.HTTPError as e:
        if e.code != 404:
            raise
        # LiveKit rooms only exist while occupied; ensure it, then retry once.
        _lk_rpc("CreateRoom", {"name": room}, {"roomCreate": True})
        return _lk_rpc("SendData", body, grant)


# ---- AI persona (Phase 4): one conversation per room, in-memory ----
_personas = {}                 # room_code -> persona.Persona
_persona_lock = threading.Lock()
_last_react = {}               # room_code -> (track_key, epoch)  (dedupe track reactions)
_ground_cache = {}             # track_key -> TrackGrounding (so repeat questions don't re-fetch)


def _track_key(tr):
    return (tr.get("spotify") or tr.get("yt") or tr.get("audio")
            or ((tr.get("artist") or "") + "-" + (tr.get("title") or "")))


def _ground_cached(tr):
    key = _track_key(tr)
    g = _ground_cache.get(key)
    if g is None:
        from persona import grounding
        artist, title = tr.get("artist") or "", tr.get("title") or ""
        q = (artist + " - " + title).strip(" -") or title
        g = grounding.ground(q)
        _ground_cache[key] = g
    return g


def _persona_for(room):
    with _persona_lock:
        p = _personas.get(room)
        if p is None:
            from persona.persona import Persona   # lazy: keeps server startup light
            p = Persona()
            _personas[room] = p
        return p


# ---- Sable's voice: local neural TTS (Piper) — natural, free, no API key ----
_TTS_MODEL = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                          "persona", "voices", "en_US-amy-medium.onnx")
_piper = None
_piper_lock = threading.Lock()
_tts_cache = {}                 # sha -> wav bytes
_tts_order = []                 # LRU order (cap the cache)


def _piper_voice():
    global _piper
    with _piper_lock:
        if _piper is None:
            from piper import PiperVoice
            _piper = PiperVoice.load(_TTS_MODEL)
        return _piper


def tts_wav(text):
    """Synthesize `text` to WAV bytes (cached by content, so replays are free)."""
    key = hashlib.sha1(text.encode("utf-8")).hexdigest()[:20]
    hit = _tts_cache.get(key)
    if hit:
        return hit
    import io, wave
    buf = io.BytesIO()
    with _piper_lock:                       # serialize onnx synthesis
        voice = _piper if _piper is not None else None
    if voice is None:
        voice = _piper_voice()
    with wave.open(buf, "wb") as w:
        voice.synthesize_wav(text, w)
    data = buf.getvalue()
    _tts_cache[key] = data
    _tts_order.append(key)
    while len(_tts_order) > 48:
        _tts_cache.pop(_tts_order.pop(0), None)
    return data


IMG_HOSTS = ("mzstatic.com", "ytimg.com", "youtube.com")  # allowlist for the image proxy


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Never cache the app code/markup, so edits show up on a plain reload
        # (no more cache-busting ?v= dance, no stale JS fighting us).
        page = self.path.split("?")[0]
        if page in ("/", "") or page.endswith((".html", ".js", ".css")):
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        # ---- auth / per-user playlists ----
        if self.path.startswith("/api/auth/config"):
            self._json(200, json.dumps({"clientId": os.environ.get("GOOGLE_CLIENT_ID", "")}).encode())
            return
        if self.path.startswith("/api/me"):
            u = auth.get_user(self._uid())
            self._json(200, json.dumps({"ok": bool(u), "user": u}).encode())
            return
        if self.path.startswith("/api/logout"):
            self._json_cookie(200, b'{"ok":true}', auth.clear_cookie(self._secure()))
            return
        if self.path.startswith("/api/playlists"):
            uid = self._uid()
            if not uid:
                self._json(401, b'{"ok":false,"error":"not signed in"}'); return
            pls = auth.get_playlists(uid)
            self._json(200, json.dumps({"ok": True, "playlists": pls}).encode())
            return

        if self.path.startswith("/api/wake-status"):
            body = json.dumps(VOSK).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        if self.path.startswith("/api/cover"):
            qs = urllib.parse.urlparse(self.path).query
            term = urllib.parse.parse_qs(qs).get("term", [""])[0]
            try:
                art = itunes_cover(term) if term else None
                body = json.dumps({"art": art}).encode()
            except Exception as e:  # noqa
                body = json.dumps({"art": None, "error": str(e)}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        if self.path.startswith("/api/lyrics"):
            qs = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            artist = (qs.get("artist", [""])[0] or "").strip()
            title = (qs.get("title", [""])[0] or "").strip()
            dur = (qs.get("duration", [""])[0] or "").strip()
            try:
                data = fetch_lyrics(artist, title, dur or None)
                body = json.dumps({"ok": True, **data}).encode()
            except Exception as e:  # noqa
                body = json.dumps({"ok": False, "synced": None, "plain": None,
                                   "found": False, "error": str(e)}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        if self.path.startswith("/api/img"):
            qs = urllib.parse.urlparse(self.path).query
            src = urllib.parse.parse_qs(qs).get("url", [""])[0]
            host = urllib.parse.urlparse(src).netloc
            if not src.startswith("https://") or not any(h in host for h in IMG_HOSTS):
                self.send_response(400); self.end_headers(); return
            try:
                req = urllib.request.Request(src, headers={"User-Agent": UA})
                resp = urllib.request.urlopen(req, timeout=10)
                img = resp.read()
                self.send_response(200)
                self.send_header("Content-Type", resp.headers.get("Content-Type", "image/jpeg"))
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Content-Length", str(len(img)))
                self.end_headers()
                self.wfile.write(img)
            except Exception:
                self.send_response(502); self.end_headers()
            return

        if self.path.startswith("/api/audio"):
            qs = urllib.parse.urlparse(self.path).query
            vid = urllib.parse.parse_qs(qs).get("id", [""])[0]
            if not re.fullmatch(r"[A-Za-z0-9_-]{11}", vid or ""):
                self.send_response(400); self.end_headers(); return
            try:
                self._stream_audio(vid, self.headers.get("Range"))
            except Exception:
                try:
                    self.send_response(502); self.end_headers()
                except Exception:
                    pass
            return

        if self.path.startswith("/api/tts"):
            qs = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            text = (qs.get("text", [""])[0] or "").strip()[:1200]
            if not text:
                self.send_response(400); self.end_headers(); return
            try:
                data = tts_wav(text)
                self.send_response(200)
                self.send_header("Content-Type", "audio/wav")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
            except Exception:
                try: self.send_response(500); self.end_headers()
                except Exception: pass
            return

        if self.path.startswith("/api/room-config"):
            url, key, secret = livekit_config()
            ready = bool(url and key and secret)
            body = json.dumps({"ready": ready, "url": url if ready else ""}).encode()
            self._json(200, body)
            return

        if self.path.startswith("/api/livekit-token"):
            qs = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            room = (qs.get("room", [""])[0] or "").strip().lower()
            name = (qs.get("name", [""])[0] or "").strip()
            if not re.fullmatch(r"[a-z0-9-]{3,32}", room) or not (1 <= len(name) <= 40):
                self._json(400, json.dumps({"error": "bad room code or name"}).encode())
                return
            # unique identity per join so multiple people/tabs coexist in the member list
            identity = re.sub(r"[^a-zA-Z0-9]", "", name)[:20] + "-" + os.urandom(4).hex()
            try:
                token = mint_livekit_token(room, identity, name)
                body = json.dumps({"token": token, "url": livekit_config()[0],
                                   "identity": identity, "room": room}).encode()
                self._json(200, body)
            except Exception as e:  # noqa
                self._json(503, json.dumps({"error": str(e)}).encode())
            return

        if self.path.startswith("/api/search"):
            qs = urllib.parse.urlparse(self.path).query
            q = urllib.parse.parse_qs(qs).get("q", [""])[0]
            try:
                items = yt_search(q) if q else []
                body = json.dumps({"items": items}).encode()
                status = 200
            except Exception as e:  # noqa
                body = json.dumps({"error": str(e)}).encode()
                status = 500
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        return super().do_GET()

    def _stream_audio(self, vid, rng):
        resp, last_err = None, None
        for attempt in range(4):
            try:
                url = resolve_audio(vid)
                headers = {"User-Agent": ANDROID_UA}
                if rng:
                    headers["Range"] = rng
                resp = urllib.request.urlopen(
                    urllib.request.Request(url, headers=headers), timeout=20)
                break
            except urllib.error.HTTPError as e:
                last_err = e
                if e.code in (403, 410):
                    with _audio_lock:        # stale/expired URL -> re-resolve next loop
                        _audio_cache.pop(vid, None)
                else:
                    raise
            except urllib.error.URLError as e:
                last_err = e                 # transient connection refusal -> back off
                time.sleep(0.3 * (attempt + 1))
        if resp is None:
            raise last_err
        self.send_response(resp.status)          # 206 for a Range req, else 200
        self.send_header("Content-Type", resp.headers.get("Content-Type", "audio/mp4"))
        for h in ("Content-Length", "Content-Range"):
            v = resp.headers.get(h)
            if v:
                self.send_header(h, v)
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        while True:
            chunk = resp.read(65536)
            if not chunk:
                break
            try:
                self.wfile.write(chunk)
            except (BrokenPipeError, ConnectionResetError):
                break                            # listener seeked/skipped -> stop

    def do_POST(self):
        if self.path.startswith("/api/persona"):
            self._persona()
            return
        if self.path.startswith("/api/auth/google"):
            self._auth_google()
            return
        if self.path.startswith("/api/playlists"):
            self._save_playlists()
            return
        self.send_response(404); self.end_headers()

    def do_PUT(self):
        if self.path.startswith("/api/playlists"):
            self._save_playlists()
            return
        self.send_response(404); self.end_headers()

    # ---- auth helpers -------------------------------------------------------
    def _uid(self):
        return auth.read_session(self.headers.get("Cookie"))

    def _secure(self):
        host = (self.headers.get("Host") or "").split(":")[0]
        return host not in ("localhost", "127.0.0.1", "")   # no Secure flag on local http

    def _body_json(self):
        try:
            n = int(self.headers.get("Content-Length") or 0)
            return json.loads(self.rfile.read(n).decode("utf-8", "replace") or "{}")
        except Exception:
            return None

    def _json_cookie(self, status, body, cookie):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()
        self.wfile.write(body)

    def _auth_google(self):
        req = self._body_json()
        if req is None:
            self._json(400, b'{"ok":false,"error":"bad json"}'); return
        client_id = os.environ.get("GOOGLE_CLIENT_ID", "")
        if not client_id:
            self._json(500, b'{"ok":false,"error":"Sign-in not configured on the server (GOOGLE_CLIENT_ID missing)."}'); return
        claims = auth.verify_google(req.get("credential"), client_id)
        if not claims:
            self._json(401, b'{"ok":false,"error":"Google sign-in failed. Please try again."}'); return
        user = auth.upsert_user(claims.get("sub"), claims.get("email", ""),
                                claims.get("name", ""), claims.get("picture", ""))
        cookie = auth.session_cookie(user["id"], self._secure())
        self._json_cookie(200, json.dumps({"ok": True, "user": user}).encode(), cookie)

    def _save_playlists(self):
        uid = self._uid()
        if not uid:
            self._json(401, b'{"ok":false,"error":"not signed in"}'); return
        req = self._body_json()
        if req is None or not isinstance(req.get("playlists"), list):
            self._json(400, b'{"ok":false,"error":"bad payload"}'); return
        auth.save_playlists(uid, req["playlists"])
        self._json(200, b'{"ok":true}')

    def _persona(self):
        try:
            n = int(self.headers.get("Content-Length") or 0)
            req = json.loads(self.rfile.read(n).decode("utf-8", "replace") or "{}")
        except Exception:
            self._json(400, b'{"error":"bad json"}'); return
        room = (req.get("room") or "").strip().lower()
        kind = req.get("kind")
        solo = bool(req.get("solo"))    # solo = 1-on-1 with Sable, no LiveKit room to inject into
        if not re.fullmatch(r"[a-z0-9-]{3,32}", room):
            self._json(400, b'{"error":"bad room"}'); return

        try:
            if kind == "track":
                tr = req.get("track") or {}
                key = tr.get("spotify") or tr.get("yt") or tr.get("audio") or tr.get("title") or ""
                if not key:
                    self._json(200, b'{"ok":true,"skipped":"no track"}'); return
                now = time.time()                       # dedupe repeat reactions to the same track
                prev = _last_react.get(room)
                if prev and prev[0] == key and now - prev[1] < 45:
                    self._json(200, b'{"ok":true,"skipped":"duplicate"}'); return
                _last_react[room] = (key, now)
                from persona import grounding
                artist, title = tr.get("artist") or "", tr.get("title") or ""
                q = (artist + " - " + title).strip(" -") or title
                g = grounding.ground(q)
                text = _persona_for(room).react_to_track(g)
            elif kind == "chat":
                who = (req.get("from") or "someone").strip()[:40]
                msg = (req.get("text") or "").strip()[:600]
                if not msg:
                    self._json(200, b'{"ok":true,"skipped":"empty"}'); return
                tr = req.get("track") or {}
                if tr.get("title"):
                    # Ground the currently-playing track so "who produced this?",
                    # "what's this about?", "do you like it?" get real answers.
                    g = _ground_cached(tr)
                    playing = "playing now" if req.get("playing") else "cued up"
                    ctx = ("[The song " + playing + " in the room is \"" + (tr.get("title") or "?")
                           + "\" by " + (tr.get("artist") or "?") + ". Real data on it:\n"
                           + g.render() + "\n]\nWhen I say \"this song\"/\"it\", I mean that track. "
                           + who + " asks: " + msg)
                else:
                    ctx = f"{who} says: {msg}"
                # Let the agent call client-side tools (create_playlist). tool_calls
                # is [] unless the model chose to call one (Anthropic provider only).
                from persona.tools import PLAYLIST_TOOLS
                text, tool_calls = _persona_for(room).reply_with_tools(ctx, PLAYLIST_TOOLS)
            else:
                self._json(400, b'{"error":"bad kind"}'); return

            if not solo:            # in a room -> inject so everyone hears her; solo -> just return it
                livekit_send_data(room, {"t": "chat", "from": "Sable", "bot": True,
                                         "text": text, "at": int(time.time() * 1000)})
            out = {"ok": True, "text": text}
            if kind == "chat" and tool_calls:   # relay tool calls for the browser to execute
                out["tool_calls"] = [{"name": c["name"], "input": c["input"]} for c in tool_calls]
            self._json(200, json.dumps(out).encode())
        except Exception as e:  # noqa — surface, don't crash the room
            note = "Sable can't respond right now."
            if "429" in str(e) or "quota" in str(e).lower() or "exhaust" in str(e).lower():
                note = "Sable's AI is rate-limited (free quota hit). Check the LLM key/quota in persona/.env."
            elif "GROQ_API_KEY" in str(e) or "GEMINI_API_KEY" in str(e) or "not configured" in str(e).lower():
                note = "Sable has no AI key set. Add one to persona/.env."
            if not solo:                          # surface the reason in-room, don't fail silently
                try:
                    livekit_send_data(room, {"t": "chat", "from": "Sable", "system": True,
                                             "text": "⚠️ " + note, "at": int(time.time() * 1000)})
                except Exception:
                    pass
            self._json(500, json.dumps({"error": str(e), "note": note}).encode())

    def _json(self, status, body):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        # Never cache app files -> the browser always gets the latest (no stale versions)
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, *args):
        try:                                   # log only /api/* so we can trace voice routing
            if "/api/" in self.path:
                with open("/tmp/api.log", "a") as f:
                    f.write(time.strftime("%H:%M:%S ") + (self.command or "?") + " " + self.path[:140] + "\n")
        except Exception:
            pass


def _prewarm_tts():
    try:
        _piper_voice()                 # load the model + warm the onnx session
        tts_wav("Ready.")
        print("Sable voice (Piper) ready.")
    except Exception as e:             # noqa — voice just falls back to the browser
        print(f"Sable voice unavailable ({e}); falling back to browser speech.")


if __name__ == "__main__":
    print(f"music app + search on http://localhost:{PORT}")
    threading.Thread(target=_prewarm_tts, daemon=True).start()
    threading.Thread(target=_ensure_vosk_model, daemon=True).start()
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
