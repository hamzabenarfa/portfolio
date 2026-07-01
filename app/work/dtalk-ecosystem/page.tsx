import type { Metadata } from 'next';
import DTalkProjectPage from './client';

export const metadata: Metadata = {
    title: 'D-Talk Ecosystem - Multi-Role Fashion Platform | Hamza Benarfa',
    description: 'A comprehensive fashion e-commerce platform enabling designers to create and sell, brands to customize products, and admins to manage the ecosystem.',
    alternates: { canonical: '/work/dtalk-ecosystem' },
    openGraph: {
        title: 'D-Talk Ecosystem - Multi-Role Fashion Platform | Hamza Benarfa',
        description: 'A comprehensive fashion e-commerce platform enabling designers to create and sell, brands to customize products, and admins to manage the ecosystem.',
        images: [
            {
                url: '/dtalk-hero.webp',
                width: 1440,
                height: 900,
                alt: 'D-Talk Ecosystem - Multi-Role Fashion Platform',
            },
        ],
    },
};

export default function Page() {
    return <DTalkProjectPage />;
}
