"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/stage";

/**
 * A tile-shaped label that trails the pointer over anything tagged with
 * `data-cursor-label`, naming what a click will open. The native cursor stays
 * visible; this only adds context over large visual targets like screenshots.
 */
export function CursorBadge() {
  const badge = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = badge.current;
    if (!el || !hasFinePointer()) return;
    const still = prefersReducedMotion();
    const xTo = gsap.quickTo(el, "x", { duration: still ? 0 : 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: still ? 0 : 0.5, ease: "power3.out" });
    let active: Element | null = null;

    const onMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.("[data-cursor-label]") ?? null;
      if (target !== active) {
        active = target;
        if (target && label.current) label.current.textContent = target.getAttribute("data-cursor-label");
        if (target) {
          // Appear where the pointer is rather than gliding in from the last spot.
          gsap.set(el, { x: e.clientX, y: e.clientY });
          xTo(e.clientX, e.clientX);
          yTo(e.clientY, e.clientY);
        }
        el.dataset.visible = target ? "true" : "false";
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onLeave = () => { active = null; el.dataset.visible = "false"; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onLeave);
    };
  }, []);

  return (
    <div ref={badge} className="cursor-badge" data-visible="false" aria-hidden="true">
      <span ref={label} />
    </div>
  );
}
