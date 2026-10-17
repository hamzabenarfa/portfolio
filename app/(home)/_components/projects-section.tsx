"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/consts";
import { trackEvent } from "@/lib/track";

const selection = [
  { slug: "beadcraft", name: "BeadCraft Studio", category: "Interactive commerce", role: "Full-stack development", description: "A bead-by-bead jewelry configurator that turns a personal idea into something you can wear.", tone: "sand" },
  { slug: "autopart", name: "AutoParts Tunisia", category: "Marketplace", role: "Product & engineering", description: "Taking the guesswork out of car parts with vehicle-fit search, verified stock, and a connected order flow.", tone: "blue" },
  { slug: "menu-qr", name: "Menu QR", category: "Restaurant SaaS", role: "Full-stack development", description: "Scan, order, serve. A multilingual platform connecting restaurant tables to a live kitchen dashboard.", tone: "sage" },
];

export function ProjectsSection() {
  return (
    <section id="work" className="project-gallery" aria-labelledby="projects-title">
      <div className="gallery-heading"><div><span className="section-kicker">The work speaks</span><h2 id="projects-title">A few good<br /><em>builds.</em></h2></div><div className="gallery-intro"><p>Different challenges. The same care.<br />A selection of products I’ve helped bring to life.</p><Link href="/work" className="gallery-all">View all projects <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
      <div className="project-grid">
        {selection.map((item) => {
          const project = PROJECTS.find((p) => p.slug === item.slug)!;
          return (
            <Link href={`/work/${item.slug}`} key={item.slug} className={`project-tile project-${item.tone}`} onClick={() => trackEvent("project_card_click", { project: item.name })}>
              <div className="project-canvas"><div className="project-canvas-top"><span>{item.category}</span><span>{project.year}</span></div><div className="project-screenshot"><Image src={project.image} alt={`${item.name} homepage`} fill sizes="(max-width: 760px) 90vw, 43vw" /></div><span className="project-open" aria-hidden="true"><ArrowUpRight size={24} /></span></div>
              <div className="project-heading"><h3>{item.name}</h3><span>{item.role}</span></div>
              <p>{item.description}</p>
            </Link>
          );
        })}
      </div>
      <div className="gallery-outro"><span>From the first interaction to the last detail.</span><a href="#contact">Have something in mind? <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </section>
  );
}
