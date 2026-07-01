'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  QrCode,
  ListOrdered,
  Smartphone,
  LayoutTemplate,
  MessageCircle,
  BarChart3,
  Languages,
  Store,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';

const EMAIL = 'contact@benarfa.com';
const WHATSAPP = 'https://wa.me/21622633345';
const CORAL = '#e8503a';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'how', label: 'How it works' },
  { id: 'features', label: 'Features' },
  { id: 'product', label: 'The product' },
  { id: 'stack', label: 'Stack' },
];

const steps = [
  { n: '01', title: 'Build your menu', copy: 'Start from a template or blank — add photos, allergens, and options, and drag to reorder.', icon: LayoutTemplate },
  { n: '02', title: 'One QR per table', copy: 'Generate a unique QR for each table and print it yourself, or order pre-printed cards.', icon: QrCode },
  { n: '03', title: 'Orders at the table', copy: 'Guests scan and order from their phone; the kitchen sees orders, you watch revenue live.', icon: ListOrdered },
];

export default function MenuQRProjectPage() {
  const t = PROJECT_CONTENT['menu-qr'];
  const project = PROJECTS.find((p) => p.slug === 'menu-qr');
  const nextProject = PROJECTS.find((p) => p.slug === 'vertex');
  const tNext = PROJECT_CONTENT.vertex;
  const [imageError, setImageError] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '12%']);

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

  const expertise = [
    'System Design',
    'B2B SaaS Architecture',
    'Multi-tenant Data Modeling',
    'Full-Stack TypeScript',
    'Internationalization (RTL)',
    'Passwordless Auth',
    'Caching & Performance',
    'Analytics & Dashboards',
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f3ee] text-[#161514] selection:bg-[#e8503a]/20">
      <motion.div className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#e8503a]" style={{ scaleX }} />

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-black/8 bg-[#f5f3ee]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 rounded-full border border-black/12 bg-white/60 px-3 py-2 text-xs font-medium text-[#54504a] transition hover:border-[#e8503a]/40 hover:text-[#161514]"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-full px-3 py-1.5 text-xs transition ${
                  activeSection === item.id ? 'bg-[#161514] text-[#f5f3ee]' : 'text-[#6b665f] hover:text-[#161514]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-[#161514] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#e8503a] sm:px-4"
            >
              <span className="hidden sm:inline">Live site</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </nav>

      <main className="relative">
        <header className="relative px-4 pt-28 sm:px-6 lg:pt-36">
          <motion.div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]" style={{ y: heroY }}>
            <section className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-6 flex flex-wrap items-center gap-3"
              >
                <span className="rounded-full bg-[#e8503a]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c23a26]">
                  {t.category}
                </span>
                <span className="font-mono text-xs text-[#8a847b]">menu-qr.tn</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-5xl font-black leading-[0.95] tracking-[-0.03em] text-[#161514] sm:text-7xl"
              >
                A menu on every
                <br />
                table. <span className="text-[#e8503a]">One scan.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-[#54504a]"
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
                  onClick={() => scrollTo('how')}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#161514] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#e8503a]"
                >
                  See how it works
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[#161514] transition hover:bg-white"
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
              <div className="absolute -inset-5 rounded-[3rem] bg-linear-to-br from-[#e8503a]/12 to-[#161514]/5 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-2.5 shadow-2xl shadow-black/10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#efece5]">
                  {!imageError ? (
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt="Menu QR landing and live orders dashboard"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                      priority
                      quality={92}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <QrCode className="h-12 w-12 text-[#e8503a]" />
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          </motion.div>

          {/* trust strip */}
          <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-black/10 py-5 text-xs uppercase tracking-[0.2em] text-[#6b665f]">
            {['120+ Tunisian venues', 'EN · FR · AR (RTL)', 'No app to download', 'Live in ~10 min'].map((x) => (
              <span key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e8503a]" /> {x}
              </span>
            ))}
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-5 text-xs uppercase tracking-[0.3em] text-[#9a948b]">Contents</div>
              <nav className="space-y-2 border-l border-black/12 pl-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block text-left text-sm transition ${
                      activeSection === item.id ? 'translate-x-1 font-medium text-[#e8503a]' : 'text-[#9a948b] hover:text-[#161514]'
                    }`}
                  >
                    {activeSection === item.id && (
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#e8503a] align-middle" />
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
                  <h2 className="text-4xl font-bold tracking-tight text-[#161514] sm:text-5xl">
                    Turn a printed menu into a sales channel.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-[#54504a]">{t.longDescription}</p>
                </div>
                <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl bg-[#e8503a]/10 p-3 text-[#c23a26]"><Store className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">The problem</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#6b665f]">{t.problem}</p>
                  <div className="my-6 h-px bg-black/10" />
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl bg-[#161514]/8 p-3 text-[#161514]"><QrCode className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">The answer</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#6b665f]">{t.solution}</p>
                </div>
              </div>
            </Section>

            {/* How it works — bento */}
            <Section id="how">
              <SectionHead n="02" label="Three steps to live" />
              <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.n} className="group relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                      <div className="mb-8 flex items-center justify-between">
                        <div className="rounded-2xl bg-[#f5f3ee] p-3 text-[#161514]"><Icon className="h-6 w-6" /></div>
                        <span className="font-mono text-sm text-[#bdb6ab]">{s.n}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#161514]">{s.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#6b665f]">{s.copy}</p>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Features — bento with dark card */}
            <Section id="features">
              <SectionHead n="03" label="What's inside" />
              <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Features</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {/* tall dark feature card */}
                <div className="row-span-2 flex flex-col justify-between rounded-[1.75rem] bg-[#161514] p-7 text-[#f5f3ee] md:row-span-2">
                  <div>
                    <span className="text-xs uppercase tracking-[0.24em] text-[#8a847b]">Storefront</span>
                    <h3 className="mt-4 text-2xl font-semibold leading-snug">A menu page that looks like your venue.</h3>
                    <p className="mt-3 text-sm leading-7 text-[#bdb6ab]">
                      Pick a template, drop in photos and colours, and your storefront is live at <span className="font-mono text-[#f5f3ee]">menu-qr.tn/r/your-venue</span> — fast and SEO-friendly.
                    </p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-[#e8503a] px-4 py-2 text-xs font-bold text-white">
                    <QrCode className="h-4 w-4" /> One QR per table
                  </div>
                </div>

                <BentoCard icon={MessageCircle} title="WhatsApp OTP login" copy="Passwordless sign-in over WhatsApp — no passwords, less drop-off." />
                <BentoCard icon={ListOrdered} title="Live order pipeline" copy="Organise the flow your way — kitchen, bar, runner." />
                <BentoCard icon={Languages} title="Trilingual + RTL" copy="English, French, and Arabic with right-to-left layouts." />
                <BentoCard icon={BarChart3} title="Live analytics" copy="Revenue, scans, average ticket, and reviews in real time." />
              </div>
            </Section>

            {/* Product imagery */}
            <Section id="product">
              <SectionHead n="04" label="In the wild" />
              <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">The product</h2>
              <div className="grid gap-4">
                <figure className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-sm">
                  <div className="relative aspect-[16/9]">
                    <Image src="/menu-qr-bento.webp" alt="Menu QR feature overview" fill sizes="(max-width: 1024px) 100vw, 75vw" className="object-cover object-top" />
                  </div>
                  <figcaption className="px-5 py-3 font-mono text-xs text-[#9a948b]">menu-qr.tn — features &amp; storefront preview</figcaption>
                </figure>
                <div className="grid gap-3 sm:grid-cols-2">
                  {t.keyFeatures.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/60 p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#e8503a]" />
                      <span className="text-sm leading-6 text-[#54504a]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Stack & expertise */}
            <Section id="stack">
              <SectionHead n="05" label="What it's built on" />
              <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Stack &amp; expertise</h2>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-black/12 bg-white/70 px-4 py-2 text-sm font-medium text-[#3c3933]">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill) => (
                  <span key={skill} className="rounded-full bg-[#161514] px-4 py-2 text-sm font-medium text-[#f5f3ee]">
                    {skill}
                  </span>
                ))}
              </div>
            </Section>

            {/* Light contact CTA */}
            <section className="relative overflow-hidden rounded-[2rem] bg-[#161514] p-8 text-[#f5f3ee] sm:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: `${CORAL}55` }} aria-hidden="true" />
              <div className="relative">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8503a]">Let&rsquo;s work together</p>
                <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Need something like Menu QR built — or taken further?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#bdb6ab]">
                  I partner with founders and small teams to ship production software, start to finish. Tell me what you&rsquo;re building.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href="/#contact"
                    onClick={() => trackEvent('project_cta_click', { project: 'menu-qr', action: 'contact' })}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#e8503a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#f5f3ee] hover:text-[#161514]"
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
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('contact_click', { project: 'menu-qr', method: 'whatsapp' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
                  >
                    WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                {nextProject && (
                  <div className="mt-10 border-t border-white/12 pt-6">
                    <Link
                      href={`/work/${nextProject.slug}`}
                      onClick={() => trackEvent('project_cta_click', { project: 'menu-qr', action: 'next_project' })}
                      className="group inline-flex items-center gap-3 text-sm text-[#bdb6ab] transition hover:text-white"
                    >
                      <span className="uppercase tracking-[0.24em] text-[#8a847b]">Next case study</span>
                      <span className="font-semibold text-white">{tNext.title}</span>
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}
              </div>
            </section>
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
      <span className="rounded-md bg-[#e8503a] px-2.5 py-1 font-mono text-xs font-bold text-white">{n}</span>
      <p className="text-xs uppercase tracking-[0.3em] text-[#9a948b]">{label}</p>
    </div>
  );
}

function BentoCard({ icon: Icon, title, copy }: { icon: typeof QrCode; title: string; copy: string }) {
  return (
    <div className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      <div className="mb-5 inline-flex rounded-2xl bg-[#f5f3ee] p-3 text-[#161514]"><Icon className="h-5 w-5" /></div>
      <h3 className="text-base font-semibold text-[#161514]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#6b665f]">{copy}</p>
    </div>
  );
}
