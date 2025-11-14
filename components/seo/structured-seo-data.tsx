// components/structured-seo-data.tsx
interface StructuredDataProps {
  type?: "Organization" | "WebSite" | "BreadcrumbList" | "FAQPage";
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
  const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Person", // Changed from Organization to Person (you're an individual dev)
    name: "Benarfa Hamza",
    url: baseUrl,
    sameAs: [
      "https://www.linkedin.com/in/hamzabenarfa/", // Update to your real profile
      "https://github.com/hamzabenarfa",            // Add your GitHub
    ],
    image: `${baseUrl}/avatar.jpeg`, // Add a real headshot
    description: "Full-stack developer specializing in React, Next.js, NestJS, and TypeScript.",
  });

  const generateWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Benarfa Hamza Portfolio",
    url: baseUrl,
    inLanguage: "en-US",
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
    mainEntity: faqs?.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  const getSchema = () => {
    switch (type) {
      case "Organization":
        return generateOrganizationSchema();
      case "WebSite":
        return generateWebSiteSchema();
      case "BreadcrumbList":
        return generateBreadcrumbSchema();
      case "FAQPage":
        return generateFAQSchema();
      default:
        return generateOrganizationSchema();
    }
  };

  const schema = getSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}