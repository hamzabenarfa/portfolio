"use client";

import { useState } from "react";

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

  return (
    <section className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title" className="section-title">Questions</h2>
      <div className="faq-items">
        {faqs.map((f, i) => {
          const expanded = open === i;
          return (
            <div key={f.q} className="faq-entry" data-open={expanded}>
              <h3>
                <button
                  type="button"
                  id={`faq-question-${i}`}
                  aria-expanded={expanded}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(expanded ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} aria-hidden={!expanded}>
                <div><p>{f.a}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
