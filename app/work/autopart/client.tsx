'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Maximize2,
  PhoneCall,
  Search,
  Truck,
  Wallet,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';
import { Lightbox, ProductFigure, type MediaTheme } from '@/components/fx/media';

const EMAIL = 'contact@benarfa.com';

const ORANGE = '#ff6a2b';

const media: MediaTheme = {
  accent: ORANGE,
  ink: '#06080c',
  surface: '#0c0e12',
  captionClass: 'text-[#828a97]',
  trackColor: 'rgba(255,255,255,0.12)',
};

const steelFrame = 'rounded-md border border-white/12 bg-[#11141a] hover:border-[#ff6a2b]/50';

const hazard = {
  background: `repeating-linear-gradient(135deg, ${ORANGE} 0 14px, #0c0e12 14px 28px)`,
};

interface OrderState {
  id: string;
  label: string;
  tone: 'idle' | 'ok' | 'fail';
  headline: string;
  copy: string;
}

const orderStates: OrderState[] = [
  {
    id: 'awaiting',
    label: 'AWAITING_DEPOSIT',
    tone: 'idle',
    headline: 'Order locked, deposit pending',
    copy: 'The order reserves the part and waits for the 20% deposit. A reminder fires 3–4 hours before the deadline, and the buyer uploads a deposit proof photo straight from their phone.',
  },
  {
    id: 'confirmed',
    label: 'CONFIRMED',
    tone: 'ok',
    headline: 'Deposit cleared, stock verified by a human',
    copy: 'An operator phones the supplier and confirms the part is genuinely on the shelf before anything ships. Only then does fulfilment start — the remaining 80% is paid cash on delivery.',
  },
  {
    id: 'failed',
    label: 'FAILED_REJECTED',
    tone: 'fail',
    headline: 'Deadline passed, stock released',
    copy: 'A deposit-deadline cron expires unpaid orders automatically, so reserved inventory never gets stuck behind a buyer who walked away.',
  },
];

const flow = [
  { n: '01', title: 'Find the part', copy: 'Pick make, model, and engine — or full-text search the catalogue through Meilisearch.', icon: Search },
  { n: '02', title: 'Pay 20% deposit', copy: 'The deposit locks the order in. No deposit by the deadline, no reservation.', icon: Wallet },
  { n: '03', title: 'We call the supplier', copy: 'A real person confirms real stock before a single dinar of the balance is committed.', icon: PhoneCall },
  { n: '04', title: 'Cash on delivery', copy: 'The part ships and the remaining 80% is paid on the doorstep.', icon: Truck },
];

const surfaces = [
  {
    tag: 'BAY 01',
    title: 'Customer',
    copy: 'Vehicle-fit catalogue, part search, garage, manual deposit submission with proof upload, and order tracking — French and mobile-first.',
    points: ['Vehicle finder', 'Part search', 'Deposit submission'],
  },
  {
    tag: 'BAY 02',
    title: 'Admin',
    copy: 'A call queue for human stock verification, deposit review, and the full order lifecycle.',
    points: ['Call queue', 'Deposit review', 'Order ops'],
  },
  {
    tag: 'BAY 03',
    title: 'Supplier',
    copy: 'Inventory management, shipping, and payout tracking for verified parts vendors.',
    points: ['Inventory', 'Shipping', 'Payouts'],
  },
];

interface CatalogueTile {
  src: string;
  label: string;
  alt: string;
}

const catalogueWall: CatalogueTile[] = [
  { src: '/autopart-moteur.webp', label: 'Moteur', alt: 'Engine parts category' },
  { src: '/autopart-freinage.webp', label: 'Freinage', alt: 'Braking parts category' },
  { src: '/autopart-suspension.webp', label: 'Suspension', alt: 'Suspension parts category' },
  { src: '/autopart-electricite.webp', label: 'Électricité', alt: 'Electrical parts category' },
  { src: '/autopart-injecteur.webp', label: 'Injecteurs', alt: 'Injector parts listing' },
  { src: '/autopart-plaquettes.webp', label: 'Plaquettes', alt: 'Brake pads listing' },
];

function toneClasses(tone: OrderState['tone'], active: boolean): string {
  if (!active) return 'border-white/12 bg-[#11141a] text-[#828a97] hover:border-white/30 hover:text-white';
  if (tone === 'ok') return 'border-emerald-400/60 bg-emerald-400/10 text-emerald-300';
  if (tone === 'fail') return 'border-red-400/60 bg-red-400/10 text-red-300';
  return 'border-[#ff6a2b]/70 bg-[#ff6a2b]/10 text-[#ffa273]';
}

