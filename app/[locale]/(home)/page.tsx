
import Header from "@/components/header";
import Script from "next/script";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "./_components/hero";
import { ProjectsSection } from "./_components/projects-section";
import { Capabilities } from "./_components/capabilities";
import { Experience } from "./_components/experience";
import { Connect } from "./_components/connect";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hamza Benarfa",
  url: "https://benarfa.com",
  image: "https://benarfa.com/og-image.png",
  jobTitle: "Full-Stack Developer & DevOps Engineer",
  description:
    "Freelance full-stack developer & DevOps engineer from Tunisia. I build fast, accessible, and scalable web & mobile apps with Next.js, TypeScript, React, NestJS, and cloud infrastructure.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "Tunisia",
  },
  email: "contact@benarfa.com",
  sameAs: [
    "https://github.com/hamzabenarfa",
    "https://linkedin.com/in/hamzabenarfa",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "NestJS",
    "DevOps",
    "Cloud Infrastructure",
    "Web Development",
    "Mobile App Development",
  ],
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <main className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
        <Hero />
        <ProjectsSection />
        <Capabilities />
        <Experience />
        <Connect />

        {/* Footer */}
        <footer className="py-8 border-t border-secondary/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              &copy; 2026 Hamza Benarfa.
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a
                href="#intro"
                className="hover:text-primary transition-colors"
              >
                Back to Top &uarr;
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
