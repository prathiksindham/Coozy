/* Falling Hearts — physics worker.
   Runs the Matter.js simulation off the main thread. Hearts are circular
   bodies (cheap collision) pooled up-front; the person silhouette arrives as
   a batch of circle centers that we apply to a pool of static obstacle
   bodies. Positions ship back as transferable Float32Arrays (ping-ponged so
   no per-frame allocation happens). */

"use strict";

importScripts("https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js");

const { Engine, World, Bodies, Body, Sleeping, Composite } = Matter;

const STEP_MS = 1000 / 60;      // fixed physics timestep
const MAX_CATCHUP_STEPS = 3;    // never replay more than this after a stall
const FLOATS_PER_HEART = 4;     // x, y, angle, radius

/* How the falling objects behave. Defaults describe hearts; the petals mode
   overrides these from the main thread (lighter, draggier, no bounce, strong
   flutter and rocking — the way petals actually fall). */
const DEFAULT_PROFILE = {
  gravity: 1,
  airMin: 0.01, airVar: 0.012,        // frictionAir range (drag)
  restMin: 0.15, restVar: 0.2,        // restitution range (bounce)
  fricMin: 0.3, fricVar: 0.3,
  density: 0.0012,
  flutterX: 0.00012,                  // side-to-side sway force
  flutterLift: 0.00004,               // hint of lift while swinging
  flutterFreq: 0.0025,
  rock: 0,                            // rotational rocking coupled to the sway
  spawnVX: 1.6, spawnVYBase: 0.5, spawnVYVar: 2,
  spawnSpin: 0.14, spawnTilt: 1.2,
  fallVy: 0.6,                        // sway only applies above this fall speed
};
let prof = DEFAULT_PROFILE;

let engine = null;
let running = false;
let timer = null;
let lastTick = 0;
let accumulator = 0;

let worldW = 0, worldH = 0;
let walls = [];

// Heart pool. All bodies are created once at init for the max cap; `activeCount`
// is how many are currently in the world. Lowering the cap removes bodies from
// the world but keeps them pooled.
let hearts = [];          // { body, radius, bornAt }
let activeCount = 0;
let cap = 0;
let spawnEveryMs = 170;
let spawnClock = 0;
let nextSpawnMs = 170;

// Obstacle pool: static circles laid along the person's outline. Unused ones
// are parked far offscreen rather than removed (cheaper than add/remove churn).
const OBSTACLE_POOL = 320;
const PARKED = -10000;
let obstacles = [];
let obstacleCount = 0;
// Previous outline snapshot, for detecting which parts of the body moved.
const prevOX = new Float32Array(OBSTACLE_POOL);
const prevOY = new Float32Array(OBSTACLE_POOL);
let windT = 0;

// Hand skeleton obstacles: 21 landmark circles per hand, 2 hands. Unlike the
// segmentation outline these have stable identity (slot = same knuckle every
// frame), so they track palms precisely — this is what makes catching a
// falling heart in your hand work. Bodies glide toward `handTarget` a little
// every physics step instead of teleporting on each (10-15Hz) detection.
const HAND_POOL = 42;
let handBodies = [];
const handTarget = new Float32Array(HAND_POOL * 3);
let handCount = 0;

// Position buffers ping-ponged with the main thread.
let freeBuffers = [];

function init(msg) {
  worldW = msg.w;
  worldH = msg.h;
  cap = msg.cap;
  spawnEveryMs = msg.spawnEveryMs || 170;

  prof = Object.assign({}, DEFAULT_PROFILE, msg.profile || {});
  engine = Engine.create({ enableSleeping: true });
  engine.gravity.y = prof.gravity;

  buildWalls();

  const maxCap = msg.maxCap || cap;
  // Size hearts so the full pool visually fills the whole screen: bigger
  // screens (or lower-capped tiers) get chunkier hearts instead of more bodies.
  const baseR = Math.min(20, Math.max(8, Math.sqrt((worldW * worldH * 0.92) / (maxCap * Math.PI))));
  for (let i = 0; i < maxCap; i++) {
    const radius = baseR * (0.75 + Math.random() * 0.5);
    // Per-body drag/bounce variation so the rain doesn't fall in lockstep.
    const body = Bodies.circle(0, PARKED, radius, {
      restitution: prof.restMin + Math.random() * prof.restVar,
      friction: prof.fricMin + Math.random() * prof.fricVar, // grippy enough to hold in a palm
      frictionAir: prof.airMin + Math.random() * prof.airVar,
      density: prof.density,
      sleepThreshold: 45,
    });
    hearts.push({
      body, radius, bornAt: 0,
      phase: Math.random() * Math.PI * 2,
      freqMul: 0.75 + Math.random() * 0.5,
    });
  }

  for (let i = 0; i < OBSTACLE_POOL; i++) {
    const body = Bodies.circle(PARKED, PARKED, 16, { isStatic: true, friction: 0.9, restitution: 0 });
    World.add(engine.world, body);
    obstacles.push(body);
  }

  for (let i = 0; i < HAND_POOL; i++) {
    const body = Bodies.circle(PARKED, PARKED, 12, { isStatic: true, friction: 1, restitution: 0 });
    World.add(engine.world, body);
    handBodies.push(body);
    handTarget[i * 3] = PARKED;
    handTarget[i * 3 + 1] = PARKED;
  }

  for (let i = 0; i < 3; i++) {
    freeBuffers.push(new Float32Array(maxCap * FLOATS_PER_HEART).buffer);
  }

  resume();
}

