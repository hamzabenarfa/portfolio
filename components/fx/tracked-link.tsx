"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent, type FunnelEvent } from "@/lib/track";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: FunnelEvent;
  eventData?: Record<string, string | number | boolean | null>;
  children: ReactNode;
}

/**
 * Anchor that emits a funnel event on click. Lets server-rendered sections
 * (e.g. the contact block) keep their markup while turning the conversion
 * touchpoints into measurable client islands.
 */
export function TrackedLink({
  event,
  eventData,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(event, eventData);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
