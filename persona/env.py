"""
Minimal .env loader (stdlib only — no python-dotenv dependency).

Reads persona/.env (KEY=VALUE per line) into os.environ if present, without
overwriting variables already set in the shell. Keeps secrets in one local,
gitignored file instead of the chat or shell history.
"""
import os

_ENV_PATH = os.path.join(os.path.dirname(__file__), ".env")


def load():
    if not os.path.exists(_ENV_PATH):
        return
    with open(_ENV_PATH, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, val = line.split("=", 1)
            key, val = key.strip(), val.strip().strip('"').strip("'")
            os.environ.setdefault(key, val)   # shell env wins over the file
