/* Lyrics Flow — webcam effect: the current song's lyrics travel along the
   live outline of your silhouette.
   Self-contained: window.LyricsFlow.open()/close()/toggle().

   Fourth companion to hearts/snow/bubbles. Same segmentation building block,
   pointed at typography instead of physics:
     - person segmentation (MediaPipe, GPU, ~10-15Hz) removes the background
       and yields the silhouette mask.
     - the mask boundary is traced (Moore neighbor tracing on the padded
       mask), resampled to a fixed point count, aligned against the previous
       outline, and temporally smoothed — text is far more sensitive to
       contour jitter than physics ever was, so stabilization is explicit.
     - the smoothed loop becomes an arc-length parameterized path; the song's
       synced lyrics (same /api/lyrics service the lyric view uses) are baked
       once per line-window into a white text strip, and every frame the strip
       is sampled as small rotated quads marching along the path. The line
       being sung right now is tinted red, karaoke-style; the rest stays ink.
     - per-frame work is only: ease the outline, advance the scroll, place
       quads. Font rasterization happens roughly once per lyric line, never
       per frame — that's this effect's battery lever, playing the role that
       throttled detection plays in the others.

   Click anywhere to cycle the background style: paper / dim video / soft
   blur. No synced lyrics -> the title/artist loops along the outline instead.
   Pauses fully on tab hide; camera and model released on close. */

