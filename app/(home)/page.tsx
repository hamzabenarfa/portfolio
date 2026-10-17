import "./portfolio.css";
import Header from "@/components/header";
import { LenisProvider } from "@/components/fx/lenis-provider";
import { StructuredData } from "@/components/seo/structured-seo-data";
import { Hero } from "./_components/hero";
import { ProjectsSection } from "./_components/projects-section";
import { Capabilities } from "./_components/capabilities";
import { Methodology } from "./_components/methodology";
import { FAQ } from "./_components/faq";
import { Connect } from "./_components/connect";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <LenisProvider>
      {/* FAQ rich-result schema lives here (not the root layout) so it only
          renders on the page that actually shows the FAQ content. */}
      <StructuredData type="FAQPage" />
      <div className="home-page portfolio-v2">
        <Header />
        <main id="main-content">
          <Hero />
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
