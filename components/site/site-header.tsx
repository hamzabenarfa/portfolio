"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TileGlyph, BRAND_MARK } from "@/components/site/tile-glyph";
import { EMAIL, WHATSAPP_URL } from "@/data/contact";

const HOME_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "/background", label: "About" },
];

const PAGE_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/background", label: "About" },
];

const MENU_TILES = Array.from({ length: 60 }, (_, i) => i);

/** Routes get next/link prefetching; in-page anchors stay plain so Lenis can glide to them. */
function NavLink(props: React.ComponentProps<"a"> & { href: string }) {
  return props.href.startsWith("/") ? <Link {...props} /> : <a {...props} />;
}

export function SiteHeader({ variant = "home" }: { variant?: "home" | "page" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"top" | "pinned" | "hidden">("top");
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const links = variant === "home" ? HOME_LINKS : PAGE_LINKS;
  const contactHref = "#contact";

  // Out of the way while reading down the page, back the moment you scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 40) setMode("top");
      else if (y > last + 4) setMode("hidden");
      else if (y < last - 4) setMode("pinned");
      last = y;
    };
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
    const onResize = () => { if (window.innerWidth > 860) setOpen(false); };
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

  const brand = (
    <>
      <TileGlyph pattern={BRAND_MARK} className="brand-mark" />
      <span>Hamza Benarfa</span>
    </>
  );

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" data-mode={open ? "top" : mode}>
        {variant === "home"
          ? <a href="#top" className="brand" aria-label="Hamza Benarfa, back to top">{brand}</a>
          : <Link href="/" className="brand" aria-label="Hamza Benarfa, home">{brand}</Link>}
        <nav className="header-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}>{link.label}</NavLink>
          ))}
        </nav>
        <NavLink href={contactHref} className="header-cta">Let’s talk</NavLink>
        <button
          ref={trigger}
          type="button"
          className="menu-trigger"
          aria-expanded={open}
          aria-controls={open ? "mobile-navigation" : undefined}
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </header>
      {open && (
        <div id="mobile-navigation" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation" ref={menu}>
          <div className="mobile-menu-tiles" aria-hidden="true">
            {MENU_TILES.map((i) => <i key={i} style={{ "--i": (i % 6) + Math.floor(i / 6) } as React.CSSProperties} />)}
          </div>
          <div className="mobile-menu-top">
            <span className="brand">{brand}</span>
            <button type="button" className="menu-close" onClick={() => setOpen(false)}>Close</button>
          </div>
          <nav aria-label="Mobile navigation">
            {[...links, { href: contactHref, label: "Let’s talk" }].map((link, i) => (
              <NavLink key={link.href} href={link.href} style={{ "--i": i } as React.CSSProperties} onClick={() => { window.__lenis?.start(); setOpen(false); }}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu-direct">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              WhatsApp <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
      )}
    </>
  );
}
