'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  Wallet,
  Truck,
  Search,
  Boxes,
  Store,
  Gauge,
  Database,
  Server,
  Cloud,
  Layers,
  CheckCircle2,
  Wrench,
  ExternalLink,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { ProjectContactCTA } from '@/components/fx/project-contact-cta';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'flow', label: 'How an order works' },
  { id: 'platform', label: 'Three-sided platform' },
  { id: 'engine', label: 'Order engine' },
  { id: 'stack', label: 'Stack' },
];

const stats = [
  { label: 'Surfaces', value: '03', detail: 'Customer · Admin · Supplier' },
  { label: 'Deposit', value: '20%', detail: 'Rest paid cash on delivery' },
  { label: 'Verification', value: '1 call', detail: 'Human stock check' },
];

const orderFlow = [
  { step: '01', title: 'Find the part', copy: 'Buyer selects make, model, and engine, or searches by name through Meilisearch.', icon: Search },
  { step: '02', title: 'Pay 20% deposit', copy: 'The order is locked in an AWAITING_DEPOSIT state until the deposit clears.', icon: Wallet },
  { step: '03', title: 'We call the supplier', copy: 'An operator phones the supplier to confirm the part is genuinely in stock.', icon: PhoneCall },
  { step: '04', title: 'Delivered, pay the rest', copy: 'Confirmed orders ship and the balance is paid cash on delivery.', icon: Truck },
];

const surfaces = [
  {
    title: 'Customer',
    copy: 'Vehicle-fit catalogue, search, garage, checkout, and order tracking — French and mobile-first.',
    points: ['Vehicle finder', 'Part search', 'Deposit checkout'],
    icon: Store,
  },
  {
    title: 'Admin',
    copy: 'A call queue for human stock verification, deposit tracking, and the full order lifecycle.',
    points: ['Call queue', 'Deposit review', 'Order ops'],
    icon: ShieldCheck,
  },
  {
    title: 'Supplier',
    copy: 'Inventory management, shipping, and payout tracking for verified parts vendors.',
    points: ['Inventory', 'Shipping', 'Payouts'],
    icon: Boxes,
  },
];

const showcase = [
  { src: '/autopart-catalogue.webp', alt: 'AutoParts category catalogue', caption: 'Catalogue — verified part categories with live counts' },
  { src: '/autopart-categorie.webp', alt: 'AutoParts engine category listing', caption: 'Category view — fit-filtered parts for the selected vehicle' },
];

