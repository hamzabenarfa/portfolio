'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  Users,
  CheckCircle2,
  Eye,
  Crosshair,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';
import { FrameTag, ScrubCanvas, TiltFrame } from './canvas-widgets';

const EMAIL = 'contact@benarfa.com';
const WHATSAPP = 'https://wa.me/21622633345';

const layerItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'roles', label: 'Roles & Dashboards' },
  { id: 'canvas', label: 'Canvas Editor' },
  { id: 'commerce', label: 'Commerce & Auth' },
  { id: 'stack', label: 'Stack' },
];

const roles = [
  { title: 'Designer', copy: 'Uploads original artwork and print-ready designs, prices them, and sells directly into the marketplace.', icon: Palette },
  { title: 'Fashion Designer', copy: 'A specialised workspace for turning garment concepts into sellable, production-ready templates.', icon: Shirt },
  { title: 'Brand', copy: 'Browses the catalogue, drops designs onto real garments in the canvas editor, and places customised orders.', icon: Store },
  { title: 'Admin', copy: 'Oversees users, moderates listings, and manages creator payouts across the whole ecosystem.', icon: ShieldCheck },
];

const canvasHighlights = [
  { title: 'Canvas engine', copy: 'Fabric.js and React-Konva drive multi-layer artwork placement across print areas, with drag, scale, and rotate handled client-side.', icon: Layers },
  { title: 'AI-assisted generation', copy: 'Designers can generate starting artwork with AI assistance or upload their own — both feed the same canvas pipeline.', icon: Sparkles },
];

const printLayers = ['Sleeve', 'Back panel', 'Front panel'];

