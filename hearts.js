/* Falling Hearts — webcam physics effect.
   Self-contained: window.FallingHearts.open()/close()/toggle().

   Three loops run at deliberately different rates:
     - detection (MediaPipe selfie segmentation, GPU): 6–15 Hz on its own timer
     - physics (Matter.js): 60 Hz fixed-step inside hearts-worker.js
     - rendering: rAF, drawing the latest worker positions

   Everything pauses on tab hide and tears down fully (camera light off,
   segmenter closed, worker terminated) on close. */

const FallingHearts = (() => {
  "use strict";

  const MASK_SIZE = 256;       // detection input resolution
  const CELL_PX = 18;          // silhouette sample grid, in screen px (fine enough for hands)
  const MAX_OBSTACLES = 320;   // must match the worker's pool
  const MEDIAPIPE_VERSION = "0.10.14";

  // Caps are sized to fill the whole screen with settled hearts (heart radius
  // scales inversely in the worker, so lower tiers fill it with fewer, bigger hearts).
  const TIERS = [
    { name: "high", cap: 2200, detectMs: 66,  fps: 60, dpr: 2   },
    { name: "mid",  cap: 1200, detectMs: 100, fps: 60, dpr: 1.5 },
    { name: "low",  cap: 600,  detectMs: 150, fps: 30, dpr: 1   },
  ];

  /* Object packs: same engine, different sprites + fall behavior. Physics
     fields override the worker's DEFAULT_PROFILE. To swap artwork, just
     replace the SVG files in assets/. */
  const PRESETS = {
    hearts: {
      assets: ["assets/heart-red.svg", "assets/heart-pink.svg"],
      fallbacks: ["#d93030", "#d9306e"],
      spriteScale: 2.7,
      physics: {},
    },
    petals: {
      assets: ["assets/petal-1.svg", "assets/petal-2.svg", "assets/petal-3.svg", "assets/petal-4.svg"],
      fallbacks: ["#f5ead2", "#e8ecf2", "#f2e6c8", "#eef0f5"],
      spriteScale: 3.1,
      // Real petal fall: featherweight, high drag (slow terminal velocity),
      // no bounce, strong side-to-side flutter with rocking rotation.
      physics: {
        gravity: 0.35,
        airMin: 0.02, airVar: 0.02,
        restMin: 0.02, restVar: 0.05,
        fricMin: 0.5, fricVar: 0.3,
        density: 0.0008,
        flutterX: 0.00045, flutterLift: 0.00012, flutterFreq: 0.0035,
        rock: 0.025,
        spawnVX: 2.5, spawnVYBase: 0.2, spawnVYVar: 0.8,
        spawnSpin: 0.06, spawnTilt: 3.1,
        fallVy: 0.2,
      },
    },
  };
  let mode = "hearts";

  // ---- state ----
  let overlay = null, video = null, canvas = null, statusEl = null;
  let stream = null;
  let segmenter = null, segmenterBusy = false, personMaskIndex = -1;
  let handLandmarker = null, gestureStreak = 0, lastGestureAt = 0;
  let worker = null;
  let renderer = null;
  let tierIndex = 0;
  let isOpen = false, isPaused = false;
  let rafId = null, detectTimer = null;
  let lastRenderAt = 0;

  /* The worker publishes physics snapshots ~60Hz; we keep the two newest and
     interpolate between them each rAF so motion stays smooth even when the
     display refresh and the physics tick don't line up. */
  let prevBuf = null, currBuf = null;
  let prevT = 0, currT = 0;
  let prevCount = 0, currCount = 0;
  let lerpBuf = null;
  const INTERP_DELAY_MS = 24; // render slightly in the past so we can always lerp

  // perf watchdog (steps the tier down if we keep missing frame budget)
  let slowFrames = 0, lastFrameAt = 0;

  let detCanvas = null, detCtx = null;
  let gridSolid = null, gridCols = 0, gridRows = 0;

  const tier = () => TIERS[tierIndex];

  // ---------- device tiering ----------
  function pickInitialTier() {
    const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const mem = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 8;
    if (mobile && (mem <= 3 || cores <= 4)) return 2;
    if (mobile || mem <= 4) return 1;
    return 0;
  }

  // ---------- overlay DOM ----------
  function buildOverlay() {
    overlay = document.createElement("div");
    overlay.className = "hearts-overlay";
    overlay.innerHTML = `
      <video class="hearts-video" playsinline muted autoplay></video>
      <canvas class="hearts-canvas"></canvas>
      <div class="hearts-status" role="status"></div>
      <button class="hearts-close" aria-label="Close falling hearts">&#10005;</button>
      <button class="hearts-reset" aria-label="Reset hearts">&#8634; Reset</button>`;
    document.body.appendChild(overlay);
    document.body.classList.add("hearts-active");
    video = overlay.querySelector(".hearts-video");
    canvas = overlay.querySelector(".hearts-canvas");
    statusEl = overlay.querySelector(".hearts-status");
    overlay.querySelector(".hearts-close").addEventListener("click", close);
    overlay.querySelector(".hearts-reset").addEventListener("click", () => {
      worker?.postMessage({ type: "reset" });
    });
    // Click/tap anywhere = the same heart pop + burst as the gesture.
    overlay.addEventListener("click", (e) => {
      if (e.target.closest(".hearts-close, .hearts-reset")) return;
      heartPop(e.clientX, e.clientY);
      worker?.postMessage({ type: "burst", x: e.clientX, y: e.clientY, n: 12 });
    });
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
    try { await video.play(); } catch (_) { /* autoplay of a muted stream rarely fails */ }
  }

  function stopCamera() {
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    if (video) video.srcObject = null;
  }

  // ---------- person detection ----------
  async function startDetection() {
    const visionUrl = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}`;
    const vision = await import(`${visionUrl}/vision_bundle.mjs`);
    const fileset = await vision.FilesetResolver.forVisionTasks(`${visionUrl}/wasm`);
    const options = (delegate) => ({
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite",
        delegate,
      },
      runningMode: "VIDEO",
      outputCategoryMask: false,
      outputConfidenceMasks: true,
    });
    let seg;
    try {
      seg = await vision.ImageSegmenter.createFromOptions(fileset, options("GPU"));
    } catch (_) {
      seg = await vision.ImageSegmenter.createFromOptions(fileset, options("CPU"));
    }
    if (!isOpen) { try { seg.close(); } catch (_) {} return; } // closed while loading
    segmenter = seg;
    const labels = segmenter.getLabels ? segmenter.getLabels() : [];
    personMaskIndex = labels ? labels.findIndex((l) => /person|selfie|foreground/i.test(l)) : -1;

    // Hand tracking powers the two-hands-heart gesture. Optional: if it fails
    // to load, the rest of the effect works without it.
    try {
      const hl = await vision.HandLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 2,
      });
      if (!isOpen) { try { hl.close(); } catch (_) {} return; }
      handLandmarker = hl;
    } catch (err) {
      console.warn("hearts: hand tracking unavailable", err);
    }

    detCanvas = document.createElement("canvas");
    detCanvas.width = MASK_SIZE;
    detCanvas.height = MASK_SIZE;
    detCtx = detCanvas.getContext("2d");

    scheduleDetection();
  }

  function scheduleDetection() {
    if (detectTimer) clearInterval(detectTimer);
    detectTimer = setInterval(detectOnce, tier().detectMs);
  }

  function detectOnce() {
    if (!segmenter || segmenterBusy || !video || video.readyState < 2) return;
    segmenterBusy = true;
    // Downscale before inference — full camera resolution is wasted on a silhouette.
    detCtx.drawImage(video, 0, 0, MASK_SIZE, MASK_SIZE);
    // Full cadence: hand circles are what hearts get caught in, so they
    // should be as fresh as the outline.
    if (handLandmarker) {
      try { detectHands(); } catch (_) {}
    }
    try {
      segmenter.segmentForVideo(detCanvas, performance.now(), (result) => {
        try {
          const masks = result.confidenceMasks;
          if (masks && masks.length) {
            const idx = personMaskIndex >= 0 && personMaskIndex < masks.length
              ? personMaskIndex : masks.length - 1;
            publishObstacles(masks[idx].getAsFloat32Array());
          }
        } finally {
          segmenterBusy = false;
        }
      });
    } catch (_) {
      segmenterBusy = false;
    }
  }

  /* ---------- heart gesture (two-hand heart or one-hand finger heart) ---------- */
  const dist2d = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);

  // Two hands forming a heart: index tips meet at the top, thumb tips meet
  // below them, wrists apart.
  function twoHandHeart(a, b) {
    if (dist2d(a[8], b[8]) > 0.14 || dist2d(a[4], b[4]) > 0.22) return null;
    if ((a[8].y + b[8].y) / 2 > (a[4].y + b[4].y) / 2 - 0.02) return null;
    if (dist2d(a[0], b[0]) < 0.12) return null;
    return mid([a[8], b[8], a[4], b[4]]);
  }

  // Korean finger heart: thumb and index tips crossed, other fingers curled.
  function fingerHeart(h) {
    if (dist2d(h[4], h[8]) > 0.055) return null;
    for (const tip of [12, 16, 20]) {
      if (dist2d(h[tip], h[0]) > dist2d(h[tip - 2], h[0]) + 0.01) return null; // finger extended
    }
    return mid([h[4], h[8]]);
  }

  function mid(pts) {
    let x = 0, y = 0;
    for (const p of pts) { x += p.x; y += p.y; }
    return { x: x / pts.length, y: y / pts.length };
  }

  function detectHands() {
    const res = handLandmarker.detectForVideo(detCanvas, performance.now());
    const hands = res.landmarks || [];
    publishHandObstacles(hands);
    checkHeartGesture(hands);
  }

  /* Ship every hand landmark to the physics as a collision circle sized to the
     hand's apparent size — palms get bigger circles than finger joints, so an
     open or cupped hand forms a solid little platform hearts can land in. */
  const PALM_LANDMARKS = new Set([0, 1, 2, 5, 9, 13, 17]);

  function publishHandObstacles(hands) {
    if (!worker || !overlay || !video) return;
    const buf = new Float32Array(42 * 3);
    let n = 0;
    for (let k = 0; k < Math.min(2, hands.length); k++) {
      const lm = hands[k];
      const wrist = videoUVToScreen(lm[0].x, lm[0].y);
      const knuckle = videoUVToScreen(lm[9].x, lm[9].y);
      const palmLen = Math.hypot(knuckle.x - wrist.x, knuckle.y - wrist.y);
      const rPalm = Math.min(30, Math.max(10, palmLen * 0.3));
      const rFinger = Math.min(18, Math.max(6, palmLen * 0.17));
      for (let j = 0; j < 21; j++) {
        const p = videoUVToScreen(lm[j].x, lm[j].y);
        buf[n * 3] = p.x;
        buf[n * 3 + 1] = p.y;
        buf[n * 3 + 2] = PALM_LANDMARKS.has(j) ? rPalm : rFinger;
        n++;
      }
    }
    worker.postMessage({ type: "hands", buffer: buf.buffer, count: n }, [buf.buffer]);
  }

  function checkHeartGesture(hands) {
    let center = null;
    if (hands.length >= 2) center = twoHandHeart(hands[0], hands[1]);
    if (!center) for (const h of hands) { center = fingerHeart(h); if (center) break; }

    if (!center) { gestureStreak = 0; return; }
    // Two consecutive positives before firing, then a cooldown, so a hand
    // passing through the pose doesn't spam pops.
    if (++gestureStreak < 2 || performance.now() - lastGestureAt < 3500) return;
    lastGestureAt = performance.now();
    gestureStreak = 0;
    const s = videoUVToScreen(center.x, center.y);
    heartPop(s.x, s.y);
    worker?.postMessage({ type: "burst", x: s.x, y: s.y, n: 18 });
  }

  // Normalized video coords → screen px (mirror + cover-fit, same as obstacles).
  function videoUVToScreen(u, v) {
    const W = overlay.clientWidth, H = overlay.clientHeight;
    const vw = video.videoWidth, vh = video.videoHeight;
    const scale = Math.max(W / vw, H / vh);
    const ox = (W - vw * scale) / 2, oy = (H - vh * scale) / 2;
    return { x: ox + vw * (1 - u) * scale, y: oy + vh * v * scale };
  }

  /* Instagram-style like animation: a big heart pops with a springy scale,
     then floats up and fades. */
  function heartPop(x, y) {
    if (!overlay) return;
    const img = document.createElement("img");
    img.className = "hearts-pop";
    img.src = "assets/heart-red.svg";
    img.style.left = x + "px";
    img.style.top = y + "px";
    overlay.appendChild(img);
    img.addEventListener("animationend", () => img.remove(), { once: true });
    setTimeout(() => img.remove(), 2000); // fallback if the animation never runs
  }

  /* Convert the mask into physics obstacles: sample it on a coarse screen grid,
     keep only the silhouette's boundary cells, and ship those as circle centers.
     The video is displayed mirrored with cover-fit, so each screen point maps
     back through that transform into mask space. */
  function publishObstacles(mask) {
    if (!overlay || !video || !worker) return; // effect closed while segmenting
    const W = overlay.clientWidth, H = overlay.clientHeight;
    const vw = video.videoWidth, vh = video.videoHeight;
    if (!W || !H || !vw || !vh) return;

    const cols = Math.min(72, Math.ceil(W / CELL_PX));
    const rows = Math.min(72, Math.ceil(H / CELL_PX));
    const cw = W / cols, ch = H / rows;
    if (!gridSolid || gridCols !== cols || gridRows !== rows) {
      gridSolid = new Uint8Array(cols * rows);
      gridCols = cols; gridRows = rows;
    }

    const scale = Math.max(W / vw, H / vh);      // object-fit: cover
    const ox = (W - vw * scale) / 2, oy = (H - vh * scale) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const sx = (c + 0.5) * cw, sy = (r + 0.5) * ch;
        let vx = (sx - ox) / scale, vy = (sy - oy) / scale;
        vx = vw - vx; // undo the CSS mirror
        let solid = 0;
        if (vx >= 0 && vx < vw && vy >= 0 && vy < vh) {
          const mx = (vx / vw * MASK_SIZE) | 0, my = (vy / vh * MASK_SIZE) | 0;
          solid = mask[my * MASK_SIZE + mx] > 0.5 ? 1 : 0;
        }
        gridSolid[r * cols + c] = solid;
      }
    }

    const pts = new Float32Array(MAX_OBSTACLES * 3);
    let n = 0;
    const radius = Math.max(cw, ch) * 0.78;
    for (let r = 0; r < rows && n < MAX_OBSTACLES; r++) {
      for (let c = 0; c < cols && n < MAX_OBSTACLES; c++) {
        if (!gridSolid[r * cols + c]) continue;
        const boundary =
          r === 0 || !gridSolid[(r - 1) * cols + c] ||
          (r < rows - 1 && !gridSolid[(r + 1) * cols + c]) ||
          c === 0 || !gridSolid[r * cols + c - 1] ||
          (c < cols - 1 && !gridSolid[r * cols + c + 1]);
        if (!boundary) continue;
        pts[n * 3] = (c + 0.5) * cw;
        pts[n * 3 + 1] = (r + 0.5) * ch;
        pts[n * 3 + 2] = radius;
        n++;
      }
    }

    worker?.postMessage({ type: "obstacles", buffer: pts.buffer, count: n }, [pts.buffer]);
  }

  function stopDetection() {
    if (detectTimer) { clearInterval(detectTimer); detectTimer = null; }
    if (segmenter) { try { segmenter.close(); } catch (_) {} segmenter = null; }
    if (handLandmarker) { try { handLandmarker.close(); } catch (_) {} handLandmarker = null; }
    segmenterBusy = false;
    gestureStreak = 0;
    detCanvas = null; detCtx = null;
  }

  // ---------- physics worker ----------
  function startWorker() {
    worker = new Worker("hearts-worker.js?v=6");
    worker.onmessage = (e) => {
      if (e.data.type !== "positions") return;
      // Ping-pong: hold the two newest buffers, return the oldest to the pool.
      if (prevBuf) {
        worker.postMessage({ type: "buffer", buffer: prevBuf.buffer }, [prevBuf.buffer]);
      }
      prevBuf = currBuf; prevT = currT; prevCount = currCount;
      currBuf = new Float32Array(e.data.buffer);
      currT = performance.now();
      currCount = e.data.count;
    };
    worker.postMessage({
      type: "init",
      w: overlay.clientWidth,
      h: overlay.clientHeight,
      cap: tier().cap,
      maxCap: TIERS[0].cap,
      spawnEveryMs: 170,
      profile: PRESETS[mode].physics,
    });
  }

  function stopWorker() {
    if (worker) { worker.terminate(); worker = null; }
    prevBuf = currBuf = lerpBuf = null;
    prevCount = currCount = 0;
    prevT = currT = 0;
  }

  // ---------- rendering ----------
  function makeHeartSprite(size, color) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const s = size / 24; // heart path authored in a 24×24 box
    ctx.scale(s, s);
    ctx.translate(12, 12.6);
    ctx.beginPath();
    ctx.moveTo(0, 7.2);
    ctx.bezierCurveTo(-1.2, 6.2, -9.6, -0.4, -9.6, -3.4);
    ctx.bezierCurveTo(-9.6, -7.4, -6.6, -9.6, -4.4, -9.6);
    ctx.bezierCurveTo(-2.2, -9.6, -0.6, -8.2, 0, -6.6);
    ctx.bezierCurveTo(0.6, -8.2, 2.2, -9.6, 4.4, -9.6);
    ctx.bezierCurveTo(6.6, -9.6, 9.6, -7.4, 9.6, -3.4);
    ctx.bezierCurveTo(9.6, -0.4, 1.2, 6.2, 0, 7.2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    return c;
  }

  /* Artwork comes from the Figma-exported SVGs in assets/ (hearts: nodes
     218:411/218:405, petals: 220:433/426/421/453). Each is rasterized
     aspect-fit into a 128px square tile; the procedural bezier heart is only
     a fallback if an asset fails to load. */
  function loadSprites() {
    const preset = PRESETS[mode];
    const load = (url) => new Promise((res) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = () => res(null);
      img.src = url;
    });
    return Promise.all(preset.assets.map(load))
      .then((imgs) => imgs.map((img, i) => {
        if (!img) return makeHeartSprite(128, preset.fallbacks[i]);
        const c = document.createElement("canvas");
        c.width = c.height = 128;
        const fit = 116 / Math.max(img.width, img.height); // keep aspect ratio
        const w = img.width * fit, h = img.height * fit;
        c.getContext("2d").drawImage(img, (128 - w) / 2, (128 - h) / 2, w, h);
        return c;
      }));
  }

  function createWebGLRenderer(sprites) {
    const gl = canvas.getContext("webgl2", {
      alpha: true, antialias: false, depth: false, stencil: false,
      premultipliedAlpha: true, powerPreference: "low-power",
    });
    if (!gl) return null;

    const tiles = sprites.length;
    const spriteScale = PRESETS[mode].spriteScale;
    const vsSrc = `#version 300 es
      layout(location=0) in vec2 aQuad;
      layout(location=1) in vec4 aInst; // x, y, angle, radius
      uniform vec2 uRes;
      uniform float uTiles;
      uniform float uScale;
      out vec2 vUv;
      flat out float vBright;
      void main() {
        float cs = cos(aInst.z), sn = sin(aInst.z);
        vec2 p = aQuad * (aInst.w * uScale);
        p = vec2(p.x * cs - p.y * sn, p.x * sn + p.y * cs) + aInst.xy;
        vec2 clip = p / uRes * 2.0 - 1.0;
        gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
        // Stable per-instance randomness: which sprite variant, plus a slight
        // brightness variation so the pile reads with depth.
        float h = fract(sin(float(gl_InstanceID) * 12.9898) * 43758.5453);
        float tile = min(floor(h * uTiles), uTiles - 1.0);
        // Atlas UV computed here so the fragment stage needs no shared uniforms.
        vUv = vec2((aQuad.x + 0.5 + tile) / uTiles, aQuad.y + 0.5);
        // Darken-only: brightening premultiplied rgb past alpha fringes the edges.
        vBright = 0.86 + 0.14 * fract(h * 7.13 + 0.37);
      }`;
    const fsSrc = `#version 300 es
      precision mediump float;
      in vec2 vUv;
      flat in float vBright;
      uniform sampler2D uTex;
      out vec4 outColor;
      void main() {
        vec4 tex = texture(uTex, vUv);
        if (tex.a < 0.01) discard;
        outColor = vec4(tex.rgb * vBright, tex.a); // premultiplied
      }`;

    function compile(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("hearts shader:", gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }
    const vs = compile(gl.VERTEX_SHADER, vsSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("hearts program link:", gl.getProgramInfoLog(prog));
      return null;
    }
    gl.useProgram(prog);

    const uRes = gl.getUniformLocation(prog, "uRes");
    gl.uniform1f(gl.getUniformLocation(prog, "uTiles"), tiles);
    gl.uniform1f(gl.getUniformLocation(prog, "uScale"), spriteScale);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const inst = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, inst);
    gl.bufferData(gl.ARRAY_BUFFER, TIERS[0].cap * 4 * 4, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(1, 1);

    // N-tile atlas (one tile per sprite variant), one texture bind for all instances.
    const atlas = document.createElement("canvas");
    atlas.width = 128 * tiles; atlas.height = 128;
    const actx = atlas.getContext("2d");
    sprites.forEach((s, i) => actx.drawImage(s, 128 * i, 0));

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

    let dpr = 1;
    return {
      kind: "webgl",
      resize(w, h, ratio) {
        dpr = ratio;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, w, h); // instance data stays in CSS px
      },
      draw(positions, count) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        if (!count) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, inst);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions, 0, count * 4);
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
      },
      destroy() {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      },
    };
  }

  function createCanvas2DRenderer(sprites) {
    const ctx = canvas.getContext("2d");
    let dpr = 1;
    return {
      kind: "canvas2d",
      resize(w, h, ratio) {
        dpr = ratio;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      },
      draw(positions, count) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const spriteScale = PRESETS[mode].spriteScale;
        for (let i = 0; i < count; i++) {
          const o = i * 4;
          const size = positions[o + 3] * spriteScale;
          ctx.setTransform(dpr, 0, 0, dpr, positions[o] * dpr, positions[o + 1] * dpr);
          ctx.rotate(positions[o + 2]);
          ctx.drawImage(sprites[(i * 73 + 41) % sprites.length], -size / 2, -size / 2, size, size);
        }
      },
      destroy() {},
    };
  }

  async function startRenderer() {
    const sprites = await loadSprites();
    if (!isOpen) return; // closed while sprites were loading
    renderer = createWebGLRenderer(sprites);
    if (!renderer) {
      // A failed WebGL attempt still claims the canvas's context; a 2D context
      // needs a fresh element.
      const fresh = canvas.cloneNode(false);
      canvas.replaceWith(fresh);
      canvas = fresh;
      renderer = createCanvas2DRenderer(sprites);
      if (tierIndex < 2) applyTier(2); // GPU instancing unavailable → low tier caps
    }
    handleResize();
    lastFrameAt = performance.now();
    rafId = requestAnimationFrame(renderFrame);
  }

  function renderFrame(now) {
    rafId = requestAnimationFrame(renderFrame);

    const budget = 1000 / tier().fps;
    if (now - lastRenderAt < budget - 1) return; // 30fps mode skips frames
    lastRenderAt = now;

    watchPerformance(now);

    if (!currBuf) return;
    renderer.draw(...interpolated(now));
  }

  /* Blend the two newest physics snapshots at the render timestamp. Recycled
     hearts teleport back to the top; a huge position jump means "don't lerp,
     snap" or the heart would streak across the screen. */
  function interpolated(now) {
    if (!prevBuf || currT <= prevT) return [currBuf, currCount];
    let a = (now - INTERP_DELAY_MS - prevT) / (currT - prevT);
    if (a <= 0) a = 0; else if (a >= 1) return [currBuf, currCount];
    if (!lerpBuf) lerpBuf = new Float32Array(TIERS[0].cap * 4);
    const TWO_PI = Math.PI * 2;
    for (let i = 0; i < currCount; i++) {
      const o = i * 4;
      const dx = currBuf[o] - prevBuf[o], dy = currBuf[o + 1] - prevBuf[o + 1];
      if (i >= prevCount || dx * dx + dy * dy > 10000) {
        lerpBuf[o] = currBuf[o];
        lerpBuf[o + 1] = currBuf[o + 1];
        lerpBuf[o + 2] = currBuf[o + 2];
      } else {
        lerpBuf[o] = prevBuf[o] + dx * a;
        lerpBuf[o + 1] = prevBuf[o + 1] + dy * a;
        let da = (currBuf[o + 2] - prevBuf[o + 2]) % TWO_PI;
        if (da > Math.PI) da -= TWO_PI; else if (da < -Math.PI) da += TWO_PI;
        lerpBuf[o + 2] = prevBuf[o + 2] + da * a;
      }
      lerpBuf[o + 3] = currBuf[o + 3];
    }
    return [lerpBuf, currCount];
  }

  function watchPerformance(now) {
    const dt = now - lastFrameAt;
    lastFrameAt = now;
    if (dt > (1000 / tier().fps) * 1.6 && dt < 500) slowFrames++;
    else slowFrames = Math.max(0, slowFrames - 2);
    // ~2s of sustained missed budget → drop a tier instead of staying janky
    if (slowFrames > 90 && tierIndex < TIERS.length - 1) {
      applyTier(tierIndex + 1);
      slowFrames = 0;
    }
  }

  function applyTier(idx) {
    tierIndex = idx;
    worker?.postMessage({ type: "setCap", cap: tier().cap });
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
    const w = overlay.clientWidth, h = overlay.clientHeight;
    renderer.resize(w, h, Math.min(tier().dpr, window.devicePixelRatio || 1));
    worker?.postMessage({ type: "resize", w, h });
  }

  function handleVisibility() {
    if (!isOpen) return;
    if (document.hidden) pauseAll();
    else resumeAll();
  }

  function pauseAll() {
    if (isPaused) return;
    isPaused = true;
    worker?.postMessage({ type: "pause" });
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
    // Drop the stale snapshot so the first resumed frame doesn't lerp across the gap.
    if (worker && prevBuf) {
      worker.postMessage({ type: "buffer", buffer: prevBuf.buffer }, [prevBuf.buffer]);
      prevBuf = null;
    }
    worker?.postMessage({ type: "resume" });
    if (segmenter) scheduleDetection();
    lastFrameAt = lastRenderAt = performance.now();
    if (renderer) rafId = requestAnimationFrame(renderFrame);
  }

  function handleKey(e) {
    if (e.key === "Escape" && isOpen) close();
  }

  async function open(which) {
    if (isOpen) return;
    if (window.FallingSnow && window.FallingSnow.isOpen) window.FallingSnow.close();
    if (window.FallingBubbles && window.FallingBubbles.isOpen) window.FallingBubbles.close();
    if (window.LyricsFlow && window.LyricsFlow.isOpen) window.LyricsFlow.close();
    isOpen = true;
    mode = PRESETS[which] ? which : "hearts";
    tierIndex = pickInitialTier();
    buildOverlay();
    setStatus("Starting camera…");

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("pagehide", close);

    try {
      await startCamera();
    } catch (err) {
      setStatus(err && err.name === "NotAllowedError"
        ? "Camera access was denied. Allow camera access to play with falling hearts."
        : "Couldn't start the camera.");
      return; // overlay stays up with the message + close button; no crash
    }
    if (!isOpen) return; // closed while the permission prompt was open

    setStatus("Loading…");
    startWorker();
    startRenderer();
    try {
      await startDetection();
    } catch (err) {
      console.error("hearts: segmentation failed to load", err);
      setStatus(""); // hearts still fall and pile on the floor; no silhouette
      return;
    }
    if (!isOpen) return;
    setStatus("");
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    isPaused = false;

    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("keydown", handleKey);
    window.removeEventListener("pagehide", close);

    stopDetection();
    stopRenderer();
    stopWorker();
    stopCamera();

    overlay?.remove();
    document.body.classList.remove("hearts-active");
    overlay = video = canvas = statusEl = null;
    gridSolid = null;
    slowFrames = 0;
  }

  document.getElementById("heartsFxBtn")?.addEventListener("click", () => {
    isOpen ? close() : open("hearts");
  });
  document.getElementById("petalsFxBtn")?.addEventListener("click", () => {
    isOpen ? close() : open("petals");
  });

  return {
    open, close,
    toggle: () => (isOpen ? close() : open(mode)),
    get isOpen() { return isOpen; },
    get stats() { return { mode, hearts: currCount, tier: tier().name, renderer: renderer?.kind || null, paused: isPaused }; },
  };
})();
window.FallingHearts = FallingHearts;
