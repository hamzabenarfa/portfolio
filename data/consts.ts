
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
    title: "D-Talk Ecosystem - Multi-Role Fashion Platform",
    description: "A sophisticated, multi-role e-commerce platform designed to revolutionize the fashion industry by bridging the gap between designers, brands, and consumers.",
    longDescription: "D-Talk Ecosystem is a sophisticated, multi-role e-commerce platform designed to revolutionize the fashion industry by bridging the gap between designers, brands, and consumers. It serves as a comprehensive ecosystem for creating, customizing, and selling fashion products, with a strong focus on on-demand manufacturing and design democratization.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "Fabric.js", "Konva", "Radix UI", "next-intl", "Zod", "Server Actions"],
    year: "2024",
    image: "/dtalk.png",
    url: "https://d-talk-ecosytem-front-a45t.vercel.app/en",
    content: "D-Talk Ecosystem is a sophisticated, multi-role e-commerce platform designed to revolutionize the fashion industry by bridging the gap between designers, brands, and consumers. It serves as a comprehensive ecosystem for creating, customizing, and selling fashion products, with a strong focus on on-demand manufacturing and design democratization.\n\n## 🎨 Multi-Role Architecture\n\nThe platform serves four distinct user roles, each with specialized dashboards and workflows:\n\n- **Designers**: Create and monetize unique visual assets.\n- **Fashion Designers**: Develop technical fashion blueprints and specifications.\n- **Brands**: Curate collections, purchase designs, and manage production.\n- **Admins**: Oversee the entire ecosystem, including user management, order processing, and content moderation.\n\n## 🖼️ Interactive Design Studio\n\nA powerful, browser-based design editor powered by Fabric.js and Konva allows users to customize products in real-time. Users can apply designs to specific print areas across multiple views (front, back, sleeves), with support for 3D model previews.\n\n## 🛒 Complete E-Commerce Engine\n\nA full-featured marketplace supporting sample and bulk orders, integrated payment gateways (Konnect), order tracking, and a dynamic shopping cart system.\n\n## 💰 Financial Management\n\nBuilt-in earnings tracking and withdrawal systems for creators, facilitating a transparent creator economy.\n\n## 🏗️ Architecture & Technical Decisions\n\nThe project adopts a robust, modular architecture designed for maintainability and performance:\n\n- **Next.js App Router**: Leverages the latest Next.js features for efficient routing, server-side rendering, and optimized performance.\n- **Server Actions**: Utilizes Next.js Server Actions for secure, type-safe data mutations and form handling.\n- **State Management**:\n    - **Zustand**: Manages complex client-side state (design studio).\n    - **TanStack Query**: Handles server state, caching, and optimistic updates.\n- **Component Library**: Built on Radix UI primitives and Tailwind CSS (via shadcn/ui patterns).\n- **Security**: Implements HTTP-only cookie-based authentication with role-based middleware protection.\n\n## 💡 Strengths & Value\n\n- **Complex State Handling**: Successfully managing the intricate state of a multi-view, multi-layer design tool.\n- **Modern Tooling**: The use of React 19 and Next.js 15 places the project at the cutting edge.\n- **Scalable Architecture**: Clear separation of concerns ensures maintainability.\n- **User-Centric Design**: Focus on accessibility and performance."
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    title: "Vertex - E-Commerce Platform",
    description: "A production-ready e-commerce platform for tech gadgets with a modern storefront, comprehensive admin dashboard, and Stripe integration. Built with Domain-Driven Design principles for scalability and maintainability.",
    longDescription: "Vertex is a full-featured e-commerce platform specializing in cutting-edge tech gadgets. The platform combines a beautiful customer-facing storefront with a powerful admin dashboard, enabling seamless product management, order processing, and customer engagement. Built with Next.js 14, React 19, and TypeScript, it delivers exceptional performance and maintainability through Domain-Driven Design principles.",
    tech: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Shadcn/ui", "NextAuth.js", "Zustand", "Stripe", "React Hook Form", "Zod"],
    year: "2024",
    image: "/vertex.png",
    url: "https://vertex.benarfa.com/",
    content: "Vertex represents a modern approach to e-commerce development, combining cutting-edge technology with clean architecture principles. This production-ready platform serves both customers and administrators through a unified, scalable system.\n\n## 🛍️ Customer Experience\n\nThe storefront delivers an exceptional shopping experience with a modern product catalog that supports advanced filtering across multiple categories—from Audio and Camera equipment to Gaming gear, Smartphones, and SmartWatches. Customers can explore products through Flash Sales with live countdown timers, browse by trusted brands like Samsung, Apple, and NVIDIA, and discover the latest arrivals in a dedicated section.\n\nShopping features are designed for convenience and reliability. The shopping cart maintains state across sessions, ensuring customers never lose their selections. A favorites system allows users to save items for later, while integrated Stripe Checkout provides secure, PCI-compliant payment processing. The customer portal enables self-service billing and subscription management, reducing support overhead.\n\n## ⚡ Administrative Power\n\nThe admin dashboard empowers business owners with comprehensive management tools. Product management includes full CRUD operations with inventory tracking, while dynamic category management allows for flexible product organization. Order tracking provides real-time visibility into customer purchases, and user management includes role-based access control for team collaboration.\n\nAnalytics integration is built-in and ready for Google Analytics, providing insights into customer behavior, sales trends, and product performance. This data-driven approach enables informed business decisions.\n\n## 🏗️ Technical Excellence\n\nBuilt on Next.js 14 with the App Router and React 19, Vertex leverages the latest React patterns for optimal performance and developer experience. TypeScript ensures type safety across the entire codebase, catching errors before they reach production.\n\nData persistence is handled by PostgreSQL with Prisma ORM, providing type-safe database access and migrations. The UI is crafted with Tailwind CSS and Shadcn/ui components, built on Radix UI primitives for accessibility and consistency.\n\nAuthentication flows through NextAuth.js v5 (Auth.js) with Google Provider support, while Zustand manages global client state efficiently. The architecture follows Domain-Driven Design principles, with clear separation between Domain logic, Use Cases, and Infrastructure layers—ensuring the codebase remains maintainable as it scales.\n\nForm handling uses React Hook Form with Zod validation, providing excellent developer experience and runtime safety. Transactional emails are sent via Mailgun integration, and payment processing is secured through Stripe with webhook support for automated order fulfillment.\n\nThe entire platform is optimized for Vercel deployment, taking advantage of edge computing and serverless functions for global performance and scalability."
  },
  {
    id: 3,
    slug: "project-management-app",
    title: "Project Management & Planning Application",
    description: "A comprehensive project management tool for teams to organize tasks, manage projects, and visualize ideas with Kanban boards and charts.",
    longDescription: "This project is a comprehensive Project Management & Planning Application built with Next.js, designed to help teams and individuals organize tasks, manage projects, and visualize ideas.",
    tech: ["Next.js 14", "MySQL", "Prisma", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Zustand", "React Query", "Chart.js", "Mermaid.js", "@dnd-kit"],
    year: "2024",
    image: "/planner.png", // Placeholder
    url: "https://planner.benarfa.com/",
    content: "This project is a comprehensive **Project Management & Planning Application** built with **Next.js**, designed to help teams and individuals organize tasks, manage projects, and visualize ideas.\n\n##  Core Features\n\n### 1. Project Management\n\n- **Projects**: Create and manage multiple projects with status tracking (Building, Started, Pending, etc.).\n\n- **Kanban Boards**: Interactive drag-and-drop boards for task management using `@dnd-kit`.\n\n  - Custom columns (Todo, In Progress, Review, Done).\n\n  - Task creation, editing, and assignment.\n\n- **Burn Down Charts**: Visual progress tracking using `chart.js` to monitor sprint/project velocity.\n\n- **Text/Board Views**: Multiple ways to view project content.\n\n### 2. Team & Member Management\n\n- **Teams**: Create teams and assign owners.\n\n- **Member Directory**: Manage employees/members with roles (Admin, Manager, Member) and levels.\n\n- **Assignments**: Assign members to specific teams and projects.\n\n- **Role-Based Access Control**: Secure access based on user roles.\n\n### 3. Calendar & Scheduling\n\n- **Full Calendar View**: Monthly/Weekly/Daily views for managing schedule.\n\n- **Appointments**:\n\n  - Create events with priority, category (Work, Personal, Meeting, etc.), and location/meeting links.\n\n  - **Recurring Events**: Support for repeating schedules.\n\n  - **Reminders**: Notification system for upcoming appointments.\n\n- **Sparks**: Quick idea capture widget, optionally linked to appointments.\n\n### 4. Visual Collaboration Tools\n\n- **Whiteboard**: Integrated interactive whiteboard for brainstorming and sketching.\n\n  - Built with `perfect-freehand` and `roughjs`.\n\n  - Custom toolbar for drawing tools.\n\n- **Diagrams**: Built-in support for creating and editing technical diagrams using **Mermaid.js**.\n\n  - Live editor and preview mode.\n\n### 5. Dashboard & Analytics\n\n- **Overview Dashboard**: High-level view of:\n\n  - Recent Projects.\n\n  - Project Status Charts.\n\n  - Task Status Distribution.\n\n  - Key Statistics Cards.\n\n- **Profile Management**: User profile customization.\n\n### 6. Authentication & Security\n\n- **Secure Auth**: Powered by **NextAuth.js** (v5).\n\n- **User Sessions**: Secure session management with Prisma adapter.\n\n## 🛠 Tech Stack\n\n- **Framework**: Next.js 14 (App Router)\n\n- **Database**: MySQL with Prisma ORM\n\n- **Styling**: Tailwind CSS, Framer Motion, shadcn/ui components\n\n- **State Management**: Zustand, React Query\n\n- **Visualization**: Chart.js, Mermaid.js\n\n- **Interactions**: @dnd-kit (Drag & Drop)"
  },
  {
    id: 4,
    slug: "kindra-ecommerce",
    title: "KINDRA - E-Commerce Platform",
    description: "A production-ready, full-stack e-commerce platform built for the fashion industry, showcasing modern web development practices and enterprise-grade architecture.",
    longDescription: "KINDRA is a multi-section fashion e-commerce platform featuring separate shopping experiences for men's and women's collections. The application implements a complete e-commerce lifecycle—from product discovery and cart management to secure checkout and order tracking—while providing administrators with powerful tools for inventory and order management.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Drizzle ORM", "Stripe", "Cloudflare R2", "Docker", "Oslo", "Zod"],
    year: "2024",
    image: "/kindra-hero.png",
    url: "https://kindra.benarfa.com/",
    content: "KINDRA is a production-ready, full-stack e-commerce platform built for the fashion industry, showcasing modern web development practices and enterprise-grade architecture. This SaaS starter kit demonstrates a comprehensive understanding of scalable application design, secure payment processing, and sophisticated user experience patterns.\n\n## 🏗️ Technical Architecture\n\nThe platform is built on a solid foundation of modern technologies:\n\n- **Frontend**: Next.js 15 with App Router, React 19, and TypeScript 5.7 for a robust, type-safe client.\n- **Styling**: Tailwind CSS 3.4 with a custom design system for a premium look and feel.\n- **Backend**: Server Actions for seamless client-server communication, backed by PostgreSQL and Drizzle ORM 0.38.\n- **Authentication**: Custom session-based auth using Oslo, with OAuth support (Google, Facebook) and magic links.\n- **Infrastructure**: Docker containerization, Cloudflare R2 for image storage, and Vercel for deployment.\n\n## 🛍️ Core Features\n\n### Customer Experience\n- **Multi-Section Shopping**: Distinct experiences for Men's and Women's collections.\n- **Advanced Discovery**: Dynamic routing, filtering, and search capabilities.\n- **Secure Checkout**: Stripe integration with webhook-based order fulfillment.\n- **User Accounts**: Dashboard for order history, profile management, and tracking.\n\n### Admin Capabilities\n- **Product Management**: Multi-variant products (size/color), bulk image uploads, and inventory tracking.\n- **Order Processing**: Comprehensive workflow from pending to delivered.\n- **Content Management**: Rich text editors for descriptions and SEO metadata configuration.\n\n## 🔐 Security & Performance\n\n- **Type Safety**: End-to-end type safety with TypeScript and Zod validation.\n- **Secure Auth**: HTTP-only cookies, CSRF protection, and secure password hashing.\n- **Optimization**: Server-side rendering, image optimization, and edge caching strategies.\n\n## 💡 Key Technical Decisions\n\n- **Custom Auth**: Implemented for full control over session lifecycle and security policies.\n- **Dual Image Storage**: Supports both Cloudflare R2 and Vercel Blob for flexibility and cost optimization.\n- **Webhook Fulfillment**: Ensures robust order processing and inventory management via Stripe webhooks."
  }
];

