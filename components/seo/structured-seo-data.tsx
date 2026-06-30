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
    inLanguage: ["en-US"],
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
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ) : null;
}

/**
 * Default FAQ data for JSON-LD. Kept in sync with the visible FAQ section
 * (app/(home)/_components/faq.tsx) — Google requires structured FAQ data to
 * match on-page content to be eligible for rich results.
 */
const DEFAULT_FAQS = [
  {
    question: "Who do you work best with?",
    answer:
      "Founders building MVPs, agencies that need a reliable full-stack partner, small businesses launching SaaS or internal platforms, and teams that need frontend, backend, and deployment handled by one person. I'm not the right fit for basic landing pages, pixel-only design work, or projects without a clear scope or budget.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Next.js, TypeScript, React, and React Native on the frontend. Node, NestJS, PostgreSQL, and Prisma on the backend. I optimize for the boring, well-supported choices that ship fast and don't break in two years.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I work remotely across timezones — most of my clients are in Europe and North America. I overlap with EU mornings and US mornings comfortably.",
  },
  {
    question: "How do you handle communication?",
    answer:
      "Weekly demos, async daily updates in Slack or your tool of choice, and a shared Notion/Linear for everything else. No surprises, no week-long radio silence.",
  },
  {
    question: "Can you handle frontend AND backend?",
    answer:
      "Yes — that's the whole point. I take ownership of the full stack so founders aren't coordinating between two contractors. For larger work I plug into existing teams as a senior IC.",
  },
];
