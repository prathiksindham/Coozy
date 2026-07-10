/* Falling Snow — webcam hand-interaction effect.
   Self-contained: window.FallingSnow.open()/close()/toggle().

   Companion to hearts.js and built on the same principles, but simpler where
   the feature allows it:
     - hand tracking (MediaPipe HandLandmarker, GPU): 6–15 Hz on its own timer.
       ONLY the hand model runs — no face or body detection of any kind.
     - ambient snow + snowball physics: plain kinematics stepped inside the
       rAF loop. One ball and a few hundred flakes don't need Matter.js or a
       worker; the whole per-frame simulation is microseconds.
     - rendering: WebGL2 instanced sprites (flakes, snowball, shatter burst)
       plus a triangle-strip snowdrift, Canvas2D fallback on weak devices.

   Settled snow is a heightmap along the bottom edge, not live particles:
   flakes that land convert into column height and get recycled, so cost stays
   bounded no matter how long it snows.

   Interaction: close your hand ON the pile to pack a snowball (it scoops
   visible height out of the drift), carry it around, then open your hand
   fast to throw. The ball flies as a projectile, shatters on the screen
   edges, and is reabsorbed by the pile if it lands back on it.

   Everything pauses on tab hide and tears down fully (camera light off,
   landmarker closed) on close. */

