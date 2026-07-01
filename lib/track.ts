import { track } from "@vercel/analytics";

/**
 * Conversion funnel events for the case-study → contact journey.
 * Wraps Vercel Analytics' `track` so event names stay typed and consistent —
 * this is what makes the project→contact funnel measurable end to end.
 */
export type FunnelEvent =
  | "project_card_click" // home work index → case study
  | "project_cta_click" // case-study closing CTA → contact
  | "contact_click" // any contact destination (mail / whatsapp / cv)
  | "book_call_click"; // nav / hero "Book a call"

type EventProps = Record<string, string | number | boolean | null>;

export function trackEvent(event: FunnelEvent, props?: EventProps): void {
  // `track` is a no-op outside the browser and when analytics is disabled,
  // so this is safe to call directly from event handlers.
  track(event, props);
}
