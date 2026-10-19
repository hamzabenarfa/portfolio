import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/data/consts";
import { PROJECT_CONTENT } from "@/data/project-content";
import { SiteHeader } from "@/components/site/site-header";
import { PageIntro } from "@/components/site/page-intro";
import { Contact } from "@/components/site/contact";
import { SiteFooter } from "@/components/site/site-footer";
import { LenisProvider } from "@/components/fx/lenis-provider";
import { MosaicImage } from "@/components/fx/mosaic-image";
import "@/app/site.css";
import "@/app/subpage.css";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com";
const baseUrl = SITE_URL.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Case studies and projects by Hamza Benarfa — SaaS platforms, e-commerce builds, and custom web tools designed and shipped end to end.",
  alternates: { canonical: `${baseUrl}/work` },
  openGraph: {
    title: "Selected Work | Hamza Benarfa",
    description:
      "Case studies and projects — SaaS platforms, e-commerce, and custom web tools built end to end.",
    url: `${baseUrl}/work`,
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Hamza Benarfa — Work" }],
  },
};

export default function WorkPage() {
  const projects = PROJECTS.filter((p) => p.listed !== false && PROJECT_CONTENT[p.slug]);

  return (
    <LenisProvider>
      <div className="site">
        <SiteHeader variant="page" />
        <main id="main-content">
          <PageIntro id="work-title" title="All work">
            <p className="page-lead">
              A closer look at products I&rsquo;ve designed, built, and shipped — from first scope to production.
              Each one taken from blank page to live, by one person.
            </p>
          </PageIntro>

          <section className="work-list-page" aria-label="Projects">
            {projects.map((p) => {
              const c = PROJECT_CONTENT[p.slug];
              const href = `/work/${p.slug}`;
              return (
                <article key={p.slug} className="work-entry" aria-labelledby={`entry-${p.slug}`}>
                  <Link href={href} className="work-entry-media" tabIndex={-1} aria-hidden="true" data-cursor-label="View case study">
                    <MosaicImage src={p.image} alt={`${c.title} homepage`} sizes="(max-width: 860px) 92vw, 58vw" grout="#e1e3dc" />
                  </Link>
                  <div className="work-entry-info">
                    <p className="work-entry-meta"><span>{c.category}</span><span>{p.year}</span></p>
                    <h2 id={`entry-${p.slug}`}>{c.title}</h2>
                    <p className="work-entry-desc">{c.description}</p>
                    <ul className="work-entry-tags" aria-label="Tech stack">
                      {p.tech.slice(0, 6).map((t) => <li key={t}>{t}</li>)}
                    </ul>
                    <div className="work-entry-links">
                      <Link href={href} className="button button-solid">Read the case study</Link>
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noreferrer" className="text-link">
                          Live site <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
            <div className="work-outro">
              <p>More code, experiments and smaller builds live on GitHub.</p>
              <a href="https://github.com/hamzabenarfa/" target="_blank" rel="noreferrer" className="text-link">
                View GitHub <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </section>
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </LenisProvider>
  );
}