const FallingSnow = (() => {
  "use strict";

  const DET_SIZE = 256;        // detection input resolution
  const MEDIAPIPE_VERSION = "0.10.14"; // same bundle as hearts.js -> shared browser cache

  const TIERS = [
    { name: "high", flakes: 500, detectMs: 66,  fps: 60, dpr: 2,   burst: 90 },
    { name: "mid",  flakes: 250, detectMs: 100, fps: 60, dpr: 1.5, burst: 70 },
    { name: "low",  flakes: 100, detectMs: 150, fps: 30, dpr: 1,   burst: 50 },
  ];

  // ---- gesture tuning ----
  /* closure = mean fingertip-to-palm distance normalized by palm length.
     Open hand ≈ 1.5-1.9, fist ≈ 0.5-0.8; the gap between the two thresholds
     is hysteresis so a half-relaxed hand doesn't flicker between states. */
  const CLOSE_T = 0.95, OPEN_T = 1.22;
  const PACK_STREAK = 2;          // consecutive closed detections needed to pack
  const THROW_SPEED = 520;        // px/s of hand motion that counts as a throw
  const THROW_GAIN = 1.15, THROW_MAX = 2400;
  const RELEASE_COOLDOWN_MS = 450; // no instant re-pack right after letting go
  const HAND_LOST_DROPS = 5;      // missed detections before a held ball drops
  const MIN_SCOOP_H = 10;         // px of pile needed before it can be scooped

  // ---- physics tuning ----
  const GRAVITY = 1600;           // px/s² for the free-flying ball
  const PILE_CAP_FRAC = 0.3;      // drift never grows past 30% of screen height
  const COL_W = 8;                // heightmap column width, css px
  const BURST_POOL = 160;
  const MAX_FREE_BALLS = 4;

  // ---- state ----
  let overlay = null, video = null, canvas = null, statusEl = null;
  let stream = null;
  let landmarker = null;
  let renderer = null;
  let tierIndex = 0;
  let isOpen = false, isPaused = false;
  let rafId = null, detectTimer = null, hintTimer = null;
  let lastRenderAt = 0, lastStepAt = 0;
  let slowFrames = 0, lastFrameAt = 0;   // perf watchdog, same scheme as hearts
  let detCanvas = null, detCtx = null;

  let W = 0, H = 0;
  let simT = 0;                   // accumulated sim time (pause-safe wind clock)

  // pile heightmap (heights[i] = drift height in px at column i, from the bottom)
  let heights = null, cols = 0;

  // flake pool, allocated once for the top tier; the active tier uses a prefix
  let flakes = [];

  // shatter/puff particles, fixed pool, dead slots have life <= 0
  let bursts = [];

  // snowballs: at most one held, a few free-flying
  let held = null;                // { x, y, tx, ty, r, packT }
  let freeBalls = [];             // { x, y, vx, vy, r }

  // gesture state
  let handClosed = false, packStreak = 0, missStreak = 0, lastReleaseAt = 0;
  const handHist = [];            // { t, x, y } palm positions, newest last

  // instance staging buffer shared by both renderers: x, y, size, alpha, tile
  const MAX_INST = TIERS[0].flakes + BURST_POOL + MAX_FREE_BALLS + 1;
  const inst = new Float32Array(MAX_INST * 5);

  const tier = () => TIERS[tierIndex];

  // ---------- device tiering (same heuristic as hearts.js) ----------
  function pickInitialTier() {
    const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const mem = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 8;
    if (mobile && (mem <= 3 || cores <= 4)) return 2;
    if (mobile || mem <= 4) return 1;
    return 0;
  }

  // ---------- overlay DOM ----------
  /* Reuses the hearts-* classes on purpose: the two effects need the exact
     same fullscreen video + canvas + close-button chrome, and only one can be
     open at a time, so sharing the CSS keeps style.css free of duplicates. */
  function buildOverlay() {
    overlay = document.createElement("div");
    overlay.className = "hearts-overlay";
    overlay.innerHTML = `
      <video class="hearts-video" playsinline muted autoplay></video>
      <canvas class="hearts-canvas"></canvas>
      <div class="hearts-status" role="status"></div>
      <button class="hearts-close" aria-label="Close falling snow">&#10005;</button>`;
    document.body.appendChild(overlay);
    document.body.classList.add("hearts-active"); // hides the glassy app layers (see style.css)
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
    try { await video.play(); } catch (_) { /* muted autoplay rarely fails */ }
  }

  function stopCamera() {
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    if (video) video.srcObject = null;
  }

  // ---------- hand tracking ----------
  async function startDetection() {
    const visionUrl = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}`;
    const vision = await import(`${visionUrl}/vision_bundle.mjs`);
    const fileset = await vision.FilesetResolver.forVisionTasks(`${visionUrl}/wasm`);
    const options = (delegate) => ({
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
        delegate,
      },
      runningMode: "VIDEO",
      numHands: 1,
    });
    let hl;
    try {
      hl = await vision.HandLandmarker.createFromOptions(fileset, options("GPU"));
    } catch (_) {
      hl = await vision.HandLandmarker.createFromOptions(fileset, options("CPU"));
    }
    if (!isOpen) { try { hl.close(); } catch (_) {} return; } // closed while loading
    landmarker = hl;

    detCanvas = document.createElement("canvas");
    detCanvas.width = DET_SIZE;
    detCanvas.height = DET_SIZE;
    detCtx = detCanvas.getContext("2d");

    scheduleDetection();
  }

  function scheduleDetection() {
    if (detectTimer) clearInterval(detectTimer);
    detectTimer = setInterval(detectOnce, tier().detectMs);
  }

  function detectOnce() {
    if (!landmarker || !video || video.readyState < 2) return;
    // Downscale before inference — full camera resolution is wasted on landmarks.
    detCtx.drawImage(video, 0, 0, DET_SIZE, DET_SIZE);
    let res;
    try { res = landmarker.detectForVideo(detCanvas, performance.now()); } catch (_) { return; }
    const lm = res && res.landmarks && res.landmarks[0];
    if (lm) { missStreak = 0; onHand(lm); }
    else {
      // Hand left the frame. A briefly missed detection shouldn't drop the
      // ball, but a hand that's really gone should.
      if (++missStreak >= HAND_LOST_DROPS) {
        if (held) releaseBall({ x: 0, y: 0 });
        handClosed = false; packStreak = 0; handHist.length = 0;
      }
    }
  }

  function stopDetection() {
    if (detectTimer) { clearInterval(detectTimer); detectTimer = null; }
    if (landmarker) { try { landmarker.close(); } catch (_) {} landmarker = null; }
    detCanvas = null; detCtx = null;
    handHist.length = 0;
    handClosed = false; packStreak = 0; missStreak = 0;
  }

  // Normalized video coords → screen px (mirror + cover-fit, same as hearts).
  function videoUVToScreen(u, v) {
    const vw = video.videoWidth, vh = video.videoHeight;
    const scale = Math.max(W / vw, H / vh);
    const ox = (W - vw * scale) / 2, oy = (H - vh * scale) / 2;
    return { x: ox + vw * (1 - u) * scale, y: oy + vh * v * scale };
  }

  // ---------- gesture state machine: press -> hold -> throw ----------
  const TIP_IDS = [8, 12, 16, 20];        // index/middle/ring/pinky fingertips
  const PALM_IDS = [0, 5, 9, 13, 17];     // wrist + finger MCP knuckles

  function onHand(lm) {
    // Palm center, hand size, and the hand's lowest point, in screen px.
    let px = 0, py = 0, handBottom = -Infinity;
    for (const i of PALM_IDS) {
      const p = videoUVToScreen(lm[i].x, lm[i].y);
      px += p.x; py += p.y;
      if (p.y > handBottom) handBottom = p.y;
    }
    px /= PALM_IDS.length; py /= PALM_IDS.length;
    const wrist = videoUVToScreen(lm[0].x, lm[0].y);
    const midMcp = videoUVToScreen(lm[9].x, lm[9].y);
    const span = Math.max(8, Math.hypot(midMcp.x - wrist.x, midMcp.y - wrist.y));

    // Closure: how gathered the fingertips are around the palm.
    let closure = 0;
    for (const i of TIP_IDS) {
      const p = videoUVToScreen(lm[i].x, lm[i].y);
      closure += Math.hypot(p.x - px, p.y - py);
      if (p.y > handBottom) handBottom = p.y;
    }
    closure /= TIP_IDS.length * span;
    handClosed = handClosed ? closure < OPEN_T : closure < CLOSE_T;

    const now = performance.now();
    handHist.push({ t: now, x: px, y: py });
    if (handHist.length > 8) handHist.shift();

    if (held) {
      held.tx = px; held.ty = py;          // the ball rides the palm
      if (!handClosed) releaseBall(handVelocity());
      return;
    }

    // Packing: the closing motion must happen AT the pile — a fist made
    // mid-air does nothing. The hand's lowest point (fingers reaching down)
    // has to touch the drift. Two consecutive closed reads = deliberate press.
    const overPile = handBottom >= H - heightAt(px) - 30 && heightAt(px) >= MIN_SCOOP_H;
    if (handClosed && overPile && now - lastReleaseAt > RELEASE_COOLDOWN_MS) {
      if (++packStreak >= PACK_STREAK) formBall(px, py, span);
    } else {
      packStreak = 0;
    }
  }

  /* Hand velocity over the last ~220ms of detections — this is what the
     thrown ball inherits, so a fast arm motion throws hard and a slow
     hand-opening barely tosses. */
  function handVelocity() {
    const newest = handHist[handHist.length - 1];
    if (!newest) return { x: 0, y: 0 };
    let oldest = newest;
    for (let i = handHist.length - 1; i >= 0; i--) {
      if (newest.t - handHist[i].t > 220) break;
      oldest = handHist[i];
    }
    const dt = (newest.t - oldest.t) / 1000;
    if (dt < 0.04) return { x: 0, y: 0 };
    return { x: (newest.x - oldest.x) / dt, y: (newest.y - oldest.y) / dt };
  }

  function formBall(x, y, span) {
    const r = Math.min(30, Math.max(15, span * 0.34));
    scoopPile(x, r);
    held = { x, y, tx: x, ty: y, r, packT: performance.now() };
    packStreak = 0;
    setStatus("");                        // scooping = the hint has done its job
    if (hintTimer) { clearTimeout(hintTimer); hintTimer = null; }
  }

  function releaseBall(v) {
    if (!held) return;
    const speed = Math.hypot(v.x, v.y);
    const ball = { x: held.x, y: held.y, r: held.r, vx: 0, vy: 0 };
    if (speed > THROW_SPEED) {
      const k = Math.min(THROW_GAIN, THROW_MAX / speed) ; // gain, capped at THROW_MAX px/s
      ball.vx = v.x * k; ball.vy = v.y * k;
    } else {
      // A slow relax-open just drops the ball rather than throwing it.
      ball.vx = v.x * 0.4; ball.vy = Math.max(v.y * 0.4, 40);
    }
    freeBalls.push(ball);
    if (freeBalls.length > MAX_FREE_BALLS) freeBalls.shift();
    held = null;
    lastReleaseAt = performance.now();
  }

  // ---------- pile heightmap ----------
  function initPile() {
    cols = Math.ceil(W / COL_W) + 1;
    heights = new Float32Array(cols);
  }

  function resizePile() {
    const old = heights, oldCols = cols;
    initPile();
    if (!old) return;
    for (let i = 0; i < cols; i++) {       // resample the old drift into the new width
      heights[i] = old[Math.min(oldCols - 1, Math.round(i * (oldCols - 1) / Math.max(1, cols - 1)))];
    }
  }

  const colAt = (x) => Math.max(0, Math.min(cols - 1, (x / COL_W) | 0));
  const heightAt = (x) => heights[colAt(x)];

  function deposit(x, amount) {
    const cap = H * PILE_CAP_FRAC;
    const c = colAt(x);
    heights[c] = Math.min(cap, heights[c] + amount * 0.6);
    if (c > 0) heights[c - 1] = Math.min(cap, heights[c - 1] + amount * 0.2);
    if (c < cols - 1) heights[c + 1] = Math.min(cap, heights[c + 1] + amount * 0.2);
  }

  /* Gaussian bump added (landing snowball) or carved out (scooping). */
  function moundPile(x, r, sign) {
    const cap = H * PILE_CAP_FRAC;
    const spread = r * 1.4;
    const from = colAt(x - spread * 2), to = colAt(x + spread * 2);
    for (let i = from; i <= to; i++) {
      const dx = (i * COL_W + COL_W / 2) - x;
      const g = Math.exp(-(dx * dx) / (spread * spread));
      heights[i] = Math.min(cap, Math.max(0, heights[i] + sign * r * 0.85 * g));
    }
  }
  const scoopPile = (x, r) => moundPile(x, r, -1);

  /* Light diffusion each frame: fresh lands and scoop holes relax into smooth
     drifts instead of staying spiky. */
  function smoothPile(dt) {
    const k = 0.02 * Math.min(2, dt * 60);
    for (let i = 1; i < cols - 1; i++) {
      heights[i] += ((heights[i - 1] + heights[i + 1]) * 0.5 - heights[i]) * k;
    }
    heights[0] = heights[1];
    heights[cols - 1] = heights[cols - 2];
  }

  // ---------- ambient snowfall ----------
  function initFlake(f, stagger) {
    f.x = Math.random() * W;
    // Initial fill is staggered high above the screen (with some already
    // falling in view) so the snowfall fades in naturally instead of arriving
    // as one synchronized sheet.
    f.y = stagger
      ? (Math.random() < 0.35 ? Math.random() * H : -Math.random() * H * 1.6)
      : -10 - Math.random() * 80;
    f.size = 2.4 + Math.random() * 5.6;                 // draw diameter, px
    f.vy = 30 + f.size * 12 + Math.random() * 12;       // bigger = closer = faster
    f.amp = 8 + Math.random() * 22;                     // sway amplitude
    f.freq = 0.5 + Math.random() * 1.1;                 // sway frequency, rad/s
    f.phase = Math.random() * Math.PI * 2;
    f.alpha = 0.45 + ((f.size - 2.4) / 5.6) * 0.5;      // smaller = further = dimmer
    f.par = 0.3 + f.size / 8;                           // wind parallax factor
  }

  function initFlakes() {
    flakes = [];
    for (let i = 0; i < TIERS[0].flakes; i++) {
      const f = {};
      initFlake(f, true);
      flakes.push(f);
    }
  }

  /* One pass: advance every active flake, convert landed ones into pile
     height, and write survivors straight into the instance buffer. */
  function stepFlakes(dt, out, n) {
    const wind = 14 * Math.sin(simT * 0.4) + 8 * Math.sin(simT * 1.1 + 2);
    const active = tier().flakes;
    for (let i = 0; i < active; i++) {
      const f = flakes[i];
      f.y += f.vy * dt;
      f.x += wind * f.par * dt;
      if (f.x < -12) f.x += W + 24; else if (f.x > W + 12) f.x -= W + 24;
      const xd = f.x + Math.sin(simT * f.freq + f.phase) * f.amp;
      if (f.y >= H - heightAt(xd) - f.size * 0.3) {
        deposit(xd, f.size * 0.45);       // landed -> becomes drift height, flake recycles
        initFlake(f, false);
        continue;
      }
      const o = n * 5;
      out[o] = xd; out[o + 1] = f.y; out[o + 2] = f.size; out[o + 3] = f.alpha; out[o + 4] = 0;
      n++;
    }
    return n;
  }

  // ---------- shatter burst ----------
  function initBursts() {
    bursts = [];
    for (let i = 0; i < BURST_POOL; i++) bursts.push({ life: 0, ttl: 1, x: 0, y: 0, vx: 0, vy: 0, size: 3 });
  }

  /* nx/ny: unit direction pointing away from the surface that was hit. */
  function spawnBurst(x, y, nx, ny, count, power) {
    const base = Math.atan2(ny, nx);
    let spawned = 0;
    for (let i = 0; i < BURST_POOL && spawned < count; i++) {
      const p = bursts[i];
      if (p.life > 0) continue;
      const ang = base + (Math.random() - 0.5) * 2.6;
      const sp = power * (0.3 + Math.random() * 0.9);
      p.x = x; p.y = y;
      p.vx = Math.cos(ang) * sp;
      p.vy = Math.sin(ang) * sp;
      p.ttl = 0.5 + Math.random() * 0.45;
      p.life = p.ttl;
      p.size = 2 + Math.random() * 3.5;
      spawned++;
    }
  }

  function stepBursts(dt, out, n) {
    const drag = Math.exp(-dt * 3);
    for (let i = 0; i < BURST_POOL; i++) {
      const p = bursts[i];
      if (p.life <= 0) continue;
      p.life -= dt;
      if (p.life <= 0) continue;
      p.vx *= drag; p.vy = p.vy * drag + GRAVITY * 0.35 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
      const o = n * 5;
      out[o] = p.x; out[o + 1] = p.y; out[o + 2] = p.size;
      out[o + 3] = 0.9 * (p.life / p.ttl); out[o + 4] = 0;
      n++;
    }
    return n;
  }

  // ---------- snowball ----------
  function stepBalls(dt, out, n) {
    // Free-flying balls: projectile arc, shatter on edges, reabsorb on the pile.
    for (let i = freeBalls.length - 1; i >= 0; i--) {
      const b = freeBalls[i];
      b.vy += GRAVITY * dt;
      b.x += b.vx * dt; b.y += b.vy * dt;
      let dead = false;
      if (b.x < b.r)          { spawnBurst(b.r, b.y, 1, 0, tier().burst, 420); dead = true; }
      else if (b.x > W - b.r) { spawnBurst(W - b.r, b.y, -1, 0, tier().burst, 420); dead = true; }
      else if (b.y < b.r)     { spawnBurst(b.x, b.r, 0, 1, tier().burst, 420); dead = true; }
      else if (b.vy > 0 && b.y + b.r >= H - heightAt(b.x)) {
        // Came down on the drift: the snow goes back where it came from.
        moundPile(b.x, b.r, 1);
        spawnBurst(b.x, H - heightAt(b.x) - b.r * 0.5, 0, -1, 14, 160);
        dead = true;
      }
      if (dead) { freeBalls.splice(i, 1); continue; }
      const o = n * 5;
      out[o] = b.x; out[o + 1] = b.y; out[o + 2] = b.r * 2; out[o + 3] = 1; out[o + 4] = 1;
      n++;
    }

    if (held) {
      // Bound to the hand: chase the palm target fast enough to read as
      // attached, smooth enough to hide the 10-15Hz detection cadence.
      const k = Math.min(1, dt * 18);
      held.x += (held.tx - held.x) * k;
      held.y += (held.ty - held.y) * k;
      const pack = Math.min(1, (performance.now() - held.packT) / 180); // packs up over 180ms
      const o = n * 5;
      out[o] = held.x; out[o + 1] = held.y;
      out[o + 2] = held.r * 2 * (0.5 + 0.5 * pack); out[o + 3] = 1; out[o + 4] = 1;
      n++;
    }
    return n;
  }

  // ---------- sprites ----------
  /* 2-tile atlas: tile 0 = soft round flake, tile 1 = packed snowball. */
  function makeAtlas() {
    const T = 64;
    const c = document.createElement("canvas");
    c.width = T * 2; c.height = T;
    const ctx = c.getContext("2d");

    let g = ctx.createRadialGradient(T / 2, T / 2, 1, T / 2, T / 2, T / 2 - 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.9)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, T, T);

    const bx = T + T / 2, by = T / 2, br = T / 2 - 3;
    g = ctx.createRadialGradient(bx - br * 0.35, by - br * 0.35, br * 0.15, bx, by, br);
    g.addColorStop(0, "#ffffff");
    g.addColorStop(0.75, "#eef4fb");
    g.addColorStop(1, "#cfdded");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(165,190,220,0.55)";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx, by, br - 0.75, 0, Math.PI * 2); ctx.stroke();

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
        console.error("snow shader:", gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }
    function link(vsSrc, fsSrc) {
      const vs = compile(gl.VERTEX_SHADER, vsSrc);
      const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error("snow program:", gl.getProgramInfoLog(p));
        return null;
      }
      return p;
    }

    // Instanced sprites: flakes, burst particles, snowballs. One draw call.
    const instProg = link(`#version 300 es
      layout(location=0) in vec2 aQuad;
      layout(location=1) in vec4 aInst;   // x, y, size, alpha
      layout(location=2) in float aTile;
      uniform vec2 uRes;
      out vec2 vUv;
      flat out float vAlpha;
      void main() {
        vec2 p = aQuad * aInst.z + aInst.xy;
        vec2 clip = p / uRes * 2.0 - 1.0;
        gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
        vUv = vec2((aQuad.x + 0.5 + aTile) / 2.0, aQuad.y + 0.5);
        vAlpha = aInst.w;
      }`, `#version 300 es
      precision mediump float;
      in vec2 vUv;
      flat in float vAlpha;
      uniform sampler2D uTex;
      out vec4 outColor;
      void main() {
        outColor = texture(uTex, vUv) * vAlpha;   // premultiplied
      }`);

    // The snowdrift: a triangle strip along the heightmap, white fading to a
    // cool blue toward its base.
    const pileProg = link(`#version 300 es
      layout(location=0) in vec2 aPos;
      layout(location=1) in float aShade;  // 0 = crest, 1 = floor
      uniform vec2 uRes;
      out float vShade;
      void main() {
        vec2 clip = aPos / uRes * 2.0 - 1.0;
        gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
        vShade = aShade;
      }`, `#version 300 es
      precision mediump float;
      in float vShade;
      out vec4 outColor;
      void main() {
        vec3 c = mix(vec3(1.0), vec3(0.82, 0.88, 0.97), vShade);
        float a = 0.96;
        outColor = vec4(c * a, a);
      }`);
    if (!instProg || !pileProg) return null;

    const uResInst = gl.getUniformLocation(instProg, "uRes");
    const uResPile = gl.getUniformLocation(pileProg, "uRes");

    // instance VAO: static unit quad + dynamic interleaved instance data
    const instVao = gl.createVertexArray();
    gl.bindVertexArray(instVao);
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const instBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, instBuf);
    gl.bufferData(gl.ARRAY_BUFFER, MAX_INST * 5 * 4, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 20, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 20, 16);
    gl.vertexAttribDivisor(2, 1);

    // pile VAO: dynamic strip, reallocated on resize (column count changes)
    const pileVao = gl.createVertexArray();
    gl.bindVertexArray(pileVao);
    const pileBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pileBuf);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 12, 8);
    gl.bindVertexArray(null);
    let pileVerts = null;   // Float32Array, (cols*2) * 3 floats

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
        gl.useProgram(instProg); gl.uniform2f(uResInst, w, h);
        gl.useProgram(pileProg); gl.uniform2f(uResPile, w, h);
        gl.bindBuffer(gl.ARRAY_BUFFER, pileBuf);
        pileVerts = new Float32Array(cols * 2 * 3);
        gl.bufferData(gl.ARRAY_BUFFER, pileVerts.byteLength, gl.DYNAMIC_DRAW);
      },
      draw(instances, count) {
        gl.clear(gl.COLOR_BUFFER_BIT);

        let maxH = 0;
        for (let i = 0; i < cols; i++) if (heights[i] > maxH) maxH = heights[i];
        if (maxH > 0.5 && pileVerts) {
          for (let i = 0; i < cols; i++) {
            const x = Math.min(W, i * COL_W);
            const o = i * 6;
            pileVerts[o] = x;     pileVerts[o + 1] = H - heights[i]; pileVerts[o + 2] = 0;
            pileVerts[o + 3] = x; pileVerts[o + 4] = H;              pileVerts[o + 5] = 1;
          }
          gl.useProgram(pileProg);
          gl.bindVertexArray(pileVao);
          gl.bindBuffer(gl.ARRAY_BUFFER, pileBuf);
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, pileVerts);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, cols * 2);
        }

        if (count) {
          gl.useProgram(instProg);
          gl.bindVertexArray(instVao);
          gl.bindBuffer(gl.ARRAY_BUFFER, instBuf);
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, instances, 0, count * 5);
          gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
        }
        gl.bindVertexArray(null);
      },
      destroy() {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      },
    };
  }

  // ---------- Canvas2D fallback (low tier / no WebGL2) ----------
  function createCanvas2DRenderer(atlas) {
    const ctx = canvas.getContext("2d");
    const T = 64;
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

        let maxH = 0;
        for (let i = 0; i < cols; i++) if (heights[i] > maxH) maxH = heights[i];
        if (maxH > 0.5) {
          const g = ctx.createLinearGradient(0, H - maxH, 0, H);
          g.addColorStop(0, "rgba(255,255,255,0.96)");
          g.addColorStop(1, "rgba(209,224,247,0.96)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.moveTo(0, H);
          for (let i = 0; i < cols; i++) ctx.lineTo(Math.min(W, i * COL_W), H - heights[i]);
          ctx.lineTo(W, H);
          ctx.closePath();
          ctx.fill();
        }

        for (let i = 0; i < count; i++) {
          const o = i * 5;
          const size = instances[o + 2];
          ctx.globalAlpha = instances[o + 3];
          ctx.drawImage(atlas, instances[o + 4] * T, 0, T, T,
            instances[o] - size / 2, instances[o + 1] - size / 2, size, size);
        }
        ctx.globalAlpha = 1;
      },
      destroy() {},
    };
  }

  function startRenderer() {
    const atlas = makeAtlas();
    renderer = createWebGLRenderer(atlas);
    if (!renderer) {
      const fresh = canvas.cloneNode(false);  // a failed WebGL attempt claims the canvas
      canvas.replaceWith(fresh);
      canvas = fresh;
      renderer = createCanvas2DRenderer(atlas);
      if (tierIndex < 2) applyTier(2);        // no GPU instancing -> low tier caps
    }
    handleResize();
    lastFrameAt = lastStepAt = performance.now();
    rafId = requestAnimationFrame(renderFrame);
  }

  // ---------- render loop ----------
  function renderFrame(now) {
    rafId = requestAnimationFrame(renderFrame);

    const budget = 1000 / tier().fps;
    if (now - lastRenderAt < budget - 1) return;  // 30fps tier skips frames
    lastRenderAt = now;

    watchPerformance(now);

    const dt = Math.min(0.05, (now - lastStepAt) / 1000);
    lastStepAt = now;
    simT += dt;

    smoothPile(dt);
    let n = 0;
    n = stepFlakes(dt, inst, n);
    n = stepBursts(dt, inst, n);
    n = stepBalls(dt, inst, n);   // last -> snowball draws on top
    renderer.draw(inst, n);
  }

  function watchPerformance(now) {
    const dt = now - lastFrameAt;
    lastFrameAt = now;
    if (dt > (1000 / tier().fps) * 1.6 && dt < 500) slowFrames++;
    else slowFrames = Math.max(0, slowFrames - 2);
    // ~2s of sustained missed budget -> drop a tier instead of staying janky
    if (slowFrames > 90 && tierIndex < TIERS.length - 1) {
      applyTier(tierIndex + 1);
      slowFrames = 0;
    }
  }

  function applyTier(idx) {
    tierIndex = idx;
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
    resizePile();
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
    if (landmarker) scheduleDetection();
    lastFrameAt = lastRenderAt = lastStepAt = performance.now();
    if (renderer) rafId = requestAnimationFrame(renderFrame);
  }

  function handleKey(e) {
    if (e.key === "Escape" && isOpen) close();
  }

  async function open() {
    if (isOpen) return;
    if (window.FallingHearts && window.FallingHearts.isOpen) window.FallingHearts.close();
    if (window.FallingBubbles && window.FallingBubbles.isOpen) window.FallingBubbles.close();
    if (window.LyricsFlow && window.LyricsFlow.isOpen) window.LyricsFlow.close();
    isOpen = true;
    tierIndex = pickInitialTier();
    buildOverlay();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("pagehide", close);

    // Snowfall doesn't need the camera — start it immediately so the effect
    // is alive while permissions/model load resolve (or even if they fail).
    W = overlay.clientWidth; H = overlay.clientHeight;
    initPile();
    initFlakes();
    initBursts();
    startRenderer();

    setStatus("Starting camera…");
    try {
      await startCamera();
    } catch (err) {
      setStatus(err && err.name === "NotAllowedError"
        ? "Camera access was denied — snow still falls, but you need the camera to play with it."
        : "Couldn't start the camera — enjoy the snowfall.");
      return; // ambient snow keeps running; no interaction
    }
    if (!isOpen) return; // closed while the permission prompt was open

    setStatus("Loading…");
    try {
      await startDetection();
    } catch (err) {
      console.error("snow: hand tracking failed to load", err);
      setStatus("");   // snow still falls and drifts; no hand interaction
      return;
    }
    if (!isOpen) return;
    setStatus("Let it pile up, then close your hand on the snow to pack a snowball");
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
    heights = null; cols = 0;
    flakes = []; bursts = []; freeBalls = []; held = null;
    slowFrames = 0;
  }

  document.getElementById("snowFxBtn")?.addEventListener("click", () => {
    isOpen ? close() : open();
  });

  return {
    open, close,
    toggle: () => (isOpen ? close() : open()),
    pileAt: (x) => (heights ? Math.round(heightAt(x)) : 0),  // drift depth probe (debug/tests)
    get isOpen() { return isOpen; },
    get stats() {
      return {
        tier: tier().name, renderer: renderer?.kind || null, paused: isPaused,
        holding: !!held, freeBalls: freeBalls.length,
        pileMax: heights ? Math.round(Math.max(...heights)) : 0,
      };
    },
  };
})();
window.FallingSnow = FallingSnow;
