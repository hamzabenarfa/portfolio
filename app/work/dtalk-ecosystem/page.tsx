import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-seo-data';
import DTalkProjectPage from './client';

export const metadata: Metadata = {
    title: 'D-Talk Ecosystem - B2B Fashion Marketplace Frontend | Hamza Benarfa',
    description: 'Frontend architecture for a B2B fashion marketplace — designers sell artwork and technical templates to brand accounts, who customize products in a real-time canvas editor and order a sample before committing to bulk production. Built with Next.js, Fabric.js, and Konva.',
    alternates: { canonical: '/work/dtalk-ecosystem' },
    openGraph: {
        title: 'D-Talk Ecosystem - B2B Fashion Marketplace Frontend | Hamza Benarfa',
        description: 'Frontend architecture for a B2B fashion marketplace — designers sell artwork and technical templates to brand accounts, who customize products in a real-time canvas editor and order a sample before committing to bulk production. Built with Next.js, Fabric.js, and Konva.',
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
    return (
        <>
            <StructuredData
                type="BreadcrumbList"
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Work', url: '/work' },
                    { name: 'D-Talk Ecosystem', url: '/work/dtalk-ecosystem' },
                ]}
            />
            <DTalkProjectPage />
        </>
    );
}
