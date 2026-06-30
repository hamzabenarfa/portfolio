"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Masked line reveal — splits text into lines, each rising out of its
 * own clipping mask when scrolled into view.
 */
export function TextReveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  start = "top 88%",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || reducedMotion()) return;

      SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "will-reveal",
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.1,
            stagger: 0.09,
            ease: "power4.out",
            delay,
            scrollTrigger: {
              trigger: ref.current,
              start,
              once: true,
            },
          }),
      });
    },
    { scope: ref },
  );

  const Comp = Tag as "div";
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Comp>
  );
}

/**
 * Soft rise-and-fade for blocks. Set `stagger` to animate direct
 * children as a cascade instead of the wrapper.
 */
export function FadeUp({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  y = 36,
  stagger,
  start = "top 88%",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || reducedMotion()) return;

      const targets =
        stagger !== undefined ? Array.from(ref.current.children) : ref.current;

      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 1,
        delay,
        stagger,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      });
    },
    { scope: ref },
  );

  const Comp = Tag as "div";
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Comp>
  );
}
