"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LocalTime } from "@/components/fx/local-time";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".footer-marquee .tape-track", {
        xPercent: -50,
        ease: "none",
        duration: 22,
        repeat: -1,
      });
    },
    { scope: root },
  );

  const item = (hidden: boolean) => (
    <span className="fm-item" aria-hidden={hidden}>
      Let&rsquo;s build <em>something</em> serious —&nbsp;
    </span>
  );

  return (
    <footer className="site-footer" ref={root}>
      <a href="#contact" className="footer-marquee" data-cursor="view" data-cursor-label="Say hi" style={{ display: "block", textDecoration: "none" }}>
        <div className="tape-track">
          {item(false)}
          {item(true)}
          {item(true)}
          {item(true)}
        </div>
      </a>
      <div className="footer-bar">
        <a href="#top">© 2026 — Hamza Benarfa</a>
        <span className="mono">
          <LocalTime />
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
