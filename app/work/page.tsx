import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/consts";
import { PROJECT_CONTENT } from "@/data/project-content";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SubpageNav } from "@/components/subpage-nav";
import { Footer } from "@/app/(home)/_components/footer";
import "@/app/(home)/portfolio.css";
import "@/app/(home)/_components/supporting-sections.css";
import "@/app/subpage.css";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com";
const baseUrl = SITE_URL.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Case studies and projects by Hamza Benarfa — SaaS platforms, e-commerce builds, and custom web tools designed and shipped end to end.",
  alternates: { canonical: `${baseUrl}/work` },
  openGraph: {
    title: "Selected Work | Hamza Benarfa",
    description:
      "Case studies and projects — SaaS platforms, e-commerce, and custom web tools built end to end.",
    url: `${baseUrl}/work`,
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Hamza Benarfa — Work" }],
  },
};

const tones = ["sand", "blue", "sage", "rose"];

export default function WorkPage() {
  const projects = PROJECTS.filter((p) => p.listed !== false && PROJECT_CONTENT[p.slug]);

  return (
    <div className="portfolio-v2 subpage-v2">
      <SubpageNav />

      <main id="main-content">
        <section className="subpage-intro" id="top" aria-labelledby="work-title">
          <div className="subpage-intro-inner">
            <span className="intro-identity"><span className="little-spark" aria-hidden="true" /> Index — projects &amp; case studies</span>
            <h1 id="work-title">All work<span className="title-period">.</span></h1>
            <p>
              A closer look at products I&rsquo;ve designed, built, and shipped — from
              first scope to production. Each one taken from blank page to live, by one
              person.
            </p>
          </div>
        </section>

        <section className="project-gallery work-gallery" aria-label="Projects">
          <div className="project-grid">
            {projects.map((p, i) => {
              const c = PROJECT_CONTENT[p.slug];
              return (
                <article key={p.slug} className={`project-tile project-${tones[i % tones.length]}`}>
                  <Link href={`/work/${p.slug}`} className="project-canvas" aria-label={`${c.title} — case study`}>
                    <div className="project-canvas-top"><span>{c.category}</span><span>{p.year}</span></div>
                    <div className="project-screenshot"><Image src={p.image} alt="" fill sizes="(max-width: 760px) 90vw, 43vw" /></div>
                    <span className="project-open" aria-hidden="true"><ArrowUpRight size={24} /></span>
                  </Link>
                  <div className="project-heading"><h2>{c.title}</h2><span>/{String(i + 1).padStart(2, "0")}</span></div>
                  <p>{c.description}</p>
                  <ul className="work-tags" aria-label="Tech stack">
                    {p.tech.slice(0, 6).map((t) => <li key={t}>{t}</li>)}
                  </ul>
                  <div className="work-links">
                    <Link href={`/work/${p.slug}`}>Case study <ArrowRight size={16} aria-hidden="true" /></Link>
                    {p.url && <a href={p.url} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={16} aria-hidden="true" /></a>}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="gallery-outro">
            <span>More code, experiments and smaller builds.</span>
            <a href="https://github.com/hamzabenarfa/" target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
