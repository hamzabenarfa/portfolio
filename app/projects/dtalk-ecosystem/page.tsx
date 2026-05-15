import type { Metadata } from "next";
import { SEO } from "@/components/seo/seo";
import { PROJECTS } from "@/data/consts";
import { getProjectMetadata } from "@/lib/project-seo";
import DTalkProjectPage from "./client";

export function generateMetadata(): Metadata {
  return getProjectMetadata("dtalk-ecosystem");
}

export default function Page() {
  const project = PROJECTS.find((item) => item.slug === "dtalk-ecosystem");

  return (
    <>
      <DTalkProjectPage />
      {project && (
        <SEO
          projectSlug="dtalk-ecosystem"
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Projects", url: "/projects" },
            { name: "D-Talk Ecosystem", url: "/projects/dtalk-ecosystem" },
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
