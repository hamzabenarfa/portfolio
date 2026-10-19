"use client";

import { useRef, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/stage";

gsap.registerPlugin(ScrollTrigger);

/**
 * A paragraph whose words ink in as it is read, scrubbed to scroll.
 * Every word is in the DOM and readable from the start; only its tone moves.
 */
export function ScrollWords({
  as: Tag = "p",
  text,
  className,
}: {
  as?: ElementType;
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const words = ref.current.querySelectorAll<HTMLElement>("[data-word]");
      gsap.fromTo(
        words,
        { opacity: 0.32 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 52%", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  const Comp = Tag as "p";
  return (
    <Comp ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} data-word="">
          {word}{" "}
        </span>
      ))}
    </Comp>
  );
}
