import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hamza Benarfa — Full-Stack Developer",
    short_name: "H. Benarfa",
    description: "Portfolio of Hamza Benarfa — independent full-stack developer in Tunisia, taking products from blank page to production.",
    start_url: "/",
    display: "standalone",
    theme_color: "#f2f3ef",
    background_color: "#f2f3ef",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
