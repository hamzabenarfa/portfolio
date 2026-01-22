import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SEO } from "@/components/seo/seo";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
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
    en: "Hamza Benarfa | Full-Stack Developer & DevOps Engineer",
    fr: "Hamza Benarfa | Développeur Full-Stack & Ingénieur DevOps",
  };

  const descriptions: Record<string, string> = {
    en: "Freelance full-stack developer & DevOps engineer from Tunisia. I build fast, accessible, and scalable web & mobile apps with Next.js, TypeScript, React, NestJS, and cloud infrastructure.",
    fr: "Développeur full-stack freelance & ingénieur DevOps de Tunisie. Je construis des applications web et mobiles rapides, accessibles et évolutives avec Next.js, TypeScript, React, NestJS et l'infrastructure cloud.",
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
      "DevOps Engineer",
      "Web Development",
      "Mobile App Development",
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Cloud Infrastructure",
      "Freelance Developer Tunisia",
      "Software Engineer",
    ],
    authors: [{ name: "Hamza Benarfa", url: "https://benarfa.com" }],
    creator: "Hamza Benarfa",
    openGraph: {
      title: "Hamza Benarfa — Full-Stack Developer",
      description:
        "Building pixel-perfect, performant web apps with modern stacks.",
      url: "https://benarfa.com",
      siteName: "Hamza Benarfa",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Hamza Benarfa - Full-Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Hamza Benarfa — Full-Stack Developer",
      description:
        "Building pixel-perfect, performant web apps with modern stacks.",
      creator: "@benarfa",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://benarfa.com",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-icon.png",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure the locale is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch messages for the current locale
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${geist.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <SEO />
            <Analytics />
            <SpeedInsights />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

