import { PROJECTS } from "@/data/consts";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com";
const baseUrl = SITE_URL.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0 },
    { path: "/work", priority: 0.9 },
    { path: "/background", priority: 0.6 },
  ];

  const projectRoutes = PROJECTS.map((project) => ({
    path: `/work/${project.slug}`,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    priority,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
  }));
}
