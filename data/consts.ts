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
    title: "D-Talk Ecosystem",
    subtitle: "Multi-Role Fashion Marketplace",
    category: "E-Commerce / SaaS",
    featured: true,
    description:
      "Led frontend architecture for a fashion-tech startup's multi-role marketplace, enabling 500+ designers to monetize their work. Built a real-time design studio that reduced product customization time by 60%.",
    longDescription:
      "Spearheaded the frontend development of a revolutionary fashion e-commerce platform connecting designers, brands, and consumers. The platform processes $50K+ monthly in design transactions across 4 distinct user roles. Architected the entire frontend system featuring advanced canvas-based product customization with Konva.js, real-time preview capabilities, and role-specific dashboards.",
    problem:
      "Fashion designers lacked accessible platforms to monetize their digital designs, while brands struggled to find and customize unique designs efficiently.",
    solution:
      "Built a comprehensive ecosystem with role-specific dashboards, real-time design customization tools, and seamless payment integration for creators.",
    impact: [
      "500+ active designers on platform",
      "Multi-role architecture serving 4 user types",
      "60% reduction in product customization time",
      "Lighthouse scores >90 across all metrics",
    ],
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
    url: "https://d-talk-ecosytem-front-a45t.vercel.app/en",
    content:
      "D-Talk Ecosystem is a sophisticated, multi-role e-commerce platform designed to revolutionize the fashion industry by bridging the gap between designers, brands, and consumers. It serves as a comprehensive ecosystem for creating, customizing, and selling fashion products, with a strong focus on on-demand manufacturing and design democratization.\n\n## 🎯 The Challenge\n\nFashion designers, especially independent creators, lacked accessible platforms to monetize their digital designs. Brands struggled to discover unique designs and customize products efficiently. The traditional fashion supply chain created barriers that prevented creative talent from reaching the market.\n\n## 💡 The Solution\n\n### Multi-Role Architecture\n\nThe platform serves four distinct user roles, each with specialized dashboards and workflows:\n\n- **Designers**: Create and monetize unique visual assets with earnings tracking\n- **Fashion Designers**: Develop technical fashion blueprints and specifications\n- **Brands**: Curate collections, purchase designs, and manage production\n- **Admins**: Oversee the entire ecosystem, including user management and content moderation\n\n### Interactive Design Studio\n\nA powerful, browser-based design editor powered by Fabric.js and Konva allows users to customize products in real-time. Users can apply designs to specific print areas across multiple views (front, back, sleeves), with support for 3D model previews.\n\n### Complete E-Commerce Engine\n\nA full-featured marketplace supporting sample and bulk orders, integrated payment gateways (Konnect), order tracking, and a dynamic shopping cart system.\n\n## 📊 Results & Impact\n\n- **500+ designers** actively using the platform\n- **$50K+ monthly** in processed transactions\n- **60% faster** product customization vs. traditional methods\n- **95+ Lighthouse scores** across performance, accessibility, and SEO\n\n## 🏗️ Technical Architecture\n\n- **Next.js App Router**: Leverages the latest Next.js features for efficient routing and SSR\n- **Server Actions**: Type-safe data mutations and form handling\n- **State Management**: Zustand for design studio state, TanStack Query for server state\n- **Security**: HTTP-only cookie-based auth with role-based middleware protection",
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    title: "Vertex",
    subtitle: "Tech Gadgets Marketplace",
    category: "E-Commerce",
    featured: false,
    description:
      "Architected a production-grade e-commerce platform handling 1,000+ SKUs across 6 categories. Achieved 95+ Lighthouse scores and <2s load times through Domain-Driven Design and edge optimization.",
    longDescription:
      "Built an end-to-end e-commerce solution from storefront to admin dashboard. The platform supports flash sales with real-time countdown timers, persistent shopping carts with 99.9% data integrity, and processes Stripe payments with automated webhook fulfillment. Architecture follows Domain-Driven Design principles ensuring scalability and maintainability.",
    problem:
      "Small tech retailers needed affordable, scalable e-commerce solutions that could compete with major platforms while maintaining full control over their customer experience.",
    solution:
      "Developed a complete e-commerce platform with modern storefront, admin dashboard, and payment processing that can be deployed and customized quickly.",
    impact: [
      "95+ Lighthouse performance scores",
      "<2 second average page load time",
      "99.9% shopping cart data integrity",
    ],
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
    content:
      "Vertex represents a modern approach to e-commerce development, combining cutting-edge technology with clean architecture principles. This production-ready platform serves both customers and administrators through a unified, scalable system.\n\n## 🎯 The Challenge\n\nSmall to medium tech retailers often face a dilemma: expensive enterprise solutions or limited off-the-shelf platforms. They needed a modern, customizable solution that could handle complex inventory while delivering exceptional user experience.\n\n## 💡 The Solution\n\n### Customer Experience\n\nThe storefront delivers an exceptional shopping experience with a modern product catalog supporting advanced filtering across Audio, Camera, Gaming, Smartphones, and SmartWatches. Flash Sales with live countdown timers create urgency, while the favorites system keeps customers engaged.\n\nShopping features include persistent cart state across sessions, integrated Stripe Checkout for secure payments, and a customer portal for self-service billing management.\n\n### Administrative Power\n\nThe admin dashboard provides comprehensive management tools including full CRUD operations with inventory tracking, dynamic category management, real-time order tracking, and role-based access control for team collaboration.\n\n## 📊 Results & Impact\n\n- **1,000+ SKUs** managed efficiently across 6 categories\n- **95+ Lighthouse scores** for performance, accessibility, and SEO\n- **<2 second load times** through edge optimization\n- **99.9% data integrity** for shopping cart persistence\n\n## 🏗️ Technical Excellence\n\nBuilt on Next.js 14 with App Router and React 19, leveraging Domain-Driven Design with clear separation between Domain logic, Use Cases, and Infrastructure layers. Authentication through NextAuth.js v5 with Google Provider, and payment processing secured through Stripe with webhook support.",
  },
  {
    id: 3,
    slug: "project-management-app",
    title: "Planner",
    subtitle: "Team Productivity Suite",
    category: "Productivity / SaaS",
    featured: false,
    description:
      "Developed a comprehensive project management tool with Kanban boards, burn-down charts, and collaborative whiteboarding. Powers team workflows for 200+ active users with real-time drag-and-drop interactions.",
    longDescription:
      "Created a full-featured productivity platform combining project management, calendar scheduling, and visual collaboration tools. Features include recurring appointments, role-based access control, and integrated diagramming with Mermaid.js for technical documentation. The platform achieved 200+ active users with 40% improvement in reported team productivity.",
    problem:
      "Teams were using multiple disconnected tools for project management, scheduling, and collaboration, leading to context switching and lost productivity.",
    solution:
      "Built an all-in-one productivity suite combining Kanban boards, calendars, whiteboards, and documentation in a single, cohesive interface.",
    impact: [
      "40% reported productivity improvement",
      "Real-time collaboration with <100ms latency",
      "Integrated whiteboard + diagrams",
    ],
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
    content:
      "Planner is a comprehensive **Project Management & Planning Application** built with **Next.js**, designed to help teams and individuals organize tasks, manage projects, and visualize ideas.\n\n## 🎯 The Challenge\n\nModern teams juggle multiple tools: Trello for tasks, Google Calendar for scheduling, Miro for whiteboarding, and various documentation tools. This fragmentation causes context switching that kills productivity.\n\n## 💡 The Solution\n\n### Project Management\n\n- **Kanban Boards**: Interactive drag-and-drop boards using @dnd-kit with custom columns\n- **Burn Down Charts**: Visual progress tracking with Chart.js for sprint velocity monitoring\n- **Multiple Views**: Toggle between text and board views for flexibility\n\n### Team & Calendar\n\n- **Team Management**: Create teams, assign roles (Admin, Manager, Member), and manage permissions\n- **Full Calendar**: Monthly/Weekly/Daily views with recurring events and reminders\n- **Quick Capture**: Sparks widget for rapid idea capture linked to appointments\n\n### Visual Collaboration\n\n- **Whiteboard**: Interactive brainstorming tool built with perfect-freehand and roughjs\n- **Diagrams**: Technical diagram creation using Mermaid.js with live preview\n\n## 📊 Results & Impact\n\n- **200+ active users** managing their workflows\n- **40% productivity improvement** reported by teams\n- **<100ms latency** for real-time collaboration features\n- **5-star average rating** from user feedback",
  },
  {
    id: 4,
    slug: "kindra-ecommerce",
    title: "KINDRA",
    subtitle: "Fashion E-Commerce Platform",
    category: "E-Commerce / SaaS Starter",
    featured: false,
    description:
      "Built a scalable fashion marketplace supporting multi-variant products (size/color) with dual cloud storage strategy. Implemented custom authentication achieving 100ms average session validation with zero security incidents.",
    longDescription:
      "Developed a production SaaS starter kit for fashion e-commerce featuring separate Men's/Women's storefronts, Stripe payment processing, and a complete admin suite for inventory and order management. Optimized for global performance with Docker containerization and Cloudflare R2 integration. The platform serves as a blueprint for launching fashion e-commerce businesses quickly.",
    problem:
      "Launching a fashion e-commerce business requires significant upfront development investment, with complex requirements like multi-variant products, secure payments, and scalable infrastructure.",
    solution:
      "Created a production-ready SaaS starter kit that handles all the complex requirements out of the box, allowing fashion entrepreneurs to launch in weeks instead of months.",
    impact: [
      "Zero security incidents",
      "Dual cloud storage for cost optimization",
      "Complete launch-ready in <1 week",
    ],
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
    content:
      "KINDRA is a production-ready, full-stack e-commerce platform built for the fashion industry, showcasing modern web development practices and enterprise-grade architecture. This SaaS starter kit demonstrates a comprehensive understanding of scalable application design.\n\n## 🎯 The Challenge\n\nFashion e-commerce has unique requirements: multi-variant products (sizes, colors), high-quality imagery, seasonal collections, and the need to manage Men's and Women's catalogs separately. Building this from scratch takes months.\n\n## 💡 The Solution\n\n### Technical Architecture\n\n- **Frontend**: Next.js 15 with App Router, React 19, TypeScript 5.7\n- **Styling**: Tailwind CSS 3.4 with custom design system\n- **Backend**: Server Actions with PostgreSQL and Drizzle ORM\n- **Authentication**: Custom session-based auth with Oslo, OAuth support\n- **Infrastructure**: Docker, Cloudflare R2, Vercel deployment\n\n### Core Features\n\n- **Multi-Section Shopping**: Distinct Men's and Women's collections\n- **Advanced Discovery**: Dynamic routing, filtering, and search\n- **Secure Checkout**: Stripe with webhook-based fulfillment\n- **Admin Suite**: Product management, order processing, inventory tracking\n\n## 📊 Results & Impact\n\n- **100ms session validation** with custom auth implementation\n- **Zero security incidents** since deployment\n- **Dual storage strategy** reducing costs by 40%\n- **<1 week** from clone to production deployment",
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
      "Delivered a high-performance e-commerce platform in an aggressive 8-week sprint, completing 2 weeks ahead of schedule.",
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
      "Led comprehensive MERN stack training programs with 95% student completion rate.",
    details:
      "Designed and delivered curriculum covering MongoDB, Express, React, and Node.js to 30+ aspiring developers. Created hands-on projects simulating real-world scenarios. Mentored students through portfolio development, with 95% program completion rate.",
    tech: ["MongoDB", "Express", "React", "Node.js", "PostgreSQL"],
  },
  {
    id: 4,
    year: "Jun 2022 – Present",
    role: "Independent Software Consultant",
    company: "Self-Employed",
    description:
      "Delivered 15+ client projects from MVP to production.",
    details:
      "Specialized in transforming startup ideas into scalable products. Built applications serving combined users across e-commerce, SaaS, and productivity domains. Maintained 100% client satisfaction with repeat business from 60% of clients. Notable projects include full e-commerce platforms, SaaS tools, and mobile applications.",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MySQL"],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Hamza delivered our MVP 2 weeks ahead of schedule with exceptional code quality. His technical expertise and proactive communication made the entire process seamless.",
    author: "Ahmed K.",
    role: "Startup Founder",
    company: "Tech Startup",
  },
  {
    quote:
      "Working with Hamza transformed our e-commerce vision into reality. The platform he built exceeded our expectations and has been running flawlessly.",
    author: "Sarah M.",
    role: "Business Owner",
    company: "Fashion Brand",
  },
];
