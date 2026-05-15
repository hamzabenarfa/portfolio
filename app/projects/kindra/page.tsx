import type { Metadata } from "next";
import { SEO } from "@/components/seo/seo";
import { PROJECTS } from "@/data/consts";
import { getProjectMetadata } from "@/lib/project-seo";
import KindraProjectPage from "./client";

export function generateMetadata(): Metadata {
  return getProjectMetadata("kindra");
}

export default function Page() {
  const project = PROJECTS.find((item) => item.slug === "kindra");

  return (
    <>
      <KindraProjectPage />
      {project && (
        <SEO
          projectSlug="kindra"
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Projects", url: "/projects" },
            { name: "KINDRA", url: "/projects/kindra" },
          ]}
          page={{
            name: project.title,
            description: project.summary,
            url: `/projects/${project.slug}`,
            dateModified: project.updatedAt,
          }}
        />
      )}
    </>
  );
}
