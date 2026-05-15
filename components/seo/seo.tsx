import { StructuredData } from "./structured-seo-data";

export function SEO({
  breadcrumbs,
  includeFaq = false,
  includeProfile = false,
  page,
  projectSlug,
}: {
  breadcrumbs?: Array<{ name: string; url: string }>;
  includeFaq?: boolean;
  includeProfile?: boolean;
  page?: { name: string; description: string; url: string; dateModified?: string };
  projectSlug?: string;
}) {
  return (
    <>
      <StructuredData type="Person" />
      <StructuredData type="WebSite" />
      {page && <StructuredData type="WebPage" page={page} />}
      {projectSlug && <StructuredData type="Project" projectSlug={projectSlug} />}
      {includeFaq && <StructuredData type="FAQPage" />}
      {includeProfile && <StructuredData type="ProfilePage" />}
      {breadcrumbs && <StructuredData type="BreadcrumbList" breadcrumbs={breadcrumbs} />}
    </>
  );
}
