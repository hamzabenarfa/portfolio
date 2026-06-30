"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BookCall } from "@/components/fx/book-call";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "/background", label: "Background" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // hide on scroll down, reveal on scroll up
      setHidden(y > lastY.current && y > 240);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`site-nav${scrolled ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}`}
        aria-label="Main navigation"
      >
        <a href="#top" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="nav-mark">
            <Image
              src="/avatar.jpeg"
              width={30}
              height={30}
              alt="Hamza Benarfa"
              className="w-full h-full object-cover"
            />
          </span>
          <span>
            Benarfa<sup>®</sup>
          </span>
        </a>

        <ul className="nav-links">
          {links.slice(0, 4).map((l) => (
            <li key={l.href}>
              <a href={l.href}>
                <span className="nl">{l.label}</span>
                <span className="nl nl-ghost" aria-hidden="true">
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <BookCall className="nav-book" data-cursor="hover">
          <span className="dot" />
          <span className="nav-book-label">Book a call</span>
          <span className="arr">→</span>
        </BookCall>

        <button
          className="nav-burger"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`nav-overlay${open ? " open" : ""}`} aria-hidden={!open}>
        <ul className="nav-overlay-links">
          {links.map((l, i) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="idx">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-overlay-foot">
          <div>
            <a href="mailto:contact@benarfa.com">contact@benarfa.com</a>
            <a href="https://wa.me/21622633345" target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
          </div>
          <div style={{ textAlign: "right" }}>
            <a href="https://github.com/hamzabenarfa/" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/hamzabenarfa/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
