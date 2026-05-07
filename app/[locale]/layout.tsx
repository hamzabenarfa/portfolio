import type React from "react";
import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SEO } from "@/components/seo/seo";
import { SpeedInsights } from "@vercel/speed-insights/next";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com";
const baseUrl = SITE_URL.replace(/\/$/, "");

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
    metadataBase: new URL(baseUrl),
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
    authors: [{ name: "Hamza Benarfa", url: baseUrl }],
    creator: "Hamza Benarfa",
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: locale === "fr" ? `${baseUrl}/fr` : baseUrl,
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
      canonical: locale === "fr" ? `${baseUrl}/fr` : baseUrl,
      languages: { en: baseUrl, fr: `${baseUrl}/fr` },
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
      <body className={`${interTight.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}>
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
