# Persona knowledge core (Phase 1)

The product's differentiator: an AI music head whose opinions are traceable to **real
data**, that can **argue and hold a position** — not a personality prompt on a chatbot.

This phase is standalone and testable before any room/UI exists.

## Layout
| file | role |
|------|------|
| `taste.py` | Fixed, opinionated taste axes (real stances, not neutral sliders) |
| `grounding.py` | Pulls real per-track data (MusicBrainz credits/samples/year, iTunes genre); reports gaps as MISSING instead of guessing |
| `llm.py` | Provider-swappable seam (env vars); Anthropic backend via the official SDK |
| `persona.py` | System prompt (identity + axes + hard grounding rule) + arguing conversation |
| `cli.py` | Phase-1 test harness |

## Setup
```bash
pip install -r persona/requirements.txt
export ANTHROPIC_API_KEY=sk-ant-...        # or: ant auth login
```

## Config (swap provider/model without touching persona logic)
| env var | default | meaning |
|---------|---------|---------|
| `LLM_PROVIDER` | `anthropic` | which backend (`anthropic` is the only one wired up) |
| `LLM_MODEL` | `claude-opus-4-8` | model id |
| `LLM_EFFORT` | `medium` | `low` \| `medium` \| `high` |

## Use
```bash
# See ONLY the grounded facts (no API call, no key needed):
python -m persona.cli --facts-only "Portishead - Glory Box"

# Full: ground a track, get an opening take, then argue with it:
python -m persona.cli "Kendrick Lamar - Money Trees"

# Scripted demo (tracks + pushbacks) and the system prompt:
python -m persona.cli --demo
python -m persona.cli --show-prompt
```

## Design notes / known gaps
- **Structural facts (tempo/key/structure) are intentionally unavailable.** Spotify's
  audio-features API was deprecated (2024) and AcousticBrainz is offline — there's no
  reliable keyless source, so these are always reported MISSING and the persona is told
  to admit it rather than invent. If you want them, we'd add a keyed provider (e.g.
  GetSongBPM / a licensed analysis API) in `grounding.py`.
- MusicBrainz is rate-limited (1 req/sec) and its credit coverage varies by track —
  well-catalogued records return rich producer/writer/sample data, obscure ones return
  little (and the persona will say so).
