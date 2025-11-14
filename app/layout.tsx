import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SEO } from "@/components/seo/seo";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from '@vercel/speed-insights/next';

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata ={
  title: "Hamza Benarfa | Full-Stack Developer & Tech Mentor",
  description: "I build scalable web & mobile apps with React, Next.js, React Native, and NestJS. Available for freelance and collaborations.",
  keywords: [
    "full-stack developer",
    "Next.js portfolio",
    "React Native",
    "TypeScript",
    "Stripe integration",
    "KonvaJS",
    "Zustand",
    "ShadCN",
    "freelance developer Tunisia"
  ],
  authors: [{ name: "Hamza Benarfa" }],
  openGraph: {
    title: "Hamza Benarfa — Full-Stack Developer",
    description: "Building pixel-perfect, performant web apps with modern stacks.",
    url: "https://benarfa.com",
    siteName: "benarfa.com",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Create a custom OG image (1200x630px)
        width: 1200,
        height: 630,
        alt: "Hamza Benarfa Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourhandle", // optional
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://benarfa.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {children}
        <SEO />
        <Analytics />
        <SpeedInsights />

        </ThemeProvider>
      </body>
    </html>
  );
}
