"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "MVPs",
  "SaaS",
  "Dashboards",
  "Web apps",
  "Mobile apps",
  "Payments",
  "Admin panels",
  "Internal tools",
  "APIs",
  "Launch",
];

/**
 * Velocity-reactive marquee — the tape's speed and direction feed off
 * scroll velocity, so flick-scrolling whips the stack past you.
 */
export function MarqueeTape() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tween = gsap.to(".tape-track", {
        xPercent: -50,
        ease: "none",
        duration: 36,
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(-4, 4, self.getVelocity() / 350);
          gsap.to(tween, {
            timeScale: 1 + boost,
            duration: 0.4,
            overwrite: true,
            onComplete: () => {
              gsap.to(tween, { timeScale: 1, duration: 1.2 });
            },
          });
        },
      });
    },
    { scope: root },
  );

  const group = (ariaHidden: boolean) => (
    <div className="tape-group" aria-hidden={ariaHidden}>
      {skills.map((s) => (
        <span key={s} className="tape-item">
          <span className="diamond" />
          {s}
        </span>
      ))}
    </div>
  );

  return (
    <div className="tape" ref={root}>
      <div className="tape-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
