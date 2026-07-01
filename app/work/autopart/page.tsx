import type { Metadata } from 'next';
import AutoPartProjectPage from './client';

export const metadata: Metadata = {
  title: 'AutoParts Tunisia — Verified Car-Parts Marketplace | Hamza Benarfa',
  description:
    'A French, mobile-first car-parts marketplace for Tunisia: a vehicle-fit finder, a 20%-deposit order engine with human stock-verification calls, and separate customer, admin, and supplier surfaces.',
  alternates: { canonical: '/work/autopart' },
  openGraph: {
    title: 'AutoParts Tunisia — Verified Car-Parts Marketplace | Hamza Benarfa',
    description:
      'Verified car-parts marketplace for Tunisia — vehicle-fit finder, 20%-deposit order engine with human stock checks, and three-sided customer/admin/supplier platform.',
    images: [
      {
        url: '/autopart.webp',
        width: 1200,
        height: 630,
        alt: 'AutoParts Tunisia — verified car-parts marketplace',
      },
    ],
  },
};

export default function Page() {
  return <AutoPartProjectPage />;
}
