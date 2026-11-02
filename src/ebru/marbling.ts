/**
 * Mathematical marbling: every pigment is a closed polygon floating on the
 * bath, and every gesture is a transform applied to all of their vertices.
 *
 * - A drop at c with radius r pushes each point p outward so the area it
 *   covers is added exactly: p' = c + (p − c)·√(1 + r²/|p − c|²). Two drops
 *   at the same centre compose (r² adds), which is what lets a drop grow
 *   frame by frame and what turns concentric drops into rings.
 * - A stylus stroke drags points along its direction, strongest on the line
 *   and fading with distance, the way a tine pulls paint through the size.
 *
 * Points inside a protected disc (the portrait) are never moved, so the face
 * stays a clean drop whatever happens around it.
 */

export type Pigment = number;

export type Shape = {pigment: Pigment; pts: number[]};

export type Guard = {x: number; y: number; r: number};

/** How far the protected disc's influence ramps from frozen to free. */
const GUARD_RAMP = 0.32;

/** Seeded so the same bath is poured on every visit and every resize. */
export function rng(seed: number) {
  let state = seed >>> 0 || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

function circle(x: number, y: number, r: number, count: number) {
  const pts: number[] = [];
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2;
    pts.push(x + Math.cos(a) * r, y + Math.sin(a) * r);
  }
  return pts;
}

function guardWeight(x: number, y: number, guard?: Guard) {
  if (!guard) return 1;
  const d = Math.hypot(x - guard.x, y - guard.y);
  const inner = guard.r * 1.02;
  const outer = guard.r * (1 + GUARD_RAMP);
  if (d <= inner) return 0;
  if (d >= outer) return 1;
  const t = (d - inner) / (outer - inner);
  return t * t * (3 - 2 * t);
}

/** Pushes every existing point away from (cx, cy) by an added area of π·r2. */
export function displace(shapes: Shape[], cx: number, cy: number, r2: number, guard?: Guard) {
  for (const shape of shapes) {
    const pts = shape.pts;
    for (let i = 0; i < pts.length; i += 2) {
      const dx = pts[i] - cx;
      const dy = pts[i + 1] - cy;
      const d2 = dx * dx + dy * dy || 1e-6;
      const f = Math.sqrt(1 + r2 / d2);
      const w = guardWeight(pts[i], pts[i + 1], guard);
      pts[i] = pts[i] + dx * (f - 1) * w;
      pts[i + 1] = pts[i + 1] + dy * (f - 1) * w;
    }
  }
}

/**
 * Lays a new drop of radius r0 on the bath. Grow it afterwards with
 * `displace` at the same centre: the drop's own circle grows with the rest.
 */
export function addDrop(shapes: Shape[], cx: number, cy: number, r0: number, pigment: Pigment, guard?: Guard) {
  displace(shapes, cx, cy, r0 * r0, guard);
  const count = Math.max(24, Math.min(160, Math.round(r0 * 1.2)));
  const shape = {pigment, pts: circle(cx, cy, r0, count)};
  shapes.push(shape);
  return shape;
}

/**
 * A stylus stroke from (x, y) moving by (vx, vy): points are dragged along the
 * stroke, by the full amount on the stylus and falling off over `reach` px.
 */
export function stroke(shapes: Shape[], x: number, y: number, vx: number, vy: number, reach: number, guard?: Guard) {
  for (const shape of shapes) {
    const pts = shape.pts;
    for (let i = 0; i < pts.length; i += 2) {
      const dx = pts[i] - x;
      const dy = pts[i + 1] - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > reach * 4) continue;
      const k = (reach / (d + reach)) ** 2 * guardWeight(pts[i], pts[i + 1], guard);
      pts[i] += vx * k;
      pts[i + 1] += vy * k;
    }
  }
}

/**
 * A straight tine dragged across the whole bath through (x, y) along unit
 * direction (mx, my): the comb that turns stones into waves.
 */
export function tine(
  shapes: Shape[],
  x: number,
  y: number,
  mx: number,
  my: number,
  amount: number,
  sharpness: number,
  guard?: Guard,
) {
  for (const shape of shapes) {
    const pts = shape.pts;
    for (let i = 0; i < pts.length; i += 2) {
      const d = Math.abs((pts[i] - x) * my - (pts[i + 1] - y) * mx);
      const k = (amount * sharpness) / (d + sharpness);
      const w = guardWeight(pts[i], pts[i + 1], guard);
      pts[i] += mx * k * w;
      pts[i + 1] += my * k * w;
    }
  }
}

/**
 * The flower pull: petals drawn outward from the centre along `count` spokes,
 * then curled by a vortex that turns the inner rings further than the outer.
 * Applied in small increments so it can animate.
 */
