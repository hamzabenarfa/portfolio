// PostHog region of the project behind NEXT_PUBLIC_POSTHOG_KEY: "us" or "eu".
const posthogRegion = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // PostHog API paths end with a slash; without this Next.js 308-redirects them.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 90],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/projects/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
    ];
  },
  // Reverse proxy so analytics isn't dropped by ad blockers and stays same-origin (CSP 'self').
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: `https://${posthogRegion}-assets.i.posthog.com/static/:path*` },
      { source: "/ingest/array/:path*", destination: `https://${posthogRegion}-assets.i.posthog.com/array/:path*` },
      { source: "/ingest/:path*", destination: `https://${posthogRegion}.i.posthog.com/:path*` },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://vercel.live https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self'",
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://vercel.live",
              "frame-src 'self'",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
