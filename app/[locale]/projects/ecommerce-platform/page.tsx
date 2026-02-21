import type { Metadata } from 'next';
import EcommerceProjectPage from './client';

export const metadata: Metadata = {
    title: 'Vertex - E-Commerce Platform | Hamza Benarfa',
    description: 'A production-ready e-commerce platform for tech gadgets with a modern storefront, comprehensive admin dashboard, and Stripe integration.',
    openGraph: {
        title: 'Vertex - E-Commerce Platform | Hamza Benarfa',
        description: 'A production-ready e-commerce platform for tech gadgets with a modern storefront, comprehensive admin dashboard, and Stripe integration.',
        images: [
            {
                url: '/vertex.webp',
                width: 1200,
                height: 630,
                alt: 'Vertex - E-Commerce Platform',
            },
        ],
    },
};

export default function Page() {
    return <EcommerceProjectPage />;
}
