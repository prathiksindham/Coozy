/* ============================================================================
   On-device "Maya" wake word (Vosk / vosk-browser, WebAssembly).

   Fully local: the mic audio is transcribed inside the browser and NOTHING is
   sent anywhere until the wake word is heard — then whatever follows ("Maya,
   play this song") is handed to the app's existing handleVoiceCommand().

   Opt-in: long-press the mic button to turn "Hey Maya" listening on/off. A short
   click still does normal push-to-talk. The choice is remembered across reloads.
   ========================================================================== */
(function () {
  "use strict";

  const LS = "musicWakeOn";
  const MODEL_URL = "/models/vosk-model-small-en-us-0.15.tar.gz";
  const VOSK_LIB = "/vendor/vosk/vosk.js";   // self-hosted (no CDN dependency)
  // Accept the word and its common mis-hears so it triggers reliably.
  const WAKE_RE = /\b(hey\s+)?(maya|maia|mya|my\s?a|maja|mayer|mia)\b/i;

  let model = null, recognizer = null, audioCtx = null, micStream = null;
  let srcNode = null, procNode = null, sinkNode = null;
  let booting = false, running = false, on = false, lastFire = 0;
  // Voice-activity ducking: track the music's energy floor at the mic; when your
  // voice spikes above it, duck the music hard so "Maya" is heard cleanly.
  let vadFloor = 0.01, vadDucked = false, vadLastVoice = 0;

  const now = () => Date.now();
  const speaking = () => !!window.__sableSpeaking;
  const activeListening = () => (typeof listening !== "undefined" && listening);

  function toast(msg, icon) {
    if (typeof showVoice === "function") {
      showVoice(msg, icon || "🎙️");
      if (typeof hideVoice === "function") hideVoice(2200);
    }
  }

  // --- model + engine boot -------------------------------------------------
  // Returns "ready" | "error" | "unknown" | "timeout". We keep polling only while
  // the server actively reports "downloading"; if the status endpoint isn't there
  // (older/other server) we return "unknown" fast and just try to load the model.
  async function pollModel(maxMs) {
    const t0 = now();
    while (now() - t0 < maxMs) {
      let s = null;
      try { const r = await fetch("/api/wake-status"); if (r.ok) s = await r.json(); } catch (e) {}
      if (!s) return "unknown";
      if (s.ready) return "ready";
      if (s.state === "error") return "error";
      await new Promise((r) => setTimeout(r, 1500));   // "downloading" — keep waiting
    }
    return "timeout";
  }

  // Lazy-load the ~5.8MB engine only when wake mode is first turned on.
  function loadVoskLib() {
    return new Promise((resolve, reject) => {
      if (window.Vosk) return resolve(window.Vosk);
      const s = document.createElement("script");
      s.src = VOSK_LIB;
      s.onload = () => (window.Vosk ? resolve(window.Vosk) : reject(new Error("Vosk global missing")));
      s.onerror = () => reject(new Error("failed to load vosk.js"));
      document.head.appendChild(s);
    });
  }

  async function boot() {
    if (model) return true;
    if (booting) return false;
    booting = true;
    try {
      toast("Loading Maya…", "⏳");
      console.log("[wake] boot: polling model status…");
      const st = await pollModel(180000);
      console.log("[wake] boot: model status =", st);
      if (st === "error") { toast("Wake model download failed", "⚠️"); booting = false; return false; }
      // "ready" / "unknown" / "timeout": try to load it — createModel fails cleanly if absent.
      const Vosk = await loadVoskLib();
      console.log("[wake] boot: engine loaded, creating model…");
      try {
        model = await Vosk.createModel(MODEL_URL);
        console.log("[wake] boot: model ready");
      } catch (e) {
        console.error("[wake] createModel failed", e);
        toast("Wake model still downloading — try again shortly", "⚠️");
        booting = false; return false;
      }
      booting = false;
      return true;
    } catch (e) {
      console.error("[wake] boot failed", e);
      toast("Wake word failed to load", "⚠️");
      booting = false;
      return false;
    }
  }

  async function start() {
    if (running) return;
    if (!(await boot())) { on = false; persist(); updateIndicator(); return; }
    try {
      micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") { try { await audioCtx.resume(); } catch (e) {} }

      recognizer = new model.KaldiRecognizer(audioCtx.sampleRate);
      recognizer.on("result", (m) => onHeard(m && m.result && m.result.text));
      recognizer.on("partialresult", (m) => onHeard(m && m.result && m.result.partial));

      srcNode = audioCtx.createMediaStreamSource(micStream);
      procNode = audioCtx.createScriptProcessor(4096, 1, 1);
      procNode.onaudioprocess = (ev) => {
        if (!on) return;
        if (activeListening()) return;   // push-to-talk mic already open -> don't double-listen

        // Keep transcribing even while SHE is speaking, so "Hey Maya" can BARGE IN and
        // cut her off mid-sentence (Google/Humane-style). We only skip the voice-
        // activity ducking in that window, since her TTS already ducks the music.
        if (!speaking()) {
          // --- voice-activity ducking (Alexa-style) ---
          // Music rests LOUD; the instant your voice rises above the (echo-cancelled)
          // noise floor we duck it hard so "Maya …" is heard cleanly, then snap it back
          // to loud once you stop. echoCancellation attenuates the music in the mic
          // signal, so the floor stays low and your voice spikes clearly even over a
          // loud song.
          const buf = ev.inputBuffer.getChannelData(0);
          let sum = 0;
          for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
          const rms = Math.sqrt(sum / buf.length);
          // adapt the floor: fall fast to the quiet baseline, rise slowly (ignore speech)
          vadFloor = rms < vadFloor ? (vadFloor * 0.9 + rms * 0.1) : (vadFloor * 0.995 + rms * 0.005);
          const voice = rms > Math.max(vadFloor * 1.8, 0.012);   // spike above the floor = you talking
          if (voice) {
            vadLastVoice = now();
            if (!vadDucked) { vadDucked = true; if (window.setVoiceDucking) window.setVoiceDucking(true); console.log("[wake] voice → duck"); }
          } else if (vadDucked && now() - vadLastVoice > 600) {
            vadDucked = false; if (window.setVoiceDucking) window.setVoiceDucking(false); console.log("[wake] silence → music loud");
          }
        }

        try { recognizer.acceptWaveform(ev.inputBuffer); } catch (e) { /* worker busy */ }
      };
      // Route through a muted sink so ScriptProcessor runs without echoing the mic.
      sinkNode = audioCtx.createGain(); sinkNode.gain.value = 0;
      srcNode.connect(procNode);
      procNode.connect(sinkNode);
      sinkNode.connect(audioCtx.destination);

      running = true;
      updateIndicator();
      if (window.setMusicBase) window.setMusicBase(1);   // music rests LOUD; VAD ducks it while you speak
      console.log("[wake] mic live — sampleRate", audioCtx.sampleRate, "ctx", audioCtx.state);
    } catch (e) {
      console.error("[wake] mic start failed", e);
      toast(e && e.name === "NotAllowedError" ? "Mic permission denied" : "Mic unavailable", "⚠️");
      on = false; persist(); updateIndicator();
    }
  }

  // --- wake detection ------------------------------------------------------
  function onHeard(text) {
    if (!on || !text) return;
    const t = String(text).toLowerCase().trim();
    if (t) console.log("[wake] heard:", t);   // console only — no on-screen chip
    const m = t.match(WAKE_RE);
    if (!m) return;
    if (now() - lastFire < 1600) return;              // debounce partial+final repeats
    lastFire = now();
    const after = t.slice(m.index + m[0].length).replace(/\[unk\]/g, "").trim();
    fire(after);
  }

  function fire(command) {
    if (typeof _unlockSableAudio === "function") { try { _unlockSableAudio(); } catch (e) {} }
    // Barge-in: if Maya is mid-sentence when the wake word lands, cut her off first.
    if (speaking() && typeof stopSableNow === "function") { try { stopSableNow(); } catch (e) {} }
    if (command && command.length > 1) {
      // e.g. "Maya, play this song" — run the trailing command immediately.
      toast("“" + command + "”", "✨");
      if (typeof handleVoiceCommand === "function") handleVoiceCommand(command);
    } else {
      // Just "Maya" — open the mic for the next sentence.
      toast("Yes?", "🎙️");
      if (typeof startListening === "function") startListening();
    }
  }

  // --- toggle / persistence / UI ------------------------------------------
  function persist() { try { localStorage.setItem(LS, on ? "1" : "0"); } catch (e) {} }
  function updateIndicator() {
    const mic = document.getElementById("micBtn");
    if (mic) mic.classList.toggle("wake-on", !!(on && running));
  }
  async function enable(greet) {
    on = true; persist();
    toast("Hey Maya — listening", "🎙️");
    await start();
    // Explicit turn-on gets a warm, time-aware spoken greeting (with a one-time
    // self-introduction); a silent auto-resume after reload just chirps softly.
    if (running) {
      if (greet && typeof window.mayaGreeting === "function") window.mayaGreeting();
      else if (typeof window.playEarcon === "function") window.playEarcon("start");
    }
  }
  function disable() {
    on = false; persist(); updateIndicator();
    vadDucked = false;
    if (window.setVoiceDucking) window.setVoiceDucking(false);
    if (window.setMusicBase) window.setMusicBase(1);   // music back to full
    toast("Maya off", "🔇");
    if (typeof window.mayaGoodbye === "function") window.mayaGoodbye();   // spoken goodbye
  }
  function toggle() { on ? disable() : enable(true); }

  // Long-press the mic toggles wake mode; a short click keeps push-to-talk. The
  // toggle runs inside the concluding click (a real user gesture) so getUserMedia
  // and the AudioContext start reliably instead of staying suspended.
  //
  // The swallow-click listener is on `document` (capture) so it runs BEFORE the
  // mic button's own click handler — otherwise push-to-talk fires on a long-press
  // and its listening=true state mutes the wake engine.
  function wireMic() {
    const mic = document.getElementById("micBtn");
    if (!mic) return;
    let timer = null, longHold = false;
    mic.addEventListener("pointerdown", () => { longHold = false; timer = setTimeout(() => { longHold = true; }, 550); });
    const cancel = () => clearTimeout(timer);
    mic.addEventListener("pointerup", cancel);
    mic.addEventListener("pointerleave", cancel);
    document.addEventListener("click", (e) => {
      if (!longHold) return;
      if (!(e.target === mic || (e.target.closest && e.target.closest("#micBtn")))) return;
      e.stopImmediatePropagation(); e.preventDefault(); longHold = false; toggle();
    }, true);   // capture on document -> fires before the button's own click listener
  }

  // If wake was left on, browsers still need a user gesture before mic/AudioContext.
  function armAutoStart() {
    on = true; updateIndicator();
    const kick = () => { document.removeEventListener("pointerdown", kick); enable(); };
    document.addEventListener("pointerdown", kick, { once: true });
  }

  window.WAKE = { toggle, enable, disable, status: () => ({ on, running, hasModel: !!model }) };

  window.addEventListener("DOMContentLoaded", () => {
    wireMic();
    let saved = "0"; try { saved = localStorage.getItem(LS) || "0"; } catch (e) {}
    if (saved === "1") armAutoStart();
  });
})();
