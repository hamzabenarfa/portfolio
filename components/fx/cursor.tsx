"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Two-layer cursor: an instant accent dot plus a lagging ring that
 * morphs into a filled "VIEW" badge over elements tagged data-cursor.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || !dot.current || !ring.current) return;

    gsap.set([dot.current, ring.current], { xPercent: 0, yPercent: 0, autoAlpha: 0 });

    const dotX = gsap.quickSetter(dot.current, "x", "px");
    const dotY = gsap.quickSetter(dot.current, "y", "px");
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
        ringX(e.clientX, e.clientX);
        ringY(e.clientY, e.clientY);
        visible = true;
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor], a, button, [role='button']",
      );
      const mode = target?.dataset.cursor ?? (target ? "hover" : "default");
      ring.current!.dataset.state = mode;
      if (label.current && target?.dataset.cursorLabel) {
        label.current.textContent = target.dataset.cursorLabel;
      }
    };

    const onLeave = () => {
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
      visible = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  });

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" data-state="default" aria-hidden="true">
        <span ref={label} className="cursor-label">
          View
        </span>
      </div>
    </>
  );
}
