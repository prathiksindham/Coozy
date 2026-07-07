/* ============================================================
   CD Player Carousel — Figma "music" design
   Fixed jewel-case frame at center; CDs slide left/right through
   it (like changing the song). The centered CD sits in the frame
   under the liquid-glass piece; neighbours are bare CDs.
   ============================================================ */

/* ---------- Playlists (Spotify-style named lists of cassettes) ---------- */
const BUILTIN_SONGS = [
  { art: "assets_disc_art.png", title: "Good News", artist: "Mac Miller", audio: "", yt: "https://www.youtube.com/watch?v=aIHF7u9Wwiw" },
  { art: "https://img.youtube.com/vi/bwb8oA6JBDc/maxresdefault.jpg", title: "Date @ 8 (remix)", artist: "4Batz feat. Drake", yt: "https://www.youtube.com/watch?v=bwb8oA6JBDc" },
];
const PLAYLISTS_LS = "musicPlaylists";
const CURRENT_LS = "musicCurrentPlaylist";
const BUILTIN_COUNT = 0;   // every cassette in a playlist is user-managed (removable)

function loadPlaylists() {
  try {
    const raw = JSON.parse(localStorage.getItem(PLAYLISTS_LS) || "null");
    if (Array.isArray(raw) && raw.length) return raw;
  } catch (e) {}
  // First run: migrate the built-ins + any previously-added songs into a default playlist
  let added = [];
  try { added = JSON.parse(localStorage.getItem("musicAddedDiscs") || "[]"); } catch (e) {}
  const discs = [], seen = new Set();
  [...BUILTIN_SONGS, ...(Array.isArray(added) ? added : [])].forEach((d) => {
    if (!d || !(d.yt || d.audio)) return;
    const id = d.yt ? ytId(d.yt) : (d.audio || "");
    if (id && seen.has(id)) return;
    if (id) seen.add(id);
    const meta = parseSongMeta(d.title || "", d.artist || "");
    discs.push({ art: d.art, title: meta.title, artist: meta.artist, yt: d.yt || "", audio: d.audio || "" });
  });
  return [{ id: "default", name: "Liked Songs", discs }];
}

let playlists = loadPlaylists();
let currentPlaylistId = localStorage.getItem(CURRENT_LS) || playlists[0].id;
if (!playlists.some((p) => p.id === currentPlaylistId)) currentPlaylistId = playlists[0].id;
function currentPlaylist() { return playlists.find((p) => p.id === currentPlaylistId) || playlists[0]; }

// The carousel runs off DISCS = the current playlist's songs (persist=true real, false = temp preview)
const DISCS = currentPlaylist().discs.map((d) => ({
  art: d.art, title: d.title, artist: d.artist, yt: d.yt || "", audio: d.audio || "", spotify: d.spotify || "", persist: true,
}));

function savePlaylists() {
  currentPlaylist().discs = DISCS.filter((d) => d.persist)
    .map((d) => ({ art: d.art, title: d.title, artist: d.artist, yt: d.yt || "", audio: d.audio || "", spotify: d.spotify || "" }));
  try { localStorage.setItem(PLAYLISTS_LS, JSON.stringify(playlists)); } catch (e) {}
}
function switchPlaylist(id) {
  if (id === currentPlaylistId) return;
  savePlaylists();
  localStorage.setItem(CURRENT_LS, id);
  location.reload();
}
function createPlaylist(name) {
  savePlaylists();
  const id = "pl_" + Date.now().toString(36);
  playlists.push({ id, name: (name || "").trim() || "New Playlist", discs: [] });
  try { localStorage.setItem(PLAYLISTS_LS, JSON.stringify(playlists)); } catch (e) {}
  localStorage.setItem(CURRENT_LS, id);
  location.reload();
}

const player  = document.getElementById("player");
const track    = document.getElementById("track");
const dotsWrap = document.getElementById("dots");
const prevBtn  = document.getElementById("prev");
const nextBtn  = document.getElementById("next");

function readCfg() {
  const c = getComputedStyle(document.documentElement);
  const n = (k) => parseFloat(c.getPropertyValue(k));
  return {
    hero: n("--hero"),
    discSize: n("--disc-size") / 100,   // fraction of hero
    sideScale: n("--side-scale"),
    gapFrac: n("--gap-frac"),
    stepExtra: n("--step-extra"),
    rotate: n("--side-rotate"),
    depth: n("--side-depth"),
    maxVisible: n("--max-visible"),
  };
}
let CFG = readCfg();

let index = 0;
let dragging = false;
let startX = 0;
let dragOffset = 0;
let pointerId = null;

/* ---------- Build CDs + dots ---------- */
function buildDiscEl(d, i) {
  const el = document.createElement("div");
  el.className = "disc";
  el.innerHTML = `
    <div class="disc__spin">
      <img class="disc__art" src="${d.art}" alt="${d.title || "Disc " + (i + 1)}" draggable="false" />
      <canvas class="disc__dcanvas" aria-hidden="true"></canvas>
    </div>
    <div class="disc__shine" aria-hidden="true"></div>
    <div class="disc__hole" aria-hidden="true"></div>`;
  el.addEventListener("click", () => {
    const idx = discs.indexOf(el);                 // live index (survives add/remove)
    if (idx >= 0 && Math.abs(dragOffset) < 6 && idx !== index) goTo(idx);
  });
  track.appendChild(el);
  return el;
}

const discs = DISCS.map((d, i) => buildDiscEl(d, i));

const dots = dotsWrap ? DISCS.map((_, i) => {
  const d = document.createElement("button");
  d.setAttribute("role", "tab");
  d.setAttribute("aria-label", `Go to disc ${i + 1}`);
  d.addEventListener("click", () => { const idx = dots.indexOf(d); if (idx >= 0) goTo(idx); });
  dotsWrap.appendChild(d);
  return d;
}) : [];

/* ---------- Disc effects (applied to the playing cassette) ----------
   "dither" = Figma Bayer 16x16 ordered dither | "acid" = psychedelic | "none" */
let currentEffect = "dither";

function genBayer(n) {
  let m = [[0]], size = 1;
  while (size < n) {
    const ns = size * 2, nm = [];
    for (let y = 0; y < ns; y++) nm.push(new Array(ns));
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const v = m[y][x] * 4;
      nm[y][x] = v; nm[y][x + size] = v + 2;
      nm[y + size][x] = v + 3; nm[y + size][x + size] = v + 1;
    }
    m = nm; size = ns;
  }
  return m;
}
const BAYER16 = genBayer(16);

// Bayer 16x16, 3 levels/channel, color (Figma node 4:5)
function fxDither(data, S, t) {
  const lm = 2;
  const ox = Math.floor(t * 10) & 15, oy = Math.floor(t * 7) & 15;
  for (let y = 0; y < S; y++) {
    const brow = BAYER16[(y + oy) & 15];
    for (let x = 0; x < S; x++) {
      const thr = (brow[(x + ox) & 15] + 0.5) / 256 - 0.5;
      const idx = (y * S + x) * 4;
      for (let c = 0; c < 3; c++) {
        let v = data[idx + c] / 255 + thr / lm;
        v = v < 0 ? 0 : v > 1 ? 1 : v;
        data[idx + c] = (Math.round(v * lm) / lm) * 255;
      }
    }
  }
}

// Acid: supersaturated, hue-shifted (brightness-driven), posterized + solarized
function fxAcid(data, S, t) {
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let h = 0, s = 0, l = (max + min) / 2;
    if (d !== 0) {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60; if (h < 0) h += 360;
    }
    h = (h + 90 + l * 200 + t * 80) % 360;   // hue shift + flow over time
    h = Math.round(h / 30) * 30;            // posterize into color bands
    s = Math.min(1, s * 1.8 + 0.4);        // supersaturate
    l = l < 0.5 ? l * 0.85 : 1 - (1 - l) * 0.55;   // solarize / contrast
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const xx = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let rr, gg, bb; const hh = h / 60;
    if (hh < 1) { rr = c; gg = xx; bb = 0; }
    else if (hh < 2) { rr = xx; gg = c; bb = 0; }
    else if (hh < 3) { rr = 0; gg = c; bb = xx; }
    else if (hh < 4) { rr = 0; gg = xx; bb = c; }
    else if (hh < 5) { rr = xx; gg = 0; bb = c; }
    else { rr = c; gg = 0; bb = xx; }
    data[i] = (rr + m) * 255; data[i + 1] = (gg + m) * 255; data[i + 2] = (bb + m) * 255;
  }
}

function fxGrayscale(data, S, t) {
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const idx = (y * S + x) * 4;
    let l = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
    l += 32 * Math.sin((x + y) / 42 + t * 3);        // moving light band
    l = l < 0 ? 0 : l > 255 ? 255 : l;
    data[idx] = data[idx + 1] = data[idx + 2] = l;
  }
}
function fxSepia(data, S, t) {
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const idx = (y * S + x) * 4;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const w = 26 * Math.sin((x - y) / 46 + t * 2.6);  // moving warm sweep
    data[idx] = Math.max(0, Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b + w));
    data[idx + 1] = Math.max(0, Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b + w * 0.7));
    data[idx + 2] = Math.max(0, Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b + w * 0.4));
  }
}
function fxInvert(data, S, t) {
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const idx = (y * S + x) * 4;
    const w = 34 * Math.sin((x + y) / 40 - t * 3);    // moving chromatic wave
    data[idx] = Math.max(0, Math.min(255, 255 - data[idx] + w));
    data[idx + 1] = Math.max(0, Math.min(255, 255 - data[idx + 1]));
    data[idx + 2] = Math.max(0, Math.min(255, 255 - data[idx + 2] - w));
  }
}
function fxPosterize(data, S, t) {
  const lm = 3;
  const off = Math.sin(t * 2) * 0.45;                 // crawling bands
  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      let v = Math.round((data[i + c] / 255) * lm + off) / lm;
      v = v < 0 ? 0 : v > 1 ? 1 : v;
      data[i + c] = v * 255;
    }
  }
}
function fxHalftone(data, S, t) {
  const cell = 6;
  const off = t * 8;                                  // diagonal drift
  const gray = new Float32Array(S * S);
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    gray[j] = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
  }
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const cx = Math.floor((x + off) / cell) * cell + cell / 2 - off;
      const cy = Math.floor((y + off) / cell) * cell + cell / 2 - off;
      const cxi = Math.min(S - 1, Math.max(0, Math.round(cx)));
      const cyi = Math.min(S - 1, Math.max(0, Math.round(cy)));
      const bright = gray[cyi * S + cxi];
      const dist = Math.hypot(x - cx, y - cy);
      const v = dist <= (1 - bright) * (cell * 0.72) ? 0 : 255;
      const idx = (y * S + x) * 4;
      data[idx] = data[idx + 1] = data[idx + 2] = v;
    }
  }
}
function fxVHS(data, S, t) {
  const src = data.slice();
  const base = 1 + Math.round(Math.abs(Math.sin(t * 3)) * 3);
  const rollY = Math.floor(((t * 0.35) % 1 + 1) % 1 * S);   // rolling distortion band
  for (let y = 0; y < S; y++) {
    const shift = base + (Math.abs(y - rollY) < 8 ? 6 : 0);
    for (let x = 0; x < S; x++) {
      const idx = (y * S + x) * 4;
      const rx = Math.min(S - 1, x + shift), bx = Math.max(0, x - shift);
      data[idx] = src[(y * S + rx) * 4];
      data[idx + 2] = src[(y * S + bx) * 4 + 2];
      const n = (Math.random() - 0.5) * 22;
      const dark = y % 3 === 0 ? 0.72 : 1;
      data[idx] = data[idx] * dark + n;
      data[idx + 1] = data[idx + 1] * dark + n;
      data[idx + 2] = data[idx + 2] * dark + n;
    }
  }
}

