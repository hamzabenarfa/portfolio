import type { Metadata } from 'next';
import KindraProjectPage from './client';

export const metadata: Metadata = {
    title: 'KINDRA - E-Commerce Platform | Hamza Benarfa',
    description: 'A production-ready, full-stack e-commerce platform built for the fashion industry, showcasing modern web development practices and enterprise-grade architecture.',
    openGraph: {
        title: 'KINDRA - E-Commerce Platform | Hamza Benarfa',
        description: 'A production-ready, full-stack e-commerce platform built for the fashion industry, showcasing modern web development practices and enterprise-grade architecture.',
        images: [
            {
                url: '/kindra-hero.png',
                width: 1200,
                height: 630,
                alt: 'KINDRA - E-Commerce Platform',
            },
        ],
    },
};

export default function Page() {
    return <KindraProjectPage />;
}
