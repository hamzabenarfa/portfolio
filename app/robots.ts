import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL as string;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/","/api/og/*"]
       
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
