import type React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SEO } from "@/components/seo/seo";
import { SpeedInsights } from "@vercel/speed-insights/next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Hamza Benarfa | Full-Stack Developer",
    fr: "Hamza Benarfa | Développeur Full-Stack",
  };

  const descriptions: Record<string, string> = {
    en: "Independent full-stack developer based in Tunisia. I partner with founders and small teams to take ideas from blank Figma to deployed product, in weeks not quarters.",
    fr: "Développeur full-stack indépendant basé en Tunisie. Je transforme vos idées en produits déployés, en semaines et non en trimestres.",
  };

  return {
    metadataBase: new URL("https://benarfa.com"),
    title: {
      default: titles[locale] || titles.en,
      template: "%s | Hamza Benarfa",
    },
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "Hamza Benarfa",
      "Full-Stack Developer",
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Freelance Developer Tunisia",
      "Software Engineer",
    ],
    authors: [{ name: "Hamza Benarfa", url: "https://benarfa.com" }],
    creator: "Hamza Benarfa",
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: "https://benarfa.com",
      siteName: "Hamza Benarfa",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: "/api/og", width: 1200, height: 630, alt: "Hamza Benarfa" }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      creator: "@benarfa",
      images: ["/api/og"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    alternates: {
      canonical: "https://benarfa.com",
      languages: { en: "https://benarfa.com", fr: "https://benarfa.com/fr" },
    },
    icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-icon.png" },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <SEO />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
