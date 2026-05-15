import type { Metadata } from "next";
import { SEO } from "@/components/seo/seo";
import { PROJECTS } from "@/data/consts";
import { getProjectMetadata } from "@/lib/project-seo";
import MenuQRProjectPage from "./client";

export function generateMetadata(): Metadata {
  return getProjectMetadata("menu-qr");
}

export default function Page() {
  const project = PROJECTS.find((item) => item.slug === "menu-qr");

  return (
    <>
      <MenuQRProjectPage />
      {project && (
        <SEO
          projectSlug="menu-qr"
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Projects", url: "/projects" },
            { name: "Menu QR", url: "/projects/menu-qr" },
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
