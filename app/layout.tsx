import type React from "react";
import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl, getAbsoluteUrl, getAlternates } from "@/lib/seo";

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

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Hamza Benarfa | Full-Stack Developer",
    template: "%s | Hamza Benarfa",
  },
  description:
    "Independent full-stack developer based in Tunisia. I partner with founders and small teams to take ideas from blank Figma to deployed product, in weeks not quarters.",
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
    title: "Hamza Benarfa | Full-Stack Developer",
    description:
      "Independent full-stack developer based in Tunisia. I partner with founders and small teams to take ideas from blank Figma to deployed product, in weeks not quarters.",
    url: getAbsoluteUrl(),
    siteName: "Hamza Benarfa",
    locale: "en_US",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Hamza Benarfa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Benarfa | Full-Stack Developer",
    description:
      "Independent full-stack developer based in Tunisia. I partner with founders and small teams to take ideas from blank Figma to deployed product, in weeks not quarters.",
    creator: "@benarfa",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: getAlternates(),
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${interTight.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