function toneDot(tone: OrderState['tone']): string {
  if (tone === 'ok') return 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]';
  if (tone === 'fail') return 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]';
  return 'bg-[#ff6a2b] shadow-[0_0_10px_rgba(255,106,43,0.9)]';
}

/** Diagnostic-console view of the deposit order engine. */
function OrderEngine() {
  const [active, setActive] = useState<OrderState>(orderStates[0]);

  return (
    <div className="overflow-hidden rounded-lg border border-white/12 bg-[#0f1217]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#828a97]">
          Order engine — diagnostic
        </span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ff6a2b]" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
      </div>
      <div className="grid md:grid-cols-[minmax(15rem,0.9fr)_1.6fr]">
        <div className="flex flex-col gap-2 border-b border-white/10 p-4 md:border-b-0 md:border-r">
          {orderStates.map((state) => {
            const isActive = active.id === state.id;
            return (
              <button
                key={state.id}
                type="button"
                onClick={() => setActive(state)}
                aria-pressed={isActive}
                className={`flex items-center gap-3 rounded-md border px-4 py-3.5 text-left font-mono text-xs tracking-[0.06em] transition ${toneClasses(state.tone, isActive)}`}
              >
                <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${isActive ? toneDot(state.tone) : 'bg-white/25'}`} />
                {state.label}
              </button>
            );
          })}
          <p className="mt-2 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5b626e]">
            cron: reminders + auto-expiry
          </p>
        </div>
        <motion.div
          key={active.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="p-6 sm:p-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#828a97]">state readout</p>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">{active.headline}</h3>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[#9aa1ad]">{active.copy}</p>
        </motion.div>
      </div>
    </div>
  );
}

/** Hover-zoom mosaic of real catalogue captures, each expandable. */
function CatalogueWall() {
  const [open, setOpen] = useState<CatalogueTile | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {catalogueWall.map((tile, i) => (
          <motion.button
            key={tile.src}
            type="button"
            onClick={() => setOpen(tile)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
            aria-label={`Expand ${tile.alt}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-md border border-white/12 bg-[#11141a] text-left transition hover:border-[#ff6a2b]/60"
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              quality={88}
              className="object-cover object-top transition duration-500 group-hover:scale-[1.05]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06080c]/85 via-transparent to-transparent" />
            <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white">
                <span className="mr-2 text-[#ff6a2b]">{String(i + 1).padStart(2, '0')}</span>
                {tile.label}
              </span>
              <span className="inline-flex items-center gap-1 rounded-sm bg-[#ff6a2b] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#06080c] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="h-3 w-3" /> View
              </span>
            </span>
          </motion.button>
        ))}
      </div>
      <p className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#5b626e]">
        <span>Catalogue — real captures, fit-filtered per vehicle</span>
        <span className="hidden sm:inline">Click to inspect</span>
      </p>

      <AnimatePresence>
        {open && (
          <Lightbox src={open.src} alt={open.alt} dims={{ width: 1440, height: 900 }} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AutoPartProjectPage() {
  const t = PROJECT_CONTENT.autopart;
  const project = PROJECTS.find((p) => p.slug === 'autopart');
  const nextProject = PROJECTS.find((p) => p.slug === 'beadcraft');
  const tNext = PROJECT_CONTENT.beadcraft;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e9eaee] selection:bg-[#ff6a2b]/40">
      <motion.div className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#ff6a2b]" style={{ scaleX }} />

      {/* workshop atmosphere */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 right-0 h-[34rem] w-[34rem] rounded-full bg-[#ff6a2b]/8 blur-3xl" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'linear-gradient(to bottom, black, transparent 70%)',
          }}
        />
      </div>

      <nav className="fixed inset-x-0 top-1 z-40 border-b border-white/8 bg-[#0c0e12]/85 backdrop-blur-2xl">
        <div className="h-1.5 w-full opacity-90" style={hazard} aria-hidden="true" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#828a97] transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Index</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#828a97]">
            AutoParts <span className="text-[#ff6a2b]">/</span> Tunisia
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-sm bg-[#ff6a2b] px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#06080c] transition hover:bg-[#ff8552] sm:px-4"
            >
              <span className="hidden sm:inline">Live site</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* ============ Hero ============ */}
        <header className="pt-32 lg:pt-36">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#ff6a2b]"
          >
            {t.category} · parts.benarfa.com · {project.year}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 text-[13.5vw] font-black uppercase leading-[0.84] tracking-[-0.035em] text-white sm:text-8xl lg:text-[8.5rem]"
          >
            Real parts.
            <br />
            <span className="text-[#ff6a2b]">Real stock.</span>
          </motion.h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="max-w-xl text-lg leading-8 text-[#9aa1ad]"
            >
              {t.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-col gap-3 sm:flex-row lg:justify-end"
            >
              <a
                href="#engine"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff6a2b] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#06080c] transition hover:bg-[#ff8552]"
              >
                Open the order engine
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </a>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 bg-white/[0.03] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#ff6a2b]/60"
                >
                  Live site
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </motion.div>
          </div>

          {/* hero capture with viewfinder brackets */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative mt-14"
          >
            <span aria-hidden="true" className="absolute -left-2 -top-2 z-10 h-6 w-6 border-l-2 border-t-2 border-[#ff6a2b]" />
            <span aria-hidden="true" className="absolute -right-2 -top-2 z-10 h-6 w-6 border-r-2 border-t-2 border-[#ff6a2b]" />
            <span aria-hidden="true" className="absolute -bottom-2 -left-2 z-10 h-6 w-6 border-b-2 border-l-2 border-[#ff6a2b]" />
            <span aria-hidden="true" className="absolute -bottom-2 -right-2 z-10 h-6 w-6 border-b-2 border-r-2 border-[#ff6a2b]" />
            <ProductFigure
              src={project.image || '/autopart.webp'}
              alt="AutoParts Tunisia storefront"
              dims={{ width: 1440, height: 900 }}
              theme={media}
              frameClassName={steelFrame}
              aspectClassName="aspect-[16/8]"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* spec strip */}
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
            {[
              { value: '03', label: 'Surfaces', detail: 'Customer · Admin · Supplier' },
              { value: '20%', label: 'Deposit', detail: 'Balance cash on delivery' },
              { value: '1 call', label: 'Verification', detail: 'Human stock check, every order' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-4 bg-[#0f1217] px-6 py-5 transition-colors hover:bg-[#12161d]">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#828a97]">{s.label}</div>
                  <div className="mt-1.5 text-sm text-[#9aa1ad]">{s.detail}</div>
                </div>
                <div className="font-mono text-3xl font-black text-[#ff6a2b]">{s.value}</div>
              </div>
            ))}
          </div>
        </header>

        {/* ============ 01 Why ============ */}
        <section className="mt-24 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#ff6a2b]">01 — The problem</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trust, engineered into the order itself.
            </h2>
            <p className="mt-6 text-base leading-8 text-[#9aa1ad]">{t.longDescription}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="rounded-md border border-white/12 bg-[#0f1217] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-400/90">Fault report</p>
              <p className="mt-3 text-sm leading-7 text-[#9aa1ad]">{t.problem}</p>
            </div>
            <div className="rounded-md border border-[#ff6a2b]/30 bg-[#ff6a2b]/[0.05] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#ffa273]">The fix</p>
              <p className="mt-3 text-sm leading-7 text-[#c3c8d1]">{t.solution}</p>
            </div>
          </motion.div>
        </section>

        {/* ============ 02 Order flow ============ */}
        <section className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#ff6a2b]">02 — Job card</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">How an order works</h2>
            </div>
          </motion.div>
          <div className="overflow-hidden rounded-md border border-white/12">
            {flow.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.n}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group grid grid-cols-[3.5rem_1fr] items-center gap-4 border-b border-white/10 bg-[#0f1217] px-5 py-5 transition-colors last:border-b-0 hover:bg-[#12161d] sm:grid-cols-[4rem_3rem_16rem_1fr] sm:px-8"
                >
                  <span className="font-mono text-2xl font-black text-white/15 transition-colors group-hover:text-[#ff6a2b]">{f.n}</span>
                  <span className="hidden text-[#ffa273] sm:block"><Icon className="h-5 w-5" /></span>
                  <h3 className="text-base font-bold text-white">{f.title}</h3>
                  <p className="col-span-2 text-sm leading-6 text-[#9aa1ad] sm:col-span-1">{f.copy}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ============ 03 Order engine — signature ============ */}
        <section id="engine" className="mt-24 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#ff6a2b]">03 — The hard part</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Deposit order engine</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#9aa1ad]">
              Every order is a small state machine. Select a state to read what the system does — and what it
              refuses to do — at each step.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <OrderEngine />
          </motion.div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.keyFeatures.map((feat, i) => (
              <div key={feat} className="flex items-start gap-3 rounded-md border border-white/10 bg-[#0f1217] p-4 transition-colors hover:border-white/25">
                <span className="mt-0.5 font-mono text-[10px] text-[#ff6a2b]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm leading-6 text-[#c3c8d1]">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============ 04 Three bays ============ */}
        <section className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#ff6a2b]">04 — One workshop, three bays</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Three-sided platform</h2>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-3">
            {surfaces.map((s, i) => (
              <motion.div
                key={s.tag}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-md border border-white/12 bg-[#0f1217] p-6 transition hover:border-[#ff6a2b]/50"
              >
                <div className="absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity group-hover:opacity-90" style={hazard} aria-hidden="true" />
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#828a97]">{s.tag}</p>
                <h3 className="mt-3 text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#9aa1ad]">{s.copy}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <span key={p} className="rounded-sm border border-white/12 bg-[#0c0e12] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#c3c8d1]">
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ 05 Catalogue wall ============ */}
        <section className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#ff6a2b]">05 — On the shelves</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">The catalogue wall</h2>
          </motion.div>
          <CatalogueWall />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <ProductFigure
              src="/autopart-catalogue.webp"
              alt="AutoParts category catalogue with live counts"
              dims={{ width: 1440, height: 900 }}
              caption="Catalogue — verified categories with live counts"
              theme={media}
              frameClassName={steelFrame}
            />
            <ProductFigure
              src="/autopart-marques.webp"
              alt="AutoParts brand index"
              dims={{ width: 1440, height: 900 }}
              caption="Brands — the supplier-verified marque index"
              theme={media}
              frameClassName={steelFrame}
            />
          </div>
        </section>

        {/* ============ 06 Stack ============ */}
        <section className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#ff6a2b]">06 — Tools on the wall</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Technology stack</h2>
          </motion.div>
          <div className="overflow-hidden rounded-md border border-white/12 font-mono text-xs">
            {[
              ['T.1', 'Framework', 'Next.js 16 · React 19 · TypeScript · Tailwind v4'],
              ['T.2', 'Data', 'Prisma 7 · Neon Postgres · Redis'],
              ['T.3', 'Search', 'Meilisearch — typo-tolerant full-text part search'],
              ['T.4', 'Media', 'Cloudflare R2 — deposit proofs & used-part photos'],
              ['T.5', 'Auth', 'Auth.js — magic link · Google · password'],
              ['T.6', 'Tooling', 'Bun · Biome · Docker for local services'],
            ].map(([ref, group, items]) => (
              <div
                key={ref}
                className="grid grid-cols-[3rem_7rem_1fr] items-baseline gap-4 border-b border-white/10 bg-[#0f1217] px-5 py-4 transition-colors last:border-b-0 hover:bg-[#12161d] sm:grid-cols-[4rem_9rem_1fr] sm:px-8"
              >
                <span className="text-[#ff6a2b]">{ref}</span>
                <span className="uppercase tracking-[0.18em] text-[#828a97]">{group}</span>
                <span className="text-sm text-[#e9eaee]">{items}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="my-24 overflow-hidden rounded-md border border-white/12">
          <div className="h-1.5 w-full" style={hazard} aria-hidden="true" />
          <div className="relative bg-[#0f1217] p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#ff6a2b]/15 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#ffa273]">Work order — open</p>
              <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Need a marketplace people can actually trust?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#9aa1ad]">
                I partner with founders and small teams to ship production software, start to finish. Tell me
                what you&rsquo;re building.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/#contact"
                  onClick={() => trackEvent('project_cta_click', { project: 'autopart', action: 'contact' })}
                  className="group inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff6a2b] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#06080c] transition hover:bg-[#ff8552]"
                >
                  Start a project
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </Link>
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={() => trackEvent('contact_click', { project: 'autopart', method: 'email' })}
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-white/40 hover:bg-white/[0.05]"
                >
                  Email me
                </a>
              </div>

              {nextProject && (
                <div className="mt-10 border-t border-white/12 pt-6">
                  <Link
                    href={`/work/${nextProject.slug}`}
                    onClick={() => trackEvent('project_cta_click', { project: 'autopart', action: 'next_project' })}
                    className="group inline-flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#828a97] transition hover:text-white"
                  >
                    <span className="text-[#ff6a2b]">Next case study</span>
                    <span className="font-bold text-white">{tNext.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
