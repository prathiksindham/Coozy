/* ============================================================================
   Sign-in drawer (Figma 122:53) + Google auth + per-user playlist sync.

   Flow:
   - On load, fetch the (public) Google Client ID from /api/auth/config and check
     /api/me for an existing session cookie.
   - "Continue with Google" runs Google Identity Services; the credential is POSTed
     to /api/auth/google, which verifies it and sets a session cookie.
   - Once signed in, the user's playlists live on the server: we pull them on sign-in
     (migrating any local ones up the first time) and push every change back up.
   ========================================================================== */
(function () {
  "use strict";

  const USER_LS = "musicUser";           // cached signed-in user (display only)
  const DISMISS_SS = "loginDismissed";   // don't re-nag within a session
  const PLAYLISTS_LS = "musicPlaylists"; // the app's playlist store (kept in sync)

  const overlay = document.getElementById("loginOverlay");
  const drawer = document.getElementById("loginDrawer");
  const closeBtn = document.getElementById("loginClose");
  const googleBtn = document.getElementById("loginGoogleBtn");
  if (!drawer) return;

  let clientId = window.__googleClientId || "";
  let gisReady = false;

  
  // --- Quote Carousel ---
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
    },
    {
      text: "“No matter where life takes me, find me with a smile. Pursuit to be happy, only laughing like a child. I never thought life would be this sweet, it got me cheesing from cheek to cheek.”",
      by: "Mac Miller, Best Day Ever",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Mac_Miller_-_Space_Migration_Tour.jpg/500px-Mac_Miller_-_Space_Migration_Tour.jpg"
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
    quoteTextEl.textContent = "";
    quoteByEl.textContent = "";
    if (window.smokeSwap) {
        window.smokeSwap(quoteTextEl, loginQuotes[0].text, 1);
        window.smokeSwap(quoteByEl, loginQuotes[0].by, 1);
    } else {
        quoteTextEl.textContent = loginQuotes[0].text;
        quoteByEl.textContent = loginQuotes[0].by;
    }
  }
  
  setInterval(changeQuote, 6000); // Change every 6 seconds


  let signedIn = false;
  let applyingServer = false;   // true while we write server data locally (skip re-push)
  let lastPushed = null, pushTimer = null;

  // --- open / close --------------------------------------------------------
  function openLogin() {
    overlay.hidden = false; drawer.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => { overlay.classList.add("is-open"); drawer.classList.add("is-open"); });
  }
  function closeLogin() {
    overlay.classList.remove("is-open"); drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    try { sessionStorage.setItem(DISMISS_SS, "1"); } catch (e) {}
    setTimeout(() => { overlay.hidden = true; drawer.hidden = true; }, 440);
  }
  closeBtn && closeBtn.addEventListener("click", closeLogin);
  overlay && overlay.addEventListener("click", closeLogin);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) closeLogin();
  });

  // --- inline note under the button ---------------------------------------
  let noteEl = null;
  function note(msg) {
    if (!noteEl) {
      noteEl = document.createElement("p");
      noteEl.className = "login-fine";
      noteEl.style.color = "rgba(255,255,255,0.62)";
      googleBtn.insertAdjacentElement("afterend", noteEl);
    }
    noteEl.textContent = msg || "";
  }

  // --- per-user playlist sync ---------------------------------------------
  // Intercept writes to the playlist store so any change (create / add / delete)
  // is pushed to the server while signed in — no edits to script.js needed.
  try {
    const _setItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function (k, v) {
      _setItem(k, v);
      if (k === PLAYLISTS_LS && signedIn && !applyingServer) schedulePush();
    };
    window.__rawSetItem = _setItem;   // raw setter for applying server data without re-push
  } catch (e) {}

  function schedulePush() { clearTimeout(pushTimer); pushTimer = setTimeout(() => pushNow(), 1200); }
  function pushNow(explicit) {
    let pls = explicit;
    if (!pls) { try { pls = JSON.parse(localStorage.getItem(PLAYLISTS_LS) || "[]"); } catch (e) { return; } }
    if (!Array.isArray(pls)) return;
    const s = JSON.stringify(pls);
    if (s === lastPushed) return;
    lastPushed = s;
    fetch("/api/playlists", {
      method: "POST", headers: { "Content-Type": "application/json" },
      credentials: "include", body: JSON.stringify({ playlists: pls }),
    }).catch(() => {});
  }
  window.addEventListener("beforeunload", () => { if (signedIn) { clearTimeout(pushTimer); pushNow(); } });

  // Pull this user's playlists on sign-in. Server wins if it has data (loads them
  // into the app); otherwise the local playlists migrate up to the server.
  function syncOnSignIn() {
    signedIn = true;
    reflectAuth(true);
    fetch("/api/playlists", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        const localStr = localStorage.getItem(PLAYLISTS_LS);
        if (d && d.ok && Array.isArray(d.playlists) && d.playlists.length) {
          const serverStr = JSON.stringify(d.playlists);
          lastPushed = serverStr;
          if (localStr !== serverStr) {
            applyingServer = true;
            (window.__rawSetItem || localStorage.setItem.bind(localStorage))(PLAYLISTS_LS, serverStr);
            location.reload();                 // let script.js rebuild from the server copy
          }
        } else {
          let local = null; try { local = JSON.parse(localStr || "null"); } catch (e) {}
          if (Array.isArray(local) && local.length) pushNow(local);   // first-time migration
        }
      })
      .catch(() => {});
  }

  // --- signed-in state -----------------------------------------------------
  function isSignedIn() { return signedIn; }
  // Reflect auth onto <body> so CSS can gate signed-in-only affordances (e.g.
  // "add to playlist"): body.is-signed-in is present only when signed in.
  function reflectAuth(on) {
    document.body.classList.toggle("is-signed-in", !!on);
    
    // Update profile button
    const profileBtn = document.getElementById("profileBtn");
    const profileAvatar = document.getElementById("profileAvatar");
    if (profileBtn && profileAvatar) {
      if (on) {
        profileBtn.hidden = false;
        try {
          const user = JSON.parse(localStorage.getItem(USER_LS) || "{}");
          profileAvatar.src = user.picture || "assets/login/av-0.png";
        } catch(e) {}
      } else {
        profileBtn.hidden = true;
      }
    }
  }
  function onSignedIn(user) {
    try { localStorage.setItem(USER_LS, JSON.stringify(user || {})); } catch (e) {}
    closeLogin();
    syncOnSignIn();
  }
  function logout() {
    fetch("/api/logout", { credentials: "include" }).finally(() => {
      signedIn = false;
      try { localStorage.removeItem(USER_LS); } catch (e) {}
      location.reload();
    });
  }

  function postCredential(idToken) {
    note("Signing you in…");
    fetch("/api/auth/google", {
      method: "POST", headers: { "Content-Type": "application/json" },
      credentials: "include", body: JSON.stringify({ credential: idToken }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d && d.ok && d.user) onSignedIn(d.user);
        else note(d && d.error ? d.error : "Sign-in failed — please try again.");
      })
      .catch(() => note("Couldn't reach the server. Try again."));
  }

  // --- Google Identity Services -------------------------------------------
  function initGoogle(id) {
    clientId = id || clientId;
    if (!clientId || gisReady) return !!clientId;
    const boot = () => {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (resp) => { if (resp && resp.credential) postCredential(resp.credential); },
        });
        gisReady = true;
        
        // Render the official Google sign-in button inside our custom button wrapper.
        if (googleBtn) {
          googleBtn.innerHTML = "";
          googleBtn.style.padding = "0";
          googleBtn.style.border = "none";
          googleBtn.style.background = "transparent";
          // We can set it to a div safely in the DOM if we want, or just let it be a button.
          // Google's script will inject an iframe.
          window.google.accounts.id.renderButton(googleBtn, {
            theme: "outline",
            size: "large",
            type: "standard",
            width: googleBtn.offsetWidth || 260
          });
        }
        
      } catch (e) { console.error("[login] GIS init failed", e); }
    };
    if (window.google && window.google.accounts) { boot(); return true; }
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client"; s.async = true; s.defer = true;
    s.onload = boot;
    s.onerror = () => note("Couldn't load Google sign-in.");
    document.head.appendChild(s);
    return true;
  }

  function startGoogleLogin() {
    if (clientId) {
      if (!gisReady) initGoogle(clientId);
      return;
    }
    note("Google sign-in isn't set up yet — add GOOGLE_CLIENT_ID to persona/.env.");
    console.info("[login] Set GOOGLE_CLIENT_ID in persona/.env (server exposes it via /api/auth/config).");
  }
  // Remove the old manual click listener because renderButton intercepts the click automatically.
  // We still keep startGoogleLogin for manual triggers if needed, but the button handles itself now.

  // --- public API ----------------------------------------------------------
  window.LOGIN = { open: openLogin, close: closeLogin, logout, initGoogle, isSignedIn };
  window.openLogin = openLogin;

  // --- boot ----------------------------------------------------------------
  window.addEventListener("DOMContentLoaded", () => {
    // 1) configure Google from the server (public client id)
    fetch("/api/auth/config").then((r) => r.json()).then((cfg) => {
      if (cfg && cfg.clientId) initGoogle(cfg.clientId);
    }).catch(() => {});

    // 2) already signed in via cookie?
    fetch("/api/me", { credentials: "include" }).then((r) => r.json()).then((me) => {
      if (me && me.ok && me.user) {
        try { localStorage.setItem(USER_LS, JSON.stringify(me.user)); } catch (e) {}
        syncOnSignIn();
      } else {
        try { localStorage.removeItem(USER_LS); } catch (e) {}
        reflectAuth(false);
        let dismissed = false;
        try { dismissed = sessionStorage.getItem(DISMISS_SS) === "1"; } catch (e) {}
        if (!dismissed) setTimeout(openLogin, 400);   // greet logged-out visitors
      }
    }).catch(() => {
      // server/auth unreachable -> just show the drawer once
      let dismissed = false;
      try { dismissed = sessionStorage.getItem(DISMISS_SS) === "1"; } catch (e) {}
      if (!dismissed) setTimeout(openLogin, 400);
    });
  });
})();
