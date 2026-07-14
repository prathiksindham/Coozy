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

# Port + bind host come from the environment when hosted (Render/Railway/etc.
# set $PORT); default to the local dev values otherwise.
PORT = int(os.environ.get("PORT", "4747"))
HOST = os.environ.get("HOST", "0.0.0.0")

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

# Auto-select LLM provider based on available API keys so the app works on Render
# without manual env var configuration. Priority: explicit LLM_PROVIDER > gemini > groq > anthropic.
if not os.environ.get("LLM_PROVIDER"):
    if os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY"):
        os.environ["LLM_PROVIDER"] = "gemini"
    elif os.environ.get("GROQ_API_KEY"):
        os.environ["LLM_PROVIDER"] = "groq"
    elif os.environ.get("ANTHROPIC_API_KEY"):
        os.environ["LLM_PROVIDER"] = "anthropic"

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
        if len(out) >= limit * 3:
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

    # Prioritize Official Audio / Topic / Lyrics tracks over Music Videos with skits/intro acting
    q_low = query.lower()
    if not any(w in q_low for w in ("video", "live", "visualizer")):
        def _audio_score(r):
            t = (r.get("title") or "").lower()
            a = (r.get("artist") or "").lower()
            score = 0
            if "official audio" in t or "official audio" in a or " - topic" in a or t.endswith(" - topic"):
                score += 40
            elif "lyrics" in t or "lyric video" in t:
                score += 25
            if any(bad in t for bad in ("official video", "music video", "official music video", "short film", "visualizer", "live at", "live from")):
                score -= 50
            return score
        out.sort(key=_audio_score, reverse=True)

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

_LYR_CACHE = {}   # key -> parsed result
_LYR_CACHE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "lyrics_cache.json")
_LYR_LOCK = threading.Lock()      # guards cache + in-flight bookkeeping
_LYR_INFLIGHT = {}                # key -> threading.Event, set when the fetch finishes

# lrclib.net answers in 7-12s on a good day and sometimes never (it's the
# upstream that's slow — TCP/TLS connect takes 0.4s, first byte 7s+). The
# clients abort at 20-25s, so the WHOLE lookup (lrclib + fallbacks) must fit
# inside this budget or the user sees "couldn't reach lyrics server" for
# lyrics that were actually on their way.
_LYR_BUDGET_S = 16
_LRCLIB_PHASE_S = 10

def _lyr_cache_load():
    """Warm the cache from disk — a song fetched once never pays the lrclib tax again."""
    try:
        with open(_LYR_CACHE_PATH, "r", encoding="utf-8") as f:
            _LYR_CACHE.update(json.load(f))
        print("[lyrics] cache: %d songs loaded" % len(_LYR_CACHE))
    except FileNotFoundError:
        pass
    except Exception as e:
        print("[lyrics] cache load failed:", e)

def _lyr_cache_persist():
    """Atomic write-through of the cache (called with _LYR_LOCK held)."""
    try:
        os.makedirs(os.path.dirname(_LYR_CACHE_PATH), exist_ok=True)
        tmp = _LYR_CACHE_PATH + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(_LYR_CACHE, f, ensure_ascii=False)
        os.replace(tmp, _LYR_CACHE_PATH)
    except Exception as e:
        print("[lyrics] cache save failed:", e)

_lyr_cache_load()

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


def _synthesize_lrc_timestamps(plain_text, duration):
    """Generate smooth estimated timestamps across duration for plain text lines

    so any song with plain lyrics (from YouTube, Gemini, or LRCLIB plain) still gets
    smooth scrolling word/line animation.
    """
    if not plain_text:
        return None
    lines = [l.strip() for l in plain_text.splitlines() if l.strip()]
    if not lines:
        return None
    try:
        dur = float(duration) if duration and float(duration) > 20 else 180.0
    except Exception:
        dur = 180.0
    start_t = 6.0
    end_t = max(start_t + 10.0, dur - 10.0)
    if len(lines) == 1:
        return [{"t": round(start_t, 2), "text": lines[0]}]
    step = (end_t - start_t) / (len(lines) - 1)
    out = []
    for i, l in enumerate(lines):
        out.append({"t": round(start_t + i * step, 2), "text": l})
    return out


