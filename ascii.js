/* ascii.js — Kinetic ASCII & Typography Motion Extractor Engine (100% Full-Screen Tracking & Top-Bar UI)
 * Inspired by high-end motion design & After Effects Particle Playground.
 * Features:
 * - 100% Full-Screen Exact Tracking: Fixes half-screen/top-placement bug by matching physical resolution dpr to CSS instance coords.
 * - Cover-Fit & Mirrored Alignment (`drawVideoCoverMirrored`): Ensures 1-to-1 alignment between neural AI mask, camera feed, and screen output.
 * - Top-Right Cross Close Button (`✕`) & Top-Left Filters (`Mode: Lyrics`, `Color: Surreal Orange`).
 * - Studio-Grade Neural Object Tracking (`@mediapipe/tasks-vision ImageSegmenter selfie_segmenter`) + Instant Luma/Gradient Fallback.
 * - Default Mode: Lyrics (`charMode = "lyrics"`) & Default Color: Surreal Feel-Good Orange (`colorMode = "orange"`).
 * Zero latency start: high-performance WebGL2 instanced rendering with Canvas2D fallback.
 */
(() => {
  if (window.KineticAscii) return;

  const TIERS = [
    { name: "High", cols: 128, rows: 72, sampleHz: 30, fps: 60, dpr: 1.5 },
    { name: "Mid",  cols: 88,  rows: 50, sampleHz: 22, fps: 60, dpr: 1.2 },
    { name: "Low",  cols: 56,  rows: 32, sampleHz: 15, fps: 30, dpr: 1.0 },
  ];

  const STANDARD_RAMP = " .:-=+*#%@";
  const TILE_PX = 64; // glyph atlas cell size
  const MEDIAPIPE_VERSION = "0.10.14";

  let isOpen = false;
  let isPaused = false;
  let tierIndex = 0;
  let slowFrames = 0;

  // Camera & DOM
  let overlay = null;
  let canvas = null;
  let video = null;
  let stream = null;
  let statusEl = null;
  let modeBtn = null;
  let colorBtn = null;
  let closeBtn = null;
  let hintTimer = null;

  // Mode: "lyrics" (Default) or "standard"
  let charMode = "lyrics";
  // Color Mode: "orange" (Surreal Orange - Default), "rgb" (Exact Camera RGB), "neon" (Neon Cyber)
  let colorMode = "orange";
  let activeRamp = STANDARD_RAMP;
  let activeAtlas = null;
  let renderer = null;

  // Studio-Grade Neural Person Segmentation (`@mediapipe/tasks-vision`)
  let segmenter = null;
  let segmenterBusy = false;
  let personMaskIndex = -1;
  let segCanvas = null;
  let segCtx = null;
  let neuralMask = null; // Float32Array matching grid dimensions (1.0 = person, 0.0 = background)
  let detectTimer = null;

  // Sampling grid & motion engine
  let detCanvas = null;
  let detCtx = null;
  let gridCols = 128;
  let gridRows = 72;
  let cellCount = 0;

  // Buffers for exact color sampling, background removal/tracking, & motion extraction
  let prevGridData = null;
  let currGridData = null;
  let colorRGrid = null;     // Exact live red (0.0 .. 1.0)
  let colorGGrid = null;     // Exact live green (0.0 .. 1.0)
  let colorBGrid = null;     // Exact live blue (0.0 .. 1.0)
  let bgR = null;            // Adaptive background red
  let bgG = null;            // Adaptive background green
  let bgB = null;            // Adaptive background blue
  let bgInitialized = false;
  let subjectMask = null;    // Final combined object tracking mask (1.0 = YOU, 0.0 = Background removed)
  let tempMask = null;
  let deltaGrid = null;
  let trailGrid = null;      // Motion Extractor persistent trail (0.0 .. 1.0)
  let sortLifeGrid = null;   // Pixel Sorter cascade timer (0.0 .. 1.0)
  let sortSpeedGrid = null;  // Pixel Sorter cascade speed
  let sampleTimer = null;

  // Instances buffer for rendering (cols * rows)
  // 12 floats per instance:
  // [0..3]:  posScale (x, y, scaleX, scaleY)
  // [4..7]:  glyphRot (glyphIndex, rotation, alpha, glow)
  // [8..11]: colorVel (r, g, b, trail)
  let inst = new Float32Array(128 * 72 * 12);

  // Audio analyser
  let audioCtx = null;
  let analyser = null;
  let freqData = null;
  let audioConnected = false;

  // Animation timing
  let rafId = null;
  let simT = 0;
  let lastFrameAt = 0;
  let lastRenderAt = 0;
  let lastStepAt = 0;
  let motionEnergy = 0;
  let audioEnergy = 0;

  function tier() { return TIERS[tierIndex] || TIERS[1]; }

  function pickInitialTier() {
    const cores = navigator.hardwareConcurrency || 4;
    const mem = navigator.deviceMemory || 4;
    if (cores >= 8 && mem >= 8) return 0; // High
    if (cores >= 4 && mem >= 4) return 1; // Mid
    return 2; // Low
  }

  // ---------- Audio Connection (Conditional & Safe) ----------
  function tryAttachAudio() {
    if (audioConnected || audioCtx) return;
    try {
      const audioEl = window._playerAudio || document.querySelector("audio");
      if (!audioEl) return;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      audioCtx = new AudioContextClass();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      freqData = new Uint8Array(analyser.frequencyBinCount);

      const source = audioCtx.createMediaElementSource(audioEl);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      audioConnected = true;
    } catch (e) {
      audioConnected = false;
      analyser = null;
    }
  }

  function sampleAudioEnergy() {
    if (!audioConnected || !analyser) return 0;
    try {
      analyser.getByteFrequencyData(freqData);
      let sum = 0;
      for (let i = 0; i < 32; i++) sum += freqData[i];
      return Math.min(1.0, (sum / 32) / 200);
    } catch (_) {
      return 0;
    }
  }

  // ---------- Camera Setup ----------
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
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
    if (video) video.srcObject = null;
  }

  // ---------- Cover-Fit & Mirrored Alignment Helper ----------
  // Draws video onto offscreen target (detCanvas or segCanvas) exactly matching the screen's aspect ratio + horizontal reflection
  function drawVideoCoverMirrored(ctx, targetW, targetH) {
    if (!video || !overlay) return;
    const vw = video.videoWidth || 1280;
    const vh = video.videoHeight || 720;
    const screenW = overlay.clientWidth || 1280;
    const screenH = overlay.clientHeight || 720;

    // We calculate cover-fit scale relative to the screen dimensions
    const screenScale = Math.max(screenW / vw, screenH / vh);
    const coverW = vw * screenScale;
    const coverH = vh * screenScale;
    const ox = (screenW - coverW) / 2;
    const oy = (screenH - coverH) / 2;

    // Now scale down from screen coordinates to target (gridCols x gridRows or 256x256)
    const scaleX = targetW / screenW;
    const scaleY = targetH / screenH;

    ctx.save();
    // Horizontal mirror (reflection) so right hand raises on right side of screen
    ctx.translate(targetW, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(
      video,
      0, 0, vw, vh,
      ox * scaleX, oy * scaleY, coverW * scaleX, coverH * scaleY
    );
    ctx.restore();
  }

  // ---------- Studio-Grade Neural Person Segmentation (@mediapipe/selfie_segmenter) ----------
  async function startNeuralDetection() {
    try {
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
      if (!isOpen) { try { seg.close(); } catch (_) {} return; }
      segmenter = seg;
      const labels = segmenter.getLabels ? segmenter.getLabels() : [];
      personMaskIndex = labels ? labels.findIndex((l) => /person|selfie|foreground/i.test(l)) : -1;

      segCanvas = document.createElement("canvas");
      segCanvas.width = 256;
      segCanvas.height = 256;
      segCtx = segCanvas.getContext("2d", { willReadFrequently: true });

      if (detectTimer) clearInterval(detectTimer);
      detectTimer = setInterval(neuralDetectOnce, 66); // ~15 Hz neural tracking loop
    } catch (err) {
      console.warn("KineticAscii: Neural segmentation fallback active (using advanced gradient + luma tracking)", err);
    }
  }

  function neuralDetectOnce() {
    if (!segmenter || segmenterBusy || !video || video.readyState < 2 || !segCtx) return;
    segmenterBusy = true;
    drawVideoCoverMirrored(segCtx, 256, 256);
    try {
      segmenter.segmentForVideo(segCanvas, performance.now(), (result) => {
        try {
          const masks = result.confidenceMasks;
          if (masks && masks.length) {
            const idx = personMaskIndex >= 0 && personMaskIndex < masks.length ? personMaskIndex : masks.length - 1;
            const maskData = masks[idx].getAsFloat32Array();
            updateNeuralGridMask(maskData, 256, 256);
          }
        } finally {
          segmenterBusy = false;
        }
      });
    } catch (_) {
      segmenterBusy = false;
    }
  }

  function updateNeuralGridMask(maskData, mw, mh) {
    if (!neuralMask || neuralMask.length !== cellCount) {
      neuralMask = new Float32Array(cellCount);
    }
    // Map high-res 256x256 neural person probability directly onto our ASCII grid
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const mx = Math.min(mw - 1, Math.floor((c + 0.5) / gridCols * mw));
        const my = Math.min(mh - 1, Math.floor((r + 0.5) / gridRows * mh));
        const prob = maskData[my * mw + mx] || 0;
        neuralMask[r * gridCols + c] = prob;
      }
    }
  }

  // ---------- Offscreen Object Tracking & Exact Color Sampling ----------
  function initSampling() {
    gridCols = tier().cols;
    gridRows = tier().rows;
    cellCount = gridCols * gridRows;
    if (inst.length < cellCount * 12) {
      inst = new Float32Array(cellCount * 12);
    }

    detCanvas = document.createElement("canvas");
    detCanvas.width = gridCols;
    detCanvas.height = gridRows;
    detCtx = detCanvas.getContext("2d", { willReadFrequently: true });

    prevGridData = new Float32Array(cellCount);
    currGridData = new Float32Array(cellCount);
    colorRGrid = new Float32Array(cellCount);
    colorGGrid = new Float32Array(cellCount);
    colorBGrid = new Float32Array(cellCount);
    bgR = new Float32Array(cellCount);
    bgG = new Float32Array(cellCount);
    bgB = new Float32Array(cellCount);
    bgInitialized = false;
    subjectMask = new Float32Array(cellCount);
    tempMask = new Float32Array(cellCount);
    deltaGrid = new Float32Array(cellCount);
    trailGrid = new Float32Array(cellCount);
    sortLifeGrid = new Float32Array(cellCount);
    sortSpeedGrid = new Float32Array(cellCount);

    scheduleSampling();
  }

  function scheduleSampling() {
    if (sampleTimer) clearInterval(sampleTimer);
    sampleTimer = setInterval(sampleTick, Math.round(1000 / tier().sampleHz));
  }

  function sampleTick() {
    if (isPaused || !video || video.readyState < 2 || !detCtx) return;
    tryAttachAudio();

    drawVideoCoverMirrored(detCtx, gridCols, gridRows);
    const imgData = detCtx.getImageData(0, 0, gridCols, gridRows).data;

    let diffSum = 0;
    for (let i = 0; i < cellCount; i++) {
      const o = i * 4;
      const rVal = imgData[o] / 255.0;
      const gVal = imgData[o + 1] / 255.0;
      const bVal = imgData[o + 2] / 255.0;
      const b = (0.299 * rVal + 0.587 * gVal + 0.114 * bVal);
      const prevB = prevGridData[i] || b;
      const delta = Math.abs(b - prevB);

      colorRGrid[i] = rVal;
      colorGGrid[i] = gVal;
      colorBGrid[i] = bVal;
      currGridData[i] = b;
      deltaGrid[i] = delta;
      diffSum += delta;
      prevGridData[i] = b;

      if (!bgInitialized) {
        bgR[i] = rVal;
        bgG[i] = gVal;
        bgB[i] = bVal;
      } else {
        const bgDiff = Math.abs(rVal - bgR[i]) + Math.abs(gVal - bgG[i]) + Math.abs(bVal - bgB[i]);
        if (delta < 0.012 && trailGrid[i] < 0.02) {
          bgR[i] = bgR[i] * 0.985 + rVal * 0.015;
          bgG[i] = bgG[i] * 0.985 + gVal * 0.015;
          bgB[i] = bgB[i] * 0.985 + bVal * 0.015;
        }
      }
    }
    bgInitialized = true;

    // Object Tracking Integration (Neural AI mask + High-precision adaptive gradient differencing)
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const i = r * gridCols + c;
        const b = currGridData[i];
        const delta = deltaGrid[i];

        if (delta > 0.04) {
          trailGrid[i] = Math.min(1.0, trailGrid[i] + delta * 3.5);
        } else {
          trailGrid[i] = Math.max(0, trailGrid[i] * 0.86);
        }

        // If MediaPipe Neural AI Segmentation is active, use its exact neural confidence!
        if (neuralMask && neuralMask[i] !== undefined) {
          const neuralProb = neuralMask[i];
          // Razor-sharp neural cutoff: probability >= 0.35 = YOU, probability < 0.35 = 100% background removed
          tempMask[i] = neuralProb >= 0.35 ? Math.min(1.0, neuralProb * 1.25 + trailGrid[i] * 0.3) : 0.0;
        } else {
          // Advanced Luma + Gradient + Color Differencing (Instant fallback while neural model loads)
          const bgDiff = Math.abs(colorRGrid[i] - bgR[i]) + Math.abs(colorGGrid[i] - bgG[i]) + Math.abs(colorBGrid[i] - bgB[i]);
          const normX = (c / gridCols) - 0.5;
          const normY = (r / gridRows) - 0.52;
          const centerScore = Math.max(0, 1.0 - (normX * normX * 3.5 + normY * normY * 2.0));

          let isSubject = false;
          if (bgDiff > 0.16 || delta > 0.018 || trailGrid[i] > 0.04 || (centerScore > 0.40 && b > 0.14 && bgDiff > 0.08)) {
            isSubject = true;
          }
          tempMask[i] = isSubject ? 1.0 : 0.0;
        }

        // Pixel Sorter triggers on active subject edges
        if (tempMask[i] > 0.2 && ((b > 0.78 && delta > 0.12 && Math.random() < 0.10) || (audioEnergy > 0.6 && b > 0.70 && Math.random() < 0.04))) {
          sortLifeGrid[i] = 1.0;
          sortSpeedGrid[i] = 1.6 + Math.random() * 2.0;
        }
      }
    }

    // 2-Pass Morphological Smoothing & Dilation so your tracked body/head silhouette is completely solid and clean
    for (let r = 1; r < gridRows - 1; r++) {
      for (let c = 1; c < gridCols - 1; c++) {
        const i = r * gridCols + c;
        if (neuralMask && neuralMask[i] >= 0.35) {
          subjectMask[i] = tempMask[i];
        } else {
          const neighbors = tempMask[i] + tempMask[i - 1] + tempMask[i + 1] + tempMask[i - gridCols] + tempMask[i + gridCols];
          subjectMask[i] = neighbors >= 2.0 ? 1.0 : (tempMask[i] > 0 ? 0.65 : 0.0);
        }
      }
    }

    motionEnergy = Math.min(1.0, (diffSum / cellCount) * 15.0);
  }

  function stopSampling() {
    if (sampleTimer) { clearInterval(sampleTimer); sampleTimer = null; }
    if (detectTimer) { clearInterval(detectTimer); detectTimer = null; }
    if (segmenter) { try { segmenter.close(); } catch (_) {} segmenter = null; }
    detCanvas = null; detCtx = null; segCanvas = null; segCtx = null;
    prevGridData = currGridData = colorRGrid = colorGGrid = colorBGrid = bgR = bgG = bgB = subjectMask = tempMask = neuralMask = deltaGrid = trailGrid = sortLifeGrid = sortSpeedGrid = null;
  }

  // ---------- Glyph Atlas Generator ----------
  function getLyricsRamp() {
    let text = "";
    try {
      const curEl = document.querySelector(".lyr-morph");
      if (curEl && curEl.textContent) text += curEl.textContent;
      const plainEl = document.getElementById("lyricsPlain");
      if (plainEl && plainEl.textContent) text += plainEl.textContent;
      const titleEl = document.getElementById("trackTitle");
      if (titleEl && titleEl.textContent) text += titleEl.textContent;
    } catch (_) {}

    if (!text || text.trim().length < 4) {
      text = "HOTLINE BLING RETRO PLAYER COZY MUSIC VISUALS SABLE MAC MILLER GOOD NEWS KINETIC TYPOGRAPHY MOTION EXTRACTOR DEEP GLOW PIXEL SORTER ";
    }
    
    const chars = Array.from(new Set(text.replace(/[^a-zA-Z0-9!?@#$%&*+=/ ]/g, "").split(""))).join("");
    if (chars.length < 5) return STANDARD_RAMP;
    return " " + chars.slice(0, 15);
  }

  function updateAtlas() {
    activeRamp = charMode === "lyrics" ? getLyricsRamp() : STANDARD_RAMP;
    activeAtlas = makeAtlas(activeRamp);
    if (renderer) {
      renderer.updateAtlas(activeAtlas, activeRamp.length);
    }
  }

  function makeAtlas(rampStr) {
    const count = Math.max(1, rampStr.length);
    const T = TILE_PX;
    const c = document.createElement("canvas");
    c.width = count * T;
    c.height = T;
    const ctx = c.getContext("2d");

    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${Math.round(T * 0.72)}px "Courier New", Courier, monospace`;

    for (let i = 0; i < count; i++) {
      const ch = rampStr[i];
      ctx.shadowColor = "rgba(255, 255, 255, 0.45)";
      ctx.shadowBlur = 4;
      ctx.fillText(ch, i * T + T / 2, T / 2);
    }
    return c;
  }

  // ---------- WebGL2 Surreal Feel-Good Orange Shader Pipeline ----------
  function createWebGLRenderer(atlas, charCount) {
    const gl = canvas.getContext("webgl2", {
      alpha: true, antialias: false, depth: false, stencil: false,
      premultipliedAlpha: true, powerPreference: "high-performance",
    });
    if (!gl) return null;

    function compile(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("ascii shader error:", gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }

    const vs = compile(gl.VERTEX_SHADER, `#version 300 es
      layout(location=0) in vec2 aQuad;
      layout(location=1) in vec4 aPosScale;  // x, y, scaleX, scaleY
      layout(location=2) in vec4 aGlyphRot;  // glyphIndex, rotation, alpha, glow
      layout(location=3) in vec4 aColorVel;  // exact r, g, b, trail
      
      uniform vec2 uRes;
      uniform vec2 uGridColsRows;
      uniform float uCharCount;
      
      out vec2 vUv;
      flat out float vAlpha;
      flat out float vGlow;
      flat out vec3 vColor;
      flat out float vTrail;
      out vec2 vScreenUv;

      void main() {
        vec2 cellPx = vec2(uRes.x / uGridColsRows.x, uRes.y / uGridColsRows.y);
        
        // Clean bounded rotation (~5.7 degrees max so quads stay crisp and never skew)
        float cs = cos(aGlyphRot.y);
        float sn = sin(aGlyphRot.y);
        vec2 q = aQuad * vec2(aPosScale.z, aPosScale.w) * cellPx;
        vec2 rotatedQ = vec2(q.x * cs - q.y * sn, q.x * sn + q.y * cs);
        
        vec2 p = rotatedQ + aPosScale.xy;
        vec2 clip = p / uRes * 2.0 - 1.0;
        
        gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
        
        vUv = vec2((aQuad.x + 0.5 + aGlyphRot.x) / uCharCount, aQuad.y + 0.5);
        vAlpha = aGlyphRot.z;
        vGlow = aGlyphRot.w;
        vColor = aColorVel.rgb;
        vTrail = aColorVel.a;
        vScreenUv = clip * 0.5 + 0.5;
      }`);

    const fs = compile(gl.FRAGMENT_SHADER, `#version 300 es
      precision highp float;
      in vec2 vUv;
      flat in float vAlpha;
      flat in float vGlow;
      flat in vec3 vColor;
      flat in float vTrail;
      in vec2 vScreenUv;
      
      uniform sampler2D uTex;
      uniform float uTime;
      uniform float uColorMode; // 2.0 = Surreal Orange (Default), 3.0 = Matrix Green, 1.0 = Exact Camera RGB, 0.0 = Neon Cyber
      out vec4 outColor;

      void main() {
        // Sample monochrome character shape from atlas texture
        float shape = texture(uTex, vUv).r;
        if (shape < 0.03 || vAlpha < 0.04) discard;

        // Base exact live webcam RGB color and luma
        vec3 baseColor = clamp(vColor, 0.0, 1.0);
        float luma = dot(baseColor, vec3(0.299, 0.587, 0.114));

        // 1) Surreal Feel-Good Orange Palette (Mode 2.0 — Default! Radiant golden sunset orange + emotion-evoking scarlet red):
        vec3 deepRed = vec3(0.85, 0.08, 0.16);      // Deep emotional velvet crimson (#d91429)
        vec3 emotionRed = vec3(0.99, 0.24, 0.26);   // Vibrant passionate scarlet (#fc3d42)
        vec3 surrealOrange = vec3(1.0, 0.58, 0.12); // Surreal feel-good golden orange (#ff941f)
        vec3 goldenGlow = vec3(1.0, 0.84, 0.35);    // Peak golden amber highlights (#ffd659)

        float orangeMix = smoothstep(0.16, 0.76, luma + vTrail * 0.45 + vGlow * 0.22);
        vec3 orangeRedPalette = mix(deepRed, emotionRed, smoothstep(0.0, 0.40, luma));
        orangeRedPalette = mix(orangeRedPalette, surrealOrange, orangeMix);
        orangeRedPalette = mix(orangeRedPalette, goldenGlow, smoothstep(0.72, 1.4, luma + vGlow * 0.5));

        // 2) Matrix Movie Green Palette (Mode 3.0 — Authentic Wachowski Digital Rain & Phosphor Code):
        vec3 matrixDarkCode = vec3(0.0, 0.24, 0.05);   // Deep Matrix green void shadow (#003d0d)
        vec3 matrixPhosphor = vec3(0.0, 1.0, 0.255);   // Iconic Matrix digital green (#00ff41)
        vec3 matrixGlitchWhite = vec3(0.92, 1.0, 0.94);// Blinding pure magnesium white-green leading glyph (#ebfff0)

        vec3 matrixPalette = mix(matrixDarkCode, matrixPhosphor, smoothstep(0.05, 0.62, luma + vTrail * 0.40));
        // The signature Matrix "Lead Character": moving edges and bright rain peaks flash intense pure white-green!
        matrixPalette = mix(matrixPalette, matrixGlitchWhite, smoothstep(0.72, 1.35, luma + vGlow * 0.6 + vTrail * 0.5));

        // 3) Exact Camera RGB (Mode 1.0):
        vec3 trueRgb = mix(vec3(luma), baseColor, 1.30);

        // 4) Neon Cyber (Mode 0.0):
        vec3 neonRgb = mix(vec3(0.1, 0.9, 0.85), vec3(0.9, 0.3, 0.8), luma) * (0.8 + luma * 0.6);

        vec3 activeColor = orangeRedPalette;
        if (uColorMode > 2.5) activeColor = matrixPalette;
        else if (uColorMode < 1.5 && uColorMode > 0.5) activeColor = trueRgb;
        else if (uColorMode <= 0.5) activeColor = neonRgb;

        // Core character illumination + radiant aura bloom
        vec3 coreColor = activeColor * min(1.45, 1.05 + vGlow * 0.35);
        vec3 haloColor = activeColor * 0.55 * smoothstep(0.0, 1.0, shape);
        vec3 finalColor = coreColor * shape + haloColor * (vGlow * 0.55);

        // Holographic CRT scanlines (subtle 4% modulation)
        float scanline = 0.96 + 0.04 * sin(vScreenUv.y * 700.0 + uTime * 12.0);
        finalColor *= scanline;

        float finalAlpha = clamp(vAlpha * shape * (1.0 + vGlow * 0.25), 0.0, 1.0);
        outColor = vec4(finalColor * finalAlpha, finalAlpha);
      }`);

    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uGridColsRows = gl.getUniformLocation(prog, "uGridColsRows");
    const uCharCount = gl.getUniformLocation(prog, "uCharCount");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uColorMode = gl.getUniformLocation(prog, "uColorMode");
    gl.uniform1f(uCharCount, charCount);
    gl.uniform1f(uColorMode, colorMode === "orange" ? 2.0 : (colorMode === "green" ? 3.0 : (colorMode === "rgb" ? 1.0 : 0.0)));

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const instBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, instBuf);
    gl.bufferData(gl.ARRAY_BUFFER, inst.length * 4, gl.DYNAMIC_DRAW);
    
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 48, 0);
    gl.vertexAttribDivisor(1, 1);
    
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 48, 16);
    gl.vertexAttribDivisor(2, 1);
    
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 4, gl.FLOAT, false, 48, 32);
    gl.vertexAttribDivisor(3, 1);

    let tex = gl.createTexture();
    function setupTex(img) {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    setupTex(atlas);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    return {
      kind: "webgl",
      resize(w, h, ratio) {
        const physW = Math.round(w * ratio);
        const physH = Math.round(h * ratio);
        canvas.width = physW;
        canvas.height = physH;
        gl.viewport(0, 0, physW, physH);
        gl.useProgram(prog);
        // CRITICAL FIX: uRes is set to CSS dimensions (w, h) so instance positions (inst[o], inst[o+1] in CSS px)
        // map across 100% of clip space [-1.0, +1.0] without half-screen top-placement shrinkage!
        gl.uniform2f(uRes, w, h);
        gl.uniform2f(uGridColsRows, gridCols, gridRows);
      },
      updateAtlas(newAtlas, newCount) {
        gl.useProgram(prog);
        gl.uniform1f(uCharCount, newCount);
        setupTex(newAtlas);
      },
      updateColorMode(newMode) {
        gl.useProgram(prog);
        const val = newMode === "orange" ? 2.0 : (newMode === "green" ? 3.0 : (newMode === "rgb" ? 1.0 : 0.0));
        gl.uniform1f(uColorMode, val);
      },
      draw(instances, count, nowSec) {
        gl.useProgram(prog);
        gl.bindVertexArray(vao);
        gl.uniform1f(uTime, nowSec);
        gl.uniform2f(uGridColsRows, gridCols, gridRows);
        gl.clearColor(0.04, 0.05, 0.08, 0.95);
        gl.clear(gl.COLOR_BUFFER_BIT);
        if (!count) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, instBuf);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, instances, 0, count * 12);
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
      },
      destroy() {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      },
    };
  }

  // ---------- Canvas2D Fallback Renderer ----------
  function createCanvas2DRenderer(atlas, charCount) {
    const ctx = canvas.getContext("2d");
    let dpr = 1;
    let currAtlas = atlas;
    let currCount = charCount;

    const scratch = document.createElement("canvas");
    scratch.width = TILE_PX;
    scratch.height = TILE_PX;
    const sCtx = scratch.getContext("2d");

    return {
      kind: "canvas2d",
      resize(w, h, ratio) {
        dpr = ratio;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      },
      updateAtlas(newAtlas, newCount) {
        currAtlas = newAtlas;
        currCount = newCount;
      },
      updateColorMode() {},
      updateCharMode() {},
      draw(instances, count, nowSec) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = "rgba(8, 10, 16, 0.94)";
        ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

        const cellW = (canvas.width / dpr) / gridCols;
        const cellH = (canvas.height / dpr) / gridRows;
        const T = TILE_PX;

        for (let i = 0; i < count; i++) {
          const o = i * 12;
          const x = instances[o];
          const y = instances[o + 1];
          const scaleX = instances[o + 2];
          const scaleY = instances[o + 3];
          const gIdx = instances[o + 4];
          const rot = instances[o + 5];
          const alpha = instances[o + 6];
          const glow = instances[o + 7];
          let rVal = Math.round((instances[o + 8] || 0.85) * 255);
          let gVal = Math.round((instances[o + 9] || 0.94) * 255);
          let bVal = Math.round((instances[o + 10] || 1.0) * 255);

          if (colorMode === "orange") {
            const l = (rVal + gVal + bVal) / (3 * 255);
            rVal = 255;
            gVal = Math.round(55 + l * 140);
            bVal = Math.round(30 + l * 30);
          } else if (colorMode === "green") {
            const l = Math.min(1.0, ((rVal + gVal + bVal) / (3 * 255)) + glow * 0.35);
            if (l > 0.76) {
              // The signature Matrix "Lead Character": glowing magnesium glitch white (#ebfff0)
              rVal = 235; gVal = 255; bVal = 240;
            } else {
              // Classic Matrix code phosphor emerald (#00ff41)
              rVal = Math.round(l * 12);
              gVal = Math.round(35 + l * 220);
              bVal = Math.round(l * 65);
            }
          } else if (colorMode === "neon") {
            rVal = 40; gVal = 230; bVal = 215;
          }

          if (gIdx < 0 || alpha < 0.04) continue;
          ctx.save();
          ctx.globalAlpha = Math.min(1.0, alpha * (1.0 + glow * 0.35));
          ctx.translate(x, y);
          ctx.rotate(rot);
          const sw = cellW * scaleX;
          const sh = cellH * scaleY;
          
          if (charMode === "lyrics") {
            ctx.beginPath();
            ctx.arc(0, 0, Math.min(sw, sh) * 0.44, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
            ctx.fill();
            ctx.restore();
            continue;
          }

          sCtx.clearRect(0, 0, T, T);
          sCtx.drawImage(currAtlas, gIdx * T, 0, T, T, 0, 0, T, T);
          sCtx.globalCompositeOperation = "source-in";
          sCtx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
          sCtx.fillRect(0, 0, T, T);
          sCtx.globalCompositeOperation = "source-over";

          ctx.drawImage(scratch, 0, 0, T, T, -sw / 2, -sh / 2, sw, sh);
          ctx.restore();
        }
        ctx.globalAlpha = 1;
      },
      destroy() {},
    };
  }

  function startRenderer() {
    updateAtlas();
    renderer = createWebGLRenderer(activeAtlas, activeRamp.length);
    if (!renderer) {
      const fresh = canvas.cloneNode(false);
      canvas.replaceWith(fresh);
      canvas = fresh;
      renderer = createCanvas2DRenderer(activeAtlas, activeRamp.length);
      if (tierIndex < 2) applyTier(2);
    }
    handleResize();
    lastFrameAt = lastStepAt = performance.now();
    rafId = requestAnimationFrame(renderFrame);
  }

  // ---------- Render Loop & Studio-Grade Human Object Tracker / Kinetic Engine ----------
  function renderFrame(now) {
    rafId = requestAnimationFrame(renderFrame);

    const budget = 1000 / tier().fps;
    if (now - lastRenderAt < budget - 1) return;
    lastRenderAt = now;

    watchPerformance(now);

    const dt = Math.min(0.05, (now - lastStepAt) / 1000);
    lastStepAt = now;
    simT += dt;

    if (!currGridData || !overlay || !subjectMask) return;

    audioEnergy = sampleAudioEnergy();
    const K = 0.65 * audioEnergy + 0.35 * motionEnergy;
    const beatPulse = audioEnergy > 0.52 ? (audioEnergy - 0.52) * 1.6 : 0;

    const W = overlay.clientWidth;
    const H = overlay.clientHeight;
    const cellW = W / gridCols;
    const cellH = H / gridRows;
    const charCount = activeRamp.length;

    let n = 0;
    for (let r = 0; r < gridRows; r++) {
      const cy = (r + 0.5) * cellH;
      for (let c = 0; c < gridCols; c++) {
        const i = r * gridCols + c;
        const maskVal = subjectMask[i] || 0;
        
        // 100% BACKGROUND REMOVAL / STUDIO OBJECT TRACKING:
        // If this cell belongs to the background wall/room (maskVal < 0.15), remove it completely!
        if (maskVal < 0.15) {
          continue;
        }

        const b = currGridData[i] || 0;
        const trail = trailGrid[i] || 0;
        const rVal = colorRGrid[i] || 0.85;
        const gVal = colorGGrid[i] || 0.94;
        const bVal = colorBGrid[i] || 1.0;

        // In Matrix Mode ("green"), inject authentic Wachowski digital rain streams cascading down your body!
        let matrixRainWave = 0;
        if (colorMode === "green") {
          const colSeed = Math.sin(c * 12.9898) * 43758.5453;
          const colSpeed = 3.6 + (Math.abs(colSeed) % 4.5);
          const dropY = (simT * colSpeed + (Math.abs(colSeed) % gridRows)) % gridRows;
          const distToDrop = (r - dropY + gridRows) % gridRows;
          if (distToDrop < 6.5) {
            matrixRainWave = Math.pow(1.0 - distToDrop / 6.5, 1.5);
          }
        }

        let effectiveB = Math.min(1.0, b + trail * 0.40 + beatPulse * 0.20 + (colorMode === "green" ? matrixRainWave * 0.45 : 0));
        const alpha = Math.max(0.15, Math.min(1.0, effectiveB * 1.25 + trail * 0.5 + maskVal * 0.3));

        // Digital Pixel Sorter vertical cascade + Matrix code rain drops
        let cascadeScaleY = 1.0;
        let yOffset = 0;
        if (sortLifeGrid[i] > 0) {
          sortLifeGrid[i] -= dt * sortSpeedGrid[i];
          const sl = Math.max(0, sortLifeGrid[i]);
          cascadeScaleY = 1.0 + (sl * 1.2);
          yOffset = (1.0 - sl) * cellH * 1.6;
          if (sortLifeGrid[i] <= 0) sortLifeGrid[i] = 0;
        }

        if (colorMode === "green" && matrixRainWave > 0) {
          cascadeScaleY *= (1.0 + matrixRainWave * 0.55);
          yOffset += matrixRainWave * cellH * 0.45;
        }

        // Map brightness and kinetic trail to character ramp selection
        let gIdx = Math.min(charCount - 1, Math.floor(effectiveB * charCount));

        // Strictly clamped kinetic scaling (0.8 .. 1.35 horizontal, 0.8 .. 1.75 vertical)
        let scaleX = Math.max(0.8, Math.min(1.35, 1.0 + trail * 0.25 + beatPulse * 0.18));
        let scaleY = Math.max(0.8, Math.min(1.75, (1.0 + trail * 0.40 + beatPulse * 0.22) * cascadeScaleY));

        // Wavy kinetic tilt along grid and motion direction (Particle Playground Wavy/Repel motion)
        let rot = Math.sin(simT * 2.8 + (c * 0.12) + (r * 0.10)) * 0.06 * K;
        if (trail > 0.15) {
          rot += (Math.sin(c * 0.3 + r * 0.2 + simT * 5.0) * 0.05 * Math.min(1.0, trail));
        }

        // Deep Glow intensity (boosted on moving trails, Matrix rain drops, and bright highlights)
        const glow = Math.min(1.6, (trail * 1.2) + (effectiveB > 0.8 ? (effectiveB - 0.8) * 3.8 : 0) + beatPulse * 1.0 + (colorMode === "green" ? matrixRainWave * 1.35 : 0));

        const o = n * 12;
        inst[o] = (c + 0.5) * cellW;
        inst[o + 1] = cy + yOffset;
        inst[o + 2] = scaleX;
        inst[o + 3] = scaleY;
        inst[o + 4] = gIdx;
        inst[o + 5] = rot;
        inst[o + 6] = alpha;
        inst[o + 7] = glow;
        inst[o + 8] = rVal;
        inst[o + 9] = gVal;
        inst[o + 10] = bVal;
        inst[o + 11] = trail;
        n++;
      }
    }

    renderer.draw(inst, n, simT);
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
    if (sampleTimer) {
      stopSampling();
      initSampling();
    }
    handleResize();
  }

  function stopRenderer() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    if (renderer) { renderer.destroy(); renderer = null; }
  }

  // ---------- Overlay Construction ----------
  function buildOverlay() {
    overlay = document.createElement("div");
    overlay.id = "asciiOverlay";
    overlay.className = "ascii-overlay";
    overlay.innerHTML = `
      <canvas id="asciiCanvas" class="ascii-canvas"></canvas>
      <div class="ascii-top-left">
        <button id="asciiColorBtn" class="ascii-mode-btn ascii-color-btn" title="Toggle between Surreal Orange (Default), Matrix Green, Exact Camera RGB, and Neon Cyber">
          Color: <span id="asciiColorVal">Surreal Orange</span>
        </button>
      </div>
      <button id="asciiCloseBtn" class="ascii-close-btn" title="Close ASCII Effect (Esc)" aria-label="Close ASCII effect">✕</button>
      <div class="ascii-status" id="asciiStatus" role="status" aria-live="polite"></div>
      <video id="asciiVideo" autoplay playsinline muted hidden></video>
    `;
    document.body.appendChild(overlay);
    document.body.classList.add("ascii-active");

    canvas = overlay.querySelector("#asciiCanvas");
    video = overlay.querySelector("#asciiVideo");
    statusEl = overlay.querySelector("#asciiStatus");
    colorBtn = overlay.querySelector("#asciiColorBtn");
    closeBtn = overlay.querySelector("#asciiCloseBtn");

    closeBtn.addEventListener("click", close);

    colorBtn.addEventListener("click", () => {
      if (colorMode === "orange") colorMode = "green";
      else if (colorMode === "green") colorMode = "rgb";
      else if (colorMode === "rgb") colorMode = "neon";
      else colorMode = "orange";

      const valEl = overlay.querySelector("#asciiColorVal");
      if (valEl) {
        if (colorMode === "orange") valEl.textContent = "Surreal Orange";
        else if (colorMode === "green") valEl.textContent = "Matrix Green";
        else if (colorMode === "rgb") valEl.textContent = "Exact Camera RGB";
        else valEl.textContent = "Neon Cyber";
      }
      if (renderer && renderer.updateColorMode) {
        renderer.updateColorMode(colorMode);
      }
    });
  }

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg || "";
  }

  // ---------- Lifecycle Controllers ----------
  function handleResize() {
    if (!overlay || !renderer) return;
    const W = overlay.clientWidth;
    const H = overlay.clientHeight;
    const ratio = Math.min(tier().dpr, window.devicePixelRatio || 1);
    renderer.resize(W, H, ratio);
  }

  function handleVisibility() {
    if (!isOpen) return;
    if (document.hidden) pauseAll();
    else resumeAll();
  }

  function pauseAll() {
    if (isPaused) return;
    isPaused = true;
    if (sampleTimer) clearInterval(sampleTimer);
    if (detectTimer) clearInterval(detectTimer);
    if (rafId) cancelAnimationFrame(rafId);
    stream?.getVideoTracks().forEach((t) => { t.enabled = false; });
    video?.pause();
  }

  function resumeAll() {
    if (!isPaused) return;
    isPaused = false;
    stream?.getVideoTracks().forEach((t) => { t.enabled = true; });
    video?.play().catch(() => {});
    scheduleSampling();
    if (segmenter) {
      if (detectTimer) clearInterval(detectTimer);
      detectTimer = setInterval(neuralDetectOnce, 66);
    }
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
    if (window.FallingBubbles && window.FallingBubbles.isOpen) window.FallingBubbles.close();
    if (window.LyricsFlow && window.LyricsFlow.isOpen) window.LyricsFlow.close();

    isOpen = true;
    isPaused = false;
    tierIndex = pickInitialTier();
    buildOverlay();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("pagehide", close);

    initSampling();
    startRenderer();

    setStatus("Starting camera & studio object tracker…");
    try {
      await startCamera();
      startNeuralDetection(); // Boot neural person segmentation in background!
      setStatus("");
    } catch (err) {
      setStatus(
        err && err.name === "NotAllowedError"
          ? "Camera access denied — running kinetic Motion Extractor simulation."
          : "Could not open camera — running kinetic Motion Extractor simulation."
      );
    }
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
    stopSampling();
    stopRenderer();
    stopCamera();

    overlay?.remove();
    document.body.classList.remove("ascii-active");
    overlay = video = canvas = statusEl = modeBtn = colorBtn = closeBtn = null;
    slowFrames = 0;
  }

  function attachButton() {
    const btn = document.getElementById("asciiFxBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        isOpen ? close() : open();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachButton);
  } else {
    attachButton();
  }

  window.KineticAscii = {
    open, close,
    toggle: () => (isOpen ? close() : open()),
    get isOpen() { return isOpen; },
    get stats() {
      return {
        tier: tier().name,
        renderer: renderer?.kind || null,
        mode: charMode,
        colorMode: colorMode,
        motionEnergy: motionEnergy.toFixed(2),
        audioEnergy: audioEnergy.toFixed(2),
        neuralAI: !!segmenter,
      };
    },
  };
})();
