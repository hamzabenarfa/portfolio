import "@/app/site.css";
import "./home.css";
import { SiteHeader } from "@/components/site/site-header";
import { Contact } from "@/components/site/contact";
import { SiteFooter } from "@/components/site/site-footer";
import { LenisProvider } from "@/components/fx/lenis-provider";
import { StructuredData } from "@/components/seo/structured-seo-data";
import { Hero } from "./_components/hero";
import { Statement } from "./_components/statement";
import { WorkStack } from "./_components/work-stack";
import { Services } from "./_components/services";
import { Process } from "./_components/process";
import { Experience } from "./_components/experience";
import { FAQ } from "./_components/faq";

export default function Home() {
  return (
    <LenisProvider>
      {/* FAQ rich-result schema lives here (not the root layout) so it only
          renders on the page that actually shows the FAQ content. */}
      <StructuredData type="FAQPage" />
      <div className="site">
        <SiteHeader variant="home" />
        <main id="main-content">
          <Hero />
          <Statement />
          <WorkStack />
          <Services />
          <Process />
          <Experience />
          <FAQ />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </LenisProvider>
  );
}
