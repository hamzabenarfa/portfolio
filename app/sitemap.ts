import type { MetadataRoute } from "next";

export default  function sitemap(): MetadataRoute.Sitemap{
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL as string;
  const currentDate = new Date();

  return [
    {
      url: `${baseUrl}`,
      priority: 1.0,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
    },
  ];
}
