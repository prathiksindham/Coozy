import re

with open("login.js", "r") as f:
    content = f.read()

# Replace the quote carousel logic
start_str = "// --- Quote Carousel ---"
end_str = "setInterval(changeQuote, 6000); // Change every 6 seconds"

new_carousel = """// --- Quote Carousel ---
  const loginQuotes = [
    {
      text: "“I look in the mirror, I'm closer to the man I saw”",
      by: "Kendrick Lamar, County Building Blues",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/32/Pulitzer2018-portraits-kendrick-lamar_%28cropped%29.jpg"
    },
    {
      text: "“We only have a certain amount of time here, make it count”",
      by: "Mac Miller, Inside Outside",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Mac_Miller_-_Space_Migration_Tour.jpg/500px-Mac_Miller_-_Space_Migration_Tour.jpg"
    },
    {
      text: "“We're all just trying to find our way home”",
      by: "Post Malone, Circles",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Post_Malone_July_2021_%28cropped%29.jpg/500px-Post_Malone_July_2021_%28cropped%29.jpg"
    },
    {
      text: "“We temporary making permanent memories”",
      by: "Lil Wayne, Single",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Lil_Wayne_in_2023.jpg/500px-Lil_Wayne_in_2023.jpg"
    }
  ];
  
  let currentQuoteIdx = 0;
  const quoteTextEl = document.getElementById("loginQuoteText");
  const quoteByEl = document.getElementById("loginQuoteBy");
  const avatarsBlock = document.getElementById("loginAvatarsBlock");

  // Build the avatars
  if (avatarsBlock) {
    avatarsBlock.innerHTML = "";
    loginQuotes.forEach((q, idx) => {
      const span = document.createElement("span");
      span.className = "login-av" + (idx === 0 ? " is-active" : "");
      
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "login-av__svg-ring");
      svg.setAttribute("viewBox", "0 0 50 50");
      
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", "25");
      circle.setAttribute("cy", "25");
      circle.setAttribute("r", "23.5");
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", "#256060");
      circle.setAttribute("stroke-width", "3");
      circle.setAttribute("stroke-linecap", "round");
      circle.setAttribute("stroke-dasharray", "150");
      circle.setAttribute("stroke-dashoffset", "150");
      svg.appendChild(circle);

      const img = document.createElement("img");
      img.className = "login-av__img";
      img.src = q.img;
      img.style.objectFit = "cover";

      span.appendChild(svg);
      span.appendChild(img);
      avatarsBlock.appendChild(span);
    });
  }

  function changeQuote() {
    if (!quoteTextEl || !avatarsBlock) return;
    
    // Deactivate previous
    const oldSpan = avatarsBlock.children[currentQuoteIdx];
    if (oldSpan) oldSpan.classList.remove("is-active");

    currentQuoteIdx = (currentQuoteIdx + 1) % loginQuotes.length;
    const q = loginQuotes[currentQuoteIdx];
    
    // Activate new
    const newSpan = avatarsBlock.children[currentQuoteIdx];
    if (newSpan) newSpan.classList.add("is-active");

    // True smoke swap (no jumping)
    if (window.smokeSwap) {
        window.smokeSwap(quoteTextEl, q.text, 1);
        window.smokeSwap(quoteByEl, q.by, 1);
    } else {
        quoteTextEl.textContent = q.text;
        quoteByEl.textContent = q.by;
    }
  }
  
  // Set initial text
  if (quoteTextEl && quoteByEl) {
    quoteTextEl.textContent = loginQuotes[0].text;
    quoteByEl.textContent = loginQuotes[0].by;
  }
  
  setInterval(changeQuote, 6000); // Change every 6 seconds"""

if start_str in content and end_str in content:
    start_idx = content.find(start_str)
    end_idx = content.find(end_str) + len(end_str)
    content = content[:start_idx] + new_carousel + content[end_idx:]
else:
    print("Warning: could not find carousel block in login.js")

with open("login.js", "w") as f:
    f.write(content)
print("patched login.js")
