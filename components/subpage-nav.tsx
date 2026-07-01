"use client";

import Link from "next/link";
import Image from "next/image";
import { BookCall } from "@/components/fx/book-call";

/**
 * Slim navigation bar for standalone pages (/work, /background) — a brand
 * mark that returns home and a primary booking CTA. Mirrors the home nav's
 * language without its in-page section anchors.
 */
export function SubpageNav() {
  return (
    <nav className="subnav" aria-label="Main navigation">
      <Link href="/" className="nav-brand">
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
      </Link>

      <div className="subnav-actions">
        <Link href="/" className="subnav-back mono">
          ← Home
        </Link>
        <BookCall className="nav-book" source="subnav">
          <span className="dot" />
          <span className="nav-book-label">Book a call</span>
          <span className="arr">→</span>
        </BookCall>
      </div>
    </nav>
  );
}
