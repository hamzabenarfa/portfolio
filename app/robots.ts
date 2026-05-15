import { baseUrl } from "@/lib/seo";
import { MetadataRoute } from "next";

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
