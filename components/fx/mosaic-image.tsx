"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { easeOutCubic } from "@/lib/tiles";
import { prefersReducedMotion, whenStageReady } from "@/lib/stage";

gsap.registerPlugin(ScrollTrigger);

/** Finest mosaic step before handing over to the real image. */
const MIN_CELL = 5;

/**
 * An image that is laid as coarse tesserae and resolves into the real
 * screenshot as it scrolls into place. Progress is scrubbed to scroll, so it
 * never makes anyone wait: stop scrolling and the image stops resolving.
 * The mosaic is sampled from the optimised <Image> itself (no second download),
 * drawn as one upscaled bitmap with a repeating grout pattern on top.
 */
export function MosaicImage({
  src,
  alt,
  sizes,
  priority,
  className,
  grout = "rgba(0,0,0,.18)",
  coarseness = 20,
  start = "top 92%",
  end = "top 30%",
  objectPosition = "top",
  play = "scroll",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Colour between tiles while the image is still a mosaic. */
  grout?: string;
  /** Number of tiles across at the coarsest step. */
  coarseness?: number;
  start?: string;
  end?: string;
  objectPosition?: "top" | "center";
  /** "scroll" scrubs with scroll; "load" resolves once on arrival, for images above the fold. */
  play?: "scroll" | "load";
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = wrap.current;
      const cv = canvas.current;
      const photo = el?.querySelector("img");
      if (!el || !cv || !photo || prefersReducedMotion()) return;
      const ctx = cv.getContext("2d");
      const sample = document.createElement("canvas");
      const sctx = sample.getContext("2d");
      if (!ctx || !sctx) return;

      const patterns = new Map<string, CanvasPattern | null>();
      const groutPattern = (cell: number, gap: number) => {
        const key = `${cell}:${gap}`;
        if (!patterns.has(key)) {
          const tile = document.createElement("canvas");
          tile.width = cell;
          tile.height = cell;
          const t = tile.getContext("2d")!;
          t.fillStyle = grout;
          t.fillRect(0, 0, cell, gap);
          t.fillRect(0, 0, gap, cell);
          patterns.set(key, ctx.createPattern(tile, "repeat"));
        }
        return patterns.get(key)!;
      };

      let progress = 0;
      let lastCell = -1;
      let w = 0;
      let h = 0;
      let dpr = 1;

      const measure = () => {
        w = el.clientWidth;
        h = el.clientHeight;
        dpr = Math.min(2, window.devicePixelRatio || 1);
        cv.width = Math.round(w * dpr);
        cv.height = Math.round(h * dpr);
        lastCell = -1;
      };

      const draw = () => {
        if (!photo.complete || !photo.naturalWidth || !w || !h) return;
        const maxCell = w / coarseness;
        const cell = Math.round(maxCell + (MIN_CELL - 1 - maxCell) * easeOutCubic(progress));
        const done = cell < MIN_CELL;
        el.dataset.resolved = done ? "true" : "false";
        if (done || cell === lastCell) return;
        lastCell = cell;

        // Crop like object-fit: cover, anchored the same way as the <Image>.
        const iw = photo.naturalWidth;
        const ih = photo.naturalHeight;
        const scale = Math.max(w / iw, h / ih);
        const sw = w / scale;
        const sh = h / scale;
        const sx = (iw - sw) / 2;
        const sy = objectPosition === "top" ? 0 : (ih - sh) / 2;
        const gw = Math.ceil(w / cell);
        const gh = Math.ceil(h / cell);
        sample.width = gw;
        sample.height = gh;
        sctx.drawImage(photo, sx, sy, sw, sh, 0, 0, gw, gh);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(sample, 0, 0, gw * cell, gh * cell);
        const gap = cell >= 14 ? 2 : cell >= 7 ? 1 : 0;
        if (gap) {
          ctx.fillStyle = groutPattern(cell, gap);
          ctx.fillRect(0, 0, w, h);
        }
      };

      measure();
      const onLoad = () => { lastCell = -1; draw(); };
      photo.addEventListener("load", onLoad);

      let unsubscribe = () => {};
      if (play === "load" && contextSafe) {
        // Above the fold: resolve once as the page arrives instead of waiting for scroll.
        const state = { p: 0 };
        unsubscribe = whenStageReady(contextSafe(() => {
          gsap.to(state, {
            p: 1,
            duration: 1.8,
            delay: 0.35,
            ease: "power2.inOut",
            onUpdate: () => { progress = state.p; draw(); },
          });
        }));
        draw();
      } else {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start,
          end,
          scrub: true,
          onUpdate: (self) => { progress = self.progress; draw(); },
          onRefresh: (self) => { measure(); progress = self.progress; draw(); },
        });
        progress = trigger.progress;
        draw();
      }

      const ro = new ResizeObserver(() => { measure(); draw(); });
      ro.observe(el);
      return () => {
        unsubscribe();
        ro.disconnect();
        photo.removeEventListener("load", onLoad);
        delete el.dataset.resolved;
      };
    },
    { scope: wrap, dependencies: [src, play] },
  );

  return (
    <div ref={wrap} className={`mosaic-image${className ? ` ${className}` : ""}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={85} style={{ objectFit: "cover", objectPosition }} />
      <canvas ref={canvas} aria-hidden="true" />
    </div>
  );
}