def _lrclib_fetch(url, deadline):
    """Fetch a URL from lrclib.net within a hard deadline.

    lrclib itself is the slow part (7-12s to first byte, occasionally never),
    so every attempt's timeout is clamped to the time remaining in this
    request's budget — the old open-ended retry ladder could grind for minutes
    after every client had already given up.
    """
    req = urllib.request.Request(url, headers={
        "User-Agent": "retro-music-player (https://github.com/local/music)",
    })
    last_err = None
    for attempt in range(2):
        remaining = deadline - time.time()
        if remaining < 1.5:
            break
        try:
            return urllib.request.urlopen(req, timeout=min(9, remaining)).read().decode("utf-8", "replace")
        except urllib.error.HTTPError:
            raise  # don't retry HTTP errors (404 etc), only connection issues
        except Exception as e:
            last_err = e
    raise last_err or TimeoutError("lrclib budget exhausted")


def _lrclib_get(params, deadline):
    url = "https://lrclib.net/api/get?" + urllib.parse.urlencode(params)
    return json.loads(_lrclib_fetch(url, deadline))


def _lrclib_search(q, deadline):
    url = "https://lrclib.net/api/search?" + urllib.parse.urlencode({"q": q})
    arr = json.loads(_lrclib_fetch(url, deadline))
    return arr if isinstance(arr, list) else []


# Decoration / feature tokens that make a YouTube-derived title fail to match a
# clean LRCLIB entry. Stripped for a second, more lenient search pass so tracks
# that ARE on LRCLIB (just under a cleaner name) still resolve.
_SEARCH_STRIP_RE = re.compile(
    r"\s*[\(\[][^)\]]*[\)\]]"                        # any (...) or [...] group
    r"|\s*(?:feat\.?|ft\.?|featuring|with)\b.*$",    # a trailing feat/ft/with clause
    re.I)


def _clean_for_search(s):
    """Drop '(Official Video)', '(feat. X)', '(remix)', '[4K]', trailing 'ft. …', etc."""
    return _SEARCH_STRIP_RE.sub("", s or "").strip(" -–—|").strip()


def _is_non_lyric_line(l):
    """Detect section markers ([Verse], (Chorus)), credits (Produced by...), speaker tags, and URLs."""
    if not l:
        return True
    s = l.strip()
    if not s:
        return True
    low = s.lower()
    # 1. Structural section cues or stage directions
    if re.match(r"^\[.*\]$", s) or re.match(r"^\(.*(?:chorus|verse|hook|bridge|intro|outro|interlude|solo|break|beat|repeat|refrain|skit|fade|ad-lib|vocal).*\)$", s, flags=re.I) or re.match(r"^-+.*-+$", s):
        return True
    # 2. Credits, attributions, and release metadata
    if re.match(r"^(#|🎵|⚡|⏬|📸|📷|🚫|http|www\.|follow|subscribe|copyright|©|\(c\)|℗|\(p\)|credits|produced|written by|more from|connect with|listen to|download|stream|if you want|presents|lyrical video|official video|official audio|music video by|directed by|shot by|mixed by|mastered by|album:|track:|song:|singer:|artist:|management:|booking:|released on:|composer|lyricist|associated performer|studio personnel|vocals:|source:|transcribed by:|synced by:|lrc by:|uploaded by:|contributed by:|title:|label:|records|release date:)", low):
        return True
    if "provided to youtube by" in low or "auto-generated by youtube" in low:
        return True
    # Check if line looks like a credit e.g. "Producer: WondaGurl", "Written by Caleb Toliver"
    if ":" in s:
        parts = s.split(":", 1)
        role = parts[0].strip().lower()
        if len(role.split()) <= 4 and any(w in role for w in ("producer", "director", "editor", "mixer", "engineer", "performer", "composer", "lyricist", "vocals", "guitar", "drums", "bass", "writer", "written", "label", "records", "released", "source", "title", "artist", "album", "track", "music", "video", "audio", "credit", "presents", "presented")):
            return True
    # Check if line contains inline credits
    if any(k in low for k in ("produced by ", "written by ", "composed by ", "mixed by ", "mastered by ", "directed by ", "lyrics by ", "music by ", "video by ", "beat by ", "www.", "http://", "https://", "instagram.com", "tiktok.com", "twitter.com", "youtube.com")):
        return True
    return False


