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

export const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects Shipped" },
  { value: "100%", label: "Client Satisfaction" },
];

export const SKILLS = {
  frontend: [
    { name: "React / Next.js", level: 5 },
    { name: "TypeScript", level: 5 },
    { name: "Tailwind CSS", level: 5 },
    { name: "Framer Motion", level: 4 },
    { name: "React Native", level: 3 },
  ],
  backend: [
    { name: "Node.js", level: 4 },
    { name: "NestJS", level: 4 },
    { name: "PostgreSQL", level: 4 },
    { name: "Prisma / Drizzle", level: 4 },
    { name: "REST / GraphQL", level: 4 },
  ],
  tools: [
    { name: "Git / GitHub", level: 5 },
    { name: "Docker", level: 4 },
    { name: "Vercel / AWS", level: 4 },
    { name: "Stripe", level: 4 },
    { name: "Figma", level: 3 },
  ],
};

export const PROJECTS = [
  {
    id: 1,
    slug: "dtalk-ecosystem",
    featured: true,
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Fabric.js",
      "Konva",
      "Radix UI",
      "next-intl",
      "Zod",
      "Server Actions",
    ],
    year: "2024",
    image: "/dtalk.png",
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
    image: "/vertex.png",
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
    image: "/planner.png",
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
    image: "/menu-qr.png",
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
    image: "/kindra-hero.png",
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
      "Architecting the frontend for a Series-seed fashion-tech platform processing monthly design transactions.",
    details:
      "Led implementation of advanced canvas-based product customization with Konva.js achieving high-performance render performance. Established component library reducing development time by 40%. Achieved Lighthouse scores >90 across all metrics while managing complex multi-role state with Zustand and TanStack Query. Translated Figma designs into accessible, performant UIs with pixel-perfect accuracy.",
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
      "Delivered a high-performance e-commerce platform in an aggressive 8-week sprint.",
    details:
      "Built RESTful APIs with Nest.js handling daily requests. Implemented Framer Motion animations improving perceived performance by 35%. Collaborated in a 4-person Agile team with 95% sprint completion rate. The project was recognized internally as a model for efficient delivery.",
    tech: ["React", "Nest.js", "MongoDB", "Framer Motion"],
  },
  {
    id: 3,
    year: "Aug 2024 – Oct 2024",
    role: "Full-Stack Development Instructor",
    company: "NGB Professional",
    description:
      "Led comprehensive MERN stack training programs.",
    details:
      "Designed and delivered curriculum covering MongoDB, Express, React, and Node.js to aspiring developers. Created hands-on projects simulating real-world scenarios. Mentored students through portfolio development.",
    tech: ["MongoDB", "Express", "React", "Node.js", "PostgreSQL"],
  },
  {
    id: 4,
    year: "Jun 2022 – Present",
    role: "Independent Software Consultant",
    company: "Self-Employed",
    description:
      "Delivered projects from MVP to production.",
    details:
      "Specialized in transforming startup ideas into scalable products. Built applications serving combined users across e-commerce, SaaS, and productivity domains. Maintained 100% client satisfaction with repeat business from 60% of clients. Notable projects include full e-commerce platforms, SaaS tools, and mobile applications.",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MySQL"],
  },
];

