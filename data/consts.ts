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
      "Shadcn UI",
      "next-intl",
      "Zod"
    ],
    year: "2024",
    image: "/dtalk.webp",
    url: "https://d-talk-ecosytem-front-three.vercel.app",
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    featured: false,
    tech: [
      "Next.js",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Shadcn/ui",
      "NextAuth.js",
      "Zustand",
      "Stripe",
      "React Hook Form",
      "Zod",
    ],
    year: "2024",
    image: "/vertex.webp",
    url: "https://vertex.benarfa.com/",
  },
  {
    id: 3,
    slug: "project-management-app",
    featured: false,
    tech: [
      "Next.js 14",
      "MySQL",
      "Prisma",
      "Tailwind CSS",
      "Framer Motion",
      "shadcn/ui",
      "Zustand",
      "React Query",
      "Chart.js",
      "Mermaid.js",
      "@dnd-kit",
    ],
    year: "2024",
    image: "/planner.webp",
    url: "https://planner.benarfa.com/",
  },
  {
    id: 4,
    slug: "menu-qr",
    featured: false,
    tech: [
      "Next.js 15.5",
      "React 19",
      "NestJS 10",
      "PostgreSQL",
      "Prisma 6.3",
      "TypeScript 5",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Redis",
      "JWT",
      "Zod",
      "@dnd-kit",
      "Framer Motion",
      "next-intl",
    ],
    year: "2025",
    image: "/menu-qr.webp",
    url: "https://www.menu-qr.tn/",
  },
  {
    id: 5,
    slug: "kindra-ecommerce",
    featured: false,
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Drizzle ORM",
      "Stripe",
      "Cloudflare R2",
      "Docker",
      "Oslo",
      "Zod",
    ],
    year: "2024",
    image: "/kindra-hero.webp",
    url: "https://kindra.benarfa.com/",
  },
];

export const WORK_EXPERIENCE = [
  {
    id: 1,
    year: "Nov 2024 – Present",
    role: "Full-Stack Developer",
    company: "D-TALK Startup",
    description:
      "Building the frontend for a fashion-tech marketplace with multi-role dashboards and a real-time product customizer.",
    details:
      "Built canvas-based product customization with Konva.js. Set up a reusable component library. Managed complex multi-role state with Zustand and TanStack Query. Translated Figma designs into accessible, responsive UIs.",
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
    year: "Jun 2025 – Aug 2025",
    role: "Full-Stack Developer (Contract)",
    company: "Tactix – Software Agency",
    description:
      "Built an e-commerce platform in an 8-week sprint as part of a 4-person team.",
    details:
      "Built RESTful APIs with Nest.js. Added page transition animations with Framer Motion. Worked in a small Agile team with weekly sprints and shipped ahead of schedule.",
    tech: ["React", "Nest.js", "MongoDB", "Framer Motion"],
  },
  {
    id: 3,
    year: "Aug 2024 – Oct 2024",
    role: "Full-Stack Development Instructor",
    company: "NGB Professional",
    description:
      "Taught a MERN stack training program for aspiring developers.",
    details:
      "Designed and delivered a curriculum covering MongoDB, Express, React, and Node.js. Built hands-on projects simulating real-world scenarios. Mentored students through portfolio development.",
    tech: ["MongoDB", "Express", "React", "Node.js", "PostgreSQL"],
  },
  {
    id: 4,
    year: "Jun 2022 – Present",
    role: "Independent Software Consultant",
    company: "Self-Employed",
    description:
      "Freelance developer building MVPs and production apps for clients.",
    details:
      "Worked with startups and small businesses to build web apps across e-commerce, SaaS, and productivity. Projects range from MVPs to production deployments. Most clients are repeat customers.",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MySQL"],
  },
];

