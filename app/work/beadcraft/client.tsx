'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  RefreshCcw,
  Sparkles,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';
import { ProductFigure, type MediaTheme } from '@/components/fx/media';

const EMAIL = 'contact@benarfa.com';

const TERRA = '#b8503a';
const INK = '#2a2320';
const CREAM = '#f8f2e7';

const media: MediaTheme = {
  accent: TERRA,
  ink: INK,
  surface: CREAM,
  captionClass: 'text-[#9a8f86]',
};

const warmFrame = 'rounded-[1.5rem] border border-[#2a2320]/12 bg-white shadow-md shadow-[#2a2320]/5 hover:shadow-xl hover:shadow-[#2a2320]/10';

/* ---------- Interactive strand builder ---------- */

interface Palette {
  id: string;
  name: string;
  place: string;
  colors: string[];
}

const palettes: Palette[] = [
  {
    id: 'medina',
    name: 'Medina',
    place: 'Tunis — terracotta & brass',
    colors: ['#b8503a', '#c98a3a', '#f1e3cb', '#2f3e6b', '#8a5a44'],
  },
  {
    id: 'sahara',
    name: 'Sahara',
    place: 'Douz — sand & dusk',
    colors: ['#d9a05b', '#b97742', '#f5efe2', '#7fa7c4', '#6e4a2f'],
  },
  {
    id: 'sidibou',
    name: 'Sidi Bou',
    place: 'Sidi Bou Saïd — white & blue',
    colors: ['#f7f4ee', '#2b6cb0', '#1e3a5f', '#9cc3e5', '#c8b78e'],
  },
];

const BEAD_COUNT = 11;
/* Gentle arch — vertical offset per bead, in px. */
const ARC = [0, 10, 18, 24, 28, 30, 28, 24, 18, 10, 0];

function beadStyle(color: string): React.CSSProperties {
  return {
    background: `radial-gradient(circle at 32% 30%, #ffffffcc 0%, ${color} 42%, ${color} 100%)`,
    boxShadow: 'inset -2px -3px 6px rgba(0,0,0,0.25), 0 3px 6px rgba(42,35,32,0.25)',
  };
}

/**
 * A miniature of the real product: pick a collection, tap beads to restring
 * them, and the strand updates live — the same feel as the configurator.
 */
