'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Maximize2 } from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';
import { Lightbox, ProductFigure, type MediaTheme } from '@/components/fx/media';

const EMAIL = 'contact@benarfa.com';

const media: MediaTheme = {
  accent: '#0a0a0a',
  ink: '#0a0a0a',
  surface: '#ffffff',
  captionClass: 'text-[#8f8b85]',
};

const editorialFrame = 'rounded-none border border-black/15 bg-white shadow-none hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]';

interface CollectionPanel {
  id: 'women' | 'men';
  label: string;
  src: string;
  alt: string;
  note: string;
}

const panels: CollectionPanel[] = [
  {
    id: 'women',
    label: 'Women',
    src: '/kindra-women.webp',
    alt: 'KINDRA women’s storefront',
    note: 'Editorial landing, lookbook galleries',
  },
  {
    id: 'men',
    label: 'Men',
    src: '/kindra-men.webp',
    alt: 'KINDRA men’s storefront',
    note: 'Same design system, its own voice',
  },
];

const mechanics = [
  {
    n: 'I',
    title: 'Routes that come from data',
    copy: 'Collection pages aren’t hand-built — dynamic section and category routes generate every page of the catalogue from data files, so a new collection is a data change, not a development project.',
  },
  {
    n: 'II',
    title: 'Product pages that sell fashion',
    copy: 'Size and colour variants, care instructions, and sticky product navigation — the details a fashion shopper expects, treated as first-class UI rather than an afterthought.',
  },
  {
    n: 'III',
    title: 'The full purchase journey',
    copy: 'Cart, checkout, and payment screens complete the walk from lookbook to order, plus a sign-in / sign-up screen — a static UI walkthrough of the whole flow, built to be wired to a real commerce backend.',
  },
  {
    n: 'IV',
    title: 'A design system underneath',
    copy: 'Radix primitives styled into one coherent shadcn/ui system, animated throughout with Framer Motion. The editorial look is a layer over disciplined component architecture.',
  },
];

