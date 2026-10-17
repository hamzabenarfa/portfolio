import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfigProvider } from "@/components/fx/motion-config-provider";
import { SEO } from "@/components/seo/seo";
import { SpeedInsights } from "@vercel/speed-insights/next";


const interTight = localFont({
  src: [
    { path: "./fonts/inter-tight-normal-100.ttf", weight: "100", style: "normal" },
    { path: "./fonts/inter-tight-normal-200.ttf", weight: "200", style: "normal" },
    { path: "./fonts/inter-tight-normal-300.ttf", weight: "300", style: "normal" },
    { path: "./fonts/inter-tight-normal-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/inter-tight-normal-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/inter-tight-normal-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/inter-tight-normal-700.ttf", weight: "700", style: "normal" },
    { path: "./fonts/inter-tight-normal-800.ttf", weight: "800", style: "normal" },
    { path: "./fonts/inter-tight-normal-900.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-serif-normal-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-italic-400.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetBrainsMono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-normal-100.ttf", weight: "100", style: "normal" },
    { path: "./fonts/jetbrains-mono-normal-200.ttf", weight: "200", style: "normal" },
    { path: "./fonts/jetbrains-mono-normal-300.ttf", weight: "300", style: "normal" },
    { path: "./fonts/jetbrains-mono-normal-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-normal-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-mono-normal-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/jetbrains-mono-normal-700.ttf", weight: "700", style: "normal" },
    { path: "./fonts/jetbrains-mono-normal-800.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com";
const baseUrl = SITE_URL.replace(/\/$/, "");

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
    "Freelance Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "NestJS",
    "SaaS Developer",
    "MVP Development",
    "Freelance Developer Tunisia",
    "Software Engineer",
  ],
  authors: [{ name: "Hamza Benarfa", url: baseUrl }],
  creator: "Hamza Benarfa",
  openGraph: {
    title: "Hamza Benarfa | Full-Stack Developer",
    description:
      "Independent full-stack developer. I take SaaS products, dashboards, and web platforms from blank page to production — one person, start to finish.",
    url: baseUrl,
    siteName: "Hamza Benarfa",
    locale: "en_US",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Hamza Benarfa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Benarfa | Full-Stack Developer",
    description:
      "Independent full-stack developer. From blank page to deployed product, in weeks not quarters.",
    creator: "@benarfa",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
      >
        <MotionConfigProvider>{children}</MotionConfigProvider>
        <SEO />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
