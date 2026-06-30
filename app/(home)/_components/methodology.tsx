"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHead } from "./section-head";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discovery & planning",
    desc: "Every project starts with the business problem. I map user flows, define the stack, and create a clear roadmap before any code. Reduces scope creep, aligns expectations.",
  },
  {
    num: "02",
    title: "Iterative builds",
    desc: "Weekly sprints in Next.js and TypeScript — chosen for type safety and performance. Each sprint ends with a deployable demo on staging so you watch progress in real time.",
  },
  {
    num: "03",
    title: "Quality & speed",
    desc: "Every feature ships with automated tests, responsive checks, and Lighthouse audits. Projects consistently score 90+ on Core Web Vitals.",
  },
  {
    num: "04",
    title: "Launch & support",
    desc: "I handle the full deploy pipeline — Docker, GitHub Actions CI/CD, monitoring. Post‑launch documentation and ongoing support keep things running.",
  },
];

/**
 * Cinematic chapter scroll: on desktop the section pins and vertical
 * scroll is translated into a horizontal journey through the four
 * phases, with a progress filament tracking position. Mobile and
 * reduced-motion fall back to a vertical stack.
 */
export function Methodology() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>(".process-track")!;
        const bar = root.current!.querySelector<HTMLElement>(".process-progress-bar")!;
        const panels = gsap.utils.toArray<HTMLElement>(".process-panel");

        const distance = () => track.scrollWidth - window.innerWidth + 2 * 24;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current!.querySelector(".process-pin"),
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(bar, { scaleX: self.progress });
              const idx = Math.min(
                panels.length - 1,
                Math.floor(self.progress * panels.length),
              );
              panels.forEach((p, i) => p.classList.toggle("is-active", i <= idx));
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    },
    { scope: root },
  );

  return (
    <section id="process" className="section process-section" ref={root}>
      <div className="container">
        <SectionHead
          index="03"
          label="Process"
          title={
            <>
              How I <em>work</em>
            </>
          }
          meta={
            <>
              First call → production
              <br />
              Transparent at each step
            </>
          }
        />
      </div>

      <div className="process-pin">
        <div className="process-track">
          {steps.map((s) => (
            <article key={s.num} className="process-panel">
              <span className="big-num">{s.num}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="process-progress">
          <div className="process-progress-bar" />
        </div>
      </div>
    </section>
  );
}
