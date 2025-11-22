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
  title: {
    default: "Hamza Benarfa | Full-Stack Developer & DevOps Engineer",
    template: "%s | Hamza Benarfa",
  },
  description:"Freelance full-stack developer & DevOps engineer from Tunisia. I build fast, accessible, and scalable web & mobile apps with Next.js, TypeScript, React, NestJS, and cloud infrastructure.",

  keywords: [
    "freelance developer Tunisia",
    "freelance developer",
    "full-stack developer",
    "Next.js expert",
    "TypeScript developer",
    "React developer",
    "DevOps engineer",
    "web development portfolio",
    "mobile app development",
    "Stripe integration",
    "CI/CD automation",
    "cloud deployment",
    "SaaS development",
    "startup tech partner",
    "accessible web apps",
    "pixel-perfect UI",
    "NestJS backend",
    "Zustand",
    "React Query",
    "ShadCN",
    "KonvaJS",
  ],
  authors: [{ name: "Hamza Benarfa", url: "https://benarfa.com" }],
  openGraph: {
    title: "Hamza Benarfa — Full-Stack Developer",
    description: "Building pixel-perfect, performant web apps with modern stacks.",
    url: "https://benarfa.com",
    siteName: "benarfa.com",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://benarfa.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hamza Benarfa",
      },
    ],
  
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