function buildWalls() {
  if (walls.length) World.remove(engine.world, walls);
  const T = 200; // thick so fast bodies can't tunnel out
  walls = [
    // floor sits at the bottom edge
    Bodies.rectangle(worldW / 2, worldH + T / 2, worldW + 2 * T, T, { isStatic: true, friction: 0.3 }),
    Bodies.rectangle(-T / 2, worldH / 2, T, worldH * 4, { isStatic: true }),
    Bodies.rectangle(worldW + T / 2, worldH / 2, T, worldH * 4, { isStatic: true }),
  ];
  World.add(engine.world, walls);
}

function resize(msg) {
  worldW = msg.w;
  worldH = msg.h;
  buildWalls();
  // Pull anything that ended up outside the new bounds back into view.
  for (let i = 0; i < activeCount; i++) {
    const h = hearts[i];
    if (h.body.position.x < 0 || h.body.position.x > worldW || h.body.position.y > worldH) {
      respawn(h);
    }
  }
}

function spawnPosition() {
  return {
    x: 20 + Math.random() * Math.max(1, worldW - 40),
    y: -30 - Math.random() * 160,
  };
}

function respawn(h) {
  const p = spawnPosition();
  Sleeping.set(h.body, false);
  Body.setPosition(h.body, p);
  // A touch of sideways drift, initial fall speed, and tumble reads as wind-blown
  // confetti instead of beads dropping on a string.
  Body.setVelocity(h.body, {
    x: (Math.random() - 0.5) * prof.spawnVX,
    y: prof.spawnVYBase + Math.random() * prof.spawnVYVar,
  });
  Body.setAngularVelocity(h.body, (Math.random() - 0.5) * prof.spawnSpin);
  Body.setAngle(h.body, (Math.random() - 0.5) * prof.spawnTilt);
  h.bornAt = performance.now();
}

/* Hearts accumulate until the pool is exhausted and the screen is full —
   nothing is recycled. The user clears the pile with the Reset button. */
function trySpawn() {
  // Batch size keeps the fill time reasonable even with a big pool.
  let batch = Math.max(1, Math.round(cap / 900));
  while (batch-- > 0 && activeCount < cap) {
    const h = hearts[activeCount++];
    World.add(engine.world, h.body);
    respawn(h);
  }
}

function resetHearts() {
  for (let i = 0; i < activeCount; i++) {
    const h = hearts[i];
    World.remove(engine.world, h.body);
    Body.setPosition(h.body, { x: 0, y: PARKED });
    Body.setVelocity(h.body, { x: 0, y: 0 });
  }
  activeCount = 0;
  spawnClock = 0;
}

function setCap(newCap) {
  newCap = Math.max(0, Math.min(newCap, hearts.length));
  while (activeCount > newCap) {
    const h = hearts[--activeCount];
    World.remove(engine.world, h.body);
    Body.setPosition(h.body, { x: 0, y: PARKED });
  }
  cap = newCap;
}

/* The outline cells arrive in scan order, so index i is NOT the same body part
   from one update to the next. Match each point against the nearest point of
   the previous outline: regions that stayed put leave resting hearts alone
   (so you can hold a pile in your palm), regions that moved wake nearby hearts
   and push them along with the movement (so you can bat hearts around), and
   regions that vanished wake whatever was resting on them. */
