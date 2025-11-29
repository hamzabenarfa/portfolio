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

export const metadata: Metadata = {
  metadataBase: new URL("https://benarfa.com"),
  title: {
    default: "Hamza Benarfa | Full-Stack Developer & DevOps Engineer",
    template: "%s | Hamza Benarfa",
  },
  description:
    "Freelance full-stack developer & DevOps engineer from Tunisia. I build fast, accessible, and scalable web & mobile apps with Next.js, TypeScript, React, NestJS, and cloud infrastructure.",
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
    description: "Building pixel-perfect, performant web apps with modern stacks.",
    url: "https://benarfa.com",
    siteName: "Hamza Benarfa",
    locale: "en_US",
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
    description: "Building pixel-perfect, performant web apps with modern stacks.",
    creator: "@benarfa", // Replace with actual handle if available, or remove
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
