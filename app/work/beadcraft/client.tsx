'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Hand,
  Share2,
  PackageCheck,
  LayoutGrid,
  Truck,
  ShieldCheck,
  Boxes,
  Languages,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';

const EMAIL = 'contact@benarfa.com';
const WHATSAPP = 'https://wa.me/21622633345';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'configurator', label: 'The Configurator' },
  { id: 'collections', label: 'Collections' },
  { id: 'dashboard', label: 'Crafter Dashboard' },
  { id: 'stack', label: 'Stack' },
];

const stats = [
  { label: 'Surfaces', value: 'Two', detail: 'Storefront + crafter dashboard' },
  { label: 'Languages', value: 'EN / FR', detail: 'Bilingual, TND pricing' },
  { label: 'Delivery', value: '24', detail: 'Tunisian wilayas' },
];

const pipeline = ['New', 'Confirmed', 'In Production', 'Shipped', 'Delivered'];

const dashboardCards = [
  { title: 'Inventory', copy: 'A bead inventory grid and detail drawer keep stock and low-stock flags in view.', icon: Boxes },
  { title: 'Orders', copy: 'Each custom order becomes a tracked job moving through a five-stage pipeline.', icon: PackageCheck },
  { title: 'Shipping', copy: 'A per-wilaya fee editor sets delivery pricing across all 24 governorates.', icon: Truck },
  { title: 'Overview', copy: 'KPIs, top beads, and a wilaya breakdown give the crafter an at-a-glance read.', icon: LayoutGrid },
];

const collections = [
  { src: '/beadcraft-collection-medina.webp', alt: 'Medina collection beads' },
  { src: '/beadcraft-designs.webp', alt: 'Ready-made bracelet designs' },
  { src: '/beadcraft-collection-sahara.webp', alt: 'Sahara collection beads' },
];

