export interface ServicePage {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  answer: string;
  outcomes: string[];
  deliverables: string[];
  relatedProjectSlugs: string[];
  updatedAt: string;
}

export const SERVICES: ServicePage[] = [
  {
    slug: "mvp-development",
    title: "MVP Development for SaaS and Web Products",
    shortTitle: "MVP Development",
    description:
      "Full-stack MVP development for founders who need a usable SaaS, marketplace, dashboard, or internal tool launched with the core product path working.",
    answer:
      "MVP development should prove the core workflow quickly without creating throwaway code. I help founders define scope, build the product path, connect auth, data, payments or admin needs, and deploy a version that real users can test.",
    outcomes: ["Clear scope and launch path", "Core user flows implemented", "Production deployment ready for feedback"],
    deliverables: ["Product scope", "Frontend and backend", "Auth and data model", "Deployment checklist"],
    relatedProjectSlugs: ["menu-qr", "kindra"],
    updatedAt: "2026-05-14",
  },
  {
    slug: "saas-platform-development",
    title: "SaaS Platform Development",
    shortTitle: "SaaS Platforms",
    description:
      "Design and implementation of multi-user SaaS platforms with roles, dashboards, analytics, billing, content operations, and maintainable architecture.",
    answer:
      "A SaaS platform needs more than pages and forms. I build the product structure around users, roles, data ownership, admin workflows, billing or subscriptions, and deployment so the platform can support real operations after launch.",
    outcomes: ["Role-aware product architecture", "Admin and operator workflows", "Maintainable codebase for iteration"],
    deliverables: ["RBAC", "Dashboards", "Billing/data flows", "Operational documentation"],
    relatedProjectSlugs: ["menu-qr", "dtalk-ecosystem"],
    updatedAt: "2026-05-14",
  },
  {
    slug: "custom-editor-development",
    title: "Custom Editor and Visual Tool Development",
    shortTitle: "Custom Editors",
    description:
      "Custom canvas editors, visual configurators, mockup tools, product customizers, and image-oriented interfaces built with modern React stacks.",
    answer:
      "Custom editors need precise interaction design, reliable state management, export flows, and performance care. I build canvas and visual tools for product customization, menu editing, image workflows, and internal operators.",
    outcomes: ["Interactive product experiences", "Reliable editor state model", "Export or publishing workflow"],
    deliverables: ["Canvas/editor UI", "State management", "Asset handling", "Export/publish flows"],
    relatedProjectSlugs: ["dtalk-ecosystem", "menu-qr"],
    updatedAt: "2026-05-14",
  },
  {
    slug: "devops-launch-infrastructure",
    title: "DevOps and Launch Infrastructure",
    shortTitle: "Launch Infrastructure",
    description:
      "Docker, CI/CD, cloud deployment, environment setup, monitoring basics, and production readiness for small product teams.",
    answer:
      "Launch infrastructure should make deployment repeatable and understandable. I set up environments, Docker, CI/CD, hosting, storage, and operational notes so a product can ship without hidden manual steps.",
    outcomes: ["Repeatable deployments", "Clear environment setup", "Lower launch risk"],
    deliverables: ["Docker setup", "CI/CD pipeline", "Hosting configuration", "Runbook"],
    relatedProjectSlugs: ["kindra", "dtalk-ecosystem"],
    updatedAt: "2026-05-14",
  },
];

export function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
