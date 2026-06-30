'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  CreditCard,
  Database,
  ExternalLink,
  Gauge,
  Gem,
  LayoutDashboard,
  LockKeyhole,
  PackageCheck,
  Palette,
  Search,
  Server,
  Shield,
  ShoppingBag,
  Sparkles,
  Truck,
  Webhook,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Shopping Experience' },
  { id: 'operations', label: 'Admin Operations' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'stack', label: 'Stack' },
];

const stats = [
  { label: 'Storefronts', value: '02', detail: 'Men / Women catalogs' },
  { label: 'Checkout', value: 'Stripe', detail: 'Session + webhooks' },
  { label: 'Storage', value: 'R2', detail: 'Image-first product media' },
];

const commerceMoments = [
  {
    title: 'Editorial storefronts',
    description: 'Separated collections make the fashion journey feel curated instead of generic.',
    icon: Palette,
  },
  {
    title: 'Variant-aware buying',
    description: 'Size, color, and inventory data stay attached to each purchasable product option.',
    icon: Boxes,
  },
  {
    title: 'Frictionless discovery',
    description: 'Dynamic routes, filtering, and search move shoppers from lookbook to checkout faster.',
    icon: Search,
  },
  {
    title: 'Payment confidence',
    description: 'Stripe Checkout and webhook fulfillment keep order creation reliable and auditable.',
    icon: CreditCard,
  },
];

const operationCards = [
  {
    title: 'Catalog control',
    copy: 'Create products, maintain variants, and keep stock levels visible from a focused admin surface.',
    icon: LayoutDashboard,
  },
  {
    title: 'Secure sessions',
    copy: 'Custom session auth, HTTP-only cookies, and role boundaries protect operational workflows.',
    icon: LockKeyhole,
  },
  {
    title: 'Order lifecycle',
    copy: 'Checkout events flow into admin-ready orders so fulfillment can start without manual stitching.',
    icon: Truck,
  },
];

const architectureLayers = [
  {
    layer: 'Presentation',
    items: ['Next.js storefront', 'React 19 UI', 'Tailwind design system'],
    icon: ShoppingBag,
  },
  {
    layer: 'Commerce Core',
    items: ['Server Actions', 'Drizzle ORM', 'Stripe Checkout'],
    icon: PackageCheck,
  },
  {
    layer: 'Platform',
    items: ['PostgreSQL', 'Cloudflare R2', 'Docker deploy flow'],
    icon: Server,
  },
];

