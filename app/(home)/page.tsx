import Header from "@/components/header";
import { SEO } from "@/components/seo/seo";
import { CustomCursor } from "./_components/custom-cursor";
import { ScrollReveal } from "./_components/scroll-reveal";
import { Hero } from "./_components/hero";
import { MarqueeTape } from "./_components/marquee-tape";
import { ProofStrip } from "./_components/proof-strip";
import { Experience } from "./_components/experience";
import { ProjectsSection } from "./_components/projects-section";
import { Capabilities } from "./_components/capabilities";
import { ProcessJourney } from "./_components/process-journey";
import { FAQ } from "./_components/faq";
import { Connect } from "./_components/connect";

export default function Home() {
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
        <ProofStrip />
        <ProjectsSection />
        <Capabilities />
        <ProcessJourney />
        <Experience />
        <FAQ />
        <Connect />
      </main>
      <SEO
        includeFaq
        includeProfile
        page={{
          name: "Hamza Benarfa | Full-Stack Developer",
          description: "Independent full-stack developer and DevOps engineer for SaaS MVPs, custom platforms, visual tools, and launch infrastructure.",
          url: "/",
          dateModified: "2026-05-14",
        }}
      />
      <footer className="site-footer">
        <span>© 2026 — Hamza Benarfa</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
