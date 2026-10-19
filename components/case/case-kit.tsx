"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/data/consts";
import { PROJECT_CONTENT } from "@/data/project-content";
import { trackEvent } from "@/lib/track";
import { prefersReducedMotion } from "@/lib/stage";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Contact } from "@/components/site/contact";
import { LenisProvider } from "@/components/fx/lenis-provider";
import { MosaicImage } from "@/components/fx/mosaic-image";
import { TesseraField, WALL } from "@/components/fx/tessera-field";
import { Lightbox, type MediaDimensions } from "@/components/fx/media";
import "@/app/site.css";
import "@/app/subpage.css";
import "@/app/work/case.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Case-study kit: every /work/<slug> page is composed from these pieces so
 * the case studies speak the same Tessera language as the rest of the site,
 * while each keeps its own copy, imagery and interactive demo.
 */

export type CaseTone = "saffron" | "sidi" | "night" | "bloom";

/** Each project's panel colour, drawn from the site palette. */
export const CASE_TONES: Record<string, CaseTone> = {
  beadcraft: "saffron",
  autopart: "sidi",
  "menu-qr": "night",
  "dtalk-ecosystem": "bloom",
  vertex: "sidi",
  kindra: "night",
};

/** Grout between mosaic tiles, a shade darker than each panel colour. */
const TONE_GROUT: Record<CaseTone, string> = {
  saffron: "#c88e26",
  sidi: "#1542a8",
  night: "#071a47",
  bloom: "#a62d65",
};

const WASH_GROUT = "#e1e3dc";

/* ---------- Page frame ---------- */

export function CasePage({ slug, children }: { slug: string; children: ReactNode }) {
  const tone = CASE_TONES[slug] ?? "night";
  return (
    <LenisProvider>
      <div className={`site case tone-${tone}`}>
        <SiteHeader variant="page" />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </div>
    </LenisProvider>
  );
}

/* ---------- Hero ---------- */

/** Sizes the title so its longest line spans the wall, measured with the settled (expanded) font. */
function useFitTitle(lines: string[]) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const probe = document.createElement("span");
      const cs = getComputedStyle(el);
      Object.assign(probe.style, {
        position: "absolute",
        visibility: "hidden",
        whiteSpace: "nowrap",
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight,
        fontStretch: "125%",
        letterSpacing: "-0.055em",
        fontSize: "100px",
      });
      document.body.appendChild(probe);
      const widest = Math.max(...lines.map((line) => { probe.textContent = line; return probe.getBoundingClientRect().width; }));
      probe.remove();
      if (widest > 0) el.style.setProperty("--fit", String(widest / 100 + 0.04));
    };
    if (document.fonts?.status === "loaded") measure();
    document.fonts?.ready.then(measure);
  }, [lines]);
  return ref;
}

export interface CaseHeroProps {
  slug: string;
  title: string;
  /** Override how the title breaks; defaults to one word per line. */
  titleLines?: string[];
  /** Short facts shown under the wall, e.g. category, year, domain. */
  meta: ReactNode[];
  liveUrl?: string;
  liveLabel?: string;
  /** The page's own one-line pitch, set large in the colour panel. */
  tagline: ReactNode;
  description: ReactNode;
  primary?: { href: string; label: string };
  /** Hero media; use <CaseHeroImage> for screenshots. */
  media: ReactNode;
  mediaCaption?: string;
  /** CSS aspect-ratio of the media frame. */
  mediaAspect?: string;
  /** Trust strip under the media. */
  facts?: string[];
}

