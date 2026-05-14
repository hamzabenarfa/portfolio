import Image from "next/image";
import type { ReactNode } from "react";

interface Project {
  label: string;
  year: string;
  type: string;
  role: string;
  title: ReactNode;
  desc: string;
  stack: string[];
  mock: string;
  glyph: string;
  image?: string;
  theme: string;
  href: string;
}

const projects: Project[] = [
  {
    label: "D‑Talk Ecosystem",
    year: "2024",
    type: "Fashion Tech / SaaS",
    role: "Full-stack · Frontend architecture",
    title: (<>Fashion <em>marketplace</em></>),
    desc: "Multi-role platform connecting designers, brands, and buyers — with a real-time canvas-based product customizer and four distinct user dashboards. Built with full ownership of the frontend architecture.",
    stack: ["Next.js", "React", "TypeScript", "Konva.js", "Zustand", "TanStack Query"],
    mock: "mock-1",
    glyph: "D‑T",
    image: "/d-talk.webp",
    theme: "dtalk",
    href: "/projects/dtalk-ecosystem",
  },
  {
    label: "Menu QR",
    year: "2025",
    type: "SaaS / Restaurant Tech",
    role: "Full-stack · Product build",
    title: (<>Digital <em>restaurant</em> menu</>),
    desc: "B2B SaaS that lets restaurants self-onboard and create QR-accessible menus in minutes. Eight-step wizard, drag-and-drop editor, table-specific QR codes, analytics, and AI-assisted menu digitization.",
    stack: ["Next.js", "Hono.js", "Cloudflare", "Python", "PostgreSQL", "AI OCR"],
    mock: "mock-2",
    glyph: "MQR",
    image: "/menu-qr.webp",
    theme: "menuqr",
    href: "/projects/menu-qr",
  },
  {
    label: "Kindra Fashion",
    year: "2025",
    type: "E-Commerce / Starter Kit",
    role: "Full-stack · Architecture & delivery",
    title: (<>Kindra <em>Fashion</em></>),
    desc: "Production-ready e-commerce foundation for fashion brands. Separate Men's and Women's storefronts, multi-variant products, Stripe payments, inventory management, and a full admin dashboard — ready to deploy.",
    stack: ["Next.js", "PostgreSQL", "Tailwind", "Drizzle", "Stripe"],
    mock: "mock-3",
    glyph: "KIN",
    image: "/kindra.webp",
    theme: "kindra",
    href: "/projects/kindra",
  },
];

export function ProjectsSection() {
  return (
    <section id="work" className="container projects">
      <div className="section-header reveal">
        <span className="num">[ 01 / Selected Work ]</span>
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
            <div
              className={`project-thumb project-thumb-${p.theme}`}
              aria-label={`${p.label} preview`}
            >
              <div aria-hidden="true" className="project-thumb-art" />
              {p.image ? (
                <div className="project-thumb-window">
                  <div aria-hidden="true" className="project-thumb-chrome">
                    <span />
                    <span />
                    <span />
                  </div>
                  <Image
                    src={p.image}
                    alt={`${p.label} preview`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="project-thumb-image"
                  />
                </div>
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
            <p className="project-role">{p.role}</p>
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
