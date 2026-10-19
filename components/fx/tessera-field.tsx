"use client";

import { useEffect, useRef } from "react";
import { clamp01, easeInOutSine, hexToRgb, jitter, mulberry32, type RGB } from "@/lib/tiles";
import { prefersReducedMotion, whenStageReady } from "@/lib/stage";

/**
 * A wall of mosaic tiles. At rest it reads as a quiet tiled surface; the
 * pointer flips tiles over to uncover a hidden eight-point star pattern
 * (the khatam found across Tunisian tilework), which settles back after a
 * moment. Only flipping tiles are redrawn, and the loop sleeps off-screen.
 */
export interface TesseraPalette {
  grout: string;
  /** Resting tile colours, picked at random per tile. */
  rest: string[];
  /** Hidden pattern layers, back to front. */
  field: string;
  star: string;
  core: string;
  bloom: string;
  knot: string;
}

/** Limewashed wall over a Sidi Bou Said blue pattern. */
export const WALL: TesseraPalette = {
  grout: "#e1e3dc",
  rest: ["#f2f3ef", "#f0f1ec", "#f4f5f1", "#eef0ea"],
  field: "#1a4fc4",
  star: "#f4f5f1",
  core: "#e8a93a",
  bloom: "#c7387a",
  knot: "#0a2257",
};

/** Door-blue wall over a night pattern, for the closing section. */
export const DOOR: TesseraPalette = {
  grout: "#1542a8",
  rest: ["#1a4fc4", "#1b52c9", "#184bbb", "#1d55cc", "#194dbf"],
  field: "#0a2257",
  star: "#f4f5f1",
  core: "#e8a93a",
  bloom: "#c7387a",
  knot: "#8fb3ee",
};

const REST = 0;
const IN = 1;
const HOLD = 2;
const OUT = 3;
const FLIP_MS = 440;

const pitchFor = (w: number) => (w < 640 ? 14 : w < 1200 ? 16 : 18);
const periodFor = (w: number) => (w < 640 ? 10 : 12);

/** Rasterise the star lattice at one pixel per tile, then snap every tile to a pure palette colour. */
function buildPattern(cols: number, rows: number, period: number, colors: string[]) {
  const c = document.createElement("canvas");
  c.width = cols;
  c.height = rows;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, cols, rows);
  const square = (x: number, y: number, side: number, angle: number, color: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.fillRect(-side / 2, -side / 2, side, side);
    ctx.restore();
  };
  const ox = ((cols % period) + period) / 2;
  const oy = ((rows % period) + period) / 2;
  for (let y = oy - period; y < rows + period; y += period) {
    for (let x = ox - period; x < cols + period; x += period) {
      square(x, y, period * 0.64, 0, colors[1]);
      square(x, y, period * 0.64, Math.PI / 4, colors[1]);
      square(x, y, period * 0.36, 0, colors[2]);
      square(x, y, period * 0.36, Math.PI / 4, colors[2]);
      square(x, y, period * 0.15, Math.PI / 4, colors[3]);
      square(x + period / 2, y + period / 2, period * 0.26, Math.PI / 4, colors[4]);
    }
  }
  const data = ctx.getImageData(0, 0, cols, rows).data;
  const rgb = colors.map(hexToRgb);
  const out = new Uint8Array(cols * rows);
  for (let i = 0; i < out.length; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    let best = 0;
    let bestD = Infinity;
    rgb.forEach(([pr, pg, pb], k) => {
      const d = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
      if (d < bestD) { bestD = d; best = k; }
    });
    out[i] = best;
  }
  return out;
}

