"use client";

import { useState } from "react";
import { SectionHead } from "./section-head";

const faqs = [
  {
    q: "Who do you work best with?",
    a: "Founders building MVPs, agencies that need a reliable full-stack partner, small businesses launching SaaS or internal platforms, and teams that need frontend, backend, and deployment handled by one person. I'm not the right fit for basic landing pages, pixel-only design work, or projects without a clear scope or budget.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "Next.js, TypeScript, React, and React Native on the frontend. Node, NestJS, PostgreSQL, and Prisma on the backend. I optimize for the boring, well‑supported choices that ship fast and don't break in two years.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. I work remotely across timezones — most of my clients are in Europe and North America. I overlap with EU mornings and US mornings comfortably.",
  },
  {
    q: "How do you handle communication?",
    a: "Weekly demos, async daily updates in Slack or your tool of choice, and a shared Notion/Linear for everything else. No surprises, no week‑long radio silence.",
  },
  {
    q: "Can you handle frontend AND backend?",
    a: "Yes — that's the whole point. I take ownership of the full stack so founders aren't coordinating between two contractors. For larger work I plug into existing teams as a senior IC.",
  },
  {
    q: "How long does an MVP take?",
    a: "Weeks, not quarters. After a scoping call you get a roadmap with weekly demo milestones, and there's a deployable build on staging from the first sprint — how many sprints it takes depends on the scope we agree on, and you'll know that number before any code is written.",
  },
  {
    q: "What happens after launch?",
    a: "Launch isn't the end of the engagement. Every project ships with documentation, a clean handover, and the deploy pipeline set up — Docker, CI/CD, monitoring. If you want me to stay involved, ongoing support and iteration retainers are available.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(-1);
  const toggle = (i: number) => setOpen(open === i ? -1 : i);

  return (
    <section className="section container questions-section" aria-label="Frequently asked questions">
      <div className="faq-layout">
      <SectionHead
        index="04"
        label="FAQ"
        title={
          <>
            Common <em>questions</em>
          </>
        }
        meta={<>Tap to expand</>}
      />

      <div className="faq-list">
        {faqs.map((f, i) => (
          <div key={f.q} className={`faq-item${open === i ? " open" : ""}`}>
            <button
              type="button"
              className="faq-q"
              id={`faq-question-${i}`}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
              onClick={() => toggle(i)}
            >
              <span>{f.q}</span>
              <span className="faq-toggle" aria-hidden="true">
                +
              </span>
            </button>
            <div className="faq-a" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} aria-hidden={open !== i}>
              <div className="faq-a-clip">
                <p className="faq-a-inner">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
