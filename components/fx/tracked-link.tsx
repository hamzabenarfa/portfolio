"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent, type FunnelEvent } from "@/lib/track";

type EventData = Record<string, string | number | boolean | null>;

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: FunnelEvent;
  eventData?: EventData;
  /** A second funnel event for the same click, e.g. attributing a contact to a case study. */
  alsoTrack?: { event: FunnelEvent; data?: EventData };
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
  alsoTrack,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(event, eventData);
        if (alsoTrack) trackEvent(alsoTrack.event, alsoTrack.data);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
