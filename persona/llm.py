"""
============================================================
LLM seam — provider-swappable behind env vars, so no provider is
hardcoded into the persona logic.

  LLM_PROVIDER   "anthropic" | "gemini" | "ollama"   (default: "anthropic")
  LLM_MODEL      model id (per-provider default if unset)
  LLM_EFFORT     "low" | "medium" | "high"           (anthropic only; default "medium")

Backends:
  anthropic — official SDK, best quality (needs ANTHROPIC_API_KEY / `ant auth login`)
  gemini    — Google Gemini FREE tier via REST (needs a free GEMINI_API_KEY
              from aistudio.google.com; no card required)
  ollama    — fully local, FREE, no key/signup (needs Ollama running locally:
              `brew install ollama && ollama pull llama3.1`)

Adding a provider = adding one function here; nothing else in persona/ imports
a provider directly.
============================================================
"""
import json
import os
import time
import urllib.error
import urllib.request

PROVIDER_DEFAULT_MODEL = {
    "anthropic": "claude-opus-4-8",
    "gemini": "gemini-2.5-flash",
    "groq": "llama-3.3-70b-versatile",
    "ollama": "llama3.1",
}


def config():
    provider = os.environ.get("LLM_PROVIDER", "anthropic").lower()
    return {
        "provider": provider,
        "model": os.environ.get("LLM_MODEL") or PROVIDER_DEFAULT_MODEL.get(provider, ""),
        "effort": os.environ.get("LLM_EFFORT", "medium"),
    }


def complete(system, messages, max_tokens=1500, tools=None):
    """Send (system, messages) to the configured provider.

    Returns (text, assistant_message, tool_calls):
      - assistant_message is a {"role": "assistant", "content": ...} dict you
        append to `messages` for the next turn (provider-native shape — don't
        switch providers mid-conversation).
      - tool_calls is a list of {"id", "name", "input"} dicts when the model
        chose to call a tool (Anthropic only; other providers return []).
    Pass `tools` (a list of tool definitions) to make tools available.
    """
    cfg = config()
    fn = {"anthropic": _anthropic, "gemini": _gemini,
          "groq": _groq, "ollama": _ollama}.get(cfg["provider"])
    if not fn:
        raise NotImplementedError(
            f"LLM_PROVIDER={cfg['provider']!r} is not wired up. Options: "
            f"anthropic, gemini, groq, ollama — or add a backend function in persona/llm.py."
        )
    return fn(system, messages, cfg, max_tokens, tools)


# ---- helpers ----------------------------------------------------------------

def _text_of(content):
    """Flatten a stored message's content back to plain text (handles both a
    plain string and Anthropic content blocks)."""
    if isinstance(content, str):
        return content
    out = []
    for b in content:
        t = getattr(b, "type", None) or (isinstance(b, dict) and b.get("type"))
        if t == "text":
            out.append(getattr(b, "text", None) or b.get("text", ""))
    return "".join(out)


def _post_json(url, payload, headers=None, timeout=60, retries=5):
    """POST JSON with backoff on transient failures — connection blips and
    HTTP 429 (free-tier rate limits routinely throw these)."""
    data = json.dumps(payload).encode()
    # Some providers (e.g. Groq) sit behind Cloudflare, which blocks the default
    # Python-urllib user-agent with a 403 (error 1010). Present a browser UA.
    ua = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
          "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
    req = urllib.request.Request(
        url, data=data,
        headers={"Content-Type": "application/json", "User-Agent": ua, **(headers or {})})
    last = None
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return json.loads(r.read().decode("utf-8", "replace"))
        except urllib.error.HTTPError as e:
            if e.code == 429:                 # rate-limited -> one quick retry, then fail fast
                last = e                       # (don't hang the UI for 20s on a hard quota)
                if attempt >= 1:
                    raise
                time.sleep(0.7)
                continue
            raise                              # 4xx/5xx auth/other -> surface it
        except urllib.error.URLError as e:     # transient connection issue
            last = e
            time.sleep(1.0 * (attempt + 1))
    raise last


# ---- backends ---------------------------------------------------------------

def _anthropic(system, messages, cfg, max_tokens, tools=None):
    try:
        import anthropic
    except ImportError as e:
        raise RuntimeError("The 'anthropic' package is not installed. Run: pip install anthropic") from e
    client = anthropic.Anthropic()   # ANTHROPIC_API_KEY or `ant auth login` profile
    kwargs = dict(
        model=cfg["model"], max_tokens=max_tokens, system=system,
        thinking={"type": "adaptive"},
        output_config={"effort": cfg["effort"]},
        messages=messages,
    )
    if tools:
        kwargs["tools"] = tools
    resp = client.messages.create(**kwargs)
    text = "".join(b.text for b in resp.content if b.type == "text").strip()
    # Surface any tool calls as plain dicts (b.input is already a parsed dict).
    tool_calls = [{"id": b.id, "name": b.name, "input": b.input}
                  for b in resp.content if b.type == "tool_use"]
    return text, {"role": "assistant", "content": resp.content}, tool_calls   # keep blocks for same-model replay


def _gemini(system, messages, cfg, max_tokens, tools=None):   # tools unsupported here
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not key:
        raise RuntimeError("Set GEMINI_API_KEY (free from aistudio.google.com) to use the gemini provider.")
    contents = [{"role": "model" if m["role"] == "assistant" else "user",
                 "parts": [{"text": _text_of(m["content"])}]} for m in messages]
    url = (f"https://generativelanguage.googleapis.com/v1beta/models/"
           f"{cfg['model']}:generateContent?key={key}")
    j = _post_json(url, {
        "system_instruction": {"parts": [{"text": system}]},
        "contents": contents,
        "generationConfig": {"maxOutputTokens": max_tokens},
    })
    text = "".join(p.get("text", "") for p in
                   j["candidates"][0]["content"]["parts"]).strip()
    return text, {"role": "assistant", "content": text}, []


def _groq(system, messages, cfg, max_tokens, tools=None):   # tools unsupported here
    key = os.environ.get("GROQ_API_KEY")
    if not key:
        raise RuntimeError("Set GROQ_API_KEY (free from console.groq.com) to use the groq provider.")
    msgs = [{"role": "system", "content": system}]
    msgs += [{"role": m["role"], "content": _text_of(m["content"])} for m in messages]
    j = _post_json(
        "https://api.groq.com/openai/v1/chat/completions",
        {"model": cfg["model"], "messages": msgs, "max_tokens": max_tokens, "temperature": 0.8},
        headers={"Authorization": "Bearer " + key},
    )
    text = ((j.get("choices") or [{}])[0].get("message", {}).get("content") or "").strip()
    return text, {"role": "assistant", "content": text}, []


def _ollama(system, messages, cfg, max_tokens, tools=None):   # tools unsupported here
    host = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
    msgs = [{"role": "system", "content": system}]
    msgs += [{"role": m["role"], "content": _text_of(m["content"])} for m in messages]
    try:
        j = _post_json(f"{host}/api/chat",
                       {"model": cfg["model"], "messages": msgs, "stream": False,
                        "options": {"num_predict": max_tokens}})
    except Exception as e:   # noqa
        raise RuntimeError(
            f"Couldn't reach Ollama at {host}. Is it running? "
            f"(`brew install ollama` then `ollama pull {cfg['model']}`)"
        ) from e
    text = (j.get("message") or {}).get("content", "").strip()
    return text, {"role": "assistant", "content": text}, []
