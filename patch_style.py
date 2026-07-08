import re

with open("style.css", "r") as f:
    content = f.read()

# Add fixed height to the quote block so text changes don't jump
if "min-height: 80px;" not in content:
    content = content.replace(".login-quote {", ".login-quote {\n  min-height: 80px;")

# Update the avatars block styles
old_css = """.login-avatars { display: flex; align-items: center; gap: 10.5px; }
.login-av {
  position: relative; width: 44px; height: 44px; flex: none;
  display: flex; align-items: center; justify-content: center;
}
.login-av__img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
.login-av--ring {
  width: 50px; height: 50px; padding: 2px;
  background: transparent;
}
.login-av--ring .login-av__img {
  width: 44px; height: 44px;
  border-radius: 50%;
}
.login-av__ring {
  position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
}"""

new_css = """.login-avatars { display: flex; align-items: center; gap: 12px; }
.login-av {
  position: relative; width: 44px; height: 44px; flex: none;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; padding: 3px;
  filter: grayscale(100%) opacity(0.6);
  transition: filter 0.4s ease;
}
.login-av.is-active {
  filter: grayscale(0%) opacity(1);
}
.login-av__img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }

.login-av__svg-ring {
  position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
  transform: rotate(-90deg);
}
.login-av__svg-ring circle {
  transition: none; /* reset is instant */
}
.login-av.is-active .login-av__svg-ring circle {
  transition: stroke-dashoffset 6s linear;
  stroke-dashoffset: 0;
}
"""

if old_css in content:
    content = content.replace(old_css, new_css)
else:
    print("Warning: could not find old_css exactly in style.css")

with open("style.css", "w") as f:
    f.write(content)
print("patched style.css")
