/* Floating Bubbles — webcam soap-bubble effect.
   Self-contained: window.FallingBubbles.open()/close()/toggle().

   Third companion to hearts.js and snow.js, recombining their two detection
   building blocks:
     - person segmentation (the hearts approach) decides what counts as "the
       user's body": a bubble bursts the moment it overlaps the silhouette
       mask, and NOTHING outside that mask — furniture, walls, pets, other
       motion — can ever pop one.
     - hand tracking (the snow approach), stripped down to a single point:
       the index fingertip pops any bubble it touches, precisely, with no
       gesture state machine.

   This is the first effect running two ML models at once, so they are
   STAGGERED on one master clock — hand on odd ticks, body on a subset of
   even ticks — which guarantees the two inferences never land in the same
   frame and the combined cost stays comparable to one faster model, not two
   stacked ones. Body segmentation runs slower than fingertip tracking on
   purpose: a silhouette changes slowly, a poke needs to feel instant.

   Motion is a lightweight buoyant model (weak pull, sinusoidal sway, wobble)
   — no physics engine; bubbles don't collide or pile, they float and pop.
   Bubbles carry a natural lifespan so nothing accumulates: untouched ones
   burst on their own, and every burst is a sub-second droplet + film-ring
   flourish that leaves nothing behind.

   Everything pauses on tab hide and tears down fully (camera light off, both
   models closed) on close. */

