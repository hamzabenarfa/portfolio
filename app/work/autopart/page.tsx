import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-seo-data';
import { isoDuration, loadCaseFilm } from '@/data/films';
import AutoPartProjectPage from './client';

export const metadata: Metadata = {
  title: 'AutoParts Tunisia — Verified Car-Parts Marketplace | Hamza Benarfa',
  description:
    'A French, mobile-first car-parts marketplace for Tunisia: a vehicle-fit finder, a 20%-deposit order engine with human stock-verification calls, and separate customer, admin, and supplier surfaces.',
  alternates: { canonical: '/work/autopart' },
  openGraph: {
    title: 'AutoParts Tunisia — Verified Car-Parts Marketplace | Hamza Benarfa',
    description:
      'Verified car-parts marketplace for Tunisia — vehicle-fit finder, 20%-deposit order engine with human stock checks, and three-sided customer/admin/supplier platform.',
    images: [
      {
        url: '/autopart.webp',
        width: 1200,
        height: 630,
        alt: 'AutoParts Tunisia — verified car-parts marketplace',
      },
    ],
  },
};

export default async function Page() {
  const film = await loadCaseFilm('autopart');
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Work', url: '/work' },
          { name: 'AutoParts Tunisia', url: '/work/autopart' },
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
      <AutoPartProjectPage film={film} />
    </>
  );
}