const THERMAL_STOPS = [
  [0.00, [0, 0, 8]],
  [0.15, [40, 0, 95]],     // deep indigo
  [0.35, [150, 0, 165]],   // magenta
  [0.50, [232, 34, 58]],   // red
  [0.66, [255, 118, 0]],   // orange
  [0.82, [255, 224, 48]],  // yellow
  [1.00, [255, 255, 255]], // white-hot
];
function thermalColor(t) {
  for (let i = 1; i < THERMAL_STOPS.length; i++) {
    if (t <= THERMAL_STOPS[i][0]) {
      const [t0, c0] = THERMAL_STOPS[i - 1], [t1, c1] = THERMAL_STOPS[i];
      const f = (t - t0) / (t1 - t0);
      return [c0[0] + (c1[0] - c0[0]) * f, c0[1] + (c1[1] - c0[1]) * f, c0[2] + (c1[2] - c0[2]) * f];
    }
  }
  return THERMAL_STOPS[THERMAL_STOPS.length - 1][1];
}
function fxThermal(data, S, t) {
  for (let i = 0; i < data.length; i += 4) {
    let L = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
    L += 0.06 * Math.sin(L * 14 - t * 4);            // heat ripple
    L = L < 0 ? 0 : L > 1 ? 1 : L;
    const c = thermalColor(L);
    data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2];
  }
}
// Pinterest-style: the image's OWN colours drift and smear across the picture like a slow
// liquid/aurora, with a soft moving bloom — tasteful, not a rainbow. Uses the album palette.
function fxPinterest(data, S, t) {
  const src = data.slice();                 // original pixels to sample the flowing colour from
  const TAU = Math.PI * 2;
  const amp = S * 0.08;                      // gentle flow distance (keeps the cover sharp)
  for (let y = 0; y < S; y++) {
    const v = y / S;
    for (let x = 0; x < S; x++) {
      const idx = (y * S + x) * 4;
      const u = x / S;
      // a smooth flowing vector field (a few drifting waves) — moves the album's colours around
      const dx = amp * (Math.sin(v * TAU * 1.5 + t * 1.05) + 0.5 * Math.sin((u * 2 + v) * TAU + t * 0.7));
      const dy = amp * (Math.cos(u * TAU * 1.3 - t * 0.9) + 0.5 * Math.sin((v * 2 - u) * TAU - t * 0.8));
      let sx = (x + dx) | 0, sy = (y + dy) | 0;
      sx = sx < 0 ? 0 : sx >= S ? S - 1 : sx;
      sy = sy < 0 ? 0 : sy >= S ? S - 1 : sy;
      const sidx = (sy * S + sx) * 4;
      // light touch: mostly the real cover, with a soft flowing colour wash over it
      const amt = 0.28;
      let r = data[idx] * (1 - amt) + src[sidx] * amt;
      let g = data[idx + 1] * (1 - amt) + src[sidx + 1] * amt;
      let b = data[idx + 2] * (1 - amt) + src[sidx + 2] * amt;
      // gentle saturation lift so the flowing palette reads as vivid (still the album's hues)
      const lum = 0.299 * r + 0.587 * g + 0.114 * b, sat = 1.18;
      r = lum + (r - lum) * sat; g = lum + (g - lum) * sat; b = lum + (b - lum) * sat;
      // subtle drifting light bloom
      const bloom = Math.pow(0.5 + 0.5 * Math.sin((u + v) * TAU * 0.7 - t * 1.0), 4) * 14;
      r += bloom; g += bloom; b += bloom;
      data[idx] = r < 0 ? 0 : r > 255 ? 255 : r;
      data[idx + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
      data[idx + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
    }
  }
}

const artImgCache = {};                 // src -> loaded Image
const fxTmp = document.createElement("canvas");
const fxTmpCtx = fxTmp.getContext("2d", { willReadFrequently: true });

// ASCII: redraw the album art as a grid of monospace characters chosen by
// brightness, colored from the source. A time-driven ripple makes the glyphs
// shimmer/"move", and since the disc spins the whole grid rotates with it.
const ASCII_RAMP = " .,:;i1tfLCG08@";   // dark -> bright
function fxAscii(src, S, t, out) {
  if (out.width !== S || out.height !== S) { out.width = S; out.height = S; }
  const ctx = out.getContext("2d");
  ctx.fillStyle = "#0a0b10";
  ctx.fillRect(0, 0, S, S);
  const cell = 7;
  ctx.font = "700 " + (cell + 1) + "px 'Courier New', ui-monospace, monospace";
  ctx.textBaseline = "top";
  const n = ASCII_RAMP.length - 1;
  const cols = Math.ceil(S / cell);
  for (let gy = 0; gy < cols; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const px = Math.min(S - 1, gx * cell + (cell >> 1));
      const py = Math.min(S - 1, gy * cell + (cell >> 1));
      const i = (py * S + px) << 2;
      const r = src[i], g = src[i + 1], b = src[i + 2];
      let lum = 0.299 * r + 0.587 * g + 0.114 * b;
      lum += Math.sin((gx + gy) * 0.6 - t * 3.2) * 26;   // ripple -> the text "moves"
      lum = lum < 0 ? 0 : lum > 255 ? 255 : lum;
      const ch = ASCII_RAMP[(lum / 255 * n) | 0];
      if (ch === " ") continue;
      // Follow the image's own color: scale up preserving hue (multiply, not add,
      // so bright areas stay their color instead of washing out to white).
      const mx = Math.max(r, g, b) || 1;
      const k = Math.min(255, mx * 1.35) / mx;
      ctx.fillStyle = "rgb(" + (r * k | 0) + "," + (g * k | 0) + "," + (b * k | 0) + ")";
      ctx.fillText(ch, gx * cell, gy * cell);
    }
  }
}

function applyEffect(img, out, effect, t = 0, S = 640) {
  const iw = img.naturalWidth || S, ih = img.naturalHeight || S;
  let sw, sh, sx, sy;
  if (iw >= ih) { sw = sh = ih; sx = (iw - sw) / 2; sy = 0; }
  else { sw = sh = iw; sx = 0; sy = (ih - sh) / 2; }
  if (fxTmp.width !== S || fxTmp.height !== S) { fxTmp.width = S; fxTmp.height = S; }
  fxTmpCtx.clearRect(0, 0, S, S);
  fxTmpCtx.drawImage(img, sx, sy, sw, sh, 0, 0, S, S);
  const id = fxTmpCtx.getImageData(0, 0, S, S);  // throws if cross-origin tainted
  const d = id.data;
  if (effect === "ascii") { fxAscii(d, S, t, out); return; }   // draws glyphs, not pixels
  if (effect === "dither") fxDither(d, S, t);
  else if (effect === "acid") fxAcid(d, S, t);
  else if (effect === "halftone") fxHalftone(d, S, t);
  else if (effect === "grayscale") fxGrayscale(d, S, t);
  else if (effect === "sepia") fxSepia(d, S, t);
  else if (effect === "invert") fxInvert(d, S, t);
  else if (effect === "posterize") fxPosterize(d, S, t);
  else if (effect === "vhs") fxVHS(d, S, t);
  else if (effect === "thermal") fxThermal(d, S, t);
  else if (effect === "pinterest") fxPinterest(d, S, t);
  if (out.width !== S || out.height !== S) { out.width = S; out.height = S; }
  out.getContext("2d").putImageData(id, 0, 0);
}

// Find the album-content box by trimming near-uniform borders (a solid bar of ANY color).
// A real cover fills the frame -> no flat edges -> not cropped. Letterbox/blank -> trimmed.
function trimBorders(img) {
  const W = img.naturalWidth, H = img.naturalHeight;
  if (!W || !H) return { x: 0, y: 0, w: W || 1, h: H || 1 };
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const cx = c.getContext("2d", { willReadFrequently: true });
  cx.drawImage(img, 0, 0);
  let data;
  try { data = cx.getImageData(0, 0, W, H).data; } catch (e) { return { x: 0, y: 0, w: W, h: H }; }
  const stepX = Math.max(1, Math.floor(W / 220)), stepY = Math.max(1, Math.floor(H / 220));
  const FLAT = 30;   // mean abs deviation below this = a uniform bar (tolerates JPEG noise)

  function rowFlat(y) {
    let sr = 0, sg = 0, sb = 0, n = 0;
    for (let x = 0; x < W; x += stepX) { const i = (y * W + x) << 2; sr += data[i]; sg += data[i + 1]; sb += data[i + 2]; n++; }
    const mr = sr / n, mg = sg / n, mb = sb / n; let dev = 0;
    for (let x = 0; x < W; x += stepX) { const i = (y * W + x) << 2; dev += Math.abs(data[i] - mr) + Math.abs(data[i + 1] - mg) + Math.abs(data[i + 2] - mb); }
    return dev / n < FLAT;
  }
  function colFlat(x) {
    let sr = 0, sg = 0, sb = 0, n = 0;
    for (let y = 0; y < H; y += stepY) { const i = (y * W + x) << 2; sr += data[i]; sg += data[i + 1]; sb += data[i + 2]; n++; }
    const mr = sr / n, mg = sg / n, mb = sb / n; let dev = 0;
    for (let y = 0; y < H; y += stepY) { const i = (y * W + x) << 2; dev += Math.abs(data[i] - mr) + Math.abs(data[i + 1] - mg) + Math.abs(data[i + 2] - mb); }
    return dev / n < FLAT;
  }
  let top = 0; while (top < H * 0.48 && rowFlat(top)) top++;
  let bot = H - 1; while (bot > H * 0.52 && rowFlat(bot)) bot--;
  let left = 0; while (left < W * 0.48 && colFlat(left)) left++;
  let right = W - 1; while (right > W * 0.52 && colFlat(right)) right--;
  const w = right - left + 1, h = bot - top + 1;
  if (w < W * 0.25 || h < H * 0.25) return { x: 0, y: 0, w: W, h: H };   // sanity: never over-crop
  return { x: left, y: top, w, h };
}

// Trim blank borders, then center-crop the content to a square that fills the disc
function processArtToSquare(img) {
  const box = trimBorders(img);
  const side = Math.min(box.w, box.h);
  const sx = box.x + (box.w - side) / 2;
  const sy = box.y + (box.h - side) / 2;
  const S = 512;
  const out = document.createElement("canvas"); out.width = S; out.height = S;
  out.getContext("2d").drawImage(img, sx, sy, side, side, 0, 0, S, S);
  return out;
}

function preloadArt(i) {
  const src = DISCS[i] && DISCS[i].art;
  if (!src || artImgCache[src]) return;
  artImgCache[src] = "loading";                 // reserve (loop checks .complete)
  const raw = new Image();
  raw.crossOrigin = "anonymous";
  raw.onload = () => {
    let url;
    try { url = processArtToSquare(raw).toDataURL("image/png"); }
    catch (e) { artImgCache[src] = raw; return; }        // tainted -> use raw
    const out = new Image();
    out.onload = () => { artImgCache[src] = out; };
    out.src = url;
    for (let di = 0; di < discs.length; di++) {          // swap the displayed cover (all discs using this src)
      if (DISCS[di] && DISCS[di].art === src) {
        const im = discs[di].querySelector(".disc__art");
        if (im) im.src = url;
      }
    }
  };
  raw.onerror = () => { delete artImgCache[src]; };
  raw.src = src;
}

function setEffect(fx) { currentEffect = fx; }   // the live loop reflects it instantly

/* Interaction energy: cursor movement speeds the motion up, then it decays */
let fxEnergy = 0, fxTime = 0, fxPX = 0, fxPY = 0;
window.addEventListener("pointermove", (e) => {
  const dx = e.clientX - fxPX, dy = e.clientY - fxPY;
  fxPX = e.clientX; fxPY = e.clientY;
  fxEnergy = Math.min(2.5, fxEnergy + Math.hypot(dx, dy) * 0.012);
});

/* Live loop: re-skins the playing cassette every frame (motion + interaction) */
const FX_S = 300;                       // processing resolution (perf)
let fxProcLast = performance.now(), fxClockLast = performance.now();
function fxLoop(now) {
  requestAnimationFrame(fxLoop);
  const dt = Math.min((now - fxClockLast) / 1000, 0.05); fxClockLast = now;
  fxEnergy *= Math.pow(0.85, dt * 60);
  fxTime += (0.35 + fxEnergy * 2.6) * dt;         // baseline drift + interaction boost
  if (now - fxProcLast < 33) return;              // cap heavy processing at ~30fps
  fxProcLast = now;
  const disc = discs[index];
  if (!disc) return;
  if (currentEffect === "none") { disc.classList.remove("has-fx"); return; }
  const img = artImgCache[DISCS[index].art];
  if (!img || !img.complete || !img.naturalWidth) return;
  try {
    applyEffect(img, disc.querySelector(".disc__dcanvas"), currentEffect, fxTime, FX_S);
    disc.classList.add("has-fx");
  } catch (e) { /* cross-origin tainted -> plain art */ }
}
requestAnimationFrame(fxLoop);

// Crop blank borders off every cassette cover up front (playing and non-playing)
for (let i = 0; i < discs.length; i++) preloadArt(i);

/* ---------- Disc spin physics ----------
   The seated (centered) disc spins up; when it leaves the case it
   coasts down with inertia. A swipe flick adds angular momentum. */
const spinEls = discs.map((d) => d.querySelector(".disc__spin"));
const angle = discs.map(() => 0);
const vel   = discs.map(() => 0);   // rad/s
let pointerVX = 0;                   // px/s, for flick impulse

const SPIN_TARGET = 2.0;   // steady spin speed while seated (rad/s)
const K_UP = 2.4;          // spin-up responsiveness
const K_DOWN = 0.7;        // coast-down (lower = longer, heavier coast)

let paused = true;         // disc spins only while audio is playing
let full = false;          // full-screen now-playing view

let lastT = performance.now();
function tick(now) {
  const dt = Math.min((now - lastT) / 1000, 0.05);
  lastT = now;
  for (let i = 0; i < discs.length; i++) {
    const seated = i === index && !dragging && !paused;
    const target = seated ? SPIN_TARGET : 0;
    const k = seated ? K_UP : K_DOWN;
    vel[i] += (target - vel[i]) * Math.min(k * dt, 1);   // inertial approach
    angle[i] += vel[i] * dt;
    spinEls[i].style.transform = `rotate(${angle[i].toFixed(4)}rad)`;
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

/* ---------- Geometry ---------- */
function geom() {
  const discBase = CFG.hero * CFG.discSize;        // centered CD diameter
  const sideR = (discBase * CFG.sideScale) / 2;    // side CD radius
  const gapPx = CFG.hero * CFG.gapFrac;
  const A = CFG.hero / 2 + gapPx + sideR;           // center -> first side CD
  const STEP = discBase * CFG.sideScale + CFG.hero * CFG.stepExtra;
  return { A, STEP };
}
function translateXFor(offset, g) {
  const a = Math.abs(offset);
  const dir = Math.sign(offset);
  if (a <= 1) return offset * g.A;
  return dir * (g.A + (a - 1) * g.STEP);
}
function scaleFor(offset) {
  const a = Math.abs(offset);
  const s = CFG.sideScale;
  if (a <= 1) return s + (1 - s) * (1 - a);          // 1 at center -> s at ±1
  return Math.max(s * 0.55, s * (1 - (a - 1) * 0.08));
}

/* ---------- Render ---------- */
function render() {
  const g = geom();
  const dragSteps = dragOffset / (CFG.hero * 0.6);
  const center = index - dragSteps;

  discs.forEach((disc, i) => {
    const offset = i - center;
    const a = Math.abs(offset);
    const dir = Math.sign(offset) || 1;

    if (a > CFG.maxVisible + 0.5) {
      disc.style.opacity = "0";
      disc.style.pointerEvents = "none";
      disc.style.zIndex = "0";
      disc.style.transform =
        `translateX(${dir * (g.A + CFG.maxVisible * g.STEP)}px) scale(${CFG.sideScale * 0.5})`;
      return;
    }

    const x = translateXFor(offset, g);
    const scale = scaleFor(offset);
    const rotateY = -dir * Math.min(a, 1) * CFG.rotate;
    const z = -Math.min(a, CFG.maxVisible) * CFG.depth;

    disc.style.transform =
      `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
    disc.style.opacity = a > CFG.maxVisible ? String(1 - (a - CFG.maxVisible) * 2) : "1";
    disc.style.filter = `brightness(${(1 - Math.min(a, 1) * 0.16).toFixed(3)})`;
    disc.style.pointerEvents = "auto";
    // Active CD sits just under the glass (z 25 < glass 30); neighbours recede.
    disc.style.zIndex = String(i === index ? 25 : 22 - Math.round(a * 2));
    disc.classList.toggle("is-active", i === index && !dragging);

    // Full view: show only the active disc, hide the rest.
    if (full) {
      const isActive = i === index;
      disc.style.opacity = isActive ? "1" : "0";
      disc.style.pointerEvents = isActive ? "auto" : "none";
      disc.style.zIndex = isActive ? "25" : "0";
    }
  });

  dots.forEach((d, i) => d.classList.toggle("is-active", i === index));

  preloadArt(index);     // ensure the playing cassette's art is ready for the live effect
}

/* ---------- Navigation ---------- */
const clamp = (i) => Math.max(0, Math.min(DISCS.length - 1, i));
function goTo(i) {
  const changed = clamp(i) !== index;
  if (changed) smokeDir = clamp(i) < index ? 1 : -1;   // prev = drift right, next = drift left
  index = clamp(i);
  render();
  if (changed && typeof syncSong === "function") syncSong();
  if (changed && !applyingRemote && typeof roomBroadcastSoon === "function") roomBroadcastSoon();
  if (changed && typeof maybeReactToTrack === "function") setTimeout(maybeReactToTrack, 300);
}
const next = () => goTo(index + 1);
const prev = () => goTo(index - 1);

prevBtn?.addEventListener("click", prev);
nextBtn?.addEventListener("click", next);

/* ---------- Now-playing card controls ---------- */
const ctrlPrev = document.getElementById("ctrlPrev");
const ctrlNext = document.getElementById("ctrlNext");
const ctrlPlay = document.getElementById("ctrlPlay");
const heartBtn = document.getElementById("heartBtn");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const fillEl = document.querySelector(".np__fill");
const timeEls = document.querySelectorAll(".np__time");
const timeL = timeEls[0], timeR = timeEls[1];

ctrlPrev?.addEventListener("click", prev);
ctrlNext?.addEventListener("click", next);

/* ---------- Like = save the current cassette to the list (like "+") ---------- */
const heartInput = heartBtn ? heartBtn.querySelector("input") : null;

function isSaved(i) {
  return i < BUILTIN_COUNT || (DISCS[i] && DISCS[i].persist === true);
}
function syncHeart() {                       // reflect the current cassette's saved state
  if (!heartInput) return;
  heartBtn.classList.add("no-anim");         // no burst on programmatic sync
  heartInput.checked = isSaved(index);
  void heartBtn.offsetWidth;
  heartBtn.classList.remove("no-anim");
}
// Heart opens the "Add to playlist" chooser for the current song (Spotify-style)
heartBtn?.addEventListener("click", (e) => {
  e.preventDefault();                          // don't just toggle -> ask where to add
  const d = DISCS[index];
  if (!d) return;
  if (typeof openAddToPlaylist === "function") {
    openAddToPlaylist({ title: d.title, artist: d.artist, yt: d.yt, art: d.art });
  }
});
syncHeart();                                  // reflect the initial cassette

/* ---------- Full-screen now-playing view ---------- */
const viewToggle = document.getElementById("viewToggle");
const stageBg = document.getElementById("stageBg");

function updateBg() {
  const d = DISCS[index];
  if (stageBg && d) stageBg.style.backgroundImage = `url("${d.art}")`;
}
function setFull(on) {
  full = on;
  document.body.classList.toggle("is-full", full);
  viewToggle?.setAttribute("aria-pressed", String(full));
  CFG = readCfg();          // --hero changes between views
  updateBg();
  render();
  try {
    if (full && !document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else if (!full && document.fullscreenElement) document.exitFullscreen?.();
  } catch (e) {}
}
viewToggle?.addEventListener("click", () => setFull(!full));
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && full) setFull(false);   // Esc exits
});
updateBg();

/* ---------- Playback: local <audio> (primary) + optional YouTube ---------- */
const IS_FILE = location.protocol === "file:";
// Which YouTube playback path to use. The IFrame embed refuses to play from
// loopback origins (localhost / 127.0.0.1 / file://), so there we resolve the
// audio server-side with yt-dlp. On a real hosted origin the IFrame works AND
// plays from each visitor's own browser/IP — which sidesteps YouTube's
// datacenter bot-block that breaks the server-side proxy when deployed.
const IS_LOCAL = IS_FILE
  || location.hostname === "localhost"
  || location.hostname === "127.0.0.1"
  || location.hostname === "";
const USE_IFRAME = !IS_LOCAL;   // hosted -> in-browser IFrame; local -> /api/audio
const audioEl = document.getElementById("audio");
let audioRetries = 0;   // auto-retry counter for transient audio-stream failures
const ytHost  = document.getElementById("yt-host");
let yt = null, ytReady = false, wantPlay = false;
let scrubbing = false;     // user is dragging the progress bar
let tempSong = null;       // previewing a search result without adding a cassette

function ytId(u) {
  if (!u) return "";
  u = String(u).trim();
  const m = u.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(u) ? u : "";
}
function fmt(s) {
  s = Math.max(0, Math.floor(s || 0));
  const m = Math.floor(s / 60), x = s % 60;
  return String(m).padStart(2, "0") + ":" + String(x).padStart(2, "0");
}
// A unified id for a song across sources (Spotify URI, YouTube video id, or audio src).
// Lets dedup / "is it playing?" / playlist-membership work the same for every source.
function trackId(d) {
  if (!d) return "";
  if (d.spotify) return "sp:" + d.spotify;
  if (d.yt) { const id = ytId(d.yt); return id ? "yt:" + id : ""; }
  if (d.audio) return "au:" + d.audio;
  return "";
}
// Which source the search/add UI is currently in: "youtube" (default) or "spotify".
let currentSource = localStorage.getItem("musicSource") || "youtube";
function setPlayIcon(playing) {
  ctrlPlay?.setAttribute("aria-pressed", String(playing));
  if (typeof refreshPlayingWave === "function") refreshPlayingWave();   // sync the search-list wave
}
function resetProgress() {
  if (fillEl) fillEl.style.width = "0%";
  if (timeL) timeL.textContent = "00:00";
  if (timeR) timeR.textContent = "00:00";
}
// Smoky title/artist transition. smokeDir follows the CD swipe (+1 right, -1 left),
// set at the nav sites (goTo / swipe end) just before the track index changes.
let smokeDir = 1;
let _cardReady = false;      // first paint drops the text in with no animation

// driftDir   = side the smoke translates toward (--dir in the keyframes)
// staggerDir = which end assembles first: +1 leftmost-first, -1 rightmost-first
function _splitSmoke(text, cls, driftDir, staggerDir, step) {
  const line = document.createElement("span");
  line.className = "smoke-line" + (cls ? " " + cls : "");
  line.style.setProperty("--dir", String(driftDir));
  const chars = [...(text || "")];
  const n = chars.length;
  chars.forEach((ch, i) => {
    const s = document.createElement("span");
    s.textContent = ch === " " ? " " : ch;
    const k = staggerDir >= 0 ? i : (n - 1 - i);
    s.style.animationDelay = (k * step).toFixed(3) + "s";
    line.appendChild(s);
  });
  return line;
}

function _smokeSwap(el, text, dir) {
  if (!el) return;
  const prev = el.dataset.text || "";
  if (_cardReady && prev === text) return;           // unchanged — leave the smoke alone
  el.style.setProperty("--smoke-col", getComputedStyle(el).color);   // paint the shadow in the real color
  el.dataset.text = text;

  if (!_cardReady) {                                  // first paint: crisp, no smoke
    el.textContent = "";
    el.appendChild(_splitSmoke(text, "", dir, dir, 0));
    return;
  }
  // The visible line is the last one added; drop any stragglers from rapid swaps so
  // leftover letters can't get orphaned onto the next song.
  const lines = el.querySelectorAll(".smoke-line");
  const old = lines[lines.length - 1] || null;
  lines.forEach((l) => { if (l !== old) l.remove(); });

  if (old) {                                          // dissolve the outgoing line, drifting with the swipe
    old.classList.remove("is-in");
    old.classList.add("is-out");
    old.style.setProperty("--dir", String(dir));
    const os = old.querySelectorAll("span"); const on = os.length;
    os.forEach((s, i) => {
      const k = dir >= 0 ? i : (on - 1 - i);
      s.style.animation = "none";                     // restart cleanly even mid-flight
      void s.offsetWidth;
      s.style.animation = "";
      s.style.animationDelay = (k * 0.03).toFixed(3) + "s";
    });
    setTimeout(() => { if (old.parentNode === el) old.remove(); }, on * 30 + 950);
  }
  // Incoming arrives from the OPPOSITE side (driftDir = -dir) and assembles from that
  // same edge first (staggerDir = dir): for a "next" swipe the smoke blows left while
  // the new title condenses in from the right, rightmost letter settling first.
  el.appendChild(_splitSmoke(text, "is-in", -dir, dir, 0.03));
}

function updateCard() {
  const d = DISCS[index];
  _smokeSwap(trackTitle, d ? (d.title || "") : "", smokeDir);
  _smokeSwap(trackArtist, d ? (d.artist || "") : "", smokeDir);
  const cover = document.getElementById("npCoverArt");   // mini cassette in the lyrics bar
  if (cover && d && d.art && cover.getAttribute("src") !== d.art) cover.src = d.art;
  _cardReady = true;
}

// Which engine plays this disc: a local/URL audio file wins; else a YouTube link (http only).
// The audio source for a disc. YouTube tracks stream through the local server
// (/api/audio), which resolves the real audio with yt-dlp — this bypasses the
// blocked YouTube IFrame embed entirely and plays via the plain <audio> element.
function audioSrcFor(d) {
  if (!d) return "";
  if (d.audio) return d.audio;
  if (d.yt) { const id = ytId(d.yt); return id ? "/api/audio?id=" + id : ""; }
  return "";
}
function engineFor(d) {
  if (!d) return "none";
  if (d.spotify) return "spotify";
  if (d.audio) return "audio";
  if (d.yt) return USE_IFRAME ? "yt" : "audio";   // IFrame when hosted, server-side audio on localhost
  return "none";
}
function showYTBox(show) { if (ytHost) ytHost.style.display = show ? "" : "none"; }

function syncSong() {
  tempSong = null;           // returning to a real cassette ends any preview
  updateCard();
  if (typeof syncHeart === "function") syncHeart();
  if (typeof updateBg === "function") updateBg();
  if (typeof lyricsOnSongChange === "function") lyricsOnSongChange();
  resetProgress();
  const d = DISCS[index];
  if (!d) { showYTBox(false); try { audioEl.pause(); } catch (e) {} return; }   // empty playlist
  const eng = engineFor(d);
  if (eng !== "audio") { try { audioEl.pause(); } catch (e) {} }
  if (eng !== "yt")    { try { if (ytReady && yt) yt.stopVideo(); } catch (e) {} }
  if (eng !== "spotify" && window.SP) { try { window.SP.pause(); } catch (e) {} }
  showYTBox(eng === "yt");

  if (eng === "audio") {
    audioEl.src = audioSrcFor(d);
    audioEl.load();
    if (wantPlay) audioEl.play().catch(() => {});   // may need a user click first
  } else if (eng === "yt") {
    const id = ytId(d.yt);
    if (ytReady && yt && id) { wantPlay ? yt.loadVideoById(id) : yt.cueVideoById(id); }
  } else if (eng === "spotify") {
    if (window.SP) { wantPlay ? window.SP.playUri(d.spotify) : window.SP.pause(); }
    else { paused = true; setPlayIcon(false); }
  } else {
    paused = true; setPlayIcon(false);
  }
}

function togglePlay() {
  if (tempSong) {              // controlling a preview
    if (!ytReady || !yt) return;
    if (yt.getPlayerState() === YT.PlayerState.PLAYING) yt.pauseVideo();
    else { wantPlay = true; yt.playVideo(); }
    return;
  }
  const d = DISCS[index];
  const eng = engineFor(d);
  if (eng === "audio") {
    if (audioEl.paused) {
      wantPlay = true;
      if (!audioEl.src) { audioEl.src = audioSrcFor(d); audioEl.load(); }
      audioEl.play().catch(() => {});
    } else {
      audioEl.pause();
    }
  } else if (eng === "yt") {
    const id = ytId(d.yt);
    if (!ytReady || !yt || !id) { paused = !paused; setPlayIcon(!paused); return; }
    if (yt.getPlayerState() === YT.PlayerState.PLAYING) yt.pauseVideo();
    else { wantPlay = true; yt.playVideo(); }
  } else if (eng === "spotify") {
    if (!window.SP) { paused = !paused; setPlayIcon(!paused); return; }
    wantPlay = true;
    window.SP.toggle(d.spotify);
  } else {
    paused = !paused; setPlayIcon(!paused);   // no source: just toggle the spin
  }
  if (!applyingRemote && typeof roomBroadcastSoon === "function") roomBroadcastSoon();
}
ctrlPlay?.addEventListener("click", togglePlay);

// Spotify Web Playback SDK reports state through this hook (position/duration in ms).
window.spotifyOnState = function (st) {
  if (!st) return;
  const onSpotifyTrack = engineFor(DISCS[index]) === "spotify";
  if (st.ended) { if (onSpotifyTrack) next(); return; }
  if (!onSpotifyTrack) return;          // ignore stray events when a non-Spotify track is active
  paused = !!st.paused;
  if (typeof st.position === "number") lastSpotifyPosMs = st.position;   // for room-sync snapshots
  setPlayIcon(!st.paused);
  if (st.duration && fillEl) {
    fillEl.style.width = Math.min(100, (st.position / st.duration) * 100).toFixed(1) + "%";
    if (timeL) timeL.textContent = fmt(st.position / 1000);
    if (timeR) timeR.textContent = fmt(st.duration / 1000);
  }
  if (st.ended) { next(); return; }
  if (typeof refreshPlayingWave === "function") refreshPlayingWave();
};

/* <audio> events drive the spin + progress bar */
if (audioEl) {
  audioEl.addEventListener("play",  () => { paused = false; wantPlay = true; setPlayIcon(true); audioRetries = 0; });
  audioEl.addEventListener("playing", () => { audioRetries = 0; });   // real audio started
  audioEl.addEventListener("pause", () => { paused = true; setPlayIcon(false); });
  audioEl.addEventListener("ended", () => { next(); });
  audioEl.addEventListener("timeupdate", () => {
    if (scrubbing) return;
    const dur = audioEl.duration || 0, cur = audioEl.currentTime || 0;
    if (dur > 0 && fillEl) {
      fillEl.style.width = (cur / dur * 100).toFixed(1) + "%";
      if (timeL) timeL.textContent = fmt(cur);
      if (timeR) timeR.textContent = fmt(dur);
    }
  });
  // A transient stream hiccup (server 502 while resolving/proxying) shouldn't leave
  // the song stuck — auto-retry the source a few times before giving up.
  audioEl.addEventListener("error", () => {
    const d = DISCS[index];
    if (wantPlay && engineFor(d) === "audio" && audioRetries < 4) {
      audioRetries++;
      const base = audioSrcFor(d);
      if (base) {
        setTimeout(() => {
          audioEl.src = base + (base.includes("?") ? "&" : "?") + "r=" + Date.now();  // bust cache -> refetch
          audioEl.load();
          audioEl.play().catch(() => {});
        }, 500 * audioRetries);
        return;
      }
    }
    audioRetries = 0;
    paused = true; setPlayIcon(false); resetProgress();
  });
  // Seed the first disc's source so the very first click plays instantly
  if (engineFor(DISCS[index]) === "audio") audioEl.src = audioSrcFor(DISCS[index]);
}

/* ---------- Seekable progress bar (click + drag) ---------- */
const barEl = document.querySelector(".np__bar");
function curDuration() {
  if (tempSong && ytReady && yt) { try { return yt.getDuration() || 0; } catch (e) {} }
  const eng = engineFor(DISCS[index]);
  if (eng === "audio") return audioEl.duration || 0;
  if (eng === "yt" && ytReady && yt) { try { return yt.getDuration() || 0; } catch (e) {} }
  return 0;
}
function seekToFraction(frac) {
  frac = Math.max(0, Math.min(1, frac));
  const dur = curDuration();
  if (!dur) return;
  const t = frac * dur;
  const eng = engineFor(DISCS[index]);
  if (tempSong && ytReady && yt) { try { yt.seekTo(t, true); } catch (e) {} }
  else if (eng === "audio") { try { audioEl.currentTime = t; } catch (e) {} }
  else if (eng === "yt" && ytReady && yt) { try { yt.seekTo(t, true); } catch (e) {} }
  if (fillEl) fillEl.style.width = (frac * 100).toFixed(1) + "%";
  if (timeL) timeL.textContent = fmt(t);
}
function fracFromEvent(clientX) {
  const r = barEl.getBoundingClientRect();
  return (clientX - r.left) / r.width;
}
const npThumb = document.querySelector(".np__thumb");
if (barEl) {
  barEl.addEventListener("pointerdown", (e) => {
    scrubbing = true;
    npThumb?.classList.add("is-scrubbing");     // solid pill -> refractive glass lens
    barEl.setPointerCapture?.(e.pointerId);
    seekToFraction(fracFromEvent(e.clientX));
    e.preventDefault();
  });
  barEl.addEventListener("pointermove", (e) => {
    if (scrubbing) seekToFraction(fracFromEvent(e.clientX));
  });
  const endScrub = () => {
    scrubbing = false;
    npThumb?.classList.remove("is-scrubbing");
    if (!applyingRemote && typeof roomBroadcast === "function") roomBroadcast();
  };
  barEl.addEventListener("pointerup", endScrub);
  barEl.addEventListener("pointercancel", endScrub);
}

/* Optional YouTube (only for `yt` discs, http only) */
window.onYouTubeIframeAPIReady = function () {
  try {
    yt = new YT.Player("yt-player", {
      host: "https://www.youtube-nocookie.com",
      width: "180", height: "101",
      videoId: ytId(DISCS[index].yt) || undefined,
      playerVars: { controls: 1, rel: 0, modestbranding: 1, playsinline: 1, fs: 0,
                    origin: location.origin, enablejsapi: 1 },
      events: {
        onReady: () => { ytReady = true; window.ytPlayer = yt; if (engineFor(DISCS[index]) === "yt") syncSong(); },
        onStateChange: (e) => {
          const S = YT.PlayerState;
          if (e.data === S.PLAYING) { paused = false; wantPlay = true; setPlayIcon(true); }
          else if (e.data === S.PAUSED || e.data === S.ENDED || e.data === S.CUED) { paused = true; setPlayIcon(false); }
          if (e.data === S.ENDED && !tempSong) next();   // don't advance cassettes on a preview end
        },
        onError: () => { paused = true; setPlayIcon(false); resetProgress(); },
      },
    });
  } catch (e) { yt = null; ytReady = false; }
};

/* YouTube progress (local audio uses its own timeupdate) */
setInterval(() => {
  if (scrubbing) return;
  if (!tempSong && (engineFor(DISCS[index]) !== "yt" || !ytReady || !yt || !yt.getDuration)) return;
  if (tempSong && (!ytReady || !yt || !yt.getDuration)) return;
  let dur = 0, cur = 0;
  try { dur = yt.getDuration(); cur = yt.getCurrentTime(); } catch (e) { return; }
  if (dur > 0 && fillEl) {
    fillEl.style.width = (cur / dur * 100).toFixed(1) + "%";
    if (timeL) timeL.textContent = fmt(cur);
    if (timeR) timeR.textContent = fmt(dur);
  }
}, 500);

/* Hosted: load the YouTube IFrame API so playback happens in the visitor's own
   browser (their IP), sidestepping the datacenter bot-block that breaks the
   server-side /api/audio proxy. Local/loopback: skip it — the IFrame refuses
   loopback origins there, so /api/audio (yt-dlp) stays the playback path. */
(function () {
  if (USE_IFRAME && !window.YT && !document.getElementById("yt-iframe-api")) {
    const s = document.createElement("script");
    s.id = "yt-iframe-api";
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  } else {
    showYTBox(false);
  }
})();

showYTBox(engineFor(DISCS[index]) === "yt");
updateCard();

/* ---------- Keyboard ---------- */
window.addEventListener("keydown", (e) => {
  const t = e.target;
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
  if (document.getElementById("addSheet")?.classList.contains("is-open")) return;
  if (e.key === "ArrowRight") { next(); e.preventDefault(); }
  if (e.key === "ArrowLeft")  { prev(); e.preventDefault(); }
});

/* ---------- Wheel / trackpad (one CD at a time) ---------- */
let wheelLock = false;
player.addEventListener("wheel", (e) => {
  const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (Math.abs(delta) < 8) return;
  e.preventDefault();
  if (wheelLock) return;
  wheelLock = true;
  delta > 0 ? next() : prev();
  setTimeout(() => (wheelLock = false), 320);
}, { passive: false });

/* ---------- Pointer drag / swipe ---------- */
let lastMoveX = 0, lastMoveT = 0;
function onDown(e) {
  // Don't hijack presses on the card buttons / arrows / dots / video — let them click.
  if (e.target.closest(".nowplaying, .player__arrow, .player__dots, #yt-host, button, a")) return;
  dragging = true;
  pointerId = e.pointerId;
  startX = e.clientX;
  dragOffset = 0;
  lastMoveX = e.clientX;
  lastMoveT = performance.now();
  pointerVX = 0;
  player.classList.add("is-dragging");
  player.setPointerCapture?.(pointerId);
}
function onMove(e) {
  if (!dragging) return;
  dragOffset = e.clientX - startX;
  const t = performance.now();
  const dtm = (t - lastMoveT) / 1000;
  if (dtm > 0) pointerVX = (e.clientX - lastMoveX) / dtm;
  lastMoveX = e.clientX;
  lastMoveT = t;
  render();
}
function onUp() {
  if (!dragging) return;
  dragging = false;
  player.classList.remove("is-dragging");
  const before = index;
  const threshold = CFG.hero * 0.2;
  if (dragOffset <= -threshold) {
    index = clamp(index + Math.max(1, Math.round(-dragOffset / (CFG.hero * 0.6))));
  } else if (dragOffset >= threshold) {
    index = clamp(index - Math.max(1, Math.round(dragOffset / (CFG.hero * 0.6))));
  }
  if (index !== before) { smokeDir = dragOffset >= 0 ? 1 : -1; syncSong(); }  // smoke follows the swipe
  // Flick imparts angular momentum to the disc that seats in the case.
  const impulse = Math.max(-6, Math.min(6, -pointerVX * 0.004));
  vel[index] += impulse;
  dragOffset = 0;
  render();
}
player.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("pointercancel", onUp);
player.addEventListener("dragstart", (e) => e.preventDefault());

window.addEventListener("resize", () => { CFG = readCfg(); render(); });

/* ============================================================
   Add-song sheet: search YouTube / paste link -> add a cassette
   ============================================================ */
function saveAddedDiscs() { savePlaylists(); }   // persist the current playlist

// Find a disc already in the carousel by its unified track id (any source).
function findDiscByKey(key) {
  if (!key) return -1;
  for (let i = 0; i < DISCS.length; i++) {
    if (trackId(DISCS[i]) === key) return i;
  }
  return -1;
}

function addDisc(d, persist = true, navigate = true) {
  if (persist) {                                  // permanent add -> never duplicate
    const ex = findDiscByKey(trackId(d));
    if (ex >= 0) {
      if (ex >= BUILTIN_COUNT) { DISCS[ex].persist = true; saveAddedDiscs(); }
      if (navigate) { wantPlay = true; goTo(ex); }
      return ex;
    }
  }
  const disc = {
    art: d.art, title: d.title || "", artist: d.artist || "",
    yt: d.yt || "", audio: d.audio || "", spotify: d.spotify || "", persist: !!persist,
  };
  const i = DISCS.length;
  DISCS.push(disc);
  const el = buildDiscEl(disc, i);
  discs.push(el);
  spinEls.push(el.querySelector(".disc__spin"));
  angle.push(0);
  vel.push(0);
  preloadArt(i);
  saveAddedDiscs();              // permanent ones persist; temp ones don't
  if (navigate) { wantPlay = true; goTo(i); }   // jump to + play it
  else render();                                 // just show it in the carousel
  return i;
}

// Create a playlist in storage without switching to it (used by the "add to playlist" chooser)
function createPlaylistData(name) {
  const id = "pl_" + Date.now().toString(36) + Math.floor(Math.random() * 1e4);
  playlists.push({ id, name: (name || "").trim() || "New Playlist", discs: [] });
  try { localStorage.setItem(PLAYLISTS_LS, JSON.stringify(playlists)); } catch (e) {}
  return id;
}
// Add a song to a chosen playlist (dedup per playlist). Current playlist -> live carousel.
function addSongToPlaylist(pid, item, art) {
  const pl = playlists.find((p) => p.id === pid);
  if (!pl) return;
  const key = trackId(item);
  if (pid === currentPlaylistId) {
    addDisc({ art, title: item.title, artist: item.artist || "", yt: item.yt || "", spotify: item.spotify || "" }, true, false);
  } else {
    pl.discs = pl.discs || [];
    if (!pl.discs.some((d) => trackId(d) === key)) {
      pl.discs.push({ art, title: item.title, artist: item.artist || "", yt: item.yt || "", audio: "", spotify: item.spotify || "" });
      try { localStorage.setItem(PLAYLISTS_LS, JSON.stringify(playlists)); } catch (e) {}
    }
  }
}

let tempDiscIndex = -1;          // (legacy) previously tracked the single preview cassette

// Un-saved preview cassettes are only ever appended, so they always sit at the tail.
// Pop them off (arrays + DOM) without disturbing the indices of the saved songs — used
// to keep at most one preview around at a time.
function purgeTrailingTemp() {
  while (DISCS.length && !DISCS[DISCS.length - 1].persist) {
    const j = DISCS.length - 1;
    DISCS.pop(); angle.pop(); vel.pop(); spinEls.pop();
    const el = discs.pop();
    if (el && el.parentNode) el.parentNode.removeChild(el);
    if (dots[j]) { const dot = dots.splice(j, 1)[0]; if (dot && dot.parentNode) dot.parentNode.removeChild(dot); }
    if (index >= DISCS.length) index = Math.max(0, DISCS.length - 1);
  }
}

// Play a search result. Spotify rule: PLAYING a song is not the same as SAVING it.
// If it's already in the open playlist we just jump to it; otherwise we play it as a
// temporary preview cassette (persist=false) — it does NOT get written into "Liked
// Songs" or any playlist. The user saves it explicitly via the heart / "add to playlist".
function previewSong(item) {
  wantPlay = true;
  const ex = findDiscByKey(trackId(item));
  if (ex >= 0) { goTo(ex); return; }   // already in this playlist -> just play it
  purgeTrailingTemp();                  // keep only one un-saved preview at a time
  addDisc(item, false, true);           // play without saving (Spotify: playing ≠ liking)
}

const addBtn = document.getElementById("addBtn");
const addSheet = document.getElementById("addSheet");
const sheetOverlay = document.getElementById("sheetOverlay");
const sheetClose = document.getElementById("sheetClose");
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");
const resultsEl = document.getElementById("results");
const API_KEY_LS = "ytApiKey";   // legacy: a key can still live in localStorage as a search fallback

function getApiKey() { return (localStorage.getItem(API_KEY_LS) || "").trim(); }
function escapeHTML(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function decodeHTML(s) { const t = document.createElement("textarea"); t.innerHTML = s; return t.value; }
function setState(html) { resultsEl.innerHTML = `<div class="sheet__state">${html}</div>`; }
function showSpinner(label) { resultsEl.innerHTML = `<div class="sheet__state"><div class="sheet__spinner"></div>${label || "Searching…"}</div>`; }
function showEmptyState() {
  if (currentSource === "spotify") {
    setState(window.SP && window.SP.isConnected()
      ? "Search Spotify for a song."
      : "Connect Spotify to search — click the Spotify logo (bottom-left).");
    return;
  }
  setState("Search for a song, or paste a YouTube link.");
}

function openSheet() {
  if (typeof openPlSheet === "function") openPlSheet(false);   // close the playlist drawer
  sheetOverlay.hidden = false;
  requestAnimationFrame(() => { sheetOverlay.classList.add("is-open"); addSheet.classList.add("is-open"); });
  addSheet.setAttribute("aria-hidden", "false");
  showEmptyState();
  setTimeout(() => searchInput.focus(), 160);
}
function closeSheet() {
  sheetOverlay.classList.remove("is-open");
  addSheet.classList.remove("is-open");
  addSheet.setAttribute("aria-hidden", "true");
  setTimeout(() => { sheetOverlay.hidden = true; }, 340);
}
addBtn?.addEventListener("click", openSheet);
sheetClose?.addEventListener("click", closeSheet);
sheetOverlay?.addEventListener("click", closeSheet);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && addSheet?.classList.contains("is-open")) closeSheet();
});

// No-bar thumbnails: mq/maxres are 16:9 (no letterbox); hq/sd are 4:3 (bars)
const ytThumb = (id, q) => `https://img.youtube.com/vi/${id}/${q}.jpg`;
function pickThumb(id) {
  return new Promise((resolve) => {
    const t = new Image();
    t.onload = () => resolve(t.naturalWidth >= 600 ? ytThumb(id, "maxresdefault") : ytThumb(id, "mqdefault"));
    t.onerror = () => resolve(ytThumb(id, "mqdefault"));
    t.src = ytThumb(id, "maxresdefault");
  });
}

// Prefer the REAL square album cover (iTunes, via the server proxy so the canvas can read it);
// fall back to the YouTube thumbnail (which trimBorders will crop to fit).
async function bestCover(title, artist, id) {
  try {
    const term = ((artist && artist !== "—" ? artist + " " : "") + (title || "")).trim();
    if (term) {
      const r = await fetch("/api/cover?term=" + encodeURIComponent(term));
      const j = await r.json();
      if (j && j.art) return "/api/img?url=" + encodeURIComponent(j.art);
    }
  } catch (e) { /* offline / not on server -> fall back */ }
  return await pickThumb(id);
}

// Reduce a cluttered YouTube title to just the song name (+ artist if present)
/* ---------- YouTube title → clean "Song" + "Artist" ----------------------------
   YouTube titles are a free-for-all ("ARTIST - Song (Official Music Video) [4K] ft.
   X | Label"). This distils them down to just the song name, with the artist pulled
   out separately, so the card only ever shows the two lines the user asked for. */

// Pure decoration tokens — never part of a real song name. Built lazily so it's
// available even to the very first parseSongMeta() call during playlist load (a
// module-scope const would still be in its TDZ at that point).
function _ytNoiseRe() {
  return /\b(official\s*(music\s*)?video|official\s*audio|official\s*lyrics?\s*video|official\s*visuali[sz]er|official|music\s*video|lyrics?\s*video|lyrics?|with\s*lyrics|audio\s*only|audio|visuali[sz]er|video|hd|hq|uhd|4k|8k|mv|m\/v|explicit|clean\s*version|remaster(ed)?(\s*\d{4})?|full\s*(video|song|album)|colou?r\s*coded|now\s*playing)\b/gi;
}

// A YouTube channel name → a plain artist name ("TheWeekndVEVO"/"Drake - Topic" → …).
function cleanArtist(name) {
  let a = String(name || "").replace(/\s+/g, " ").trim();
  a = a.replace(/\s*-\s*Topic\b/gi, "");                 // auto-generated "Art - Topic"
  a = a.replace(/VEVO\b/gi, "");                         // "ArtistVEVO"
  a = a.replace(/\b(official|music|channel|records?|recordings?|entertainment|media|tv|network)\b/gi, "");
  a = a.split(/\s*(?:,|&|\+|feat\.?|ft\.?|featuring|\bx\b|×|\bvs\.?\b)\s*/i)[0];   // primary artist only
  a = a.replace(/["'“”«»]+/g, "").replace(/\s*[-–—·]\s*$/, "").replace(/^\s*[-–—·]\s*/, "");
  return a.replace(/\s{2,}/g, " ").trim();
}

// Strip a title down to the bare song name.
function cleanSongTitle(raw) {
  let t = String(raw || "").replace(/\s+/g, " ").trim();
  // 1. Drop every bracketed / braced group — (…) […] {…} — version tags, "official
  //    video", feat credits, quality, prod. credits all live in these.
  for (let i = 0; i < 4; i++) t = t.replace(/[([{][^()[\]{}]*[)\]}]/g, " ");
  // 2. Drop "feat./ft./featuring/with …" runs (to a delimiter or end of string).
  t = t.replace(/\s[\(\[]?\b(feat|ft|featuring|with|prod)\b\.?\s.*?(?=[-–—|]|$)/i, " ");
  // 3. Cut trailing "| channel/label" segments.
  t = t.replace(/\s*\|.*$/, " ");
  // 4. Remove leftover decoration words and stray quotes / delimiters.
  t = t.replace(_ytNoiseRe(), " ").replace(/["'“”«»]+/g, "");
  t = t.replace(/\s*[-–—·:]\s*$/, "").replace(/^\s*[-–—·:]\s*/, "");
  return t.replace(/\s{2,}/g, " ").trim();
}

function parseSongMeta(rawTitle, author) {
  let title = cleanSongTitle(rawTitle);
  let artist = "";

  // "Artist - Song" is the dominant YouTube/VEVO shape. Split on the FIRST dash.
  const dash = title.match(/^(.{1,60}?)\s*[-–—]\s*(.+)$/);
  if (dash) {
    const left = dash[1].trim(), right = dash[2].trim();
    const auth = cleanArtist(author).toLowerCase();
    // If the channel clearly matches the RIGHT side it's "Song - Artist"; else assume
    // the performer is on the left (the common case).
    if (auth && right.toLowerCase().includes(auth) && !left.toLowerCase().includes(auth)) {
      artist = right; title = left;
    } else {
      artist = left; title = right;
    }
  }

  artist = cleanArtist(artist || author);        // fall back to the channel name
  title = cleanSongTitle(title).replace(/^["'“”«]+|["'“”»]+$/g, "").trim();

  return { title: title || String(rawTitle || "").trim(), artist };
}

const PLUS_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`;
const HEART_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

// Is this song (by unified track id) already saved in ANY playlist?
function songInAnyPlaylist(key) {
  if (!key) return false;
  if (DISCS.some((d) => d.persist && trackId(d) === key)) return true;
  return playlists.some((pl) => (pl.discs || []).some((d) => trackId(d) === key));
}
// Sync every visible result's add icon (+ vs heart) with the saved state
function refreshResultIcons() {
  resultsEl.querySelectorAll(".result").forEach((row) => {
    const btn = row.querySelector(".result__add");
    if (!btn) return;
    const saved = songInAnyPlaylist(row.dataset.key);
    btn.classList.toggle("is-saved", saved);
    btn.innerHTML = saved ? HEART_SVG : PLUS_SVG;
    btn.title = saved ? "In a playlist — add to another" : "Add to playlist";
  });
}

// The unified track id of the song currently playing (or null if nothing is playing)
function currentPlayingId() {
  if (paused) return null;
  return trackId(DISCS[index]) || null;
}
// Show the loading wave on any song row (search results OR playlist drawer) that
// matches the currently-playing song.
function refreshPlayingWave() {
  const pid = currentPlayingId();
  document.querySelectorAll(".result").forEach((row) => {
    row.classList.toggle("is-playing", !!pid && row.dataset.key === pid);
  });
}

function renderResults(items) {
  if (!items.length) { setState("No results."); return; }
  resultsEl.innerHTML = "";
  items.forEach((it) => {
    const row = document.createElement("div");
    row.className = "result";
    row.dataset.yt = it.yt || "";
    row.dataset.spotify = it.spotify || "";
    row.dataset.key = trackId(it);
    const saved = songInAnyPlaylist(row.dataset.key);
    row.innerHTML = `
      <img class="result__thumb" src="${it.art}" alt="" loading="lazy" />
      <div class="result__meta">
        <div class="result__title">${escapeHTML(it.title)}</div>
        <div class="result__artist">${escapeHTML(it.artist || "")}</div>
      </div>
      <div class="result__actions">
        <button class="result__btn result__play" aria-label="Play preview" title="Play (no add)">
          <svg class="result__playic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>
          <span class="loading-wave" aria-hidden="true"><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div></span>
        </button>
        <button class="result__btn result__add${saved ? " is-saved" : ""}" aria-label="Add to playlist" title="${saved ? "In a playlist — add to another" : "Add to playlist"}">
          ${saved ? HEART_SVG : PLUS_SVG}
        </button>
      </div>`;
    const preview = async () => {
      // Spotify results already carry a real square album cover; only YouTube needs a lookup.
      const art = it.spotify ? it.art : await bestCover(it.title, it.artist, ytId(it.yt));
      previewSong({ ...it, art });        // wave appears when it actually starts playing
    };
    row.querySelector(".result__play").addEventListener("click", (e) => { e.stopPropagation(); preview(); });
    row.querySelector(".result__add").addEventListener("click", (e) => { e.stopPropagation(); openAddToPlaylist(it); });
    row.addEventListener("click", preview);     // clicking the row previews it
    resultsEl.appendChild(row);
  });
  refreshPlayingWave();   // if a result matches the song already playing, show its wave now
}

async function resolveUrl(idOrUrl) {
  const id = ytId(idOrUrl);
  if (!id) return null;
  try {
    const r = await fetch("https://noembed.com/embed?url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + id));
    const j = await r.json();
    if (j.error) return null;
    const meta = parseSongMeta(j.title || "YouTube video", j.author_name || "");
    return { yt: "https://www.youtube.com/watch?v=" + id, title: meta.title, artist: meta.artist, art: `https://img.youtube.com/vi/${id}/mqdefault.jpg` };
  } catch (e) { return null; }
}

async function apiSearch(q) {
  const key = getApiKey();
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=12&q=${encodeURIComponent(q)}&key=${key}`;
  const r = await fetch(url);
  const j = await r.json();
  if (j.error) throw new Error((j.error && j.error.message) || "API error");
  return (j.items || []).map((it) => {
    const meta = parseSongMeta(decodeHTML(it.snippet.title || ""), it.snippet.channelTitle || "");
    return {
      yt: "https://www.youtube.com/watch?v=" + it.id.videoId,
      title: meta.title,
      artist: meta.artist,
      art: (it.snippet.thumbnails.medium || it.snippet.thumbnails.default).url,
    };
  });
}

// Keyless search via the local server (server.py /api/search)
async function localSearch(q) {
  const r = await fetch("/api/search?q=" + encodeURIComponent(q));
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return (j.items || []).map((it) => {
    const meta = parseSongMeta(it.title || "YouTube video", it.artist || "");
    return {
      yt: "https://www.youtube.com/watch?v=" + it.id,
      title: meta.title,
      artist: meta.artist,
      art: `https://img.youtube.com/vi/${it.id}/mqdefault.jpg`,
    };
  });
}

let searchTimer = null, searchSeq = 0;
async function runSearch(q) {
  const seq = ++searchSeq;
  // Spotify mode: search Spotify's catalog via the Web API
  if (currentSource === "spotify") {
    if (!window.SP || !window.SP.isConnected()) {
      setState("Connect Spotify first — click the Spotify logo (bottom-left).");
      return;
    }
    showSpinner("Searching Spotify…");
    try {
      const items = await window.SP.search(q);
      if (seq !== searchSeq) return;
      renderResults(items);
    } catch (e) {
      if (seq !== searchSeq) return;
      setState("Spotify search failed: " + escapeHTML(e.message || String(e)) + ".");
    }
    return;
  }
  if (ytId(q)) {                       // pasted link / id
    showSpinner("Loading…");
    const item = await resolveUrl(q);
    if (seq !== searchSeq) return;
    renderResults(item ? [item] : []);
    return;
  }
  showSpinner("Searching…");
  // 1) keyless search through the local server
  try {
    const items = await localSearch(q);
    if (seq !== searchSeq) return;
    if (items.length) { renderResults(items); return; }
  } catch (e) { /* server not running / blocked -> try key, then guide */ }
  // 2) optional API-key fallback
  if (getApiKey()) {
    try {
      const items = await apiSearch(q);
      if (seq !== searchSeq) return;
      renderResults(items);
      return;
    } catch (e) {
      if (seq !== searchSeq) return;
      setState("Search failed: " + escapeHTML(e.message) + ".<br>Or paste a YouTube link.");
      return;
    }
  }
  if (seq !== searchSeq) return;
  setState("Live search needs the local server.<br>Run <b>python3 server.py</b> (or <b>npm start</b>), open localhost,<br>or paste a YouTube link to add it.");
}

searchInput?.addEventListener("input", () => {
  const q = searchInput.value.trim();
  searchClear.hidden = !q;
  clearTimeout(searchTimer);
  if (!q) { showEmptyState(); return; }
  searchTimer = setTimeout(() => runSearch(q), ytId(q) ? 0 : 450);
});
searchInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { clearTimeout(searchTimer); runSearch(searchInput.value.trim()); }
});
searchClear?.addEventListener("click", () => {
  searchInput.value = ""; searchClear.hidden = true; showEmptyState(); searchInput.focus();
});

/* ---------- Source switch: YouTube <-> Spotify ---------- */
const srcYouTubeBtn = document.getElementById("srcYouTube");
const srcSpotifyBtn = document.getElementById("srcSpotify");

const srcThumb = document.getElementById("srcThumb");
let _srcPrevLeft = null;
function moveSrcThumb() {
  const active = currentSource === "spotify" ? srcSpotifyBtn : srcYouTubeBtn;
  if (!srcThumb || !active) return;
  const x = active.offsetLeft - 4;
  if (_srcPrevLeft != null && _srcPrevLeft !== x) {
    // Squash toward the travel direction (reference's c-previous transform-origin):
    // anchor the trailing edge so the capsule stretches toward its destination.
    srcThumb.style.transformOrigin = x > _srcPrevLeft ? "left center" : "right center";
    srcThumb.classList.remove("src-squash");
    void srcThumb.offsetWidth;                 // restart the keyframe
    srcThumb.classList.add("src-squash");
  }
  srcThumb.style.transform = "translateX(" + x + "px)";
  _srcPrevLeft = x;
}
function reflectSource() {
  srcYouTubeBtn?.classList.toggle("is-active", currentSource === "youtube");
  srcSpotifyBtn?.classList.toggle("is-active", currentSource === "spotify");
  srcYouTubeBtn?.setAttribute("aria-selected", String(currentSource === "youtube"));
  srcSpotifyBtn?.setAttribute("aria-selected", String(currentSource === "spotify"));
  moveSrcThumb();
  if (searchInput) {
    searchInput.placeholder = currentSource === "spotify"
      ? "Search Spotify…"
      : "Search YouTube or paste a link…";
  }
}
function setSource(src) {
  if (src !== "youtube" && src !== "spotify") return;
  currentSource = src;
  localStorage.setItem("musicSource", src);
  reflectSource();
  // If the search sheet is open, refresh it for the new source
  if (addSheet?.classList.contains("is-open")) {
    const q = searchInput.value.trim();
    if (q) runSearch(q); else showEmptyState();
  }
}
srcYouTubeBtn?.addEventListener("click", () => setSource("youtube"));
srcSpotifyBtn?.addEventListener("click", () => {
  // Switch to Spotify; if not yet connected, open the connect flow
  if (window.SP && window.SP.isConnected()) { setSource("spotify"); }
  else if (window.SP) { window.SP.beginConnect(); }
  else { alert("Spotify module failed to load."); }
});
// spotify.js calls this when the connection state changes
window.onSpotifyConnected = function (ok) {
  if (ok) setSource("spotify");
  reflectSource();
};
reflectSource();

/* ---------- Effect picker (top-left dropdown) ---------- */
const fxPicker = document.getElementById("fxPicker");
const fxToggle = document.getElementById("fxToggle");
const fxMenu = document.getElementById("fxMenu");
const fxToggleVal = document.getElementById("fxToggleVal");

let committedEffect = currentEffect;      // the confirmed (clicked) effect

function openFxMenu(open) {
  if (open && typeof openPlSheet === "function") openPlSheet(false);  // close the playlist drawer first
  fxMenu.hidden = !open;
  fxPicker.classList.toggle("is-open", open);
  fxToggle.setAttribute("aria-expanded", String(open));
  if (!open) setEffect(committedEffect);  // drop any hover preview on close
}
fxToggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  openFxMenu(fxMenu.hidden);
});

// Hover to preview the effect live on the playing cassette
fxMenu?.addEventListener("mouseover", (e) => {
  const btn = e.target.closest(".fx-opt");
  if (btn) setEffect(btn.dataset.fx);
});
fxMenu?.addEventListener("mouseleave", () => setEffect(committedEffect));

// Click to confirm the selection
fxMenu?.addEventListener("click", (e) => {
  const btn = e.target.closest(".fx-opt");
  if (!btn) return;
  committedEffect = btn.dataset.fx;
  [...fxMenu.querySelectorAll(".fx-opt")].forEach((b) => b.classList.toggle("is-active", b === btn));
  fxToggleVal.textContent = btn.textContent;
  setEffect(committedEffect);
  openFxMenu(false);
});
document.addEventListener("click", (e) => {
  if (fxPicker && !fxPicker.contains(e.target)) openFxMenu(false);
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && fxMenu && !fxMenu.hidden) openFxMenu(false);
});

/* ---------- Frame switcher (different jewel-case + cassette geometry per frame) ----------
   Each frame shares the same outer --hero size but positions the disc differently.
   disc* are percentages of the frame (feed --disc-left / --disc-top / --disc-size). */
const FRAMES = [
  { id: "classic", name: "Classic", case: "assets_case.png", discLeft: 8.333, discTop: 6.833, discSize: 84.833 },
  // Turntable (Figma frame 43:112). Disc sits on the platter, tonearm to the right.
  { id: "frame4", name: "Turntable", case: "assets_case4.png", discLeft: 11.6667, discTop: 4.3333, discSize: 59.3333 },
  // Silver deck (Figma frame 50:168). Disc on the left, vents to the right.
  { id: "frame5", name: "Silver Deck", case: "assets_case5.png", discLeft: 2.1667, discTop: 14.5, discSize: 71.5 },
  // White speaker (Figma frame 50:175). Disc on top, grille below.
  { id: "frame6", name: "White Speaker", case: "assets_case6.png", discLeft: 24.8333, discTop: 6.3333, discSize: 50.5 },
  // Record + tonearm (Figma frame 52:190). Big disc; the tonearm sits ABOVE the disc
  // (overlay), so it visually rests on the spinning record like in Figma.
  { id: "frame7", name: "Record", case: "", overlay: "assets_case7.png", discLeft: 9.1667, discTop: 9.1667, discSize: 81.6667 },
];
const FRAME_LS = "musicFrame";
const playerCase = document.getElementById("playerCase");
const playerOverlay = document.getElementById("playerOverlay");
const framePicker = document.getElementById("framePicker");
const frameToggle = document.getElementById("frameToggle");
const frameMenu = document.getElementById("frameMenu");
let currentFrameId = localStorage.getItem(FRAME_LS) || FRAMES[0].id;
if (!FRAMES.some((f) => f.id === currentFrameId)) currentFrameId = FRAMES[0].id;

function applyFrame(id, persist) {
  const f = FRAMES.find((x) => x.id === id) || FRAMES[0];
  currentFrameId = f.id;
  // Base case art (behind the disc). Empty string = no base layer (hide it).
  if (playerCase) {
    if (f.case) { if (playerCase.getAttribute("src") !== f.case) playerCase.src = f.case; playerCase.hidden = false; }
    else { playerCase.hidden = true; }
  }
  // Optional overlay art (above the disc, e.g. a tonearm).
  if (playerOverlay) {
    if (f.overlay) { if (playerOverlay.getAttribute("src") !== f.overlay) playerOverlay.src = f.overlay; playerOverlay.hidden = false; }
    else { playerOverlay.hidden = true; playerOverlay.removeAttribute("src"); }
  }
  const root = document.documentElement.style;
  root.setProperty("--disc-left", f.discLeft + "%");
  root.setProperty("--disc-top", f.discTop + "%");
  root.setProperty("--disc-size", f.discSize + "%");
  CFG = readCfg();                 // disc-size feeds the carousel math
  render();
  if (persist !== false) localStorage.setItem(FRAME_LS, f.id);
  renderFrameMenu();
}
function renderFrameMenu() {
  if (!frameMenu) return;
  frameMenu.innerHTML = "";
  FRAMES.forEach((f) => {
    const b = document.createElement("button");
    b.className = "fx-opt" + (f.id === currentFrameId ? " is-active" : "");
    b.setAttribute("role", "option");
    b.textContent = f.name;
    b.addEventListener("click", () => { applyFrame(f.id); openFrameMenu(false); });
    frameMenu.appendChild(b);
  });
}
function openFrameMenu(open) {
  if (!frameMenu) return;
  if (open) { openFxMenu(false); if (typeof openPlSheet === "function") openPlSheet(false); }
  if (open) renderFrameMenu();
  frameMenu.hidden = !open;
  framePicker.classList.toggle("is-open", open);
  frameToggle.setAttribute("aria-expanded", String(open));
}
// If a frame's case image is missing (e.g. assets_case2.png not added yet),
// fall back to the Classic frame so the jewel case never shows a broken image.
playerCase?.addEventListener("error", () => {
  if (currentFrameId !== FRAMES[0].id) applyFrame(FRAMES[0].id);
});
frameToggle?.addEventListener("click", (e) => { e.stopPropagation(); openFrameMenu(frameMenu.hidden); });
document.addEventListener("click", (e) => { if (framePicker && !framePicker.contains(e.target)) openFrameMenu(false); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape" && frameMenu && !frameMenu.hidden) openFrameMenu(false); });
// Also close the frame menu when the effect menu opens
const _origOpenFxMenu = openFxMenu;
openFxMenu = function (open) { if (open) openFrameMenu(false); return _origOpenFxMenu(open); };
applyFrame(currentFrameId, false);    // apply the saved frame on load

/* ---------- Voice control (mic button) ----------
   Click the mic -> music ducks + it listens. Say things like:
   "play good news by mac miller", "add this to playlist", "add this to <name>",
   "pause" / "play" / "next" / "previous" / "like". Uses the Web Speech API (Chrome). */
const micBtn = document.getElementById("micBtn");
const voiceToast = document.getElementById("voiceToast");
const voiceIcon = document.getElementById("voiceIcon");
const voiceText = document.getElementById("voiceText");
let voiceHideTimer = null;

// Rive listening blob — shown as the transcript toast's icon while listening
let riveInst = null, riveSM = null, riveInputs = [];
function initRive() {
  if (riveInst || !window.rive || !micBtn) return;
  const canvas = document.getElementById("micRive");
  if (!canvas) return;
  try {
    riveInst = new rive.Rive({
      src: "mic-listen.riv",
      canvas,
      autoplay: true,                                       // play + render continuously (looping orb)
      onLoad: () => {
        micBtn.classList.add("has-rive");                  // CSS then shows Rive instead of the ripple
        if (voiceToast) voiceToast.classList.add("has-blob");  // blob is the chip icon in every state
        try { riveInst.volume = 0; } catch (e) {}          // mute any audio in the .riv
        try { const sms = riveInst.stateMachineNames || []; riveSM = sms[0] || null; } catch (e) { riveSM = null; }
        try { riveInst.resizeDrawingSurfaceToCanvas(); } catch (e) {}
      },
      onLoadError: () => { riveInst = null; },
    });
  } catch (e) { riveInst = null; }
}
// When the chip appears the canvas becomes visible -> resize the surface and (re)start the SM
function riveListen(on) {
  if (!riveInst || !on) return;
  requestAnimationFrame(() => {
    try { riveInst.resizeDrawingSurfaceToCanvas(); } catch (e) {}
    try { riveSM ? riveInst.play(riveSM) : riveInst.play(); } catch (e) {}
  });
}
// Rive is initialised lazily on the first chip show (so the canvas has a real size).
// The transcript types out char-by-char into a right-anchored line. Once the line fills the
// chip, the overflowing leftmost characters detach and drift up-and-left while fading.
function vtLine() {
  let line = voiceText.querySelector(".vt-line");
  if (!line) { voiceText.textContent = ""; line = document.createElement("span"); line.className = "vt-line"; voiceText.appendChild(line); }
  return line;
}
function vtFlyChar(span) {                     // detach an overflowed char and let it drift away
  const cr = span.getBoundingClientRect(), pr = voiceText.getBoundingClientRect();
  const fly = document.createElement("span");
  fly.className = "vt-fly";
  fly.textContent = span.textContent;
  fly.style.left = (cr.left - pr.left) + "px";
  fly.style.top = (cr.top - pr.top) + "px";
  voiceText.appendChild(fly);
  fly.addEventListener("animationend", () => fly.remove());
  span.remove();
}
function vtScrollTo(line, animate) {                 // keep the newest char at the right edge
  const over = Math.max(0, line.scrollWidth - voiceText.clientWidth);
  if (animate === false) {                            // instant (used to compensate a removal)
    line.style.transition = "none";
    line.style.transform = "translateX(" + (-over) + "px)";
    line.getBoundingClientRect();                     // flush
    line.style.transition = "";
  } else {
    line.style.transform = "translateX(" + (-over) + "px)";   // smooth glide via CSS transition
  }
}
function vtRevealTick() {
  const q = voiceText.__queue;
  if (!q || !q.length) { clearInterval(voiceText.__timer); voiceText.__timer = null; return; }
  const line = vtLine();
  const ch = q.shift();
  const s = document.createElement("span");
  s.textContent = ch === " " ? "\u00a0" : ch;         // keep spaces
  line.appendChild(s);
  vtScrollTo(line, true);
}
function vtPoll() {                                    // fly off chars as they reach the left edge
  voiceText.__raf = requestAnimationFrame(vtPoll);
  const line = voiceText.querySelector(".vt-line");
  if (!line || !line.firstChild) return;
  const pr = voiceText.getBoundingClientRect();
  let guard = 0;
  while (line.firstChild && guard++ < 40) {
    const cr = line.firstChild.getBoundingClientRect();
    if (cr.left - pr.left < -0.5) {                    // this char scrolled past the left edge
      vtFlyChar(line.firstChild);
      vtScrollTo(line, false);                         // compensate after EACH removal (no cascade)
    } else break;
  }
}
function vtStartPoll() { if (!voiceText.__raf) voiceText.__raf = requestAnimationFrame(vtPoll); }
function vtReset() {
  if (voiceText.__timer) { clearInterval(voiceText.__timer); voiceText.__timer = null; }
  if (voiceText.__raf) { cancelAnimationFrame(voiceText.__raf); voiceText.__raf = null; }
  voiceText.__queue = []; voiceText.__target = "";
  voiceText.innerHTML = "";
}
function flowTranscript(msg) {
  const prev = voiceText.__target || "";
  let c = 0; while (c < prev.length && c < msg.length && prev[c] === msg[c]) c++;
  if (c < prev.length) { vtReset(); voiceText.__queue = msg.split(""); }   // revised -> restart
  else voiceText.__queue = (voiceText.__queue || []).concat(msg.slice(prev.length).split(""));
  voiceText.__target = msg;
  if (!voiceText.__timer) voiceText.__timer = setInterval(vtRevealTick, 32);
}
function showVoice(msg, icon, fly) {
  if (!voiceToast) return;
  clearTimeout(voiceHideTimer);
  if (voiceIcon) voiceIcon.textContent = icon || "";      // hidden while the blob shows, but kept
  pillStreamText(msg, false);               // status pills morph in too (Searching…, ▶ now playing, …)
  initRive();                               // lazy-init now that the canvas is visible (has size)
  if (riveInst) riveListen(true);           // keep the blob alive in every state (listen/search/play)
}
function hideVoice(delay = 1600) {
  clearTimeout(voiceHideTimer);
  voiceHideTimer = setTimeout(() => {
    voiceToast && voiceToast.classList.remove("is-show");
    if (riveInst) riveListen(false);
    setTimeout(() => {
      if (voiceToast) voiceToast.hidden = true;
      streamStop();                           // stop the morph pump (no rAF leak)
    }, 220);
  }, delay);
}

// Duck / restore playback volume across all engines while listening
// Base music level when NOT actively ducked. Normally 1 (full); lowered while the
// "Maya" wake word is armed so the mic can pick up your voice over the music.
// ---- Music ducking (Alexa-style) --------------------------------------------
// The music rests at _musicBase (loud). It ducks to near-silent whenever *anyone*
// is speaking — Sable's TTS, an open push-to-talk mic, or the wake engine hearing
// your voice (_voiceDuck) — then snaps back to loud the moment speech stops. This
// is the "accessibility" behaviour the user asked for: talk → music quiets, stop →
// music loud again.
let _musicBase = 1;
let _voiceDuck = false;   // wake engine's VAD: you are currently speaking
const DUCK_LO = 0.1;
function _musicShouldDuck() {
  return !!window.__sableSpeaking || (typeof listening !== "undefined" && listening) || _voiceDuck;
}
function applyMusicVolume() {
  const ducked = _musicShouldDuck();
  const hi = _musicBase;
  try { if (window.ytPlayer && window.ytPlayer.setVolume) window.ytPlayer.setVolume(ducked ? Math.round(DUCK_LO * 100) : Math.round(hi * 100)); } catch (e) {}
  try { if (audioEl) audioEl.volume = ducked ? DUCK_LO : hi; } catch (e) {}
  try { if (window.SP && window.SP.setVolume) window.SP.setVolume(ducked ? DUCK_LO : hi * 0.9); } catch (e) {}
}
// Back-compat: callers pass a hint but the real state comes from the flags above.
function duckAudio(_on) { applyMusicVolume(); }
// Set the resting (un-ducked) music level (0..1) and apply it now.
function setMusicBase(v) {
  _musicBase = Math.max(0, Math.min(1, v));
  applyMusicVolume();
}
// Called by the wake engine when your voice starts/stops, to duck/restore live.
function setVoiceDucking(on) {
  if (_voiceDuck === !!on) return;
  _voiceDuck = !!on;
  applyMusicVolume();
}
window.setMusicBase = setMusicBase;
window.setVoiceDucking = setVoiceDucking;

// Search the current source and play the top hit
async function voicePlay(query) {
  query = (query || "").trim();
  if (!query) return;
  showVoice("Searching: " + query, "🔎");
  try {
    let items;
    if (currentSource === "spotify" && window.SP && window.SP.isConnected()) items = await window.SP.search(query);
    else items = await localSearch(query);
    if (!items || !items.length) { sayCanned(_pick(["I couldn't find that.", "No luck finding " + query + "."])); return; }
    const it = items[0];
    const art = it.spotify ? it.art : await bestCover(it.title, it.artist, ytId(it.yt));
    previewSong({ ...it, art });
    // Talk back with the resolved track — canned phrase, same voice, no AI.
    const by = it.artist ? " by " + it.artist : "";
    sayCanned(_pick(["Playing " + it.title + by, "Here's " + it.title + by, "Putting on " + it.title]));
  } catch (e) { sayCanned("Something went wrong searching."); }
}

// Add the currently-playing song to a playlist (named, or the current one by default)
function voiceAddToPlaylist(name) {
  const d = DISCS[index];
  if (!d || !(d.yt || d.spotify || d.audio)) { showVoice("Nothing is playing"); hideVoice(); return; }
  const item = { title: d.title, artist: d.artist, yt: d.yt, spotify: d.spotify, art: d.art };
  let pid = currentPlaylistId;
  if (name) {
    const found = playlists.find((p) => p.name.toLowerCase() === name.toLowerCase());
    pid = found ? found.id : createPlaylistData(name);
  }
  addSongToPlaylist(pid, item, d.art);
  if (typeof syncHeart === "function") syncHeart();
  if (typeof refreshResultIcons === "function") refreshResultIcons();
  const pl = playlists.find((p) => p.id === pid);
  showVoice('Added "' + (d.title || "song") + '" to ' + (pl ? pl.name : "playlist"), "➕");
  hideVoice();
}

/* ---------- Client-side tool execution: create_playlist ----------
   The agent (server-side Claude) can emit a `create_playlist` tool call; the
   server relays it here as JSON. This is the HANDLER that safely runs it against
   the existing library functions (createPlaylistData / addSongToPlaylist). */

// Parse a track string into {title, artist}. Handles a bare title, "Song by
// Artist", and "Song - Artist" / en/em-dash variants.
function parseTrackString(s) {
  const raw = String(s == null ? "" : s).trim();
  if (!raw) return null;
  let m = raw.match(/^(.*\S)\s+by\s+(\S.*)$/i);        // "Title by Artist"
  if (!m) m = raw.match(/^(.*\S)\s*[-–—]\s*(\S.*)$/);   // "Title - Artist"
  if (m) return { title: m[1].trim(), artist: m[2].trim() };
  return { title: raw, artist: "" };
}

// Execute one create_playlist tool call. Returns a small result object used to
// phrase the spoken confirmation. Never throws for a single bad track.
async function runCreatePlaylist(input) {
  input = input || {};
  const rawTracks = Array.isArray(input.tracks) ? input.tracks : [];
  const parsed = rawTracks.map(parseTrackString).filter(Boolean).slice(0, 60);

  // Name: trust the model's (the tool schema requires it); fall back defensively
  // so we never create an untitled playlist even if the field arrives empty.
  let name = String(input.name == null ? "" : input.name).trim();
  if (!name) name = parsed.length ? (parsed[0].title + " Mix") : "New Playlist";
  name = name.slice(0, 60);

  const pid = createPlaylistData(name);   // existing fn: makes the playlist, returns its id, no reload

  // Resolve each requested song to a real library item (art + yt/spotify id) via
  // the same search the voice "play" command uses. Resolve in PARALLEL but keep
  // the model's order (index-keyed), so the playlist and autoplay honor it.
  const resolved = await Promise.all(parsed.map(async (t) => {
    try {
      const q = t.artist ? (t.title + " " + t.artist) : t.title;
      const hits = (currentSource === "spotify" && window.SP && window.SP.isConnected())
        ? await window.SP.search(q) : await localSearch(q);
      const it = hits && hits[0];
      if (!it) return null;
      const art = it.spotify ? it.art : await bestCover(it.title, it.artist, ytId(it.yt));
      return { title: it.title, artist: it.artist || "", yt: it.yt || "", spotify: it.spotify || "", art };
    } catch (e) { return null; }   // skip this track, keep going
  }));

  let added = 0, first = null;
  for (const r of resolved) {
    if (!r) continue;
    addSongToPlaylist(pid, { title: r.title, artist: r.artist, yt: r.yt, spotify: r.spotify }, r.art);
    if (!first) first = r;
    added++;
  }

  savePlaylists();
  if (typeof renderPlSheet === "function") { try { renderPlSheet(); } catch (e) {} }   // refresh drawer if open

  // "and play it" -> start the first resolved track inline (no page reload, so the
  // voice session and spoken confirmation survive). convoMode off: the task is done.
  const played = !!input.play && !!first;
  if (played) {
    convoMode = false;
    try { previewSong({ title: first.title, artist: first.artist, yt: first.yt, spotify: first.spotify, art: first.art }); } catch (e) {}
  }
  return { name, requested: parsed.length, added, playlistId: pid, played };
}

// Dispatch every tool call the server relayed. Add new tools to the switch here.
async function runToolCalls(calls) {
  const done = [];
  for (const c of (Array.isArray(calls) ? calls : [])) {
    if (!c || typeof c.name !== "string") continue;
    try {
      if (c.name === "create_playlist") done.push(await runCreatePlaylist(c.input));
      // else: unknown tool -> ignore (forward-compatible)
    } catch (e) { /* one tool failing shouldn't sink the reply */ }
  }
  return done;
}

// Canned spoken confirmations — same Piper voice as Sable, but fixed phrases with
// ZERO AI/LLM call, so playback talks back instantly and never rate-limits.
function _pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function sayCanned(text) { if (typeof speakSable === "function") speakSable(text); }

// Instantly silence Maya (cancel any TTS in flight).
function stopSableNow() {
  try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
  try { if (_sableAudio) { _sableAudio.pause(); _sableAudio.currentTime = 0; } } catch (e) {}
  window.__sableSpeaking = false; try { duckAudio(false); } catch (e) {}
}

/* ---------- Conversational interface: greetings, earcons, self-identity ----------
   Models the *edges of a spoken turn* the way Alexa / Google Assistant / the Humane
   pin do: a short "I'm listening" earcon when the mic opens, a soft "got it" tone
   when a turn is accepted, a gentle down-tone when it closes empty; a warm, time-
   aware greeting when voice is switched on, a one-time self-introduction ("I'm
   Maya…", the way Alexa says "I'm Alexa"), and a goodbye when it's switched off.
   Every spoken line reuses Maya's own TTS voice via sayCanned() — no AI/LLM call. */

// Time-of-day phrase, like Assistant's "Good morning".
function _timeGreeting() {
  const h = new Date().getHours();
  if (h < 5)  return "You're up late";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 22) return "Good evening";
  return "Still up";
}

// --- Earcons (synthesized, no assets). Short, quiet blips that bracket a turn so
//     you KNOW when Maya heard you — the up/down chimes Alexa & Google rely on. ---
let _earCtx = null;
function playEarcon(kind) {
  try {
    _earCtx = _earCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (_earCtx.state === "suspended") { try { _earCtx.resume(); } catch (e) {} }
    const t = _earCtx.currentTime;
    const notes =
      kind === "start"  ? [[784, 0], [1175, 0.07]] :   // rising two-tone: "listening"
      kind === "accept" ? [[988, 0]] :                 // single soft tone:  "got it"
      kind === "close"  ? [[588, 0], [392, 0.08]] :    // falling two-tone:  "done"
                          [[330, 0], [247, 0.09]];     // error
    notes.forEach(([f, dt]) => {
      const o = _earCtx.createOscillator(), g = _earCtx.createGain();
      o.type = "sine"; o.frequency.value = f;
      const t0 = t + dt;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
      o.connect(g).connect(_earCtx.destination);
      o.start(t0); o.stop(t0 + 0.18);
    });
  } catch (e) {}
}

// Warm spoken greeting when voice is switched on. First time ever she introduces
// herself; after that she keeps it to a short, time-aware line.
function mayaGreeting() {
  let met = false;
  try { met = localStorage.getItem("mayaMet") === "1"; } catch (e) {}
  const tod = _timeGreeting();
  if (!met) {
    try { localStorage.setItem("mayaMet", "1"); } catch (e) {}
    sayCanned(tod + ". I'm Maya, your music companion. Say “Hey Maya” anytime — to play something, skip a track, or just talk music.");
  } else {
    sayCanned(_pick([tod + ". I'm listening.", tod + ". Say “Hey Maya” whenever.",
                     "Hey — I'm here.", tod + ". What are we playing?"]));
  }
}

// Goodbye when voice is switched off.
function mayaGoodbye() {
  sayCanned(_pick(["Okay, I'll stop listening.", "Voice off — say it again to bring me back.",
                   "Got it, going quiet.", "I'm here when you need me."]));
}

window.mayaGreeting = mayaGreeting;
window.mayaGoodbye  = mayaGoodbye;
window.playEarcon   = playEarcon;

// Alexa/Sesame-style "small talk" — the wake word on its own, greetings, thanks and
// acknowledgements. These get an INSTANT canned reply in Maya's voice and NEVER wake
// the AI agent (and never drag in the current song). The agent activates only on a
// real question or request.
const SMALLTALK = {
  wake:    /^(hey\s+)?(maya|maia|mya|maja|mia)( there| you there)?$/,
  greet:   /^(hey|hi|hello|yo|hiya|heya|sup|wassup|what'?s up|good (morning|afternoon|evening)|you (there|up|awake)|are you (there|up|awake|listening))$/,
  identity:/^(who are you|who'?s this|what are you|what'?s your name|what is your name|tell me your name|introduce yourself|are you (an ai|a robot|a bot|alexa|siri|human))\??$/,
  help:    /^(help|what can you do|what can i (say|ask|do)|what do you do|how do you work|how do i use you|commands|options|what are my options)\??$/,
  thanks:  /^(thanks|thank you|thank you so much|thanks so much)( maya)?$|^(thx|ty|cheers|appreciate it|nice one)$/,
  dismiss: /^(stop( talking)?|be quiet|quiet|shush|shut up|that'?s all|that'?s it|nevermind|never mind|forget it|cancel|go away)$/,
  ack:     /^(ok(ay)?|k|cool|nice|great|awesome|sure|alright|got it|fine|yeah|yep|no|nope|mm+|uh huh)$/,
};

function handleVoiceCommand(raw) {
  const t = (raw || "").toLowerCase().trim().replace(/[.!?,]+$/, "").trim();
  if (!t) return;
  const cmd = () => convoHide(800);   // a playback command isn't a conversation -> tidy the chip

  // --- Small talk: canned voice only, no AI, no song commentary. --------------
  // "Who are you?" — self-identification, the way Alexa answers "I'm Alexa."
  if (SMALLTALK.identity.test(t)) {
    convoMode = true;
    sayCanned(_pick([
      "I'm Maya — your music companion. Ask me to play something, skip a track, or talk music.",
      "Maya. I run the music here. Say “play”, “skip”, “like”, or ask me about a track.",
    ]));
    return;
  }
  // "What can you do?" — discoverability, like Assistant's help prompt.
  if (SMALLTALK.help.test(t)) {
    convoMode = true;
    sayCanned("Try “play good news by Mac Miller”, “skip”, “go back”, “like this”, or ask me who made a track. Just say “Hey Maya” first.");
    return;
  }
  if (SMALLTALK.wake.test(t)) {
    convoMode = true;                         // reply, then reopen the mic for the real ask
    sayCanned(_pick(["Hey.", "Mm-hm?", "I'm here.", "Yeah?", "What's up?", "Go ahead."]));
    return;
  }
  if (SMALLTALK.greet.test(t)) {
    convoMode = true;
    // Mirror the caller's time-of-day when they open with "good morning" etc.
    sayCanned(_pick([_timeGreeting() + ".", _timeGreeting() + ". What's up?",
                     "Hey there.", "I'm here — go ahead."]));
    return;
  }
  if (SMALLTALK.thanks.test(t)) { convoMode = false; sayCanned(_pick(["Anytime.", "You got it.", "Of course.", "Sure thing."])); cmd(); return; }
  if (SMALLTALK.dismiss.test(t)) { stopSableNow(); convoMode = false; cmd(); return; }
  if (SMALLTALK.ack.test(t))     { convoMode = false; cmd(); return; }   // just tidy the chip, stay quiet

  // A question / opinion / anything addressed to Sable ALWAYS goes to her — never
  // a search. This must come before command matching so "do you like this song?"
  // or "who produced this?" reach Sable instead of hitting a playback command.
  const isQuestion =
    /\bsable\b/.test(t) ||
    /\?$/.test((raw || "").trim()) ||
    /^(who|whos|who's|whose|what|whats|what's|why|how|when|where|which|do|does|did|is|are|am|was|were|can|could|would|will|should|you|your|tell|explain|describe|think|thoughts|opinion|about)\b/.test(t);
  if (isQuestion) { sableSay(raw); return; }

  // Playlist creation always goes to the agent (which calls the create_playlist
  // tool) — even when the phrasing opens with a playback verb like "start …", so
  // "start a road-trip playlist" isn't mistaken for a "play" command below.
  if (/\b(playlist|mix|mixtape)\b/.test(t) && /\b(make|create|start|build|new|put together|set up)\b/.test(t)) {
    sableSay(raw); return;
  }

  // Playback commands (short imperatives — only when NOT a question). Each one
  // speaks a canned confirmation (no AI) so Maya talks back in her own voice.
  if (/^(pause|stop|be quiet|shut up)\b/.test(t)) { if (!paused) togglePlay(); sayCanned(_pick(["Paused.", "Okay, paused.", "Holding it there."])); cmd(); return; }
  if (/^(resume|continue|unpause|play)$/.test(t)) { if (paused) togglePlay(); sayCanned(_pick(["Playing.", "Back on.", "Here we go."])); cmd(); return; }
  if (/^(next|skip)\b/.test(t)) { next(); sayCanned(_pick(["Next up.", "Skipping ahead.", "Okay, next one."])); cmd(); return; }
  if (/^(previous|go back|last song)\b/.test(t)) { prev(); sayCanned(_pick(["Going back.", "Previous track.", "Back one."])); cmd(); return; }
  if (/^(like|favou?rite)\b/.test(t)) { voiceAddToPlaylist(null); sayCanned(_pick(["Added to your likes.", "Liked it.", "Saved."])); cmd(); return; }
  if (/^add\b/.test(t) && /(playlist|list|liked|to )/.test(t)) {
    let name = null;
    const m = t.match(/add (?:this|it|the song|current song)?\s*(?:to)?\s*(?:my |the )?(.+?)(?:\s*playlist)?$/);
    if (m && m[1]) {
      let cand = m[1].replace(/\b(this|it|song|current|to|my|the|playlist|list)\b/g, "").trim();
      if (cand) name = cand;
    }
    voiceAddToPlaylist(name); cmd();
    return;
  }
  // play a song  ("play good news by mac miller")
  const pm = t.match(/^(?:play|put on|start|search for|find)\s+(.+)$/);
  if (pm) { voicePlay(pm[1]); cmd(); return; }
  // Anything else = talking to Sable (statements, arguments) — room or solo.
  sableSay(raw);
}

// Talk to Sable — routes to the room (everyone hears her) or a solo 1-on-1.
// Either way it starts "conversation mode": after she replies the mic reopens,
// so it's a natural back-and-forth instead of click-per-turn.
function sableSay(text) {
  return roomActive() ? talkToSable(text) : soloTalkToSable(text);
}
function talkToSable(text) {
  const t = (text || "").trim();
  if (!t) return;
  convoMode = true;
  try { if (window.ROOM && window.ROOM.sendChat) window.ROOM.sendChat(t); } catch (e) {}
}
// Solo conversation: no room, so we call the persona directly and speak the reply.
function soloSessionId() {
  let id = localStorage.getItem("sableSoloId");
  if (!id || !/^[a-z0-9-]{3,32}$/.test(id)) {
    id = "solo-" + Math.random().toString(16).slice(2, 10);
    localStorage.setItem("sableSoloId", id);
  }
  return id;
}
function currentTrackInfo() {
  const d = DISCS[index];
  if (!d) return null;
  return { title: d.title, artist: d.artist, yt: d.yt, audio: d.audio, spotify: d.spotify };
}
// Only hand the current song to the AI when the user's message is actually about it,
// so Maya never volunteers song credits/genre in general chat (she only "knows" the
// track when asked about it).
function _songRelated(t) {
  return /\b(song|track|tune|this|that|it|artist|singer|band|rapper|who\s|genre|produc|album|lyric|beat|vocal|remix|cover|playing|voice|sound like|by whom)\b/i.test(t);
}
function soloTalkToSable(text) {
  const t = (text || "").trim();
  if (!t) return;
  convoMode = true;
  convoSableThinking();
  fetch("/api/persona", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ room: soloSessionId(), kind: "chat", from: "You", text: t,
      track: _songRelated(t) ? currentTrackInfo() : null, playing: !paused, solo: true }),
  }).then((r) => r.json()).then(async (d) => {
    if (d && d.ok && Array.isArray(d.tool_calls) && d.tool_calls.length) {
      const res = await runToolCalls(d.tool_calls);       // create the playlist(s) locally
      const made = res && res[0];
      // Prefer the model's own spoken line; otherwise synthesize a confirmation.
      const line = (d.text && d.text.trim()) || (made
        ? ('Made your "' + made.name + '" playlist'
           + (made.added ? (" with " + made.added + " song" + (made.added > 1 ? "s" : "")) : "")
           + (made.played ? ", playing it now." : "."))
        : "Done.");
      speakSable(line);
      return;
    }
    if (d && d.ok && d.text) speakSable(d.text);          // chip teal + voice + reopen mic
    else convoSableNote(d && d.note ? d.note : "Sable couldn't respond.");
  }).catch(() => convoSableNote("Couldn't reach Sable."));
}

const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = null, listening = false;
let _noInputTries = 0;      // reprompt-once counter when a reply is expected but none comes
// Sesame-style endpointing: keep the recognizer OPEN and only finish a turn after a
// real pause, so you can breathe / think mid-sentence without being cut off. A short
// grace after speech (SILENCE_MS) ends the turn; if you never speak, it closes quietly
// after NOSPEECH_MS without waking the AI.
const SILENCE_MS = 1050;    // snappier turn-taking (Sesame-style) — she jumps in sooner
const NOSPEECH_MS = 6500;   // you said nothing at all -> close the mic silently
function stopListening() { try { recog && recog.stop(); } catch (e) {} }
function startListening() {
  if (!SpeechRec) { showVoice("Voice needs Chrome (Web Speech API not available)"); hideVoice(2600); return; }
  if (listening) { stopListening(); return; }
  recog = new SpeechRec();
  recog.lang = "en-US";
  recog.interimResults = true;
  recog.continuous = true;                   // stay open across pauses (we end it ourselves)
  recog.maxAlternatives = 1;
  recog.__final = ""; recog.__spoke = false;
  let silenceT = null, noSpeechT = null, ended = false;
  const clearTimers = () => { clearTimeout(silenceT); clearTimeout(noSpeechT); silenceT = noSpeechT = null; };
  const finish = () => { if (ended) return; ended = true; clearTimers(); try { recog.stop(); } catch (e) {} };
  const armSilence = () => { clearTimeout(silenceT); silenceT = setTimeout(finish, SILENCE_MS); };

  recog.onstart = () => {
    listening = true;
    micBtn && micBtn.classList.add("is-listening");
    micBtn && micBtn.setAttribute("aria-pressed", "true");
    duckAudio(true);                         // mic just turns teal (static) — no ripple animation
    playEarcon("start");                     // audible "I'm listening" cue (Alexa/Google style)
    youPillStream(); riveListen(true);       // show the blob + morph pill (words appear as you speak)
    convoClearSable();
    noSpeechT = setTimeout(finish, NOSPEECH_MS);   // nothing said at all -> close quietly
  };
  recog.onresult = (e) => {
    let txt = "";
    for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
    txt = txt.trim();
    if (txt) {
      recog.__spoke = true;
      recog.__final = txt;                   // keep the latest full transcript (interim or final)
      youPillWords(txt);                     // live transcript morphs in, word by word
      clearTimeout(noSpeechT);
      armSilence();                          // reset the pause timer on every new word
    }
  };
  recog.onerror = (e) => {
    if (e && e.error === "not-allowed") { showVoice("Microphone permission denied"); hideVoice(2200); }
    else if (e && e.error === "no-speech") { /* handled by onend as silence */ }
    else { showVoice("Didn't catch that"); hideVoice(2200); }
  };
  recog.onend = () => {
    listening = false; clearTimers();
    micBtn && micBtn.classList.remove("is-listening");
    micBtn && micBtn.setAttribute("aria-pressed", "false");
    duckAudio(false);                        // restore volume
    riveListen(false);
    if (voiceToast) voiceToast.classList.remove("listening");
    const said = (recog.__final || "").trim();
    if (said) {
      _noInputTries = 0;
      playEarcon("accept");                  // soft "got it" tone on a captured turn
      statusPillHide(1400); handleVoiceCommand(said);
    } else if (convoMode && _noInputTries < 1) {
      // A reply was expected but none came — reprompt ONCE, like Alexa/Assistant do,
      // instead of dying silently. She speaks, then _maybeContinueConvo reopens the mic.
      _noInputTries++;
      sayCanned(_pick(["Still there?", "I'm listening.", "Go ahead — I'm here."]));
    } else {                                 // truly silent -> end the back-and-forth
      _noInputTries = 0;
      convoMode = false; playEarcon("close"); statusPillHide(900); convoHide(300);
    }
  };
  try { recog.start(); } catch (e) { /* already started */ }
}
micBtn && micBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  _unlockSableAudio();     // this click is a user gesture -> unlock Sable's voice for later
  startListening();
});

/* ---------- Playlist selector (top-center) ---------- */
const plPicker = document.getElementById("plPicker");
const plToggle = document.getElementById("plToggle");
const plName = document.getElementById("plName");

if (plName) plName.textContent = currentPlaylist().name;

function deletePlaylist(id) {
  if (playlists.length <= 1) return;                 // keep at least one
  playlists = playlists.filter((p) => p.id !== id);
  try { localStorage.setItem(PLAYLISTS_LS, JSON.stringify(playlists)); } catch (e) {}
  sessionStorage.setItem("musicPlSheetOpen", "1");   // reopen the drawer after the rebuild
  if (id === currentPlaylistId) {
    currentPlaylistId = playlists[0].id;
    localStorage.setItem(CURRENT_LS, currentPlaylistId);
  }
  location.reload();
}
/* ---------- Playlist drawer: the songs in the current playlist ---------- */
const plSheet = document.getElementById("plSheet");
const plSheetOverlay = document.getElementById("plSheetOverlay");
const plSheetClose = document.getElementById("plSheetClose");
const plSheetDelete = document.getElementById("plSheetDelete");
const plSheetTitle = document.getElementById("plSheetTitle");
const plTabs = document.getElementById("plTabs");
const plSongs = document.getElementById("plSongs");
const PL_OPEN_LS = "musicPlSheetOpen";
const TRASH_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg>`;
const WAVE_HTML = `<span class="loading-wave" aria-hidden="true"><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div></span>`;

// Remove a song from the open playlist Spotify-style — live, without a page reload,
// so playback is never interrupted:
//   • delete a song BEFORE the current one -> same track keeps playing, pointer shifts
//   • delete the CURRENTLY playing song    -> the next song slides in and plays on
//   • delete a LATER song                  -> current track is untouched
//   • delete the last remaining song       -> playback stops, empty state
function removeSongFromPlaylist(i) {
  if (i < 0 || i >= DISCS.length) return;
  const wasCurrent = (i === index);
  const wasPlaying = wasCurrent && !paused;

  // Splice the cassette out of every parallel array + the DOM.
  DISCS.splice(i, 1);
  angle.splice(i, 1);
  vel.splice(i, 1);
  spinEls.splice(i, 1);
  const el = discs.splice(i, 1)[0];
  if (el && el.parentNode) el.parentNode.removeChild(el);
  if (dots[i]) { const dot = dots.splice(i, 1)[0]; if (dot && dot.parentNode) dot.parentNode.removeChild(dot); }

  savePlaylists();

  if (DISCS.length === 0) {
    index = 0; wantPlay = false;
    render(); syncSong();                       // empty playlist -> stop + clear
  } else if (i < index) {
    index -= 1; render();                        // current track unchanged, just reposition
  } else if (wasCurrent) {
    index = Math.min(i, DISCS.length - 1);       // next song slides into place
    wantPlay = wasPlaying;                        // keep playing only if we were
    smokeDir = -1;
    render(); syncSong();                         // load + (maybe) play the new current song
  } else {
    render();                                     // deleted a later song
  }

  if (typeof renderPlSongs === "function") renderPlSongs();   // refresh the drawer list
  if (typeof syncHeart === "function") syncHeart();
}

function renderPlTabs() {
  if (!plTabs) return;
  plTabs.innerHTML = "";
  playlists.forEach((pl) => {
    const tab = document.createElement("button");
    tab.className = "pl-tab" + (pl.id === currentPlaylistId ? " is-active" : "");
    tab.textContent = pl.name;
    tab.addEventListener("click", () => {
      if (pl.id === currentPlaylistId) return;
      sessionStorage.setItem(PL_OPEN_LS, "1");
      switchPlaylist(pl.id);                 // saves + reloads with the new playlist
    });
    plTabs.appendChild(tab);
  });
  const newTab = document.createElement("button");
  newTab.className = "pl-tab pl-tab--new";
  newTab.textContent = "＋ New";
  newTab.addEventListener("click", () => {
    const input = document.createElement("input");
    input.className = "pl-newinput";
    input.placeholder = "Playlist name…";
    input.maxLength = 40;
    newTab.replaceWith(input);
    input.focus();
    const commit = () => {
      const n = input.value.trim();
      if (n) { sessionStorage.setItem(PL_OPEN_LS, "1"); createPlaylist(n); }  // creates + reloads
      else renderPlTabs();
    };
    input.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter") commit();
      else if (e.key === "Escape") renderPlTabs();
    });
    input.addEventListener("blur", () => { if (input.value.trim()) commit(); else renderPlTabs(); });
  });
  plTabs.appendChild(newTab);
}

function renderPlSongs() {
  if (!plSongs) return;
  plSongs.innerHTML = "";
  const songs = [];
  DISCS.forEach((d, i) => { if (d.persist && (d.yt || d.audio || d.spotify)) songs.push({ d, i }); });
  if (!songs.length) {
    plSongs.innerHTML = `<div class="sheet__state">No songs in this playlist yet.<br>Use the + button (top-right) to add songs.</div>`;
    return;
  }
  songs.forEach(({ d, i }) => {
    const row = document.createElement("div");
    row.className = "result";
    row.dataset.yt = d.yt || "";
    row.dataset.spotify = d.spotify || "";
    row.dataset.key = trackId(d);
    row.innerHTML = `
      <img class="result__thumb" src="${d.art || ""}" alt="" loading="lazy" />
      <div class="result__meta">
        <div class="result__title">${escapeHTML(d.title || "Untitled")}</div>
        <div class="result__artist">${escapeHTML(d.artist || "")}</div>
      </div>
      <div class="result__actions">
        <button class="result__btn result__play" aria-label="Play" title="Play">
          <svg class="result__playic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>
          ${WAVE_HTML}
        </button>
        <button class="result__btn result__remove" aria-label="Remove from playlist" title="Remove from playlist">${TRASH_SVG}</button>
      </div>`;
    const play = () => {
      wantPlay = true;
      if (clamp(i) !== index) goTo(i);
      else if (paused) togglePlay();
      refreshPlayingWave();
    };
    row.querySelector(".result__play").addEventListener("click", (e) => { e.stopPropagation(); play(); });
    row.querySelector(".result__remove").addEventListener("click", (e) => { e.stopPropagation(); removeSongFromPlaylist(i); });
    row.addEventListener("click", play);
    plSongs.appendChild(row);
  });
  refreshPlayingWave();
}

function renderPlSheet() {
  if (plSheetTitle) plSheetTitle.textContent = currentPlaylist().name;
  if (plSheetDelete) plSheetDelete.hidden = playlists.length <= 1;   // keep at least one playlist
  renderPlTabs();
  renderPlSongs();
}

function openPlSheet(open) {
  if (!plSheet) return;
  if (open) {
    if (typeof openFxMenu === "function") openFxMenu(false);
    if (typeof closeSheet === "function") closeSheet();
    plSheetOverlay.hidden = false;
    renderPlSheet();
    requestAnimationFrame(() => { plSheetOverlay.classList.add("is-open"); plSheet.classList.add("is-open"); });
    plSheet.setAttribute("aria-hidden", "false");
    plPicker?.classList.add("is-open");
    plToggle?.setAttribute("aria-expanded", "true");
    sessionStorage.setItem(PL_OPEN_LS, "1");
  } else {
    plSheetOverlay.classList.remove("is-open");
    plSheet.classList.remove("is-open");
    plSheet.setAttribute("aria-hidden", "true");
    plPicker?.classList.remove("is-open");
    plToggle?.setAttribute("aria-expanded", "false");
    setTimeout(() => { plSheetOverlay.hidden = true; }, 340);
    sessionStorage.removeItem(PL_OPEN_LS);
  }
}
plToggle?.addEventListener("click", (e) => { e.stopPropagation(); openPlSheet(!plSheet.classList.contains("is-open")); });
plSheetClose?.addEventListener("click", () => openPlSheet(false));
plSheetDelete?.addEventListener("click", () => {
  const pl = currentPlaylist();
  if (playlists.length > 1 && confirm(`Delete the playlist “${pl.name}” and all its songs?`)) deletePlaylist(pl.id);
});
plSheetOverlay?.addEventListener("click", () => openPlSheet(false));
window.addEventListener("keydown", (e) => { if (e.key === "Escape" && plSheet?.classList.contains("is-open")) openPlSheet(false); });
// Reopen the drawer after a switch/create/remove reload
if (sessionStorage.getItem(PL_OPEN_LS) === "1") requestAnimationFrame(() => openPlSheet(true));

/* ---------- "Add to playlist" chooser (Spotify-style) ---------- */
const plAddOverlay = document.getElementById("plAddOverlay");
const plAdd = document.getElementById("plAdd");
const plAddClose = document.getElementById("plAddClose");
const plAddList = document.getElementById("plAddList");
const plAddNewInput = document.getElementById("plAddNewInput");
const plAddNewBtn = document.getElementById("plAddNewBtn");
let pendingAddSong = null;

function songInPlaylist(pl, key) {
  if (!key) return false;
  if (pl.id === currentPlaylistId) return DISCS.some((d) => d.persist && trackId(d) === key);
  return (pl.discs || []).some((d) => trackId(d) === key);
}
function renderAddToList() {
  if (!plAddList) return;
  plAddList.innerHTML = "";
  playlists.forEach((pl) => {
    const count = pl.id === currentPlaylistId ? DISCS.filter((d) => d.persist).length : (pl.discs ? pl.discs.length : 0);
    const inIt = pendingAddSong && songInPlaylist(pl, trackId(pendingAddSong));
    const btn = document.createElement("button");
    btn.className = "pladd__item" + (inIt ? " is-in" : "");
    btn.innerHTML = `<span class="pladd__name">${escapeHTML(pl.name)}</span><span class="pladd__meta">${inIt ? "Added ✓" : count + " song" + (count === 1 ? "" : "s")}</span>`;
    btn.addEventListener("click", () => chooseAddPlaylist(pl.id, btn));
    plAddList.appendChild(btn);
  });
}
function openAddToPlaylist(item) {
  // Adding to a playlist is a signed-in-only feature. If a logged-out visitor
  // somehow triggers it, send them to Google sign-in instead of opening the sheet.
  if (!(window.LOGIN && window.LOGIN.isSignedIn && window.LOGIN.isSignedIn())) {
    if (window.openLogin) window.openLogin();
    return;
  }
  pendingAddSong = item;
  if (plAddNewInput) plAddNewInput.value = "";
  renderAddToList();
  plAddOverlay.hidden = false; plAdd.hidden = false;
  requestAnimationFrame(() => { plAddOverlay.classList.add("is-open"); plAdd.classList.add("is-open"); });
}
function closeAddToPlaylist() {
  plAddOverlay.classList.remove("is-open"); plAdd.classList.remove("is-open");
  setTimeout(() => { plAddOverlay.hidden = true; plAdd.hidden = true; }, 240);
}
async function chooseAddPlaylist(pid, btn) {
  if (!pendingAddSong) return;
  const item = pendingAddSong;
  if (btn) { const m = btn.querySelector(".pladd__meta"); if (m) m.textContent = "Adding…"; }
  // Spotify items already have real album art; only YouTube needs an iTunes lookup.
  const art = item.spotify ? (item.art || "") : await bestCover(item.title, item.artist, ytId(item.yt));
  addSongToPlaylist(pid, item, art);
  if (typeof syncHeart === "function") syncHeart();       // reflect on the card heart
  if (typeof refreshResultIcons === "function") refreshResultIcons();  // + -> heart in results
  renderAddToList();
  setTimeout(closeAddToPlaylist, 450);
}
plAddClose?.addEventListener("click", closeAddToPlaylist);
plAddOverlay?.addEventListener("click", closeAddToPlaylist);
window.addEventListener("keydown", (e) => { if (e.key === "Escape" && plAdd && !plAdd.hidden) closeAddToPlaylist(); });
function createAndAddSong() {
  const name = plAddNewInput.value.trim();
  if (!name) { plAddNewInput.focus(); return; }   // no name typed -> don't create anything
  const id = createPlaylistData(name);            // playlist is created only now, with the song
  chooseAddPlaylist(id);
}
plAddNewBtn?.addEventListener("click", createAndAddSong);
plAddNewInput?.addEventListener("keydown", (e) => {
  e.stopPropagation();
  if (e.key === "Enter") createAndAddSong();
});

/* ---------- Favicon = mini cassette: static frame, disc spins while playing ---------- */
(function () {
  const S = 64;
  const cvs = document.createElement("canvas");
  cvs.width = cvs.height = S;
  const ctx = cvs.getContext("2d");

  // Disc geometry inside the case (Figma: 84.83% disc @ 8.33%,6.83%)
  const discSize = 0.8483 * S;
  const cx = (0.0833 + 0.8483 / 2) * S;
  const cy = (0.0683 + 0.8483 / 2) * S;
  const r = discSize / 2;
  const holeR = 0.085 * discSize;

  const caseImg = new Image(); caseImg.crossOrigin = "anonymous"; caseImg.src = "assets_case.png";
  let caseReady = false; caseImg.onload = () => (caseReady = true);

  let artImg = null, artReady = false, artSrc = "";
  function ensureArt() {
    const src = DISCS[index] && DISCS[index].art;
    if (!src || src === artSrc) return;
    artSrc = src; artReady = false;
    const im = new Image(); im.crossOrigin = "anonymous";
    im.onload = () => { artImg = im; artReady = true; };
    im.onerror = () => { artReady = false; };
    im.src = src;
  }

  function setFaviconHref(url) {
    let l = document.querySelector('link[rel="icon"]');
    if (!l) { l = document.createElement("link"); l.rel = "icon"; document.head.appendChild(l); }
    l.href = url;
  }

  function draw(angle) {
    if (!caseReady) return;
    ctx.clearRect(0, 0, S, S);
    ctx.drawImage(caseImg, 0, 0, S, S);          // static jewel-case frame
    if (artReady) {
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
      ctx.translate(cx, cy); ctx.rotate(angle);   // the disc spins
      ctx.drawImage(artImg, -discSize / 2, -discSize / 2, discSize, discSize);
      ctx.restore();
      ctx.beginPath(); ctx.arc(cx, cy, holeR, 0, Math.PI * 2);
      ctx.fillStyle = "#07090d"; ctx.fill();       // spindle hole
    }
    try { setFaviconHref(cvs.toDataURL("image/png")); } catch (e) {}
  }

  const SPIN = 1.5;                          // rad/s (steady spin speed)
  let angle = 0, started = false, held = false, last = performance.now();
  setInterval(() => {
    if (!caseReady) return;
    ensureArt();
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.1);   // time-based -> constant speed
    last = now;
    if (!paused) { angle += SPIN * dt; draw(angle); started = true; held = false; }
    else if (started && !held) { draw(angle); held = true; }       // one frame on pause
  }, 33);                                    // ~30 fps for smooth motion
})();

/* ============================================================
   Phase 3 — Room sync bridge (listening together).
   Broadcasts the local transport state (current track + position +
   play/pause) over the LiveKit data channel (window.ROOM.sendData),
   and applies remote transport so every client mirrors the same song
   at the same spot. Music itself stays local per client — only STATE
   crosses the wire.

   Design:
   - Any explicit user action (change track / play-pause / seek) sends a
     full snapshot, so a single received message fully re-syncs a client.
   - One deterministic "syncer" (lowest participant id, excluding the AI
     bot) heartbeats every 4s and greets new joiners, correcting drift and
     snapping late arrivals to the current spot — without an N-way feedback
     storm (only the syncer heartbeats; anyone can still take an action).
   - `applyingRemote` guards against echoing a change we're applying.
   ============================================================ */
var applyingRemote = false;      // true while applying a remote change (var: no TDZ)
var lastSpotifyPosMs = 0;        // last Spotify position reported (see spotifyOnState)

// Group listening rooms are PAUSED — the app runs as a solo mic voice-assistant only.
// Flip this to false to bring group chat back (all the room code is intact below).
const GROUP_CHAT_PAUSED = true;
function roomActive() {
  if (GROUP_CHAT_PAUSED) return false;
  return !!(window.ROOM && window.ROOM.isConnected && window.ROOM.isConnected());
}
function amSyncer() {
  if (!roomActive()) return false;
  try {
    const me = window.ROOM.getSelf && window.ROOM.getSelf().id;
    const ids = (window.ROOM.getParticipants ? window.ROOM.getParticipants() : [])
      .filter((p) => !p.bot).map((p) => p.id).filter(Boolean).sort();
    return !!me && ids.length > 0 && ids[0] === me;
  } catch (e) { return false; }
}

function curPosMs() {
  const eng = engineFor(DISCS[index]);
  if (eng === "audio") return (audioEl.currentTime || 0) * 1000;
  if (eng === "yt" && ytReady && yt && yt.getCurrentTime) {
    try { return (yt.getCurrentTime() || 0) * 1000; } catch (e) {}
  }
  return lastSpotifyPosMs;   // spotify
}

function roomSnapshot() {
  const d = DISCS[index];
  if (!d || (!trackId(d) && !d.title)) return null;
  return {
    t: "tp",
    track: { title: d.title, artist: d.artist, yt: d.yt, audio: d.audio, spotify: d.spotify, art: d.art },
    posMs: Math.round(curPosMs()),
    playing: !paused,
    at: Date.now(),
  };
}
function roomBroadcast() {
  if (applyingRemote || !roomActive()) return;
  const s = roomSnapshot();
  if (s) { try { window.ROOM.sendData(s); } catch (e) {} }
}
let _bSoon = null;
function roomBroadcastSoon() { clearTimeout(_bSoon); _bSoon = setTimeout(roomBroadcast, 150); }

// ---- applying a remote transport snapshot ----
let pendingSeekSec = null;
function seekAbsolute(t) { pendingSeekSec = Math.max(0, t); tryPendingSeek(); }
function tryPendingSeek() {
  if (pendingSeekSec == null) return;
  const eng = engineFor(DISCS[index]);
  if (eng === "audio") {
    if (audioEl.readyState >= 1) {
      const dur = audioEl.duration || 0;
      try { audioEl.currentTime = dur ? Math.min(pendingSeekSec, dur - 0.25) : pendingSeekSec; } catch (e) {}
      pendingSeekSec = null;
    }
  } else if (eng === "yt" && ytReady && yt && yt.seekTo) {
    try { yt.seekTo(pendingSeekSec, true); } catch (e) {}
    pendingSeekSec = null;
  } else {
    pendingSeekSec = null;   // spotify / none: best-effort, skip
  }
}
function startLocal() {
  const d = DISCS[index], eng = engineFor(d);
  wantPlay = true;
  if (eng === "audio") { if (!audioEl.src) { audioEl.src = audioSrcFor(d); audioEl.load(); } audioEl.play().catch(() => {}); }
  else if (eng === "yt") { if (ytReady && yt) try { yt.playVideo(); } catch (e) {} }
  else if (eng === "spotify") { if (window.SP) window.SP.toggle(d.spotify); }
}
function pauseLocal() {
  const eng = engineFor(DISCS[index]);
  if (eng === "audio") { try { audioEl.pause(); } catch (e) {} }
  else if (eng === "yt") { try { if (ytReady && yt) yt.pauseVideo(); } catch (e) {} }
  else if (eng === "spotify") { try { if (window.SP) window.SP.pause(); } catch (e) {} }
}
function applyRemoteTransport(msg) {
  if (!msg || msg.t !== "tp" || !msg.track) return;
  applyingRemote = true;
  try {
    wantPlay = !!msg.playing;
    const key = trackId(msg.track);
    let i = key ? findDiscByKey(key) : -1;
    if (i < 0 && key) i = addDisc(msg.track, false, false);   // pull in a track we don't have (hidden)
    let changed = false;
    if (i >= 0 && i !== index) {
      goTo(i); changed = true;                                // change track; syncSong honors wantPlay
    } else {
      const isPlaying = !paused;                              // same track: reconcile play/pause
      if (msg.playing && !isPlaying) startLocal();
      else if (!msg.playing && isPlaying) pauseLocal();
    }
    const posSec = (msg.posMs + (msg.playing ? (Date.now() - msg.at) : 0)) / 1000;
    // Seek on a track change or an explicit jump; on routine heartbeats only
    // correct real drift, so in-sync clients don't stutter every few seconds.
    if (changed || Math.abs(curPosMs() / 1000 - posSec) > 0.75) seekAbsolute(posSec);
  } finally {
    applyingRemote = false;
  }
}

// Apply pending seeks once the media is ready enough to accept them.
if (audioEl) {
  audioEl.addEventListener("loadedmetadata", tryPendingSeek);
  audioEl.addEventListener("canplay", tryPendingSeek);
}

// ---- Phase 4: trigger the AI persona (server-side) ----
// Only the syncer triggers, so Sable reacts exactly once per event (not once
// per client). The server grounds + runs the persona and injects her reply
// into the room over the data channel, which every client then renders.
let _lastReactKey = "";
function postPersona(body) {
  try {
    fetch("/api/persona", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => {});
  } catch (e) {}
}
function maybeReactToTrack() {
  // Intentionally silent. The user does NOT want Maya volunteering genre/credits or
  // any commentary when a track starts — playing a song only says the canned
  // "Playing X" confirmation (see voicePlay). Maya talks about a song ONLY when
  // explicitly asked a question (handleVoiceCommand -> sableSay). Left as a no-op so
  // the goTo() hook and any callers stay valid.
  return;
}

// ---- data channel + membership hooks (room.js is the producer) ----
window.roomOnData = function (msg, fromId, fromName) {
  if (!msg) return;
  if (msg.t === "tp") { applyRemoteTransport(msg); return; }
  if (msg.t === "chat") {
    if (msg.system) return;                 // a status notice -> shown as text, never spoken
    if (msg.bot || msg.from === "Sable") {
      speakSable(msg.text);                 // Sable spoke -> everyone in the room hears her
      return;
    }
    // a human spoke -> the syncer asks Sable to weigh in (with the current track)
    if (roomActive() && amSyncer()) {
      postPersona({ room: window.ROOM.getCode(), kind: "chat",
        from: msg.from || fromName || "someone", text: msg.text || "",
        track: currentTrackInfo(), playing: !paused });
    }
  }
};

// ---- Sable's voice (free browser speech) + conversation loop ----
var convoMode = false;                       // true = keep the mic looping after she replies
let _sableVoice = null;
function _pickVoice() {
  try {
    const vs = (window.speechSynthesis && window.speechSynthesis.getVoices()) || [];
    if (!vs.length) return null;
    return vs.find((v) => /en[-_]US/i.test(v.lang) && /(Samantha|Ava|Allison|Joanna|Zoe|female)/i.test(v.name))
      || vs.find((v) => /en[-_]US/i.test(v.lang))
      || vs.find((v) => /^en/i.test(v.lang)) || vs[0];
  } catch (e) { return null; }
}
if ("speechSynthesis" in window) {
  _sableVoice = _pickVoice();
  window.speechSynthesis.onvoiceschanged = () => { _sableVoice = _pickVoice(); };
}
let _sableAudio = null;
let _sableUnlocked = false;
function _unlockSableAudio() {
  if (_sableUnlocked) return;
  try {
    if (!_sableAudio) _sableAudio = new Audio();
    // a tiny silent clip; playing it during a user gesture unlocks the element
    _sableAudio.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAiBUAABAxAAACABAAZGF0YQAAAAA=";
    const p = _sableAudio.play();
    if (p && p.then) p.then(() => { _sableUnlocked = true; }).catch(() => {});
  } catch (e) {}
}
function speakSable(text) {
  if (!text) return;
  // Prefer the natural neural voice (server-side Piper); fall back to the
  // browser voice if the server has no TTS or the audio can't play.
  try {
    window.speechSynthesis && window.speechSynthesis.cancel();
    if (!_sableAudio) _sableAudio = new Audio();
    let fell = false;
    const fallback = () => { if (!fell) { fell = true; duckAudio(false); browserSpeak(text); } };
    sablePillStream(text);                                // teal pill; words ready to stream
    _pacedReveal(_streamWords.length);                    // show words even if audio never plays
    _sableAudio.onplay = () => { window.__sableSpeaking = true; duckAudio(true); streamFollowAudio(_sableAudio); };   // sync to voice if it plays
    _sableAudio.onended = () => { window.__sableSpeaking = false; duckAudio(false); streamRevealTo(_streamWords.length); _maybeContinueConvo(); };
    _sableAudio.onerror = () => { window.__sableSpeaking = false; fallback(); };
    _sableAudio.src = "/api/tts?text=" + encodeURIComponent(text.slice(0, 1200));
    _sableAudio.play().catch(fallback);
  } catch (e) { browserSpeak(text); }
}
function browserSpeak(text) {
  if (!("speechSynthesis" in window) || !text) return;
  try {
    window.speechSynthesis.cancel();
    sablePillStream(text);
    _pacedReveal(_streamWords.length);                    // show words even if speech events don't fire
    const u = new SpeechSynthesisUtterance(text);
    if (!_sableVoice) _sableVoice = _pickVoice();
    if (_sableVoice) u.voice = _sableVoice;
    u.rate = 1.03; u.pitch = 1.0;
    u.onstart = () => { window.__sableSpeaking = true; duckAudio(true); };
    u.onboundary = (e) => {                               // reveal words as the voice speaks them
      const idx = (typeof e.charIndex === "number") ? e.charIndex : 0;
      streamRevealTo(text.slice(0, idx).trim().split(/\s+/).filter(Boolean).length + 1);
    };
    u.onend = () => { window.__sableSpeaking = false; duckAudio(false); streamRevealTo(_streamWords.length); _maybeContinueConvo(); };
    u.onerror = () => { window.__sableSpeaking = false; duckAudio(false); };
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

// ---- One bottom-center voice pill (Figma 80:226 = you, 78:212 = Sable) ----
// YOU talking -> white text + mic icon + blob.  SABLE talking -> teal #256060 + blob.
function _pillShow(text, sable) {
  if (!voiceToast) return;
  clearTimeout(voiceHideTimer);                 // new content cancels any pending fade-out
  streamStop();                                 // stop any in-flight word stream
  voiceToast.classList.toggle("sable", !!sable);
  voiceToast.classList.remove("listening");
  if (voiceText) voiceText.textContent = text || "";
  voiceToast.hidden = false;
  requestAnimationFrame(() => voiceToast.classList.add("is-show"));
  try { initRive(); } catch (e) {}              // load the blob (has-blob) if not yet
  try { if (riveInst) riveListen(true); } catch (e) {}
}
function statusPill(text) { _pillShow(text, false); }   // you speaking
function sablePill(text) { _pillShow(text, true); }      // Sable speaking (teal, plain)

// ---- Streaming caption: gooey "morphing text" (Zach Saucier CodePen), voice-paced ----
// Exactly the reference effect: two overlapping word layers live inside a container
// with `filter: url(#vtThreshold) blur(...)`. A single continuous rAF loop holds the
// current word sharp, then over `morphTime` cross-blurs it out while the next word
// blurs in (blur(8/f-8), opacity=pow(f,0.4)); the alpha-threshold fuses the overlap
// into liquid blobs. Unlike the reference's infinite fixed timer, we advance to word
// k+1 only once the voice has spoken it (`_targetN`) — and shrink per-word time when
// words are queued — so it streams in lockstep with Sable and stays smooth.
// EXACT CodePen "Morphing Text", but each morphing unit is AS MANY WORDS AS FIT the chip
// (responsive): words are packed greedily so each group fills the pill, then the group
// gooey-morphs into the NEXT group (blur 8/f-8, opacity pow(f,0.4) through the threshold).
// Rendered at 64px (thick strokes so the goo survives) → scaled to 16px.
let _streamWords = [], _units = [], _targetN = 0;
let _morphRAF = null, _audioRAF = null;
let _mLayers = null;
let _mCur = -1;                 // index of the word-group currently settled on screen
let _mMorphing = false, _mFrac = 0, _mHold = 0, _mLast = 0;
const MORPH_TIME = 0.7, HOLD_TIME = 0.18;
const UNIT_MAXW = 580;          // logical px that fit the 612-wide morph box (with a little padding)

// Measure text at the render font so we can pack words to fill the chip.
let _measureCtx = null;
function _measure(text) {
  if (!_measureCtx) _measureCtx = document.createElement("canvas").getContext("2d");
  _measureCtx.font = '700 64px "Inter", system-ui, sans-serif';
  return _measureCtx.measureText(text).width;
}
// Greedily group words so each group is as wide as fits the chip.
function _mkUnits(words) {
  const units = [];
  let cur = [];
  for (const w of words) {
    if (cur.length && _measure(cur.concat(w).join(" ")) > UNIT_MAXW) { units.push(cur.join(" ")); cur = [w]; }
    else cur.push(w);
  }
  if (cur.length) units.push(cur.join(" "));
  return units;
}
function streamStop() {
  if (_morphRAF) { cancelAnimationFrame(_morphRAF); _morphRAF = null; }
  if (_audioRAF) { cancelAnimationFrame(_audioRAF); _audioRAF = null; }
}
function _pillStreamStart(sable) {
  _pillShow("", sable);                          // pill visible, empty
  _streamWords = []; _units = []; _targetN = 0; _mCur = -1; _mMorphing = false; _mFrac = 0; _mHold = 0;
  if (voiceText) {
    voiceText.innerHTML = '<span class="vt-morph"><span class="m1"></span><span class="m2"></span></span>';
    _mLayers = { m1: voiceText.querySelector(".m1"), m2: voiceText.querySelector(".m2") };
    _mLayers.m1.textContent = ""; _mLayers.m2.textContent = "";
    _mLayers.m1.style.cssText = "opacity:0"; _mLayers.m2.style.cssText = "opacity:0";
  }
  if (_morphRAF) cancelAnimationFrame(_morphRAF);
  _mLast = performance.now();
  _morphRAF = requestAnimationFrame(_mLoop);
}
function sablePillStream(text) {
  _pillStreamStart(true);                        // teal
  _streamWords = (text || "").trim().split(/\s+/).filter(Boolean);
  _units = _mkUnits(_streamWords);
  // _targetN stays 0 — revealed progressively by streamFollowAudio (her voice).
}
function youPillStream() { _pillStreamStart(false); }
function youPillWords(text) {
  const w = (text || "").trim().split(/\s+/).filter(Boolean);
  _streamWords = w; _units = _mkUnits(w);
  if (_mCur > _units.length - 1) _mCur = Math.max(-1, _units.length - 1);
  _targetN = w.length;
}
// Status pills (Searching…, ▶ now playing, Paused…) use the same two-word morph.
function pillStreamText(text, sable) {
  _pillStreamStart(!!sable);
  _streamWords = (text || "").trim().split(/\s+/).filter(Boolean);
  _units = _mkUnits(_streamWords);
  _targetN = _streamWords.length;
}
// how many word-groups the voice has fully reached (all of a group's words revealed)
function _targetUnits() {
  let words = 0, n = 0;
  for (let i = 0; i < _units.length; i++) {
    words += _units[i].split(/\s+/).length;
    if (words <= _targetN) n = i + 1; else break;
  }
  return n;
}
// The reference setMorph(): m1 = leaving pair, m2 = arriving pair.
function _setMorph(f) {
  if (!_mLayers) return;
  const { m1, m2 } = _mLayers;
  m2.style.filter = "blur(" + Math.min(8 / f - 8, 100) + "px)";
  m2.style.opacity = String(Math.pow(f, 0.4));
  const inv = 1 - f;
  m1.style.filter = "blur(" + Math.min(8 / inv - 8, 100) + "px)";
  m1.style.opacity = String(Math.pow(inv, 0.4));
}
function _showSharp(txt) {
  if (!_mLayers) return;
  _mLayers.m1.textContent = txt;
  _mLayers.m1.style.filter = "none"; _mLayers.m1.style.opacity = "1";
  _mLayers.m2.style.opacity = "0";
}
function _mLoop(now) {
  _morphRAF = requestAnimationFrame(_mLoop);
  const dt = Math.min((now - _mLast) / 1000, 0.05); _mLast = now;
  if (!_mLayers) return;
  const tu = _targetUnits();
  if (_mCur < 0) {                               // reveal the first pair once the voice reaches it
    if (tu >= 1) { _mCur = 0; _showSharp(_units[0]); _mHold = 0; }
    return;
  }
  const hasNext = _mCur + 1 < tu;
  const backlog = tu - 1 - _mCur;
  const morphTime = backlog > 1 ? Math.max(0.28, MORPH_TIME / backlog) : MORPH_TIME;
  const holdTime  = backlog > 1 ? 0 : HOLD_TIME;
  if (!_mMorphing) {
    _mHold += dt;
    if (hasNext && _mHold >= holdTime) {         // begin morphing into the next pair
      _mMorphing = true; _mFrac = 0.0001;
      _mLayers.m1.textContent = _units[_mCur];
      _mLayers.m2.textContent = _units[_mCur + 1];
      _setMorph(_mFrac);
    }
    return;
  }
  _mFrac += dt / morphTime;
  if (_mFrac >= 1) { _mCur++; _mMorphing = false; _mHold = 0; _showSharp(_units[_mCur]); }
  else _setMorph(_mFrac);
}
// Voice progress -> how many words revealed. Monotonic so the paced fallback and the audio
// follower can both drive it without ever going backwards within one message.
function streamRevealTo(n) { _targetN = Math.max(_targetN, Math.max(0, Math.min(n, _streamWords.length))); }
// Reveal words on an estimated speech cadence — the caption shows even if TTS audio is
// blocked (autoplay) or its events never fire. If the audio does play, streamFollowAudio
// takes over the same _audioRAF handle and syncs to real playback time.
function _pacedReveal(total) {
  if (_audioRAF) cancelAnimationFrame(_audioRAF);
  const start = performance.now(), wps = 2.6;          // ~ natural speaking rate
  const tick = () => {
    const elapsed = (performance.now() - start) / 1000;
    streamRevealTo(Math.min(total, Math.floor(elapsed * wps) + 1));
    _audioRAF = _targetN < total ? requestAnimationFrame(tick) : null;
  };
  _audioRAF = requestAnimationFrame(tick);
}
function streamFollowAudio(audio) {
  if (_audioRAF) cancelAnimationFrame(_audioRAF);
  const tick = () => {
    if (!audio || audio.ended) { streamRevealTo(_streamWords.length); _audioRAF = null; return; }
    if (audio.duration) streamRevealTo(Math.ceil((audio.currentTime / audio.duration) * _streamWords.length));
    if (!audio.paused) _audioRAF = requestAnimationFrame(tick); else _audioRAF = null;
  };
  _audioRAF = requestAnimationFrame(tick);
}
function statusPillHide(delay) {
  if (!voiceToast) return;
  clearTimeout(voiceHideTimer);
  voiceHideTimer = setTimeout(() => {
    voiceToast.classList.remove("is-show");
    setTimeout(() => {
      if (!voiceToast.classList.contains("is-show")) { voiceToast.hidden = true; voiceToast.classList.remove("sable"); }
    }, 360);
  }, delay == null ? 1200 : delay);
}
// Names still called elsewhere -> route to the single pill.
function convoSable(text) { sablePill(text); }
function convoSableThinking() { sablePill("…"); }
function convoSableNote(msg) { sablePill("⚠️ " + msg); statusPillHide(3200); }
function convoHide(delay) { statusPillHide(delay); }
function convoClearSable() {}
function convoShow() {}
function convoYou(text) { statusPill(text); }
function _maybeContinueConvo() {
  // After she finishes, reopen the mic to keep the back-and-forth going — else fade the pill.
  if (convoMode && typeof listening !== "undefined" && !listening) {
    setTimeout(() => { if (convoMode && !listening) { try { startListening(); } catch (e) {} } }, 140);   // near-instant reopen -> duplex feel
  } else {
    statusPillHide(2400);
  }
}

let _lastPartCount = 0;
const _appRoomState = window.roomOnState;   // preserve any earlier handler (none by default)
window.roomOnState = function (state) {
  try {
    const n = (state.participants || []).length;
    if (state.connected && n > _lastPartCount && amSyncer()) {
      setTimeout(roomBroadcast, 600);       // a new member joined -> snap them to the current spot
    }
    if (!state.connected) {                 // left the room -> stop any voice conversation
      convoMode = false;
      try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
      convoHide(0);
    }
    _lastPartCount = state.connected ? n : 0;
  } catch (e) {}
  if (typeof _appRoomState === "function") { try { _appRoomState(state); } catch (e) {} }
};

// Heartbeat: only the syncer emits, to keep everyone aligned without feedback loops.
setInterval(function () { if (roomActive() && amSyncer()) roomBroadcast(); }, 4000);

render();
saveAddedDiscs();   // rewrite storage without any duplicates that were loaded

/* ============================================================================
   Apple-Music-style synced lyrics — gooey "morphing text" (exact caption engine).
   The lyrics button swaps the CD frame for a focused lyric view: the current line
   sits at the centre and, on each advance, MORPHS from the previous line into the
   new one using two overlaid layers that cross-blur — the #vtThreshold filter fuses
   the blurred halos into liquid metaballs, identical to Sable's spoken caption
   (setMorph: blur 8/f-8, opacity f^0.4). A faint preview of the next line sits below.
   Timed lines come from LRCLIB (via /api/lyrics). Clicking a line seeks to it.
   ============================================================================ */
(function () {
  "use strict";
  const btn    = document.getElementById("lyricsBtn");
  const player = document.getElementById("player");
  const stage  = document.getElementById("lyricsStage");
  const flow   = document.getElementById("lyricsFlow");
  const curEl  = document.getElementById("lyrCur");
  const nextEl = document.getElementById("lyrNext");
  const plainEl = document.getElementById("lyricsPlain");
  const status = document.getElementById("lyricsStatus");
  const morphEl = curEl ? curEl.querySelector(".lyr-morph") : null;
  const m1 = morphEl ? morphEl.querySelector(".m1") : null;
  const m2 = morphEl ? morphEl.querySelector(".m2") : null;
  if (!btn || !player || !stage || !flow || !curEl || !m1 || !m2) return;

  const SEP = "␟";
  const LEAD = 0.15;        // seconds: light the line a hair before it's sung
  let open = false;
  let key = "";
  let synced = false;
  let lines = [];           // [{t, text}]
  let activeIdx = -2;       // -2 = uninitialised, -1 = before first line
  let raf = 0, morphRAF = 0;
  let reqSeq = 0;
  let curText = null;       // text settled in the focal line

  function target() { return (typeof tempSong !== "undefined" && tempSong) ? tempSong : DISCS[index]; }
  function songKey(d) { return d ? ((d.title || "") + SEP + (d.artist || "")) : ""; }
  function lineText(l) { return l ? (l.text || "♪") : ""; }

  function posSec() {
    if (typeof tempSong !== "undefined" && tempSong && typeof ytReady !== "undefined" && ytReady && yt && yt.getCurrentTime) {
      try { return yt.getCurrentTime() || 0; } catch (e) {}
    }
    try { return curPosMs() / 1000; } catch (e) { return 0; }
  }
  function seekLine(l) {
    if (!l || l.t == null || l.t < 0) return;
    try { seekAbsolute(Math.max(0, l.t - 0.15)); } catch (e) {}
    if (typeof wantPlay !== "undefined") wantPlay = true;
    if (typeof startLocal === "function") { try { startLocal(); } catch (e) {} }
    highlight(true);
  }

  // ---- exact caption morph engine ---------------------------------------
  function setMorph(f) {
    m2.style.filter = "blur(" + Math.min(8 / f - 8, 100) + "px)";
    m2.style.opacity = String(Math.pow(f, 0.4));
    const inv = 1 - f;
    m1.style.filter = "blur(" + Math.min(8 / inv - 8, 100) + "px)";
    m1.style.opacity = String(Math.pow(inv, 0.4));
  }
  function showSharp(txt) {
    cancelAnimationFrame(morphRAF); morphRAF = 0;
    morphEl.classList.remove("is-morphing");
    m1.textContent = txt; m1.style.filter = "none"; m1.style.opacity = "1";
    m2.textContent = ""; m2.style.opacity = "0"; m2.style.filter = "none";
  }
  function morphTo(fromText, toText) {
    cancelAnimationFrame(morphRAF);
    m1.textContent = fromText; m2.textContent = toText;
    morphEl.classList.add("is-morphing");
    setMorph(0.0001);
    // hint of upward motion under the morph
    curEl.classList.remove("is-rising"); void curEl.offsetWidth; curEl.classList.add("is-rising");
    const DUR = 0.62; let start = 0;
    const step = (now) => {
      if (!start) start = now;
      const f = (now - start) / 1000 / DUR;
      if (f >= 1) { showSharp(toText); return; }
      setMorph(f);
      morphRAF = requestAnimationFrame(step);
    };
    morphRAF = requestAnimationFrame(step);
  }

  // ---- window (current line + next preview) ------------------------------
  function renderWindow(idx, animate) {
    const cur = lines[idx], next = lines[idx + 1];
    if (nextEl) nextEl.textContent = lineText(next);
    const toText = lineText(cur);
    if (animate && curText != null && toText !== curText) morphTo(curText, toText);
    else showSharp(toText);
    curText = toText;
  }

  function setStatus(msg) {
    if (status) status.textContent = msg || "";
    stage.classList.toggle("is-empty", !!msg);
  }

  function renderSynced(rows) {
    lines = rows.map((r) => ({ t: r.t, text: r.text }));
    synced = true; activeIdx = -2; curText = null;
    stage.classList.remove("is-plain");
    if (plainEl) { plainEl.hidden = true; plainEl.textContent = ""; }
    setStatus("");
    highlight(true);
  }
  function renderPlain(text) {
    synced = false; lines = []; activeIdx = -2; curText = null;
    stage.classList.add("is-plain");
    setStatus("");
    if (plainEl) {
      plainEl.hidden = false; plainEl.textContent = "";
      // No timestamps for this track (LRCLIB only had plain text), so the lines
      // can't scroll with the song — make that clear instead of looking broken.
      const note = document.createElement("div");
      note.className = "lyr-plain-note";
      note.textContent = "Synced lyrics aren’t available for this song — showing the full lyrics.";
      plainEl.appendChild(note);
      (text || "").split(/\r?\n/).forEach((ln) => {
        const p = document.createElement("div");
        p.textContent = ln || " ";
        plainEl.appendChild(p);
      });
    }
  }
  function renderNone(apiError) {
    synced = false; lines = []; activeIdx = -2; curText = null;
    stage.classList.remove("is-plain");
    if (plainEl) { plainEl.hidden = true; plainEl.textContent = ""; }
    if (nextEl) nextEl.textContent = "";
    showSharp("");
    if (apiError) {
      setStatus("Couldn't reach lyrics server. Tap to retry.");
      if (status) { status.style.cursor = "pointer"; status.onclick = () => { status.style.cursor = ""; status.onclick = null; load(true); }; }
    } else {
      setStatus("Lyrics aren't available for this track.");
    }
  }

  // ---- fetch --------------------------------------------------------------
  function load(force) {
    const d = target();
    const k = songKey(d);
    if (!d || !k.trim()) { key = ""; renderNone(); return; }
    if (k === key && !force) return;
    key = k;
    setStatus("Finding lyrics…");
    stage.classList.remove("is-plain");
    if (plainEl) plainEl.hidden = true;
    let dur = 0;
    try { dur = Math.round(curDuration()) || 0; } catch (e) {}
    const seq = ++reqSeq;
    const qs = new URLSearchParams({ title: d.title || "", artist: d.artist || "" });
    if (dur) qs.set("duration", String(dur));
    // Guard against a slow/unreachable lyrics fetch hanging on "Finding lyrics…"
    // forever — abort after 20s and fall back to the retryable "not available" state.
    const ctrl = new AbortController();
    const to = setTimeout(() => { try { ctrl.abort(); } catch (e) {} }, 20000);
    fetch("/api/lyrics?" + qs.toString(), { signal: ctrl.signal })
      .then((r) => r.json())
      .then((j) => {
        clearTimeout(to);
        if (seq !== reqSeq || k !== key) return;
        if (j && j.synced && j.synced.length) renderSynced(j.synced);
        else if (j && j.plain) renderPlain(j.plain);
        else renderNone(j && j.error);
      })
      .catch(() => { clearTimeout(to); if (seq === reqSeq) renderNone("fetch_error"); });
  }

  // ---- highlight loop -----------------------------------------------------
  function highlight(force) {
    if (!synced || !lines.length) return;
    const t = posSec() + LEAD;
    let idx = -1;
    for (let i = 0; i < lines.length; i++) { if (lines[i].t <= t) idx = i; else break; }
    if (idx === activeIdx && !force) return;
    const animate = idx === activeIdx + 1;   // single step morphs; jumps snap
    activeIdx = idx;
    renderWindow(idx, animate);
  }
  function tick() {
    if (!open) return;
    highlight(false);
    raf = requestAnimationFrame(tick);
  }

  // ---- open / close -------------------------------------------------------
  function openLyrics() {
    open = true;
    stage.hidden = false;
    stage.setAttribute("aria-hidden", "false");
    player.classList.add("show-lyrics");
    btn.setAttribute("aria-pressed", "true");
    load(false);
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
    requestAnimationFrame(() => highlight(true));
  }
  function closeLyrics() {
    open = false;
    cancelAnimationFrame(raf);
    cancelAnimationFrame(morphRAF);
    player.classList.remove("show-lyrics");
    btn.setAttribute("aria-pressed", "false");
    stage.setAttribute("aria-hidden", "true");
    setTimeout(() => { if (!open) stage.hidden = true; }, 420);
  }
  function toggle() { open ? closeLyrics() : openLyrics(); }
  btn.addEventListener("click", toggle);
  curEl.addEventListener("click", () => seekLine(lines[activeIdx]));
  if (nextEl) nextEl.addEventListener("click", () => seekLine(lines[activeIdx + 1]));

  // Reload when the song changes (called from syncSong).
  window.lyricsOnSongChange = function () {
    if (open) { load(true); }
    else { key = ""; }
  };
})();
