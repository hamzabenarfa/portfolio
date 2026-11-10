import type { Metadata } from 'next';
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from '@/components/seo/structured-seo-data';
import { isoDuration, loadCaseFilm } from '@/data/films';
import BeadCraftProjectPage from './client';

export const metadata: Metadata = pageMetadata({
  title: "BeadCraft Studio — Made-to-Order Bracelet Commerce",
  description:
    'A bilingual storefront and crafter dashboard for a Tunisian artisan selling custom beaded bracelets — with a real-time visual configurator, idempotent checkout, and a New → Delivered order pipeline.',
  shareDescription:
    'Made-to-order jewelry commerce for a Tunisian artisan — a tactile visual configurator, bilingual storefront, and a crafter dashboard for inventory, orders, and a New → Delivered production pipeline.',
  path: "/work/beadcraft",
  type: "article",
});

export default async function Page() {
  const film = await loadCaseFilm('beadcraft');
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Work', url: '/work' },
          { name: 'BeadCraft Studio', url: '/work/beadcraft' },
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
      <BeadCraftProjectPage film={film} />
    </>
  );
}
