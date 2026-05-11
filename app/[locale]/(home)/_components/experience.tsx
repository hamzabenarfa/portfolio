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
    role: "Fashion Tech Platform",
    period: "2024 — Present",
    overview:
      "Multi-role fashion marketplace with canvas-based product customizer, four user-type dashboards, and marketplace features.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Konva.js", "Zustand"],
  },
  {
    company: "Tactix — Software Agency",
    role: "Agency Client Projects",
    period: "2025",
    overview:
      "Shipped client-facing features across multiple web platforms under tight agency deadlines. Full-stack across frontend and backend.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
  },
  {
    company: "NGB Professional",
    role: "Engineering Instructor",
    period: "2024",
    overview:
      "Designed and delivered a hands-on full-stack curriculum covering React, Node, and CI/CD deployment workflows.",
    stack: ["React", "Node", "Git", "CI/CD"],
  },
  {
    company: "Independent Consulting",
    role: "Freelance & Client Projects",
    period: "2022 — Present",
    overview:
      "Partnering directly with founders and small teams to scope, build, and ship MVPs, SaaS platforms, and revenue-critical features.",
    stack: ["MVP builds", "SaaS platforms", "Full delivery"],
  },
];

export function Experience() {
  const [open, setOpen] = useState<number>(0);

  const toggle = (i: number) => setOpen(open === i ? -1 : i);

  return (
    <section id="experience" className="container">
      <div className="section-header reveal">
        <span className="num">[ 04 / Background ]</span>
        <h2 className="title">
          Product &amp; engineering <em>background</em>
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
