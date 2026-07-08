import urllib.request
import json
import os
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

artists = {
    "kendrick": "Kendrick_Lamar",
    "mac": "Mac_Miller",
    "post": "Post_Malone",
    "wayne": "Lil_Wayne"
}
os.makedirs("assets/artists", exist_ok=True)

for key, name in artists.items():
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=pageimages&format=json&pithumbsize=500"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, context=ctx) as resp:
            data = json.loads(resp.read())
            pages = data["query"]["pages"]
            for page_id in pages:
                if "thumbnail" in pages[page_id]:
                    img_url = pages[page_id]["thumbnail"]["source"]
                    print(f"Downloading {name} from {img_url}")
                    img_data = urllib.request.urlopen(img_url, context=ctx).read()
                    with open(f"assets/artists/{key}.jpg", "wb") as f:
                        f.write(img_data)
                else:
                    print(f"No image for {name}")
    except Exception as e:
        print("Error fetching", name, e)
