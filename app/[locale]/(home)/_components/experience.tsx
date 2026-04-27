"use client";

import { useState } from "react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  overview: string;
  stack: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "D‑TALK Startup",
    role: "Full‑Stack Developer",
    period: "Nov 2024 — Present",
    overview:
      "Building the frontend for a fashion‑tech marketplace with multi‑role dashboards and a real‑time, canvas‑based product customizer.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Zustand", "TanStack Query", "Konva.js"],
  },
  {
    company: "Tactix — Software Agency",
    role: "Full‑Stack Developer (Contract)",
    period: "Jun 2025 — Aug 2025",
    overview:
      "Shipped client‑facing features across multiple agency projects under tight deadlines. Bridged design and engineering on a small embedded team.",
    stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Docker"],
  },
  {
    company: "NGB Professional",
    role: "Full‑Stack Development Instructor",
    period: "Aug 2024 — Oct 2024",
    overview:
      "Designed and delivered a hands‑on curriculum covering modern full‑stack workflow, from React fundamentals to deployment with CI/CD.",
    stack: ["Curriculum design", "React", "Node", "Git", "Mentorship"],
  },
  {
    company: "Independent Consulting",
    role: "Software Consultant",
    period: "Jun 2022 — Present",
    overview:
      "A continuous thread across all this — partnering directly with founders and small teams to define, build, and ship MVPs and revenue‑critical features.",
    stack: ["MVP scoping", "Architecture", "Full delivery", "Hand‑off"],
  },
];

export function Experience() {
  const [open, setOpen] = useState<number>(0);

  const toggle = (i: number) => setOpen(open === i ? -1 : i);

  return (
    <section id="experience" className="container">
      <div className="section-header reveal">
        <span className="num">[ 01 / Experience ]</span>
        <h2 className="title">
          Where <em>I&rsquo;ve</em> shipped
        </h2>
        <span className="meta">
          04 engagements
          <br />
          2022 — present
        </span>
      </div>

      <ul className="experience-list">
        {experiences.map((exp, i) => (
          <li key={exp.company} className="reveal">
            <div
              className={`exp-row${open === i ? " open" : ""}`}
              onClick={() => toggle(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(i)}
            >
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span className="company">{exp.company}</span>
              <span className="role">{exp.role}</span>
              <span className="period">{exp.period}</span>
              <span className="arrow">{open === i ? "−" : "+"}</span>
            </div>
            <div className="exp-detail">
              <div className="exp-detail-inner">
                <span className="label">Overview</span>
                <p>{exp.overview}</p>
                <div>
                  <span className="label">Stack</span>
                  <div className="stack">
                    {exp.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
