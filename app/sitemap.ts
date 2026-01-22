import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL as string;
  const currentDate = new Date();

  const projects = [
    "dtalk-ecosystem",
    "ecommerce-platform",
    "project-management-app",
    "kindra-ecommerce",
    "menu-qr",
  ];

  const routes = ["", ...projects.map((project) => `/projects/${project}`)];

  const sitemapEntries = routes.flatMap((route) => {
    return routing.locales.map((locale) => {
      // Based on layout.tsx alternates, both /en and /fr exist.
      // However, routing.ts says 'never' for prefix, which is contradictory.
      // Given layout.tsx has alternates for both, I will generate both to be safe and explicit.
      
      return {
        url: `${baseUrl}/${locale}${route}`,
        priority: route === "" ? 1.0 : 0.8,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
      };
    });
  });

  return sitemapEntries;
}
