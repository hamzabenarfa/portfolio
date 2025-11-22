

export const CURRENT_POSITION = {
  title: "Full Stack Developer",
  company: "@ D-Talk",
  period: "2024 — Present",
};

export const TECH_STACK = [
  "Nextjs",
  "TypeScript",
  "Zustand",
  "TanStack Query",
  "Konva.js",
  "TailwindCSS",
  "Framer Motion",
];
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
];
export const PROJECTS = [
  {
    id: 1,
    slug: "dtalk-ecosystem",
    title: "D-Talk Ecosystem - Multi-Role Fashion Platform",
    description: "A comprehensive fashion e-commerce platform enabling designers to create and sell, brands to customize products, and admins to manage the ecosystem. Features advanced canvas editing, AI-powered design tools, and multi-role dashboards.",
    longDescription: "D-Talk Ecosystem is a sophisticated multi-role platform revolutionizing fashion design and customization. The platform enables designers to create and sell designs, fashion designers to produce technical specifications, brands to purchase and customize products, and administrators to manage the entire ecosystem. Built with Next.js 15, React 19, and advanced canvas libraries, it delivers a seamless experience for all stakeholders.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "Fabric.js", "Konva", "React Hook Form", "Zod", "next-intl", "Azure Blob Storage"],
    year: "2024",
    image: "/dtalk.png",
    url: "https://example.com",
    content: "D-Talk Ecosystem represents a groundbreaking approach to fashion e-commerce, bringing together designers, brands, and administrators in a unified platform that supports the entire design-to-production workflow.\n\n## 🎨 Multi-Role Architecture\n\nThe platform serves four distinct user roles, each with specialized dashboards and workflows. Designers can create and sell their designs through an intuitive interface, while Fashion Designers focus on creating detailed technical specifications. Brands have access to a comprehensive marketplace where they can purchase designs, customize products using advanced canvas tools, and manage their collections. Administrators oversee the entire platform with powerful management tools for users, orders, payments, and content moderation.\n\nRole-based routing ensures each user type accesses only relevant features, with automatic redirects after authentication. The system uses JWT tokens stored in HTTP-only cookies for secure session management, with automatic token injection via Axios interceptors.\n\n## 🖼️ Advanced Design Creation\n\nAt the heart of D-Talk is a powerful design creation and customization system. The platform supports AI-powered design generation, allowing users to create unique designs with minimal effort. Custom design uploads enable designers to bring their existing work into the ecosystem.\n\nThe canvas editor, built with Fabric.js and Konva, provides professional-grade editing capabilities. Designers can work with multiple views—front, back, left, right, and close-ups—ensuring comprehensive product visualization. Print area selection and management tools allow precise control over where designs appear on products, critical for manufacturing accuracy.\n\n## 🛒 Complete E-Commerce Solution\n\nThe platform includes a full-featured e-commerce system supporting both sample and bulk orders. Shopping cart functionality maintains state across sessions, while a favorites system allows brands to save designs for later consideration. Payment integration with Konnect payment gateway ensures secure transactions, and comprehensive order management tracks purchases from placement to delivery.\n\nDelivery tracking provides real-time visibility into order status, while the admin panel enables shipping management and logistics coordination. This end-to-end approach ensures a smooth experience from design selection to product delivery.\n\n## 💰 Earnings & Financial Management\n\nDesigners and fashion designers can track their earnings through a dedicated dashboard. The system supports withdrawal requests with a minimum threshold of 100 TND, and bank account management allows secure payment processing. This financial infrastructure empowers creators to monetize their work effectively.\n\n## 🔐 Security & Internationalization\n\nBuilt with security best practices, the platform uses HTTP-only cookies for token storage, preventing XSS attacks. Role-based access control ensures users can only access features appropriate to their role. The GuardProvider component protects routes at the application level, redirecting unauthorized access attempts.\n\nInternationalization is built-in with support for English and French. The routing system uses locale-based paths (`/en/*`, `/fr/*`), and all UI components are fully translated. This multilingual support makes the platform accessible to a global audience.\n\n## 🏗️ Technical Architecture\n\nBuilt on Next.js 15 with the App Router and React 19, D-Talk leverages the latest React patterns for optimal performance. TypeScript provides comprehensive type safety, while Tailwind CSS ensures consistent, responsive styling across all components.\n\nState management combines Zustand for global client state (particularly design creation workflows) with TanStack Query for server state management. This hybrid approach optimizes performance while maintaining clean separation of concerns.\n\nForm handling uses React Hook Form with Zod validation, providing excellent developer experience and runtime safety. The API layer uses Axios with interceptors for automatic token injection and centralized error handling.\n\nImage storage leverages Azure Blob Storage with secure SAS URL generation, ensuring that sensitive design files are protected while remaining accessible to authorized users. The secure image component handles authentication automatically, simplifying the developer experience.\n\nCanvas manipulation is powered by both Fabric.js and Konva, providing flexibility for different use cases. React Konva bindings enable seamless integration with React's component model, while html2canvas supports conversion of HTML elements to canvas for export functionality.\n\nThe architecture follows modern best practices with clear separation between actions (server-side operations), components (UI), hooks (reusable logic), and services (API layer). This organization ensures maintainability and scalability as the platform grows."
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    title: "Vertex - E-Commerce & Admin Platform",
    description: "A production-ready e-commerce platform for tech gadgets with a modern storefront, comprehensive admin dashboard, and Stripe integration. Built with Domain-Driven Design principles for scalability and maintainability.",
    longDescription: "Vertex is a full-featured e-commerce platform specializing in cutting-edge tech gadgets. The platform combines a beautiful customer-facing storefront with a powerful admin dashboard, enabling seamless product management, order processing, and customer engagement. Built with Next.js 14, React 19, and TypeScript, it delivers exceptional performance and maintainability through Domain-Driven Design principles.",
    tech: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Shadcn/ui", "NextAuth.js", "Zustand", "Stripe", "React Hook Form", "Zod"],
    year: "2024",
    image: "/ecommerce-store-with-products.jpg",
    url: "https://vertex-dun.vercel.app/",
    content: "Vertex represents a modern approach to e-commerce development, combining cutting-edge technology with clean architecture principles. This production-ready platform serves both customers and administrators through a unified, scalable system.\n\n## 🛍️ Customer Experience\n\nThe storefront delivers an exceptional shopping experience with a modern product catalog that supports advanced filtering across multiple categories—from Audio and Camera equipment to Gaming gear, Smartphones, and SmartWatches. Customers can explore products through Flash Sales with live countdown timers, browse by trusted brands like Samsung, Apple, and NVIDIA, and discover the latest arrivals in a dedicated section.\n\nShopping features are designed for convenience and reliability. The shopping cart maintains state across sessions, ensuring customers never lose their selections. A favorites system allows users to save items for later, while integrated Stripe Checkout provides secure, PCI-compliant payment processing. The customer portal enables self-service billing and subscription management, reducing support overhead.\n\n## ⚡ Administrative Power\n\nThe admin dashboard empowers business owners with comprehensive management tools. Product management includes full CRUD operations with inventory tracking, while dynamic category management allows for flexible product organization. Order tracking provides real-time visibility into customer purchases, and user management includes role-based access control for team collaboration.\n\nAnalytics integration is built-in and ready for Google Analytics, providing insights into customer behavior, sales trends, and product performance. This data-driven approach enables informed business decisions.\n\n## 🏗️ Technical Excellence\n\nBuilt on Next.js 14 with the App Router and React 19, Vertex leverages the latest React patterns for optimal performance and developer experience. TypeScript ensures type safety across the entire codebase, catching errors before they reach production.\n\nData persistence is handled by PostgreSQL with Prisma ORM, providing type-safe database access and migrations. The UI is crafted with Tailwind CSS and Shadcn/ui components, built on Radix UI primitives for accessibility and consistency.\n\nAuthentication flows through NextAuth.js v5 (Auth.js) with Google Provider support, while Zustand manages global client state efficiently. The architecture follows Domain-Driven Design principles, with clear separation between Domain logic, Use Cases, and Infrastructure layers—ensuring the codebase remains maintainable as it scales.\n\nForm handling uses React Hook Form with Zod validation, providing excellent developer experience and runtime safety. Transactional emails are sent via Mailgun integration, and payment processing is secured through Stripe with webhook support for automated order fulfillment.\n\nThe entire platform is optimized for Vercel deployment, taking advantage of edge computing and serverless functions for global performance and scalability."
  },


];

