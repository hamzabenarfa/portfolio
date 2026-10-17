export interface ProjectMeta {
  id: number;
  slug: string;
  featured: boolean;
  /**
   * Whether the project appears in listings (the `/work` index, the sitemap,
   * and structured data). Defaults to `true`. Set `false` to unlist a project
   * while keeping its `/work/<slug>` case-study page reachable by direct URL.
   */
  listed?: boolean;
  tech: string[];
  year: string;
  image: string;
  url: string;
}

export const PROJECTS: ProjectMeta[] = [
  {
    id: 1,
    slug: "dtalk-ecosystem",
    featured: true,
    listed: false,
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Fabric.js",
      "Konva",
      "next-intl",
      "Azure Blob",
      "shadcn/ui",
      "Zod",
    ],
    year: "2024",
    image: "/dtalk-hero.webp",
    url: "https://demo.d-talk.co/",
  },
  {
    id: 2,
    slug: "autopart",
    featured: false,
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma 7",
      "Neon",
      "Redis",
      "Meilisearch",
      "Cloudflare R2",
      "Auth.js",
      "Tailwind v4",
      "Biome",
      "Bun",
    ],
    year: "2026",
    image: "/autopart.webp",
    url: "https://parts.benarfa.com/",
  },
  {
    id: 3,
    slug: "beadcraft",
    featured: true,
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "PostgreSQL",
      "Prisma 7",
      "Zustand",
      "Auth.js",
      "Zod",
      "Bun",
    ],
    year: "2026",
    image: "/beadcraft.webp",
    url: "https://craft.benarfa.com/fr",
  },
  {
    id: 4,
    slug: "menu-qr",
    featured: true,
    tech: [
      "Next.js",
      "React",
      "PostgreSQL",
      "Prisma",
      "Better Auth",
      "shadcn/ui",
      "TanStack Query",
      "react-hook-form",
      "Zod",
      "Zustand",
      "next-intl",
    ],
    year: "2025",
    image: "/menu-qr.webp",
    url: "https://www.menu-qr.tn/",
  },
  {
    id: 5,
    slug: "vertex",
    featured: false,
    listed: false,
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "shadcn/ui",
      "Auth.js",
      "Stripe",
      "Zustand",
      "Zod",
      "Vercel Blob",
    ],
    year: "2025",
    image: "/vertex.webp",
    url: "https://vertex.benarfa.com/",
  },
  {
    id: 6,
    slug: "kindra",
    featured: false,
    listed: false,
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Framer Motion",
    ],
    year: "2024",
    image: "/kindra.webp",
    url: "https://kindra.benarfa.com/",
  },
];