export const WORK_EXPERIENCE = [
  {
    id: 1,
    year: "Nov 2024 – Present",
    role: "Full-Stack Developer",
    company: "D-TALK Startup",
    description: "Developing a multi-tenant fashion e-commerce platform serving designers,fashion designers, brands owners, and adminstrators. ",
    details: "Architected and implemented the core frontend system featuring advanced canvas-based product customization with Konva.js, real-time preview capabilities, and role-specific dashboards. Translated complex Figma designs into accessible, performant UIs (Lighthouse scores >90) while establishing scalable state management patterns with Zustand and TanStack Query.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Zustand", "TanStack Query", "Konva.js"],
  },
  {
    id: 2,
    year: "Jun 2025 – Jul 2025",
    role: "Full-Stack Developer (Contract)",
    company: "Tactix – Software Agency",
    description: "Accelerated delivery of a high-performance e-commerce platform within an aggressive 2-month sprint using React and Nest.js.",
    details: "Collaborated in an Agile team to build scalable features using React, Nest.js, and MongoDB. Implemented RESTful APIs and optimized frontend performance with Framer Motion animations. Focused on delivering high-quality code within tight deadlines.",
    tech: ["React", "Nest.js", "MongoDB", "Framer Motion"],
  },
  {
    id: 3,
    year: "Aug 2024 – Oct 2024",
    role: "Full-Stack Development Instructor",
    company: "NGB Professional",
    description: "Led comprehensive training programs in full-stack development teaching the MERN stack.",
    details: "Led comprehensive training programs in full-stack development, teaching the MERN stack (MongoDB, Express, React, Node.js) to aspiring developers. Created hands-on projects and mentored students through real-world application development scenarios.",
    tech: ["MongoDB", "Express", "React", "Node.js", "PostgreSQL"],
  },
  {
    id: 4,
    year: "Jun 2022 – Present",
    role: "Freelance Developer",
    company: "Self-Employed",
    description: "Delivered 15+ applications from mvp to production .",
    details: "Delivered 15+ client projects ranging from MVPs to production systems. Specialized in building scalable web applications with modern tech stacks, focusing on clean architecture, performance optimization, and user experience.",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MySQL"],
  },
];