import type { Metadata } from 'next';
import KindraProjectPage from './client';

export const metadata: Metadata = {
    title: 'Kindra — Fashion E-Commerce Starter Kit | Hamza Benarfa',
    description: 'A production-ready e-commerce starter kit for fashion brands — separate Men\'s and Women\'s storefronts, multi-variant products, Stripe payments, and a full admin dashboard.',
    alternates: { canonical: '/work/kindra' },
    openGraph: {
        title: 'Kindra — Fashion E-Commerce Starter Kit | Hamza Benarfa',
        description: 'A production-ready e-commerce starter kit for fashion brands — separate Men\'s and Women\'s storefronts, multi-variant products, Stripe payments, and a full admin dashboard.',
        images: [
            {
                url: '/kindra.webp',
                width: 1200,
                height: 630,
                alt: 'Kindra — fashion e-commerce starter kit',
            },
        ],
    },
};

export default function Page() {
    return <KindraProjectPage />;
}