def _clean_lyric_text(text):
    """Strip leading section cues or speaker tags ([Verse 1:] or Travis Scott:) from a lyric line."""
    if not text:
        return ""
    # Strip leading [Verse 1:] or (Chorus:) or [Chorus - Travis Scott]
    text = re.sub(r"^\[(?:Verse|Chorus|Hook|Bridge|Intro|Outro|Refrain|Pre-Chorus|Interlude)[^\]]*\]\s*:\s*", "", text, flags=re.I)
    text = re.sub(r"^\[(?:Verse|Chorus|Hook|Bridge|Intro|Outro|Refrain|Pre-Chorus|Interlude)[^\]]*\]\s*", "", text, flags=re.I)
    text = re.sub(r"^\([^)]*(?:Verse|Chorus|Hook|Bridge|Intro|Outro|Refrain)[^)]*\)\s*:\s*", "", text, flags=re.I)
    text = re.sub(r"^\([^)]*(?:Verse|Chorus|Hook|Bridge|Intro|Outro|Refrain)[^)]*\)\s*", "", text, flags=re.I)
    # Strip leading artist speaker tags like "Don Toliver: Last week we went back" or "[Travis Scott:] Yeah"
    text = re.sub(r"^\[?[A-Z][a-zA-Z0-9\s,.&'-]{1,25}:\]?\s*(?=[A-Z0-9'\"(♪])", "", text)
    return text.strip()


def _sanitize_lyrics_result(res, duration=180.0):
    """Clean every synced and plain line in res to guarantee no credits, section cues, or URLs remain."""
    if not res or not isinstance(res, dict) or not res.get("found"):
        return res
    synced = res.get("synced")
    if synced and isinstance(synced, list):
        clean_synced = []
        for r in synced:
            if not isinstance(r, dict):
                continue
            t = r.get("t", 0)
            txt = _clean_lyric_text(r.get("text", ""))
            if not _is_non_lyric_line(txt):
                clean_synced.append({"t": round(float(t), 2), "text": txt})
        res["synced"] = clean_synced if clean_synced else None

    plain = res.get("plain")
    if plain and isinstance(plain, str):
        clean_plain = []
        for line in plain.splitlines():
            txt = _clean_lyric_text(line)
            if not _is_non_lyric_line(txt):
                clean_plain.append(txt)
        res["plain"] = "\n".join(clean_plain).strip() if clean_plain else None

    if not res.get("synced") and res.get("plain"):
        res["synced"] = _synthesize_lrc_timestamps(res["plain"], duration)

    if not res.get("synced") and not res.get("plain"):
        res["found"] = False
    return res


def clear_lyrics_cache():
    """Flush the in-memory AND on-disk lyrics cache so the next fetch is fresh."""
    with _LYR_LOCK:
        count = len(_LYR_CACHE)
        _LYR_CACHE.clear()
        _lyr_cache_persist()
    print("[lyrics] cache cleared (%d entries removed)" % count)
    return count


