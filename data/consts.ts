export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    handle: "@hamzabenarfa",
    url: "https://github.com/hamzabenarfa/",
  },
  {
    name: "LinkedIn",
    handle: "hamzabenarfa",
    url: "https://www.linkedin.com/in/hamzabenarfa/",
  },
  {
    name: "WhatsApp",
    handle: "+216 22 633 345",
    url: "https://wa.me/21622633345",
  },
  {
    name: "Download CV",
    handle: "Resume / Portfolio",
    url: "/benarfa-hamza-en.pdf",
    download: true,
  },
];



export const PROJECTS = [
  {
    id: 1,
    slug: "dtalk-ecosystem",
    featured: false,
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Konva",
      "shadcn/ui",
      "next-intl",
      "Zod",
    ],
    year: "2024",
    image: "/dtalk.webp",
    url: "https://d-talk-ecosytem-front-three.vercel.app",
  },
    {
    id: 2,
    slug: "menu-qr",
    featured: false,
    tech: [
      "Next.js",
      "React",
      "PostgreSQL",
      "shadcn/ui",
      "Redis",
      "Cloudflare",
      "Zod",
      "@dnd-kit",
      "Framer Motion",
      "next-intl",
      "Docker",
    ],
    year: "2025",
    image: "/menu-qr.webp",
    url: "https://www.menu-qr.tn/",
  },
  // {
  //   id: 3,
  //   slug: "ecommerce-platform",
  //   featured: false,
  //   tech: [
  //     "Next.js",
  //     "React 19",
  //     "TypeScript",
  //     "PostgreSQL",
  //     "Prisma",
  //     "Tailwind CSS",
  //     "shadcn/ui",
  //     "NextAuth.js",
  //     "Zustand",
  //     "Stripe",
  //     "React Hook Form",
  //     "Zod",
  //   ],
  //   year: "2024",
  //   image: "/vertex.webp",
  //   url: "https://vertex.benarfa.com/",
  // },
  // {
  //   id: 4,
  //   slug: "project-management-app",
  //   featured: false,
  //   tech: [
  //     "Next.js 14",
  //     "MySQL",
  //     "Prisma",
  //     "Tailwind CSS",
  //     "Framer Motion",
  //     "shadcn/ui",
  //     "Zustand",
  //     "React Query",
  //     "Chart.js",
  //     "Mermaid.js",
  //     "@dnd-kit",
  //   ],
  //   year: "2024",
  //   image: "/planner.webp",
  //   url: "https://planner.benarfa.com/",
  // },
  // {
  //   id: 5,
  //   slug: "kindra-ecommerce",
  //   featured: false,
  //   tech: [
  //     "Next.js 15",
  //     "React 19",
  //     "TypeScript",
  //     "Tailwind CSS",
  //     "PostgreSQL",
  //     "Drizzle ORM",
  //     "Stripe",
  //     "Cloudflare R2",
  //     "Docker",
  //     "Oslo",
  //     "Zod",
  //   ],
  //   year: "2024",
  //   image: "/kindra-hero.webp",
  //   url: "https://kindra.benarfa.com/",
  // },
];

/**
 * Work experience — non-translatable data only.
 * Translatable text (role, company, year, description, details)
 * lives in messages/en.json and messages/fr.json under `experienceItems.{key}`.
 */
export const WORK_EXPERIENCE = [
  {
    id: 1,
    key: "job_1",
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "Konva.js",
    ],
  },
  {
    id: 2,
    key: "job_2",
    tech: ["React", "Nest.js", "MongoDB", "Framer Motion"],
  },
  {
    id: 3,
    key: "job_3",
    tech: ["MongoDB", "Express", "React", "Node.js", "PostgreSQL"],
  },
  {
    id: 4,
    key: "job_4",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MySQL"],
  },
];

