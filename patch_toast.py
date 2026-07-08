import re

with open("style.css", "r") as f:
    content = f.read()

# Replace .voice-toast base styles
content = re.sub(
    r"\.voice-toast\s*\{[^\}]+bottom:\s*30px;[^\}]+transform:\s*translateX\(-50%\)\s*translateY\(10px\)\s*scale\(0\.96\);",
    lambda m: m.group(0).replace("bottom: 30px;", "top: 10px;\n  bottom: auto;").replace("translateY(10px)", "translateY(-20px)"),
    content
)

# Replace .voice-toast body.is-full rule
content = re.sub(
    r"body\.is-full \.voice-toast\s*\{\s*bottom:\s*24px;\s*\}",
    "/* body.is-full .voice-toast rule removed so it stays at the top notch */",
    content
)

with open("style.css", "w") as f:
    f.write(content)

print("patched style.css")
