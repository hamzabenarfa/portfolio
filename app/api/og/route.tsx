import { renderOgCard } from "@/lib/og";

/**
 * Legacy share-image URL. Links shared before the file-based
 * `opengraph-image` routes existed still point here, so it serves the
 * same branded default card.
 */
export async function GET() {
  return renderOgCard({
    eyebrow: "Full-stack developer · Tunis",
    title: "From blank page to *shipped* product.",
    description: "SaaS, dashboards and web platforms, built end to end by one developer.",
    tags: ["Next.js", "TypeScript", "NestJS"],
  });
}
