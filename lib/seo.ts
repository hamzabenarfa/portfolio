import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com").replace(/\/$/, "");
export const SITE_NAME = "Hamza Benarfa";
export const TWITTER_HANDLE = "@benarfa";

interface PageMetaInput {
  /** Page title without the site suffix — the root layout's template adds it. */
  title: string;
  description: string;
  /** Route path, e.g. "/work/autopart". */
  path: string;
  /** Shorter description for share cards; defaults to `description`. */
  shareDescription?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
}

/**
 * Complete metadata for one route. Next.js replaces nested objects such as
 * `openGraph` and `twitter` wholesale instead of merging them with the parent,
 * so each page needs its own full set or shares lose the url, site name and
 * X card. Share images come from the route's `opengraph-image.tsx`.
 */
export function pageMetadata({
  title,
  description,
  path,
  shareDescription = description,
  type = "website",
  noindex,
}: PageMetaInput): Metadata {
  const shareTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      creator: TWITTER_HANDLE,
    },
    ...(noindex && { robots: { index: false, follow: false } }),
  };
}
