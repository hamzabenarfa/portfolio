"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/track";

/**
 * "Book a call" CTA. Scrolls to the contact section (email + WhatsApp) on the
 * home page, and works from sub-pages via the root-anchored `/#contact` href.
 * Emits a funnel event so booking intent is measurable.
 */
interface BookCallProps {
  children: ReactNode;
  className?: string;
  /** Where the CTA was clicked (e.g. "nav", "hero"), for funnel attribution. */
  source?: string;
  "data-cursor"?: string;
  "data-cursor-label"?: string;
}

export function BookCall({ children, className, source, ...rest }: BookCallProps) {
  return (
    <Link
      href="/#contact"
      className={className}
      onClick={() => trackEvent("book_call_click", { source: source ?? "unknown" })}
      {...rest}
    >
      {children}
    </Link>
  );
}
