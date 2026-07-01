'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Palette,
  Shirt,
  Store,
  ShieldCheck,
  Layers,
  Sparkles,
  Database,
  Boxes,
  CheckCircle2,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';
import { ProductFigure, ScrubCanvas } from './canvas-widgets';

const EMAIL = 'contact@benarfa.com';
const WHATSAPP = 'https://wa.me/21622633345';
const ACCENT = '#c41e6b';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'roles', label: 'Roles' },
  { id: 'canvas', label: 'Canvas editor' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'stack', label: 'Stack' },
];

const roles = [
  {
    title: 'Designer',
    copy: 'Uploads original artwork, prices designs, and sells directly into the marketplace.',
    icon: Palette,
    featured: true,
  },
  {
    title: 'Fashion Designer',
    copy: 'Turns garment concepts into production-ready templates in a specialised workspace.',
    icon: Shirt,
    featured: false,
  },
  {
    title: 'Brand',
    copy: 'Browses the catalogue, customises products in the canvas editor, and places orders.',
    icon: Store,
    featured: false,
  },
  {
    title: 'Admin',
    copy: 'Moderates listings, manages users, and oversees creator payouts across the ecosystem.',
    icon: ShieldCheck,
    featured: false,
  },
];

const canvasFeatures = [
  {
    icon: Layers,
    title: 'Multi-layer canvas',
    copy: 'Fabric.js and React-Konva place artwork across print areas with drag, scale, and rotate — all client-side.',
  },
  {
    icon: Sparkles,
    title: 'AI-assisted generation',
    copy: 'Designers can generate starting artwork with AI or upload their own — both feed the same pipeline.',
  },
];

