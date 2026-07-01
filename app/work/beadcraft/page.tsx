import type { Metadata } from 'next';
import BeadCraftProjectPage from './client';

export const metadata: Metadata = {
  title: 'BeadCraft Studio — Made-to-Order Bracelet Commerce | Hamza Benarfa',
  description:
    'A bilingual storefront and crafter dashboard for a Tunisian artisan selling custom beaded bracelets — with a real-time visual configurator, idempotent checkout, and a New → Delivered order pipeline.',
  alternates: { canonical: '/work/beadcraft' },
  openGraph: {
    title: 'BeadCraft Studio — Made-to-Order Bracelet Commerce | Hamza Benarfa',
    description:
      'Made-to-order bracelet commerce for a Tunisian artisan — a tactile visual configurator, bilingual storefront, and a crafter dashboard for inventory, orders, and per-wilaya shipping.',
    images: [
      {
        url: '/beadcraft.webp',
        width: 1200,
        height: 630,
        alt: 'BeadCraft Studio — made-to-order beaded bracelets',
      },
    ],
  },
};

export default function Page() {
  return <BeadCraftProjectPage />;
}
