"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "What technologies do you specialize in?",
    a: "Next.js, TypeScript, React, and React Native on the frontend. Node, NestJS, PostgreSQL, and Prisma on the backend. I optimize for the boring, well‑supported choices that ship fast and don't break in two years.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. I work remotely across timezones — most of my clients are in Europe and North America. I overlap with EU mornings and US mornings comfortably.",
  },
  {
    q: "What types of projects do you build?",
    a: "MVPs, internal tools, dashboards, marketplaces, restaurant/retail SaaS, and the occasional mobile app. If it's a typed full‑stack app with real users, I'm a good fit.",
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
    <section className="container faq">
      <div className="section-header reveal">
        <span className="num">[ 05 / FAQ ]</span>
        <h2 className="title">
          Common <em>questions</em>
        </h2>
        <span className="meta">Tap to expand</span>
      </div>

      <div className="faq-list reveal">
        {faqs.map((f, i) => (
          <div
            key={i}
            className={`faq-item${open === i ? " open" : ""}`}
            onClick={() => toggle(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(i)}
          >
            <div className="faq-q">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span>{f.q}</span>
              <span className="toggle">+</span>
            </div>
            <div className="faq-a">
              <div className="faq-a-inner">{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
