import { PROJECTS } from "@/data/consts";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { baseUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    SITE.description,
    "",
    "## Canonical pages",
    `- Home: ${baseUrl}/`,
    `- About: ${baseUrl}/about`,
    `- Projects: ${baseUrl}/projects`,
    `- Services: ${baseUrl}/services`,
    "",
    "## Services",
    ...SERVICES.map((service) => `- ${service.title}: ${baseUrl}/services/${service.slug} — ${service.description}`),
    "",
    "## Project case studies",
    ...PROJECTS.map((project) => `- ${project.title}: ${baseUrl}/projects/${project.slug} — ${project.summary}`),
    "",
    "## Author/entity",
    `- Name: ${SITE.name}`,
    `- Location: ${SITE.location}`,
    `- Contact: ${SITE.email}`,
    `- Profiles: ${SITE.sameAs.join(", ")}`,
    "",
    "## Update policy",
    "This file is generated from the repository content registry. Last reviewed: 2026-05-14.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
