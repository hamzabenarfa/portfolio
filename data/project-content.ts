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
  autopart: {
    title: "AutoParts Tunisia",
    subtitle: "Verified Car-Parts Marketplace",
    category: "Marketplace / E-Commerce",
    description:
      "A French, mobile-first marketplace for car parts in Tunisia. Every order is confirmed by a real phone call to the supplier, secured with a 20% deposit, and delivered cash-on-delivery — designed to kill the no-stock, price-switch scams that plague local parts buying.",
    longDescription:
      "AutoParts Tunisia connects drivers and garages with verified parts suppliers across the country. Buyers find compatible parts through a vehicle finder or full-text search, place an order with a 20% deposit, and a human operator calls the supplier to confirm real stock before anything ships. It's a three-sided platform — a customer storefront, an admin call-and-deposit queue, and a supplier inventory and fulfilment dashboard — built on Next.js 16 with a Neon Postgres core, Meilisearch for search, and Cloudflare R2 for media.",
    problem:
      "Buying car parts in Tunisia is a minefield: listings advertise stock that doesn't exist, prices change at pickup, and buyers get burned on deposits. There was no trusted way to order a specific part for a specific vehicle and actually receive it.",
    solution:
      "A marketplace with human verification at its core. Orders enter an AWAITING_DEPOSIT state, a 20% deposit locks them in, and an operator calls the supplier to confirm stock before fulfilment — the balance paid cash on delivery. A deposit-deadline cron auto-expires stale orders so inventory never gets stuck.",
    impact: [
      "Three-sided platform: customer, admin, and supplier surfaces",
      "Human stock-verification call before every shipment",
      "20% deposit + cash-on-delivery order engine with deadline crons",
      "Vehicle-compatibility finder over a seeded parts catalogue",
    ],
    keyFeatures: [
      "Vehicle finder (make / model / engine) plus Meilisearch part search",
      "20%-deposit order engine with an AWAITING_DEPOSIT → expiry state machine",
      "Admin call queue for human stock verification and deposit tracking",
      "Supplier dashboard for inventory, shipping, and payouts",
      "Magic-link, Google, and credential auth via Auth.js",
      "Cloudflare R2 presigned uploads for deposit proofs and used-part photos",
      "Deposit-deadline and reminder cron jobs",
      "French, mobile-first UI built for the Tunisian market",
    ],
  },
  beadcraft: {
    title: "BeadCraft Studio",
    subtitle: "Made-to-Order Bracelet Commerce",
    category: "Artisan E-Commerce / Configurator",
    description:
      "A bilingual storefront and crafter dashboard for a Tunisian artisan selling custom, made-to-order beaded bracelets — with a visual configurator that lets customers string their own design, bead by bead, before checkout.",
    longDescription:
      "BeadCraft Studio turns a one-person handmade-bracelet business into a real online product. Customers browse bead collections and ready-made designs, then open a visual configurator to build their own bracelet — choosing beads, cord, and charm with a live preview — and save, share, or order it. Behind the storefront, the crafter runs a dashboard for inventory, an order pipeline (New → Confirmed → In Production → Shipped → Delivered), and per-wilaya shipping. Built on Next.js 16 Server Components with Zustand driving the interactive surfaces.",
    problem:
      "A skilled artisan could make beautiful custom bracelets but had no way to sell them online — no product catalogue, no way for customers to visualise a custom piece, and no system to manage made-to-order production and Tunisian delivery.",
    solution:
      "A two-surface app: a warm, bilingual storefront with a real-time bracelet configurator that makes customisation feel tactile, and a crafter dashboard that turns each custom order into a tracked production job with idempotent checkout and per-wilaya shipping.",
    impact: [
      "Visual bracelet configurator with live preview and shareable designs",
      "Bilingual (EN/FR) storefront with TND pricing and 24-wilaya delivery",
      "Crafter dashboard: inventory, order pipeline, shipping editor, KPIs",
      "Idempotent checkout and optimistic-locked order transitions",
    ],
    keyFeatures: [
      "Real-time 2D bracelet configurator (curved / flat / grid layouts)",
      "Save, share, and reorder custom designs via share keys",
      "Bilingual EN/FR storefront with bead collections and ready-made designs",
      "Guest checkout across 24 Tunisian wilayas with TND pricing",
      "Crafter dashboard with a New → Delivered order pipeline",
      "Per-wilaya shipping-fee editor and KPI overview",
      "Idempotency keys on order creation; optimistic locking on status changes",
      "Repository-pattern data access with Zod validation at every boundary",
    ],
  },
  vertex: {
    title: "Vertex",
    subtitle: "E-Commerce & Admin Boilerplate",
    category: "Starter Kit / Architecture",
    description:
      "A production-ready Next.js e-commerce and admin boilerplate built on Clean Architecture and Domain-Driven Design — a storefront, a full admin dashboard, and Stripe billing, structured into clean domain, use-case, and infrastructure layers.",
    longDescription:
      "Vertex is a developer-facing starter kit for launching scalable e-commerce and SaaS apps without re-solving the same plumbing. It ships a complete storefront (catalog, cart, favorites, Stripe checkout, and a customer billing portal) and an admin dashboard (products, categories, orders, users), all organized with Domain-Driven Design: business entities and repository interfaces in the domain layer, application logic in use-cases and server actions, and external services (Prisma, Stripe, Mailgun) isolated in infrastructure. The goal is a codebase that stays maintainable as it grows.",
    problem:
      "Most e-commerce starters tangle UI, data access, and third-party calls together, so they rot as the app grows. Teams need a foundation that's production-ready on day one but still cleanly layered enough to scale.",
    solution:
      "A boilerplate built around Clean Architecture: a typed domain core, a use-case and server-action application layer, and a swappable infrastructure layer for Prisma, Stripe, and Mailgun — with a working storefront and admin dashboard on top.",
    impact: [
      "Clean Architecture / DDD: domain, application, and infrastructure layers",
      "Complete storefront + admin dashboard out of the box",
      "Stripe Checkout, webhooks, and a customer billing portal",
      "Swappable infrastructure (Prisma, Stripe, Mailgun) behind interfaces",
    ],
    keyFeatures: [
      "Domain-Driven Design with entities, repositories, and use-cases",
      "Storefront: catalog, filtering, cart and favorites (Zustand-persisted)",
      "Stripe Checkout with webhooks and a self-service billing portal",
      "Admin dashboard for products, categories, orders, and users",
      "NextAuth.js v5 authentication with Google provider",
      "React Hook Form + Zod validation across all forms",
      "Mailgun transactional email integration",
      "Type-safe Prisma data layer over PostgreSQL",
    ],
  },
  "dtalk-ecosystem": {
    title: "D-Talk Ecosystem",
    subtitle: "Fashion Marketplace",
    category: "E-Commerce / SaaS",
    description:
      "Frontend architecture for a fashion-tech marketplace that connects designers, brands, and buyers — built around a browser-based product customizer and four role-specific dashboards in a single app.",
    longDescription:
      "I built the frontend for a multi-role fashion e-commerce platform where designers upload and sell their work, brands browse and customize products, and admins run the ecosystem. The centerpiece is a real-time canvas editor (Fabric.js + Konva) that lets users place artwork across multiple print areas with live previews — wired into a typed data layer with TanStack Query and Zustand, role-based access, and bilingual EN/FR support.",
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
    subtitle: "QR Ordering for Restaurants",
    category: "SaaS / Restaurant Tech",
    description:
      "A SaaS platform that puts a restaurant's menu on every table behind a single QR code — turning scans into orders and reviews with no app to download. Used by 120+ Tunisian cafes, restaurants, and bakeries.",
    longDescription:
      "Menu QR lets a cafe, restaurant, or bakery put a small QR code on each table and turn it into orders, reviews, and live analytics — no app download for diners, no expensive POS terminal for owners. Businesses self-onboard in minutes, build their menu in a drag-and-drop editor, and watch orders land on a live dashboard. The trilingual frontend (English, French, and Arabic with RTL) is built on Next.js 16 with TanStack Query, react-hook-form, and a shadcn/Radix design system; sign-in is passwordless via WhatsApp OTP.",
    problem:
      "Restaurants needed contactless menus they could update in real time — without reprinting costs, an app-download barrier for diners, or a pricey POS terminal.",
    solution:
      "An end-to-end platform: guided self-onboarding, a drag-and-drop menu editor, per-table QR codes, passwordless WhatsApp-OTP login, and a live orders and analytics dashboard — launchable in about ten minutes with no bank card required.",
    impact: [
      "Used by 120+ Tunisian businesses, from La Marsa to Sfax",
      "Trilingual: English, French, and Arabic with full RTL",
      "Per-table QR → live orders, reviews, and scan analytics",
      "No app download for diners; no POS terminal for owners",
    ],
    keyFeatures: [
      "Per-table QR codes that turn scans into orders and reviews",
      "Drag-and-drop menu editor with real-time updates",
      "Passwordless sign-in via WhatsApp OTP",
      "Live orders dashboard with revenue, scans, and ticket analytics",
      "Trilingual UI (EN / FR / AR) with right-to-left support",
      "Guided self-onboarding — live in about ten minutes",
      "Engagement analytics with charts via Recharts",
      "Next.js 16 frontend with TanStack Query and a shadcn/Radix system",
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
