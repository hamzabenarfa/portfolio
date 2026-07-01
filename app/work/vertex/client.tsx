'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Boxes,
  Cpu,
  Database,
  ShoppingBag,
  CreditCard,
  Heart,
  LayoutDashboard,
  Users,
  Mail,
  ShieldCheck,
  Code2,
  CheckCircle2,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { ProjectContactCTA } from '@/components/fx/project-contact-cta';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'storefront', label: 'Storefront' },
  { id: 'admin', label: 'Admin' },
  { id: 'stack', label: 'Stack' },
];

const layers = [
  { name: 'Presentation', dirs: 'app/ · components/ · hooks/', copy: 'App Router pages, UI primitives, and view logic.', icon: ShoppingBag },
  { name: 'Application', dirs: 'actions/ · use-cases/', copy: 'Server actions orchestrate use-cases — the app’s verbs.', icon: Cpu },
  { name: 'Domain', dirs: 'entities/ · repositories/', copy: 'Business entities and repository interfaces. No framework.', icon: Boxes },
  { name: 'Infrastructure', dirs: 'infra/ · prisma/ · lib/', copy: 'Prisma, Stripe, and Mailgun — swappable behind interfaces.', icon: Database },
];

const storefront = [
  { title: 'Catalog & filtering', copy: 'Browse products with advanced filtering and detailed product views.', icon: ShoppingBag },
  { title: 'Cart & favorites', copy: 'Persistent cart and wishlist backed by Zustand, scoped per user.', icon: Heart },
  { title: 'Stripe checkout', copy: 'Secure Stripe Checkout with webhook-driven order fulfilment.', icon: CreditCard },
  { title: 'Billing portal', copy: 'Self-service customer portal for billing and subscriptions.', icon: ShieldCheck },
];

const admin = [
  { title: 'Products & categories', copy: 'Create, update, and organise inventory into dynamic categories.', icon: LayoutDashboard },
  { title: 'Orders', copy: 'View and manage customer orders end to end.', icon: Boxes },
  { title: 'Users & roles', copy: 'Oversee platform users and role-based access.', icon: Users },
  { title: 'Email & analytics', copy: 'Mailgun transactional email and analytics-ready hooks.', icon: Mail },
];