export default function DTalkProjectPage() {
  const t = PROJECT_CONTENT['dtalk-ecosystem'];
  const project = PROJECTS.find((p) => p.slug === 'dtalk-ecosystem');
  const nextProject = PROJECTS.find((p) => p.slug === 'autopart');
  const tNext = PROJECT_CONTENT.autopart;
  const [activeSection, setActiveSection] = useState(layerItems[0].id);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '16%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.35]);
  const zoomValue = useTransform(scrollYProgress, [0, 1], [100, 480]);
  const zoomLabel = useTransform(zoomValue, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const handleScroll = () => {
      let current = layerItems[0].id;
      for (const item of layerItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 260) current = item.id;
      }
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        current = layerItems[layerItems.length - 1].id;
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
    <div className="min-h-screen overflow-hidden bg-[#131114] text-zinc-100 selection:bg-[#FF3D82]/30">
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#131114]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 border border-white/15 bg-white/[0.03] px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] text-zinc-400 transition hover:border-[#FF3D82]/50 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          <div className="hidden items-center gap-2 border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[11px] text-zinc-500 md:flex">
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#FF3D82]" aria-hidden="true" />
            D-Talk<span className="text-zinc-700">.</span>canvas
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1.5 font-mono text-[11px] text-zinc-500 sm:flex" aria-hidden="true">
              <Crosshair className="h-3.5 w-3.5 text-[#FF3D82]" />
              <motion.span className="tabular-nums text-zinc-300">{zoomLabel}</motion.span>
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-[#FF3D82] px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[#131114] transition hover:bg-[#ff5b95] sm:px-4"
              >
                <span className="hidden sm:inline">Live demo</span>
                <span className="sm:hidden">Live</span>
                <ExternalLink className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <header className="relative px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[22px_22px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
            <div className="absolute left-1/2 top-16 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#FF3D82]/10 blur-[110px]" />
          </div>

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
                <span className="border border-[#FF3D82]/30 bg-[#FF3D82]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff7aa8]">
                  {t.category}
                </span>
                <span className="font-mono text-xs text-zinc-500">Fabric.js · Konva · Layer 01/05</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-5xl font-black uppercase leading-[0.86] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl"
              >
                D‑Talk<span className="text-[#FF3D82]">.</span>
                <br />
                Ecosystem
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
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
                  className="group inline-flex items-center justify-center gap-2 bg-[#FF3D82] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#131114] transition hover:bg-[#ff5b95]"
                >
                  Open the canvas editor
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-white/15 bg-white/[0.03] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:border-[#FF3D82]/50 hover:bg-white/[0.06]"
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
            >
              <TiltFrame
                index="F00"
                name="Cover"
                src={project.image || '/dtalk.webp'}
                alt="D-Talk Ecosystem cover"
                dims={{ width: 1080, height: 1080 }}
                aspectClassName="aspect-square"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.section>
          </motion.div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                <span>Layers</span>
                <span className="text-zinc-700">{layerItems.length}</span>
              </div>
              <nav className="border border-white/10">
                {layerItems.map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`flex w-full items-center gap-2.5 border-b border-white/10 px-3 py-2.5 text-left text-[13px] transition last:border-b-0 ${
                        isActive ? 'bg-[#FF3D82]/10 text-white' : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300'
                      }`}
                    >
                      <Eye className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-[#FF3D82]' : 'text-zinc-700'}`} />
                      <span
                        className={`h-2 w-2 shrink-0 border ${
                          isActive ? 'border-[#FF3D82] bg-[#FF3D82]' : 'border-zinc-700 bg-transparent'
                        }`}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      <span className="font-mono text-[10px] text-zinc-700">{String(i + 1).padStart(2, '0')}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <article className="space-y-28">
            {/* Overview */}
            <Section id="overview">
              <FrameTag index="01" name={t.subtitle} />
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Four roles, one creative commerce loop.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-zinc-400">{t.longDescription}</p>
                </div>
                <div className="border border-white/10 bg-white/[0.03] p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="border border-[#FF3D82]/30 bg-[#FF3D82]/10 p-3 text-[#FF3D82]"><Users className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold text-white">The problem</h3>
                  </div>
                  <p className="text-sm leading-7 text-zinc-400">{t.problem}</p>
                  <div className="my-6 h-px bg-white/10" />
                  <div className="mb-5 flex items-center gap-3">
                    <div className="border border-[#CBFF4D]/30 bg-[#CBFF4D]/10 p-3 text-[#CBFF4D]"><Layers className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold text-white">The answer</h3>
                  </div>
                  <p className="text-sm leading-7 text-zinc-400">{t.solution}</p>
                </div>
              </div>

              <div className="mt-12">
                <ScrubCanvas
                  index="F01"
                  name="Landing — full capture"
                  src="/dtalk-landing-full.webp"
                  alt="D-Talk Ecosystem landing page, full length"
                  dims={{ width: 1440, height: 7798 }}
                  caption="The whole ecosystem, top to bottom — scrub to explore"
                />
              </div>
            </Section>

            {/* Roles & Dashboards */}
            <Section id="roles">
              <FrameTag index="02" name="Every side of the marketplace" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Roles & dashboards</h2>
              <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {roles.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.title} className="group relative bg-[#131114] p-6 transition hover:bg-white/[0.03]">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="border border-white/10 bg-black/30 p-2.5 text-[#FF3D82] transition group-hover:border-[#FF3D82]/40">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-[10px] text-zinc-700">R{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="text-base font-semibold text-white">{r.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{r.copy}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <TiltFrame
                  index="F02"
                  name="About the platform"
                  src="/dtalk-about-us.webp"
                  alt="D-Talk Ecosystem about page"
                  dims={{ width: 1440, height: 900 }}
                  caption="About the platform — who D-Talk is for"
                />
              </div>
            </Section>

            {/* Canvas Editor */}
            <Section id="canvas">
              <FrameTag index="03" name="Where the design happens" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Real-time canvas customizer</h2>
              <p className="mb-8 text-lg leading-8 text-zinc-400">
                The centrepiece is a real-time canvas editor that lets brands place artwork across multiple print areas on a garment, with a live preview that always matches what ships.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {canvasHighlights.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.title}
                      className="border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#FF3D82]/30 hover:bg-white/[0.05]"
                    >
                      <div className="mb-5 inline-flex border border-white/10 bg-black/30 p-2.5 text-[#FF3D82]"><Icon className="h-5 w-5" /></div>
                      <h3 className="text-base font-semibold text-white">{c.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{c.copy}</p>
                    </div>
                  );
                })}
              </div>

              {/* compact layer-stack: print-area layers cascading — a small, literal nod to
                  Fabric.js/Konva's multi-layer artwork placement, distinct from a full diagram */}
              <div className="relative mt-8 flex h-40 items-center justify-center border border-white/10 bg-white/[0.02]" aria-hidden="true">
                <div className="relative h-10 w-44 sm:w-64">
                  {printLayers.map((label, i) => (
                    <div
                      key={label}
                      className="absolute inset-0 flex items-center justify-between border border-dashed border-white/20 bg-[#131114] px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                      style={{ transform: `translate(${i * 14}px, ${i * -12}px) rotate(${(i - 1) * 2.4}deg)`, zIndex: i }}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">{label}</span>
                      <span className={`h-2 w-2 shrink-0 border ${i === 2 ? 'border-[#FF3D82] bg-[#FF3D82]' : 'border-zinc-600'}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <TiltFrame
                  index="F03"
                  name="AI-assisted design generation"
                  src="/dtalk-ai.webp"
                  alt="D-Talk Ecosystem AI-assisted design generation"
                  dims={{ width: 1440, height: 900 }}
                  aspectClassName="aspect-[16/9]"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  caption="AI-assisted design generation"
                />
              </div>
            </Section>

            {/* Commerce & Auth */}
            <Section id="commerce">
              <FrameTag index="04" name="Selling, securely" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Commerce & authentication</h2>
              <p className="mb-8 text-lg leading-8 text-zinc-400">
                Beyond the canvas, D-Talk runs a full storefront loop — cart, favourites, checkout, and an earnings and withdrawal system for creators — locked behind stateless, role-aware authentication.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <TiltFrame
                  index="F04"
                  name="Ecosystem services"
                  src="/dtalk-service.webp"
                  alt="D-Talk Ecosystem services page"
                  dims={{ width: 1440, height: 900 }}
                  caption="Ecosystem services"
                />
                <TiltFrame
                  index="F05"
                  name="Authentication flow"
                  src="/dtalk-auth.webp"
                  alt="D-Talk Ecosystem authentication flow"
                  dims={{ width: 1440, height: 900 }}
                  caption="Secure authentication flow"
                />
              </div>
              <div className="mt-6 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                {t.keyFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-3 bg-[#131114] p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3D82]" />
                    <span className="text-sm leading-6 text-zinc-300">{feat}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Stack */}
            <Section id="stack">
              <FrameTag index="05" name="What it's built on" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Technology stack</h2>
              <div className="grid gap-5 md:grid-cols-3">
                <TechColumn title="Frontend" icon={<Layers className="h-5 w-5" />} items={frontendTech} />
                <TechColumn title="Interaction & Data" icon={<Database className="h-5 w-5" />} items={dataTech} />
                <TechColumn title="UI & Validation" icon={<Boxes className="h-5 w-5" />} items={platformTech} />
              </div>
              <p className="mt-6 flex items-center gap-3 border border-white/10 bg-white/[0.02] p-5 text-sm text-zinc-400">
                <Layers className="h-5 w-5 shrink-0 text-[#FF3D82]" />
                Client-side canvas rendering via Fabric.js and React-Konva, with TanStack Query keeping server state fresh across all four dashboards.
              </p>
            </Section>

            {/* Contact CTA — bespoke, matching this page's frame/mono language rather than the shared dark CTA */}
            <section className="relative overflow-hidden border border-dashed border-white/15 bg-white/[0.03] p-8 sm:p-12">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF3D82]/15 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <FrameTag index="06" name="Let's work together" />
                <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                  Need something like the D-Talk Ecosystem built — or taken further?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
                  I partner with founders and small teams to ship production software, start to finish. Tell me what you&rsquo;re building.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href="/#contact"
                    onClick={() => trackEvent('project_cta_click', { project: 'dtalk-ecosystem', action: 'contact' })}
                    className="group inline-flex items-center justify-center gap-2 bg-[#FF3D82] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#131114] transition hover:bg-[#ff5b95]"
                  >
                    Start a project
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={`mailto:${EMAIL}`}
                    onClick={() => trackEvent('contact_click', { project: 'dtalk-ecosystem', method: 'email' })}
                    className="inline-flex items-center justify-center gap-2 border border-white/15 bg-white/[0.03] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:border-[#FF3D82]/40 hover:bg-white/[0.06]"
                  >
                    Email me
                  </a>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('contact_click', { project: 'dtalk-ecosystem', method: 'whatsapp' })}
                    className="inline-flex items-center justify-center gap-2 border border-white/15 bg-white/[0.03] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:border-[#FF3D82]/40 hover:bg-white/[0.06]"
                  >
                    WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                {nextProject && (
                  <div className="mt-10 border-t border-dashed border-white/15 pt-6">
                    <Link
                      href={`/work/${nextProject.slug}`}
                      onClick={() => trackEvent('project_cta_click', { project: 'dtalk-ecosystem', action: 'next_project' })}
                      className="group inline-flex items-center gap-3 font-mono text-sm text-zinc-400 transition hover:text-white"
                    >
                      <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-600">Next case study</span>
                      <span className="font-semibold text-zinc-200">{tNext.title}</span>
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

function TechColumn({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div className="border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex items-center gap-3 text-[#FF3D82]">
        <div className="border border-white/10 bg-black/30 p-3">{icon}</div>
        <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-white">{title}</h3>
      </div>
      <div className="border border-white/10 bg-white/10">
        <div className="space-y-px">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2 bg-[#131114] px-4 py-3 text-sm text-zinc-300">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF3D82]/50" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
