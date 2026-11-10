import { caseOgAlt, OG_CONTENT_TYPE, OG_SIZE, renderCaseOg } from "@/lib/og";

export const alt = caseOgAlt("dtalk-ecosystem");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderCaseOg("dtalk-ecosystem");
}
