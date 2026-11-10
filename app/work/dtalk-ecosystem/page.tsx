import type { Metadata } from 'next';
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from '@/components/seo/structured-seo-data';
import DTalkProjectPage from './client';

export const metadata: Metadata = pageMetadata({
  title: "D-Talk Ecosystem — B2B Fashion Marketplace Frontend",
  description:
    'Frontend architecture for a B2B fashion marketplace — designers sell artwork and technical templates to brand accounts, who customize products in a real-time canvas editor and order a sample before committing to bulk production. Built with Next.js, Fabric.js, and Konva.',
  path: "/work/dtalk-ecosystem",
  type: "article",
});

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
