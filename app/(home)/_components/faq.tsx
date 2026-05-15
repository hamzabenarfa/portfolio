"use client";

import { HOME_FAQS } from "@/data/faqs";
import { useState } from "react";

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
        {HOME_FAQS.map((f, i) => (
          <div
            key={f.question}
            className={`faq-item${open === i ? " open" : ""}`}
            onClick={() => toggle(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(i)}
          >
            <div className="faq-q">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span>{f.question}</span>
              <span className="toggle">+</span>
            </div>
            <div className="faq-a">
              <div className="faq-a-inner">{f.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
