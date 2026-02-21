
import Header from "@/components/header";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "./_components/hero";
import { ProjectsSection } from "./_components/projects-section";
import { Capabilities } from "./_components/capabilities";
import { Experience } from "./_components/experience";
import { Connect } from "./_components/connect";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Header />

      <main id="main-content" className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
        <Hero />
        <ProjectsSection />
        <Capabilities />
        <Experience />
        <Connect />
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16 py-8 border-t border-secondary/30">
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
    </div>
  );
}