export default function VertexProjectPage() {
  const t = PROJECT_CONTENT.vertex;
  const project = PROJECTS.find((p) => p.slug === 'vertex');
  const nextProject = PROJECTS.find((p) => p.slug === 'kindra');
  const tNext = PROJECT_CONTENT.kindra;
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

  const frontendTech = project.tech.filter((x) => ['Next.js', 'React', 'TypeScript', 'Tailwind', 'shadcn'].some((n) => x.includes(n)));
  const dataTech = project.tech.filter((x) => ['PostgreSQL', 'Prisma', 'Auth.js', 'Zod', 'Zustand'].some((n) => x.includes(n)));
  const platformTech = project.tech.filter((x) => ['Stripe', 'Mailgun'].some((n) => x.includes(n)));

  return (
    <div className="min-h-screen overflow-hidden bg-[#070b16] text-slate-100 selection:bg-blue-500/30">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-blue-500 via-cyan-400 to-blue-600 shadow-[0_0_24px_rgba(59,130,246,0.6)]"
        style={{ scaleX }}
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/3 h-[34rem] w-[34rem] rounded-full bg-blue-600/12 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.06)_1px,transparent_1px)] bg-size-[56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#070b16]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-400/40 hover:text-white"
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
                  activeSection === item.id ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
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
              className="group flex items-center gap-2 rounded-full bg-blue-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-400 sm:px-4"
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
                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-blue-300">
                  {t.category}
                </span>
                <span className="font-mono text-xs text-slate-500">Clean Architecture · DDD</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-6xl font-black tracking-[-0.04em] text-transparent bg-clip-text bg-linear-to-br from-white via-blue-100 to-slate-500 sm:text-8xl"
              >
                Vertex<span className="text-blue-500">.</span>
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
                  onClick={() => scrollTo('architecture')}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
                >
                  See the architecture
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-blue-400/50 hover:bg-white/[0.08]"
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
              <div className="absolute -inset-6 rounded-[3rem] bg-linear-to-br from-blue-500/25 via-cyan-400/10 to-blue-600/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.04] p-2.5 shadow-2xl shadow-black/50 backdrop-blur">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-slate-950">
                  {!imageError ? (
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt="Vertex storefront"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                      priority
                      quality={92}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-slate-900 to-slate-950">
                      <Code2 className="h-12 w-12 text-blue-400" />
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          </motion.div>
        </header>

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
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-400 align-middle shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
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
                    A foundation that stays clean as it scales.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-slate-300">{t.longDescription}</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-300"><Cpu className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">The problem</h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-400">{t.problem}</p>
                  <div className="my-6 h-px bg-white/10" />
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300"><Layers className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">The answer</h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-400">{t.solution}</p>
                </div>
              </div>
            </Section>

            {/* Architecture — the signature layer diagram */}
            <Section id="architecture">
              <SectionHead n="02" label="Layered on purpose" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">Clean Architecture</h2>
              <div className="space-y-3">
                {layers.map((layer, i) => {
                  const Icon = layer.icon;
                  return (
                    <div
                      key={layer.name}
                      className="group relative grid items-center gap-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-linear-to-r from-white/[0.06] to-white/[0.02] p-6 md:grid-cols-[3.5rem_1fr_1.4fr]"
                      style={{ marginLeft: `${i * 1.5}rem` }}
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-blue-400 to-cyan-400 opacity-70" />
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-[#070b16] text-blue-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{layer.name}</h3>
                        <p className="mt-1 font-mono text-xs text-blue-300/80">{layer.dirs}</p>
                      </div>
                      <p className="text-sm leading-7 text-slate-400">{layer.copy}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-5 text-sm text-slate-400">
                <Layers className="h-5 w-5 shrink-0 text-blue-300" />
                Dependencies point inward: the domain knows nothing about Prisma, Stripe, or React. Swap an integration without touching business logic.
              </p>
            </Section>

            {/* Storefront */}
            <Section id="storefront">
              <SectionHead n="03" label="What customers get" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">Storefront</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {storefront.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.06]">
                      <div className="mb-5 inline-flex rounded-xl border border-white/10 bg-black/40 p-2.5 text-blue-300"><Icon className="h-5 w-5" /></div>
                      <h3 className="text-base font-semibold text-white">{c.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{c.copy}</p>
                    </div>
                  );
                })}
              </div>
              <figure className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
                <div className="relative aspect-[16/9]">
                  <Image src="/vertex-products.webp" alt="Vertex product catalogue" fill sizes="(max-width: 1024px) 100vw, 75vw" className="object-cover object-top" />
                </div>
                <figcaption className="px-5 py-3 font-mono text-xs text-slate-500">Storefront — product catalogue with filtering</figcaption>
              </figure>
            </Section>

            {/* Admin */}
            <Section id="admin">
              <SectionHead n="04" label="What operators get" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">Admin dashboard</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {admin.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06]">
                      <div className="mb-5 inline-flex rounded-xl border border-white/10 bg-black/40 p-2.5 text-cyan-300"><Icon className="h-5 w-5" /></div>
                      <h3 className="text-base font-semibold text-white">{c.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{c.copy}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.keyFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                    <span className="text-sm leading-6 text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Stack */}
            <Section id="stack">
              <SectionHead n="05" label="What it's built on" />
              <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">Technology stack</h2>
              <div className="grid gap-5 md:grid-cols-3">
                <TechColumn title="Frontend" icon={<Layers className="h-5 w-5" />} items={frontendTech} />
                <TechColumn title="Data & Auth" icon={<Database className="h-5 w-5" />} items={dataTech} />
                <TechColumn title="Services" icon={<CreditCard className="h-5 w-5" />} items={platformTech} />
              </div>
            </Section>

            <ProjectContactCTA
              project="vertex"
              projectTitle="Vertex"
              accentText="text-blue-300"
              accentBg="bg-blue-500"
              accentBgHover="hover:bg-blue-400"
              accentGlow="bg-blue-500/20"
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
      <span className="rounded-md bg-blue-500 px-2.5 py-1 font-mono text-xs font-bold text-white">{n}</span>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
    </div>
  );
}

function TechColumn({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-5 flex items-center gap-3 text-blue-300">
        <div className="rounded-2xl bg-blue-500/10 p-3">{icon}</div>
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