def fetch_lyrics(artist, title, duration=None):
    """Return {synced:[{t,text}]|None, plain:str|None, found:bool, error:str|None}.

    Coalesced: concurrent requests for the same song (the lyric view and the
    camera lyrics effect both ask) share one upstream fetch instead of each
    grinding lrclib on their own.
    """
    try:
        dur_float = float(duration) if duration else 0.0
    except (ValueError, TypeError):
        dur_float = 0.0
    dur_bucket = str(int(dur_float)) if dur_float else "0"
    base_key = (artist or "").lower().strip() + "|" + (title or "").lower().strip()
    key = base_key + "|" + dur_bucket
    while True:
        with _LYR_LOCK:
            if key in _LYR_CACHE and (_LYR_CACHE[key].get("synced") or _LYR_CACHE[key].get("plain")):
                return _sanitize_lyrics_result(dict(_LYR_CACHE[key]), dur_float)
            for k, val in _LYR_CACHE.items():
                if k.startswith(base_key + "|") and (val.get("synced") or val.get("plain")):
                    return _sanitize_lyrics_result(dict(val), dur_float)
            evt = _LYR_INFLIGHT.get(key)
            if evt is None:
                _LYR_INFLIGHT[key] = threading.Event()
                break                      # we own the fetch
        evt.wait(timeout=_LYR_BUDGET_S + 5)  # someone else is fetching; wait for them
        with _LYR_LOCK:
            if key in _LYR_CACHE and (_LYR_CACHE[key].get("synced") or _LYR_CACHE[key].get("plain")):
                return _sanitize_lyrics_result(dict(_LYR_CACHE[key]), dur_float)
            for k, val in _LYR_CACHE.items():
                if k.startswith(base_key + "|") and (val.get("synced") or val.get("plain")):
                    return _sanitize_lyrics_result(dict(val), dur_float)
        if evt.is_set():                   # owner finished but result wasn't cacheable
            break                          # (network error) — do our own attempt
    try:
        res = _fetch_lyrics_uncached(key, artist, title, dur_float)
        return _sanitize_lyrics_result(res, dur_float)
    finally:
        with _LYR_LOCK:
            evt = _LYR_INFLIGHT.pop(key, None)
        if evt:
            evt.set()


def _fetch_lyrics_uncached(key, artist, title, duration):
    start = time.time()
    lrclib_deadline = start + _LRCLIB_PHASE_S
    budget_deadline = start + _LYR_BUDGET_S

    try:
        dur = float(duration) if duration else 0.0
    except (ValueError, TypeError):
        dur = 0.0

    rec = None
    api_error = None
    # 1) exact get (best quality; needs a decent artist/title/duration)
    if artist and title:
        p = {"artist_name": artist, "track_name": title}
        if dur:
            p["duration"] = int(dur)
        try:
            rec = _lrclib_get(p, lrclib_deadline)
        except urllib.error.HTTPError as e:
            if e.code != 404:
                api_error = "lrclib HTTP %d" % e.code
            rec = None
        except Exception as e:
            api_error = str(e)
            rec = None

    # 2) fuzzy search fallback — pick the first hit that has synced lyrics.
    #    Runs even when exact get errored OR returned only plain text without synced lyrics.
    if not rec or not rec.get("syncedLyrics"):
        queries = []
        q_raw = ((title or "") + " " + (artist or "")).strip()
        if q_raw:
            queries.append(q_raw)
        ct = _clean_for_search(title)
        ca = _clean_for_search(artist)
        if ct and ca:
            queries.append((ct + " " + ca).strip())
            ca_prim = re.split(r"[,&/]|feat\.|ft\.", ca, flags=re.I)[0].strip()
            if ca_prim and ca_prim != ca:
                queries.append((ct + " " + ca_prim).strip())
        if ct and len(ct) >= 3 and ct not in queries:
            queries.append(ct)

        for q in queries:
            if not q or time.time() > lrclib_deadline - 1.5:
                continue
            try:
                hits = _lrclib_search(q, lrclib_deadline)
                api_error = None
            except Exception as e:
                hits = []
                api_error = api_error or str(e)
                continue
            if hits:
                synced_hits = [h for h in hits if h.get("syncedLyrics")]
                if synced_hits:
                    if dur:
                        best = min(synced_hits, key=lambda h: abs((h.get("duration") or 0) - dur))
                    else:
                        best = synced_hits[0]
                    rec = best
                    break
                elif not rec:
                    if dur:
                        rec = min(hits, key=lambda h: abs((h.get("duration") or 0) - dur))
                    else:
                        rec = hits[0]

    # 3) YouTube lyrics-video fallback — scrape lyrics from video descriptions
    if not rec and time.time() < budget_deadline - 4:
        try:
            plain_text = _yt_lyrics(artist, title, timeout=min(6, budget_deadline - time.time()))
            if plain_text:
                syn_est = _synthesize_lrc_timestamps(plain_text, dur)
                res = _sanitize_lyrics_result({"synced": syn_est, "plain": plain_text, "found": True, "error": None}, dur)
                with _LYR_LOCK:
                    _LYR_CACHE[key] = res
                    _lyr_cache_persist()
                return res
        except Exception:
            pass

    # 4) Gemini AI fallback — ask for synced LRC format or estimate timestamps
    if not rec and time.time() < budget_deadline - 3:
        try:
            lrc_text = _gemini_lyrics(artist, title, timeout=min(9, budget_deadline - time.time()), duration=dur)
            if lrc_text:
                syn_parsed = _parse_lrc(lrc_text) or _synthesize_lrc_timestamps(lrc_text, dur)
                res = _sanitize_lyrics_result({"synced": syn_parsed, "plain": lrc_text, "found": True, "error": None}, dur)
                with _LYR_LOCK:
                    _LYR_CACHE[key] = res
                    _lyr_cache_persist()
                return res
        except Exception:
            pass

    if not rec:
        res = {"synced": None, "plain": None, "found": False, "error": api_error}
        return res

    synced = _parse_lrc(rec.get("syncedLyrics")) or None
    plain = rec.get("plainLyrics") or None
    if not synced and plain:
        synced = _synthesize_lrc_timestamps(plain, dur)
    res = _sanitize_lyrics_result({"synced": synced, "plain": plain, "found": bool(synced or plain), "error": None}, dur)
    with _LYR_LOCK:
        if res["found"]:
            _LYR_CACHE[key] = res
            _lyr_cache_persist()
    return res


