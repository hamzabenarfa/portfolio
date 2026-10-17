'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Palette,
  Scissors,
  ShieldCheck,
  Sparkles,
  Store,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';
import { ProductFigure, ScrubCanvas, type MediaTheme } from '@/components/fx/media';

const EMAIL = 'contact@benarfa.com';

const ACCENT = '#c41e6b';
const INK = '#1c1917';

const media: MediaTheme = {
  accent: ACCENT,
  ink: INK,
  surface: '#ffffff',
  captionClass: 'text-[#9a948b]',
};

const softFrame = 'rounded-[1.75rem] border border-black/10 bg-white shadow-sm hover:shadow-xl hover:shadow-black/5';

/* ---------- Role switcher ---------- */

interface Role {
  id: string;
  label: string;
  icon: typeof Palette;
  tagline: string;
  copy: string;
  sees: string[];
}

const roles: Role[] = [
  {
    id: 'designer',
    label: 'Designer',
    icon: Palette,
    tagline: 'Sells original artwork',
    copy: 'Uploads artwork, prices designs, and sells directly into the marketplace. Earnings accrue per licensed design, with a withdrawal flow to cash out.',
    sees: ['Artwork listings', 'Earnings & withdrawals', 'Sales activity'],
  },
  {
    id: 'fashion-designer',
    label: 'Fashion Designer',
    icon: Scissors,
    tagline: 'Sells production templates',
    copy: 'Turns garment concepts into production-ready technical templates in a specialised workspace — the patterns brands customise on.',
    sees: ['Template workspace', 'Technical specs', 'Earnings & withdrawals'],
  },
  {
    id: 'brand',
    label: 'Brand',
    icon: Store,
    tagline: 'The paying customer',
    copy: 'Browses the catalogue, customises products in the canvas editor, then orders: a deposit buys one sample, and approving it triggers the bulk production run.',
    sees: ['Canvas editor', 'Cart & favourites', 'Sample-then-bulk orders'],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
    tagline: 'Keeps the market honest',
    copy: 'Moderates listings, manages users across all roles, and oversees creator payouts across the ecosystem.',
    sees: ['Listing moderation', 'User management', 'Payout oversight'],
  },
];

