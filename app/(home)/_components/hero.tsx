"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "@/components/fx/magnetic";
import { BookCall } from "@/components/fx/book-call";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // cursor-tracked accent light — premium, lightweight, directs the eye
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (fine && !reduced && glow.current && root.current) {
        const g = glow.current;
        gsap.set(g, { xPercent: -50, yPercent: -50 });
        const xTo = gsap.quickTo(g, "x", { duration: 1, ease: "power3.out" });
        const yTo = gsap.quickTo(g, "y", { duration: 1, ease: "power3.out" });
        const r0 = root.current.getBoundingClientRect();
        xTo(r0.width * 0.68);
        yTo(r0.height * 0.42);
        const onMove = (e: PointerEvent) => {
          const r = root.current!.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        };
        root.current.addEventListener("pointermove", onMove);
        return () => root.current?.removeEventListener("pointermove", onMove);
      }
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out", force3D: true } });

        tl
          // backdrop wakes up — fade only (no scale: scaling a blurred layer
          // re-rasterizes every frame and is what made the intro feel laggy)
          .fromTo(
            ".hero-glow",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1.3, ease: "power2.out" },
            0,
          )
          .fromTo(
            ".hero-grid",
            { autoAlpha: 0 },
            { autoAlpha: 0.55, duration: 1.3, ease: "power2.out" },
            0,
          )
          // each word sweeps up out of its own clipping mask — pure transform,
          // compositor-friendly, no per-frame repaint
          .fromTo(
            ".h-inner",
            { yPercent: 120 },
            { yPercent: 0, duration: 1.15, stagger: 0.13 },
            0.05,
          )
          // accent line lands with a touch of overshoot — scale only, so it
          // composes with the mask rise instead of re-hiding the line
          .fromTo(
            ".hero-title em",
            { scale: 0.9, transformOrigin: "0% 50%" },
            { scale: 1, duration: 0.9, ease: "back.out(1.5)" },
            "-=0.55",
          )
          .fromTo(
            [".hero-bio", ".hero-ctas"],
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.1 },
            "-=0.55",
          )
          .fromTo(
            ".hero-scroll",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.7 },
            "-=0.3",
          );
      };

      // Play the intro on mount. useGSAP runs in a layout effect, so the
      // .fromTo() from-states are applied before paint — no flash of the final
      // text. We only ever animate hidden→visible and never persistently hide
      // anything, so the hero can't get stranded invisible.
      play();

      // cinematic exit: hero sinks and dims as the next act scrolls over
      gsap.to(".hero-content", {
        yPercent: -12,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom 35%",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow" ref={glow} />
      </div>

      <div className="hero-content container">
        <h1 className="hero-title">
          <span className="h-line">
            <span className="h-inner">Design.</span>
          </span>
          <span className="h-line">
            <span className="h-inner h-outline">Build.</span>
          </span>
          <span className="h-line">
            <span className="h-inner">
              <em>Ship it.</em>
            </span>
          </span>
        </h1>

        <div className="hero-foot">
          <p className="hero-bio">
            I take SaaS products, dashboards and web platforms from{" "}
            <strong>blank page to production</strong> — design, code, infrastructure
            and launch. <strong>One person, start to finish.</strong>
          </p>
          <div className="hero-ctas">
            <Magnetic>
              <BookCall className="btn btn-solid" data-cursor="hover">
                Book a call <span className="arr">→</span>
              </BookCall>
            </Magnetic>
            <Magnetic>
              <a href="#work" className="btn">
                See work <span className="arr">↓</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="scroll-line" />
        <span className="mono">Scroll</span>
      </div>
    </section>
  );
}
