import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com";
const baseUrl = SITE_URL.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og/*"],
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot", "DotBot", "MJ12bot", "BLEXBot"],
        disallow: "/",
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
    host: baseUrl,
  };
}
