import Header from "@/components/header";
import { LenisProvider } from "@/components/fx/lenis-provider";
import { Cursor } from "@/components/fx/cursor";
import { Hero } from "./_components/hero";
import { MarqueeTape } from "./_components/marquee-tape";
import { ProjectsSection } from "./_components/projects-section";
import { Capabilities } from "./_components/capabilities";
import { Methodology } from "./_components/methodology";
import { FAQ } from "./_components/faq";
import { Connect } from "./_components/connect";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <LenisProvider>
      <div className="home-page">
        <div className="grain-overlay" />
        <Cursor />
        <Header />
        <main>
          <Hero />
          <MarqueeTape />
          <ProjectsSection />
          <Capabilities />
          <Methodology />
          <FAQ />
          <Connect />
        </main>
        <Footer />
      </div>
    </LenisProvider>
  );
}
