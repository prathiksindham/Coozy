"""
============================================================
Grounding layer — pulls REAL data about a track before the persona
speaks, so every opinion can be tied to a fact instead of a vibe.

Sources (all keyless, stdlib only, matching server.py's style):
  - MusicBrainz: artist, year, producer/writer/engineer credits,
    sample relationships, genre tags.  (rate-limited: 1 req/sec, UA required)
  - iTunes Search: genre + release year fallback + album.

Structural facts (tempo/key/song-structure) are deliberately NOT invented:
Spotify's audio-features API was deprecated (2024) and AcousticBrainz is
offline, so there is no reliable keyless source. Those fields are reported
as MISSING — the persona is told to say so rather than guess.
============================================================
"""
import json
import time
import urllib.parse
import urllib.request

UA = "RetroMusicRoom-Persona/0.1 ( https://github.com/ )"   # MusicBrainz requires a real UA
MB = "https://musicbrainz.org/ws/2"
_LAST_MB_CALL = [0.0]                                        # simple 1-req/sec throttle


def _get_json(url, timeout=12, retries=3):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    last = None
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return json.loads(r.read().decode("utf-8", "replace"))
        except Exception as e:                 # noqa — transient; retry with backoff
            last = e
            time.sleep(0.8 * (attempt + 1))
    raise last


def _mb(path, params):
    # Space MusicBrainz calls at least ~1.1s apart to respect their rate limit.
    wait = 1.1 - (time.time() - _LAST_MB_CALL[0])
    if wait > 0:
        time.sleep(wait)
    params = dict(params, fmt="json")
    url = f"{MB}/{path}?" + urllib.parse.urlencode(params)
    out = _get_json(url)
    _LAST_MB_CALL[0] = time.time()
    return out


class TrackGrounding:
    """Structured, provenance-tagged facts about one track. Fields left as
    None / [] are genuinely unknown — the persona must acknowledge that."""

    STRUCTURED_FIELDS = ["tempo_bpm", "musical_key", "song_structure"]

    def __init__(self, query, artist=None, title=None):
        self.query = query
        self.artist = artist
        self.title = title
        self.year = None
        self.album = None
        self.genres = []
        self.producers = []
        self.writers = []
        self.engineers = []
        self.samples = []          # list of "Sampled Track — Artist"
        self.sampled_by = []
        # structural facts: intentionally unavailable from keyless sources
        self.tempo_bpm = None
        self.musical_key = None
        self.song_structure = None
        self.sources = []          # human-readable provenance notes
        self.errors = []           # source failures (for debugging, not the persona)

    # ---- which requested facts came back empty ----
    def missing(self):
        m = []
        if not self.year: m.append("release year")
        if not self.genres: m.append("genre")
        if not self.producers: m.append("producer credits")
        if not self.writers: m.append("writer/composer credits")
        if not self.samples: m.append("sample credits")
        for f, label in (("tempo_bpm", "tempo"), ("musical_key", "key"),
                         ("song_structure", "song structure")):
            if getattr(self, f) is None:
                m.append(label)
        return m

    def render(self):
        """The fact sheet the persona sees. Present facts and explicit gaps."""
        L = [f"Track: {self.title or '?'} — {self.artist or '?'}"]
        if self.year:   L.append(f"Year: {self.year}")
        if self.album:  L.append(f"Album: {self.album}")
        if self.genres: L.append(f"Genre(s): {', '.join(self.genres)}")
        if self.producers: L.append(f"Producer(s): {', '.join(self.producers)}")
        if self.writers:   L.append(f"Writer(s)/composer(s): {', '.join(self.writers)}")
        if self.engineers: L.append(f"Engineer/mix: {', '.join(self.engineers)}")
        if self.samples:   L.append(f"Samples: {'; '.join(self.samples)}")
        if self.sampled_by: L.append(f"Sampled by: {'; '.join(self.sampled_by)}")
        miss = self.missing()
        if miss:
            L.append(f"MISSING (no reliable data found — do NOT invent these): {', '.join(miss)}")
        if self.sources:
            L.append(f"[sources: {', '.join(self.sources)}]")
        return "\n".join(L)


