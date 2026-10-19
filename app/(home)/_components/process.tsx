"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Find the signal", desc: "Start with the business problem. Map the user journey, agree on the right scope, and choose a stack that fits." },
  { num: "02", title: "Build in the open", desc: "Work in focused weekly sprints, with a deployable staging demo at the end of each one." },
  { num: "03", title: "Make it ready", desc: "Check the experience across screen sizes, test core flows, and tune performance before launch." },
  { num: "04", title: "Ship & support", desc: "Handle deployment and handover, with documentation and ongoing support to keep the product moving." },
];

const TILES_PER_STEP = 10;
const TRACK = Array.from({ length: steps.length * TILES_PER_STEP }, (_, i) => i);

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const tiles = el.querySelectorAll<HTMLElement>(".track i");
      const items = el.querySelectorAll<HTMLElement>(".step");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.dataset.animated = "true";
        let laid = -1;
        // The track is laid one tile at a time as you read down the steps.
        ScrollTrigger.create({
          trigger: el.querySelector(".steps"),
          start: "top 78%",
          end: "bottom 55%",
          onUpdate: (self) => {
            const n = Math.round(self.progress * tiles.length);
            if (n === laid) return;
            laid = n;
            tiles.forEach((t, i) => { t.dataset.laid = i < n ? "true" : "false"; });
            items.forEach((s, i) => { s.dataset.reached = n > i * TILES_PER_STEP ? "true" : "false"; });
          },
        });
        return () => { delete el.dataset.animated; };
      });
    },
    { scope: root },
  );

  return (
    <section id="process" className="process" ref={root} aria-labelledby="process-title">
      <div className="process-head">
        <h2 id="process-title" className="section-title">How a project runs</h2>
        <p>From first call to production, with something you can click at the end of every week.</p>
      </div>
      <div className="track" aria-hidden="true">
        {TRACK.map((i) => <i key={i} />)}
      </div>
      <ol className="steps">
        {steps.map((step) => (
          <li className="step" key={step.num}>
            <span className="step-num" aria-hidden="true">{step.num}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