export function bloom(
  shapes: Shape[],
  guard: Guard,
  count: number,
  pull: number,
  curl: number,
  offset: number,
) {
  for (const shape of shapes) {
    const pts = shape.pts;
    for (let i = 0; i < pts.length; i += 2) {
      const dx = pts[i] - guard.x;
      const dy = pts[i + 1] - guard.y;
      const d = Math.hypot(dx, dy) || 1e-6;
      const w = guardWeight(pts[i], pts[i + 1], guard);
      if (w === 0) continue;
      let a = Math.atan2(dy, dx);
      // Distance to the nearest spoke, as an arc length at this radius.
      const sector = (Math.PI * 2) / count;
      const local = ((((a - offset) % sector) + sector) % sector) - sector / 2;
      const arc = Math.abs(local) * d;
      const width = guard.r * 0.42;
      const reach = Math.exp(-(d - guard.r) / (guard.r * 1.6));
      const grow = pull * Math.exp(-(arc * arc) / (width * width)) * reach * w;
      const nd = d + grow;
      a += curl * (guard.r / (d + guard.r * 0.2)) * w;
      pts[i] = guard.x + Math.cos(a) * nd;
      pts[i + 1] = guard.y + Math.sin(a) * nd;
    }
  }
}

/**
 * Keeps edges short enough to stay smooth as the pigment stretches, within a
 * per-shape vertex budget so a long session cannot run away.
 */
export function refine(shapes: Shape[], maxEdge: number, budget = 2400) {
  const max2 = maxEdge * maxEdge;
  for (const shape of shapes) {
    const pts = shape.pts;
    const n = pts.length / 2;
    if (n >= budget) continue;
    let needs = false;
    for (let i = 0; i < n; i += 1) {
      const j = (i + 1) % n;
      const dx = pts[j * 2] - pts[i * 2];
      const dy = pts[j * 2 + 1] - pts[i * 2 + 1];
      if (dx * dx + dy * dy > max2) {
        needs = true;
        break;
      }
    }
    if (!needs) continue;
    const next: number[] = [];
    for (let i = 0; i < n; i += 1) {
      const j = (i + 1) % n;
      const x0 = pts[i * 2];
      const y0 = pts[i * 2 + 1];
      next.push(x0, y0);
      const dx = pts[j * 2] - x0;
      const dy = pts[j * 2 + 1] - y0;
      const len2 = dx * dx + dy * dy;
      if (len2 > max2 && next.length / 2 < budget) {
        const parts = Math.min(8, Math.ceil(Math.sqrt(len2 / max2)));
        for (let k = 1; k < parts; k += 1) next.push(x0 + (dx * k) / parts, y0 + (dy * k) / parts);
      }
    }
    shape.pts = next;
  }
}

export function paint(
  ctx: CanvasRenderingContext2D,
  shapes: Shape[],
  colors: string[],
  bath: string,
  width: number,
  height: number,
  scale: number,
) {
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.fillStyle = bath;
  ctx.fillRect(0, 0, width, height);
  for (const shape of shapes) {
    const pts = shape.pts;
    if (pts.length < 6) continue;
    ctx.fillStyle = colors[shape.pigment % colors.length];
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
    ctx.closePath();
    ctx.fill();
  }
}

/** Reads a comma-separated colour list from a CSS custom property. */
export function readColors(element: Element, name: string, fallback: string[]) {
  const raw = getComputedStyle(element).getPropertyValue(name).trim();
  if (!raw) return fallback;
  return raw.split(',').map((value) => value.trim()).filter(Boolean);
}

export type StripMotif = 'gelgit' | 'tarakli' | 'battal';

/**
 * A static marbled strip for a sheet's head: poured, combed and painted once.
 * Each motif is a different gesture over the same pigments, so every sheet
 * carries its own pattern while staying in one set.
 */
export function pourStrip(width: number, height: number, motif: StripMotif, seed: number, pigments: number) {
  const random = rng(seed);
  const shapes: Shape[] = [];
  const area = width * height;
  // A small unit still gets a full bath of stones, scaled to fit it.
  const stones = Math.max(16, Math.round(area / (motif === 'battal' ? 900 : 1400)));
  const size = Math.min(1, Math.min(width, height) / 64);
  for (let i = 0; i < stones; i += 1) {
    const r = ((motif === 'battal' ? 10 : 7) + random() * (motif === 'battal' ? 22 : 14)) * size;
    const x = random() * width;
    const y = random() * height;
    addDrop(shapes, x, y, r, i % pigments);
  }
  refine(shapes, 4, 900);
  if (motif === 'gelgit') {
    // Back and forth across the bath, then one wave down it.
    const rows = 4;
    for (let i = 0; i < rows; i += 1) {
      const y = ((i + 0.5) / rows) * height;
      tine(shapes, 0, y, i % 2 ? -1 : 1, 0, width * 0.12, 4);
      refine(shapes, 4, 900);
    }
    const pitch = Math.max(8, 26 * size);
    for (let i = 0, x = 0; x < width; x += pitch, i += 1) {
      tine(shapes, x, 0, 0, i % 2 ? -1 : 1, height * 0.5, 3);
    }
  } else if (motif === 'tarakli') {
    const pitch = Math.max(6, 14 * size);
    for (let i = 0, x = 0; x < width; x += pitch, i += 1) {
      tine(shapes, x, 0, 0, i % 2 ? -1 : 1, height * 0.6, 2);
    }
    refine(shapes, 4, 900);
    tine(shapes, 0, height / 2, 1, 0, width * 0.06, 6);
  }
  refine(shapes, 3, 1200);
  return shapes;
}
