import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-seo-data';
import VertexProjectPage from './client';

export const metadata: Metadata = {
  title: 'Vertex — E-Commerce & Admin Codebase | Hamza Benarfa',
  description:
    'A Next.js e-commerce and admin codebase — a working storefront with Stripe Checkout, an admin CRUD panel, and a worked Domain-Driven Design example on the auth layer.',
  alternates: { canonical: '/work/vertex' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Vertex — E-Commerce & Admin Codebase | Hamza Benarfa',
    description:
      'A Next.js e-commerce & admin codebase — storefront, Stripe Checkout, admin CRUD, and a worked Domain-Driven Design example on the auth layer.',
    images: [
      {
        url: '/vertex.webp',
        width: 1200,
        height: 630,
        alt: 'Vertex — Next.js e-commerce & admin codebase',
      },
    ],
  },
};

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
