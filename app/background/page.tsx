import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { PageIntro } from "@/components/site/page-intro";
import { Contact } from "@/components/site/contact";
import { SiteFooter } from "@/components/site/site-footer";
import { TileGlyph } from "@/components/site/tile-glyph";
import { LenisProvider } from "@/components/fx/lenis-provider";
import { ENGAGEMENTS, STACK_GROUPS } from "@/data/experience";
import "@/app/site.css";
import "@/app/subpage.css";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com";
const baseUrl = SITE_URL.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Engineering Background",
  description:
    "The engineering background of Hamza Benarfa — full-stack developer experience across fashion-tech, agency, teaching, and independent consulting, plus the stack behind the work.",
  alternates: { canonical: `${baseUrl}/background` },
  openGraph: {
    title: "Engineering Background | Hamza Benarfa",
    description:
      "Full-stack developer experience across fashion-tech, agency, teaching, and independent consulting.",
    url: `${baseUrl}/background`,
    type: "profile",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Hamza Benarfa — Background" }],
  },
};

const GLYPHS = ["bsb/sbs/bsb", "nnn/nbn/nnn", "bbb/.../nnn", "s.s/.r./s.s", "bnb/nbn/bnb", "sss/s.s/sss"];

export default function BackgroundPage() {
  return (
    <LenisProvider>
      <div className="site">
        <SiteHeader variant="page" />
        <main id="main-content">
          <PageIntro id="bg-title" title="Background">
            <p className="page-lead">
              Four years building products across robotics, fashion-tech, agencies, teaching, and independent
              consulting — frontend, backend, and the infrastructure in between.
            </p>
            <div className="page-actions">
              <a href="/benarfa-hamza-en.pdf" download className="button button-solid">Download CV (PDF)</a>
              <Link href="/work" className="button button-ghost">See the work</Link>
            </div>
          </PageIntro>

          <section className="timeline" aria-labelledby="bg-xp">
            <h2 id="bg-xp" className="section-title">Where I’ve built</h2>
            <ol className="timeline-list">
              {ENGAGEMENTS.map((e) => (
                <li key={e.company} className="timeline-item">
                  <span className="timeline-period">{e.period}</span>
                  <div className="timeline-main">
                    <h3>{e.company}</h3>
                    <p className="timeline-role">{e.role}</p>
                    <p className="timeline-overview">{e.overview}</p>
                    <ul className="timeline-stack" aria-label={`${e.company} stack`}>
                      {e.stack.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="toolkit" aria-labelledby="bg-stack">
            <div className="toolkit-head">
              <h2 id="bg-stack" className="section-title">The toolkit</h2>
              <p>What I reach for from the first commit to production — chosen for the problem, not the trend.</p>
            </div>
            <div className="toolkit-grid">
              {STACK_GROUPS.map((g, i) => (
                <div key={g.label} className="toolkit-group">
                  <TileGlyph pattern={GLYPHS[i % GLYPHS.length]} className="toolkit-glyph" />
                  <h3>{g.label}</h3>
                  <ul>
                    {g.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </LenisProvider>
  );
}
