'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ExternalLink,
  Languages,
  LayoutTemplate,
  ListOrdered,
  MessageCircle,
  QrCode,
  Palette,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';
import { ProductFigure, type MediaTheme } from '@/components/fx/media';

const EMAIL = 'contact@benarfa.com';

const CORAL = '#e8503a';
const INK = '#1a1713';
const PAPER = '#f6f1e8';

const media: MediaTheme = {
  accent: CORAL,
  ink: INK,
  surface: PAPER,
  captionClass: 'text-[#98917f]',
};

const warmFrame = 'rounded-2xl border border-[#1a1713]/12 bg-white shadow-sm hover:shadow-xl hover:shadow-[#1a1713]/10';

/* Deterministic pseudo-QR pattern for the table tent card. */
const QR_GRID = [
  '#######.#.#######',
  '#.....#.#.#.....#',
  '#.###.#..##.###.#',
  '#.###.#.#.#.###.#',
  '#.###.#..#..###.#',
  '#.....#.##..#...#',
  '#######.#.#######',
  '........##.......',
  '#.##.###..#.#.##.',
  '.#..#..##.###..##',
  '##.#.##.#..##.#..',
  '........#.##..##.',
  '#######..#.#.###.',
  '#.....#.###..#..#',
  '#.###.#.#..##.##.',
  '#.###.#..##.#..##',
  '#######.#..###.#.',
];

type Lang = 'en' | 'fr' | 'ar';

const langOptions: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'fr', label: 'FR' },
  { id: 'ar', label: 'AR' },
];

const menuRow: Record<Lang, { dir: 'ltr' | 'rtl'; category: string; name: string; desc: string; price: string; cta: string }> = {
  en: {
    dir: 'ltr',
    category: 'From the grill',
    name: 'Grilled sea bream',
    desc: 'Charcoal-grilled, chermoula, preserved lemon',
    price: '28 DT',
    cta: 'Add to order',
  },
  fr: {
    dir: 'ltr',
    category: 'Au feu de bois',
    name: 'Daurade grillée',
    desc: 'Grillée au charbon, chermoula, citron confit',
    price: '28 DT',
    cta: 'Ajouter à la commande',
  },
  ar: {
    dir: 'rtl',
    category: 'من المشواة',
    name: 'دنيس مشوي',
    desc: 'مشوي على الفحم، شرمولة، ليمون مخلّل',
    price: '28 د.ت',
    cta: 'أضف إلى الطلب',
  },
};

const steps = [
  { n: '01', title: 'Build your menu', copy: 'Start from a template or blank — add photos, prices, and options; every change is live on the table QR the moment it saves.', icon: LayoutTemplate },
  { n: '02', title: 'One QR per table', copy: 'Generate a unique code for every table; print it yourself or order pre-printed cards.', icon: QrCode },
  { n: '03', title: 'Orders at the table', copy: 'Guests scan and order from their phone — tickets hit the kitchen display the moment they’re placed.', icon: ListOrdered },
];

const carte = [
  { icon: MessageCircle, name: 'Passwordless sign-in', tag: 'no password', copy: 'A one-time code by phone or a magic link instead of a password — less friction, less drop-off.' },
  { icon: LayoutTemplate, name: 'Live menu editor', tag: 'real-time', copy: 'Photos, allergens, options — every change is live on the table QR the moment it saves.' },
  { icon: BarChart3, name: 'Live orders & kitchen', tag: 'dashboard', copy: 'Tickets stream to the kitchen display and an orders dashboard the moment a table places them.' },
  { icon: Languages, name: 'English · French · Arabic', tag: 'full RTL', copy: 'Trilingual storefronts with proper right-to-left layout, not a mirrored afterthought.' },
  { icon: Palette, name: 'Storefront themes', tag: 'branded', copy: 'From minimal to full editorial — the menu page reads like the venue, not like software.' },
];