const LyricsFlow = (() => {
  "use strict";

  const MASK = 256;                 // segmentation input + mask resolution
  const MEDIAPIPE_VERSION = "0.10.14";
  const N_PTS = 192;                // fixed contour sample count
  const GRACE_MS = 1500;            // hold the outline after losing the person
  const LEAD = 0.15;                // light a line a hair early (matches lyric view)

  const TIERS = [
    { name: "high", segMs: 66,  fps: 60, dpr: 2,   maxQuads: 420, gap: 1.0  },
    { name: "mid",  segMs: 100, fps: 60, dpr: 1.5, maxQuads: 280, gap: 1.15 },
    { name: "low",  segMs: 150, fps: 30, dpr: 1,   maxQuads: 160, gap: 1.35 },
  ];

  const GLYPH_H = 27;               // on-screen text height, css px
  const STRIP_H = 66, STRIP_FONT = 48, STRIP_MAX_W = 4000;
  // Manrope is the Inter-style sans the app actually loads from Google Fonts
  // (the stylesheet says "Inter" but never fetches it); system-ui backs it up.
  const FONT = `600 ${STRIP_FONT}px "Manrope", "Inter", system-ui, -apple-system, sans-serif`;
  const SCROLL_SPEED = 55;          // px/s along the outline
  const TEXT_DISTANCE = 180;        // gap between the body edge and the text ring, px

  /* Background styles the user can cycle with a click. Ink/highlight colors
     flip with the background so the text stays legible. Stroke alpha is 0 —
     the flowing text alone traces the silhouette; the outline stays an
     invisible guide (bump the 4th number to bring the line back). */
  const BG_STYLES = [
    { name: "paper", ink: [0.10, 0.11, 0.13], hl: [0.85, 0.17, 0.17], stroke: [0.10, 0.11, 0.13, 0] },
    { name: "dim",   ink: [0.95, 0.96, 0.97], hl: [1.0, 0.36, 0.28],  stroke: [1, 1, 1, 0] },
    { name: "blur",  ink: [0.95, 0.96, 0.97], hl: [1.0, 0.36, 0.28],  stroke: [1, 1, 1, 0] },
  ];
  const PAPER = [0.955, 0.945, 0.915];

  // ---- state ----
  let overlay = null, video = null, canvas = null, statusEl = null;
  let stream = null;
  let segmenter = null, segBusy = false, segBusyAt = 0, personMaskIndex = -1;
  let renderer = null;
  let tierIndex = 0, styleIndex = 0;
  let isOpen = false, isPaused = false;
  let rafId = null, detectTimer = null, trackTimer = null, hintTimer = null;
  let lastRenderAt = 0, lastStepAt = 0;
  let slowFrames = 0, lastFrameAt = 0;
  let detCanvas = null, detCtx = null;

  let W = 0, H = 0;
  let simT = 0;

  // mask + contour
  const maskU8 = new Uint8Array(MASK * MASK);       // for the background shader
  const maskBin = new Uint8Array((MASK + 2) * (MASK + 2)); // padded, for tracing
  const distF = new Float32Array(MASK * MASK);      // chamfer distance scratch
  let maskDirty = false;
  let targetPts = null;             // Float32Array(N_PTS*2), latest smoothed halo
  let displayPts = null;            // eased toward target every frame
  let hasContour = false, contourAt = 0;
  let globalFade = 0;               // outline+text fade in/out on person found/lost

  // arc-length table for the halo path, rebuilt each frame from displayPts
  const lens = new Float32Array(N_PTS + 1);
  let pathLen = 0;

  // lyrics
  let lyrMode = "none";             // none | synced | loop (title/artist fallback)
  let lyrLines = [];                // [{t, text}]
  let lyrKey = "", lyrSeq = 0, curLine = -1;
  let scroll = 0;

  // baked text strip
  let strip = null;                 // canvas, white glyphs
  let stripChars = [];              // [{x, w, line}] in strip px
  let stripW = 0, stripVersion = 0, bakedAnchor = -2;

  const popQuads = { count: 0 };    // last frame's quad count (stats/tests)

  const inst = new Float32Array(TIERS[0].maxQuads * 8);
  const strokeVerts = new Float32Array((N_PTS + 1) * 2 * 2);

  const tier = () => TIERS[tierIndex];
  const style = () => BG_STYLES[styleIndex];

  // ---------- device tiering (same heuristic as the other effects) ----------
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
      <button class="hearts-close" aria-label="Close lyrics outline">&#10005;</button>`;
    document.body.appendChild(overlay);
    document.body.classList.add("hearts-active");
    video = overlay.querySelector(".hearts-video");
    canvas = overlay.querySelector(".hearts-canvas");
    statusEl = overlay.querySelector(".hearts-status");
    overlay.querySelector(".hearts-close").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target.closest(".hearts-close")) return;
      styleIndex = (styleIndex + 1) % BG_STYLES.length;   // cycle background look
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
    try { await video.play(); } catch (_) {}
  }

  function stopCamera() {
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    if (video) video.srcObject = null;
  }

  // ---------- segmentation ----------
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
    try { seg = await vision.ImageSegmenter.createFromOptions(fileset, options("GPU")); }
    catch (_) { seg = await vision.ImageSegmenter.createFromOptions(fileset, options("CPU")); }
    if (!isOpen) { try { seg.close(); } catch (_) {} return; }
    segmenter = seg;
    const labels = segmenter.getLabels ? segmenter.getLabels() : [];
    personMaskIndex = labels ? labels.findIndex((l) => /person|selfie|foreground/i.test(l)) : -1;

    detCanvas = document.createElement("canvas");
    detCanvas.width = MASK;
    detCanvas.height = MASK;
    detCtx = detCanvas.getContext("2d");

    scheduleDetection();
  }

  function scheduleDetection() {
    if (detectTimer) clearInterval(detectTimer);
    detectTimer = setInterval(detectOnce, tier().segMs);
  }

  function detectOnce() {
    if (!segmenter || !video || video.readyState < 2) return;
    if (segBusy && performance.now() - segBusyAt < 1000) return; // expires; see bubbles.js
    segBusy = true;
    segBusyAt = performance.now();
    detCtx.drawImage(video, 0, 0, MASK, MASK);
    try {
      segmenter.segmentForVideo(detCanvas, performance.now(), (result) => {
        try {
          const masks = result.confidenceMasks;
          if (masks && masks.length) {
            const idx = personMaskIndex >= 0 && personMaskIndex < masks.length
              ? personMaskIndex : masks.length - 1;
            onMask(masks[idx].getAsFloat32Array());
          }
        } finally {
          segBusy = false;
        }
      });
    } catch (_) {
      segBusy = false;
    }
  }

  function stopDetection() {
    if (detectTimer) { clearInterval(detectTimer); detectTimer = null; }
    if (segmenter) { try { segmenter.close(); } catch (_) {} segmenter = null; }
    segBusy = false;
    detCanvas = null; detCtx = null;
  }

  // ---------- contour pipeline ----------
  let maskEverSet = false;
  function onMask(m) {
    const P = MASK + 2;
    // Temporal blend for the DISPLAY mask: segmentation noise flickers pixels
    // at the silhouette edge every update; blending each new mask into the
    // previous one keeps the cutout edge calm. (Contour tracing uses the raw
    // mask — it has its own, stronger smoothing.)
    if (maskEverSet) {
      for (let i = 0; i < MASK * MASK; i++) {
        const v = m[i];
        const nv = v <= 0 ? 0 : v >= 1 ? 255 : (v * 255) | 0;
        maskU8[i] = (maskU8[i] * 0.35 + nv * 0.65) | 0;
      }
    } else {
      for (let i = 0; i < MASK * MASK; i++) {
        const v = m[i];
        maskU8[i] = v <= 0 ? 0 : v >= 1 ? 255 : (v * 255) | 0;
      }
      maskEverSet = true;
    }
    maskDirty = true;
    renderer && renderer.uploadMask && renderer.uploadMask();

    /* The text halo is the boundary of the mask DILATED by TEXT_DISTANCE —
       unlike offsetting the body contour point-by-point (which folds into
       itself around the head and neck), a dilated region's boundary can
       never self-intersect. The dilation comes from a two-pass chamfer
       distance transform with screen-proportional step weights, so 180px is
       honest in both axes even though the mask is a square over 16:9 video. */
    const vw = video && video.videoWidth, vh = video && video.videoHeight;
    if (!vw) return;
    const scale = Math.max(W / vw, H / vh);
    const sx = (vw * scale) / MASK, sy = (vh * scale) / MASK;
    const sd = Math.hypot(sx, sy);
    const INF = 1e9;
    let any = false;
    for (let i = 0; i < MASK * MASK; i++) {
      if (m[i] > 0.5) { distF[i] = 0; any = true; } else distF[i] = INF;
    }
    if (!any) {
      if (performance.now() - contourAt > GRACE_MS) hasContour = false;
      return;
    }
    for (let y = 0; y < MASK; y++) {          // forward pass
      const row = y * MASK;
      for (let x = 0; x < MASK; x++) {
        const i = row + x;
        let d = distF[i];
        if (x > 0 && distF[i - 1] + sx < d) d = distF[i - 1] + sx;
        if (y > 0) {
          if (distF[i - MASK] + sy < d) d = distF[i - MASK] + sy;
          if (x > 0 && distF[i - MASK - 1] + sd < d) d = distF[i - MASK - 1] + sd;
          if (x < MASK - 1 && distF[i - MASK + 1] + sd < d) d = distF[i - MASK + 1] + sd;
        }
        distF[i] = d;
      }
    }
    for (let y = MASK - 1; y >= 0; y--) {     // backward pass
      const row = y * MASK;
      for (let x = MASK - 1; x >= 0; x--) {
        const i = row + x;
        let d = distF[i];
        if (x < MASK - 1 && distF[i + 1] + sx < d) d = distF[i + 1] + sx;
        if (y < MASK - 1) {
          if (distF[i + MASK] + sy < d) d = distF[i + MASK] + sy;
          if (x < MASK - 1 && distF[i + MASK + 1] + sd < d) d = distF[i + MASK + 1] + sd;
          if (x > 0 && distF[i + MASK - 1] + sd < d) d = distF[i + MASK - 1] + sd;
        }
        distF[i] = d;
      }
    }
    maskBin.fill(0);                          // dilated silhouette, padded for tracing
    for (let y = 0; y < MASK; y++) {
      const row = (y + 1) * P + 1, src = y * MASK;
      for (let x = 0; x < MASK; x++) maskBin[row + x] = distF[src + x] <= TEXT_DISTANCE ? 1 : 0;
    }

    const loop = traceLargestLoop(maskBin, P);
    if (!loop || loop.length < 40) {
      if (performance.now() - contourAt > GRACE_MS) hasContour = false;
      return;
    }
    const pts = resampleLoop(loop, N_PTS);   // mask space -> N evenly spaced points
    toScreen(pts);
    orientLoop(pts);                          // glyph tops must face outward
    if (targetPts && hasContour) {
      alignLoop(pts, targetPts);
      for (let i = 0; i < N_PTS * 2; i++) targetPts[i] = targetPts[i] * 0.65 + pts[i] * 0.35;
    } else {
      targetPts = pts.slice();
      if (!displayPts) displayPts = pts.slice();
      else displayPts.set(pts);
    }
    spatialSmooth(targetPts);
    hasContour = true;
    contourAt = performance.now();
  }

  /* Moore-neighbor boundary tracing over the padded grid; returns the longest
     boundary loop as [x0,y0, x1,y1, ...] in padded-pixel coords. */
  const MOORE = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  function traceLargestLoop(bin, P) {
    const visited = new Uint8Array(P * P);
    let best = null;
    for (let y = 1; y < P - 1; y++) {
      for (let x = 1; x < P - 1; x++) {
        const i = y * P + x;
        if (!bin[i] || bin[i - 1] || visited[i]) continue;  // fg with bg on the left
        const loop = [];
        let cx = x, cy = y, dir = 6;   // came from the left -> backtrack points W... start scan at NW
        const sx = x, sy = y;
        let steps = 0;
        do {
          visited[cy * P + cx] = 1;
          loop.push(cx, cy);
          let found = -1;
          for (let k = 0; k < 8; k++) {
            const d = (dir + k) % 8;
            const nx = cx + MOORE[d][0], ny = cy + MOORE[d][1];
            if (bin[ny * P + nx]) { found = d; cx = nx; cy = ny; break; }
          }
          if (found < 0) break;                 // isolated pixel
          dir = (found + 6) % 8;                // next scan starts just past the backtrack
          steps++;
        } while ((cx !== sx || cy !== sy) && steps < 6000);
        if (!best || loop.length > best.length) best = loop;
      }
    }
    return best;
  }

  /* Resample a traced loop to exactly n points, evenly spaced by arc length. */
  function resampleLoop(loop, n) {
    const m = loop.length / 2;
    let total = 0;
    const seg = new Float32Array(m);
    for (let i = 0; i < m; i++) {
      const j = (i + 1) % m;
      const dx = loop[j * 2] - loop[i * 2], dy = loop[j * 2 + 1] - loop[i * 2 + 1];
      seg[i] = Math.hypot(dx, dy);
      total += seg[i];
    }
    const out = new Float32Array(n * 2);
    const step = total / n;
    let acc = 0, i = 0;
    for (let k = 0; k < n; k++) {
      const want = k * step;
      while (acc + seg[i] < want) { acc += seg[i]; i = (i + 1) % m; }
      const t = seg[i] ? (want - acc) / seg[i] : 0;
      const j = (i + 1) % m;
      out[k * 2] = loop[i * 2] + (loop[j * 2] - loop[i * 2]) * t;
      out[k * 2 + 1] = loop[i * 2 + 1] + (loop[j * 2 + 1] - loop[i * 2 + 1]) * t;
    }
    return out;
  }

  /* Padded-mask pixel coords -> screen px (mirror + cover-fit, shared math). */
  function toScreen(pts) {
    const vw = video.videoWidth, vh = video.videoHeight;
    const scale = Math.max(W / vw, H / vh);
    const ox = (W - vw * scale) / 2, oy = (H - vh * scale) / 2;
    for (let i = 0; i < pts.length; i += 2) {
      const u = (pts[i] - 0.5) / MASK, v = (pts[i + 1] - 0.5) / MASK;
      pts[i] = ox + vw * (1 - u) * scale;
      pts[i + 1] = oy + vh * v * scale;
    }
  }

  /* The trace can start anywhere on the boundary, so before blending, rotate
     the new loop to best match the previous one — otherwise "smoothing" would
     average unrelated points. (Winding is already canonical via orientLoop.) */
  const _alignTmp = new Float32Array(N_PTS * 2);
  function alignLoop(pts, ref) {
    let bestOff = 0, bestD = Infinity;
    for (let off = 0; off < N_PTS; off += 2) {   // stride 2: plenty at 192 pts
      let d = 0;
      for (let i = 0; i < N_PTS; i += 8) {       // sample every 8th point
        const j = (i + off) % N_PTS;
        const dx = pts[j * 2] - ref[i * 2], dy = pts[j * 2 + 1] - ref[i * 2 + 1];
        d += dx * dx + dy * dy;
      }
      if (d < bestD) { bestD = d; bestOff = off; }
    }
    for (let i = 0; i < N_PTS; i++) {
      const j = (i + bestOff) % N_PTS;
      _alignTmp[i * 2] = pts[j * 2];
      _alignTmp[i * 2 + 1] = pts[j * 2 + 1];
    }
    pts.set(_alignTmp);
  }

  /* Three passes of neighbor averaging remove the pixel staircase and leave
     a silky curve — with no visible stroke, the text IS the outline, so the
     path itself has to read smooth. */
  function spatialSmooth(pts) {
    for (let pass = 0; pass < 3; pass++) {
      let px = pts[(N_PTS - 1) * 2], py = pts[(N_PTS - 1) * 2 + 1];
      let fx = pts[0], fy = pts[1];
      for (let i = 0; i < N_PTS; i++) {
        const nx = i < N_PTS - 1 ? pts[(i + 1) * 2] : fx;
        const ny = i < N_PTS - 1 ? pts[(i + 1) * 2 + 1] : fy;
        const cx = pts[i * 2], cy = pts[i * 2 + 1];
        pts[i * 2] = cx * 0.54 + (px + nx) * 0.23;
        pts[i * 2 + 1] = cy * 0.54 + (py + ny) * 0.23;
        px = cx; py = cy;
      }
    }
  }

  /* Canonical winding: glyph "up" for tangent (tx,ty) is (ty,-tx) in y-down
     screen coords, and it must point AWAY from the body (approximated by the
     loop centroid) — otherwise the text renders facing inward/upside-down.
     Reversing the loop here, before align/blend, keeps updates consistent. */
  function orientLoop(pts) {
    let cx = 0, cy = 0;
    for (let i = 0; i < N_PTS; i++) { cx += pts[i * 2]; cy += pts[i * 2 + 1]; }
    cx /= N_PTS; cy /= N_PTS;
    let vote = 0;
    for (let i = 0; i < N_PTS; i += 4) {
      const j = (i + 1) % N_PTS;
      const tx = pts[j * 2] - pts[i * 2], ty = pts[j * 2 + 1] - pts[i * 2 + 1];
      vote += ty * (pts[i * 2] - cx) - tx * (pts[i * 2 + 1] - cy);
    }
    if (vote < 0) {
      for (let i = 0, j = N_PTS - 1; i < j; i++, j--) {
        let t = pts[i * 2]; pts[i * 2] = pts[j * 2]; pts[j * 2] = t;
        t = pts[i * 2 + 1]; pts[i * 2 + 1] = pts[j * 2 + 1]; pts[j * 2 + 1] = t;
      }
    }
  }

  /* Rebuild the arc-length table from the eased halo path. */
  function buildPath() {
    lens[0] = 0;
    for (let i = 0; i < N_PTS; i++) {
      const j = (i + 1) % N_PTS;
      const dx = displayPts[j * 2] - displayPts[i * 2];
      const dy = displayPts[j * 2 + 1] - displayPts[i * 2 + 1];
      lens[i + 1] = lens[i] + Math.hypot(dx, dy);
    }
    pathLen = lens[N_PTS];
  }

  /* Point + tangent angle at arc distance s (binary search on the table). */
  function samplePath(s, out) {
    let lo = 0, hi = N_PTS;
    while (lo < hi - 1) {
      const mid = (lo + hi) >> 1;
      if (lens[mid] <= s) lo = mid; else hi = mid;
    }
    const j = (lo + 1) % N_PTS;
    const segLen = lens[lo + 1] - lens[lo] || 1;
    const t = (s - lens[lo]) / segLen;
    const x0 = displayPts[lo * 2], y0 = displayPts[lo * 2 + 1];
    const x1 = displayPts[j * 2], y1 = displayPts[j * 2 + 1];
    out.x = x0 + (x1 - x0) * t;
    out.y = y0 + (y1 - y0) * t;
    out.ang = Math.atan2(y1 - y0, x1 - x0);
  }

  // ---------- lyrics ----------
  function nowTrack() {
    try {
      if (typeof tempSong !== "undefined" && tempSong) return tempSong;
      if (typeof DISCS !== "undefined" && typeof index !== "undefined") return DISCS[index];
    } catch (_) {}
    return null;
  }
  function posSec() {
    try {
      if (typeof tempSong !== "undefined" && tempSong &&
          typeof ytReady !== "undefined" && ytReady && yt && yt.getCurrentTime) {
        return yt.getCurrentTime() || 0;
      }
    } catch (_) {}
    try { return curPosMs() / 1000; } catch (_) { return 0; }
  }

  async function loadLyrics() {
    const d = nowTrack();
    const key = d ? (d.title || "") + "␟" + (d.artist || "") : "";
    if (key === lyrKey) return;
    lyrKey = key;
    const seq = ++lyrSeq;
    lyrMode = "none"; lyrLines = []; curLine = -1;
    if (!d || !(d.title || "").trim()) { bakeLoopText("Coozy ♪"); return; }

    let dur = 0;
    try { dur = Math.round(curDuration()) || 0; } catch (_) {}
    const qs = new URLSearchParams({ title: d.title || "", artist: d.artist || "" });
    if (dur) qs.set("duration", String(dur));
    let j = null;
    try {
      // The server's whole lookup is budgeted at ~16s; aborting sooner than
      // that was itself a cause of "no lyrics" for songs that were on the way.
      const ctrl = new AbortController();
      const to = setTimeout(() => { try { ctrl.abort(); } catch (_) {} }, 25000);
      const r = await fetch("/api/lyrics?" + qs.toString(), { signal: ctrl.signal });
      clearTimeout(to);
      j = await r.json();
    } catch (_) {}
    if (seq !== lyrSeq || !isOpen) return;   // track changed / effect closed meanwhile

    if (j && j.synced && j.synced.length) {
      lyrLines = j.synced.map((r) => ({ t: r.t, text: (r.text || "").trim() })).filter((l) => l.text);
      lyrMode = "synced";
      curLine = -1;
      bakedAnchor = -2;                      // force a bake on the next frame
    } else {
      // Graceful: no synced lyrics -> the song title loops along the outline.
      bakeLoopText(`${d.title || "?"}${d.artist ? " — " + d.artist : ""} ♪`);
    }
  }

  function watchTrack() {
    if (trackTimer) clearInterval(trackTimer);
    trackTimer = setInterval(loadLyrics, 1500);   // notices song changes
  }

  function currentLineIdx() {
    if (lyrMode !== "synced" || !lyrLines.length) return -1;
    const t = posSec() + LEAD;
    let idx = -1;
    for (let i = 0; i < lyrLines.length; i++) { if (lyrLines[i].t <= t) idx = i; else break; }
    return idx;
  }

  // ---------- text strip baking ----------
  function newStrip() {
    const c = document.createElement("canvas");
    c.width = STRIP_MAX_W + 96;
    c.height = STRIP_H;
    return c;
  }

  /* Bake a run of text into the white strip. Records each character's strip
     x/width and which lyric line it belongs to (for the karaoke tint). */
  function bakeString(pieces) {
    if (!strip) strip = newStrip();
    const ctx = strip.getContext("2d");
    ctx.clearRect(0, 0, strip.width, strip.height);
    ctx.font = FONT;
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    stripChars = [];
    let x = 8;
    outer:
    for (const piece of pieces) {
      for (const ch of piece.text) {
        const w = ctx.measureText(ch).width;
        if (x + w > STRIP_MAX_W) break outer;
        ctx.fillText(ch, x, STRIP_H / 2);
        stripChars.push({ x, w, line: piece.line });
        x += w;
      }
    }
    stripW = x + 8;
    stripVersion++;
  }

  let loopText = "";
  function bakeLoopText(text) {
    lyrMode = "loop";
    lyrLines = []; curLine = -1;
    loopText = text;
    bakeString([{ text: (text + "   ✦   ").repeat(6), line: -1 }]);
  }

  /* Re-rasterize whatever is currently showing — used when the webfont
     finishes loading after the first bake went out in the fallback font. */
  function rebakeCurrent() {
    if (!isOpen) return;
    if (lyrMode === "loop" && loopText) bakeLoopText(loopText);
    else if (lyrMode === "synced") bakeWindow(Math.max(0, currentLineIdx()));
  }

  /* Synced mode: the outline carries EXACTLY what the lyric view shows —
     the line being sung right now (highlighted) plus the next line as an
     ink preview. Nothing else: no scraped text, no whole-song scroll. The
     pair repeats around the outline via the conveyor, and a new line is
     baked the moment playback reaches it (or the user seeks). */
  function bakeWindow(cur) {
    const pieces = [];
    const now = cur >= 0 && cur < lyrLines.length ? lyrLines[cur] : null;
    const next = cur + 1 < lyrLines.length ? lyrLines[cur + 1] : null;
    if (now) pieces.push({ text: now.text || "♪", line: cur });
    else pieces.push({ text: "♪", line: -1 });        // intro, before the first line
    pieces.push({ text: "   ✦   ", line: -1 });
    if (next) pieces.push({ text: next.text || "♪", line: -1 }, { text: "   ✦   ", line: -1 });
    bakeString(pieces);
    bakedAnchor = cur;
  }

  function maybeRebake() {
    if (lyrMode !== "synced") return;
    const cur = currentLineIdx();
    if (cur !== curLine) curLine = cur;
    if (cur !== bakedAnchor || bakedAnchor === -2) bakeWindow(cur);  // line changed / seek / first bake
  }

  // ---------- per-frame quad placement ----------
  const _s = { x: 0, y: 0, ang: 0 };
  const _sA = { x: 0, y: 0, ang: 0 }, _sB = { x: 0, y: 0, ang: 0 };
  function placeQuads(out) {
    if (!stripChars.length || pathLen < 200 || globalFade < 0.02) return 0;
    const t = tier();
    const textScale = (GLYPH_H / STRIP_FONT) * t.gap;
    const stripSpan = stripW * textScale;
    const copies = Math.max(1, Math.ceil(pathLen / Math.max(1, stripSpan)));
    /* Conveyor: the repeated strip travels around a virtual belt at least as
       long as the outline. Text past the outline's end simply hasn't scrolled
       into view yet — it must NOT wrap modulo the outline length, or a strip
       longer than the outline double-exposes over its own beginning. */
    const period = Math.max(copies * stripSpan, pathLen + GLYPH_H * 2);
    let n = 0;
    for (let c = 0; c < copies && n < t.maxQuads; c++) {
      for (let k = 0; k < stripChars.length && n < t.maxQuads; k++) {
        const ch = stripChars[k];
        let s = (ch.x * textScale + c * stripSpan + scroll) % period;
        if (s < 0) s += period;
        const wpx = ch.w * textScale;
        if (s + wpx > pathLen) continue;          // off-loop or straddling the seam
        const sMid = s + wpx / 2;
        samplePath(sMid, _s);
        // Tangent from a wider baseline (±10px along the path) instead of the
        // local segment: glyphs stop twitching as they cross the 192 contour
        // segments, and rotation changes read as one smooth curve.
        samplePath((sMid + 10) % pathLen, _sB);
        samplePath((sMid - 10 + pathLen) % pathLen, _sA);
        _s.ang = Math.atan2(_sB.y - _sA.y, _sB.x - _sA.x);
        // fade near the seam so the wrap point never visibly pops
        const seam = Math.min(1, s / 60, (pathLen - s - wpx) / 60);
        const o = n * 8;
        out[o] = _s.x;                            // the halo path IS the text line
        out[o + 1] = _s.y;
        out[o + 2] = _s.ang;
        out[o + 3] = wpx / textScale;             // strip px; shader scales
        out[o + 4] = ch.x;
        out[o + 5] = ch.w;
        out[o + 6] = ch.line >= 0 && ch.line === curLine ? 1 : 0;
        out[o + 7] = seam * globalFade;
        n++;
      }
    }
    return n;
  }

  function buildStrokeVerts() {
    const wHalf = 1.4;
    for (let i = 0; i <= N_PTS; i++) {
      const a = i % N_PTS, b = (i + 1) % N_PTS;
      const tx = displayPts[b * 2] - displayPts[a * 2];
      const ty = displayPts[b * 2 + 1] - displayPts[a * 2 + 1];
      const l = Math.hypot(tx, ty) || 1;
      const nx = (-ty / l) * wHalf, ny = (tx / l) * wHalf;
      strokeVerts[i * 4] = displayPts[a * 2] + nx;
      strokeVerts[i * 4 + 1] = displayPts[a * 2 + 1] + ny;
      strokeVerts[i * 4 + 2] = displayPts[a * 2] - nx;
      strokeVerts[i * 4 + 3] = displayPts[a * 2 + 1] - ny;
    }
  }

  // ---------- WebGL2 renderer ----------
  function createWebGLRenderer() {
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
        console.error("lyricsflow shader:", gl.getShaderInfoLog(sh));
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
        console.error("lyricsflow program:", gl.getProgramInfoLog(p));
        return null;
      }
      return p;
    }

    /* Background removal: paints the chosen style everywhere EXCEPT the
       person (the <video> element shows through the transparent hole).
       No per-frame video upload — the mask (10Hz, 256px) is all we ship. */
    const bgProg = link(`#version 300 es
      layout(location=0) in vec2 aClip;
      void main() { gl_Position = vec4(aClip, 0.0, 1.0); }`,
      `#version 300 es
      precision mediump float;
      uniform sampler2D uMask;
      uniform sampler2D uBgTex;
      uniform vec4 uMap;        // ox, oy, vw*scale, vh*scale (css px)
      uniform vec2 uScreen;     // css W, H
      uniform float uDpr;
      uniform int uStyle;       // 0 paper, 1 dim, 2 blur
      uniform vec3 uPaper;
      out vec4 outColor;
      void main() {
        vec2 sp = vec2(gl_FragCoord.x, (uScreen.y * uDpr - gl_FragCoord.y)) / uDpr;
        vec2 uv = vec2(1.0 - (sp.x - uMap.x) / uMap.z, (sp.y - uMap.y) / uMap.w);
        float m = 0.0;
        if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) {
          // 5-tap sampling softens the 256px mask's staircase into a clean
          // anti-aliased silhouette edge; ~free next to the rest of the frame.
          float px = 1.0 / ${MASK.toFixed(1)};
          m = texture(uMask, uv).r * 0.4
            + texture(uMask, uv + vec2( px,  px)).r * 0.15
            + texture(uMask, uv + vec2(-px,  px)).r * 0.15
            + texture(uMask, uv + vec2( px, -px)).r * 0.15
            + texture(uMask, uv + vec2(-px, -px)).r * 0.15;
        }
        float bg = 1.0 - smoothstep(0.45, 0.58, m);
        vec3 col; float a;
        if (uStyle == 0)      { col = uPaper; a = bg; }
        else if (uStyle == 1) { col = vec3(0.02, 0.02, 0.03); a = bg * 0.72; }
        else                  { col = texture(uBgTex, uv).rgb * 0.75; a = bg; }
        outColor = vec4(col * a, a);
      }`);

    // stroke + text share simple pipelines
    const strokeProg = link(`#version 300 es
      layout(location=0) in vec2 aPos;
      uniform vec2 uRes;
      void main() {
        vec2 clip = aPos / uRes * 2.0 - 1.0;
        gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
      }`, `#version 300 es
      precision mediump float;
      uniform vec4 uColor;
      out vec4 outColor;
      void main() { outColor = vec4(uColor.rgb * uColor.a, uColor.a); }`);

    const textProg = link(`#version 300 es
      layout(location=0) in vec2 aQuad;
      layout(location=1) in vec4 aA;   // x, y, angle, char width (strip px)
      layout(location=2) in vec4 aB;   // strip x, strip w, highlight, alpha
      uniform vec2 uRes;
      uniform float uScale;            // strip px -> screen px
      uniform float uStripW;           // strip texture width
      out vec2 vUv;
      flat out float vHl;
      flat out float vAlpha;
      void main() {
        vec2 q = vec2(aQuad.x * aA.w * uScale, aQuad.y * ${STRIP_H.toFixed(1)} * uScale);
        float cs = cos(aA.z), sn = sin(aA.z);
        vec2 p = vec2(q.x * cs - q.y * sn, q.x * sn + q.y * cs) + aA.xy;
        vec2 clip = p / uRes * 2.0 - 1.0;
        gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
        vUv = vec2((aB.x + (aQuad.x + 0.5) * aB.y) / uStripW, aQuad.y + 0.5);
        vHl = aB.z;
        vAlpha = aB.w;
      }`, `#version 300 es
      precision mediump float;
      in vec2 vUv;
      flat in float vHl;
      flat in float vAlpha;
      uniform sampler2D uText;
      uniform vec3 uInk;
      uniform vec3 uHlColor;
      out vec4 outColor;
      void main() {
        float g = texture(uText, vUv).a;
        vec3 col = mix(uInk, uHlColor, vHl);
        outColor = vec4(col, 1.0) * g * vAlpha;
      }`);
    if (!bgProg || !strokeProg || !textProg) return null;

    const U = (p, n) => gl.getUniformLocation(p, n);
    const u = {
      map: U(bgProg, "uMap"), screen: U(bgProg, "uScreen"), dpr: U(bgProg, "uDpr"),
      styleI: U(bgProg, "uStyle"), paper: U(bgProg, "uPaper"),
      maskTex: U(bgProg, "uMask"), bgTex: U(bgProg, "uBgTex"),
      strokeRes: U(strokeProg, "uRes"), strokeColor: U(strokeProg, "uColor"),
      textRes: U(textProg, "uRes"), scale: U(textProg, "uScale"), stripW: U(textProg, "uStripW"),
      ink: U(textProg, "uInk"), hl: U(textProg, "uHlColor"), textTex: U(textProg, "uText"),
    };

    // fullscreen clip-space quad
    const bgVao = gl.createVertexArray();
    gl.bindVertexArray(bgVao);
    const bgBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bgBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // stroke ribbon
    const strokeVao = gl.createVertexArray();
    gl.bindVertexArray(strokeVao);
    const strokeBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, strokeBuf);
    gl.bufferData(gl.ARRAY_BUFFER, strokeVerts.byteLength, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // text instances
    const textVao = gl.createVertexArray();
    gl.bindVertexArray(textVao);
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const instBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, instBuf);
    gl.bufferData(gl.ARRAY_BUFFER, inst.byteLength, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 32, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 32, 16);
    gl.vertexAttribDivisor(2, 1);
    gl.bindVertexArray(null);

    // textures: mask (R8), low-res bg video (for the blur style), text strip
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    const mkTex = () => {
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return t;
    };
    const maskTex = mkTex(), bgTex = mkTex(), textTex = mkTex();
    gl.bindTexture(gl.TEXTURE_2D, maskTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, MASK, MASK, 0, gl.RED, gl.UNSIGNED_BYTE, null);
    let textVersion = -1;

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
      },
      uploadMask() {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, maskTex);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, MASK, MASK, gl.RED, gl.UNSIGNED_BYTE, maskU8);
        if (styleIndex === 2 && detCanvas) {     // the blur style reuses the 256px copy
          gl.bindTexture(gl.TEXTURE_2D, bgTex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, detCanvas);
        }
      },
      draw(count) {
        gl.clear(gl.COLOR_BUFFER_BIT);

        // 1) background removal
        const vw = video && video.videoWidth, vh = video && video.videoHeight;
        if (vw) {
          const sc = Math.max(W / vw, H / vh);
          gl.useProgram(bgProg);
          gl.uniform4f(u.map, (W - vw * sc) / 2, (H - vh * sc) / 2, vw * sc, vh * sc);
          gl.uniform2f(u.screen, W, H);
          gl.uniform1f(u.dpr, dpr);
          gl.uniform1i(u.styleI, styleIndex);
          gl.uniform3f(u.paper, PAPER[0], PAPER[1], PAPER[2]);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, maskTex);
          gl.uniform1i(u.maskTex, 0);
          gl.activeTexture(gl.TEXTURE1);
          gl.bindTexture(gl.TEXTURE_2D, bgTex);
          gl.uniform1i(u.bgTex, 1);
          gl.bindVertexArray(bgVao);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }

        if (globalFade < 0.02 || !displayPts) { gl.bindVertexArray(null); return; }

        // 2) outline stroke (skipped entirely while its alpha is 0)
        const sk = style().stroke;
        if (sk[3] * globalFade > 0.01) {
          gl.useProgram(strokeProg);
          gl.uniform2f(u.strokeRes, W, H);
          gl.uniform4f(u.strokeColor, sk[0], sk[1], sk[2], sk[3] * globalFade);
          gl.bindVertexArray(strokeVao);
          gl.bindBuffer(gl.ARRAY_BUFFER, strokeBuf);
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, strokeVerts);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, (N_PTS + 1) * 2);
        }

        // 3) flowing lyrics
        if (count) {
          if (textVersion !== stripVersion && strip) {
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_2D, textTex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, strip);
            textVersion = stripVersion;
          }
          const st = style();
          gl.useProgram(textProg);
          gl.uniform2f(u.textRes, W, H);
          gl.uniform1f(u.scale, (GLYPH_H / STRIP_FONT) * tier().gap);
          gl.uniform1f(u.stripW, strip ? strip.width : 1);
          gl.uniform3f(u.ink, st.ink[0], st.ink[1], st.ink[2]);
          gl.uniform3f(u.hl, st.hl[0], st.hl[1], st.hl[2]);
          gl.activeTexture(gl.TEXTURE2);
          gl.bindTexture(gl.TEXTURE_2D, textTex);
          gl.uniform1i(u.textTex, 2);
          gl.bindVertexArray(textVao);
          gl.bindBuffer(gl.ARRAY_BUFFER, instBuf);
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, inst, 0, count * 8);
          gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
        }
        gl.bindVertexArray(null);
      },
      destroy() {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      },
    };
  }

  // ---------- Canvas2D fallback ----------
  function createCanvas2DRenderer() {
    const ctx = canvas.getContext("2d");
    let dpr = 1;
    // mask -> per-pixel background alpha, rebuilt at segmentation rate
    const bgCanvas = document.createElement("canvas");
    bgCanvas.width = bgCanvas.height = MASK;
    const bgCtx = bgCanvas.getContext("2d");
    const bgImg = bgCtx.createImageData(MASK, MASK);
    let tintInk = null, tintHl = null, tintVersion = -1;

    function refreshTints() {
      const st = style();
      const mk = (rgb) => {
        const c = document.createElement("canvas");
        c.width = strip.width; c.height = strip.height;
        const x = c.getContext("2d");
        x.drawImage(strip, 0, 0);
        x.globalCompositeOperation = "source-in";
        x.fillStyle = `rgb(${rgb.map((v) => Math.round(v * 255)).join(",")})`;
        x.fillRect(0, 0, c.width, c.height);
        return c;
      };
      tintInk = mk(st.ink);
      tintHl = mk(st.hl);
      tintVersion = stripVersion * 10 + styleIndex;
    }

    return {
      kind: "canvas2d",
      resize(w, h, ratio) {
        dpr = ratio;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      },
      uploadMask() {
        const st = styleIndex;
        const d = bgImg.data;
        const col = st === 0 ? PAPER.map((v) => v * 255) : [5, 5, 8];
        const aMul = st === 1 ? 0.72 : 1;
        for (let i = 0; i < MASK * MASK; i++) {
          d[i * 4] = col[0]; d[i * 4 + 1] = col[1]; d[i * 4 + 2] = col[2];
          d[i * 4 + 3] = (255 - maskU8[i]) * aMul;
        }
        bgCtx.putImageData(bgImg, 0, 0);
      },
      draw(count) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        const vw = video && video.videoWidth, vh = video && video.videoHeight;
        if (vw) {
          const sc = Math.max(W / vw, H / vh);
          ctx.save();
          ctx.translate((W - vw * sc) / 2 + vw * sc, (H - vh * sc) / 2);
          ctx.scale(-(vw * sc) / MASK, (vh * sc) / MASK);   // mirror to match video
          ctx.drawImage(bgCanvas, 0, 0);
          ctx.restore();
        }
        if (globalFade < 0.02 || !displayPts) return;

        const st = style();
        if (st.stroke[3] * globalFade > 0.01) {
          ctx.strokeStyle = `rgba(${st.stroke.slice(0, 3).map((v) => Math.round(v * 255)).join(",")},${st.stroke[3] * globalFade})`;
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(displayPts[0], displayPts[1]);
          for (let i = 1; i < N_PTS; i++) ctx.lineTo(displayPts[i * 2], displayPts[i * 2 + 1]);
          ctx.closePath();
          ctx.stroke();
        }

        if (count && strip) {
          if (tintVersion !== stripVersion * 10 + styleIndex) refreshTints();
          const scale = (GLYPH_H / STRIP_FONT) * tier().gap;
          for (let i = 0; i < count; i++) {
            const o = i * 8;
            const src = inst[o + 6] > 0.5 ? tintHl : tintInk;
            ctx.globalAlpha = inst[o + 7];
            ctx.setTransform(dpr, 0, 0, dpr, inst[o] * dpr, inst[o + 1] * dpr);
            ctx.rotate(inst[o + 2]);
            const w = inst[o + 3] * scale, h = STRIP_H * scale;
            ctx.drawImage(src, inst[o + 4], 0, inst[o + 5], STRIP_H, -w / 2, -h / 2, w, h);
          }
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.globalAlpha = 1;
        }
      },
      destroy() {},
    };
  }

  function startRenderer() {
    renderer = createWebGLRenderer();
    if (!renderer) {
      const fresh = canvas.cloneNode(false);
      canvas.replaceWith(fresh);
      canvas = fresh;
      renderer = createCanvas2DRenderer();
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

    // person present? fade the outline+text in/out smoothly, with grace
    const present = hasContour && performance.now() - contourAt < GRACE_MS;
    globalFade += ((present ? 1 : 0) - globalFade) * Math.min(1, dt * 4);

    let n = 0;
    if (displayPts && targetPts) {
      const k = Math.min(1, dt * 9);    // ease toward the latest halo
      for (let i = 0; i < N_PTS * 2; i++) displayPts[i] += (targetPts[i] - displayPts[i]) * k;
      buildPath();
      if (style().stroke[3] > 0) buildStrokeVerts();   // no ribbon work while hidden

      scroll += dt * SCROLL_SPEED;   // wrapped per-char against the conveyor period
      maybeRebake();
      n = placeQuads(inst);
    }
    popQuads.count = n;
    renderer.draw(n);
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
    if (trackTimer) { clearInterval(trackTimer); trackTimer = null; }
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    stream?.getVideoTracks().forEach((t) => { t.enabled = false; });
    video?.pause();
  }

  function resumeAll() {
    if (!isPaused) return;
    isPaused = false;
    stream?.getVideoTracks().forEach((t) => { t.enabled = true; });
    video?.play().catch(() => {});
    if (segmenter) scheduleDetection();
    watchTrack();
    lastFrameAt = lastRenderAt = lastStepAt = performance.now();
    if (renderer) rafId = requestAnimationFrame(renderFrame);
  }

  function handleKey(e) {
    if (e.key === "Escape" && isOpen) close();
  }

  async function open() {
    if (isOpen) return;
    for (const other of [window.FallingHearts, window.FallingSnow, window.FallingBubbles]) {
      if (other && other.isOpen) other.close();
    }
    isOpen = true;
    tierIndex = pickInitialTier();
    styleIndex = 0;
    buildOverlay();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("pagehide", close);

    W = overlay.clientWidth; H = overlay.clientHeight;
    hasContour = false; globalFade = 0; scroll = 0;
    maskEverSet = false;
    targetPts = displayPts = null;
    lyrKey = ""; lyrMode = "none"; curLine = -1; bakedAnchor = -2;
    startRenderer();
    loadLyrics();
    watchTrack();
    // Bake again once the webfont is really available, so the flowing text
    // doesn't stay stuck in the fallback face it was first rasterized with.
    try { document.fonts && document.fonts.load(FONT).then(rebakeCurrent).catch(() => {}); } catch (_) {}

    setStatus("Starting camera…");
    try {
      await startCamera();
    } catch (err) {
      setStatus(err && err.name === "NotAllowedError"
        ? "Camera access was denied — this effect needs to see you to trace your outline."
        : "Couldn't start the camera.");
      return;
    }
    if (!isOpen) return;

    setStatus("Loading…");
    try {
      await startDetection();
    } catch (err) {
      console.error("lyricsflow: segmentation failed to load", err);
      setStatus("Couldn't load the outline tracker.");
      return;
    }
    if (!isOpen) return;
    setStatus("Step into frame — the song flows around you. Click to change the backdrop");
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
    if (trackTimer) { clearInterval(trackTimer); trackTimer = null; }
    stopDetection();
    stopRenderer();
    stopCamera();

    overlay?.remove();
    document.body.classList.remove("hearts-active");
    overlay = video = canvas = statusEl = null;
    targetPts = displayPts = null;
    hasContour = false;
    strip = null; stripChars = []; lyrLines = [];
    slowFrames = 0;
  }

  document.getElementById("lyricsFlowFxBtn")?.addEventListener("click", () => {
    isOpen ? close() : open();
  });

  return {
    open, close,
    toggle: () => (isOpen ? close() : open()),
    get isOpen() { return isOpen; },
    get stats() {
      return {
        tier: tier().name, renderer: renderer?.kind || null, paused: isPaused,
        contour: hasContour, pathLen: Math.round(pathLen), quads: popQuads.count,
        lyrics: lyrMode, line: curLine, bg: style().name,
      };
    },
  };
})();
window.LyricsFlow = LyricsFlow;
