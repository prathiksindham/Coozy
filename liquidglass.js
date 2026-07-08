/* ============================================================================
   Apple "Liquid Glass" engine — real edge refraction (not turbulence).

   Per the kube.io / Aave technique: for each element we generate a displacement
   map sized to it, where each pixel's R/G channel encodes how far to bend the
   backdrop (Snell-style refraction). The map is ~zero in the flat interior and
   ramps up along the curved bezel near the rounded edges, so the background
   lenses at the rim and stays clear in the middle — the signature look. The map
   feeds an SVG <feImage> + <feDisplacementMap>, applied via backdrop-filter.
   Depth is completed with a specular rim + bevel via box-shadow (in CSS).

   Chromium only (SVG backdrop-filter). Elsewhere the CSS frost is the fallback.
   ========================================================================== */
(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  let _n = 0;
  let _defs = null;

  function defs() {
    if (_defs) return _defs;
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", "0"); svg.setAttribute("height", "0");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none";
    _defs = document.createElementNS(NS, "defs");
    svg.appendChild(_defs);
    document.body.appendChild(svg);
    return _defs;
  }

  // Signed distance to a rounded rectangle centred in a w×h box (negative inside).
  function sdRoundRect(px, py, hw, hh, r) {
    const qx = Math.abs(px) - (hw - r);
    const qy = Math.abs(py) - (hh - r);
    const ax = Math.max(qx, 0), ay = Math.max(qy, 0);
    return Math.hypot(ax, ay) + Math.min(Math.max(qx, qy), 0) - r;
  }

  // Convex-squircle surface slope at normalized depth x∈[0,1] (0 = edge, 1 = flat
   // interior). y = ⁴√(1−(1−x)⁴); slope = (1−x)³ / (1−(1−x)⁴)^¾ — infinite at the
   // edge, zero in the interior. Soft-saturated to [0,1) so refraction sits in a
   // thin rim and the centre stays clear — Apple's look, no harsh interior edge.
  function squircleBend(x) {
    const om = 1 - x;
    const u = Math.max(1e-4, 1 - om * om * om * om);
    const slope = (om * om * om) / Math.pow(u, 0.75);
    return slope / (slope + 1.1);
  }

  // Generate BOTH maps sized to the element:
  //   disp – R/G encode the refraction vector (squircle-shaped rim bend).
  //   spec – white rim-light with alpha = surface-faces-the-light (top-left).
  function makeLensMaps(w, h, r, bezel) {
    const dc = document.createElement("canvas"); dc.width = w; dc.height = h;
    const sc = document.createElement("canvas"); sc.width = w; sc.height = h;
    const dctx = dc.getContext("2d"), sctx = sc.getContext("2d");
    const di = dctx.createImageData(w, h), si = sctx.createImageData(w, h);
    const D = di.data, S = si.data;
    const hw = w / 2, hh = h / 2, eps = 1;
    const lx = -0.45, ly = -0.89;                      // light from the top-left
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const px = x - hw + 0.5, py = y - hh + 0.5;
        const depth = -sdRoundRect(px, py, hw, hh, r);
        const i = (y * w + x) << 2;
        let rx = 128, gy = 128, sa = 0;
        if (depth > 0 && depth < bezel) {
          const gx = (sdRoundRect(px + eps, py, hw, hh, r) - sdRoundRect(px - eps, py, hw, hh, r)) / (2 * eps);
          const gyy = (sdRoundRect(px, py + eps, hw, hh, r) - sdRoundRect(px, py - eps, hw, hh, r)) / (2 * eps);
          const gl = Math.hypot(gx, gyy) || 1;
          const nx = gx / gl, ny = gyy / gl;           // outward surface normal
          const mag = squircleBend(depth / bezel);
          rx = 128 + (-nx) * mag * 127;                // bend the backdrop inward
          gy = 128 + (-ny) * mag * 127;
          const facing = nx * lx + ny * ly;            // >0 where the rim faces the light
          sa = Math.max(0, facing) * mag;              // rim light, concentrated at the edge
        }
        D[i] = rx; D[i + 1] = gy; D[i + 2] = 128; D[i + 3] = 255;
        S[i] = 255; S[i + 1] = 255; S[i + 2] = 255; S[i + 3] = Math.min(255, sa * 255);
      }
    }
    dctx.putImageData(di, 0, 0); sctx.putImageData(si, 0, 0);
    return { disp: dc.toDataURL(), spec: sc.toDataURL() };
  }

  // Attach a live liquid-glass refraction to an element sized to it.
  //   radius  – corner radius (px). Use size/2 for a circular lens.
  //   scale   – max backdrop displacement in px (depth of refraction).
  //   bezel   – curved-edge width; default ~38% of the short side.
  //   blur/sat/bright – frosting on top of the refraction.
  const reducedTransparency = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-transparency: reduce)").matches;

  function applyGlass(el, opts) {
    opts = opts || {};
    const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
    if (!w || !h) return false;
    // Accessibility: Reduce Transparency → no glass at all, let the opaque CSS win.
    if (reducedTransparency()) { el.style.backdropFilter = "none"; el.style.webkitBackdropFilter = "none"; return false; }
    el.dataset.lg = "1";                                       // marks it for pointer-reactive sheen
    if (opts.sheen !== false && Math.min(w, h) >= 30 && !el.querySelector(":scope > .lg-sheen")) {
      if (getComputedStyle(el).position === "static") el.style.position = "relative";
      const sheen = document.createElement("span");
      sheen.className = "lg-sheen"; sheen.setAttribute("aria-hidden", "true");
      el.appendChild(sheen);
    }
    const radius = opts.radius != null ? opts.radius : 14;
    const bezel = opts.bezel != null ? opts.bezel : Math.max(3, Math.min(w, h) * 0.38);
    const scale = opts.scale != null ? opts.scale : 14;
    const blur = opts.blur != null ? opts.blur : 1;
    const sat = opts.sat != null ? opts.sat : 1.7;
    const bright = opts.bright != null ? opts.bright : 1.06;
    const specOpacity = opts.spec != null ? opts.spec : 0.4;   // rim-light strength (article 0.2–0.5)

    // reuse the same filter if the size didn't change
    if (el._lgW === w && el._lgH === h && el._lgId) return true;
    el._lgW = w; el._lgH = h;

    const id = el._lgId || ("lg-" + (_n++));
    el._lgId = id;
    const maps = makeLensMaps(w, h, radius, bezel);

    // Rebuild the filter chain: displacement (refraction) then the specular rim,
    // merged on top — the article's two-feImage-plus-blend structure.
    let filter = document.getElementById(id);
    if (filter) filter.remove();
    filter = document.createElementNS(NS, "filter");
    filter.setAttribute("id", id);
    filter.setAttribute("color-interpolation-filters", "sRGB");
    filter.setAttribute("x", "0"); filter.setAttribute("y", "0");
    filter.setAttribute("width", w); filter.setAttribute("height", h);
    filter.setAttribute("filterUnits", "userSpaceOnUse");

    const mk = (tag, attrs) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };
    filter.appendChild(mk("feImage", { href: maps.disp, x: 0, y: 0, width: w, height: h, result: "dmap" }));
    filter.appendChild(mk("feDisplacementMap", { in: "SourceGraphic", in2: "dmap", scale: scale, xChannelSelector: "R", yChannelSelector: "G", result: "refr" }));
    filter.appendChild(mk("feImage", { href: maps.spec, x: 0, y: 0, width: w, height: h, result: "spec" }));
    // saturate + fade the rim light (article: specular saturation 4–9, opacity ~0.4)
    const ct = mk("feColorMatrix", { in: "spec", type: "matrix",
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 " + specOpacity + " 0", result: "spec2" });
    filter.appendChild(ct);
    const merge = mk("feMerge", {});
    merge.appendChild(mk("feMergeNode", { in: "refr" }));
    merge.appendChild(mk("feMergeNode", { in: "spec2" }));
    filter.appendChild(merge);
    defs().appendChild(filter);

    el.style.backdropFilter = `url(#${id}) blur(${blur}px) saturate(${sat}) brightness(${bright})`;
    el.style.webkitBackdropFilter = `blur(${blur + 6}px) saturate(${sat}) brightness(${bright})`;  // Safari frost fallback
    return true;
  }

  // Apply to a set of [selector, options] and keep maps in sync on resize.
  const registry = [];
  function register(selector, opts) {
    registry.push([selector, opts || {}]);
    refresh();
  }
  function refresh() {
    for (const [sel, opts] of registry) {
      document.querySelectorAll(sel).forEach((el) => { try { applyGlass(el, opts); } catch (e) {} });
    }
  }
  let _rt = null;
  window.addEventListener("resize", () => { clearTimeout(_rt); _rt = setTimeout(refresh, 150); });

  window.LiquidGlass = { apply: applyGlass, makeLensMaps, register, refresh };

  // Register the app's glass elements. Each gets its own size-matched lens map.
  function init() {
    // NB: .np__thumb is NOT registered — the runtime slider uses the Maxuiux
    // #mini-liquid-lens (a filter on a backdrop-blurred layer), toggled while dragging.
    register(".source-switch", { radius: 21, scale: 8, blur: 3, sat: 1.8, bright: 1.05, spec: 0.4 }); // segmented-control glass track (pill: r = half-height)
    // NB: the .src-thumb selection capsule is intentionally NOT registered — the
    // reference builds it from box-shadow only (no backdrop-filter), behind the icons.
    register(".view-toggle, .fx-toggle, .room-btn, .player__arrow",
             { radius: 23, scale: 9, blur: 1, sat: 1.8 });                              // round control tiles (circular: r = half of 46px)
  }
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", refresh);   // re-measure once layout/fonts settle

  // Interaction: the specular sheen tracks the pointer, so light appears to play
  // across the glass as you move over it — the "liquid" feel. (Disabled by the
  // reduced-motion CSS.)
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest ? e.target.closest("[data-lg]") : null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
    el.style.setProperty("--gy", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
  }, { passive: true });

  // Re-apply / tear down when the Reduce Transparency setting changes.
  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-reduced-transparency: reduce)");
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(refresh);
  }
})();
