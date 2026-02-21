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

  // With localePrefix: "never", the default locale (en) uses root URLs
  // and non-default locales get prefixed (e.g. /fr/...)
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

