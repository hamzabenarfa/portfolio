import type { Metadata } from 'next';
import MenuQRProjectPage from './client';

export const metadata: Metadata = {
    title: 'Menu QR - Digital Restaurant Menu Platform | Hamza Benarfa',
    description: 'A comprehensive digital menu platform enabling restaurants to create, manage, and publish QR-accessible menus with AI digitization, real-time updates, and multilingual support.',
    alternates: { canonical: '/projects/menu-qr' },
    openGraph: {
        title: 'Menu QR - Digital Restaurant Menu Platform | Hamza Benarfa',
        description: 'A comprehensive digital menu platform enabling restaurants to create, manage, and publish QR-accessible menus with AI digitization, real-time updates, and multilingual support.',
        images: [
            {
                url: '/menu-qr.webp',
                width: 1200,
                height: 630,
                alt: 'Menu QR - Digital Restaurant Menu Platform',
            },
        ],
    },
};

export default function Page() {
    return <MenuQRProjectPage />;
}

