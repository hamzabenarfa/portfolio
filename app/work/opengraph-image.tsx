import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "Selected work by Hamza Benarfa";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Selected work",
    title: "Products, *shipped* end to end.",
    description: "Case studies: marketplaces, SaaS platforms and made-to-order commerce.",
    tags: ["Marketplaces", "SaaS", "E-commerce"],
  });
}