export default function KindraProjectPage() {
  const t = PROJECT_CONTENT.kindra;
  const tNext = PROJECT_CONTENT['menu-qr'];
  const project = PROJECTS.find((p) => p.slug === 'kindra');
  const otherProject = PROJECTS.find((p) => p.slug === 'menu-qr');
  const keyFeatures = t.keyFeatures;
  const [imageError, setImageError] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.35]);

  useEffect(() => {
    const handleScroll = () => {
      let current = navItems[0].id;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top < 260) {
          current = item.id;
        }
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

  const frontendTech = project.tech.filter((tech) =>
    ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Zod'].some((needle) => tech.includes(needle)),
  );
  const backendTech = project.tech.filter((tech) =>
    ['PostgreSQL', 'Drizzle', 'Oslo', 'Stripe'].some((needle) => tech.includes(needle)),
  );
  const platformTech = project.tech.filter((tech) =>
    ['Docker', 'Cloudflare', 'Vercel'].some((needle) => tech.includes(needle)),
  );

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const y = element.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#100c0d] text-stone-50 selection:bg-rose-300/30">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-rose-300 via-fuchsia-300 to-amber-200 shadow-[0_0_30px_rgba(244,114,182,0.5)]"
        style={{ scaleX }}
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-rose-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#100c0d]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/#work"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-stone-300 transition hover:border-rose-300/40 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-full px-3 py-1.5 text-xs transition ${
                  activeSection === item.id
                    ? 'bg-white text-[#100c0d]'
                    : 'text-stone-400 hover:text-white'
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
              className="group flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#100c0d] transition hover:bg-rose-100 sm:px-4"
            >
              <span className="hidden sm:inline">Visit live store</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </nav>

      <main className="relative z-10">
        <header className="relative min-h-screen px-4 pt-28 sm:px-6 lg:pt-36">
          <motion.div
            className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <section className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-6 flex flex-wrap items-center gap-3"
              >
                <span className="rounded-full border border-rose-300/30 bg-rose-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-rose-100">
                  Fashion Commerce
                </span>
                <span className="text-xs font-mono text-stone-500">{project.year}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.08em] text-transparent bg-clip-text bg-linear-to-br from-white via-rose-100 to-stone-500 sm:text-8xl lg:text-[9.5rem]"
              >
                {t.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-8 max-w-2xl text-xl leading-relaxed text-stone-300 sm:text-2xl"
              >
                {t.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row"
              >
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-rose-200 px-6 py-3 text-sm font-bold text-[#100c0d] transition hover:bg-white"
                  >
                    Open production storefront
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>
                )}
                <button
                  onClick={() => scrollTo('overview')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-rose-200/50 hover:bg-white/[0.08]"
                >
                  Read the case study
                  <Sparkles className="h-4 w-4 text-rose-200" />
                </button>
              </motion.div>
            </section>

            <motion.section
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[3rem] bg-linear-to-br from-rose-400/25 via-fuchsia-400/10 to-amber-300/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.4rem] border border-white/15 bg-white/[0.05] p-3 shadow-2xl shadow-black/40 backdrop-blur">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.9rem] bg-stone-950">
                  {!imageError ? (
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt={t.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                      quality={95}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-rose-950 via-stone-950 to-amber-950">
                      <div className="text-center">
                        <Gem className="mx-auto mb-4 h-12 w-12 text-rose-200" />
                        <p className="text-sm uppercase tracking-[0.3em] text-stone-400">Kindra storefront</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/15 bg-black/45 p-5 backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.24em] text-stone-400">Live commerce kit</span>
                      <BadgeCheck className="h-5 w-5 text-rose-200" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl bg-white/[0.07] p-3">
                          <div className="text-lg font-bold text-white">{stat.value}</div>
                          <div className="mt-1 text-[10px] uppercase tracking-wider text-stone-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </header>

        <section className="border-y border-white/10 bg-white/[0.025] px-4 py-6 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/20 p-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-stone-500">{stat.label}</div>
                  <div className="mt-2 text-sm text-stone-300">{stat.detail}</div>
                </div>
                <div className="text-2xl font-black text-rose-100">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-5 text-xs uppercase tracking-[0.3em] text-stone-500">Contents</div>
              <nav className="space-y-2 border-l border-white/10 pl-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block text-left text-sm transition ${
                      activeSection === item.id ? 'translate-x-1 text-white' : 'text-stone-500 hover:text-stone-200'
                    }`}
                  >
                    {activeSection === item.id && (
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-rose-200 align-middle shadow-[0_0_12px_rgba(251,207,232,0.9)]" />
                    )}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <article className="space-y-28">
            <motion.section
              id="overview"
              className="scroll-mt-32"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="rounded-full bg-rose-200 px-3 py-1 text-xs font-bold text-[#100c0d]">01</span>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">{t.category}</p>
              </div>
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    A launch-ready commerce foundation with a fashion-first feel.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-stone-300">{t.longDescription}</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-rose-200/10 p-3 text-rose-100">
                      <Gauge className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">Business problem</h3>
                  </div>
                  <p className="text-sm leading-7 text-stone-400">{t.problem}</p>
                  <div className="my-6 h-px bg-white/10" />
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-amber-200/10 p-3 text-amber-100">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">Product answer</h3>
                  </div>
                  <p className="text-sm leading-7 text-stone-400">{t.solution}</p>
                </div>
              </div>
            </motion.section>

            <motion.section
              id="experience"
              className="scroll-mt-32"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="rounded-full bg-rose-200 px-3 py-1 text-xs font-bold text-[#100c0d]">02</span>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Shopping experience</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {commerceMoments.map((moment, index) => {
                  const Icon = moment.icon;
                  return (
                    <div
                      key={moment.title}
                      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-rose-200/35 hover:bg-white/[0.07]"
                    >
                      <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-rose-300/10 blur-2xl transition group-hover:bg-rose-300/20" />
                      <div className="mb-8 flex items-center justify-between">
                        <div className="rounded-2xl border border-white/10 bg-black/25 p-3 text-rose-100">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-xs text-stone-600">0{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">{moment.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-stone-400">{moment.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {keyFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-200" />
                    <span className="text-sm leading-6 text-stone-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              id="operations"
              className="scroll-mt-32"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="rounded-full bg-rose-200 px-3 py-1 text-xs font-bold text-[#100c0d]">03</span>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Admin operations</h2>
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-white/[0.07] to-white/[0.025]">
                <div className="grid border-b border-white/10 md:grid-cols-3">
                  {operationCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div key={card.title} className="border-white/10 p-6 md:border-r md:last:border-r-0">
                        <Icon className="mb-8 h-6 w-6 text-rose-100" />
                        <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-stone-400">{card.copy}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="grid gap-4 p-6 lg:grid-cols-[1fr_0.8fr]">
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.24em] text-stone-500">Order signal</span>
                      <Webhook className="h-5 w-5 text-amber-100" />
                    </div>
                    <div className="space-y-3">
                      {['Checkout session created', 'Stripe webhook verified', 'Order inventory reserved'].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3 text-sm text-stone-300">
                          <Zap className="h-4 w-4 text-rose-200" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-rose-200/20 bg-rose-200/10 p-5">
                    <Shield className="mb-5 h-6 w-6 text-rose-100" />
                    <h3 className="text-xl font-semibold">Built for ownership</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-300">
                      The admin layer keeps products, inventory, payments, and media management in one deployable starter kit.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              id="architecture"
              className="scroll-mt-32"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="rounded-full bg-rose-200 px-3 py-1 text-xs font-bold text-[#100c0d]">04</span>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Architecture runway</h2>
              </div>
              <div className="relative">
                <div className="absolute left-8 top-10 hidden h-[calc(100%-5rem)] w-px bg-linear-to-b from-rose-200 via-white/20 to-transparent md:block" />
                <div className="space-y-5">
                  {architectureLayers.map((layer) => {
                    const Icon = layer.icon;
                    return (
                      <div key={layer.layer} className="relative grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[5rem_1fr]">
                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-200/20 bg-[#100c0d] text-rose-100">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold">{layer.layer}</h3>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {layer.items.map((item) => (
                              <span key={item} className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-stone-300">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.section>

            <motion.section
              id="stack"
              className="scroll-mt-32"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="rounded-full bg-rose-200 px-3 py-1 text-xs font-bold text-[#100c0d]">05</span>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Technology stack</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <TechColumn title="Frontend" icon={<Sparkles className="h-5 w-5" />} items={frontendTech} />
                <TechColumn title="Backend & Data" icon={<Database className="h-5 w-5" />} items={backendTech} />
                <TechColumn title="Platform" icon={<Server className="h-5 w-5" />} items={platformTech} />
              </div>
            </motion.section>

            {otherProject && (
              <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Explore another project</p>
                    <h3 className="mt-3 text-2xl font-semibold">{tNext.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-stone-400">{tNext.description}</p>
                  </div>
                  <Link
                    href={`/projects/${otherProject.slug}`}
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-rose-200/50 hover:bg-white/[0.06]"
                  >
                    View case study
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </section>
            )}
          </article>
        </div>
      </main>
    </div>
  );
}

function TechColumn({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-5 flex items-center gap-3 text-rose-100">
        <div className="rounded-2xl bg-rose-200/10 p-3">{icon}</div>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-stone-300">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
