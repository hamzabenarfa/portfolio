/**
 * English project copy, formerly sourced from messages/en.json (`projectsItems`).
 * Single source of truth for project case-study content now that i18n is removed.
 */
export interface ProjectContent {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  impact: string[];
  keyFeatures: string[];
}

export const PROJECT_CONTENT: Record<string, ProjectContent> = {
  "dtalk-ecosystem": {
    title: "D-Talk Ecosystem",
    subtitle: "Fashion Marketplace",
    category: "E-Commerce / SaaS",
    description:
      "Frontend for a fashion-tech marketplace connecting designers, brands, and buyers. Features a canvas-based product customizer and role-specific dashboards for 4 user types.",
    longDescription:
      "Built the frontend for a multi-role fashion e-commerce platform. The app lets designers upload and sell their work, brands browse and purchase designs, and admins manage the ecosystem. Includes a browser-based design editor (Konva.js) for real-time product customization across multiple print areas.",
    problem:
      "Fashion designers needed a platform to sell digital designs directly to brands, and brands needed a way to customize and order products without back-and-forth.",
    solution:
      "Built a multi-role platform with separate dashboards for designers, brands, and admins. Added a real-time canvas editor for product customization with live previews.",
    impact: [
      "4-role architecture (Designer, Fashion Designer, Brand, Admin)",
      "Real-time canvas-based product customizer",
      "Role-specific dashboards and workflows",
      "Lighthouse scores >90",
    ],
    keyFeatures: [
      "Multi-role architecture with specialized dashboards",
      "Canvas-based design editor with Fabric.js and Konva",
      "AI-assisted design generation and custom uploads",
      "Full e-commerce system with cart, favorites, and payments",
      "Earnings tracking and withdrawal system for creators",
      "HTTP-only cookie auth with JWT and role-based access control",
      "Built-in i18n (English and French)",
      "Azure Blob Storage for image management",
    ],
  },
  "menu-qr": {
    title: "Menu QR",
    subtitle: "Digital Restaurant Menu",
    category: "SaaS / Restaurant Tech",
    description:
      "SaaS platform for restaurants to create and manage digital menus accessible via QR code. Includes an onboarding wizard, drag-and-drop menu editor, and analytics dashboard.",
    longDescription:
      "Full-stack SaaS for digital restaurant menus. Restaurant owners create their menu through an 8-step setup wizard, manage it with a hierarchical drag-and-drop editor, and share it via customizable QR codes. Built with NestJS backend and Next.js frontend, with multilingual support including Arabic RTL.",
    problem:
      "Restaurants needed a simple way to create contactless digital menus that they could update in real-time, without reprinting costs or technical skills.",
    solution:
      "Built an end-to-end platform with guided onboarding, a visual menu editor, customizable QR codes, and an analytics dashboard.",
    impact: [
      "8-step guided onboarding",
      "Multi-language support (EN, FR, AR with RTL)",
      "Real-time menu updates",
      "Analytics dashboard for scan tracking",
    ],
    keyFeatures: [
      "8-step onboarding wizard for restaurant setup",
      "Drag-and-drop menu editor with hierarchical organization",
      "Real-time menu updates — edit prices, hide items during service",
      "Multilingual support with RTL for Arabic",
      "Analytics dashboard with scan and engagement tracking",
      "Customizable QR codes with PDF export",
      "Image optimization with client-side WebP compression",
      "JWT and OAuth 2.0 authentication with role-based access",
    ],
  },
  kindra: {
    title: "KINDRA",
    subtitle: "Fashion E-Commerce Starter",
    category: "E-Commerce / Starter Kit",
    description:
      "Production-ready e-commerce starter kit for fashion. Separate Men's and Women's storefronts, multi-variant products (size/color), Stripe payments, and a full admin dashboard.",
    longDescription:
      "A SaaS starter kit for launching fashion e-commerce sites. Features separate Men's and Women's collections, multi-variant product support, Stripe checkout, and a complete admin suite. Runs on Docker with Cloudflare R2 for image storage.",
    problem:
      "Starting a fashion e-commerce site from scratch takes months. Multi-variant products, payments, and image storage add complexity.",
    solution:
      "Built a ready-to-deploy starter kit with all the common features baked in — storefronts, admin, payments, and image hosting.",
    impact: [
      "Ready to deploy out of the box",
      "Dual image storage (Cloudflare R2 + Vercel Blob)",
      "Custom session-based auth with OAuth support",
    ],
    keyFeatures: [
      "Separate Men's and Women's storefronts",
      "Multi-variant product support (Size/Color)",
      "Stripe Checkout with webhook fulfillment",
      "Admin dashboard for inventory and orders",
      "Custom session-based auth with OAuth",
      "Dynamic routing and product filtering",
      "Image storage with Cloudflare R2 and Vercel Blob",
      "SEO-optimized with dynamic metadata",
    ],
  },
};
