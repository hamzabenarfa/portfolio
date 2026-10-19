export interface Engagement {
  company: string;
  role: string;
  period: string;
  overview: string;
  stack: string[];
}

export const ENGAGEMENTS: Engagement[] = [
  {
    company: "Robosim.AI",
    role: "Software Engineer · Robotics & AI",
    period: "Jul 2026 — Sep 2026",
    overview:
      "Built a platform where teams design 3D warehouses, simulate robots, and ship apps to their fleets. Owned it end to end — from the interactive simulator and AI design assistant to the cloud infrastructure behind it.",
    stack: ["Next.js", "React Three Fiber", "FastAPI", "LLM agents", "AWS", "Terraform", "GitLab CI/CD"],
  },
  {
    company: "D-TALK Startup",
    role: "Full-Stack Developer · Fashion Tech",
    period: "Nov 2024 — Oct 2026",
    overview:
      "Multi-role fashion marketplace with a real-time canvas customizer and distinct workflows for designers, brands, and admins. Owned deployments, CI/CD, monitoring, and Terraform-managed Azure, and migrated the data layer to PostgreSQL with PgBouncer.",
    stack: ["Next.js", "Konva.js", "Zustand", "NestJS", "PostgreSQL", "Azure", "Terraform"],
  },
  {
    company: "Tactix Solutions",
    role: "Full-Stack Developer (Contract)",
    period: "Jun 2025 — Jul 2025",
    overview:
      "Built and delivered a production-ready e-commerce platform with a modular architecture, and a fast, accessible interface designed for future feature growth.",
    stack: ["React", "NestJS", "Tailwind CSS", "shadcn/ui"],
  },
  {
    company: "NGB Professional",
    role: "Full-Stack Development Trainer",
    period: "Aug 2024 — Oct 2024",
    overview:
      "Delivered hands-on full-stack training across the development lifecycle — Clean Architecture, Git Flow, and Dockerized deployment — guiding learners to portfolio-ready apps.",
    stack: ["Node.js", "React", "Docker", "Git Flow"],
  },
  {
    company: "Freelance & Self-Employed",
    role: "Full-Stack Developer",
    period: "Jun 2022 — 2025",
    overview:
      "Built custom web products for clients from requirements and architecture through deployment and iteration — MVP to production, with direct scope and trade-off decisions.",
    stack: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
  },
];

export const STACK_GROUPS: { label: string; items: string[] }[] = [
  { label: "Frontend & 3D", items: ["Next.js", "React", "React Three Fiber", "Three.js", "Konva.js", "Zustand", "TanStack Query", "Tailwind CSS", "shadcn/ui"] },
  { label: "Backend", items: ["NestJS", "FastAPI", "Node.js", "PostgreSQL", "PgBouncer", "Prisma", "SQLAlchemy", "Pydantic", "WebSockets"] },
  { label: "Cloud & DevOps", items: ["AWS", "Azure", "Terraform", "Docker", "GitLab CI/CD", "GitHub Actions", "Monitoring"] },
  { label: "AI & Product", items: ["LLM integration", "Agentic workflows", "Multi-provider APIs", "Streaming AI UX", "Recommendation systems"] },
  { label: "Practices", items: ["System design", "TDD", "Clean Architecture", "Integration testing", "Playwright", "Git Flow", "Mentoring"] },
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
];
