import { StructuredData } from "./structured-seo-data";

export function SEO({
  breadcrumbs,
}: {
  breadcrumbs?: Array<{ name: string; url: string }>;
}) {
  return (
    <>
      <StructuredData type="Organization" />
      <StructuredData type="WebSite" />
      <StructuredData type="FAQPage" />
      <StructuredData type="ProfilePage" />
      {breadcrumbs && <StructuredData type="BreadcrumbList" breadcrumbs={breadcrumbs} />}
    </>
  );
}