/* ============================================================
   Spotify integration: OAuth (PKCE) + Web Playback SDK + search.
   Exposes window.SP with: isConnected, beginConnect, search, playUri,
   pause, resume, toggle. Playback state is reported to the app via
   window.spotifyOnState({paused, position, duration, ended}).

   Requires: a Spotify Premium account (for full playback) and a
   Spotify Developer app Client ID (entered by the user in the modal).
   ============================================================ */
(function () {
  "use strict";

  const LS_CLIENT = "spotifyClientId";
  const LS_TOKEN = "spotifyToken";          // { access_token, refresh_token, expires_at }
  const LS_VERIFIER = "spotifyPkceVerifier";
  const LS_STATE = "spotifyAuthState";
  const AUTH = "https://accounts.spotify.com/authorize";
  const TOKEN = "https://accounts.spotify.com/api/token";
  const API = "https://api.spotify.com/v1";
  const SCOPES = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state",
    "user-read-playback-state",
  ].join(" ");

  const redirectUri = location.origin + "/";     // must match the app's registered Redirect URI

  // ---- storage helpers ----
  const clientId = () => (localStorage.getItem(LS_CLIENT) || "").trim();
  function storedToken() {
    try { return JSON.parse(localStorage.getItem(LS_TOKEN) || "null"); } catch (e) { return null; }
  }
  function saveToken(t, keepRefresh) {
    const prev = storedToken();
    const refresh = t.refresh_token || (keepRefresh && prev && prev.refresh_token) || "";
    localStorage.setItem(LS_TOKEN, JSON.stringify({
      access_token: t.access_token,
      refresh_token: refresh,
      expires_at: Date.now() + (t.expires_in || 3600) * 1000 - 30000,  // 30s safety margin
    }));
  }

  // ---- PKCE ----
  function randStr(n) {
    const a = new Uint8Array(n);
    crypto.getRandomValues(a);
    return Array.from(a, (b) => ("0" + (b & 0xff).toString(16)).slice(-2)).join("");
  }
  function base64url(buf) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  async function challenge(verifier) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
    return base64url(digest);
  }

  // ---- OAuth flow ----
  async function beginConnect() {
    if (!clientId()) { openModal(); return; }        // need a Client ID first
    const verifier = randStr(48);
    const state = randStr(8);
    localStorage.setItem(LS_VERIFIER, verifier);
    localStorage.setItem(LS_STATE, state);
    const url = AUTH + "?" + new URLSearchParams({
      client_id: clientId(),
      response_type: "code",
      redirect_uri: redirectUri,
      code_challenge_method: "S256",
      code_challenge: await challenge(verifier),
      scope: SCOPES,
      state,
    }).toString();
    location.assign(url);
  }

  async function exchangeCode(code) {
    const verifier = localStorage.getItem(LS_VERIFIER) || "";
    const res = await fetch(TOKEN, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId(),
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
      }),
    });
    if (!res.ok) throw new Error("token exchange failed (" + res.status + ")");
    saveToken(await res.json());
    localStorage.removeItem(LS_VERIFIER);
    localStorage.removeItem(LS_STATE);
  }

  let refreshing = null;
  async function refreshAccess() {
    const t = storedToken();
    if (!t || !t.refresh_token) throw new Error("no refresh token");
    if (refreshing) return refreshing;
    refreshing = (async () => {
      const res = await fetch(TOKEN, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: clientId(),
          grant_type: "refresh_token",
          refresh_token: t.refresh_token,
        }),
      });
      if (!res.ok) throw new Error("token refresh failed (" + res.status + ")");
      saveToken(await res.json(), true);
    })();
    try { await refreshing; } finally { refreshing = null; }
  }

  async function getAccessToken() {
    let t = storedToken();
    if (!t) throw new Error("not connected");
    if (Date.now() >= t.expires_at) { await refreshAccess(); t = storedToken(); }
    return t.access_token;
  }

  async function apiFetch(path, opts) {
    const token = await getAccessToken();
    const res = await fetch(API + path, Object.assign({}, opts, {
      headers: Object.assign({ Authorization: "Bearer " + token }, (opts && opts.headers) || {}),
    }));
    if (res.status === 401) {                       // token rejected -> refresh once and retry
      await refreshAccess();
      const t2 = await getAccessToken();
      return fetch(API + path, Object.assign({}, opts, {
        headers: Object.assign({ Authorization: "Bearer " + t2 }, (opts && opts.headers) || {}),
      }));
    }
    return res;
  }

  // ---- Web Playback SDK ----
  let player = null, deviceId = null, sdkLoading = null, pendingUri = null;
  let curUri = null, curPaused = true, curPos = 0, curDur = 0, hadPlayed = false, tick = null;

  function loadSdk() {
    if (window.Spotify) return Promise.resolve();
    if (sdkLoading) return sdkLoading;
    sdkLoading = new Promise((resolve) => {
      window.onSpotifyWebPlaybackSDKReady = resolve;
      const s = document.createElement("script");
      s.src = "https://sdk.scdn.co/spotify-player.js";
      s.async = true;
      document.head.appendChild(s);
    });
    return sdkLoading;
  }

  function report() {
    if (typeof window.spotifyOnState === "function") {
      window.spotifyOnState({ paused: curPaused, position: curPos, duration: curDur });
    }
  }
  function startTick() {
    stopTick();
    tick = setInterval(() => {
      if (curPaused) return;
      curPos = Math.min(curDur || curPos + 1000, curPos + 1000);
      report();
    }, 1000);
  }
  function stopTick() { if (tick) { clearInterval(tick); tick = null; } }

  async function initPlayer() {
    if (player) return;
    await loadSdk();
    player = new window.Spotify.Player({
      name: "CD Player Carousel",
      getOAuthToken: (cb) => { getAccessToken().then(cb).catch(() => {}); },
      volume: 0.9,
    });
    player.addListener("ready", ({ device_id }) => {
      deviceId = device_id;
      if (pendingUri) { const u = pendingUri; pendingUri = null; playUri(u); }
    });
    player.addListener("not_ready", () => { deviceId = null; });
    player.addListener("initialization_error", ({ message }) => setStatus(message, true));
    player.addListener("authentication_error", ({ message }) => setStatus("Auth error: " + message, true));
    player.addListener("account_error", () =>
      setStatus("Spotify Premium is required for playback.", true));
    player.addListener("player_state_changed", (state) => {
      if (!state) return;
      const endedNow = hadPlayed && state.paused && state.position === 0 && curDur > 0 && curPos > curDur * 0.5;
      curPaused = state.paused;
      curPos = state.position;
      curDur = state.duration;
      curUri = state.track_window && state.track_window.current_track
        ? state.track_window.current_track.uri : curUri;
      if (!state.paused) hadPlayed = true;
      if (endedNow) {
        hadPlayed = false; stopTick();
        if (typeof window.spotifyOnState === "function") window.spotifyOnState({ ended: true });
        return;
      }
      if (state.paused) stopTick(); else startTick();
      report();
    });
    await player.connect();
  }

  // ---- controls ----
  async function playUri(uri) {
    if (!uri) return;
    try {
      await initPlayer();
      if (!deviceId) { pendingUri = uri; return; }   // play as soon as the device is ready
      if (player && player.activateElement) { try { await player.activateElement(); } catch (e) {} }
      const res = await apiFetch("/me/player/play?device_id=" + encodeURIComponent(deviceId), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uris: [uri] }),
      });
      if (!res.ok && res.status !== 204) {
        setStatus("Playback failed (" + res.status + "). Premium required.", true);
      } else {
        curUri = uri; hadPlayed = true;
      }
    } catch (e) { setStatus(String(e.message || e), true); }
  }
  async function pause() { try { if (player) await player.pause(); } catch (e) {} }
  async function resume() { try { if (player) await player.resume(); } catch (e) {} }
  function setVolume(v) { try { if (player && player.setVolume) player.setVolume(Math.max(0, Math.min(1, v))); } catch (e) {} }
  async function toggle(uri) {
    if (uri && uri !== curUri) return playUri(uri);   // different track -> load it
    try { if (player) await player.togglePlay(); else if (uri) return playUri(uri); } catch (e) {}
  }

  // ---- search ----
  async function search(q) {
    if (!q) return [];
    const res = await apiFetch("/search?" + new URLSearchParams({ q, type: "track", limit: "12" }));
    if (!res.ok) throw new Error("HTTP " + res.status);
    const j = await res.json();
    const items = (j.tracks && j.tracks.items) || [];
    return items.map((t) => ({
      spotify: t.uri,
      yt: "",
      title: t.name,
      artist: (t.artists || []).map((a) => a.name).join(", "),
      art: pickArt(t.album && t.album.images),
    }));
  }
  function pickArt(images) {
    if (!images || !images.length) return "";
    const mid = images.find((i) => i.width && i.width <= 300);
    return (mid || images[images.length - 1] || images[0]).url || "";
  }

  // ---- connect modal ----
  const modal = document.getElementById("spModal");
  const overlay = document.getElementById("spOverlay");
  const clientInput = document.getElementById("spClientId");
  const connectBtn = document.getElementById("spConnect");
  const statusEl = document.getElementById("spStatus");
  const redirectEl = document.getElementById("spRedirect");
  const closeBtn = document.getElementById("spClose");

  function setStatus(msg, isErr) {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.className = "sp-status" + (isErr ? " is-err" : msg ? " is-ok" : "");
  }
  function openModal() {
    if (!modal) return;
    if (redirectEl) redirectEl.textContent = redirectUri;
    if (clientInput) clientInput.value = clientId();
    setStatus("");
    overlay.hidden = false; modal.hidden = false;
    requestAnimationFrame(() => { overlay.classList.add("is-open"); modal.classList.add("is-open"); });
    setTimeout(() => clientInput && clientInput.focus(), 120);
  }
  function closeModal() {
    if (!modal) return;
    overlay.classList.remove("is-open"); modal.classList.remove("is-open");
    setTimeout(() => { overlay.hidden = true; modal.hidden = true; }, 240);
  }
  closeBtn && closeBtn.addEventListener("click", closeModal);
  overlay && overlay.addEventListener("click", closeModal);
  connectBtn && connectBtn.addEventListener("click", () => {
    const id = (clientInput.value || "").trim();
    if (!id) { setStatus("Enter your Spotify Client ID.", true); clientInput.focus(); return; }
    localStorage.setItem(LS_CLIENT, id);
    setStatus("Redirecting to Spotify…");
    beginConnect();
  });

  // ---- redirect handling on load ----
  async function handleRedirect() {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const error = params.get("error");
    const state = params.get("state");
    if (error) { history.replaceState({}, "", redirectUri); return; }
    if (!code) return false;
    if (state && localStorage.getItem(LS_STATE) && state !== localStorage.getItem(LS_STATE)) {
      history.replaceState({}, "", redirectUri); return false;
    }
    try {
      await exchangeCode(code);
      history.replaceState({}, "", redirectUri);       // strip ?code from the URL
      return true;
    } catch (e) {
      history.replaceState({}, "", redirectUri);
      setStatus(String(e.message || e), true);
      openModal();
      return false;
    }
  }

  // ---- public API ----
  window.SP = {
    isConnected: () => !!storedToken(),
    beginConnect,
    search,
    playUri,
    pause,
    resume,
    toggle,
    setVolume,
  };

  // On load: finish OAuth if we're returning from Spotify, then init the player.
  window.addEventListener("load", async () => {
    const justConnected = await handleRedirect();
    if (storedToken()) {
      initPlayer().catch(() => {});
      if (typeof window.onSpotifyConnected === "function") window.onSpotifyConnected(!!justConnected);
    }
  });
})();
