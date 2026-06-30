import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/components/subpage-nav";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com";
const baseUrl = SITE_URL.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Engineering Background",
  description:
    "The engineering background of Hamza Benarfa — full-stack developer experience across fashion-tech, agency, teaching, and independent consulting, plus the stack behind the work.",
  alternates: { canonical: `${baseUrl}/background` },
  openGraph: {
    title: "Engineering Background | Hamza Benarfa",
    description:
      "Full-stack developer experience across fashion-tech, agency, teaching, and independent consulting.",
    url: `${baseUrl}/background`,
    type: "profile",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Hamza Benarfa — Background" }],
  },
};

interface Engagement {
  company: string;
  role: string;
  period: string;
  overview: string;
  stack: string[];
}

const engagements: Engagement[] = [
  {
    company: "D-TALK Startup",
    role: "Full-Stack Developer · Fashion Tech",
    period: "Nov 2024 — Present",
    overview:
      "Multi-role fashion marketplace with a canvas-based product customizer, four user-type dashboards, and full marketplace features. Built the frontend architecture and reusable component system.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Konva.js", "Zustand", "TanStack Query"],
  },
  {
    company: "Tactix — Software Agency",
    role: "Full-Stack Developer (Contract)",
    period: "Jun 2025 — Aug 2025",
    overview:
      "Shipped an e-commerce platform in an 8-week sprint as part of a 4-person agile team. Built REST APIs and page-transition animations, delivering ahead of schedule.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Framer Motion", "Docker"],
  },
  {
    company: "NGB Professional",
    role: "Full-Stack Development Instructor",
    period: "Aug 2024 — Oct 2024",
    overview:
      "Designed and delivered a hands-on MERN curriculum for aspiring developers, with real-world projects and one-on-one portfolio mentoring.",
    stack: ["MongoDB", "Express", "React", "Node", "Git", "CI/CD"],
  },
  {
    company: "Independent Consulting",
    role: "Software Consultant · Freelance",
    period: "Jun 2022 — Present",
    overview:
      "Partnering directly with founders and small teams to scope, build, and ship MVPs, SaaS platforms, and revenue-critical features. Most clients are repeat customers.",
    stack: ["MVP builds", "SaaS platforms", "Full delivery"],
  },
];

const stackGroups: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "Framer Motion", "Konva.js"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "NestJS", "PostgreSQL", "Drizzle ORM", "Prisma", "Redis", "Zod", "REST / GraphQL"],
  },
  {
    label: "Platform & DevOps",
    items: ["Docker", "GitHub Actions", "Nginx", "Vercel", "Cloudflare R2", "CI/CD", "Stripe"],
  },
];

export default function BackgroundPage() {
  return (
    <div className="subpage">
      <SubpageNav />

      <main className="container bg-wrap">
        <header className="wi-head">
          <span className="wi-eyebrow mono">
            <span className="mono-accent">●</span> Background — experience &amp; stack
          </span>
          <h1 className="wi-title">
            Engineering <em>background</em>
          </h1>
          <p className="wi-lead">
            Four years building products across fashion-tech, agencies, teaching, and
            independent consulting — frontend, backend, and the infrastructure in
            between.
          </p>
          <div className="wi-links">
            <a href="/benarfa-hamza-en.pdf" download className="btn btn-solid">
              Download CV <span className="arr">↓</span>
            </a>
            <Link href="/work" className="btn">
              See the work <span className="arr">→</span>
            </Link>
          </div>
        </header>

        <section className="bg-section" aria-labelledby="bg-xp">
          <h2 id="bg-xp" className="bg-section-title mono">
            / Experience
          </h2>
          <ol className="bg-timeline">
            {engagements.map((e, i) => (
              <li key={e.company} className="bg-xp">
                <span className="bg-xp-index mono">/{String(i + 1).padStart(2, "0")}</span>
                <div className="bg-xp-main">
                  <div className="bg-xp-head">
                    <h3 className="bg-xp-company">{e.company}</h3>
                    <span className="bg-xp-period mono">{e.period}</span>
                  </div>
                  <p className="bg-xp-role">{e.role}</p>
                  <p className="bg-xp-overview">{e.overview}</p>
                  <ul className="bg-xp-stack">
                    {e.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-section" aria-labelledby="bg-stack">
          <h2 id="bg-stack" className="bg-section-title mono">
            / Stack
          </h2>
          <div className="bg-stack-grid">
            {stackGroups.map((g) => (
              <div key={g.label} className="bg-stack-col">
                <h3 className="bg-stack-label mono">{g.label}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