const FallingBubbles = (() => {
  "use strict";

  const DET_SIZE = 256;        // detection input resolution (both models)
  const MASK_SIZE = 256;       // segmentation mask resolution
  const MEDIAPIPE_VERSION = "0.10.14"; // same bundle as hearts/snow -> shared cache

  /* masterMs is the shared detection clock. Hand runs on odd ticks (rate =
     1 / 2·masterMs), body on every bodyEvery-th tick (even, so the two never
     collide). Rates follow the spec table, slightly quantized by the shared
     clock. */
  const TIERS = [
    { name: "high", bubbles: 120, masterMs: 33, bodyEvery: 4, fps: 60, dpr: 2   }, // hand ~15/s, body ~7.5/s
    { name: "mid",  bubbles: 60,  masterMs: 40, bodyEvery: 4, fps: 60, dpr: 1.5 }, // hand ~12/s, body ~6/s
    { name: "low",  bubbles: 25,  masterMs: 62, bodyEvery: 4, fps: 30, dpr: 1   }, // hand ~8/s,  body ~4/s
  ];

  const BURST_POOL = 150;
  const FINGER_PAD = 16;       // px of forgiveness around the fingertip point
  const MASK_STALE_MS = 1200;  // ignore a silhouette older than this (paused/lost)

  // ---- state ----
  let overlay = null, video = null, canvas = null, statusEl = null;
  let stream = null;
  let segmenter = null, segBusy = false, segBusyAt = 0, personMaskIndex = -1;
  let handLm = null;
  let renderer = null;
  let tierIndex = 0;
  let isOpen = false, isPaused = false;
  let rafId = null, detectTimer = null, hintTimer = null, tickN = 0;
  let lastRenderAt = 0, lastStepAt = 0;
  let slowFrames = 0, lastFrameAt = 0;
  let detCanvas = null, detCtx = null;

  let W = 0, H = 0;
  let simT = 0;

  // latest silhouette, copied out of MediaPipe's recycled buffer
  const bodyMask = new Float32Array(MASK_SIZE * MASK_SIZE);
  let bodyMaskAt = 0;

  // fingertip, screen px; prev kept so a fast poke sweeps a segment
  let tip = null, tipPrev = null;

  // bubble pool (swap-remove keeps the active prefix dense)
  let bubbles = [];
  let bubbleCount = 0;
  let spawnClock = 0;

  let bursts = [];

  const popStats = { body: 0, finger: 0, natural: 0 };

  // instance staging: x, y, size, alpha | tile, rot, hue, squash
  const MAX_INST = TIERS[0].bubbles + BURST_POOL;
  const inst = new Float32Array(MAX_INST * 8);

  const tier = () => TIERS[tierIndex];

  // ---------- device tiering (same heuristic as hearts/snow) ----------
  function pickInitialTier() {
    const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const mem = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 8;
    if (mobile && (mem <= 3 || cores <= 4)) return 2;
    if (mobile || mem <= 4) return 1;
    return 0;
  }

  // ---------- overlay DOM (shares the hearts-* chrome, see snow.js note) ----------
  function buildOverlay() {
    overlay = document.createElement("div");
    overlay.className = "hearts-overlay";
    overlay.innerHTML = `
      <video class="hearts-video" playsinline muted autoplay></video>
      <canvas class="hearts-canvas"></canvas>
      <div class="hearts-status" role="status"></div>
      <button class="hearts-close" aria-label="Close bubbles">&#10005;</button>`;
    document.body.appendChild(overlay);
    document.body.classList.add("hearts-active");
    video = overlay.querySelector(".hearts-video");
    canvas = overlay.querySelector(".hearts-canvas");
    statusEl = overlay.querySelector(".hearts-status");
    overlay.querySelector(".hearts-close").addEventListener("click", close);
  }

  function setStatus(text) {
    if (statusEl) { statusEl.textContent = text || ""; statusEl.hidden = !text; }
  }

  // ---------- camera ----------
  async function startCamera() {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
    });
    video.srcObject = stream;
    await new Promise((res) => {
      if (video.readyState >= 2) return res();
      video.addEventListener("loadeddata", res, { once: true });
    });
    try { await video.play(); } catch (_) {}
  }

  function stopCamera() {
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    if (video) video.srcObject = null;
  }

  // ---------- detection: two models, one staggered clock ----------
  async function startDetection() {
    const visionUrl = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}`;
    const vision = await import(`${visionUrl}/vision_bundle.mjs`);
    const fileset = await vision.FilesetResolver.forVisionTasks(`${visionUrl}/wasm`);

    // Fingertip model (lighter). Optional: body-contact still works without it.
    const handOpts = (delegate) => ({
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
        delegate,
      },
      runningMode: "VIDEO",
      numHands: 1,
    });
    try {
      try { handLm = await vision.HandLandmarker.createFromOptions(fileset, handOpts("GPU")); }
      catch (_) { handLm = await vision.HandLandmarker.createFromOptions(fileset, handOpts("CPU")); }
    } catch (err) { console.warn("bubbles: fingertip tracking unavailable", err); }

    // Body silhouette model (same one hearts uses). Also optional.
    const segOpts = (delegate) => ({
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite",
        delegate,
      },
      runningMode: "VIDEO",
      outputCategoryMask: false,
      outputConfidenceMasks: true,
    });
    try {
      try { segmenter = await vision.ImageSegmenter.createFromOptions(fileset, segOpts("GPU")); }
      catch (_) { segmenter = await vision.ImageSegmenter.createFromOptions(fileset, segOpts("CPU")); }
      const labels = segmenter.getLabels ? segmenter.getLabels() : [];
      personMaskIndex = labels ? labels.findIndex((l) => /person|selfie|foreground/i.test(l)) : -1;
    } catch (err) { console.warn("bubbles: segmentation unavailable", err); }

    if (!isOpen) { stopDetection(); return; } // closed while models loaded
    if (!handLm && !segmenter) throw new Error("no detection model loaded");

    detCanvas = document.createElement("canvas");
    detCanvas.width = DET_SIZE;
    detCanvas.height = DET_SIZE;
    detCtx = detCanvas.getContext("2d");

    scheduleDetection();
  }

  function scheduleDetection() {
    if (detectTimer) clearInterval(detectTimer);
    tickN = 0;
    detectTimer = setInterval(masterTick, tier().masterMs);
  }

  /* Odd ticks -> fingertip; every bodyEvery-th tick (always even) -> body.
     At most one inference per tick, by construction. */
  function masterTick() {
    tickN++;
    if (!video || video.readyState < 2) return;
    if (tickN % 2 === 1) { if (handLm) detectHand(); }
    else if (tickN % tier().bodyEvery === 0) { if (segmenter) detectBody(); }
  }

  function detectBody() {
    // The busy flag expires: if a callback is ever dropped, one lost result
    // must not silently kill body detection for the rest of the session.
    if (segBusy && performance.now() - segBusyAt < 1000) return;
    segBusy = true;
    segBusyAt = performance.now();
    detCtx.drawImage(video, 0, 0, DET_SIZE, DET_SIZE);
    try {
      segmenter.segmentForVideo(detCanvas, performance.now(), (result) => {
        try {
          const masks = result.confidenceMasks;
          if (masks && masks.length) {
            const idx = personMaskIndex >= 0 && personMaskIndex < masks.length
              ? personMaskIndex : masks.length - 1;
            // Copy out: MediaPipe recycles the mask buffer after this callback,
            // but bubbles test against it on every rendered frame in between.
            bodyMask.set(masks[idx].getAsFloat32Array());
            bodyMaskAt = performance.now();
          }
        } finally {
          segBusy = false;
        }
      });
    } catch (_) {
      segBusy = false;
    }
  }

  function detectHand() {
    detCtx.drawImage(video, 0, 0, DET_SIZE, DET_SIZE);
    let res;
    try { res = handLm.detectForVideo(detCanvas, performance.now()); } catch (_) { return; }
    const lm = res && res.landmarks && res.landmarks[0];
    if (!lm) { tip = tipPrev = null; return; }
    tipPrev = tip;
    tip = videoUVToScreen(lm[8].x, lm[8].y);   // landmark 8 = index fingertip
    // Sweep the segment from the previous tip so a fast poke can't skip
    // through a bubble between two 66ms detections.
    const a = tipPrev || tip;
    for (let i = bubbleCount - 1; i >= 0; i--) {
      const b = bubbles[i];
      const reach = b.r + FINGER_PAD;
      if (segDist2(b.x + b.swayX, b.y, a.x, a.y, tip.x, tip.y) < reach * reach) {
        popBubble(i, "finger");
      }
    }
  }

  function stopDetection() {
    if (detectTimer) { clearInterval(detectTimer); detectTimer = null; }
    if (segmenter) { try { segmenter.close(); } catch (_) {} segmenter = null; }
    if (handLm) { try { handLm.close(); } catch (_) {} handLm = null; }
    segBusy = false;
    detCanvas = null; detCtx = null;
    tip = tipPrev = null;
    bodyMaskAt = 0;
  }

  // Normalized video coords → screen px (mirror + cover-fit, same as hearts/snow).
  function videoUVToScreen(u, v) {
    const vw = video.videoWidth, vh = video.videoHeight;
    const scale = Math.max(W / vw, H / vh);
    const ox = (W - vw * scale) / 2, oy = (H - vh * scale) / 2;
    return { x: ox + vw * (1 - u) * scale, y: oy + vh * v * scale };
  }

  /* Is this screen point on the user's body? The silhouette mask is the sole
     source of truth: anything outside it (background, furniture, other
     motion) returns false by definition. */
  function bodyAt(sx, sy, vw, vh, scale, ox, oy) {
    const u = 1 - (sx - ox) / (vw * scale);
    const v = (sy - oy) / (vh * scale);
    if (u < 0 || u >= 1 || v < 0 || v >= 1) return false;
    return bodyMask[((v * MASK_SIZE) | 0) * MASK_SIZE + ((u * MASK_SIZE) | 0)] > 0.5;
  }

  function segDist2(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let t = len2 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0;
    t = Math.max(0, Math.min(1, t));
    const qx = ax + dx * t - px, qy = ay + dy * t - py;
    return qx * qx + qy * qy;
  }

  // ---------- bubbles ----------
  function initBubblePool() {
    bubbles = [];
    for (let i = 0; i < TIERS[0].bubbles; i++) bubbles.push({});
    bubbleCount = 0;
  }

  function spawnBubble() {
    if (bubbleCount >= tier().bubbles) return;
    const b = bubbles[bubbleCount++];
    b.r = 16 + Math.random() * 38;                    // radius; bigger = closer
    b.x = b.r + Math.random() * Math.max(1, W - b.r * 2);
    b.y = -b.r * 2;
    b.vy = 26 + (b.r / 54) * 30 + Math.random() * 14; // buoyant, floaty descent
    b.swayAmp = 14 + Math.random() * 30;
    b.swayFreq = 0.4 + Math.random() * 0.7;
    b.swayPhase = Math.random() * Math.PI * 2;
    b.swayX = 0;
    // Barely any rotation: the specular highlight reflects the light source,
    // so in real life it stays pointed up-left no matter how the bubble moves.
    b.rot = (Math.random() - 0.5) * 0.5;
    b.rotVel = (Math.random() - 0.5) * 0.08;
    b.hue = (Math.random() - 0.5) * 1.6;              // per-instance iridescence drift
    b.tile = (Math.random() * 4) | 0;                 // which bubble artwork variant
    b.wobblePhase = Math.random() * Math.PI * 2;
    b.wobbleFreq = 1.6 + Math.random() * 1.6;
    b.wobbleAmp = 0.045 + Math.random() * 0.035;      // squash/stretch shimmer
    b.alpha = 0.8 + Math.random() * 0.2;
    b.ttl = 7 + Math.random() * 7;                    // seconds until it pops by itself
  }

  function popBubble(i, kind) {
    const b = bubbles[i];
    spawnBurst(b.x + b.swayX, b.y, b.r, b.hue, kind === "finger");
    popStats[kind]++;
    // swap-remove keeps the active prefix dense
    bubbleCount--;
    bubbles[i] = bubbles[bubbleCount];
    bubbles[bubbleCount] = b;
  }

  function stepBubbles(dt, out, n) {
    const spawnMs = 9000 / tier().bubbles;            // keeps steady-state near the cap
    spawnClock += dt * 1000;
    if (spawnClock >= spawnMs) {
      spawnClock = 0;
      spawnBubble();
    }

    // Precompute the screen->mask transform once per frame.
    const maskFresh = bodyMaskAt && performance.now() - bodyMaskAt < MASK_STALE_MS;
    let vw = 0, vh = 0, scale = 1, ox = 0, oy = 0;
    if (maskFresh && video && video.videoWidth) {
      vw = video.videoWidth; vh = video.videoHeight;
      scale = Math.max(W / vw, H / vh);
      ox = (W - vw * scale) / 2; oy = (H - vh * scale) / 2;
    }

    // Shared air current: bubbles drift together on a slow breeze (bigger =
    // closer = more affected), instead of each swaying in its own vacuum.
    const wind = 12 * Math.sin(simT * 0.28) + 7 * Math.sin(simT * 0.9 + 1.7);

    for (let i = bubbleCount - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.y += b.vy * dt;
      b.x += wind * (0.4 + b.r / 54) * dt;
      b.rot += b.rotVel * dt;
      b.ttl -= dt;
      b.swayX = Math.sin(simT * b.swayFreq + b.swayPhase) * b.swayAmp;
      // The breeze can carry a bubble off the side; wrap it around instead of
      // letting it float on invisibly until its lifespan runs out.
      if (b.x + b.swayX < -b.r * 2) b.x += W + b.r * 4;
      else if (b.x + b.swayX > W + b.r * 2) b.x -= W + b.r * 4;
      const bx = b.x + b.swayX;

      // Natural end: lifespan out, or reached the bottom of the screen.
      if (b.ttl <= 0 || b.y > H - b.r * 0.4) { popBubble(i, "natural"); continue; }

      // Body contact: sample the bubble's center + 4 rim points against the
      // silhouette. Mask says "not the user" -> nothing happens, ever.
      if (maskFresh && vw && b.y > -b.r) {
        const rr = b.r * 0.75;
        if (bodyAt(bx, b.y, vw, vh, scale, ox, oy) ||
            bodyAt(bx - rr, b.y, vw, vh, scale, ox, oy) ||
            bodyAt(bx + rr, b.y, vw, vh, scale, ox, oy) ||
            bodyAt(bx, b.y - rr, vw, vh, scale, ox, oy) ||
            bodyAt(bx, b.y + rr, vw, vh, scale, ox, oy)) {
          popBubble(i, "body");
          continue;
        }
      }

      const o = n * 8;
      out[o] = bx; out[o + 1] = b.y;
      out[o + 2] = b.r * 2; out[o + 3] = b.alpha;
      out[o + 4] = b.tile; out[o + 5] = b.rot; out[o + 6] = b.hue;
      out[o + 7] = Math.sin(simT * b.wobbleFreq + b.wobblePhase) * b.wobbleAmp;
      n++;
    }
    return n;
  }

  // ---------- burst (droplets + film ring) ----------
  const TILE_DROP = 4, TILE_RING = 5;

  function initBursts() {
    bursts = [];
    for (let i = 0; i < BURST_POOL; i++) {
      bursts.push({ life: 0, ttl: 1, x: 0, y: 0, vx: 0, vy: 0, size: 4, grow: 0, tile: TILE_DROP, hue: 0 });
    }
  }

  function allocBurst() {
    for (let i = 0; i < BURST_POOL; i++) if (bursts[i].life <= 0) return bursts[i];
    return null;
  }

  /* The fingertip pop is a touch showier than a passive body brush. */
  function spawnBurst(x, y, r, hue, strong) {
    const drops = strong ? 14 : 9;
    const power = (strong ? 230 : 170) * (0.6 + r / 54);
    for (let i = 0; i < drops; i++) {
      const p = allocBurst();
      if (!p) return;
      const ang = Math.random() * Math.PI * 2;
      const sp = power * (0.35 + Math.random() * 0.85);
      p.x = x + Math.cos(ang) * r * 0.6;
      p.y = y + Math.sin(ang) * r * 0.6;
      p.vx = Math.cos(ang) * sp;
      p.vy = Math.sin(ang) * sp - 30;
      p.size = 3 + Math.random() * 4.5;
      p.grow = 0;
      p.ttl = 0.35 + Math.random() * 0.3;
      p.life = p.ttl;
      p.tile = TILE_DROP;
      p.hue = hue;
    }
    const ring = allocBurst();                 // the soap film snapping
    if (ring) {
      ring.x = x; ring.y = y;
      ring.vx = ring.vy = 0;
      ring.size = r * 1.7;
      ring.grow = r * (strong ? 7 : 5.5);
      ring.ttl = 0.3;
      ring.life = ring.ttl;
      ring.tile = TILE_RING;
      ring.hue = hue;
    }
  }

  function stepBursts(dt, out, n) {
    const drag = Math.exp(-dt * 2.6);
    for (let i = 0; i < BURST_POOL; i++) {
      const p = bursts[i];
      if (p.life <= 0) continue;
      p.life -= dt;
      if (p.life <= 0) continue;
      p.vx *= drag;
      p.vy = p.vy * drag + 900 * dt;           // droplets fall briefly, then fade
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.size += p.grow * dt;
      const o = n * 8;
      out[o] = p.x; out[o + 1] = p.y;
      out[o + 2] = p.size; out[o + 3] = 0.9 * (p.life / p.ttl);
      out[o + 4] = p.tile; out[o + 5] = 0; out[o + 6] = p.hue; out[o + 7] = 0;
      n++;
    }
    return n;
  }

  // ---------- sprite atlas ----------
  const TILE_PX = 192;

  /* A soft patch of thin-film color hugging the inside of the rim. Real film
     iridescence shows up as irregular pastel streaks over PARTS of the
     bubble, not a uniform rainbow band, so each patch has a random arc, a
     hue that slides across its length, and alpha that fades in and out at
     its ends (drawn as layered arc segments — no canvas filter needed). */
  function filmPatch(ctx, r, ang0, span, hue, alpha) {
    const steps = 26;
    for (let layer = 0; layer < 3; layer++) {
      const w = r * (0.24 - layer * 0.07);
      const rad = r * 0.87 - layer * r * 0.02;
      for (let i = 0; i < steps; i++) {
        const t0 = i / steps, t1 = (i + 1.5) / steps;
        const env = Math.sin(Math.min(1, (i + 0.5) / steps) * Math.PI); // fade at both ends
        ctx.beginPath();
        ctx.arc(0, 0, rad, ang0 + span * t0, ang0 + span * t1);
        ctx.strokeStyle = `hsla(${(hue + 50 * t0) % 360}, 65%, 74%, ${alpha * env * (0.45 + layer * 0.28)})`;
        ctx.lineWidth = w;
        ctx.stroke();
      }
    }
  }

  /* 6 tiles: four bubble variants, a droplet, and a thin film ring. All
     procedural. The realism cues, in order of importance: an almost
     invisible interior (a bubble is 99% the scene behind it), patchy pastel
     iridescence instead of a candy rainbow ring, a thin rim that's brightest
     on the light side, and one crisp window-light highlight up-left with a
     dim counter-reflection down-right. */
  function makeAtlas() {
    const T = TILE_PX, TILES = 6;
    const c = document.createElement("canvas");
    c.width = T * TILES; c.height = T;
    const ctx = c.getContext("2d");

    const SQUASH = [[1, 1], [1.05, 0.95], [0.96, 1.04], [1.03, 0.97]];
    const FILM_HUES = [300, 160, 190, 45, 270, 120]; // magenta/green/cyan/gold family
    for (let v = 0; v < 4; v++) {
      ctx.save();
      ctx.translate(T * v + T / 2, T / 2);
      // NB: no per-variant rotation — the highlight must stay up-left on
      // every variant, because in real life it points at the light source.
      ctx.scale(SQUASH[v][0], SQUASH[v][1]);
      const r = T * 0.4;

      // interior: barely-there glass, the faintest cool sheen near the edge
      let g = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r);
      g.addColorStop(0, "rgba(255,255,255,0.012)");
      g.addColorStop(0.8, "rgba(220,235,255,0.03)");
      g.addColorStop(0.96, "rgba(255,255,255,0.07)");
      g.addColorStop(1, "rgba(255,255,255,0.01)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();

      // 2-3 iridescent streaks at random arcs, pastel and soft
      const patches = 2 + (v % 2);
      for (let k = 0; k < patches; k++) {
        filmPatch(ctx, r,
          Math.random() * Math.PI * 2,
          0.9 + Math.random() * 1.6,
          FILM_HUES[(v * 2 + k) % FILM_HUES.length] + Math.random() * 40,
          0.10 + Math.random() * 0.06);
      }
      // one broad, blurry color slosh inside the lower half of the film
      g = ctx.createRadialGradient(0, r * 0.38, r * 0.05, 0, r * 0.38, r * 0.55);
      g.addColorStop(0, `hsla(${FILM_HUES[v % FILM_HUES.length]}, 55%, 75%, 0.05)`);
      g.addColorStop(1, "hsla(0, 0%, 100%, 0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, r * 0.38, r * 0.55, 0, Math.PI * 2); ctx.fill();

      // the rim: one thin faint line all around...
      ctx.beginPath(); ctx.arc(0, 0, r - 1, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = Math.max(1.5, r * 0.022);
      ctx.stroke();
      // ...brighter along the light side (up-left), soft-edged via layering
      for (const [w, a] of [[0.10, 0.08], [0.05, 0.15], [0.024, 0.3]]) {
        ctx.beginPath(); ctx.arc(0, 0, r - r * w * 0.5 - 0.5, -2.8, -0.55);
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.lineWidth = r * w;
        ctx.stroke();
      }

      // primary specular: small, crisp, elongated — a reflected window
      ctx.save();
      ctx.translate(-r * 0.40, -r * 0.44);
      ctx.rotate(-0.72);
      g = ctx.createRadialGradient(0, 0, 0.5, 0, 0, r * 0.3);   // soft halo
      g.addColorStop(0, "rgba(255,255,255,0.30)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.92)";                  // crisp core
      ctx.beginPath(); ctx.ellipse(0, 0, r * 0.15, 0.5 + r * 0.07, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      // dim counter-reflection opposite the light
      g = ctx.createRadialGradient(r * 0.33, r * 0.40, 0.5, r * 0.33, r * 0.40, r * 0.12);
      g.addColorStop(0, "rgba(255,255,255,0.28)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(r * 0.33, r * 0.40, r * 0.12, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // droplet: a speck of neutral white mist, no colored tint
    {
      const cx = T * TILE_DROP + T / 2, cy = T / 2, r = T * 0.17;
      let g = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, 0.5, cx, cy, r);
      g.addColorStop(0, "rgba(255,255,255,0.9)");
      g.addColorStop(0.55, "rgba(248,252,255,0.45)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    }

    // ring: the film snapping — thin, subtle, soft-edged
    {
      const cx = T * TILE_RING + T / 2, cy = T / 2, r = T * 0.4;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.16)"; ctx.lineWidth = T * 0.05; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.6)"; ctx.lineWidth = T * 0.018; ctx.stroke();
    }

    return c;
  }

  // ---------- WebGL2 renderer ----------
  function createWebGLRenderer(atlas) {
    const gl = canvas.getContext("webgl2", {
      alpha: true, antialias: false, depth: false, stencil: false,
      premultipliedAlpha: true, powerPreference: "low-power",
    });
    if (!gl) return null;

    function compile(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("bubbles shader:", gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }
    const vs = compile(gl.VERTEX_SHADER, `#version 300 es
      layout(location=0) in vec2 aQuad;
      layout(location=1) in vec4 aA;   // x, y, size, alpha
      layout(location=2) in vec4 aB;   // tile, rotation, hue, squash
      uniform vec2 uRes;
      uniform float uTiles;
      out vec2 vUv;
      flat out float vAlpha;
      flat out vec2 vHue;              // cos/sin of the hue-rotation angle
      void main() {
        vec2 q = aQuad * vec2(1.0 + aB.w, 1.0 - aB.w) * aA.z;  // wobble squash
        float cs = cos(aB.y), sn = sin(aB.y);
        vec2 p = vec2(q.x * cs - q.y * sn, q.x * sn + q.y * cs) + aA.xy;
        vec2 clip = p / uRes * 2.0 - 1.0;
        gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
        vUv = vec2((aQuad.x + 0.5 + aB.x) / uTiles, aQuad.y + 0.5);
        vAlpha = aA.w;
        vHue = vec2(cos(aB.z), sin(aB.z));
      }`);
    const fs = compile(gl.FRAGMENT_SHADER, `#version 300 es
      precision mediump float;
      in vec2 vUv;
      flat in float vAlpha;
      flat in vec2 vHue;
      uniform sampler2D uTex;
      out vec4 outColor;
      // Luminance-preserving hue rotation (SVG feColorMatrix hueRotate).
      // Linear, so it applies to premultiplied rgb directly.
      vec3 hueShift(vec3 c, float cs, float sn) {
        return clamp(vec3(
          dot(c, vec3(0.213 + cs*0.787 - sn*0.213, 0.715 - cs*0.715 - sn*0.715, 0.072 - cs*0.072 + sn*0.928)),
          dot(c, vec3(0.213 - cs*0.213 + sn*0.143, 0.715 + cs*0.285 + sn*0.140, 0.072 - cs*0.072 - sn*0.283)),
          dot(c, vec3(0.213 - cs*0.213 - sn*0.787, 0.715 - cs*0.715 + sn*0.715, 0.072 + cs*0.928 + sn*0.072))
        ), 0.0, 1.0);
      }
      void main() {
        vec4 t = texture(uTex, vUv);
        outColor = vec4(hueShift(t.rgb, vHue.x, vHue.y), t.a) * vAlpha;
      }`);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("bubbles program:", gl.getProgramInfoLog(prog));
      return null;
    }
    gl.useProgram(prog);
    const uRes = gl.getUniformLocation(prog, "uRes");
    gl.uniform1f(gl.getUniformLocation(prog, "uTiles"), 6);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const instBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, instBuf);
    gl.bufferData(gl.ARRAY_BUFFER, MAX_INST * 8 * 4, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 32, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 32, 16);
    gl.vertexAttribDivisor(2, 1);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    return {
      kind: "webgl",
      resize(w, h, ratio) {
        canvas.width = Math.round(w * ratio);
        canvas.height = Math.round(h * ratio);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, w, h);
      },
      draw(instances, count) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        if (!count) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, instBuf);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, instances, 0, count * 8);
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
      },
      destroy() {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      },
    };
  }

  // ---------- Canvas2D fallback (low tier / no WebGL2; no hue shift) ----------
  function createCanvas2DRenderer(atlas) {
    const ctx = canvas.getContext("2d");
    const T = TILE_PX;
    let dpr = 1;
    return {
      kind: "canvas2d",
      resize(w, h, ratio) {
        dpr = ratio;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      },
      draw(instances, count) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < count; i++) {
          const o = i * 8;
          const size = instances[o + 2], sq = instances[o + 7];
          ctx.globalAlpha = instances[o + 3];
          ctx.setTransform(dpr, 0, 0, dpr, instances[o] * dpr, instances[o + 1] * dpr);
          ctx.rotate(instances[o + 5]);
          ctx.scale(1 + sq, 1 - sq);
          ctx.drawImage(atlas, instances[o + 4] * T, 0, T, T, -size / 2, -size / 2, size, size);
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalAlpha = 1;
      },
      destroy() {},
    };
  }

  function startRenderer() {
    const atlas = makeAtlas();
    renderer = createWebGLRenderer(atlas);
    if (!renderer) {
      const fresh = canvas.cloneNode(false);
      canvas.replaceWith(fresh);
      canvas = fresh;
      renderer = createCanvas2DRenderer(atlas);
      if (tierIndex < 2) applyTier(2);
    }
    handleResize();
    lastFrameAt = lastStepAt = performance.now();
    rafId = requestAnimationFrame(renderFrame);
  }

  // ---------- render loop ----------
  function renderFrame(now) {
    rafId = requestAnimationFrame(renderFrame);

    const budget = 1000 / tier().fps;
    if (now - lastRenderAt < budget - 1) return;
    lastRenderAt = now;

    watchPerformance(now);

    const dt = Math.min(0.05, (now - lastStepAt) / 1000);
    lastStepAt = now;
    simT += dt;

    let n = 0;
    n = stepBubbles(dt, inst, n);
    n = stepBursts(dt, inst, n);
    renderer.draw(inst, n);
  }

  function watchPerformance(now) {
    const dt = now - lastFrameAt;
    lastFrameAt = now;
    if (dt > (1000 / tier().fps) * 1.6 && dt < 500) slowFrames++;
    else slowFrames = Math.max(0, slowFrames - 2);
    if (slowFrames > 90 && tierIndex < TIERS.length - 1) {
      applyTier(tierIndex + 1);
      slowFrames = 0;
    }
  }

  function applyTier(idx) {
    tierIndex = idx;
    while (bubbleCount > tier().bubbles) popBubble(bubbleCount - 1, "natural");
    if (detectTimer) scheduleDetection();
    handleResize();
  }

  function stopRenderer() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    if (renderer) { renderer.destroy(); renderer = null; }
  }

  // ---------- lifecycle ----------
  function handleResize() {
    if (!overlay || !renderer) return;
    W = overlay.clientWidth;
    H = overlay.clientHeight;
    renderer.resize(W, H, Math.min(tier().dpr, window.devicePixelRatio || 1));
  }

  function handleVisibility() {
    if (!isOpen) return;
    if (document.hidden) pauseAll();
    else resumeAll();
  }

  function pauseAll() {
    if (isPaused) return;
    isPaused = true;
    if (detectTimer) { clearInterval(detectTimer); detectTimer = null; }
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    stream?.getVideoTracks().forEach((t) => { t.enabled = false; });
    video?.pause();
  }

  function resumeAll() {
    if (!isPaused) return;
    isPaused = false;
    stream?.getVideoTracks().forEach((t) => { t.enabled = true; });
    video?.play().catch(() => {});
    if (segmenter || handLm) scheduleDetection();
    lastFrameAt = lastRenderAt = lastStepAt = performance.now();
    if (renderer) rafId = requestAnimationFrame(renderFrame);
  }

  function handleKey(e) {
    if (e.key === "Escape" && isOpen) close();
  }

  async function open() {
    if (isOpen) return;
    if (window.FallingHearts && window.FallingHearts.isOpen) window.FallingHearts.close();
    if (window.FallingSnow && window.FallingSnow.isOpen) window.FallingSnow.close();
    if (window.LyricsFlow && window.LyricsFlow.isOpen) window.LyricsFlow.close();
    if (window.KineticAscii && window.KineticAscii.isOpen) window.KineticAscii.close();
    isOpen = true;
    tierIndex = pickInitialTier();
    buildOverlay();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("pagehide", close);

    // Bubbles float regardless of the camera; start the show immediately.
    W = overlay.clientWidth; H = overlay.clientHeight;
    initBubblePool();
    initBursts();
    popStats.body = popStats.finger = popStats.natural = 0;
    startRenderer();

    setStatus("Starting camera…");
    try {
      await startCamera();
    } catch (err) {
      setStatus(err && err.name === "NotAllowedError"
        ? "Camera access was denied — bubbles still float, but you need the camera to pop them."
        : "Couldn't start the camera — enjoy the bubbles.");
      return;
    }
    if (!isOpen) return;

    setStatus("Loading…");
    try {
      await startDetection();
    } catch (err) {
      console.error("bubbles: detection failed to load", err);
      setStatus("");
      return;
    }
    if (!isOpen) return;
    setStatus("Pop the bubbles — poke one, or just let them land on you");
    hintTimer = setTimeout(() => { setStatus(""); hintTimer = null; }, 7000);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    isPaused = false;

    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("keydown", handleKey);
    window.removeEventListener("pagehide", close);

    if (hintTimer) { clearTimeout(hintTimer); hintTimer = null; }
    stopDetection();
    stopRenderer();
    stopCamera();

    overlay?.remove();
    document.body.classList.remove("hearts-active");
    overlay = video = canvas = statusEl = null;
    bubbles = []; bursts = []; bubbleCount = 0;
    slowFrames = 0;
  }

  document.getElementById("bubblesFxBtn")?.addEventListener("click", () => {
    isOpen ? close() : open();
  });

  return {
    open, close,
    toggle: () => (isOpen ? close() : open()),
    get isOpen() { return isOpen; },
    get stats() {
      return {
        tier: tier().name, renderer: renderer?.kind || null, paused: isPaused,
        bubbles: bubbleCount,
        pops: { ...popStats },
        maskFresh: !!bodyMaskAt && performance.now() - bodyMaskAt < MASK_STALE_MS,
      };
    },
  };
})();
window.FallingBubbles = FallingBubbles;