export function TesseraField({
  palette,
  className,
  intro = true,
  seed = 7,
}: {
  palette: TesseraPalette;
  className?: string;
  /** Sweep a wave across the wall once the stage is visible, to show it's alive. */
  intro?: boolean;
  seed?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const still = prefersReducedMotion();
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let dpr = 1;
    let pitch = 18;
    let size = 16;
    let cols = 0;
    let rows = 0;
    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let rot = new Float32Array(0);
    let rest: string[] = [];
    let reveal: string[] = [];
    let state = new Uint8Array(0);
    let t0 = new Float64Array(0);
    let holdUntil = new Float64Array(0);
    let holdFor = new Float32Array(0);
    const animating = new Set<number>();
    const holding = new Set<number>();
    let raf = 0;
    let visible = true;
    let lastPointer: [number, number] | null = null;
    let rand = mulberry32(seed);

    const drawTile = (i: number, f: number) => {
      const cx = x[i];
      const cy = y[i];
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = palette.grout;
      const gx = Math.floor((i % cols) * pitch);
      const gy = Math.floor(Math.floor(i / cols) * pitch);
      ctx.fillRect(gx, gy, Math.ceil(pitch), Math.ceil(pitch));
      // A flip is a squash on X with a slight lift on Y and shading at the edge-on midpoint.
      const sx = Math.max(0.04, Math.abs(Math.cos(f * Math.PI)));
      const lift = Math.sin(f * Math.PI);
      const ky = 1 + 0.06 * lift;
      const cos = Math.cos(rot[i]);
      const sin = Math.sin(rot[i]);
      ctx.setTransform(dpr * cos * sx, dpr * sin * sx, -dpr * sin * ky, dpr * cos * ky, dpr * cx, dpr * cy);
      ctx.fillStyle = f < 0.5 ? rest[i] : reveal[i];
      ctx.fillRect(-size / 2, -size / 2, size, size);
      if (lift > 0.02) {
        ctx.globalAlpha = 0.3 * (1 - sx);
        ctx.fillStyle = "#000";
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.globalAlpha = 1;
      }
    };

    const layout = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      pitch = pitchFor(w);
      size = pitch - 2;
      cols = Math.ceil(w / pitch) + 1;
      rows = Math.ceil(h / pitch) + 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const n = cols * rows;
      rand = mulberry32(seed);
      x = new Float32Array(n);
      y = new Float32Array(n);
      rot = new Float32Array(n);
      state = new Uint8Array(n);
      t0 = new Float64Array(n);
      holdUntil = new Float64Array(n);
      holdFor = new Float32Array(n);
      animating.clear();
      holding.clear();
      const restRgb = palette.rest.map(hexToRgb);
      const layers = [palette.field, palette.star, palette.core, palette.bloom, palette.knot];
      const layerRgb: RGB[] = layers.map(hexToRgb);
      const pattern = buildPattern(cols, rows, periodFor(w), layers);
      rest = new Array(n);
      reveal = new Array(n);
      for (let i = 0; i < n; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);
        x[i] = c * pitch + pitch / 2 + (rand() - 0.5) * 0.6;
        y[i] = r * pitch + pitch / 2 + (rand() - 0.5) * 0.6;
        rot[i] = (rand() - 0.5) * 0.07;
        rest[i] = jitter(restRgb[Math.floor(rand() * restRgb.length)], rand, 0.008);
        reveal[i] = jitter(layerRgb[pattern[i]], rand, 0.05);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = palette.grout;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < n; i++) drawTile(i, 0);
    };

    const tick = (now: number) => {
      raf = 0;
      for (const i of animating) {
        const p = (now - t0[i]) / FLIP_MS;
        if (p < 0) continue;
        if (state[i] === IN) {
          if (p >= 1) {
            drawTile(i, 1);
            animating.delete(i);
            state[i] = HOLD;
            holdUntil[i] = now + holdFor[i];
            holding.add(i);
          } else drawTile(i, easeInOutSine(p));
        } else if (p >= 1) {
          drawTile(i, 0);
          animating.delete(i);
          state[i] = REST;
        } else drawTile(i, 1 - easeInOutSine(p));
      }
      for (const i of holding) {
        if (now >= holdUntil[i]) {
          holding.delete(i);
          state[i] = OUT;
          t0[i] = now + Math.random() * 90;
          animating.add(i);
        }
      }
      if (animating.size || holding.size) wake();
    };

    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    /** Flip tile `i` to its hidden face, starting at `start`, and keep it there for `hold` ms. */
    const flip = (i: number, start: number, hold: number, now: number) => {
      const s = state[i];
      if (s === REST) {
        state[i] = IN;
        t0[i] = start;
        holdFor[i] = hold;
        animating.add(i);
      } else if (s === HOLD) {
        holdUntil[i] = Math.max(holdUntil[i], now + hold);
      } else if (s === OUT) {
        // Reverse mid-flip from where the tile visibly is, instead of restarting.
        const p = clamp01((now - t0[i]) / FLIP_MS);
        state[i] = IN;
        t0[i] = now - (1 - p) * FLIP_MS;
        holdFor[i] = hold;
      }
    };

    const brush = (px: number, py: number, radius: number) => {
      const now = performance.now();
      const reach = Math.ceil(radius / pitch);
      const c0 = Math.floor(px / pitch);
      const r0 = Math.floor(py / pitch);
      for (let dy = -reach; dy <= reach; dy++) {
        const r = r0 + dy;
        if (r < 0 || r >= rows) continue;
        for (let dx = -reach; dx <= reach; dx++) {
          const c = c0 + dx;
          if (c < 0 || c >= cols) continue;
          const i = r * cols + c;
          const d = Math.hypot(x[i] - px, y[i] - py);
          if (d > radius) continue;
          flip(i, now + d * 2.2, 1500 + Math.random() * 1100, now);
        }
      }
      wake();
    };

    const wave = (ox: number, oy: number, speed: number) => {
      const now = performance.now();
      for (let i = 0; i < x.length; i++) {
        const d = Math.hypot(x[i] - ox, y[i] - oy);
        flip(i, now + d / speed + Math.random() * 60, 140 + Math.random() * 220, now);
      }
      wake();
    };

    layout();
    if (still) {
      const ro = new ResizeObserver(() => layout());
      ro.observe(host);
      return () => ro.disconnect();
    }

    const local = (e: PointerEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top];
    };
    let interacted = false;
    const onMove = (e: PointerEvent) => {
      const [px, py] = local(e);
      const radius = pitch * (coarse ? 3.4 : 3);
      // Fast strokes skip tiles; fill the gap between samples.
      if (lastPointer) {
        const [lx, ly] = lastPointer;
        const dist = Math.hypot(px - lx, py - ly);
        const steps = Math.min(24, Math.floor(dist / (pitch * 1.5)));
        for (let s = 1; s <= steps; s++) brush(lx + ((px - lx) * s) / (steps + 1), ly + ((py - ly) * s) / (steps + 1), radius);
      }
      brush(px, py, radius);
      lastPointer = [px, py];
    };
    const onDown = (e: PointerEvent) => {
      interacted = true;
      const [px, py] = local(e);
      brush(px, py, pitch * 4.5);
      lastPointer = [px, py];
    };
    const onLeave = () => { lastPointer = null; };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerdown", onDown, { passive: true });
    host.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && (animating.size || holding.size)) wake();
    });
    io.observe(canvas);

    let resizeTimer = 0;
    let lastW = host.clientWidth;
    let lastH = host.clientHeight;
    const ro = new ResizeObserver(() => {
      if (host.clientWidth === lastW && host.clientHeight === lastH) return;
      lastW = host.clientWidth;
      lastH = host.clientHeight;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(layout, 140);
    });
    ro.observe(host);

    const timers: number[] = [];
    const unsubscribe = intro
      ? whenStageReady(() => {
          timers.push(window.setTimeout(() => wave(host.clientWidth * 0.12, host.clientHeight * 0.78, 1.5), 260));
          if (coarse) {
            // Touch has no hover: a few slow ripples show the wall responds, then it rests.
            [4600, 9200, 13800].forEach((ms) =>
              timers.push(window.setTimeout(() => {
                if (!interacted && visible) brush(host.clientWidth * (0.2 + Math.random() * 0.6), host.clientHeight * (0.15 + Math.random() * 0.4), pitch * 5);
              }, ms)),
            );
          }
        })
      : () => {};

    return () => {
      unsubscribe();
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [palette, intro, seed]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