def _yt_lyrics(artist, title, timeout=6):
    """Search YouTube for a lyrics video and extract lyrics from its description."""
    query = "%s %s lyrics" % (artist, title)
    # 1. Search YouTube for lyrics videos (reuses the same scraping as yt_search)
    url = "https://www.youtube.com/results?" + urllib.parse.urlencode(
        {"search_query": query, "sp": "EgIQAQ%3D%3D"})
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
    html = urllib.request.urlopen(req, timeout=timeout).read().decode("utf-8", "replace")
    m = re.search(r"var ytInitialData = (\{.*?\});</script>", html)
    if not m:
        m = re.search(r'ytInitialData"]\s*=\s*(\{.*?\});', html)
    if not m:
        return None
    data = json.loads(m.group(1))

    # 2. Collect video IDs, prioritizing ones with "lyric" in the title but taking top results too
    vids = []
    def _walk(o):
        if len(vids) >= 4:
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
                vid = vr["videoId"]
                if vid not in vids:
                    if "lyric" in t.lower():
                        vids.insert(0, vid)
                    elif len(vids) < 3:
                        vids.append(vid)
            for v in o.values():
                _walk(v)
        elif isinstance(o, list):
            for v in o:
                _walk(v)
    _walk(data)
    if not vids:
        return None

    # 3. Fetch each video page and extract description
    for vid in vids[:4]:
        vurl = "https://www.youtube.com/watch?v=" + vid
        vreq = urllib.request.Request(vurl, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
        try:
            vhtml = urllib.request.urlopen(vreq, timeout=timeout).read().decode("utf-8", "replace")
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
    if not desc or not desc.strip():
        return None
    # 1. Immediately reject auto-generated YouTube topic descriptions ("Provided to YouTube by...")
    # or descriptions that are purely release credits/copyright notices.
    low_desc = desc.lower()
    if "provided to youtube by" in low_desc or "auto-generated by youtube" in low_desc:
        return None
    if "release - topic" in low_desc or "℗" in desc and "released on:" in low_desc:
        return None

    lines = desc.split("\n")
    start = -1
    for i, line in enumerate(lines):
        s = line.strip().lower()
        if s in ("lyrics:", "lyrics", "lyrics :", "♪ lyrics", "song lyrics:"):
            start = i + 1
            break
        if re.match(r"^\[?(verse|chorus|intro|hook|refrain|bridge|pre.chorus|outro)", s):
            start = i
            break

    # 2. Filter out non-lyrics lines (promotional prose, URLs, social handles, credits)
    def _is_noise_line(l):
        s = l.strip().lower()
        if not s:
            return False
        if re.match(r"^(#|🎵|⚡|⏬|📸|📷|🚫|http|www\.|follow|subscribe|copyright|©|\(c\)|℗|\(p\)|credits|produced|written by|more from|connect with|listen to|download|stream|if you want|presents|lyrical video|official video|official audio|music video by|directed by|shot by|mixed by|mastered by|album:|track:|song:|singer:|artist:|management:|booking:|released on:|composer|lyricist|associated performer|studio personnel|vocals:)", s):
            return True
        # Check if line looks like a metadata credit e.g. "Producer: WondaGurl" or "Mix Engineer: Jimmy Cash"
        if ":" in l and len(l.split(":")[0].split()) <= 4 and any(w in s.split(":")[0] for w in ("producer", "director", "editor", "mixer", "engineer", "performer", "composer", "lyricist", "vocals", "guitar", "drums", "bass", "writer", "written", "label", "records", "released")):
            return True
        return False

    if start < 0:
        # Check candidate lines if no explicit "Lyrics:" header was present
        cand_lines = [l.strip() for l in lines if l.strip() and not _is_noise_line(l)]
        # Must have at least 8 clean lines
        if len(cand_lines) < 8:
            return None
        # Reject if lines look like long biographical/promotional paragraphs (> 18 words on average)
        avg_words = sum(len(l.split()) for l in cand_lines) / len(cand_lines)
        if avg_words > 18:
            return None
        # Reject if multiple lines contain colons or credits
        if sum(":" in l for l in cand_lines) >= 2:
            return None
        start = 0

    lyric_lines = []
    blank_count = 0
    for line in lines[start:]:
        stripped = line.strip()
        if _is_noise_line(stripped):
            if lyric_lines and len(lyric_lines) >= 6:
                break
            continue
        if not stripped:
            blank_count += 1
            if blank_count > 3:
                break
            if lyric_lines and lyric_lines[-1] != "":
                lyric_lines.append("")
            continue
        blank_count = 0
        lyric_lines.append(stripped)

    # Remove section headers like [Chorus], [Verse 1]
    cleaned = []
    for l in lyric_lines:
        if re.match(r"^\[.*\]$", l) or re.match(r"^\(.*(?:chorus|verse|hook|bridge|intro|outro).*\)$", l, flags=re.I):
            cleaned.append("")
        else:
            cleaned.append(l)

    while cleaned and not cleaned[0]:
        cleaned.pop(0)
    while cleaned and not cleaned[-1]:
        cleaned.pop()

    text = "\n".join(cleaned).strip()
    text = re.sub(r"\n{3,}", "\n\n", text)
    # Final sanity check: real lyrics must have at least 6 non-empty lines
    non_empty = [l for l in text.splitlines() if l.strip()]
    return text if len(text) > 40 and len(non_empty) >= 6 else None

def _gemini_lyrics(artist, title, timeout=9, duration=None):
    """Ask Gemini for synced timestamped LRC lyrics as a fallback when lrclib is unreachable."""
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        return None
    url = ("https://generativelanguage.googleapis.com/v1beta/models/"
           "gemini-2.0-flash-lite:generateContent?key=" + api_key)
    dur_s = int(float(duration)) if duration else 180
    prompt = (
        'Return ONLY the complete synced LRC format timestamped lyrics for the song "%s" by "%s" '
        '(track duration ~%d seconds). '
        'Rules: output ONLY valid LRC lines with exact timestamps like [00:12.34] first line of song... '
        'Ensure timestamps span across the ~%d seconds duration smoothly. '
        'No title, no credits, no commentary, no markdown code blocks, no annotations. '
        'If you do not know the lyrics, respond with exactly: NO_LYRICS_FOUND'
    ) % (title, artist, dur_s, dur_s)
    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.0, "maxOutputTokens": 3000},
    }).encode()
    req = urllib.request.Request(url, data=body,
                                headers={"Content-Type": "application/json"})
    resp = urllib.request.urlopen(req, timeout=timeout)
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
    """Synthesize text to audio bytes.
    Priority: ElevenLabs (human-quality neural) -> gTTS (fallback) -> Piper (local).
    Cached by content hash so replays are instant."""
    key = hashlib.sha1(text.encode("utf-8")).hexdigest()[:20]
    hit = _tts_cache.get(key)
    if hit:
        return hit

    data = None

    # ── 1. ElevenLabs: industry-leading neural voice (Spotify/Netflix standard).
    # Free tier: 10 000 chars/month. Key from elevenlabs.io (no card needed).
    # ELEVENLABS_API_KEY  — set in Render env vars or persona/.env
    # ELEVENLABS_VOICE_ID — optional; defaults to "Rachel" (warm, conversational)
    xi_key = os.environ.get("ELEVENLABS_API_KEY", "")
    if xi_key:
        try:
            import io
            voice_id = os.environ.get("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")
            url = "https://api.elevenlabs.io/v1/text-to-speech/" + voice_id
            payload = json.dumps({
                "text": text[:2500],
                "model_id": "eleven_turbo_v2_5",
                "voice_settings": {"stability": 0.55, "similarity_boost": 0.80,
                                   "style": 0.20, "use_speaker_boost": True},
            }).encode()
            req = urllib.request.Request(url, data=payload, headers={
                "xi-api-key": xi_key,
                "Content-Type": "application/json",
                "Accept": "audio/mpeg",
            })
            with urllib.request.urlopen(req, timeout=15) as r:
                buf = io.BytesIO()
                while True:
                    chunk = r.read(8192)
                    if not chunk:
                        break
                    buf.write(chunk)
                data = buf.getvalue()
        except Exception:
            data = None

    # ── 2. gTTS: Google Translate TTS — free, works everywhere, sounds robotic but reliable
    if not data:
        try:
            from gtts import gTTS
            import io
            buf = io.BytesIO()
            gTTS(text=text, lang="en", slow=False).write_to_fp(buf)
            data = buf.getvalue()
        except Exception:
            pass

    # ── 3. Piper: local neural TTS — only works if model file is present
    if not data:
        try:
            import io, wave
            buf = io.BytesIO()
            with _piper_lock:
                voice = _piper if _piper is not None else None
            if voice is None:
                voice = _piper_voice()
            with wave.open(buf, "wb") as w:
                voice.synthesize_wav(text, w)
            data = buf.getvalue()
        except Exception:
            pass

    if not data:
        raise RuntimeError("No TTS engine available")

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
        if self.path.startswith("/api/admin/feedback.csv"):
            self._export_feedback_csv()
            return
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

        if self.path.startswith("/api/lyrics-clear"):
            n = clear_lyrics_cache()
            body = json.dumps({"ok": True, "cleared": n}).encode()
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
            print(f"[lyrics req] artist={artist!r} title={title!r} dur={dur!r}", flush=True)
            try:
                data = fetch_lyrics(artist, title, dur or None)
                print(f"[lyrics res] found={data.get('found')} synced_len={len(data.get('synced') or [])} error={data.get('error')}", flush=True)
                body = json.dumps({"ok": True, **data}).encode()
            except Exception as e:  # noqa
                print(f"[lyrics res error] {e}", flush=True)
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
                # gTTS returns MP3; Piper returns WAV — detect by magic bytes
                content_type = "audio/mpeg" if data[:3] in (b"ID3", b"\xff\xfb", b"\xff\xf3", b"\xff\xf2") or data[1:3] == b"\xfb" else "audio/wav"
                if data[:2] == b"\xff\xfb" or data[:3] == b"ID3":
                    content_type = "audio/mpeg"
                self.send_response(200)
                self.send_header("Content-Type", content_type)
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
            try:
                self.wfile.write(body)
            except (BrokenPipeError, ConnectionResetError):
                pass
            return
        return self._serve_local_file_with_range_or_fallback()

    def _serve_local_file_with_range_or_fallback(self):
        rng = self.headers.get("Range")
        if rng:
            path = self.translate_path(self.path)
            if os.path.isfile(path):
                total = os.path.getsize(path)
                m = re.match(r"bytes=(\d+)-(\d*)", rng)
                if m:
                    start = int(m.group(1))
                    end = int(m.group(2)) if m.group(2) else total - 1
                    if start < total:
                        end = min(end, total - 1)
                        length = end - start + 1
                        try:
                            self.send_response(206)
                            self.send_header("Content-Type", self.guess_type(path))
                            self.send_header("Content-Range", f"bytes {start}-{end}/{total}")
                            self.send_header("Content-Length", str(length))
                            self.send_header("Accept-Ranges", "bytes")
                            self.send_header("Access-Control-Allow-Origin", "*")
                            self.end_headers()
                            with open(path, "rb") as f:
                                f.seek(start)
                                remaining = length
                                while remaining > 0:
                                    chunk = f.read(min(65536, remaining))
                                    if not chunk:
                                        break
                                    self.wfile.write(chunk)
                                    remaining -= len(chunk)
                        except (BrokenPipeError, ConnectionResetError):
                            pass
                        except Exception:
                            pass
                        return
        try:
            return super().do_GET()
        except (BrokenPipeError, ConnectionResetError):
            pass

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
        if self.path.startswith("/api/feedback"):
            self._post_feedback()
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

    def _post_feedback(self):
        uid = self._uid()
        if not uid:
            self._json(401, b'{"error":"Not logged in"}')
            return
        
        user = auth.get_user(uid)
        user_email = user.get("email") if user else "unknown"
        
        req = self._read_json()
        message = req.get("message", "").strip()
        if not message:
            self._json(400, b'{"error":"Message is empty"}')
            return
        
        try:
            auth.insert_feedback(user_email, message)
            self._json(200, b'{"ok":true}')
        except Exception as e:
            self._json(500, json.dumps({"error": str(e)}).encode())

    def _export_feedback_csv(self):
        import csv
        import io
        import time
        try:
            if "?all=true" in self.path:
                records = auth.get_all_feedback()
            else:
                records = auth.get_new_feedback()
                
            output = io.StringIO()
            writer = csv.writer(output)
            writer.writerow(["ID", "Email", "Message", "Timestamp"])
            for rec in records:
                # rec might be 3 items (from get_all_feedback) or 4 items (from get_new_feedback)
                # get_new_feedback: (id, email, message, created)
                # get_all_feedback: (email, message, created)
                if len(rec) == 4:
                    rec_id, email, msg, created = rec
                else:
                    rec_id, email, msg, created = "N/A", rec[0], rec[1], rec[2]
                    
                ts_str = time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(created))
                writer.writerow([rec_id, email, msg, ts_str])
            
            csv_data = output.getvalue().encode('utf-8')
            
            self.send_response(200)
            self.send_header("Content-Type", "text/csv")
            self.send_header("Content-Disposition", 'attachment; filename="feedback.csv"')
            self.send_header("Content-Length", str(len(csv_data)))
            self.end_headers()
            self.wfile.write(csv_data)
        except Exception as e:
            self._json(500, json.dumps({"error": str(e)}).encode())

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
    print(f"music app + search on http://{HOST}:{PORT}")
    threading.Thread(target=_prewarm_tts, daemon=True).start()
    threading.Thread(target=_ensure_vosk_model, daemon=True).start()
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()

