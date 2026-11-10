import type { Metadata } from 'next';
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from '@/components/seo/structured-seo-data';
import { isoDuration, loadCaseFilm } from '@/data/films';
import MenuQRProjectPage from './client';

export const metadata: Metadata = pageMetadata({
  title: "Menu QR — QR Ordering for Restaurants",
  description:
    'A multi-tenant SaaS that turns any table into a QR ordering page — passwordless sign-in, a live kitchen dashboard, and 28 built storefront designs, trilingual with full Arabic RTL support.',
  shareDescription:
    'A multi-tenant SaaS platform that puts a restaurant\'s menu on every table behind a single QR code — turning scans into live orders with no app to download and no POS terminal.',
  path: "/work/menu-qr",
  type: "article",
});

export default async function Page() {
    const film = await loadCaseFilm('menu-qr');
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
            {film && (
                <StructuredData
                    type="VideoObject"
                    video={{
                        name: film.title,
                        description: metadata.description as string,
                        thumbnailUrl: film.poster,
                        uploadDate: film.uploadDate,
                        duration: isoDuration(film.duration),
                        contentUrl: film.src,
                        transcript: film.transcript,
                    }}
                />
            )}
            <MenuQRProjectPage film={film} />
        </>
    );
}
