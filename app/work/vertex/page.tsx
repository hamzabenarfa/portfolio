import type { Metadata } from 'next';
import VertexProjectPage from './client';

export const metadata: Metadata = {
  title: 'Vertex — E-Commerce & Admin Boilerplate | Hamza Benarfa',
  description:
    'A production-ready Next.js e-commerce and admin boilerplate built on Clean Architecture and Domain-Driven Design — storefront, Stripe billing, and a full admin dashboard in clean domain, use-case, and infrastructure layers.',
  alternates: { canonical: '/work/vertex' },
  openGraph: {
    title: 'Vertex — E-Commerce & Admin Boilerplate | Hamza Benarfa',
    description:
      'Clean Architecture / DDD Next.js e-commerce + admin boilerplate — storefront, Stripe Checkout, billing portal, and a full admin dashboard.',
    images: [
      {
        url: '/vertex.webp',
        width: 1200,
        height: 630,
        alt: 'Vertex — Next.js e-commerce & admin boilerplate',
      },
    ],
  },
};

export default function Page() {
  return <VertexProjectPage />;
}
