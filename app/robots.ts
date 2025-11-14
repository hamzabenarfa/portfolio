import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL as string;
  // const isProduction = process.env.NODE_ENV === "production";

  // if (!isProduction) {
  //   return {
  //     rules: {
  //       userAgent: "*",
  //       disallow: "/",
  //     },
  //   };
  // }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
       
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