export function CaseHero({ slug, title, titleLines, meta, liveUrl, liveLabel = "Visit the live site", tagline, description, primary, media, mediaCaption, mediaAspect = "16 / 9", facts }: CaseHeroProps) {
  const lines = titleLines ?? title.split(" ");
  const titleRef = useFitTitle(lines);
  const titleId = useId();
  const fallbackFit = Math.max(...lines.map((l) => l.length)) * 0.72;
  return (
    <>
      <section className="page-intro case-hero" id="top" aria-labelledby={titleId}>
        <div className="page-wall case-wall">
          <TesseraField palette={WALL} seed={slug.length * 13} className="wall-canvas" />
          <h1
            ref={titleRef}
            id={titleId}
            className="page-title case-title"
            aria-label={title}
            style={{ "--fit": fallbackFit, "--lines": lines.length } as React.CSSProperties}
          >
            {lines.map((line) => <span key={line} className="case-title-line" aria-hidden="true">{line}</span>)}
          </h1>
        </div>
        <div className="page-bar case-meta">
          <ul className="case-meta-list">
            {meta.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="button button-ghost">
              {liveLabel} <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </section>
      <section className="case-lede" aria-label={`${title} overview`}>
        <div className="case-lede-copy">
          <p className="case-tagline">{tagline}</p>
          <div className="case-lede-side">
            <div className="case-description">{description}</div>
            {primary && <a href={primary.href} className="button button-tone">{primary.label}</a>}
          </div>
        </div>
        <figure className="case-lede-media">
          <div className="case-lede-frame" style={{ aspectRatio: mediaAspect }}>{media}</div>
          {mediaCaption && <figcaption>{mediaCaption}</figcaption>}
        </figure>
        {facts && (
          <ul className="case-facts">
            {facts.map((f) => <li key={f}>{f}</li>)}
          </ul>
        )}
      </section>
    </>
  );
}

/** A hero screenshot that resolves from tiles as the page arrives. */
export function CaseHeroImage({ slug, src, alt, objectPosition = "top" }: { slug: string; src: string; alt: string; objectPosition?: "top" | "center" }) {
  return (
    <MosaicImage
      src={src}
      alt={alt}
      sizes="(max-width: 860px) 100vw, 92vw"
      priority
      play="load"
      coarseness={26}
      grout={TONE_GROUT[CASE_TONES[slug] ?? "night"]}
      objectPosition={objectPosition}
    />
  );
}

/* ---------- Sections ---------- */

export type CaseSurface = "wash" | "tone" | "night";

export function CaseSection({
  id,
  label,
  title,
  aside,
  surface = "wash",
  children,
}: {
  id?: string;
  /** Chapter name, set in the margin beside the title. */
  label?: string;
  title: ReactNode;
  aside?: ReactNode;
  surface?: CaseSurface;
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const titleId = useId();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Chapter titles stretch open as they arrive, the same gesture as the homepage panels.
      gsap.fromTo(
        root.current!.querySelector(".case-section-title"),
        { "--wdth": 92 },
        { "--wdth": 118, ease: "none", scrollTrigger: { trigger: root.current, start: "top 92%", end: "top 40%", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id={id} className={`case-section surface-${surface}`} aria-labelledby={titleId}>
      <div className="case-section-head">
        {label && <p className="case-label">{label}</p>}
        <h2 id={titleId} className="case-section-title">{title}</h2>
        {aside && <div className="case-aside">{aside}</div>}
      </div>
      {children && <div className="case-section-body">{children}</div>}
    </section>
  );
}

/** Long description beside the problem and the answer. */
export function CaseOverview({
  body,
  problem,
  solution,
  problemLabel = "The problem",
  solutionLabel = "The answer",
}: {
  body: ReactNode;
  problem: ReactNode;
  solution: ReactNode;
  problemLabel?: string;
  solutionLabel?: string;
}) {
  return (
    <div className="case-overview">
      <div className="case-prose">{body}</div>
      <dl className="case-brief">
        <div>
          <dt>{problemLabel}</dt>
          <dd>{problem}</dd>
        </div>
        <div>
          <dt>{solutionLabel}</dt>
          <dd>{solution}</dd>
        </div>
      </dl>
    </div>
  );
}

/* ---------- Media ---------- */

export function CaseFigure({
  src,
  alt,
  dims,
  caption,
  aspect = "16 / 10",
  sizes = "(max-width: 860px) 100vw, 60vw",
  objectPosition = "top",
  surface = "wash",
}: {
  src: string;
  alt: string;
  dims: MediaDimensions;
  caption?: string;
  aspect?: string;
  sizes?: string;
  objectPosition?: "top" | "center";
  /** The surface the figure sits on, so the grout matches it. */
  surface?: CaseSurface | CaseTone;
}) {
  const [open, setOpen] = useState(false);
  const grout = surface === "wash" ? WASH_GROUT : surface === "night" ? TONE_GROUT.night : surface === "tone" ? "rgba(0,0,0,.2)" : TONE_GROUT[surface];
  return (
    <figure className="case-figure">
      <button
        type="button"
        className="case-figure-frame"
        style={{ aspectRatio: aspect }}
        onClick={() => setOpen(true)}
        aria-label={`Expand image: ${alt}`}
        data-cursor-label="Expand"
      >
        <MosaicImage src={src} alt={alt} sizes={sizes} grout={grout} objectPosition={objectPosition} />
      </button>
      {caption && <figcaption>{caption}</figcaption>}
      <AnimatePresence>
        {open && <Lightbox src={src} alt={alt} dims={dims} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </figure>
  );
}

/** Frame for a page's interactive demo. */
export function CaseDemo({ title, note, action, children, className }: { title?: string; note?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`demo${className ? ` ${className}` : ""}`}>
      {(title || action) && (
        <div className="demo-head">
          {title && <p className="demo-title">{title}</p>}
          {action}
        </div>
      )}
      {children}
      {note && <p className="demo-note">{note}</p>}
    </div>
  );
}

/* ---------- Facts, lists and specs ---------- */

export function CaseStats({ items }: { items: { value: string; label: string; detail?: string }[] }) {
  return (
    <dl className="case-stats">
      {items.map((s) => (
        <div key={s.label}>
          <dt>{s.label}</dt>
          <dd className="case-stat-value">{s.value}</dd>
          {s.detail && <dd className="case-stat-detail">{s.detail}</dd>}
        </div>
      ))}
    </dl>
  );
}

export function CaseFeatures({ items, columns = 2 }: { items: ReactNode[]; columns?: 1 | 2 | 3 }) {
  return (
    <ul className="case-features" style={{ "--cols": columns } as React.CSSProperties}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

/** Titled cards in a grid: dashboards, roles, surfaces. */
export function CaseCards({ items, columns = 2 }: { items: { title: ReactNode; body: ReactNode; meta?: ReactNode }[]; columns?: 2 | 3 | 4 }) {
  return (
    <ul className="case-cards" style={{ "--cols": columns } as React.CSSProperties}>
      {items.map((c, i) => (
        <li key={i}>
          {c.meta && <p className="case-card-meta">{c.meta}</p>}
          <h3>{c.title}</h3>
          <div className="case-card-body">{c.body}</div>
        </li>
      ))}
    </ul>
  );
}

export function CaseSpecs({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="case-specs">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseTags({ items, label = "Technologies" }: { items: string[]; label?: string }) {
  return (
    <ul className="case-tags" aria-label={label}>
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}

/** A sequence of stages, e.g. an order pipeline; the current one is highlighted. */
export function CaseSteps({ steps, current, label }: { steps: string[]; current?: number; label: string }) {
  return (
    <ol className="case-steps" aria-label={label}>
      {steps.map((s, i) => (
        <li key={s} data-current={current === i ? "true" : undefined}>
          <span className="case-step-tile" aria-hidden="true" />
          {s}
        </li>
      ))}
    </ol>
  );
}

/* ---------- Ending ---------- */

/** Full-width teaser for the next case study, in that project's colour. */
export function CaseNext({ from, slug }: { from: string; slug: string }) {
  const project = PROJECTS.find((p) => p.slug === slug);
  const content = PROJECT_CONTENT[slug];
  const root = useRef<HTMLAnchorElement>(null);
  const tone = CASE_TONES[slug] ?? "night";

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        root.current!.querySelector(".case-next-title"),
        { "--wdth": 80 },
        { "--wdth": 125, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 25%", scrub: true } },
      );
    },
    { scope: root },
  );

  if (!project || !content) return null;
  return (
    <section className={`case-next tone-${tone}`} aria-label="Next case study">
      <Link
        ref={root}
        href={`/work/${slug}`}
        className="case-next-link"
        data-cursor-label="Open case study"
        onClick={() => trackEvent("project_cta_click", { project: from, action: "next_project" })}
      >
        <span className="case-next-label">Next case study</span>
        <span className="case-next-title">{content.title}</span>
        <span className="case-next-meta"><span>{content.category}</span><span>{project.year}</span></span>
        <span className="case-next-media">
          <MosaicImage src={project.image} alt="" sizes="(max-width: 860px) 100vw, 80vw" grout={TONE_GROUT[tone]} start="top bottom" end="top 20%" />
        </span>
      </Link>
    </section>
  );
}

/** The page's closing call to action, on the shared contact wall. */
export function CaseContact({ slug, title, lede }: { slug: string; title: string; lede: ReactNode }) {
  return <Contact title={title} lede={lede} project={slug} />;
}
