import type { Metadata } from 'next';
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from '@/components/seo/structured-seo-data';
import KindraProjectPage from './client';

export const metadata: Metadata = pageMetadata({
  title: "KINDRA — Editorial Fashion Storefront Example",
  description:
    'An editorial fashion storefront concept/example with separate Men\'s and Women\'s collections, lookbook-style landing sections, variant-aware product pages, and a static cart-to-payment UI flow.',
  path: "/work/kindra",
  type: "article",
  noindex: true,
});

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
