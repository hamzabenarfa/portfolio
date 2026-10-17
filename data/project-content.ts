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
      "A French, mobile-first marketplace for car parts in Tunisia. Every order is confirmed by a real phone call to the supplier and secured with a 20% deposit — paid manually via bank transfer, D17, Wafacash, or postal mandat and reviewed by an admin — before the balance is settled cash-on-delivery.",
    longDescription:
      "AutoParts Tunisia connects drivers and garages with parts suppliers across the country. Buyers find compatible parts through a vehicle-fit finder (make/model/engine) or Meilisearch full-text search, place an order, and a human admin phones the supplier to confirm real stock and lock in a price before anything moves forward. The buyer then sends a 20% deposit through an external channel (bank transfer, D17, Wafacash, or a postal Mandat Minute) and submits a reference code or receipt photo for admin review — the remaining 80% is paid cash on delivery. It's a three-role system — a customer storefront, an admin call-and-deposit-review queue, and a supplier inventory/shipping/payout dashboard — built on Next.js 16 with a Neon Postgres core, Meilisearch for search, and Cloudflare R2 for media storage.",
    problem:
      "Buying car parts in Tunisia is a minefield: listings advertise stock that doesn't exist, prices get renegotiated at pickup, and there's no trusted way to order a specific part for a specific vehicle and actually receive it.",
    solution:
      "A marketplace with human verification at its core. An admin calls the supplier to confirm real stock and agree a price before the order can proceed; a 20% deposit — paid manually and reviewed by an admin — locks the order in, with the balance cash-on-delivery. A 24-hour deposit-deadline cron automatically fails unpaid orders so the reserved part frees up for the next buyer, and a reminder job nudges buyers 3-4 hours before the deadline.",
    impact: [
      "Three-role system: distinct customer, admin, and supplier surfaces sharing one order state machine",
      "Human call-based stock verification gates every order before a deposit is even requested",
      "20% deposit + cash-on-delivery order engine with automatic 24h deadline expiry and reminders",
      "Vehicle-fit finder (make/model/engine) layered over Meilisearch full-text part search",
    ],
    keyFeatures: [
      "Vehicle-fit finder — pick your car's make, model, and engine to filter parts to only what actually fits, backed by a seeded catalogue of 100+ brands and 2,000+ models",
      "Meilisearch full-text search — typo-tolerant part search with filters for brand, condition, and price",
      "20% deposit order engine — an explicit order state machine where a 24-hour cron auto-fails orders whose deposit never arrives, freeing the reserved part",
      "Admin call queue — a click-to-call admin view where a human phones the supplier to confirm real stock and set the final price before any money is requested",
      "Manual deposit + admin review — buyers pay the 20% deposit via bank transfer, D17, Wafacash, or a postal money order, then submit a reference code and/or receipt photo for an admin to verify",
      "Supplier dashboard — inventory, shipment handoff, and payout tracking for verified parts vendors, with an 8% platform commission calculated automatically on completed orders",
      "Passwordless customer accounts — sign in with a magic email link or Google only when placing an order; browsing and searching require no account at all",
      "French, mobile-first UI purpose-built for the Tunisian market",
    ],
  },
  beadcraft: {
    title: "BeadCraft Studio",
    subtitle: "Made-to-Order Bracelet Commerce",
    category: "Artisan E-Commerce / Configurator",
    description:
      "A bilingual storefront and crafter dashboard for a Tunisian artisan selling custom, made-to-order beaded bracelets — with a visual configurator that lets customers string their own design, bead by bead, before checkout.",
    longDescription:
      "BeadCraft Studio turns a one-person handmade-jewelry business into a real online product. Customers browse bead collections and ready-made designs, then open a live configurator to build their own piece bead-by-bead — choosing beads, cord, and a charm with a real-time price breakdown — and save or share it by link before checkout. Behind the storefront, the crafter runs a dashboard for inventory, an order pipeline (New → Confirmed → In Production → Shipped → Delivered), and a KPI overview. Built on Next.js 16 Server Components with Zustand driving the interactive surfaces.",
    problem:
      "A skilled artisan could make beautiful custom bracelets but had no way to sell them online — no product catalogue, no way for customers to visualise a custom piece, and no system to manage made-to-order production and delivery across Tunisia.",
    solution:
      "A two-surface app: a warm, bilingual storefront with a real-time bead configurator that makes customisation feel tactile, and a crafter dashboard that turns each custom order into a tracked production job with idempotent checkout and safe concurrent status updates.",
    impact: [
      "Visual bead configurator with live pricing and shareable designs",
      "Bilingual (EN/FR) storefront with TND pricing and delivery across all 24 Tunisian wilayas",
      "Crafter dashboard: inventory, order pipeline, and a KPI overview",
      "Idempotent checkout and optimistic-locked order status transitions",
    ],
    keyFeatures: [
      "Real-time 2D bead configurator with curved, flat, and grid layouts — customers click a slot to place a bead and watch the piece and its price update live",
      "Save and share custom designs via a link — anyone with the link can reopen the exact design in the configurator",
      "Bilingual EN/FR storefront with bead collections and ready-made designs",
      "Guest checkout across all 24 Tunisian wilayas with TND pricing — no account required to order",
      "Crafter dashboard with a five-stage order pipeline (New → Confirmed → In Production → Shipped → Delivered)",
      "KPI overview: revenue, order volume, average order value, and units currently in production",
      "Checkout retries can't create duplicate orders — a repeated request with the same idempotency key returns the original order instead of creating a second one",
      "Order status updates use optimistic locking, so two staff members updating the same order at once can't silently overwrite each other's change",
    ],
  },
  vertex: {
    title: "Vertex",
    subtitle: "E-Commerce & Admin Codebase",
    category: "Architecture Demo / E-Commerce",
    description:
      "A Next.js e-commerce and admin codebase pairing a working storefront — catalog, cart, favorites, Stripe Checkout — with a back-office admin panel, built to demonstrate a ports-and-adapters (DDD) pattern on its auth layer while the commerce core stays a straightforward server-actions-over-Prisma app.",
    longDescription:
      "Vertex is a personal e-commerce-and-admin project on Next.js 15 and React 19: a storefront with product filtering, a Zustand-persisted cart and favorites list, and real Stripe Checkout with webhook-driven order fulfillment, plus an admin panel for managing products, categories, brands, and viewing orders and users. Its most interesting architectural choice lives in the auth flow — user and company accounts are modeled with entities, repository interfaces, and use-cases in a small domain layer, in the style of Domain-Driven Design — while the rest of the app (products, cart, orders) intentionally stays simple: server actions calling Prisma directly, no extra layers to maintain for code that doesn't need them.",
    problem:
      "Most from-scratch e-commerce builds spend their first weeks on the same plumbing — auth, cart persistence, Stripe wiring, an admin CRUD panel — before any product-specific work can start.",
    solution:
      "A working storefront and admin panel on Next.js, Prisma, and Stripe, with one bounded context (auth/user/company) built out as a small worked example of a ports-and-adapters layering, so the pattern is there to extend into the rest of the app if a project needs it.",
    impact: [
      "Full storefront-to-checkout loop: catalog filtering, persisted cart and favorites, Stripe Checkout with webhook-driven order fulfillment and stock decrement",
      "Admin panel for products, categories, and brands with image upload via Vercel Blob",
      "A worked ports-and-adapters example on the auth/company flow — entity, repository interface, and use-case layers, kept separate from the rest of the app's simpler server-actions pattern",
      "NextAuth v5 (Auth.js) with Google sign-in and a Prisma-backed session/adapter setup",
    ],
    keyFeatures: [
      "Product catalog with category, price-range, and brand filtering, backed by Prisma over PostgreSQL",
      "Cart and favorites list kept in the browser via Zustand (a small state-management library) with a persist plugin so they survive a page reload, and synced to the database for signed-in users",
      "Real Stripe Checkout: line items built from the cart, a webhook confirms payment and flips the order to Paid, then decrements product stock",
      "Admin panel for products, categories, and brands — create, edit, and image-upload via Vercel Blob storage — plus read-only order and user lists and a 12-month revenue chart",
      "NextAuth v5 (also called Auth.js) handles sign-in with Google, backed by a Prisma adapter that stores sessions in Postgres",
      "One part of the app (user accounts and their linked \"company\" record) is built as a small Domain-Driven Design example: business logic lives in framework-free classes, talking to the database only through a repository interface — shown here on one flow rather than the whole app",
      "Zod schema validation runs server-side on every admin form submission",
      "Type-safe Prisma ORM over PostgreSQL for every data model — users, companies, products, categories, brands, carts, favorites, and orders",
    ],
  },
  "dtalk-ecosystem": {
    title: "D-Talk Ecosystem",
    subtitle: "B2B Fashion Marketplace",
    category: "Marketplace / Fashion Tech",
    description:
      "A B2B fashion marketplace where designers sell artwork and garment templates to brand accounts. Brands customize a design in a real-time, multiplayer canvas editor, pay a deposit to have one physical sample made, then pay the balance to trigger the bulk production run — all across four role-specific dashboards in one app.",
    longDescription:
      "I built the frontend for a multi-role fashion marketplace where designers and fashion (technical) designers sell artwork and templates, brand accounts license and customize products, and admins moderate the whole ecosystem. The centerpiece is a browser-based canvas editor (Fabric.js, with React-Konva for the product-mockup stage) that places artwork across a garment's print areas with live previews — and turns multiplayer, with live cursors and edit-control handoff over WebSockets. It's wired into a typed data layer (TanStack Query + Zustand), httpOnly-cookie auth with role-based routing, an Azure Blob image pipeline with an AI background-removal step, and a full English/French translation. The commerce loop is deliberate: a brand pays a deposit to get one sample produced, approves it, then pays the balance to start bulk production — with creator earnings and withdrawals tracked underneath. On the shared Spring Boot API I was a minority contributor (~19% of commits); the frontend was ~98% mine.",
    problem:
      "Independent fashion designers had no direct channel to sell artwork and technical templates to brands, and brands had no way to license a design, customize it on a real product, and commit to production without slow, costly back-and-forth — and no way to de-risk a large order.",
    solution:
      "A single platform that connects designers straight to brand accounts: designers list artwork and templates, brands customize them in a real-time collaborative canvas editor, then pay a deposit for one physical sample and only pay the balance once they've approved it — with admin moderation and creator payouts running underneath.",
    impact: [
      "Sole frontend engineer on the app (~98% of the frontend repo); minority contributor on the shared Spring Boot API (~19%)",
      "Real-time, multiplayer canvas customizer — live cursors and edit-control handoff over WebSockets",
      "Deposit-then-balance ordering that lets brands approve a physical sample before committing to a bulk run",
      "Four role-specific dashboards (Designer, Fashion Designer, Brand, Admin) driving one shared workflow, fully bilingual EN/FR",
    ],
    keyFeatures: [
      "Real-time collaborative canvas editor — place artwork across a garment's print areas with live previews; built with Fabric.js (plus React-Konva for the product mockup), so every edit renders in the browser instead of waiting on the server",
      "Multiplayer editing — several people can open the same design at once, see each other's cursors, and pass edit control back and forth, synced over WebSockets",
      "AI background removal — upload any image and a neural-network model (U2-Net, run on the server) cleanly cuts the subject out of its background so it drops onto a product; you can also upload ready-made art",
      "Guided design finder — a short questionnaire (product, style, budget, keywords) surfaces matching designs from the catalogue so brands don't start from a blank page",
      "Deposit-then-balance checkout via Konnect — a brand pays a deposit to have one physical sample produced, and only after approving it pays the balance to trigger the full bulk production run; a pay-by-bank-check option exists too",
      "Creator earnings and withdrawals — designers see what they've earned and request payouts to a saved bank account, with an admin approval-and-proof step",
      "Role-based access with secure sessions — four account types each see only their own dashboard, backed by login tokens stored in httpOnly cookies (JavaScript on the page can't read them)",
      "Bilingual EN/FR everywhere and an Azure Blob image pipeline — the entire app is translated (not just the landing page), and uploaded artwork is stored durably in Azure with private files served through time-limited secure links",
    ],
  },
  "menu-qr": {
    title: "Menu QR",
    subtitle: "QR Ordering for Restaurants",
    category: "SaaS / Restaurant Tech",
    description:
      "A multi-tenant SaaS platform that puts a restaurant's menu on every table behind a single QR code — turning scans into live orders, with no app to download for diners and no POS terminal for owners.",
    longDescription:
      "Menu QR lets a cafe, restaurant, bakery, or bar put a QR code on each table and turn it into a live order — no app download for diners, no expensive POS terminal for owners. Each venue is an independent tenant with its own slug, menu, staff, and one of 28 built storefront designs auto-matched to its business type. Owners self-onboard with no payment step, edit their menu and watch orders land on a live kitchen/orders dashboard, and diners order from their phone in a trilingual storefront — English, French, and Arabic, with full right-to-left layout. It's built on Next.js 16 and React 19, with Prisma/PostgreSQL, Better Auth for passwordless sign-in, TanStack Query, react-hook-form, Zod, and a shadcn/Radix design system.",
    problem:
      "Restaurants needed contactless menus they could update in real time — without reprinting costs, an app-download barrier for diners, or a pricey POS terminal — and without taking on payment processing they didn't want.",
    solution:
      "An end-to-end platform: guided self-onboarding with no payment step, per-table QR codes, passwordless sign-in by magic link or one-time phone code, a menu editor, and a live orders and kitchen dashboard — all multi-tenant from day one, with 28 storefront designs auto-matched to a venue's business type.",
    impact: [
      "Multi-tenant SaaS architecture: independent restaurants, cafes, bakeries, and bars, each with their own slug, menu, and staff",
      "Trilingual English, French, and Arabic with full right-to-left layout",
      "Per-table QR codes drive live, kitchen-synced ordering with no app download and no POS terminal",
      "28 distinct storefront designs, auto-matched to a venue's business type at signup",
    ],
    keyFeatures: [
      "Per-table QR codes that open a mobile ordering page — no app to download for diners",
      "Passwordless sign-in by magic link or a one-time phone code (a 6-digit code instead of a password)",
      "Live kitchen display and orders dashboard, polling in real time so staff always see the current queue",
      "A menu editor for photos, pricing, modifiers, and availability, always current on the next customer load",
      "Trilingual storefronts (English, French, Arabic) with genuine right-to-left layout for Arabic, not a mirrored afterthought",
      "28 built storefront designs, auto-matched to the venue's business type (cafe, restaurant, bakery, bar) at onboarding",
      "Guided self-onboarding with zero payment step — a starter menu template gets a venue live fast",
      "Multi-tenant data model: every restaurant is its own tenant with its own plan, trial, tax rates, and staff roles",
    ],
  },
  kindra: {
    title: "KINDRA",
    subtitle: "Editorial Fashion Storefront Example",
    category: "Concept Example / Fashion UI",
    description:
      "An editorial fashion storefront concept — separate Men's and Women's collections, lookbook-style landing sections, and variant-aware product pages, with a full cart-to-payment screen flow built as static UI.",
    longDescription:
      "KINDRA is a design-engineering example for the customer-facing half of a fashion e-commerce concept, built to read like a lookbook instead of a template shop. A motion-led landing page — marquee typography, editorial galleries, and a scroll-carousel last-chance section — flows into separate Men's and Women's storefronts, with section and category routes rendering every collection page from static data files. Product pages carry size and colour variants with a hover-reveal care-instructions panel. The purchase journey — cart, checkout, and payment — is built out screen by screen as a static UI walkthrough: there's no cart state, no payment processor, and no real account system behind it, by design. It's a frontend, design-engineering build: the commerce experience is real; the commerce backend isn't.",
    problem:
      "Shoppers judge a fashion brand in seconds, on feel. Most e-commerce templates read like admin panels with product photos dropped in — building an editorial, motion-rich storefront from scratch takes months a small brand doesn't have, and most portfolio commerce demos either skip the hard screens (checkout, sign-in) or fake a backend that isn't there.",
    solution:
      "A storefront built like a magazine on top of real commerce information architecture: full-bleed imagery and scroll-driven galleries across dual storefronts, data-driven category routing, variant-aware product pages, and every screen of the purchase journey designed and built — cart, checkout, payment, sign-in — ready to be wired to a real commerce backend when one is needed.",
    impact: [
      "Separate Men's and Women's storefronts sharing one Radix-based design system",
      "Editorial landing: marquee typography, lookbook galleries, and a scroll-carousel last-chance section",
      "Section and category routes render every collection page from static data, not hand-built pages",
      "Every purchase-journey screen designed and built — cart, checkout, payment, sign-in — as production-fidelity UI",
    ],
    keyFeatures: [
      "Editorial homepage with marquee typography (a horizontally auto-scrolling text banner) and asymmetric lookbook-style image galleries",
      "Separate Men's and Women's storefronts sharing one component design system",
      "Section and category routes generate collection pages from static data files rather than hand-built pages",
      "Variant-aware product pages: colour swatches and a size grid drive the product detail state, backed by a hover-reveal care-instructions panel",
      "A scroll-snap \"Last Chance\" carousel with previous/next controls and dot navigation",
      "Cart, checkout, and payment screens covering every step of the purchase journey as fully designed static UI — no live cart state or payment processor behind it",
      "A sign-in / sign-up screen with animated toggling between login and account-creation states (no OTP, no real authentication backend)",
      "Radix UI primitives (accessible, unstyled component building blocks) styled into a cohesive shadcn/ui-based design system, animated throughout with Framer Motion",
    ],
  },
};
