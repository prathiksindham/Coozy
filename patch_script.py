import re

with open("script.js", "r") as f:
    content = f.read()

# Expose _smokeSwap globally
if "window.smokeSwap = _smokeSwap;" not in content:
    content = content.replace("function _smokeSwap(el, text, dir) {", "window.smokeSwap = _smokeSwap;\nfunction _smokeSwap(el, text, dir) {")

with open("script.js", "w") as f:
    f.write(content)

print("script.js patched")