export default function BeadCraftProjectPage() {
  const t = PROJECT_CONTENT.beadcraft;
  const project = PROJECTS.find((p) => p.slug === 'beadcraft');
  const nextProject = PROJECTS.find((p) => p.slug === 'menu-qr');
  const tNext = PROJECT_CONTENT['menu-qr'];
  const [imageError, setImageError] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '14%']);

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

  const frontendTech = project.tech.filter((x) => ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Zustand'].some((n) => x.includes(n)));
  const dataTech = project.tech.filter((x) => ['PostgreSQL', 'Prisma', 'Auth.js', 'Zod'].some((n) => x.includes(n)));
  const platformTech = project.tech.filter((x) => ['Bun'].some((n) => x.includes(n)));

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8f2e7] text-[#2a2320] selection:bg-[#b8503a]/20">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-[#b8503a] via-[#c98a3a] to-[#2f3e6b]"
        style={{ scaleX }}
      />

      {/* atmosphere: warm wash */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full bg-[#b8503a]/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-[#2f3e6b]/6 blur-3xl" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-[#2a2320]/10 bg-[#f8f2e7]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 rounded-full border border-[#2a2320]/15 bg-white/50 px-3 py-2 text-xs font-medium text-[#5b524c] transition hover:border-[#b8503a]/40 hover:text-[#2a2320]"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-[#2a2320]/12 bg-white/60 p-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-full px-3 py-1.5 text-xs transition ${
                  activeSection === item.id ? 'bg-[#b8503a] text-[#f8f2e7]' : 'text-[#7a6f67] hover:text-[#2a2320]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <span className="font-serif text-sm italic text-[#7a6f67]">{project.year}</span>
        </div>
      </nav>

      <main className="relative z-10">
        <header className="relative px-4 pt-28 sm:px-6 lg:pt-36">
          <motion.div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]" style={{ y: heroY }}>
            <section className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-6 flex flex-wrap items-center gap-3"
              >
                <span className="rounded-full border border-[#b8503a]/30 bg-[#b8503a]/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-[#a8472f]">
                  {t.category}
                </span>
                <span className="font-serif text-sm italic text-[#7a6f67]">Bead·Craft · بيد كرافت</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="font-serif text-5xl font-medium leading-[1.02] tracking-tight text-[#2a2320] sm:text-7xl"
              >
                One bracelet,
                <br />
                <span className="italic text-[#b8503a]">your story.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-[#5b524c]"
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
                  onClick={() => scrollTo('configurator')}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#b8503a] px-6 py-3 text-sm font-semibold text-[#f8f2e7] transition hover:bg-[#a8472f]"
                >
                  See the configurator
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
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
            </section>

            <motion.section
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-[3rem] bg-linear-to-br from-[#b8503a]/15 via-[#c98a3a]/10 to-[#2f3e6b]/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-[#2a2320]/12 bg-white p-2.5 shadow-2xl shadow-[#2a2320]/10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#f1e9da]">
                  {!imageError ? (
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt="BeadCraft Studio storefront"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                      priority
                      quality={92}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Sparkles className="h-12 w-12 text-[#b8503a]" />
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          </motion.div>

          {/* bead-strand trust strip */}
          <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-[#2a2320]/10 py-5 text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
            {['Handcrafted in Tunis', 'Made to order', 'Ships in 3–5 days', '24 governorates'].map((x) => (
              <span key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b8503a]" /> {x}
              </span>
            ))}
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-5 text-xs uppercase tracking-[0.3em] text-[#9a8f86]">Contents</div>
              <nav className="space-y-2 border-l border-[#2a2320]/12 pl-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block text-left text-sm transition ${
                      activeSection === item.id ? 'translate-x-1 text-[#b8503a]' : 'text-[#9a8f86] hover:text-[#2a2320]'
                    }`}
                  >
                    {activeSection === item.id && (
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#b8503a] align-middle" />
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
                  <h2 className="font-serif text-4xl font-medium tracking-tight text-[#2a2320] sm:text-5xl">
                    Turning a maker&rsquo;s craft into a product.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-[#5b524c]">{t.longDescription}</p>
                </div>
                <div className="rounded-[2rem] border border-[#2a2320]/12 bg-white/60 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl bg-[#b8503a]/10 p-3 text-[#b8503a]"><Hand className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">The problem</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#6b615a]">{t.problem}</p>
                  <div className="my-6 h-px bg-[#2a2320]/10" />
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl bg-[#2f3e6b]/10 p-3 text-[#2f3e6b]"><Sparkles className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">The answer</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#6b615a]">{t.solution}</p>
                </div>
              </div>
            </Section>

            {/* Configurator */}
            <Section id="configurator">
              <SectionHead n="02" label="Make it feel tactile, not technical" />
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">The configurator</h2>
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <figure className="overflow-hidden rounded-[1.75rem] border border-[#2a2320]/12 bg-white shadow-xl shadow-[#2a2320]/5">
                  <div className="relative aspect-[16/10]">
                    <Image src="/beadcraft-configurator.webp" alt="BeadCraft bracelet configurator" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" />
                  </div>
                </figure>
                <div>
                  <p className="text-lg leading-8 text-[#5b524c]">
                    Customers pick a piece, then build it bead by bead — choosing beads, cord, and charm with a live 2D preview in curved, flat, or grid layouts. Every choice updates a Zustand store, and finished designs can be saved, shared by link, and reordered.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      { icon: Sparkles, label: 'Live 2D preview' },
                      { icon: Share2, label: 'Shareable designs' },
                      { icon: Languages, label: 'EN / FR storefront' },
                      { icon: ShieldCheck, label: 'Idempotent checkout' },
                    ].map((f) => {
                      const Icon = f.icon;
                      return (
                        <div key={f.label} className="flex items-center gap-3 rounded-2xl border border-[#2a2320]/12 bg-white/60 px-4 py-3 text-sm text-[#5b524c]">
                          <Icon className="h-4 w-4 text-[#b8503a]" /> {f.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Section>

            {/* Collections */}
            <Section id="collections">
              <SectionHead n="03" label="A palette rooted in place" />
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Collections &amp; designs</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {collections.map((img, i) => (
                  <figure
                    key={img.src}
                    className={`overflow-hidden rounded-[1.5rem] border border-[#2a2320]/12 bg-white shadow-lg shadow-[#2a2320]/5 ${i === 1 ? 'sm:mt-8' : ''}`}
                  >
                    <div className="relative aspect-[4/5]">
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    </div>
                  </figure>
                ))}
              </div>
              <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-lg italic text-[#7a6f67]">
                Collection names and bead colours are drawn from Tunisian places and motifs — Medina, Sahara, Sidi Bou — so the catalogue reads as local, not generic.
              </p>
            </Section>

            {/* Dashboard */}
            <Section id="dashboard">
              <SectionHead n="04" label="The operational side" />
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Crafter dashboard</h2>

              {/* pipeline */}
              <div className="mb-6 flex flex-wrap items-center gap-2 rounded-[1.5rem] border border-[#2a2320]/12 bg-white/60 p-5">
                {pipeline.map((stage, i) => (
                  <div key={stage} className="flex items-center gap-2">
                    <span className="rounded-full bg-[#2f3e6b]/8 px-3 py-1.5 text-xs font-medium text-[#2f3e6b]">{stage}</span>
                    {i < pipeline.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-[#b8503a]" />}
                  </div>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {dashboardCards.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.title} className="rounded-[1.5rem] border border-[#2a2320]/12 bg-white/60 p-6 transition hover:-translate-y-1 hover:bg-white">
                      <div className="mb-5 inline-flex rounded-2xl bg-[#b8503a]/10 p-3 text-[#b8503a]"><Icon className="h-5 w-5" /></div>
                      <h3 className="text-base font-semibold text-[#2a2320]">{c.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6b615a]">{c.copy}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.keyFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-3 rounded-2xl border border-[#2a2320]/12 bg-white/50 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8503a]" />
                    <span className="text-sm leading-6 text-[#5b524c]">{feat}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Stack */}
            <Section id="stack">
              <SectionHead n="05" label="What it's built on" />
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Technology stack</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {[stats[0], stats[1], stats[2]].map((s) => (
                  <div key={s.label} className="rounded-[1.5rem] border border-[#2a2320]/12 bg-white/60 p-5">
                    <div className="font-serif text-3xl text-[#b8503a]">{s.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[#9a8f86]">{s.label}</div>
                    <div className="mt-1 text-sm text-[#6b615a]">{s.detail}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-3">
                <TechColumn title="Frontend" items={frontendTech} />
                <TechColumn title="Data & Auth" items={dataTech} />
                <TechColumn title="Runtime" items={platformTech} />
              </div>
            </Section>

            {/* Warm contact CTA (light-themed, same funnel events) */}
            <section className="relative overflow-hidden rounded-[2rem] border border-[#2a2320]/12 bg-linear-to-br from-white to-[#f1e9da] p-8 sm:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#b8503a]/15 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#a8472f]">Let&rsquo;s work together</p>
                <h2 className="mt-5 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight text-[#2a2320] sm:text-4xl">
                  Need something like BeadCraft built — or taken further?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#5b524c]">
                  I partner with founders and small teams to ship production software, start to finish. Tell me what you&rsquo;re building.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('contact_click', { project: 'beadcraft', method: 'whatsapp' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2a2320]/20 bg-white/70 px-6 py-3 text-sm font-semibold text-[#2a2320] transition hover:bg-white"
                  >
                    WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                {nextProject && (
                  <div className="mt-10 border-t border-[#2a2320]/12 pt-6">
                    <Link
                      href={`/work/${nextProject.slug}`}
                      onClick={() => trackEvent('project_cta_click', { project: 'beadcraft', action: 'next_project' })}
                      className="group inline-flex items-center gap-3 text-sm text-[#7a6f67] transition hover:text-[#2a2320]"
                    >
                      <span className="uppercase tracking-[0.24em] text-[#9a8f86]">Next case study</span>
                      <span className="font-semibold text-[#2a2320]">{tNext.title}</span>
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
      <span className="rounded-md bg-[#b8503a] px-2.5 py-1 font-serif text-xs font-bold text-[#f8f2e7]">{n}</span>
      <p className="text-xs uppercase tracking-[0.3em] text-[#9a8f86]">{label}</p>
    </div>
  );
}

function TechColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[2rem] border border-[#2a2320]/12 bg-white/60 p-5">
      <h3 className="mb-4 font-semibold text-[#2a2320]">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-[#2a2320]/10 bg-white/70 px-4 py-3 text-sm text-[#5b524c]">{item}</div>
        ))}
      </div>
    </div>
  );
}
