import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-seo-data';
import KindraProjectPage from './client';

export const metadata: Metadata = {
    title: 'KINDRA — Editorial Fashion Storefront Example | Hamza Benarfa',
    description: 'An editorial fashion storefront concept/example with separate Men\'s and Women\'s collections, lookbook-style landing sections, variant-aware product pages, and a static cart-to-payment UI flow.',
    alternates: { canonical: '/work/kindra' },
    robots: { index: false, follow: false },
    openGraph: {
        title: 'KINDRA — Editorial Fashion Storefront Example | Hamza Benarfa',
        description: 'An editorial fashion storefront concept/example with separate Men\'s and Women\'s collections, lookbook-style landing sections, variant-aware product pages, and a static cart-to-payment UI flow.',
        images: [
            {
                url: '/kindra.webp',
                width: 1200,
                height: 630,
                alt: 'KINDRA — editorial fashion storefront',
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
                    { name: 'KINDRA', url: '/work/kindra' },
                ]}
            />
            <KindraProjectPage />
        </>
    );
}
