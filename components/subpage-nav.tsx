"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Asterisk } from "lucide-react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/background", label: "About" },
];

/**
 * Navigation bar for standalone pages (/work, /background). Mirrors the home
 * header's brand and contact pill, with route links instead of in-page anchors.
 */
export function SubpageNav() {
  const pathname = usePathname();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="portfolio-header subpage-header">
        <Link href="/" className="portfolio-brand" aria-label="Hamza Benarfa, home"><Asterisk size={32} strokeWidth={2} aria-hidden="true" /><span>hamza<br /><strong>benarfa.</strong></span></Link>
        <nav className="subpage-nav" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
        </nav>
        <Link href="/#contact" className="header-contact">Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </header>
    </>
  );
}
