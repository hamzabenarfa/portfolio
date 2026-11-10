import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "Hamza Benarfa — independent full-stack developer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Full-stack developer · Tunis",
    title: "From blank page to *shipped* product.",
    description: "SaaS, dashboards and web platforms, built end to end by one developer.",
    tags: ["Next.js", "TypeScript", "NestJS"],
  });
}