export default function AutoPartProjectPage() {
  const t = PROJECT_CONTENT.autopart;
  const project = PROJECTS.find((p) => p.slug === 'autopart');
  const nextProject = PROJECTS.find((p) => p.slug === 'beadcraft');
  const tNext = PROJECT_CONTENT.beadcraft;
  const [imageError, setImageError] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '16%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.35]);

  useEffect(() => {
    const handleScroll = () => {
      let current = navItems[0].id;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 260) current = item.id;
      }
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        current = navItems[navItems.length - 1].id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const frontendTech = project.tech.filter((x) => ['Next.js', 'React', 'TypeScript', 'Tailwind'].some((n) => x.includes(n)));
  const dataTech = project.tech.filter((x) => ['Prisma', 'Neon', 'Redis', 'Meilisearch', 'Auth.js'].some((n) => x.includes(n)));
  const platformTech = project.tech.filter((x) => ['Cloudflare', 'Biome', 'Bun'].some((n) => x.includes(n)));

  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0f1a] text-slate-100 selection:bg-orange-500/30">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-orange-500 via-amber-400 to-orange-600 shadow-[0_0_24px_rgba(249,115,22,0.6)]"
        style={{ scaleX }}
      />

      {/* atmosphere: blueprint grid + glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 right-0 h-[34rem] w-[34rem] rounded-full bg-orange-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-2xl">
        <div
          className="h-1.5 w-full opacity-80"
          style={{ background: 'repeating-linear-gradient(135deg,#f97316 0 14px,#0a0f1a 14px 28px)' }}
          aria-hidden="true"
        />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-orange-500/40 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-full px-3 py-1.5 text-xs transition ${
                  activeSection === item.id ? 'bg-orange-500 text-[#0a0f1a]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-slate-400">
            <Wrench className="h-3.5 w-3.5 text-orange-400" /> {project.year}
          </span>
        </div>
      </nav>

      <main className="relative z-10">
        <header className="relative px-4 pt-28 sm:px-6 lg:pt-36">
          <motion.div
            className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <section className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-6 flex flex-wrap items-center gap-3"
              >
                <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-orange-300">
                  {t.category}
                </span>
                <span className="font-mono text-xs text-slate-500">AutoParts.tn · Tunisia</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-5xl font-black uppercase leading-[0.86] tracking-[-0.04em] text-transparent bg-clip-text bg-linear-to-br from-white via-slate-200 to-slate-500 sm:text-7xl lg:text-8xl"
              >
                AutoParts<span className="text-orange-500">.</span>
                <br />
                Tunisia
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
              >
                {t.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <button
                  onClick={() => scrollTo('flow')}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-[#0a0f1a] transition hover:bg-orange-400"
                >
                  See how an order works
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-orange-400/50 hover:bg-white/[0.08]"
                  >
                    Live site
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
              <div className="absolute -inset-6 rounded-[3rem] bg-linear-to-br from-orange-500/25 via-amber-400/10 to-sky-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.04] p-2.5 shadow-2xl shadow-black/50 backdrop-blur">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-slate-950">
                  {!imageError ? (
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt="AutoParts Tunisia storefront"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                      priority
                      quality={92}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-slate-900 to-slate-950">
                      <Wrench className="h-12 w-12 text-orange-400" />
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          </motion.div>
        </header>

        <section className="border-y border-white/10 bg-white/[0.02] px-4 py-6 sm:px-6 mt-16">
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{s.label}</div>
                  <div className="mt-2 text-sm text-slate-300">{s.detail}</div>
                </div>
                <div className="font-mono text-2xl font-black text-orange-400">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-5 text-xs uppercase tracking-[0.3em] text-slate-500">Contents</div>
              <nav className="space-y-2 border-l border-white/10 pl-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block text-left text-sm transition ${
                      activeSection === item.id ? 'translate-x-1 text-white' : 'text-slate-500 hover:text-slate-200'
                    }`}
                  >
                    {activeSection === item.id && (
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange-500 align-middle shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
                    )}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <article className="space-y-28">
            {/* Overview */}
            <Section id="overview">
              <SectionHead n="01" label={t.subtitle} />
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Trust, engineered into the order itself.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-slate-300">{t.longDescription}</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-orange-500/10 p-3 text-orange-300"><Gauge className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">The problem</h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-400">{t.problem}</p>
                  <div className="my-6 h-px bg-white/10" />
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-400/10 p-3 text-emerald-300"><ShieldCheck className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">The answer</h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-400">{t.solution}</p>
                </div>
              </div>
            </Section>

            {/* Order flow */}
            <Section id="flow">
              <SectionHead n="02" label="From scan to delivery" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">How an order works</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {orderFlow.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.step} className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/[0.06]">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="rounded-xl border border-white/10 bg-black/40 p-2.5 text-orange-300"><Icon className="h-5 w-5" /></div>
                        <span className="font-mono text-xs text-slate-600">{f.step}</span>
                      </div>
                      <h3 className="text-base font-semibold text-white">{f.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{f.copy}</p>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Platform */}
            <Section id="platform">
              <SectionHead n="03" label="One marketplace, three jobs" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">Three-sided platform</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {surfaces.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                      <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-black/30 p-3 text-orange-300"><Icon className="h-6 w-6" /></div>
                      <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-400">{s.copy}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {s.points.map((p) => (
                          <span key={p} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-slate-300">{p}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {showcase.map((img) => (
                  <figure key={img.src} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
                    <div className="relative aspect-[16/10]">
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" />
                    </div>
                    <figcaption className="px-5 py-3 font-mono text-xs text-slate-500">{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </Section>

            {/* Order engine */}
            <Section id="engine">
              <SectionHead n="04" label="The hard part" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">Deposit order engine</h2>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-white/[0.06] to-white/[0.02]">
                <div className="grid gap-3 p-6 sm:grid-cols-3">
                  {[
                    { state: 'AWAITING_DEPOSIT', copy: 'Order created, 20% deposit pending. A reminder fires 3–4h before the deadline.' },
                    { state: 'CONFIRMED', copy: 'Deposit cleared and supplier stock verified by a real phone call.' },
                    { state: 'FAILED_REJECTED', copy: 'Deadline cron expires unpaid orders so inventory never gets stuck.' },
                  ].map((s, i) => (
                    <div key={s.state} className="rounded-[1.25rem] border border-white/10 bg-black/30 p-5">
                      <div className="mb-3 flex items-center gap-2 font-mono text-xs text-orange-300">
                        <span className="text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                        {s.state}
                      </div>
                      <p className="text-sm leading-6 text-slate-400">{s.copy}</p>
                    </div>
                  ))}
                </div>
                <div className="grid gap-4 border-t border-white/10 p-6 lg:grid-cols-2">
                  {t.keyFeatures.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                      <span className="text-sm leading-6 text-slate-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Stack */}
            <Section id="stack">
              <SectionHead n="05" label="What it's built on" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">Technology stack</h2>
              <div className="grid gap-5 md:grid-cols-3">
                <TechColumn title="Frontend" icon={<Layers className="h-5 w-5" />} items={frontendTech} />
                <TechColumn title="Data & Auth" icon={<Database className="h-5 w-5" />} items={dataTech} />
                <TechColumn title="Platform" icon={<Cloud className="h-5 w-5" />} items={platformTech} />
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-5 text-sm text-slate-400">
                <Server className="h-5 w-5 shrink-0 text-orange-300" />
                Edge-friendly Next.js 16 App Router over a Neon Postgres core, with Redis and Meilisearch behind Docker for local development.
              </div>
            </Section>

            <ProjectContactCTA
              project="autopart"
              projectTitle="AutoParts Tunisia"
              accentText="text-orange-300"
              accentBg="bg-orange-500"
              accentBgHover="hover:bg-orange-400"
              accentGlow="bg-orange-500/20"
              next={nextProject ? { href: `/work/${nextProject.slug}`, title: tNext.title } : undefined}
            />
          </article>
        </div>
      </main>
    </div>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-32"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
}

function SectionHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="rounded-md bg-orange-500 px-2.5 py-1 font-mono text-xs font-bold text-[#0a0f1a]">{n}</span>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
    </div>
  );
}

function TechColumn({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-5 flex items-center gap-3 text-orange-300">
        <div className="rounded-2xl bg-orange-500/10 p-3">{icon}</div>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-slate-300">{item}</div>
        ))}
      </div>
    </div>
  );
}