function RoleSwitcher() {
  const [active, setActive] = useState<Role>(roles[0]);
  const ActiveIcon = active.icon;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-sm">
      <div className="flex flex-wrap border-b border-black/10" role="group" aria-label="Marketplace roles">
        {roles.map((role) => {
          const isActive = active.id === role.id;
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setActive(role)}
              aria-pressed={isActive}
              className={`flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-semibold transition min-w-[9rem] ${
                isActive
                  ? 'bg-[#1c1917] text-[#faf7f4]'
                  : 'bg-white text-[#6b6560] hover:bg-[#faf7f4] hover:text-[#1c1917]'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-[#f472b6]' : ''}`} />
              <span className="hidden sm:inline">{role.label}</span>
              <span className="sm:hidden">{role.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="grid gap-8 p-7 sm:p-9 md:grid-cols-[1.4fr_1fr]"
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-2xl bg-[#faf7f4] p-3 text-[#c41e6b]">
              <ActiveIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-2xl text-[#1c1917]">{active.label}</h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a948b]">{active.tagline}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-[#54504a]">{active.copy}</p>
        </div>
        <div className="rounded-2xl bg-[#faf7f4] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9a948b]">Their dashboard</p>
          <ul className="mt-3 space-y-2.5">
            {active.sees.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[#3c3933]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#c41e6b]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Sample-then-bulk stepper ---------- */

const orderSteps = [
  {
    n: '01',
    title: 'Deposit buys a sample',
    copy: 'The brand pays a deposit through Konnect and one physical sample is produced from their canvas design.',
  },
  {
    n: '02',
    title: 'Verify it in hand',
    copy: 'The brand inspects the real garment — print placement, colours, fabric — before committing to anything more.',
  },
  {
    n: '03',
    title: 'Balance triggers the bulk run',
    copy: 'Paying the remaining balance starts the full production run. No brand ever commits blind to a bulk order.',
  },
];

export default function DTalkProjectPage() {
  const t = PROJECT_CONTENT['dtalk-ecosystem'];
  const project = PROJECTS.find((p) => p.slug === 'dtalk-ecosystem');
  const nextProject = PROJECTS.find((p) => p.slug === 'autopart');
  const tNext = PROJECT_CONTENT.autopart;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#faf7f4] text-[#1c1917] selection:bg-[#c41e6b]/20">
      <motion.div className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#c41e6b]" style={{ scaleX }} />

      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full bg-[#c41e6b]/6 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-[#1c1917]/4 blur-3xl" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-black/8 bg-[#faf7f4]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6b6560] transition hover:text-[#1c1917]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Index</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="font-serif text-lg italic text-[#6b6560]">
            D-Talk <span className="not-italic text-[#c41e6b]">·</span> Ecosystem
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-[#1c1917] px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#c41e6b] sm:px-4"
            >
              <span className="hidden sm:inline">Live demo</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </nav>

      <main className="relative z-10">
        {/* ============ Hero ============ */}
        <header className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="rounded-full bg-[#c41e6b]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#a01855]">
                  {t.category}
                </span>
                <span className="font-mono text-[11px] text-[#9a948b]">demo.d-talk.co · frontend case study</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="mt-7 font-serif text-5xl leading-[1.02] tracking-tight text-[#1c1917] sm:text-7xl"
              >
                Fashion commerce,
                <br />
                <span className="italic text-[#c41e6b]">one canvas.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-[#54504a]"
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
                  href="#canvas"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1c1917] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c41e6b]"
                >
                  See the canvas editor
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[#1c1917] transition hover:bg-white"
                  >
                    Live demo
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            </section>

            <motion.section
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-[#c41e6b]/10 to-[#1c1917]/5 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-2.5 shadow-2xl shadow-black/10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#0c0a0f]">
                  <video
                    className="h-full w-full object-cover object-center"
                    poster="/dtalk-demo-poster.jpg"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label="D-Talk product demo reel"
                  >
                    <source src="/dtalk-demo.mp4" type="video/mp4" />
                  </video>
                  <span className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur">
                    <span className="text-[#e11d74]">▶</span> Demo reel · 30s
                  </span>
                </div>
              </div>
            </motion.section>
          </div>

          <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-black/10 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b6560]">
            {['4 role-specific dashboards', 'Fabric.js + Konva canvas', 'Sample before bulk', 'EN / FR bilingual'].map((x) => (
              <span key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c41e6b]" /> {x}
              </span>
            ))}
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* ============ 01 Overview ============ */}
          <section className="py-20">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a01855]">01 — {t.subtitle}</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[#1c1917] sm:text-5xl">
                  Four roles, one creative commerce loop.
                </h2>
                <p className="mt-6 text-lg leading-8 text-[#54504a]">{t.longDescription}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <div className="rounded-[1.75rem] border border-black/10 bg-white/70 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9a948b]">The problem</p>
                  <p className="mt-3 text-sm leading-7 text-[#6b6560]">{t.problem}</p>
                </div>
                <div className="rounded-[1.75rem] border border-[#c41e6b]/20 bg-[#c41e6b]/[0.04] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a01855]">The answer</p>
                  <p className="mt-3 text-sm leading-7 text-[#6b6560]">{t.solution}</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
              className="mt-14"
            >
              <ScrubCanvas
                src="/dtalk-landing-full.webp"
                alt="D-Talk Ecosystem landing page, full length"
                dims={{ width: 1440, height: 7798 }}
                label="Full landing capture"
                caption="The whole ecosystem, top to bottom — hover to explore"
                theme={media}
                frameClassName={softFrame}
              />
            </motion.div>
          </section>

          {/* ============ 02 Roles — interactive ============ */}
          <section className="border-t border-black/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10 flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a01855]">02 — Every side of the marketplace</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                  Step into each role.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#6b6560]">
                One app, four completely different jobs to do. Each role gets its own dashboard, permissions,
                and workflow — switch between them to see what each one sees.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
            >
              <RoleSwitcher />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <ProductFigure
                src="/dtalk-about-us.webp"
                alt="D-Talk Ecosystem about page"
                dims={{ width: 1440, height: 900 }}
                caption="About the platform — who D-Talk is for"
                theme={media}
                frameClassName={softFrame}
                sizes="(max-width: 1024px) 100vw, 90vw"
                aspectClassName="aspect-[16/8]"
              />
            </motion.div>
          </section>

          {/* ============ 03 Canvas editor ============ */}
          <section id="canvas" className="scroll-mt-28 border-t border-black/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a01855]">03 — Where the design happens</p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                A real-time canvas, in the browser.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#54504a]">
                The centrepiece is an editor that lets brands place artwork across multiple print areas on a
                garment — drag, scale, and rotate with a live preview that always matches what ships.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Layers,
                  title: 'Multi-layer canvas',
                  copy: 'Fabric.js and React-Konva place artwork across print areas — every stroke rendered client-side, so the editor never waits on a server round-trip.',
                },
                {
                  icon: Sparkles,
                  title: 'Guided design finder',
                  copy: 'A short questionnaire — product, style, budget, keywords — surfaces matching designs from the catalogue, so brands don’t start from a blank canvas.',
                },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                  >
                    <div className="mb-5 inline-flex rounded-2xl bg-[#faf7f4] p-3 text-[#c41e6b]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-[#1c1917]">{c.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6b6560]">{c.copy}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <ProductFigure
                src="/dtalk-ai.webp"
                alt="D-Talk Ecosystem guided design finder"
                dims={{ width: 1440, height: 900 }}
                aspectClassName="aspect-[16/9]"
                sizes="(max-width: 1024px) 100vw, 75vw"
                caption="Guided design finder — matches from the catalogue"
                theme={media}
                frameClassName={softFrame}
              />
            </motion.div>
          </section>

          {/* ============ 04 Commerce ============ */}
          <section className="border-t border-black/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a01855]">04 — Selling, securely</p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                Sample first. <span className="italic text-[#c41e6b]">Then bulk.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#54504a]">
                B2B fashion orders are expensive to get wrong, so the checkout is built around de-risking them —
                with cart, favourites, and creator payouts locked behind role-aware authentication.
              </p>
            </motion.div>

            {/* sample-then-bulk rail */}
            <div className="grid gap-4 md:grid-cols-3">
              {orderSteps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.09 }}
                  className={`relative rounded-[1.75rem] border p-7 ${
                    i === 2
                      ? 'border-[#1c1917] bg-[#1c1917] text-[#faf7f4]'
                      : 'border-black/10 bg-white text-[#1c1917] shadow-sm'
                  }`}
                >
                  <span className={`font-serif text-4xl italic ${i === 2 ? 'text-[#f472b6]' : 'text-[#c41e6b]/30'}`}>
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${i === 2 ? 'text-[#bdb6ab]' : 'text-[#6b6560]'}`}>{s.copy}</p>
                  {i < 2 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#c41e6b] md:block"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
              >
                <ProductFigure
                  src="/dtalk-service.webp"
                  alt="D-Talk Ecosystem services page"
                  dims={{ width: 1440, height: 900 }}
                  caption="Ecosystem services"
                  theme={media}
                  frameClassName={softFrame}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.08 }}
              >
                <ProductFigure
                  src="/dtalk-auth.webp"
                  alt="D-Talk Ecosystem authentication flow"
                  dims={{ width: 1440, height: 900 }}
                  caption="Role-aware authentication flow"
                  theme={media}
                  frameClassName={softFrame}
                />
              </motion.div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.keyFeatures.map((feat) => (
                <div key={feat} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/60 p-4 transition-colors hover:bg-white">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c41e6b]" />
                  <span className="text-sm leading-6 text-[#54504a]">{feat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ============ 05 Stack ============ */}
          <section className="border-t border-black/10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a01855]">05 — What it&rsquo;s built on</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">Technology stack</h2>
            </motion.div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-black/12 bg-white/70 px-4 py-2 font-mono text-xs font-medium text-[#3c3933] transition-colors hover:border-[#c41e6b]/40 hover:text-[#a01855]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="mt-6 flex items-center gap-3 rounded-2xl border border-black/10 bg-white/60 p-5 text-sm text-[#54504a]">
              <Layers className="h-5 w-5 shrink-0 text-[#c41e6b]" />
              Client-side canvas rendering via Fabric.js and React-Konva, with TanStack Query keeping server
              state fresh across all four dashboards and Azure Blob Storage serving uploaded artwork.
            </p>
          </section>
        </div>

        {/* ============ CTA ============ */}
        <section className="bg-[#1c1917] text-[#faf7f4]">
          <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
              style={{ backgroundColor: `${ACCENT}55` }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f472b6]">Let&rsquo;s work together</p>
              <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                Building something with more than one kind of user?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#bdb6ab]">
                I partner with founders and small teams to ship production software, start to finish. Tell me
                what you&rsquo;re building.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/#contact"
                  onClick={() => trackEvent('project_cta_click', { project: 'dtalk-ecosystem', action: 'contact' })}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#c41e6b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#faf7f4] hover:text-[#1c1917]"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={() => trackEvent('contact_click', { project: 'dtalk-ecosystem', method: 'email' })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                >
                  Email me
                </a>
              </div>

              {nextProject && (
                <div className="mt-10 border-t border-white/12 pt-6">
                  <Link
                    href={`/work/${nextProject.slug}`}
                    onClick={() => trackEvent('project_cta_click', { project: 'dtalk-ecosystem', action: 'next_project' })}
                    className="group inline-flex flex-wrap items-center gap-3 text-sm text-[#bdb6ab] transition hover:text-white"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#6b6560]">Next case study</span>
                    <span className="font-serif text-lg italic text-white">{tNext.title}</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
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
