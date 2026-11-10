import { track } from "@vercel/analytics";
import posthog from "posthog-js";

/**
 * Conversion funnel events for the case-study → contact journey.
 * Sent to both Vercel Analytics and PostHog so event names stay typed and
 * consistent — this is what makes the project→contact funnel measurable.
 */
export type FunnelEvent =
  | "project_card_click" // home work index → case study
  | "project_cta_click" // case-study closing CTA → contact
  | "film_play" // case-study film started (once per page view)
  | "contact_click"; // any contact destination (mail / cv)

type EventProps = Record<string, string | number | boolean | null>;

export function trackEvent(event: FunnelEvent, props?: EventProps): void {
  // Both calls are no-ops when their client isn't initialised (server, no key,
  // analytics disabled), so this is safe to call directly from event handlers.
  track(event, props);
  if (posthog.__loaded) posthog.capture(event, props);
}