function applyObstacles(msg) {
  const pts = new Float32Array(msg.buffer); // [x, y, r] triplets
  const n = Math.min(msg.count, OBSTACLE_POOL);
  const oldN = obstacleCount;
  for (let i = 0; i < oldN; i++) {
    prevOX[i] = obstacles[i].position.x;
    prevOY[i] = obstacles[i].position.y;
  }

  for (let i = 0; i < n; i++) {
    const b = obstacles[i];
    Body.setPosition(b, { x: pts[i * 3], y: pts[i * 3 + 1] });
    if (Math.abs(b.circleRadius - pts[i * 3 + 2]) > 2) {
      const s = pts[i * 3 + 2] / b.circleRadius;
      Body.scale(b, s, s);
    }
  }
  for (let i = n; i < oldN; i++) {
    Body.setPosition(obstacles[i], { x: PARKED, y: PARKED });
  }
  obstacleCount = n;
  if (!oldN || !n) return;

  // Events: [x, y, pushX, pushY] — push is 0 for "support vanished" wakes.
  const events = [];
  const STILL = 6; // px; outline jitter below this is treated as stationary
  for (let i = 0; i < n; i++) {
    const x = pts[i * 3], y = pts[i * 3 + 1];
    let best = Infinity, bx = 0, by = 0;
    for (let j = 0; j < oldN; j++) {
      const dx = x - prevOX[j], dy = y - prevOY[j];
      const d2 = dx * dx + dy * dy;
      if (d2 < best) { best = d2; bx = dx; by = dy; }
    }
    if (best > STILL * STILL && best < 150 * 150) {
      const d = Math.sqrt(best);
      const v = Math.min(d, 45) / 5; // detection interval ≈ 5 physics steps
      events.push(x, y, (bx / d) * v, (by / d) * v);
    }
  }
  for (let j = 0; j < oldN; j++) {
    let best = Infinity;
    for (let i = 0; i < n; i++) {
      const dx = pts[i * 3] - prevOX[j], dy = pts[i * 3 + 1] - prevOY[j];
      const d2 = dx * dx + dy * dy;
      if (d2 < best) best = d2;
    }
    if (best > STILL * STILL) events.push(prevOX[j], prevOY[j], 0, 0);
  }
  if (!events.length) return;

  for (let i = 0; i < activeCount; i++) {
    const h = hearts[i];
    const p = h.body.position;
    const reach = h.radius + 24;
    for (let e = 0; e < events.length; e += 4) {
      const dx = p.x - events[e], dy = p.y - events[e + 1];
      if (dx * dx + dy * dy > reach * reach) continue;
      Sleeping.set(h.body, false);
      const px = events[e + 2], py = events[e + 3];
      if (px || py) {
        const v = h.body.velocity;
        Body.setVelocity(h.body, {
          x: Math.max(-14, Math.min(14, v.x + px * 0.8)),
          y: Math.max(-14, Math.min(14, v.y + py * 0.8)),
        });
      }
      break;
    }
  }
}

/* Wake hearts near (x, y) and optionally push them along (pvx, pvy). */
function wakeHeartsNear(x, y, range, pvx, pvy) {
  for (let i = 0; i < activeCount; i++) {
    const h = hearts[i];
    const p = h.body.position;
    const reach = range + h.radius;
    const dx = p.x - x, dy = p.y - y;
    if (dx * dx + dy * dy > reach * reach) continue;
    Sleeping.set(h.body, false);
    if (pvx || pvy) {
      const v = h.body.velocity;
      Body.setVelocity(h.body, {
        x: Math.max(-14, Math.min(14, v.x + pvx * 0.8)),
        y: Math.max(-14, Math.min(14, v.y + pvy * 0.8)),
      });
    }
  }
}

function applyHands(msg) {
  const pts = new Float32Array(msg.buffer); // [x, y, r] per landmark
  const n = Math.min(msg.count, HAND_POOL);
  for (let i = 0; i < n; i++) {
    const b = handBodies[i];
    const tx = pts[i * 3], ty = pts[i * 3 + 1], r = pts[i * 3 + 2];
    if (Math.abs(b.circleRadius - r) > 1.5) {
      const s = r / b.circleRadius;
      Body.scale(b, s, s);
    }
    const appeared = handTarget[i * 3] <= PARKED + 1;
    handTarget[i * 3] = tx;
    handTarget[i * 3 + 1] = ty;
    handTarget[i * 3 + 2] = r;
    if (appeared) {
      Body.setPosition(b, { x: tx, y: ty }); // no glide from the parking lot
      continue;
    }
    const dx = tx - b.position.x, dy = ty - b.position.y;
    const d2 = dx * dx + dy * dy;
    if (d2 > 36) { // this part of the hand is moving: carry hearts with it
      const d = Math.sqrt(d2);
      const v = Math.min(d, 45) / 5;
      wakeHeartsNear(tx, ty, r + 20, (dx / d) * v, (dy / d) * v);
    }
  }
  for (let i = n; i < handCount; i++) { // hand left the frame: drop its cargo
    const b = handBodies[i];
    if (b.position.x > PARKED + 1) wakeHeartsNear(b.position.x, b.position.y, b.circleRadius + 20, 0, 0);
    handTarget[i * 3] = PARKED;
    handTarget[i * 3 + 1] = PARKED;
    Body.setPosition(b, { x: PARKED, y: PARKED });
  }
  handCount = n;
}

