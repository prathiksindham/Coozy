import json, urllib.request, urllib.parse, time
def _lrclib_search(q):
    url = "https://lrclib.net/api/search?" + urllib.parse.urlencode({"q": q})
    req = urllib.request.Request(url, headers={
        "User-Agent": "retro-music-player (https://github.com/local/music)",
    })
    for attempt in range(5):
        try:
            res = urllib.request.urlopen(req, timeout=10).read()
            return json.loads(res.decode("utf-8", "replace"))
        except Exception as e:
            print("Attempt", attempt, "failed:", e)
            time.sleep(1)
    return []
print(len(_lrclib_search("Don Toliver ATM") or []))
