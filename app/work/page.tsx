import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/consts";
import { PROJECT_CONTENT } from "@/data/project-content";
import { SubpageNav } from "@/components/subpage-nav";

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
  return (
    <div className="subpage">
      <SubpageNav />

      <main className="container wi-wrap">
        <header className="wi-head">
          <span className="wi-eyebrow mono">
            <span className="mono-accent">●</span> Index — projects &amp; case studies
          </span>
          <h1 className="wi-title">
            All <em>work</em>
          </h1>
          <p className="wi-lead">
            A closer look at products I&rsquo;ve designed, built, and shipped — from
            first scope to production. Each one taken from blank page to live, by one
            person.
          </p>
        </header>

        <ol className="wi-list">
          {PROJECTS.map((p, i) => {
            const c = PROJECT_CONTENT[p.slug];
            if (!c) return null;
            return (
              <li key={p.slug} className="wi-item">
                <Link
                  href={`/work/${p.slug}`}
                  className="wi-media"
                  aria-label={`${c.title} — case study`}
                >
                  <Image
                    src={p.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 46vw"
                  />
                </Link>

                <div className="wi-body">
                  <span className="wi-index mono">/{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="wi-name">{c.title}</h2>
                  <span className="wi-cat mono">{c.category}</span>
                  <p className="wi-desc">{c.description}</p>

                  <ul className="wi-tags" aria-label="Tech stack">
                    {p.tech.slice(0, 6).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  <div className="wi-links">
                    <Link href={`/work/${p.slug}`} className="btn">
                      Case study <span className="arr">→</span>
                    </Link>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn"
                      >
                        Live site <span className="arr">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="wi-foot">
          <span className="mono">More code, experiments and smaller builds</span>
          <a
            href="https://github.com/hamzabenarfa/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-solid"
          >
            View GitHub <span className="arr">↗</span>
          </a>
        </div>
      </main>
    </div>
  );
}