/** Hover-expand split panel — the two storefronts as a single editorial spread. */
function SplitCollections() {
  const [hovered, setHovered] = useState<CollectionPanel['id'] | null>(null);
  const [openPanel, setOpenPanel] = useState<CollectionPanel | null>(null);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:h-[560px] sm:flex-row lg:h-[640px]">
        {panels.map((panel) => {
          const isHovered = hovered === panel.id;
          const isShrunk = hovered !== null && !isHovered;
          return (
            <motion.button
              key={panel.id}
              type="button"
              onClick={() => setOpenPanel(panel)}
              onMouseEnter={() => setHovered(panel.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(panel.id)}
              onBlur={() => setHovered(null)}
              animate={{ flexGrow: isHovered ? 1.7 : isShrunk ? 0.75 : 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-h-[320px] flex-1 basis-0 overflow-hidden border border-black/15 text-left sm:min-h-0"
              aria-label={`Expand ${panel.alt}`}
            >
              <Image
                src={panel.src}
                alt={panel.alt}
                fill
                sizes="(max-width: 640px) 100vw, 60vw"
                quality={90}
                className={`object-cover object-top transition duration-700 ${isShrunk ? 'grayscale' : 'grayscale-0'} group-hover:scale-[1.02]`}
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
              <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 sm:p-7">
                <span>
                  <span className="block font-serif text-4xl text-white sm:text-5xl">{panel.label}</span>
                  <span className={`mt-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-white/70 transition-opacity duration-500 ${isShrunk ? 'opacity-0' : 'opacity-100'}`}>
                    {panel.note}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="h-3 w-3" /> View
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
      <p className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[#8f8b85]">
        <span>Fig. 02 — Two storefronts, one codebase</span>
        <span className="hidden sm:inline">Hover to compare · click to expand</span>
      </p>

      <AnimatePresence>
        {openPanel && (
          <Lightbox
            src={openPanel.src}
            alt={openPanel.alt}
            dims={{ width: 1600, height: 1000 }}
            onClose={() => setOpenPanel(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function KindraProjectPage() {
  const t = PROJECT_CONTENT.kindra;
  const project = PROJECTS.find((p) => p.slug === 'kindra');
  const nextProject = PROJECTS.find((p) => p.slug === 'dtalk-ecosystem');
  const tNext = PROJECT_CONTENT['dtalk-ecosystem'];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#fdfdfb] text-[#0a0a0a] selection:bg-black/90 selection:text-white">
      <motion.div className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-black" style={{ scaleX }} />

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-black/12 bg-[#fdfdfb]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6d6a64] transition hover:text-black"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Index</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="font-serif text-lg tracking-[0.08em]">KINDRA</span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-black px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition hover:bg-[#3a3a3a] sm:px-4"
            >
              <span className="hidden sm:inline">Visit store</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </nav>

      <main className="relative">
        {/* ============ Masthead ============ */}
        <header className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-28">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-black py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#6d6a64]">
            <span>Case study N°06</span>
            <span className="hidden sm:inline">{t.category}</span>
            <span>{project.year} — Tunisia</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-black py-4 text-center font-serif text-[19vw] uppercase leading-[0.9] tracking-[0.02em] sm:text-[11.5rem] lg:text-[13.5rem]"
          >
            Kindra
          </motion.h1>

          <div className="grid gap-0 border-b border-black/15 md:grid-cols-[1.2fr_1fr]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="border-black/15 py-7 pr-6 font-serif text-2xl italic leading-snug text-[#2c2a27] sm:text-3xl md:border-r"
            >
              The front-of-house of a fashion brand — a storefront built like a magazine, not a template shop.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col justify-between gap-6 py-7 md:pl-8"
            >
              <p className="text-sm leading-7 text-[#55524c]">{t.description}</p>
              <div className="flex flex-wrap gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-black px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#3a3a3a]"
                  >
                    Open the storefront
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                <a
                  href="#collections"
                  className="inline-flex items-center gap-2 border border-black/25 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:border-black"
                >
                  The collections
                </a>
              </div>
            </motion.div>
          </div>
        </header>

        {/* ============ Full-bleed cover ============ */}
        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f0efec] sm:aspect-[21/9]">
            <Image
              src="/kindra-hero.webp"
              alt="KINDRA landing page hero"
              fill
              sizes="100vw"
              quality={92}
              priority
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mx-auto flex max-w-7xl justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8f8b85] sm:px-6">
            <span>Fig. 01 — The cover</span>
            <span>kindra.benarfa.com</span>
          </figcaption>
        </motion.figure>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* ============ The brief ============ */}
          <section className="grid gap-10 border-t border-black py-16 md:grid-cols-[0.9fr_1.4fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8f8b85]">01 — The brief</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Shoppers judge a fashion brand in seconds.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8"
            >
              <p className="text-lg leading-8 text-[#3b3833] first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.8]">
                {t.longDescription}
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border-t-2 border-black pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8f8b85]">The problem</p>
                  <p className="mt-3 text-sm leading-7 text-[#55524c]">{t.problem}</p>
                </div>
                <div className="border-t-2 border-black pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8f8b85]">The answer</p>
                  <p className="mt-3 text-sm leading-7 text-[#55524c]">{t.solution}</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ============ Collections — split screen ============ */}
          <section id="collections" className="scroll-mt-24 border-t border-black py-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10 flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8f8b85]">02 — The collections</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                  Her side, <span className="italic">his side.</span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#55524c]">
                Two storefronts share one codebase and one design system, but each reads as its own editorial
                world — separate landings, galleries, and collections.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <SplitCollections />
            </motion.div>
          </section>

          {/* ============ In the pages — asymmetric spreads ============ */}
          <section className="border-t border-black py-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8f8b85]">03 — In the pages</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
                From lookbook to checkout.
              </h2>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55 }}
              >
                <ProductFigure
                  src="/kindra-store.webp"
                  alt="KINDRA collection browsing experience"
                  dims={{ width: 1440, height: 900 }}
                  caption="Fig. 03 — Collection pages, generated from data"
                  theme={media}
                  frameClassName={editorialFrame}
                  aspectClassName="aspect-[16/10]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="lg:mt-20"
              >
                <ProductFigure
                  src="/kindra-product.webp"
                  alt="KINDRA product detail page with size and colour variants"
                  dims={{ width: 1200, height: 1500 }}
                  caption="Fig. 04 — Variant-aware product page"
                  theme={media}
                  frameClassName={editorialFrame}
                  aspectClassName="aspect-[4/5]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
              className="mt-10 lg:mx-24"
            >
              <ProductFigure
                src="/kindra-highlights.webp"
                alt="KINDRA editorial homepage — lookbook mosaic and capsule collections"
                dims={{ width: 1440, height: 810 }}
                caption="Fig. 05 — The editorial home: lookbook mosaic & capsule collections"
                theme={media}
                frameClassName={editorialFrame}
                aspectClassName="aspect-[16/9]"
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
            </motion.div>
          </section>

          {/* ============ The mechanics ============ */}
          <section className="border-t border-black py-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8f8b85]">04 — The mechanics</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
                An editorial skin over disciplined structure.
              </h2>
            </motion.div>
            <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
              {mechanics.map((m, i) => (
                <motion.article
                  key={m.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                  className="group relative border-t border-black/20 pt-6 transition-colors hover:border-black"
                >
                  <span className="absolute right-0 top-6 font-serif text-5xl italic text-black/10 transition-colors group-hover:text-black/25">
                    {m.n}
                  </span>
                  <h3 className="max-w-[85%] font-serif text-2xl">{m.title}</h3>
                  <p className="mt-3 max-w-[92%] text-sm leading-7 text-[#55524c]">{m.copy}</p>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ============ Colophon ============ */}
          <section className="border-t border-black py-16">
            <div className="grid gap-10 md:grid-cols-[0.9fr_1.4fr]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8f8b85]">05 — Colophon</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Built with</h2>
              </motion.div>
              <motion.dl
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-mono text-xs"
              >
                {[
                  ['Framework', 'Next.js 15 · React 19 · TypeScript'],
                  ['Interface', 'Tailwind CSS · shadcn/ui · Radix primitives'],
                  ['Motion', 'Framer Motion · marquee & carousel galleries'],
                  ['Forms', 'Controlled inputs · UI only'],
                  ['Typography', 'Custom display faces, self-hosted'],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[8rem_1fr] items-baseline gap-4 border-b border-black/15 py-4 transition-colors hover:bg-black/[0.03] sm:grid-cols-[10rem_1fr]"
                  >
                    <dt className="uppercase tracking-[0.2em] text-[#8f8b85]">{k}</dt>
                    <dd className="text-sm text-[#0a0a0a]">{v}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </section>
        </div>

        {/* ============ CTA ============ */}
        <section className="bg-black text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Back page — work with me</p>
            <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
              Need a storefront that <span className="italic">feels</span> like the brand?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/65">
              I partner with founders and small teams to ship production software, start to finish. Tell me what
              you&rsquo;re building.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/#contact"
                onClick={() => trackEvent('project_cta_click', { project: 'kindra', action: 'contact' })}
                className="group inline-flex items-center justify-center gap-2 bg-white px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-white/85"
              >
                Start a project
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </Link>
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => trackEvent('contact_click', { project: 'kindra', method: 'email' })}
                className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:border-white/60 hover:bg-white/[0.06]"
              >
                Email me
              </a>
            </div>

            {nextProject && (
              <div className="mt-12 border-t border-white/15 pt-6">
                <Link
                  href={`/work/${nextProject.slug}`}
                  onClick={() => trackEvent('project_cta_click', { project: 'kindra', action: 'next_project' })}
                  className="group inline-flex flex-wrap items-center gap-3 text-sm text-white/60 transition hover:text-white"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/40">Next case study</span>
                  <span className="font-serif text-lg italic text-white">{tNext.title}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
