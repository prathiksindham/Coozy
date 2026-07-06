"""
============================================================
Phase 1 test harness. Iterate on the persona here, standalone,
before any room/UI exists.

  python -m persona.cli "Kendrick Lamar - Money Trees"   # ground + opening take, then argue
  python -m persona.cli --facts-only "Portishead - Glory Box"   # show grounding, no API call
  python -m persona.cli --show-prompt                    # print the system prompt
  python -m persona.cli --demo                           # scripted tracks + pushbacks

In the interactive prompt, type a pushback to argue with it; Ctrl-D / "quit" to exit.
Requires ANTHROPIC_API_KEY (or `ant auth login`) for anything that calls the model.
============================================================
"""
import sys

from . import env
env.load()   # pull persona/.env (if present) into os.environ before anything reads config

from . import grounding, llm
from .persona import Persona, build_system

# Scripted pushbacks for --demo: chosen to test whether it holds a defensible
# position and concedes a fair one, rather than just agreeing.
DEMO = [
    ("Portishead - Glory Box",
     ["Come on, this is just a slowed-down Isaac Hayes loop — you said untouched "
      "sampling is theft. Isn't this exactly that?"]),
    ("Daft Punk - Harder Better Faster Stronger",
     ["This is robotic, over-processed nonsense. Where's the human in it?"]),
]


def _print_facts(g):
    print("\n" + "─" * 60)
    print(g.render())
    if g.errors:
        print(f"[source errors: {'; '.join(g.errors)}]")
    print("─" * 60 + "\n")


def run_track(query, interactive=True):
    print(f"\n🎵 Grounding: {query}")
    g = grounding.ground(query)
    _print_facts(g)
    p = Persona()
    print(f"🗣  {p_name()}:\n{p.react_to_track(g)}\n")
    if not interactive:
        return p
    print("(type a pushback to argue, or 'quit')")
    while True:
        try:
            line = input("you> ").strip()
        except EOFError:
            break
        if line.lower() in ("quit", "exit", ""):
            break
        print(f"\n🗣  {p_name()}:\n{p.reply(line)}\n")
    return p


def run_demo():
    for query, pushbacks in DEMO:
        p = run_track(query, interactive=False)
        for pb in pushbacks:
            print(f"you> {pb}")
            print(f"\n🗣  {p_name()}:\n{p.reply(pb)}\n")
        print("=" * 60)


def p_name():
    from .persona import PERSONA_NAME
    return PERSONA_NAME


def main(argv):
    if "--show-prompt" in argv:
        print(build_system())
        return
    facts_only = "--facts-only" in argv
    demo = "--demo" in argv
    args = [a for a in argv if not a.startswith("--")]

    if demo:
        run_demo()
        return
    if not args:
        print(__doc__)
        print(f"[config] {llm.config()}")
        return
    query = " ".join(args)
    if facts_only:
        _print_facts(grounding.ground(query))
        return
    run_track(query)


if __name__ == "__main__":
    main(sys.argv[1:])
