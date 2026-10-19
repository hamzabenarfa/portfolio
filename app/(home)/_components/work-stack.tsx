"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/data/consts";
import { trackEvent } from "@/lib/track";
import { MosaicImage } from "@/components/fx/mosaic-image";

gsap.registerPlugin(ScrollTrigger);

const selection = [
  { slug: "beadcraft", name: "BeadCraft Studio", category: "Interactive commerce", role: "Full-stack development", description: "A bead-by-bead jewelry configurator that turns a personal idea into something you can wear.", tone: "saffron", grout: "#c88e26" },
  { slug: "autopart", name: "AutoParts Tunisia", category: "Marketplace", role: "Product & engineering", description: "Taking the guesswork out of car parts with vehicle-fit search, verified stock, and a connected order flow.", tone: "sidi", grout: "#1542a8" },
  { slug: "menu-qr", name: "Menu QR", category: "Restaurant SaaS", role: "Full-stack development", description: "Scan, order, serve. A multilingual platform connecting restaurant tables to a live kitchen dashboard.", tone: "night", grout: "#071a47" },
];

export function WorkStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel", root.current);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        panels.forEach((panel) => {
          // Each title stretches open as its screenshot resolves.
          gsap.fromTo(
            panel.querySelector(".panel-title"),
            { "--wdth": 78 },
            { "--wdth": 125, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "top 20%", scrub: true } },
          );
        });
      });
      mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
        // Panels are sticky; as the next one slides over, the current one sinks back.
        panels.slice(0, -1).forEach((panel, i) => {
          gsap.to(panel.querySelector(".panel-inner"), {
            scale: 0.9,
            "--dim": 0.6,
            ease: "none",
            scrollTrigger: { trigger: panels[i + 1], start: "top bottom", end: "top top", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="work" className="work" ref={root} aria-labelledby="work-title">
      <div className="work-head">
        <h2 id="work-title" className="section-title">Selected work</h2>
        <p>Three recent builds, from a bead-by-bead jewelry configurator to a car-parts marketplace and a restaurant ordering platform.</p>
        <Link href="/work" className="text-link">All projects</Link>
      </div>
      <div className="panels">
        {selection.map((item) => {
          const project = PROJECTS.find((p) => p.slug === item.slug)!;
          const href = `/work/${item.slug}`;
          const track = () => trackEvent("project_card_click", { project: item.name });
          return (
            <article key={item.slug} className={`panel panel-${item.tone}`} aria-labelledby={`panel-${item.slug}`}>
              <div className="panel-inner">
                <header className="panel-head">
                  <h3 id={`panel-${item.slug}`} className="panel-title">{item.name}</h3>
                  <p className="panel-meta"><span>{item.category}</span><span>{project.year}</span></p>
                </header>
                <div className="panel-frame">
                  <Link href={href} className="panel-media" tabIndex={-1} aria-hidden="true" data-cursor-label="View case study" onClick={track}>
                    <MosaicImage
                      src={project.image}
                      alt={`${item.name} homepage`}
                      sizes="(max-width: 860px) 92vw, 66vw"
                      grout={item.grout}
                      start="top 95%"
                      end="top 28%"
                    />
                  </Link>
                </div>
                <div className="panel-info">
                  <p className="panel-desc">{item.description}</p>
                  <dl className="panel-facts">
                    <div><dt>Role</dt><dd>{item.role}</dd></div>
                    <div><dt>Built with</dt><dd>{project.tech.slice(0, 4).join(", ")}</dd></div>
                  </dl>
                  <div className="panel-links">
                    <Link href={href} className="button button-panel" onClick={track}>View case study</Link>
                    <a href={project.url} target="_blank" rel="noreferrer" className="text-link">Live site <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span></a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
