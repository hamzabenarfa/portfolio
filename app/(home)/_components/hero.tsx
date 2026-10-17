"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Asterisk } from "lucide-react";
import { PROJECTS } from "@/data/consts";
import { trackEvent } from "@/lib/track";

const previews = [
  { slug: "beadcraft", name: "BeadCraft Studio", category: "Commerce with a personal touch", color: "sand" },
  { slug: "autopart", name: "AutoParts Tunisia", category: "Car parts that fit, first time", color: "blue" },
  { slug: "menu-qr", name: "Menu QR", category: "From a scan to the kitchen", color: "sage" },
].map((project) => ({ ...project, image: PROJECTS.find((p) => p.slug === project.slug)!.image }));

export function Hero() {
  const [active, setActive] = useState(0);
  const project = previews[active];

  return (
    <section className="intro" id="top" aria-labelledby="intro-title">
      <div className="intro-topline">
        <span className="intro-identity"><span className="little-spark" aria-hidden="true" /> Independent full-stack developer</span>
        <span className="intro-location">Tunis, Tunisia <span aria-hidden="true">↗</span> Working worldwide</span>
      </div>
      <div className="intro-layout">
        <div className="intro-copy">
          <h1 id="intro-title">Big ideas.<br />Built right<span className="title-period">.</span></h1>
          <p>I’m Hamza. I turn ambitious ideas into digital products that feel good to use — and work beautifully under the hood.</p>
          <div className="intro-actions">
            <a href="#work" className="pill-link pill-dark">Explore my work <ArrowDown size={18} aria-hidden="true" /></a>
            <a href="#contact" className="intro-contact">Let’s talk <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <div className="intro-person">
            <Image src="/avatar.jpeg" alt="Hamza Benarfa" width={42} height={42} />
            <span>Design-minded. Engineering-led.<br /><span>One person, from idea to launch.</span></span>
          </div>
        </div>
        <div className="intro-showcase">
          <div className="showcase-orbit" aria-hidden="true" />
          <div className="showcase-stamp" aria-hidden="true"><Asterisk size={70} strokeWidth={1.4} /></div>
          <div className="showcase-note">A little of what I do</div>
          <div className={`showcase-window showcase-${project.color}`}>
            <div className="window-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>Selected project</span><ArrowUpRight size={14} aria-hidden="true" /></div>
            <Link href={`/work/${project.slug}`} className="showcase-image" aria-label={`Explore ${project.name}`} onClick={() => trackEvent("project_card_click", { project: project.name, source: "hero" })}>
              <Image key={project.slug} src={project.image} alt={`${project.name} website preview`} fill sizes="(max-width: 760px) 90vw, 48vw" priority={active === 0} />
              <span className="showcase-open">Explore project <ArrowUpRight size={16} aria-hidden="true" /></span>
            </Link>
            <div className="showcase-caption" aria-live="polite" aria-atomic="true"><strong>{project.name}</strong><span>{project.category}</span></div>
          </div>
          <div className="showcase-controls">
            <div className="showcase-pagination" role="group" aria-label="Choose a project preview">
              {previews.map((p, i) => <button key={p.slug} type="button" aria-label={`Preview ${p.name}`} aria-pressed={active === i} onClick={() => setActive(i)}><span /></button>)}
            </div>
            <div className="showcase-arrows"><button type="button" aria-label="Previous project preview" onClick={() => setActive((active + previews.length - 1) % previews.length)}><ChevronLeft size={19} /></button><button type="button" aria-label="Next project preview" onClick={() => setActive((active + 1) % previews.length)}><ChevronRight size={19} /></button></div>
          </div>
        </div>
      </div>
      <div className="intro-bottom"><span>Thoughtful interfaces. Solid foundations.</span><span className="intro-stack">Next.js <span>/</span> TypeScript <span>/</span> Node.js</span><a href="#work">Scroll to discover <ArrowDown size={16} aria-hidden="true" /></a></div>
    </section>
  );
}
