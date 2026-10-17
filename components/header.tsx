"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Asterisk, Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Expertise" },
  { href: "#process", label: "Process" },
  { href: "/background", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const triggerElement = trigger.current;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();
    menu.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const items = menu.current?.querySelectorAll<HTMLElement>("a, button");
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.innerWidth > 760) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      triggerElement?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`portfolio-header${scrolled ? " has-scrolled" : ""}`}>
        <a href="#top" className="portfolio-brand" aria-label="Hamza Benarfa, home"><Asterisk size={32} strokeWidth={2} aria-hidden="true" /><span>hamza<br /><strong>benarfa.</strong></span></a>
        <nav className="portfolio-nav" aria-label="Main navigation">{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        <a href="#contact" className="header-contact">Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a>
        <button ref={trigger} type="button" className="menu-trigger" aria-label="Open menu" aria-expanded={open} aria-controls={open ? "mobile-navigation" : undefined} onClick={() => setOpen(true)}><Menu size={24} /></button>
      </header>
      {open && <div id="mobile-navigation" className="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation" ref={menu}>
        <div className="mobile-menu-top"><span>Let’s explore.</span><button type="button" aria-label="Close menu" onClick={() => setOpen(false)}><X size={26} /></button></div>
        <nav aria-label="Mobile navigation">{[...links, { href: "#contact", label: "Let’s talk" }].map((link) => <a key={link.href} href={link.href} onClick={() => { window.__lenis?.start(); setOpen(false); }}>{link.label}<ArrowUpRight size={30} aria-hidden="true" /></a>)}</nav>
        <a className="mobile-email" href="mailto:contact@benarfa.com">contact@benarfa.com</a>
        <span className="mobile-location">Based in Tunisia. Building everywhere.</span>
      </div>}
    </>
  );
}
