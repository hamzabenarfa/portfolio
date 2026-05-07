import Image from "next/image";
import type { ReactNode } from "react";

interface Project {
  label: string;
  year: string;
  type: string;
  title: ReactNode;
  desc: string;
  stack: string[];
  mock: string;
  glyph: string;
  image?: string;
  href: string;
}

const projects: Project[] = [
  {
    label: "D‑Talk Ecosystem",
    year: "2024",
    type: "E‑Commerce / SaaS",
    title: (<>Fashion <em>marketplace</em></>),
    desc: "Frontend for a fashion‑tech platform connecting designers, brands, and buyers. Canvas‑based product customizer with role‑specific dashboards for four user types.",
    stack: ["Next.js", "React", "TypeScript", "Konva.js", "Zustand"],
    mock: "mock-1",
    glyph: "D‑T",
    href: "/projects/dtalk-ecosystem",
  },
  {
    label: "Menu QR",
    year: "2025",
    type: "SaaS / Restaurant",
    title: (<>Digital <em>restaurant</em> menu</>),
    desc: "SaaS platform for restaurants to create QR‑accessible menus. Eight‑step onboarding wizard, drag‑and‑drop editor, analytics dashboard.",
    stack: ["Next.js", "Hono.js", "Cloudflare", "Python", "PostgreSQL"],
    mock: "mock-2",
    glyph: "MQR",
    // image: "/menu-qr.webp",
    href: "/projects/menu-qr",
  },
  {
    label: "Kindra Fashion",
    year: "2025",
    type: "E-Commerce / Starter Kit",
    title: (<>Kindra <em>Fashion</em> </>),
    desc: "Production-ready e-commerce starter kit for fashion. Separate Men's and Women's storefronts, multi-variant products, Stripe payments, and full admin dashboard.",
    stack: ["Next.js", "PostgreSQL", "Tailwind", "Drizzle", "Stripe"],
    mock: "mock-3",
    glyph: "KIN",
    href: "/projects/kindra",
  }

];

export function ProjectsSection() {
  return (
    <section id="work" className="container projects">
      <div className="section-header reveal">
        <span className="num">[ 02 / Selected Work ]</span>
        <h2 className="title">
          Selected <em>work</em>
        </h2>
        <span className="meta">
          03 selected projects
          <br />
          Showing 2024 — 2025
        </span>
      </div>

      <div className="project-grid">
        {projects.map((p) => (
          <a key={p.label} href={p.href} className="project-card reveal">
            <div className="project-thumb">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={`${p.label} preview`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="project-thumb-image"
                />
              ) : (
                <div className={`mock ${p.mock}`}>{p.glyph}</div>
              )}
            </div>
            <div className="project-meta">
              <span>{p.type}</span>
              <span>{p.year}</span>
            </div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-stack">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
