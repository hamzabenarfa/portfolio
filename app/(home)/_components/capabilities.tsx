"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHead } from "./section-head";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    glyph: "mvp",
    title: "Product MVP Build",
    desc: "For founders who need a working SaaS, dashboard, marketplace, or internal tool — from idea to launch. I handle scope, architecture, frontend, backend, auth, payments, storage, and deployment.",
    tags: ["Scoping", "Architecture", "Auth & Payments", "Deployment"],
  },
  {
    num: "02",
    glyph: "saas",
    title: "SaaS Platform Development",
    desc: "For businesses that need a real multi-user platform. Multi-role access, admin panels, analytics, file storage, billing, and scalable architecture — not just a website.",
    tags: ["Multi-tenant", "Admin Panels", "Billing", "Analytics"],
  },
  {
    num: "03",
    glyph: "canvas",
    title: "Custom Editors & Visual Tools",
    desc: "Canvas-based product customizers, Canva-style editors, mockup generators, and image manipulation tools. Konva.js and Fabric.js specialist — this is a genuine differentiator.",
    tags: ["Konva.js", "Fabric.js", "Customizers", "Image Pipelines"],
  },
  {
    num: "04",
    glyph: "ops",
    title: "DevOps & Launch Infrastructure",
    desc: "Docker, GitHub Actions CI/CD, Nginx, cloud deployment, monitoring, and security hardening. For teams that need production stability handled without a dedicated ops hire.",
    tags: ["Docker", "CI/CD", "Nginx", "Monitoring"],
  },
];

/**
 * Deck of sticky panels: each card pins below the nav while the next
 * one slides over it; the buried card recedes — scaling down and
 * dimming — like sheets stacking on a desk.
 */
export function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: next,
              // begin dimming only once the next card has climbed past the
              // midline (the current card has been read by then), and finish
              // quickly as it locks under the nav — short, late, snappy.
              start: "top 60%",
              end: "top top+=120",
              scrub: 0.6,
            },
          })
          .to(card, { scale: 0.95, filter: "brightness(0.66)", ease: "none" }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section id="services" className="section container" ref={root}>
      <SectionHead
        index="02"
        label="Services"
        title={
          <>
            What I <em>build</em>
          </>
        }
        meta={<>04 areas of practice</>}
      />

      <div className="stack-cards">
        {services.map((s) => (
          <article key={s.num} className="stack-card">
            <span className="stack-num">( {s.num} )</span>
            <div className="stack-body">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="stack-tags">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <span className="stack-glyph" aria-hidden="true">
              {s.glyph}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