export const WORK_EXPERIENCE = [
  {
    id: 1,
    year: "Nov 2024 – Present",
    role: "Full-Stack Developer",
    company: "D-TALK Startup",
    description:
      "Building a multi-role fashion e-commerce platform serving designers, brands, and administrators. Architected the frontend with Next.js 15 and React 19, implementing advanced canvas editing, real-time design customization, and role-based dashboards. Delivered pixel-perfect UI from Figma designs with focus on performance and accessibility.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Zustand", "TanStack Query", "Konva.js", "Fabric.js"],
  },
  {
    id: 2,
    year: "Jun 2024 – Jul 2024",
    role: "Full-Stack Developer (Contract)",
    company: "Tactix – Software Agency",
    description:
      "Delivered a production-ready e-commerce platform within a 2-month sprint. Collaborated in an Agile team to build scalable features using React, Nest.js, and MongoDB. Implemented GraphQL APIs and optimized frontend performance with Framer Motion animations.",
    tech: ["React", "Nest.js", "GraphQL", "MongoDB", "Framer Motion"],
  },
  {
    id: 3,
    year: "Aug 2024 – Oct 2024",
    role: "Full-Stack Development Trainer",
    company: "NGB Professional",
    description:
      "Led comprehensive training programs in full-stack development, teaching the MERN stack (MongoDB, Express, React, Node.js) to aspiring developers. Created hands-on projects and mentored students through real-world application development.",
    tech: ["MongoDB", "Express", "React", "Node.js", "PostgreSQL"],
  },
  {
    id: 4,
    year: "Jun 2022 – Present",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    description:
      "Delivered 15+ client projects ranging from MVPs to production systems. Specialized in building scalable web applications with modern tech stacks, focusing on clean architecture, performance optimization, and user experience.",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MySQL"],
  },
];
