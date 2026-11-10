import { caseOgAlt, OG_CONTENT_TYPE, OG_SIZE, renderCaseOg } from "@/lib/og";

export const alt = caseOgAlt("autopart");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderCaseOg("autopart");
}
