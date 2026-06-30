"use client";

import { useState } from "react";
import { SectionHead } from "./section-head";
import { FadeUp } from "@/components/fx/reveal";

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
];

export function FAQ() {
  const [open, setOpen] = useState<number>(-1);
  const toggle = (i: number) => setOpen(open === i ? -1 : i);

  return (
    <section className="section container">
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

      <FadeUp className="faq-list" stagger={0.08} y={32}>
        {faqs.map((f, i) => (
          <div key={f.q} className={`faq-item${open === i ? " open" : ""}`}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={open === i}
              onClick={() => toggle(i)}
            >
              <span className="mono">/{String(i + 1).padStart(2, "0")}</span>
              <span>{f.q}</span>
              <span className="faq-toggle" aria-hidden="true">
                +
              </span>
            </button>
            <div className="faq-a">
              <div className="faq-a-clip">
                <p className="faq-a-inner">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}
