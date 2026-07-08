import urllib.request
import json
import os
import base64

# Get token using the same logic as server.py
client_id = os.environ.get("SPOTIFY_CLIENT_ID")
client_secret = os.environ.get("SPOTIFY_CLIENT_SECRET")

if not client_id or not client_secret:
    print("No Spotify credentials")
    exit(1)

auth_str = f"{client_id}:{client_secret}"
b64_auth = base64.b64encode(auth_str.encode()).decode()

req = urllib.request.Request(
    "https://accounts.spotify.com/api/token",
    data=b"grant_type=client_credentials",
    headers={"Authorization": f"Basic {b64_auth}", "Content-Type": "application/x-www-form-urlencoded"}
)

try:
    with urllib.request.urlopen(req) as resp:
        token = json.loads(resp.read())["access_token"]
except Exception as e:
    print("Token error:", e)
    exit(1)

os.makedirs("assets/artists", exist_ok=True)

artists = {
    "kendrick": "Kendrick Lamar",
    "mac": "Mac Miller",
    "post": "Post Malone",
    "wayne": "Lil Wayne"
}

for key, name in artists.items():
    search_req = urllib.request.Request(
        f"https://api.spotify.com/v1/search?q={urllib.parse.quote(name)}&type=artist&limit=1",
        headers={"Authorization": f"Bearer {token}"}
    )
    try:
        with urllib.request.urlopen(search_req) as resp:
            data = json.loads(resp.read())
            url = data["artists"]["items"][0]["images"][0]["url"]
            print(f"Found {name}: {url}")
            # download image
            img_data = urllib.request.urlopen(url).read()
            with open(f"assets/artists/{key}.jpg", "wb") as f:
                f.write(img_data)
    except Exception as e:
        print("Error fetching", name, e)
