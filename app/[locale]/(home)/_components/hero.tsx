"use client";

import { useEffect, useState } from "react";

export function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Tunis",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Date().toLocaleTimeString("en-GB", opts));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-meta ">
        <div className="hero-meta-item">
          <span className="label">[ Location ]</span>
          <span className="value">Tunis, Tunisia</span>
        </div>
        <div className="hero-meta-item">
          <span className="label">[ Local Time ]</span>
          <span className="value">{time} GMT+1</span>
        </div>
        <div className="hero-meta-item">
          <span className="label">[ Status ]</span>
          <span className="value">Open · Q3 2026</span>
        </div>
        <div className="hero-meta-item">
          <span className="label">[ Edition ]</span>
          <span className="value">v.04 — 2026</span>
        </div>
      </div>

      <h1 className="hero-title">
        <span className="line">
          <span className="inner">Full‑Stack</span>
        </span>
        <span className="line">
          <span className="inner">
            Developer <span className="accent">who</span>
          </span>
        </span>
        <span className="line">
          <span className="inner">ships ideas.</span>
        </span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-blurb">
          I&rsquo;m <strong>Hamza Benarfa</strong> — an independent full‑stack
          developer based in Tunisia. I partner with founders and small teams to
          take ideas from{" "}
          <em style={{ fontFamily: "var(--font-instrument-serif), serif" }}>blank Figma</em>{" "}
          to deployed product, in weeks not quarters.
        </p>
        <div className="hero-cta-row">
          <a href="#work" className="btn btn-accent" data-cursor-hover>
            <span>See selected work</span>
            <span className="arrow">↗</span>
          </a>
          <a href="mailto:contact@benarfa.com" className="btn" data-cursor-hover>
            <span>contact@benarfa.com</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
