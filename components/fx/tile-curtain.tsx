"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clamp01, easeOutCubic, hexToRgb, jitter, mulberry32 } from "@/lib/tiles";
import { holdStage, prefersReducedMotion, releaseStage } from "@/lib/stage";

/**
 * Full-screen tile curtain for the first visit and for route changes.
 * Tiles drop in along a diagonal sweep, the route changes underneath, and the
 * sweep continues off the other side. Internal links are intercepted in the
 * capture phase, which makes next/link skip its own navigation.
 */
const PITCH = 56;
const GROUT = "#071a47";
const TILES = ["#0a2257", "#0b255e", "#09204f", "#0d2966", "#0a2359"];
const TILE_MS = 240;
const SWEEP_IN_MS = 260;
const SWEEP_OUT_MS = 440;
/** The static CSS curtain lifts itself at 3.5s if scripts are slow; past this, skip the intro. */
const INTRO_DEADLINE_MS = 3300;
const STALL_MS = 4000;

type Phase = "idle" | "covering" | "covered" | "revealing";

export function TileCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onRoute = useRef<(path: string) => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const root = document.documentElement;

    let phase: Phase = "idle";
    let disposed = false;
    /** Pathname a curtained navigation started from; null when nothing is in flight. */
    let pending: string | null = null;
    /** Bumped whenever an in-flight navigation is abandoned (Back, stall). */
    let navId = 0;
    let covering: Promise<void> = Promise.resolve();
    let coveredAt = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let order = new Float32Array(0);
    let colors: string[] = [];
    let rot = new Float32Array(0);
    let raf = 0;
    const timers: number[] = [];

    const show = (on: boolean) => {
      canvas.style.visibility = on ? "visible" : "hidden";
      // Swallow clicks while tiles are up, so nothing underneath is activated blind.
      canvas.style.pointerEvents = on ? "auto" : "none";
    };

    const layout = () => {
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cols = Math.ceil(w / PITCH);
      const rows = Math.ceil(h / PITCH);
      const rand = mulberry32(11);
      const rgb = TILES.map(hexToRgb);
      const n = cols * rows;
      order = new Float32Array(n);
      rot = new Float32Array(n);
      colors = new Array(n);
      for (let i = 0; i < n; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);
        // Bottom-left to top-right, with a little hand-laid irregularity.
        order[i] = clamp01((c / cols + (rows - 1 - r) / rows) / 2 + (rand() - 0.5) * 0.08);
        rot[i] = (rand() - 0.5) * 0.9;
        colors[i] = jitter(rgb[Math.floor(rand() * rgb.length)], rand, 0.04);
      }
    };

    /** `coverage(i)` is each tile's state: 0 gone, 1 fully laid. */
    const paint = (coverage: (i: number) => number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const size = PITCH - 2;
      for (let i = 0; i < order.length; i++) {
        const k = coverage(i);
        if (k <= 0) continue;
        const c = i % cols;
        const r = Math.floor(i / cols);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (k >= 1) {
          ctx.fillStyle = GROUT;
          ctx.fillRect(c * PITCH, r * PITCH, PITCH, PITCH);
          ctx.fillStyle = colors[i];
          ctx.fillRect(c * PITCH + 1, r * PITCH + 1, size, size);
          continue;
        }
        const s = size * (0.35 + 0.65 * k) + 2 * k;
        ctx.globalAlpha = Math.min(1, k * 1.6);
        ctx.translate(c * PITCH + PITCH / 2, r * PITCH + PITCH / 2);
        ctx.rotate(rot[i] * (1 - k));
        ctx.fillStyle = colors[i];
        ctx.fillRect(-s / 2, -s / 2, s, s);
        ctx.globalAlpha = 1;
      }
    };

    const run = (sweep: number, perTile: (i: number, t: number) => number) =>
      new Promise<void>((resolve) => {
        cancelAnimationFrame(raf);
        const startAt = performance.now();
        const frame = (now: number) => {
          const t = now - startAt;
          paint((i) => perTile(i, t));
          if (t < sweep + TILE_MS) raf = requestAnimationFrame(frame);
          else resolve();
        };
        raf = requestAnimationFrame(frame);
      });

    const cover = () => {
      if (phase !== "idle") return covering;
      holdStage();
      phase = "covering";
      layout();
      show(true);
      covering = run(SWEEP_IN_MS, (i, t) => easeOutCubic(clamp01((t - order[i] * SWEEP_IN_MS) / TILE_MS))).then(() => {
        phase = "covered";
        coveredAt = performance.now();
      });
      return covering;
    };

    const reveal = async () => {
      if (phase !== "covered") return;
      phase = "revealing";
      releaseStage();
      await run(SWEEP_OUT_MS, (i, t) => 1 - easeOutCubic(clamp01((t - order[i] * SWEEP_OUT_MS) / TILE_MS)));
      if (disposed) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      show(false);
      root.classList.remove("intro");
      phase = "idle";
    };

    /** Lift once the sweep has landed, giving the new route two frames to paint first. */
    const liftWhenCovered = () => {
      covering.then(() => {
        if (disposed) return;
        raf = requestAnimationFrame(() => { raf = requestAnimationFrame(() => { reveal(); }); });
      });
    };

    onRoute.current = (path) => {
      // Any move away from the origin counts as landing, so redirects lift it too.
      if (pending !== null && path !== pending) {
        pending = null;
        liftWhenCovered();
      }
    };

    // First visit: the static CSS curtain is already up; swap in the canvas and lift it.
    if (root.classList.contains("intro")) {
      if (performance.now() > INTRO_DEADLINE_MS) {
        // Scripts were slow and the CSS curtain has already lifted; don't drop it again.
        root.classList.remove("intro");
        releaseStage();
      } else {
        layout();
        paint(() => 1);
        phase = "covered";
        coveredAt = performance.now();
        show(true);
        root.classList.add("curtain-live");
        try { sessionStorage.setItem("intro-seen", "1"); } catch {}
        const fonts = document.fonts?.ready ?? Promise.resolve();
        Promise.race([fonts, new Promise((r) => setTimeout(r, 700))]).then(() => {
          if (!disposed) timers.push(window.setTimeout(reveal, 120));
        });
      }
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname) || prefersReducedMotion()) return;
      e.preventDefault();
      // A navigation is already under way; ignore extra activations until it lands.
      if (phase !== "idle") return;
      const id = ++navId;
      pending = window.location.pathname;
      const next = url.pathname + url.search + url.hash;
      cover().then(() => {
        if (!disposed && id === navId && pending !== null) router.push(next);
      });
    };

    // Back/Forward while the curtain is coming down: abandon the push and lift over wherever we land.
    const onPop = () => {
      if (phase === "idle" || phase === "revealing") return;
      pending = null;
      navId++;
      liftWhenCovered();
    };

    const onResize = () => { if (phase === "covered") { layout(); paint(() => 1); } };

    // Never leave the curtain down if a navigation stalls or errors.
    const watchdog = window.setInterval(() => {
      if (phase === "covered" && performance.now() - coveredAt > STALL_MS) {
        pending = null;
        navId++;
        reveal();
      }
    }, 500);

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      timers.forEach((t) => window.clearTimeout(t));
      window.clearInterval(watchdog);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      onRoute.current = () => {};
    };
  }, [router]);

  useEffect(() => {
    onRoute.current(pathname);
  }, [pathname]);

  return (
    <>
      <div className="tile-curtain-static" aria-hidden="true" />
      <canvas ref={canvasRef} className="tile-curtain" aria-hidden="true" />
    </>
  );
}
