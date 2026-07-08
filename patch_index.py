import re

with open("index.html", "r") as f:
    content = f.read()

# Replace the login avatars block to be empty for JS generation
old_block = """<div class="login-avatars" aria-hidden="true" id="loginAvatarsBlock">
          <span class="login-av login-av--ring">
            <img class="login-av__ring" src="assets/login/ring.svg?v=123" alt="" />
            <img class="login-av__img" id="loginQuoteImg" src="assets/login/av-0.png" alt="" style="object-fit: cover;" />
          </span>
        </div>"""

new_block = """<div class="login-avatars" aria-hidden="true" id="loginAvatarsBlock">
          <!-- Avatars injected by login.js -->
        </div>"""

if old_block in content:
    content = content.replace(old_block, new_block)
else:
    print("Warning: old_block not found in index.html exactly as expected")

with open("index.html", "w") as f:
    f.write(content)
print("patched index.html")
