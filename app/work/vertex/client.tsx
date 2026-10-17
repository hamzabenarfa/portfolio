'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  MoveRight,
  MoveLeft,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';
import { ProductFigure, type MediaTheme } from '@/components/fx/media';

const EMAIL = 'contact@benarfa.com';

const INK = '#17161c';
const BLUE = '#2b3cf0';
const PAPER = '#f7f7f4';

const media: MediaTheme = {
  accent: BLUE,
  ink: INK,
  surface: PAPER,
  captionClass: 'text-[#8b8a92]',
};

const sharpFrame = 'rounded-none border border-black/15 bg-white shadow-none hover:shadow-[6px_6px_0_rgba(43,60,240,0.14)]';

interface Layer {
  id: string;
  index: string;
  name: string;
  dirs: string[];
  role: string;
  imports: string;
  never: string;
}

const layers: Layer[] = [
  {
    id: 'presentation',
    index: 'L1',
    name: 'Presentation',
    dirs: ['app/', 'components/', 'hooks/'],
    role: 'App Router pages, UI primitives, and view logic. Everything the user sees lives here — and nothing below knows it exists.',
    imports: 'Application (server actions) and Domain types',
    never: 'Prisma, Stripe, or any infrastructure client',
  },
  {
    id: 'application',
    index: 'L2',
    name: 'Application',
    dirs: ['actions/'],
    role: 'Server actions are the app’s verbs — “add to cart”, “place order”, “create product”. The auth/company slice calls a use-case; the commerce actions query Prisma directly.',
    imports: 'Domain use-cases (auth) or Prisma (commerce)',
    never: 'React components',
  },
  {
    id: 'domain',
    index: 'L3',
    name: 'Domain',
    dirs: ['domain/user/', 'domain/company/'],
    role: 'Entities, repository interfaces (ports), and use-cases — a worked ports-and-adapters example on the user and company (auth) contexts, not across the whole app.',
    imports: 'Its own port interfaces',
    never: 'Presentation or Application code',
  },
  {
    id: 'infrastructure',
    index: 'L4',
    name: 'Infrastructure',
    dirs: ['infra/', 'prisma/', 'lib/'],
    role: 'Prisma, Stripe, and Vercel Blob clients. The auth repositories implement their domain ports here; the commerce actions use Prisma directly.',
    imports: 'Domain ports (auth) it implements',
    never: 'Presentation or Application code',
  },
];

const fileTree = [
  { line: 'app/              ', note: 'presentation' },
  { line: '├─ components/', note: '' },
  { line: 'actions/          ', note: 'server actions → prisma' },
  { line: 'domain/user/      ', note: 'entity · port · use-case' },
  { line: 'domain/company/   ', note: 'DDD worked example' },
  { line: 'infra/            ', note: 'prisma · stripe · blob' },
  { line: '└─ prisma/', note: '' },
];

const surfaces = [
  {
    plate: 'PLATE 01',
    title: 'Storefront',
    copy: 'Catalog with filtering, product detail views, a Zustand-persisted cart and favorites, and real Stripe Checkout with webhook-driven order fulfilment.',
    src: '/vertex-products.webp',
    alt: 'Vertex storefront product catalogue',
    caption: 'Fig. 1 — Storefront catalogue with filtering',
    rows: ['Catalog & filtering', 'Cart & favorites (Zustand)', 'Stripe Checkout + webhooks', 'Order history view'],
  },
  {
    plate: 'PLATE 02',
    title: 'Admin',
    copy: 'A back office for products, categories, and brands — create, edit, and image upload via Vercel Blob — plus read-only order and user lists and a revenue chart.',
    src: '/vertex-product.webp',
    alt: 'Vertex product management view',
    caption: 'Fig. 2 — Product detail & management',
    rows: ['Products, categories & brands', 'Image upload (Vercel Blob)', 'Order & user lists (read-only)', 'Revenue chart'],
  },
];

const bom = [
  { ref: 'A.1', group: 'Framework', items: 'Next.js 15 · React 19 · TypeScript' },
  { ref: 'A.2', group: 'Interface', items: 'Tailwind CSS · shadcn/ui · Zustand' },
  { ref: 'B.1', group: 'Data', items: 'PostgreSQL · Prisma' },
  { ref: 'B.2', group: 'Auth', items: 'Auth.js v5 · Google provider' },
  { ref: 'C.1', group: 'Payments', items: 'Stripe Checkout · webhooks' },
  { ref: 'C.2', group: 'Storage', items: 'Vercel Blob' },
  { ref: 'D.1', group: 'Validation', items: 'Zod (server-side)' },
];