export default function DTalkProjectPage() {
  const t = PROJECT_CONTENT['dtalk-ecosystem'];
  const project = PROJECTS.find((p) => p.slug === 'dtalk-ecosystem');
  const nextProject = PROJECTS.find((p) => p.slug === 'autopart');
  const tNext = PROJECT_CONTENT.autopart;
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

  const frontendTech = project.tech.filter((x) => ['Next.js', 'React', 'TypeScript', 'Tailwind'].some((n) => x.includes(n)));
  const dataTech = project.tech.filter((x) => ['Zustand', 'TanStack Query', 'Konva'].some((n) => x.includes(n)));
  const platformTech = project.tech.filter((x) => ['shadcn', 'Zod'].some((n) => x.includes(n)));

  return (
    <div className="min-h-screen overflow-hidden bg-[#faf7f4] text-[#1c1917] selection:bg-[#c41e6b]/20">
      <motion.div className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#c41e6b]" style={{ scaleX }} />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full bg-[#c41e6b]/6 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-[#1c1917]/4 blur-3xl" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-black/8 bg-[#faf7f4]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 rounded-full border border-black/12 bg-white/60 px-3 py-2 text-xs font-medium text-[#6b6560] transition hover:border-[#c41e6b]/40 hover:text-[#1c1917]"
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
                  activeSection === item.id ? 'bg-[#1c1917] text-[#faf7f4]' : 'text-[#6b6560] hover:text-[#1c1917]'
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
              className="group flex items-center gap-2 rounded-full bg-[#1c1917] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#c41e6b] sm:px-4"
            >
              <span className="hidden sm:inline">Live demo</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </nav>

      <main className="relative z-10">
        <header className="relative px-4 pt-28 sm:px-6 lg:pt-36">
          <motion.div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]" style={{ y: heroY }}>
            <section className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-6 flex flex-wrap items-center gap-3"
              >
                <span className="rounded-full bg-[#c41e6b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#a01855]">
                  {t.category}
                </span>
                <span className="font-mono text-xs text-[#9a948b]">demo.d-talk.co</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="font-serif text-5xl font-medium leading-[1.02] tracking-tight text-[#1c1917] sm:text-7xl"
              >
                Fashion commerce,
                <br />
                <span className="italic text-[#c41e6b]">one canvas.</span>
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
                  onClick={() => scrollTo('canvas')}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1c1917] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c41e6b]"
                >
                  See the canvas editor
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
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
              <div className="absolute -inset-5 rounded-[3rem] bg-linear-to-br from-[#c41e6b]/10 to-[#1c1917]/5 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-2.5 shadow-2xl shadow-black/10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#f0ebe6]">
                  {!imageError ? (
                    <Image
                      src="/dtalk-hero.webp"
                      alt="D-Talk landing page — designer marketplace hero"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                      priority
                      quality={92}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Palette className="h-12 w-12 text-[#c41e6b]" />
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          </motion.div>

          <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-black/10 py-5 text-xs uppercase tracking-[0.2em] text-[#6b6560]">
            {['4 role-specific dashboards', 'Fabric.js + Konva canvas', 'EN / FR bilingual', 'Lighthouse scores >90'].map((x) => (
              <span key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c41e6b]" /> {x}
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
                      activeSection === item.id ? 'translate-x-1 font-medium text-[#c41e6b]' : 'text-[#9a948b] hover:text-[#1c1917]'
                    }`}
                  >
                    {activeSection === item.id && (
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#c41e6b] align-middle" />
                    )}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <article className="space-y-28">
            <Section id="overview">
              <SectionHead n="01" label={t.subtitle} />
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1c1917] sm:text-5xl">
                    Four roles, one creative commerce loop.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-[#54504a]">{t.longDescription}</p>
                </div>
                <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl bg-[#c41e6b]/10 p-3 text-[#a01855]"><Store className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">The problem</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#6b6560]">{t.problem}</p>
                  <div className="my-6 h-px bg-black/10" />
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl bg-[#1c1917]/8 p-3 text-[#1c1917]"><Layers className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">The answer</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#6b6560]">{t.solution}</p>
                </div>
              </div>

              <div className="mt-12">
                <ScrubCanvas
                  src="/dtalk-landing-full.webp"
                  alt="D-Talk Ecosystem landing page, full length"
                  dims={{ width: 1440, height: 7798 }}
                  caption="The whole ecosystem, top to bottom — hover to explore"
                />
              </div>
            </Section>

            <Section id="roles">
              <SectionHead n="02" label="Every side of the marketplace" />
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Roles &amp; dashboards</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  if (r.featured) {
                    return (
                      <div
                        key={r.title}
                        className="flex flex-col justify-between rounded-[1.75rem] bg-[#1c1917] p-7 text-[#faf7f4] md:col-span-2 md:flex-row md:items-end md:gap-8"
                      >
                        <div className="max-w-lg">
                          <div className="mb-5 inline-flex rounded-2xl bg-white/10 p-3 text-[#f472b6]">
                            <Icon className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-semibold">{r.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-[#bdb6ab]">{r.copy}</p>
                        </div>
                        <span className="mt-6 font-mono text-sm text-[#6b6560] md:mt-0">Primary seller role</span>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={r.title}
                      className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                    >
                      <div className="mb-5 inline-flex rounded-2xl bg-[#faf7f4] p-3 text-[#1c1917]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-[#1c1917]">{r.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6b6560]">{r.copy}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <ProductFigure
                  src="/dtalk-about-us.webp"
                  alt="D-Talk Ecosystem about page"
                  dims={{ width: 1440, height: 900 }}
                  caption="About the platform — who D-Talk is for"
                />
              </div>
            </Section>

            <Section id="canvas">
              <SectionHead n="03" label="Where the design happens" />
              <h2 className="mb-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Real-time canvas customizer</h2>
              <p className="mb-8 max-w-2xl text-lg leading-8 text-[#54504a]">
                The centrepiece is a browser-based editor that lets brands place artwork across multiple print areas on a garment — with a live preview that always matches what ships.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {canvasFeatures.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.title}
                      className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                    >
                      <div className="mb-5 inline-flex rounded-2xl bg-[#faf7f4] p-3 text-[#c41e6b]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-[#1c1917]">{c.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6b6560]">{c.copy}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <ProductFigure
                  src="/dtalk-ai.webp"
                  alt="D-Talk Ecosystem AI-assisted design generation"
                  dims={{ width: 1440, height: 900 }}
                  aspectClassName="aspect-[16/9]"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  caption="AI-assisted design generation"
                />
              </div>
            </Section>

            <Section id="commerce">
              <SectionHead n="04" label="Selling, securely" />
              <h2 className="mb-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Commerce &amp; authentication</h2>
              <p className="mb-8 max-w-2xl text-lg leading-8 text-[#54504a]">
                Beyond the canvas, D-Talk runs a full storefront loop — cart, favourites, checkout, and creator payouts — locked behind stateless, role-aware authentication.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <ProductFigure
                  src="/dtalk-service.webp"
                  alt="D-Talk Ecosystem services page"
                  dims={{ width: 1440, height: 900 }}
                  caption="Ecosystem services"
                />
                <ProductFigure
                  src="/dtalk-auth.webp"
                  alt="D-Talk Ecosystem authentication flow"
                  dims={{ width: 1440, height: 900 }}
                  caption="Secure authentication flow"
                />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.keyFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/60 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#c41e6b]" />
                    <span className="text-sm leading-6 text-[#54504a]">{feat}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="stack">
              <SectionHead n="05" label="What it's built on" />
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Technology stack</h2>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-black/12 bg-white/70 px-4 py-2 text-sm font-medium text-[#3c3933]">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <TechColumn title="Frontend" icon={<Layers className="h-5 w-5" />} items={frontendTech} />
                <TechColumn title="Interaction & Data" icon={<Database className="h-5 w-5" />} items={dataTech} />
                <TechColumn title="UI & Validation" icon={<Boxes className="h-5 w-5" />} items={platformTech} />
              </div>
              <p className="mt-6 flex items-center gap-3 rounded-2xl border border-black/10 bg-white/60 p-5 text-sm text-[#54504a]">
                <Layers className="h-5 w-5 shrink-0 text-[#c41e6b]" />
                Client-side canvas rendering via Fabric.js and React-Konva, with TanStack Query keeping server state fresh across all four dashboards.
              </p>
            </Section>

            <section className="relative overflow-hidden rounded-[2rem] bg-[#1c1917] p-8 text-[#faf7f4] sm:p-12">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
                style={{ backgroundColor: `${ACCENT}55` }}
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#f472b6]">Let&rsquo;s work together</p>
                <h2 className="mt-5 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                  Need something like the D-Talk Ecosystem built — or taken further?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#bdb6ab]">
                  I partner with founders and small teams to ship production software, start to finish. Tell me what you&rsquo;re building.
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
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('contact_click', { project: 'dtalk-ecosystem', method: 'whatsapp' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                  >
                    WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                {nextProject && (
                  <div className="mt-10 border-t border-white/12 pt-6">
                    <Link
                      href={`/work/${nextProject.slug}`}
                      onClick={() => trackEvent('project_cta_click', { project: 'dtalk-ecosystem', action: 'next_project' })}
                      className="group inline-flex items-center gap-3 text-sm text-[#bdb6ab] transition hover:text-white"
                    >
                      <span className="uppercase tracking-[0.24em] text-[#6b6560]">Next case study</span>
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
      <span className="rounded-md bg-[#c41e6b] px-2.5 py-1 font-serif text-xs font-bold text-white">{n}</span>
      <p className="text-xs uppercase tracking-[0.3em] text-[#9a948b]">{label}</p>
    </div>
  );
}

function TechColumn({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/60 p-5">
      <div className="mb-4 flex items-center gap-3 text-[#c41e6b]">
        <div className="rounded-2xl bg-[#faf7f4] p-3">{icon}</div>
        <h3 className="font-semibold text-[#1c1917]">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-[#54504a]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
