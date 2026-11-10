import posthog from "posthog-js";

/**
 * PostHog product analytics. Runs once, before React hydrates.
 *
 * The project key may be shared with other apps (e.g. the BeadCraft demo):
 * every event here carries `site: "portfolio"`, so insights can be filtered
 * per app, and the cookie on the parent domain lets a visitor who clicks from
 * a case study into a live demo be followed as one person.
 */
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  posthog.init(key, {
    api_host: "/ingest",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "https://eu.posthog.com" : "https://us.posthog.com",
    defaults: "2026-08-30",
    person_profiles: "identified_only",
    loaded: (ph) => {
      ph.register({ site: "portfolio" });
      if (process.env.NODE_ENV === "development") ph.opt_out_capturing();
    },
  });
}
