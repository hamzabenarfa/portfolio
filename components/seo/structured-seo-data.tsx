import Script from 'next/script';

interface StructuredDataProps {
  type?: "Organization" | "WebSite" | "BreadcrumbList" | "FAQPage" | "ProfilePage";
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  baseUrl?: string;
}

export function StructuredData({
  type = "Organization",
  breadcrumbs,
  faqs,
  baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com",
}: StructuredDataProps) {
  const generatePersonSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hamza Benarfa",
    url: baseUrl,
    sameAs: [
      "https://www.linkedin.com/in/hamzabenarfa/",
      "https://github.com/hamzabenarfa",
    ],
    image: `${baseUrl}/avatar.jpeg`,
    email: "contact@benarfa.com",
    jobTitle: "Full-Stack Developer & DevOps Engineer",
    description:
      "Freelance full-stack developer and DevOps engineer from Tunisia specializing in Next.js, React, TypeScript, NestJS, and cloud infrastructure.",
    worksFor: {
      "@type": "Organization",
      name: "Benarfa Development",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "TN",
      addressLocality: "Tunisia",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "DevOps",
      "Cloud Infrastructure",
      "REST APIs",
      "GraphQL",
      "React Native",
      "Tailwind CSS",
      "CI/CD",
    ],
  });

  const generateWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hamza Benarfa — Full-Stack Developer & DevOps Engineer",
    url: baseUrl,
    inLanguage: ["en-US", "fr-FR"],
    author: {
      "@type": "Person",
      name: "Hamza Benarfa",
      url: baseUrl,
    },
  });

  const generateBreadcrumbSchema = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs?.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith("http") ? crumb.url : `${baseUrl}${crumb.url}`,
    })),
  });

  const generateFAQSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqs ?? DEFAULT_FAQS).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  const generateProfilePageSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Hamza Benarfa",
      url: baseUrl,
      image: `${baseUrl}/avatar.jpeg`,
      jobTitle: "Full-Stack Developer & DevOps Engineer",
      sameAs: [
        "https://www.linkedin.com/in/hamzabenarfa/",
        "https://github.com/hamzabenarfa",
      ],
    },
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  });

  const getSchema = () => {
    switch (type) {
      case "Organization":
        return generatePersonSchema();
      case "WebSite":
        return generateWebSiteSchema();
      case "BreadcrumbList":
        return generateBreadcrumbSchema();
      case "FAQPage":
        return generateFAQSchema();
      case "ProfilePage":
        return generateProfilePageSchema();
      default:
        return generatePersonSchema();
    }
  };

  const schema = getSchema();

  return schema ? (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ) : null;
}

/** Default FAQ data for JSON-LD when no custom FAQs are provided */
const DEFAULT_FAQS = [
  {
    question: "What technologies does Hamza Benarfa specialize in?",
    answer:
      "Hamza specializes in Next.js, React, TypeScript, NestJS, Node.js, PostgreSQL, MongoDB, Docker, and cloud infrastructure. He builds full-stack web and mobile applications using modern tooling and best practices.",
  },
  {
    question: "Does Hamza Benarfa work with international clients?",
    answer:
      "Yes. Hamza works remotely with startups and businesses worldwide. He is based in Tunisia and communicates in English and French. Most projects are managed via asynchronous tools with weekly check-ins.",
  },
  {
    question: "What kind of projects does Hamza build?",
    answer:
      "Hamza builds SaaS platforms, e-commerce stores, marketplace apps, restaurant tech, project management tools, and MVPs. His projects range from initial prototypes to production-grade applications deployed on cloud infrastructure.",
  },
  {
    question: "How does Hamza handle project communication and delivery?",
    answer:
      "Hamza follows an agile approach with iterative sprints, regular updates, and transparent communication. He uses tools like GitHub, Figma, and Slack to collaborate. Clients receive weekly progress demos and have access to staging environments throughout development.",
  },
  {
    question: "Can Hamza handle both frontend and backend development?",
    answer:
      "Yes. Hamza is a full-stack developer who handles the entire application lifecycle — from UI/UX implementation with React and Next.js to backend APIs with NestJS and Node.js, database design with PostgreSQL or MongoDB, and deployment with Docker and cloud providers.",
  },
];