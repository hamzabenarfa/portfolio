import { PROJECTS } from "@/data/consts";
import { HOME_FAQS } from "@/data/faqs";
import { SERVICES, type ServicePage } from "@/data/services";
import { SITE } from "@/data/site";
import { baseUrl as defaultBaseUrl } from "@/lib/seo";

interface StructuredDataProps {
  type?: "Person" | "WebSite" | "WebPage" | "BreadcrumbList" | "FAQPage" | "ProfilePage" | "Project" | "Service";
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  baseUrl?: string;
  page?: {
    name: string;
    description: string;
    url: string;
    dateModified?: string;
  };
  projectSlug?: string;
  service?: ServicePage;
}

function absoluteUrl(baseUrl: string, pathOrUrl: string) {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${baseUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function personSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: baseUrl,
    sameAs: SITE.sameAs,
    image: `${baseUrl}/avatar.jpeg`,
    email: SITE.email,
    telephone: SITE.phone,
    jobTitle: "Full-Stack Developer & DevOps Engineer",
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "TN",
      addressLocality: SITE.location,
    },
    knowsAbout: SITE.stack,
  };
}

export function StructuredData({
  type = "Person",
  breadcrumbs,
  faqs,
  baseUrl = defaultBaseUrl,
  page,
  projectSlug,
  service,
}: StructuredDataProps) {
  const getSchema = () => {
    switch (type) {
      case "Person":
        return personSchema(baseUrl);
      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: `${SITE.name} — Full-Stack Developer`,
          url: baseUrl,
          inLanguage: "en-US",
          author: { "@type": "Person", name: SITE.name, url: baseUrl },
        };
      case "WebPage":
        return page
          ? {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: page.name,
              description: page.description,
              url: absoluteUrl(baseUrl, page.url),
              inLanguage: "en-US",
              isPartOf: { "@type": "WebSite", name: SITE.name, url: baseUrl },
              author: { "@type": "Person", name: SITE.name, url: baseUrl },
              dateModified: page.dateModified ?? "2026-05-14",
            }
          : null;
      case "BreadcrumbList":
        return breadcrumbs?.length
          ? {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: absoluteUrl(baseUrl, crumb.url),
              })),
            }
          : null;
      case "FAQPage":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: (faqs ?? HOME_FAQS).map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        };
      case "ProfilePage":
        return {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: personSchema(baseUrl),
          dateCreated: "2024-01-01",
          dateModified: "2026-05-14",
        };
      case "Project": {
        const project = PROJECTS.find((item) => item.slug === projectSlug);
        if (!project) return null;
        return {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: absoluteUrl(baseUrl, `/projects/${project.slug}`),
          image: absoluteUrl(baseUrl, project.image),
          dateCreated: project.year,
          dateModified: project.updatedAt,
          keywords: project.tech,
          creator: { "@type": "Person", name: SITE.name, url: baseUrl },
          about: [project.industry, project.category],
        };
      }
      case "Service": {
        const item = service ?? SERVICES[0];
        if (!item) return null;
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          name: item.title,
          description: item.description,
          url: absoluteUrl(baseUrl, `/services/${item.slug}`),
          provider: { "@type": "Person", name: SITE.name, url: baseUrl },
          areaServed: "Worldwide",
          serviceType: item.shortTitle,
        };
      }
      default:
        return personSchema(baseUrl);
    }
  };

  const schema = getSchema();

  return schema ? (
    <script
      id={`structured-data-${type}${projectSlug ? `-${projectSlug}` : ""}${service ? `-${service.slug}` : ""}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ) : null;
}
