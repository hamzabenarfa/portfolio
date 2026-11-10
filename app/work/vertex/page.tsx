import type { Metadata } from 'next';
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from '@/components/seo/structured-seo-data';
import VertexProjectPage from './client';

export const metadata: Metadata = pageMetadata({
  title: "Vertex — E-Commerce & Admin Codebase",
  description:
    'A Next.js e-commerce and admin codebase — a working storefront with Stripe Checkout, an admin CRUD panel, and a worked Domain-Driven Design example on the auth layer.',
  shareDescription:
    'A Next.js e-commerce & admin codebase — storefront, Stripe Checkout, admin CRUD, and a worked Domain-Driven Design example on the auth layer.',
  path: "/work/vertex",
  type: "article",
  noindex: true,
});

export default function Page() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Work', url: '/work' },
          { name: 'Vertex', url: '/work/vertex' },
        ]}
      />
      <VertexProjectPage />
    </>
  );
}
