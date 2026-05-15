import type { Metadata } from "next";
import { PROJECTS, type ProjectSlug } from "@/data/consts";
import { getAbsoluteAssetUrl, getAbsoluteUrl, getAlternates } from "@/lib/seo";

export function getProjectMetadata(slug: ProjectSlug): Metadata {
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) {
    return {};
  }

  const path = `/projects/${slug}`;
  const imageUrl = getAbsoluteAssetUrl(project.ogImage);

  return {
    title: project.title,
    description: project.summary,
    alternates: getAlternates(path),
    openGraph: {
      title: project.title,
      description: project.summary,
      url: getAbsoluteUrl(path),
      siteName: "Hamza Benarfa",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} case study preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      creator: "@benarfa",
      images: [imageUrl],
    },
  };
}
