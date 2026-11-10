import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "Engineering background of Hamza Benarfa";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Engineering background",
    title: "The *experience* behind the work.",
    description: "Fashion-tech, agency, teaching and independent consulting, plus the stack.",
    tags: ["Full-stack", "DevOps", "Teaching"],
  });
}
