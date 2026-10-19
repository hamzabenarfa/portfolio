/** Small helpers shared by every tessera (mosaic tile) canvas. */

export type RGB = [number, number, number];

export function hexToRgb(hex: string): RGB {
  const v = hex.replace("#", "");
  const n = parseInt(v.length === 3 ? v.split("").map((c) => c + c).join("") : v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Deterministic PRNG so a wall keeps the same hand-laid look across re-layouts. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Real tesserae are never perfectly uniform: nudge lightness by ±amount. */
export function jitter([r, g, b]: RGB, rand: () => number, amount = 0.05): string {
  const k = 1 + (rand() - 0.5) * 2 * amount;
  const c = (x: number) => Math.max(0, Math.min(255, Math.round(x * k)));
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const easeInOutSine = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
