import { routing } from "@/i18n/routing";
import { PROJECTS } from "@/data/consts";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com";
const baseUrl = SITE_URL.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const routes = ["", ...PROJECTS.map((project) => `/projects/${project.slug}`)];

  const sitemapEntries = routes.flatMap((route) => {
    return routing.locales.map((locale) => {
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

      return {
        url: `${baseUrl}${prefix}${route}`,
        priority: route === "" ? 1.0 : 0.8,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
      };
    });
  });

  return sitemapEntries;
}
