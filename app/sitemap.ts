import { PROJECTS } from "@/data/consts";
import { SERVICES } from "@/data/services";
import { getAbsoluteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

const DEFAULT_LAST_MODIFIED = new Date("2026-05-14");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: getAbsoluteUrl("/"), priority: 1.0, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "monthly" },
    { url: getAbsoluteUrl("/about"), priority: 0.7, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "monthly" },
    { url: getAbsoluteUrl("/projects"), priority: 0.8, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "monthly" },
    { url: getAbsoluteUrl("/services"), priority: 0.8, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "monthly" },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: getAbsoluteUrl(`/projects/${project.slug}`),
    priority: 0.8,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "monthly" as const,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: getAbsoluteUrl(`/services/${service.slug}`),
    priority: 0.75,
    lastModified: new Date(service.updatedAt),
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
