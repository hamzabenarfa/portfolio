import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-seo-data';
import MenuQRProjectPage from './client';

export const metadata: Metadata = {
    title: 'Menu QR — QR Ordering for Restaurants | Hamza Benarfa',
    description: 'A multi-tenant SaaS that turns any table into a QR ordering page — passwordless sign-in, a live kitchen dashboard, and 28 built storefront designs, trilingual with full Arabic RTL support.',
    alternates: { canonical: '/work/menu-qr' },
    openGraph: {
        title: 'Menu QR — QR Ordering for Restaurants | Hamza Benarfa',
        description: 'A multi-tenant SaaS platform that puts a restaurant\'s menu on every table behind a single QR code — turning scans into live orders with no app to download and no POS terminal.',
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
    return (
        <>
            <StructuredData
                type="BreadcrumbList"
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Work', url: '/work' },
                    { name: 'Menu QR', url: '/work/menu-qr' },
                ]}
            />
            <MenuQRProjectPage />
        </>
    );
}

