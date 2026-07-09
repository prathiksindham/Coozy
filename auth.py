"""
Google sign-in + per-user playlist storage for the music app.

- Verifies the Google ID token (the `credential` from Google Identity Services) via
  Google's tokeninfo endpoint — no crypto library needed.
- Issues a stateless, HMAC-signed session cookie (HttpOnly).
- Stores each user + their playlists in a local SQLite DB (stdlib `sqlite3`).

Everything here is stdlib-only, matching the rest of server.py.
"""
import base64
import hashlib
import hmac
import json
import os
import secrets
import sqlite3
import time
import urllib.parse
import urllib.request

_HERE = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(_HERE, "data")
DB_PATH = os.path.join(DATA_DIR, "music.db")
SESSION_DAYS = 30
SESSION_TTL = SESSION_DAYS * 86400

os.makedirs(DATA_DIR, exist_ok=True)


# ---------------------------------------------------------------- DB ----------
def _db():
    conn = sqlite3.connect(DB_PATH, timeout=5)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with _db() as c:
        c.execute("""CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            google_sub TEXT UNIQUE,
            email TEXT, name TEXT, picture TEXT,
            created REAL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS playlists(
            user_id INTEGER PRIMARY KEY,
            json TEXT, updated REAL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS feedback(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email TEXT, message TEXT,
            exported INTEGER DEFAULT 0,
            created REAL)""")


def upsert_user(sub, email, name, picture):
    """Insert or update the user by Google subject id; return the user dict."""
    now = time.time()
    with _db() as c:
        c.execute(
            """INSERT INTO users(google_sub,email,name,picture,created)
               VALUES(?,?,?,?,?)
               ON CONFLICT(google_sub) DO UPDATE SET email=excluded.email,
                 name=excluded.name, picture=excluded.picture""",
            (sub, email, name, picture, now))
        row = c.execute("SELECT * FROM users WHERE google_sub=?", (sub,)).fetchone()
    return _user_dict(row)


def get_user(uid):
    if not uid:
        return None
    with _db() as c:
        row = c.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
    return _user_dict(row) if row else None


def _user_dict(row):
    return {"id": row["id"], "email": row["email"], "name": row["name"], "picture": row["picture"]}


def get_playlists(uid):
    """Return the user's saved playlists (parsed list) or None if none yet."""
    with _db() as c:
        row = c.execute("SELECT json FROM playlists WHERE user_id=?", (uid,)).fetchone()
    if not row or not row["json"]:
        return None
    try:
        return json.loads(row["json"])
    except Exception:
        return None


def save_playlists(uid, playlists):
    data = json.dumps(playlists)
    with _db() as c:
        c.execute(
            """INSERT INTO playlists(user_id,json,updated) VALUES(?,?,?)
               ON CONFLICT(user_id) DO UPDATE SET json=excluded.json, updated=excluded.updated""",
            (uid, data, time.time()))
    return True


# ------------------------------------------------ Google token verification ---
from google.oauth2 import id_token
from google.auth.transport import requests

def verify_google(credential, client_id):
    """Validate a Google ID token. Returns claims dict on success, else None.
    Uses Google's official library to verify the token locally via public keys,
    avoiding the tokeninfo endpoint which gets rate-limited in production.
    """
    if not credential or not client_id:
        return None
    try:
        request = requests.Request()
        claims = id_token.verify_oauth2_token(credential, request, client_id)
        if claims.get("iss") not in ("accounts.google.com", "https://accounts.google.com"):
            return None
        if not claims.get("sub"):
            return None
        return claims
    except Exception:
        return None


# --------------------------------------------------------- session cookies ----
def _secret():
    s = os.environ.get("SESSION_SECRET")
    if s:
        return s.encode()
    p = os.path.join(DATA_DIR, ".session_secret")
    if os.path.exists(p):
        return open(p, "rb").read()
    b = secrets.token_bytes(32)
    with open(p, "wb") as f:
        f.write(b)
    return b


def _b64(b):
    return base64.urlsafe_b64encode(b).decode().rstrip("=")


def _unb64(s):
    return base64.urlsafe_b64decode(s + "=" * (-len(s) % 4))


def make_session(uid):
    payload = json.dumps({"uid": uid, "exp": int(time.time()) + SESSION_TTL}).encode()
    sig = hmac.new(_secret(), payload, hashlib.sha256).digest()
    return _b64(payload) + "." + _b64(sig)


def read_session(cookie_header):
    """Return the uid from a valid, unexpired session cookie, else None."""
    token = _cookie_val(cookie_header, "sess")
    if not token or "." not in token:
        return None
    p_b64, s_b64 = token.split(".", 1)
    try:
        payload = _unb64(p_b64)
        expect = hmac.new(_secret(), payload, hashlib.sha256).digest()
        if not hmac.compare_digest(expect, _unb64(s_b64)):
            return None
        data = json.loads(payload)
    except Exception:
        return None
    if int(data.get("exp", 0)) < time.time():
        return None
    return data.get("uid")


def _cookie_val(cookie_header, name):
    if not cookie_header:
        return None
    for part in cookie_header.split(";"):
        k, _, v = part.strip().partition("=")
        if k == name:
            return v
    return None


def session_cookie(uid, secure):
    val = make_session(uid)
    
    expires_time = time.time() + SESSION_TTL
    expires_str = time.strftime('%a, %d %b %Y %H:%M:%S GMT', time.gmtime(expires_time))
    
    attrs = [
        "sess=" + val, 
        "Path=/", 
        "HttpOnly", 
        "SameSite=Lax", 
        "Max-Age=" + str(SESSION_TTL),
        "Expires=" + expires_str
    ]
    if secure:
        attrs.append("Secure")
    return "; ".join(attrs)


def clear_cookie(secure):
    attrs = [
        "sess=", 
        "Path=/", 
        "HttpOnly", 
        "SameSite=Lax", 
        "Max-Age=0",
        "Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    ]
    if secure:
        attrs.append("Secure")
    return "; ".join(attrs)


init_db()

def insert_feedback(user_email, message):
    with _db() as c:
        c.execute("INSERT INTO feedback (user_email, message, created) VALUES (?, ?, ?)",
                  (user_email, message, time.time()))

def get_all_feedback():
    with _db() as c:
        return c.execute("SELECT user_email, message, created FROM feedback ORDER BY created DESC").fetchall()

def get_new_feedback():
    with _db() as c:
        rows = c.execute("SELECT id, user_email, message, created FROM feedback WHERE exported = 0 ORDER BY created ASC").fetchall()
        if rows:
            ids = [r[0] for r in rows]
            placeholders = ",".join("?" * len(ids))
            c.execute(f"UPDATE feedback SET exported = 1 WHERE id IN ({placeholders})", ids)
        return rows