function Cross({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute font-mono text-sm text-[#2b3cf0]/70 ${className}`}>
      +
    </span>
  );
}

function SectionMark({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.22em]">
      <span className="text-[#2b3cf0]">§ {n}</span>
      <span className="text-[#8b8a92]">{label}</span>
    </div>
  );
}

export default function VertexProjectPage() {
  const t = PROJECT_CONTENT.vertex;
  const project = PROJECTS.find((p) => p.slug === 'vertex');
  const nextProject = PROJECTS.find((p) => p.slug === 'kindra');
  const tNext = PROJECT_CONTENT.kindra;
  const [activeLayer, setActiveLayer] = useState<Layer>(layers[2]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#17161c] selection:bg-[#2b3cf0]/15">
      <motion.div className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[#2b3cf0]" style={{ scaleX }} />

      {/* grid-paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(23,22,28,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(23,22,28,0.045) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-black/12 bg-[#f7f7f4]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[#5c5b64] transition hover:text-[#17161c]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Index</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#8b8a92]">
            Vertex <span className="text-[#2b3cf0]">/</span> case file 05
          </span>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 border border-[#17161c] bg-[#17161c] px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[#f7f7f4] transition hover:bg-[#2b3cf0] hover:border-[#2b3cf0]"
            >
              <span className="hidden sm:inline">Live demo</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* ============ Masthead — technical document header ============ */}
        <header className="relative border-x border-black/12 pt-28 lg:pt-32">
          <Cross className="-left-[7px] top-24" />
          <Cross className="-right-[7px] top-24" />

          <div className="border-b border-black/12 px-5 pb-4 sm:px-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-xs uppercase tracking-[0.24em] text-[#8b8a92]"
            >
              {t.category} · Clean Architecture · {project.year}
            </motion.p>
          </div>

          <div className="grid border-b border-black/12 lg:grid-cols-[1.35fr_1fr]">
            <div className="border-black/12 px-5 py-10 sm:px-8 lg:border-r">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 }}
                className="text-[17vw] font-black leading-[0.85] tracking-[-0.05em] sm:text-8xl lg:text-[7.5rem]"
              >
                Vertex<span className="text-[#2b3cf0]">.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="mt-8 max-w-xl text-lg leading-8 text-[#44434c]"
              >
                {t.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href="#architecture"
                  className="group inline-flex items-center justify-center gap-2 bg-[#17161c] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#f7f7f4] transition hover:bg-[#2b3cf0]"
                >
                  § 02 — The architecture
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </a>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-black/20 bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#17161c] transition hover:border-[#2b3cf0] hover:text-[#2b3cf0]"
                  >
                    Live demo
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </motion.div>
            </div>

            {/* spec table */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-end font-mono text-xs"
            >
              {[
                ['PROJECT', 'Vertex — starter kit'],
                ['TYPE', 'E-commerce + admin codebase'],
                ['PATTERN', 'Clean Architecture / DDD'],
                ['LAYERS', '04 — dependencies point inward'],
                ['SURFACES', 'Storefront · Admin dashboard'],
                ['YEAR', project.year],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 border-t border-black/12 px-5 py-3.5 transition-colors hover:bg-[#2b3cf0]/[0.04] sm:px-8 lg:first:border-t-0">
                  <dt className="uppercase tracking-[0.18em] text-[#8b8a92]">{k}</dt>
                  <dd className="text-[#17161c]">{v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </header>

        {/* ============ § 01 Abstract ============ */}
        <section id="overview" className="relative scroll-mt-24 border-x border-black/12">
          <div className="border-b border-black/12 px-5 py-5 sm:px-8">
            <SectionMark n="01" label="Abstract" />
          </div>
          <div className="grid border-b border-black/12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="border-black/12 px-5 py-10 sm:px-8 lg:border-r"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                A foundation that stays clean as it scales.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#44434c]">{t.longDescription}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex flex-col"
            >
              <div className="flex-1 px-5 py-8 sm:px-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#2b3cf0]">Problem</p>
                <p className="mt-3 text-sm leading-7 text-[#44434c]">{t.problem}</p>
              </div>
              <div className="flex-1 border-t border-black/12 px-5 py-8 sm:px-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#2b3cf0]">Response</p>
                <p className="mt-3 text-sm leading-7 text-[#44434c]">{t.solution}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ § 02 Architecture — interactive diagram ============ */}
        <section id="architecture" className="relative scroll-mt-24 border-x border-black/12">
          <Cross className="-left-[7px] -top-[9px]" />
          <Cross className="-right-[7px] -top-[9px]" />
          <div className="border-b border-black/12 px-5 py-5 sm:px-8">
            <SectionMark n="02" label="The architecture — select a layer" />
          </div>

          <div className="border-b border-black/12 px-5 py-10 sm:px-8">
            {/* dependency flow selector */}
            <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-stretch sm:gap-0">
              {layers.map((layer, i) => {
                const active = activeLayer.id === layer.id;
                const arrow =
                  i === 0 || i === 1 ? (
                    <MoveRight className="h-4 w-4 text-[#2b3cf0]" />
                  ) : i === 2 ? (
                    <MoveLeft className="h-4 w-4 text-[#2b3cf0]" />
                  ) : null;
                return (
                  <div key={layer.id} className="contents">
                    <button
                      type="button"
                      onClick={() => setActiveLayer(layer)}
                      aria-pressed={active}
                      className={`flex flex-col items-start gap-1.5 border px-4 py-4 text-left transition sm:justify-between ${
                        active
                          ? 'border-[#2b3cf0] bg-[#2b3cf0] text-white shadow-[6px_6px_0_rgba(43,60,240,0.18)]'
                          : 'border-black/15 bg-white text-[#17161c] hover:border-[#2b3cf0]/60 hover:text-[#2b3cf0]'
                      }`}
                    >
                      <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${active ? 'text-white/70' : 'text-[#8b8a92]'}`}>
                        {layer.index}
                      </span>
                      <span className="text-sm font-bold tracking-tight sm:text-base">{layer.name}</span>
                    </button>
                    {arrow && (
                      <div aria-hidden="true" className="hidden items-center justify-center px-2 sm:flex">
                        {arrow}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-3 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-[#8b8a92] sm:block">
              Arrows = compile-time dependencies. Everything points at the domain; the domain points at nothing.
            </p>

            {/* detail panel */}
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="mt-6 grid border border-black/15 bg-white md:grid-cols-[1.4fr_1fr]"
            >
              <div className="border-black/12 p-6 sm:p-8 md:border-r">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#2b3cf0]">{activeLayer.index}</span>
                  <h3 className="text-2xl font-bold tracking-tight">{activeLayer.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#44434c]">{activeLayer.role}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeLayer.dirs.map((d) => (
                    <code key={d} className="border border-[#2b3cf0]/25 bg-[#2b3cf0]/[0.06] px-2.5 py-1 font-mono text-xs text-[#2b3cf0]">
                      {d}
                    </code>
                  ))}
                </div>
              </div>
              <dl className="font-mono text-xs">
                <div className="border-b border-black/12 p-6 sm:px-8">
                  <dt className="uppercase tracking-[0.18em] text-[#8b8a92]">Imports</dt>
                  <dd className="mt-2 leading-6 text-[#17161c]">{activeLayer.imports}</dd>
                </div>
                <div className="p-6 sm:px-8">
                  <dt className="uppercase tracking-[0.18em] text-[#8b8a92]">Never imports</dt>
                  <dd className="mt-2 leading-6 text-[#17161c]">{activeLayer.never}</dd>
                </div>
              </dl>
            </motion.div>
          </div>

          {/* file tree */}
          <div className="grid border-b border-black/12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="min-w-0 border-black/12 bg-[#17161c] px-5 py-8 text-[#e8e8ef] sm:px-8 lg:border-r"
            >
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#8b8a92]">
                Repository layout
              </p>
              <div className="overflow-x-auto whitespace-pre font-mono text-[13px] leading-7">
                {fileTree.map((row) => (
                  <div key={row.line} className="flex justify-between gap-6">
                    <span>{row.line}</span>
                    {row.note && <span className="shrink-0 text-[#6d7cff]">← {row.note}</span>}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex flex-col justify-center px-5 py-8 sm:px-8"
            >
              <h3 className="text-xl font-bold tracking-tight">Why it&rsquo;s cut this way</h3>
              <p className="mt-4 text-sm leading-7 text-[#44434c]">
                Most starters tangle UI, data access, and vendor calls in the same files, so every change ripples.
                Here the domain is pure TypeScript &mdash; swap Prisma for another ORM, or Stripe for another
                processor, and the change stays inside <code className="font-mono text-xs text-[#2b3cf0]">infra/</code>.
                Business rules never move.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#44434c]">
                In plain terms: &ldquo;Domain-Driven Design&rdquo; just means the business rules live at the centre,
                written in the business&rsquo;s own vocabulary, and everything else plugs into them.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============ § 03 What ships ============ */}
        <section id="surfaces" className="relative scroll-mt-24 border-x border-black/12">
          <div className="border-b border-black/12 px-5 py-5 sm:px-8">
            <SectionMark n="03" label="What ships — two surfaces" />
          </div>

          {surfaces.map((s, i) => (
            <motion.div
              key={s.plate}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className={`grid border-b border-black/12 lg:grid-cols-[1fr_1.25fr] ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="flex flex-col justify-between border-black/12 px-5 py-8 sm:px-8 lg:border-r">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#2b3cf0]">{s.plate}</p>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#44434c]">{s.copy}</p>
                </div>
                <ul className="mt-8 font-mono text-xs">
                  {s.rows.map((row, ri) => (
                    <li key={row} className="flex items-baseline gap-4 border-t border-black/12 py-3 transition-colors hover:bg-[#2b3cf0]/[0.04]">
                      <span className="text-[#8b8a92]">{String(ri + 1).padStart(2, '0')}</span>
                      <span className="uppercase tracking-[0.12em] text-[#17161c]">{row}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`px-5 py-8 sm:px-8 ${i % 2 === 1 ? 'lg:border-r lg:border-black/12' : ''}`}>
                <ProductFigure
                  src={s.src}
                  alt={s.alt}
                  dims={{ width: 1440, height: 900 }}
                  caption={s.caption}
                  theme={media}
                  frameClassName={sharpFrame}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </motion.div>
          ))}
        </section>

        {/* ============ § 04 Bill of materials ============ */}
        <section id="stack" className="relative scroll-mt-24 border-x border-black/12">
          <Cross className="-left-[7px] -top-[9px]" />
          <Cross className="-right-[7px] -top-[9px]" />
          <div className="border-b border-black/12 px-5 py-5 sm:px-8">
            <SectionMark n="04" label="Bill of materials" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            {bom.map((row) => (
              <div
                key={row.ref}
                className="grid grid-cols-[3rem_8rem_1fr] items-baseline gap-4 border-b border-black/12 px-5 py-4 font-mono text-xs transition-colors hover:bg-[#2b3cf0]/[0.04] sm:grid-cols-[4rem_10rem_1fr] sm:px-8"
              >
                <span className="text-[#2b3cf0]">{row.ref}</span>
                <span className="uppercase tracking-[0.18em] text-[#8b8a92]">{row.group}</span>
                <span className="text-sm text-[#17161c]">{row.items}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ============ Footer CTA ============ */}
        <section className="relative border-x border-b border-black/12">
          <div className="bg-[#17161c] px-5 py-12 text-[#f7f7f4] sm:px-8 sm:py-16">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6d7cff]">§ 05 — Work with me</p>
            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Need a codebase that won&rsquo;t rot as it grows?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#b9b8c4]">
              I partner with founders and small teams to ship production software, start to finish. Tell me
              what you&rsquo;re building.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/#contact"
                onClick={() => trackEvent('project_cta_click', { project: 'vertex', action: 'contact' })}
                className="group inline-flex items-center justify-center gap-2 bg-[#2b3cf0] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#f7f7f4] hover:text-[#17161c]"
              >
                Start a project
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </Link>
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => trackEvent('contact_click', { project: 'vertex', method: 'email' })}
                className="inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-white/50 hover:bg-white/[0.06]"
              >
                Email me
              </a>
            </div>

            {nextProject && (
              <div className="mt-10 border-t border-white/15 pt-6">
                <Link
                  href={`/work/${nextProject.slug}`}
                  onClick={() => trackEvent('project_cta_click', { project: 'vertex', action: 'next_project' })}
                  className="group inline-flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#b9b8c4] transition hover:text-white"
                >
                  <span className="text-[#6d7cff]">Next case file</span>
                  <span className="font-bold text-white">{tNext.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </section>

        <footer className="flex items-center justify-between border-x border-b border-black/12 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8b8a92] sm:px-8">
          <span>Vertex — case file 05 / 06</span>
          <span>benarfa.com</span>
        </footer>
        <div className="h-16" />
      </main>
    </div>
  );
}
