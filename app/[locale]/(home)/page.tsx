import { setRequestLocale } from "next-intl/server";
import Header from "@/components/header";
import { CustomCursor } from "./_components/custom-cursor";
import { ScrollReveal } from "./_components/scroll-reveal";
import { Hero } from "./_components/hero";
import { MarqueeTape } from "./_components/marquee-tape";
import { Experience } from "./_components/experience";
import { ProjectsSection } from "./_components/projects-section";
import { Capabilities } from "./_components/capabilities";
import { Methodology } from "./_components/methodology";
import { FAQ } from "./_components/faq";
import { Connect } from "./_components/connect";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="home-page">
      <div className="grain-overlay" />
      <div className="cursor-spotlight" />
      <CustomCursor />
      <ScrollReveal />
      <Header />
      <main>
        <Hero />
        <MarqueeTape />
        <Experience />
        <ProjectsSection />
        <Capabilities />
        <Methodology />
        <FAQ />
        <Connect />
      </main>
      <footer className="site-footer">
        <span>© 2026 — Hamza Benarfa</span>
        <span>Edition v.04 — Built &amp; deployed by hand</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