/** Segmented EN/FR/AR control that re-renders a live menu row, flipping to RTL for Arabic. */
function TrilingualDemo() {
  const [lang, setLang] = useState<Lang>('en');
  const row = menuRow[lang];

  return (
    <div className="rounded-2xl border border-[#1a1713]/12 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#98917f]">
          One menu, three languages — try it
        </p>
        <div className="flex rounded-full border border-[#1a1713]/12 bg-[#f6f1e8] p-1" role="group" aria-label="Menu language">
          {langOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setLang(opt.id)}
              aria-pressed={lang === opt.id}
              className={`rounded-full px-4 py-1.5 font-mono text-xs font-bold transition ${
                lang === opt.id ? 'bg-[#1a1713] text-[#f6f1e8]' : 'text-[#736c5c] hover:text-[#1a1713]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={lang}
        dir={row.dir}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-6 rounded-xl border border-[#1a1713]/10 bg-[#fdfbf7] p-5 sm:p-6"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#c2523f]">{row.category}</p>
        <div className="mt-3 flex items-baseline gap-3">
          <h3 className="text-xl font-bold text-[#1a1713]">{row.name}</h3>
          <span aria-hidden="true" className="flex-1 border-b border-dotted border-[#1a1713]/25" />
          <span className="font-mono text-base font-bold text-[#1a1713]">{row.price}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#736c5c]">{row.desc}</p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#e8503a] px-4 py-2 text-xs font-bold text-white">
          {row.cta}
        </span>
      </motion.div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#b0a892]">
        Arabic flips the whole layout right-to-left — type, dots, price, and button.
      </p>
    </div>
  );
}

/** Stylised order receipt — how a scan becomes a kitchen ticket. Illustrative content. */
function Receipt() {
  return (
    <div className="mx-auto w-full max-w-xs -rotate-1 transition-transform duration-500 hover:rotate-0">
      <div className="bg-white px-6 pb-2 pt-6 font-mono text-xs text-[#1a1713] shadow-xl shadow-[#1a1713]/15">
        <p className="text-center text-sm font-bold tracking-[0.18em]">CAFÉ EXEMPLE</p>
        <p className="mt-1 text-center text-[10px] uppercase tracking-[0.2em] text-[#98917f]">
          menu-qr.tn/r/cafe-exemple
        </p>
        <div className="my-4 border-t border-dashed border-[#1a1713]/30" />
        <div className="flex justify-between">
          <span>TABLE 07</span>
          <span className="text-[#c2523f]">SCAN → ORDER</span>
        </div>
        <div className="my-4 border-t border-dashed border-[#1a1713]/30" />
        {[
          ['1× Espresso', '3.5'],
          ['2× Citronnade', '9.0'],
          ['1× Croissant', '2.5'],
        ].map(([item, price]) => (
          <div key={item} className="flex items-baseline gap-2 py-1">
            <span>{item}</span>
            <span aria-hidden="true" className="flex-1 border-b border-dotted border-[#1a1713]/25" />
            <span>{price}</span>
          </div>
        ))}
        <div className="my-4 border-t border-dashed border-[#1a1713]/30" />
        <div className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>15.0 DT</span>
        </div>
        <div className="mt-4 flex justify-between text-[10px] uppercase tracking-[0.14em] text-[#98917f]">
          <span>→ Kitchen ticket</span>
          <span>→ Live dashboard</span>
        </div>
        <p className="mt-3 text-center text-[9px] uppercase tracking-[0.2em] text-[#c6bfae]">illustration</p>
      </div>
      <div
        aria-hidden="true"
        className="h-3"
        style={{
          background:
            'linear-gradient(45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%), linear-gradient(-45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%)',
          backgroundSize: '14px 24px',
          backgroundPosition: '0 -12px',
        }}
      />
    </div>
  );
}

/** CSS table tent card with a stylised QR pattern. */
function TentCard() {
  return (
    <div className="relative mx-auto w-fit rotate-2 transition-transform duration-500 hover:rotate-0">
      <div className="rounded-xl border border-[#1a1713]/10 bg-white p-6 shadow-2xl shadow-[#1a1713]/20 sm:p-8">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#98917f]">Table 07</p>
        <div className="mx-auto mt-4 grid w-fit gap-[2px] rounded-md border border-[#1a1713]/10 bg-white p-3" aria-hidden="true">
          {QR_GRID.map((row, ri) => (
            <div key={ri} className="flex gap-[2px]">
              {row.split('').map((cell, ci) => (
                <span
                  key={ci}
                  className={`h-[7px] w-[7px] rounded-[1px] sm:h-2 sm:w-2 ${cell === '#' ? 'bg-[#1a1713]' : 'bg-transparent'}`}
                />
              ))}
            </div>
          ))}
        </div>
        <p className="mt-4 text-center font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#e8503a]">
          Scan · Order · Enjoy
        </p>
        <p className="mt-1 text-center font-mono text-[10px] text-[#b0a892]">No app. No wait.</p>
      </div>
    </div>
  );
}

export default function MenuQRProjectPage() {
  const t = PROJECT_CONTENT['menu-qr'];
  const project = PROJECTS.find((p) => p.slug === 'menu-qr');
  const nextProject = PROJECTS.find((p) => p.slug === 'kindra');
  const tNext = PROJECT_CONTENT.kindra;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#1a1713] selection:bg-[#e8503a]/20">
      <motion.div className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#e8503a]" style={{ scaleX }} />

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-[#1a1713]/10 bg-[#f6f1e8]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#736c5c] transition hover:text-[#1a1713]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Index</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#736c5c]">
            <QrCode className="h-3.5 w-3.5 text-[#e8503a]" /> menu-qr.tn
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-[#1a1713] px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#f6f1e8] transition hover:bg-[#e8503a] sm:px-4"
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
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="rounded-full bg-[#e8503a]/12 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#c2523f]">
                  {t.category}
                </span>
                <span className="font-mono text-[11px] text-[#98917f]">EN · FR · AR — full RTL</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="mt-7 text-6xl font-black leading-[0.94] tracking-[-0.03em] sm:text-7xl lg:text-8xl"
              >
                The menu is
                <br />
                the <span className="text-[#e8503a]">order.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-[#55503f]"
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
                  href="#receipt"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1a1713] px-6 py-3 text-sm font-bold text-[#f6f1e8] transition hover:bg-[#e8503a]"
                >
                  Follow one order
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1a1713]/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[#1a1713] transition hover:bg-white"
                  >
                    Live site
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TentCard />
            </motion.div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-[#1a1713]/10 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#736c5c]">
            {['Multi-tenant SaaS', 'No app to download', 'No POS terminal', 'Live in ~10 min'].map((x) => (
              <span key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e8503a]" /> {x}
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
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#c2523f]">01 — The idea</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                Turn a printed menu into a sales channel.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#55503f]">{t.longDescription}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="rounded-2xl border border-[#1a1713]/12 bg-white/70 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#98917f]">The problem</p>
                <p className="mt-3 text-sm leading-7 text-[#55503f]">{t.problem}</p>
              </div>
              <div className="rounded-2xl border border-[#e8503a]/25 bg-[#e8503a]/[0.05] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#c2523f]">The answer</p>
                <p className="mt-3 text-sm leading-7 text-[#55503f]">{t.solution}</p>
              </div>
            </motion.div>
          </section>

          {/* ============ 02 Follow one order — receipt ============ */}
          <section id="receipt" className="scroll-mt-28 border-t border-[#1a1713]/10 py-20">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55 }}
                className="order-2 lg:order-1"
              >
                <Receipt />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className="order-1 lg:order-2"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#c2523f]">02 — Follow one order</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                  From scan to kitchen in three steps.
                </h2>
                <div className="mt-10 space-y-0">
                  {steps.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.n}
                        className={`group flex gap-5 py-6 ${i < steps.length - 1 ? 'border-b border-dashed border-[#1a1713]/15' : ''}`}
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1a1713]/12 bg-white text-[#1a1713] transition group-hover:border-[#e8503a] group-hover:text-[#e8503a]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-baseline gap-3">
                            <span className="font-mono text-xs text-[#c2523f]">{s.n}</span>
                            <h3 className="text-lg font-bold">{s.title}</h3>
                          </div>
                          <p className="mt-1.5 text-sm leading-7 text-[#736c5c]">{s.copy}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ============ 03 La carte — features ============ */}
          <section className="border-t border-[#1a1713]/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10 flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#c2523f]">03 — La carte</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">What&rsquo;s on the menu</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#736c5c]">
                Everything a venue needs between the table and the kitchen — written up like the menus it powers.
              </p>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-[#1a1713]/12 bg-white p-6 shadow-sm sm:p-9"
              >
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#98917f]">— La carte —</p>
                <div className="mt-6 space-y-6">
                  {carte.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="group">
                        <div className="flex items-baseline gap-3">
                          <Icon className="h-4 w-4 shrink-0 translate-y-0.5 text-[#e8503a]" />
                          <h3 className="text-base font-bold text-[#1a1713] transition-colors group-hover:text-[#c2523f]">
                            {item.name}
                          </h3>
                          <span aria-hidden="true" className="flex-1 border-b border-dotted border-[#1a1713]/25" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#c2523f]">{item.tag}</span>
                        </div>
                        <p className="mt-1.5 pl-7 text-sm leading-6 text-[#736c5c]">{item.copy}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col justify-center"
              >
                <TrilingualDemo />
              </motion.div>
            </div>
          </section>

          {/* ============ 04 The product ============ */}
          <section className="border-t border-[#1a1713]/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#c2523f]">04 — In the wild</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">The product</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
            >
              <ProductFigure
                src="/menu-qr-hero.webp"
                alt="Menu QR landing page"
                dims={{ width: 1440, height: 900 }}
                caption="menu-qr.tn — the landing page"
                theme={media}
                frameClassName={warmFrame}
                aspectClassName="aspect-[16/8]"
                sizes="(max-width: 1024px) 100vw, 90vw"
              />
            </motion.div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
              >
                <ProductFigure
                  src="/menu-qr-bento.webp"
                  alt="Menu QR feature overview and storefront preview"
                  dims={{ width: 1440, height: 900 }}
                  caption="Features & storefront preview"
                  theme={media}
                  frameClassName={warmFrame}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.08 }}
              >
                <ProductFigure
                  src="/menu-qr-pricing.webp"
                  alt="Menu QR pricing page"
                  dims={{ width: 1440, height: 900 }}
                  caption="Self-serve pricing — no bank card to start"
                  theme={media}
                  frameClassName={warmFrame}
                />
              </motion.div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.keyFeatures.map((feat) => (
                <div key={feat} className="flex items-start gap-3 rounded-xl border border-[#1a1713]/10 bg-white/60 p-4 transition-colors hover:bg-white">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8503a]" />
                  <span className="text-sm leading-6 text-[#55503f]">{feat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ============ 05 Stack ============ */}
          <section className="border-t border-[#1a1713]/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#c2523f]">05 — Under the counter</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Stack &amp; expertise</h2>
            </motion.div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-full border border-[#1a1713]/12 bg-white/70 px-4 py-2 font-mono text-xs font-medium text-[#3c382e] transition-colors hover:border-[#e8503a]/50 hover:text-[#c2523f]">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'Multi-tenant data modeling',
                'B2B SaaS architecture',
                'Internationalization (RTL)',
                'Passwordless auth',
                'Caching & performance',
                'Analytics dashboards',
              ].map((skill) => (
                <span key={skill} className="rounded-full bg-[#1a1713] px-4 py-2 font-mono text-xs font-medium text-[#f6f1e8]">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* ============ CTA ============ */}
        <section className="bg-[#1a1713] text-[#f6f1e8]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e8503a]">L&rsquo;addition — work with me</p>
            <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Need software your customers never have to learn?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#b3ab99]">
              I partner with founders and small teams to ship production software, start to finish. Tell me what
              you&rsquo;re building.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/#contact"
                onClick={() => trackEvent('project_cta_click', { project: 'menu-qr', action: 'contact' })}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#e8503a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#f6f1e8] hover:text-[#1a1713]"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => trackEvent('contact_click', { project: 'menu-qr', method: 'email' })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
              >
                Email me
              </a>
            </div>

            {nextProject && (
              <div className="mt-10 border-t border-white/12 pt-6">
                <Link
                  href={`/work/${nextProject.slug}`}
                  onClick={() => trackEvent('project_cta_click', { project: 'menu-qr', action: 'next_project' })}
                  className="group inline-flex flex-wrap items-center gap-3 text-sm text-[#b3ab99] transition hover:text-white"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#736c5c]">Next case study</span>
                  <span className="font-bold text-white">{tNext.title}</span>
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