def _split_artist_title(query):
    for sep in (" - ", " – ", " — ", " by "):
        if sep in query:
            a, b = query.split(sep, 1)
            if sep == " by ":            # "Title by Artist"
                return b.strip(), a.strip()
            return a.strip(), b.strip()  # "Artist - Title"
    return None, query.strip()


def _itunes(g):
    term = " ".join(x for x in (g.artist, g.title) if x) or g.query
    url = "https://itunes.apple.com/search?" + urllib.parse.urlencode(
        {"term": term, "media": "music", "entity": "song", "limit": 1})
    j = _get_json(url, timeout=8)
    res = (j.get("results") or [])
    if not res:
        return
    r = res[0]
    g.artist = g.artist or r.get("artistName")
    g.title = g.title or r.get("trackName")
    g.album = g.album or r.get("collectionName")
    if r.get("primaryGenreName") and r["primaryGenreName"] not in g.genres:
        g.genres.append(r["primaryGenreName"])
    if not g.year and r.get("releaseDate"):
        g.year = r["releaseDate"][:4]
    g.sources.append("iTunes")


def _musicbrainz(g):
    # 1) find the recording
    q = []
    if g.artist: q.append(f'artist:"{g.artist}"')
    if g.title:  q.append(f'recording:"{g.title}"')
    search = _mb("recording", {"query": " AND ".join(q) or g.query, "limit": 3})
    recs = search.get("recordings") or []
    if not recs:
        return
    rec = recs[0]
    mbid = rec.get("id")
    if rec.get("first-release-date") and not g.year:
        g.year = rec["first-release-date"][:4]
    if rec.get("artist-credit") and not g.artist:
        g.artist = "".join(ac.get("name", "") for ac in rec["artist-credit"])

    # 2) full lookup for relationships + genres
    det = _mb(f"recording/{mbid}",
              {"inc": "artist-credits+releases+artist-rels+work-rels+recording-rels+genres+tags"})
    g.sources.append("MusicBrainz")

    for gen in (det.get("genres") or [])[:4]:
        name = (gen.get("name") or "").title()
        if name and name not in g.genres:
            g.genres.append(name)

    PROD = {"producer", "co-producer", "executive producer", "additional producer"}
    ENG = {"engineer", "mix", "recording", "audio", "mastering"}
    for rel in det.get("relations") or []:
        typ = (rel.get("type") or "").lower()
        tgt = rel.get("target-type")
        if tgt == "artist":
            name = (rel.get("artist") or {}).get("name")
            if not name:
                continue
            if typ in PROD and name not in g.producers:
                g.producers.append(name)
            elif any(k in typ for k in ENG) and name not in g.engineers:
                g.engineers.append(f"{name} ({typ})")
        elif tgt == "recording" and "sampl" in typ:
            rr = rel.get("recording") or {}
            who = ""
            if rr.get("artist-credit"):
                who = " — " + "".join(a.get("name", "") for a in rr["artist-credit"])
            label = f"{rr.get('title', '?')}{who}"
            if "of" in typ or rel.get("direction") == "backward":
                g.sampled_by.append(label)
            else:
                g.samples.append(label)

    # 3) writer/composer credits live on the WORK linked to the recording
    work_mbid = None
    for rel in det.get("relations") or []:
        if rel.get("target-type") == "work" and rel.get("work", {}).get("id"):
            work_mbid = rel["work"]["id"]
            break
    if work_mbid:
        try:
            work = _mb(f"work/{work_mbid}", {"inc": "artist-rels"})
            for rel in work.get("relations") or []:
                typ = (rel.get("type") or "").lower()
                name = (rel.get("artist") or {}).get("name")
                if name and typ in {"composer", "lyricist", "writer"} and name not in g.writers:
                    g.writers.append(name)
        except Exception as e:               # noqa
            g.errors.append(f"work-lookup: {e}")


def ground(query):
    """Resolve a 'Artist - Title' (or freeform) query into a TrackGrounding.
    Every source is best-effort; failures degrade to MISSING, never to a guess."""
    artist, title = _split_artist_title(query)
    g = TrackGrounding(query, artist, title)
    for name, fn in (("iTunes", _itunes), ("MusicBrainz", _musicbrainz)):
        try:
            fn(g)
        except Exception as e:                # noqa
            g.errors.append(f"{name}: {e}")
    return g