/* Glide hand circles toward their latest detected positions each step. */
function advanceHands() {
  for (let i = 0; i < handCount; i++) {
    const tx = handTarget[i * 3], ty = handTarget[i * 3 + 1];
    if (tx <= PARKED + 1) continue;
    const b = handBodies[i];
    const dx = tx - b.position.x, dy = ty - b.position.y;
    if (dx * dx + dy * dy < 0.25) continue;
    Body.setPosition(b, { x: b.position.x + dx * 0.35, y: b.position.y + dy * 0.35 });
  }
}

/* Fountain of hearts from the two-hands-heart gesture (or a click). */
function burst(msg) {
  const { x, y } = msg;
  let want = msg.n || 16;
  const fling = (h) => {
    Sleeping.set(h.body, false);
    Body.setPosition(h.body, { x: x + (Math.random() - 0.5) * 36, y: y + (Math.random() - 0.5) * 36 });
    const ang = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
    const sp = 7 + Math.random() * 6;
    Body.setVelocity(h.body, { x: Math.cos(ang) * sp, y: Math.sin(ang) * sp });
    Body.setAngularVelocity(h.body, (Math.random() - 0.5) * 0.4);
    h.bornAt = performance.now();
    want--;
  };
  while (want > 0 && activeCount < cap) {
    const h = hearts[activeCount++];
    World.add(engine.world, h.body);
    fling(h);
  }
  if (want > 0) {
    hearts.slice(0, activeCount)
      .filter((h) => h.body.isSleeping)
      .sort((a, b) => a.bornAt - b.bornAt)
      .slice(0, want)
      .forEach(fling);
  }
}

function tick() {
  const now = performance.now();
  let elapsed = now - lastTick;
  lastTick = now;

  // Cap catch-up so a backgrounded tab doesn't replay minutes of simulation.
  if (elapsed > STEP_MS * MAX_CATCHUP_STEPS) elapsed = STEP_MS * MAX_CATCHUP_STEPS;
  accumulator += elapsed;

  while (accumulator >= STEP_MS) {
    spawnClock += STEP_MS;
    if (spawnClock >= nextSpawnMs) {
      spawnClock = 0;
      nextSpawnMs = spawnEveryMs * (0.6 + Math.random() * 0.8); // jittered cadence
      trySpawn();
    }
    applyWind();
    advanceHands();
    Engine.update(engine, STEP_MS);
    accumulator -= STEP_MS;
  }

  publishPositions();
}

/* Falling objects flutter side-to-side like leaves instead of dropping on
   rails: a per-body phased sway, a hint of lift while swinging, and (for
   petal-like profiles) a rocking rotation coupled to the sway. */
function applyWind() {
  windT += STEP_MS;
  for (let i = 0; i < activeCount; i++) {
    const h = hearts[i];
    const b = h.body;
    if (b.isSleeping || b.velocity.y < prof.fallVy) continue; // only while falling
    const s = Math.sin(windT * prof.flutterFreq * h.freqMul + h.phase);
    Body.applyForce(b, b.position, {
      x: s * b.mass * prof.flutterX,
      y: -Math.abs(s) * b.mass * prof.flutterLift,
    });
    if (prof.rock) {
      Body.setAngularVelocity(b, b.angularVelocity + (s * prof.rock - b.angularVelocity) * 0.08);
    }
  }
}

function publishPositions() {
  const raw = freeBuffers.pop();
  if (!raw) return; // main thread is behind; it still has the last frame
  const out = new Float32Array(raw);
  for (let i = 0; i < activeCount; i++) {
    const h = hearts[i];
    const o = i * FLOATS_PER_HEART;
    out[o] = h.body.position.x;
    out[o + 1] = h.body.position.y;
    out[o + 2] = h.body.angle;
    out[o + 3] = h.radius;
  }
  self.postMessage({ type: "positions", buffer: raw, count: activeCount }, [raw]);
}

function resume() {
  if (running) return;
  running = true;
  lastTick = performance.now();
  accumulator = 0;
  timer = setInterval(tick, STEP_MS);
}

function pause() {
  running = false;
  if (timer) { clearInterval(timer); timer = null; }
}

self.onmessage = (e) => {
  const msg = e.data;
  switch (msg.type) {
    case "init": init(msg); break;
    case "resize": resize(msg); break;
    case "obstacles": applyObstacles(msg); break;
    case "hands": applyHands(msg); break;
    case "burst": burst(msg); break;
    case "reset": resetHearts(); break;
    case "buffer": freeBuffers.push(msg.buffer); break; // returned by main thread
    case "setCap": setCap(msg.cap); break;
    case "pause": pause(); break;
    case "resume": resume(); break;
  }
};