function StrandBuilder() {
  const [paletteId, setPaletteId] = useState<string>(palettes[0].id);
  const [beads, setBeads] = useState<number[]>(() =>
    Array.from({ length: BEAD_COUNT }, (_, i) => i % palettes[0].colors.length),
  );

  const palette = palettes.find((p) => p.id === paletteId) ?? palettes[0];

  const cycleBead = (index: number) => {
    setBeads((prev) =>
      prev.map((c, i) => (i === index ? (c + 1) % palette.colors.length : c)),
    );
  };

  const restring = () => {
    setBeads((prev) => prev.map((_, i) => (i * 2 + Math.floor(Math.random() * palette.colors.length)) % palette.colors.length));
  };

  return (
    <div className="rounded-[1.75rem] border border-[#2a2320]/12 bg-white p-6 shadow-lg shadow-[#2a2320]/5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#9a8f86]">
          String your own — tap a bead
        </p>
        <button
          type="button"
          onClick={restring}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2320]/15 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#5b524c] transition hover:border-[#b8503a]/50 hover:text-[#b8503a]"
        >
          <RefreshCcw className="h-3 w-3" /> Restring
        </button>
      </div>

      {/* the strand */}
      <div className="relative mt-8 pb-6">
        <svg
          aria-hidden="true"
          viewBox="0 0 440 60"
          preserveAspectRatio="none"
          className="absolute inset-x-2 top-[14px] h-[42px] w-[calc(100%-16px)]"
        >
          <path d="M0 6 Q 220 66 440 6" fill="none" stroke="#8a5a44" strokeWidth="2" strokeDasharray="1 3" />
        </svg>
        <div className="relative flex items-start justify-between px-1">
          {beads.map((colorIndex, i) => {
            const color = palette.colors[colorIndex % palette.colors.length];
            return (
              <button
                key={i}
                type="button"
                onClick={() => cycleBead(i)}
                aria-label={`Bead ${i + 1} — tap to change colour`}
                style={{ transform: `translateY(${ARC[i]}px)` }}
                className="group rounded-full p-0.5 transition-transform hover:scale-110 focus-visible:scale-110 active:scale-95"
              >
                <motion.span
                  key={`${paletteId}-${colorIndex}`}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                  className="block h-6 w-6 rounded-full sm:h-8 sm:w-8"
                  style={beadStyle(color)}
                />
              </button>
            );
          })}
        </div>
        {/* charm */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[52px] h-4 w-3 -translate-x-1/2 rounded-b-full border border-[#8a5a44]/50 bg-gradient-to-b from-[#e2c477] to-[#b98a3a] shadow-sm sm:top-[58px]"
        />
      </div>

      {/* collection picker */}
      <div className="mt-8 grid gap-2 sm:grid-cols-3">
        {palettes.map((p) => {
          const active = p.id === paletteId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPaletteId(p.id)}
              aria-pressed={active}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                active
                  ? 'border-[#b8503a] bg-[#b8503a]/[0.06]'
                  : 'border-[#2a2320]/12 hover:border-[#2a2320]/30'
              }`}
            >
              <span className="flex items-center justify-between">
                <span className={`font-serif text-lg ${active ? 'text-[#b8503a]' : 'text-[#2a2320]'}`}>{p.name}</span>
                <span className="flex -space-x-1.5">
                  {p.colors.slice(0, 4).map((c) => (
                    <span key={c} className="h-3.5 w-3.5 rounded-full border border-white" style={{ backgroundColor: c }} />
                  ))}
                </span>
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-[#9a8f86]">{p.place}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#b5aa9e]">
        A sketch of the real thing — the live configurator strings full designs with cords, charms &amp; sharing.
      </p>
    </div>
  );
}

/* ---------- Page ---------- */

const pipeline = ['New', 'Confirmed', 'In Production', 'Shipped', 'Delivered'];

const dashboardCards = [
  { title: 'Inventory', copy: 'A bead inventory grid with low-stock flags, so the maker never promises what she can’t string.' },
  { title: 'Orders', copy: 'Each custom design becomes a tracked production job moving through five stages.' },
  { title: 'Collections', copy: 'Beads and ready-made designs are grouped into named collections the maker curates herself.' },
  { title: 'Overview', copy: 'Revenue, orders, average order value, and top beads — the business at a glance.' },
];

const postcards = [
  { src: '/beadcraft-collection-medina.webp', alt: 'Medina collection beads', label: 'Medina', rotate: '-rotate-2' },
  { src: '/beadcraft-designs.webp', alt: 'Ready-made bracelet designs', label: 'Ready-made designs', rotate: 'rotate-1' },
  { src: '/beadcraft-collection-sahara.webp', alt: 'Sahara collection beads', label: 'Sahara', rotate: '-rotate-1' },
];

export default function BeadCraftProjectPage() {
  const t = PROJECT_CONTENT.beadcraft;
  const project = PROJECTS.find((p) => p.slug === 'beadcraft');
  const nextProject = PROJECTS.find((p) => p.slug === 'menu-qr');
  const tNext = PROJECT_CONTENT['menu-qr'];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#f8f2e7] text-[#2a2320] selection:bg-[#b8503a]/20">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#b8503a] via-[#c98a3a] to-[#2f3e6b]"
        style={{ scaleX }}
      />

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-[#2a2320]/10 bg-[#f8f2e7]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7a6f67] transition hover:text-[#2a2320]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Index</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="font-serif text-lg italic text-[#7a6f67]">Bead·Craft</span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-[#b8503a] px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#f8f2e7] transition hover:bg-[#a8472f] sm:px-4"
            >
              <span className="hidden sm:inline">Live site</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </nav>

      <main className="relative">
        {/* ============ Hero ============ */}
        <header className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="rounded-full border border-[#b8503a]/30 bg-[#b8503a]/8 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#a8472f]">
                  {t.category}
                </span>
                <span className="font-serif text-sm italic text-[#7a6f67]">Handcrafted in Tunis · بيد كرافت</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="mt-7 font-serif text-6xl leading-[1.0] tracking-tight sm:text-8xl"
              >
                One bracelet,
                <br />
                <span className="italic text-[#b8503a]">your story.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-[#5b524c]"
              >
                {t.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href="#configurator"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#b8503a] px-6 py-3 text-sm font-semibold text-[#f8f2e7] transition hover:bg-[#a8472f]"
                >
                  String your own
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2a2320]/20 bg-white/50 px-6 py-3 text-sm font-semibold text-[#2a2320] transition hover:border-[#b8503a]/40 hover:bg-white"
                  >
                    Live site
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            </div>

            {/* arched artisan frame */}
            <motion.figure
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="overflow-hidden rounded-t-[12rem] rounded-b-[1.5rem] border border-[#2a2320]/12 bg-white p-2.5 shadow-2xl shadow-[#2a2320]/10">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[11rem] rounded-b-[1rem] bg-[#f1e9da]">
                  <Image
                    src="/beadcraft-hero.webp"
                    alt="BeadCraft Studio storefront"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top"
                    priority
                    quality={92}
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center font-serif text-sm italic text-[#9a8f86]">
                craft.benarfa.com — the storefront
              </figcaption>
            </motion.figure>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-[#2a2320]/10 py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a6f67]">
            {['Handcrafted in Tunis', 'Made to order', 'Ships in 3–5 days', '24 governorates'].map((x) => (
              <span key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b8503a]" /> {x}
              </span>
            ))}
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* ============ 01 Overview ============ */}
          <section className="grid gap-10 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a8472f]">01 — {t.subtitle}</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                Turning a maker&rsquo;s craft into a product.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#5b524c]">{t.longDescription}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="rounded-[1.5rem] border border-dashed border-[#2a2320]/25 bg-white/60 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9a8f86]">The problem</p>
                <p className="mt-3 text-sm leading-7 text-[#6b615a]">{t.problem}</p>
              </div>
              <div className="rounded-[1.5rem] border border-dashed border-[#b8503a]/40 bg-[#b8503a]/[0.05] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a8472f]">The answer</p>
                <p className="mt-3 text-sm leading-7 text-[#6b615a]">{t.solution}</p>
              </div>
            </motion.div>
          </section>

          {/* ============ 02 Configurator ============ */}
          <section id="configurator" className="scroll-mt-28 border-t border-[#2a2320]/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10 flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a8472f]">02 — The centrepiece</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                  Tactile, not technical.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#6b615a]">
                Customers build their bracelet bead by bead with a live preview — every choice updates a Zustand
                store, and finished designs can be saved and shared by link.
              </p>
            </motion.div>

            <div className="grid items-start gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55 }}
              >
                <StrandBuilder />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <ProductFigure
                  src="/beadcraft-configurator.webp"
                  alt="BeadCraft bracelet configurator"
                  dims={{ width: 1440, height: 900 }}
                  caption="The real configurator — curved, flat, or grid layouts with live pricing"
                  theme={media}
                  frameClassName={warmFrame}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    'Live 2D preview',
                    'Shareable designs',
                    'EN / FR storefront',
                    'No duplicate orders',
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-3 rounded-2xl border border-[#2a2320]/12 bg-white/60 px-4 py-3 text-sm text-[#5b524c] transition-colors hover:bg-white">
                      <Sparkles className="h-4 w-4 shrink-0 text-[#b8503a]" /> {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ============ 03 Collections — postcards ============ */}
          <section className="border-t border-[#2a2320]/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a8472f]">03 — A palette rooted in place</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                Collections &amp; designs
              </h2>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-3">
              {postcards.map((card, i) => (
                <motion.div
                  key={card.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                  className={`${card.rotate} transition-transform duration-500 hover:rotate-0 ${i === 1 ? 'sm:mt-10' : ''}`}
                >
                  <div className="bg-white p-3 pb-4 shadow-xl shadow-[#2a2320]/10">
                    <ProductFigure
                      src={card.src}
                      alt={card.alt}
                      dims={{ width: 1200, height: 1500 }}
                      theme={media}
                      frameClassName="rounded-none border border-[#2a2320]/8 bg-[#f1e9da]"
                      aspectClassName="aspect-[4/5]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <p className="mt-3 text-center font-serif text-lg italic text-[#5b524c]">{card.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-lg italic text-[#7a6f67]">
              Collection names and bead colours are drawn from Tunisian places and motifs — Medina, Sahara,
              Sidi Bou — so the catalogue reads as local, not generic.
            </p>
          </section>

          {/* ============ 04 Crafter dashboard ============ */}
          <section className="border-t border-[#2a2320]/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a8472f]">04 — Behind the counter</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                The crafter&rsquo;s dashboard
              </h2>
            </motion.div>

            {/* order thread — knots on a cord */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-8 rounded-[1.5rem] border border-[#2a2320]/12 bg-white/70 px-6 py-7 sm:px-8"
            >
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9a8f86]">
                Every order is a production job on a thread
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-0">
                {pipeline.map((stage, i) => (
                  <div key={stage} className="flex items-center sm:flex-1">
                    <div className="group flex items-center gap-3">
                      <span
                        className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 transition ${
                          i === 0
                            ? 'border-[#b8503a] bg-[#b8503a]'
                            : i === pipeline.length - 1
                              ? 'border-[#2f3e6b] bg-[#2f3e6b]'
                              : 'border-[#8a5a44] bg-white group-hover:bg-[#8a5a44]'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.12em] text-[#5b524c]">
                        {stage}
                      </span>
                    </div>
                    {i < pipeline.length - 1 && (
                      <span aria-hidden="true" className="mx-3 hidden flex-1 border-t-2 border-dashed border-[#8a5a44]/40 sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              <div className="grid content-start gap-4 sm:grid-cols-2">
                {dashboardCards.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                    className="rounded-[1.5rem] border border-[#2a2320]/12 bg-white/70 p-6 transition hover:-translate-y-1 hover:bg-white"
                  >
                    <h3 className="font-serif text-xl text-[#2a2320]">{c.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6b615a]">{c.copy}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
              >
                <ProductFigure
                  src="/beadcraft-maker.webp"
                  alt="BeadCraft crafter dashboard"
                  dims={{ width: 1440, height: 900 }}
                  caption="The maker side — inventory, orders, and KPIs"
                  theme={media}
                  frameClassName={warmFrame}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </motion.div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.keyFeatures.map((feat) => (
                <div key={feat} className="flex items-start gap-3 rounded-2xl border border-[#2a2320]/12 bg-white/50 p-4 transition-colors hover:bg-white/80">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8503a]" />
                  <span className="text-sm leading-6 text-[#5b524c]">{feat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ============ 05 Materials ============ */}
          <section className="border-t border-[#2a2320]/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a8472f]">05 — Materials</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">What it&rsquo;s made of</h2>
            </motion.div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: 'Two', label: 'Surfaces', detail: 'Storefront + crafter dashboard' },
                { value: 'EN / FR', label: 'Languages', detail: 'Bilingual, TND pricing' },
                { value: '24', label: 'Wilayas', detail: 'Nationwide delivery, all governorates' },
              ].map((s) => (
                <div key={s.label} className="rounded-[1.5rem] border border-[#2a2320]/12 bg-white/60 p-6 transition-colors hover:bg-white">
                  <div className="font-serif text-4xl text-[#b8503a]">{s.value}</div>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9a8f86]">{s.label}</div>
                  <div className="mt-1 text-sm text-[#6b615a]">{s.detail}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#2a2320]/12 bg-white/70 font-mono text-xs">
              {[
                ['Framework', 'Next.js 16 Server Components · React 19 · TypeScript'],
                ['Interaction', 'Zustand — the configurator’s live state'],
                ['Data', 'PostgreSQL · Prisma 7 · strict Zod schemas at every boundary'],
                ['Integrity', 'Idempotent checkout · optimistic-locked order transitions'],
                ['Runtime', 'Bun · Tailwind v4'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-[#2a2320]/10 px-5 py-4 transition-colors last:border-b-0 hover:bg-white sm:grid-cols-[9rem_1fr] sm:px-7">
                  <span className="uppercase tracking-[0.18em] text-[#9a8f86]">{k}</span>
                  <span className="text-sm text-[#3c342e]">{v}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ============ CTA ============ */}
        <section className="border-t border-[#2a2320]/10 bg-gradient-to-br from-white to-[#f1e9da]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#a8472f]">Made to order — like the bracelets</p>
            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight tracking-tight text-[#2a2320] sm:text-5xl">
              Have a craft that deserves a real product?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5b524c]">
              I partner with founders and small teams to ship production software, start to finish. Tell me what
              you&rsquo;re building.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/#contact"
                onClick={() => trackEvent('project_cta_click', { project: 'beadcraft', action: 'contact' })}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#b8503a] px-6 py-3 text-sm font-bold text-[#f8f2e7] transition hover:bg-[#a8472f]"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => trackEvent('contact_click', { project: 'beadcraft', method: 'email' })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2a2320]/20 bg-white/70 px-6 py-3 text-sm font-semibold text-[#2a2320] transition hover:bg-white"
              >
                Email me
              </a>
            </div>

            {nextProject && (
              <div className="mt-12 border-t border-[#2a2320]/12 pt-6">
                <Link
                  href={`/work/${nextProject.slug}`}
                  onClick={() => trackEvent('project_cta_click', { project: 'beadcraft', action: 'next_project' })}
                  className="group inline-flex flex-wrap items-center gap-3 text-sm text-[#7a6f67] transition hover:text-[#2a2320]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#9a8f86]">Next case study</span>
                  <span className="font-serif text-lg italic text-[#2a2320]">{tNext.title}</span>
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
