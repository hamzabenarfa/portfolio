import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SubpageNav } from "@/components/subpage-nav";
import { Footer } from "@/app/(home)/_components/footer";
import "@/app/(home)/portfolio.css";
import "@/app/(home)/_components/supporting-sections.css";
import "@/app/subpage.css";

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
    company: "Robosim.AI",
    role: "Software Engineer · Robotics & AI",
    period: "Jul 2026 — Sep 2026",
    overview:
      "Built a platform where teams design 3D warehouses, simulate robots, and ship apps to their fleets. Owned it end to end — from the interactive simulator and AI design assistant to the cloud infrastructure behind it.",
    stack: ["Next.js", "React Three Fiber", "FastAPI", "LLM agents", "AWS", "Terraform", "GitLab CI/CD"],
  },
  {
    company: "D-TALK Startup",
    role: "Full-Stack Developer · Fashion Tech",
    period: "Nov 2024 — Present",
    overview:
      "Multi-role fashion marketplace with a real-time canvas customizer and distinct workflows for designers, brands, and admins. Own deployments, CI/CD, monitoring, and Terraform-managed Azure, and migrated the data layer to PostgreSQL with PgBouncer.",
    stack: ["Next.js", "Konva.js", "Zustand", "NestJS", "PostgreSQL", "Azure", "Terraform"],
  },
  {
    company: "Tactix Solutions",
    role: "Full-Stack Developer (Contract)",
    period: "Jun 2025 — Jul 2025",
    overview:
      "Built and delivered a production-ready e-commerce platform with a modular architecture, and a fast, accessible interface designed for future feature growth.",
    stack: ["React", "NestJS", "Tailwind CSS", "shadcn/ui"],
  },
  {
    company: "NGB Professional",
    role: "Full-Stack Development Trainer",
    period: "Aug 2024 — Oct 2024",
    overview:
      "Delivered hands-on full-stack training across the development lifecycle — Clean Architecture, Git Flow, and Dockerized deployment — guiding learners to portfolio-ready apps.",
    stack: ["Node.js", "React", "Docker", "Git Flow"],
  },
  {
    company: "Freelance & Self-Employed",
    role: "Full-Stack Developer",
    period: "Jun 2022 — 2025",
    overview:
      "Built custom web products for clients from requirements and architecture through deployment and iteration — MVP to production, with direct scope and trade-off decisions.",
    stack: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
  },
];

const stackGroups: { label: string; items: string[] }[] = [
  { label: "Frontend & 3D", items: ["Next.js", "React", "React Three Fiber", "Three.js", "Konva.js", "Zustand", "TanStack Query", "Tailwind CSS", "shadcn/ui"] },
  { label: "Backend", items: ["NestJS", "FastAPI", "Node.js", "PostgreSQL", "PgBouncer", "Prisma", "SQLAlchemy", "Pydantic", "WebSockets"] },
  { label: "Cloud & DevOps", items: ["AWS", "Azure", "Terraform", "Docker", "GitLab CI/CD", "GitHub Actions", "Monitoring"] },
  { label: "AI & Product", items: ["LLM integration", "Agentic workflows", "Multi-provider APIs", "Streaming AI UX", "Recommendation systems"] },
  { label: "Practices", items: ["System design", "TDD", "Clean Architecture", "Integration testing", "Playwright", "Git Flow", "Mentoring"] },
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
];

export default function BackgroundPage() {
  return (
    <div className="portfolio-v2 subpage-v2">
      <SubpageNav />

      <main id="main-content">
        <section className="subpage-intro" id="top" aria-labelledby="bg-title">
          <div className="subpage-intro-inner">
            <span className="intro-identity"><span className="little-spark" aria-hidden="true" /> Background — experience &amp; stack</span>
            <h1 id="bg-title">Background<span className="title-period">.</span></h1>
            <p>
              Four years building products across robotics, fashion-tech, agencies,
              teaching, and independent consulting — frontend, backend, and the infrastructure in
              between.
            </p>
            <div className="intro-actions">
              <a href="/benarfa-hamza-en.pdf" download className="pill-link pill-dark">
                Download CV <ArrowDown size={17} aria-hidden="true" />
              </a>
              <Link href="/work" className="intro-contact">
                See the work <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-block" aria-labelledby="bg-xp">
          <div className="bg-block-head">
            <span className="section-label">Experience</span>
            <h2 id="bg-xp">Where I&rsquo;ve <em>built.</em></h2>
          </div>
          <ol className="bg-timeline">
            {engagements.map((e, i) => (
              <li key={e.company} className="bg-xp">
                <span className="bg-xp-index">{String(i + 1).padStart(2, "0")}</span>
                <div className="bg-xp-main">
                  <div className="bg-xp-head">
                    <h3>{e.company}</h3>
                    <span className="bg-xp-period">{e.period}</span>
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

        <section className="bg-toolkit" aria-labelledby="bg-stack">
          <div className="bg-toolkit-inner">
            <div className="bg-toolkit-head">
              <div>
                <span className="section-kicker">Stack</span>
                <h2 id="bg-stack">The <em>toolkit.</em></h2>
              </div>
              <p>What I reach for from the first commit to production — chosen for the problem, not the trend.</p>
            </div>
            <div className="bg-toolkit-grid">
              {stackGroups.map((g, i) => (
                <div key={g.label} className="bg-tool">
                  <div className="bg-tool-top">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>{g.items.length} tools</span>
                  </div>
                  <h3>{g.label}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
