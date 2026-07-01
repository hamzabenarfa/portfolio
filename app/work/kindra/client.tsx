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
  ShoppingBag,
  CreditCard,
  LayoutGrid,
  Boxes,
  ShieldCheck,
  Truck,
  Database,
  Server,
  CheckCircle2,
} from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { trackEvent } from '@/lib/track';

const EMAIL = 'contact@benarfa.com';
const WHATSAPP = 'https://wa.me/21622633345';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'storefronts', label: 'Storefronts' },
  { id: 'product', label: 'Product Page' },
  { id: 'admin', label: 'Operations' },
  { id: 'stack', label: 'Stack' },
];

const storefrontMoments = [
  { title: 'Two storefronts, one codebase', copy: 'Separate Men’s and Women’s collections share commerce logic but read as distinct editorial sites.', icon: LayoutGrid },
  { title: 'Variant-aware catalogue', copy: 'Size and colour stay attached to each purchasable option, down to per-variant stock.', icon: Boxes },
  { title: 'Stripe checkout', copy: 'Checkout sessions and webhook fulfilment keep order creation reliable and auditable.', icon: CreditCard },
  { title: 'Built to launch fast', copy: 'A starter kit, not a demo — storefront, payments, and admin are production-ready on day one.', icon: ShoppingBag },
];

const operationCards = [
  { title: 'Catalogue control', copy: 'Create products, manage variants, and keep stock levels visible from a focused admin surface.', icon: LayoutGrid },
  { title: 'Secure sessions', copy: 'Custom session auth, HTTP-only cookies, and role boundaries protect operational workflows.', icon: ShieldCheck },
  { title: 'Order lifecycle', copy: 'Checkout events flow into admin-ready orders so fulfilment can start without manual stitching.', icon: Truck },
];

export default function KindraProjectPage() {
  const t = PROJECT_CONTENT.kindra;
  const project = PROJECTS.find((p) => p.slug === 'kindra');
  const nextProject = PROJECTS.find((p) => p.slug === 'dtalk-ecosystem');
  const tNext = PROJECT_CONTENT['dtalk-ecosystem'];
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
  const backendTech = project.tech.filter((x) => ['PostgreSQL', 'Drizzle', 'Oslo', 'Stripe'].some((n) => x.includes(n)));
  const platformTech = project.tech.filter((x) => ['Docker', 'Cloudflare', 'Zod'].some((n) => x.includes(n)));

  return (
    <div className="min-h-screen overflow-hidden bg-white text-[#0a0a0a] selection:bg-black/10">
      <motion.div className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-black" style={{ scaleX }} />

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/work"
            className="group flex items-center gap-2 rounded-full border border-black/12 px-3 py-2 text-xs font-medium text-[#555] transition hover:border-black/30 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-black/10 bg-black/[0.02] p-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.08em] transition ${
                  activeSection === item.id ? 'bg-black text-white' : 'text-[#777] hover:text-black'
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
              className="group flex items-center gap-2 rounded-full bg-black px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#222] sm:px-4"
            >
              <span className="hidden sm:inline">Visit store</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </nav>

      <main className="relative">
        <header className="relative px-4 pt-28 sm:px-6 lg:pt-36">
          <motion.div className="mx-auto max-w-7xl" style={{ y: heroY }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <span className="rounded-full border border-black/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-[#555]">
                {t.category}
              </span>
              <span className="font-mono text-xs text-[#999]">{project.year}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-serif text-[18vw] font-medium uppercase leading-[0.82] tracking-[-0.01em] text-black sm:text-[11rem] lg:text-[13rem]"
            >
              Kindra
            </motion.h1>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="max-w-xl text-xl leading-relaxed text-[#3a3a3a] sm:text-2xl"
              >
                {t.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
                className="flex flex-col gap-3 sm:flex-row lg:justify-end"
              >
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white transition hover:bg-[#222]"
                  >
                    Open storefront
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>
                )}
                <button
                  onClick={() => scrollTo('overview')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-black transition hover:border-black/40"
                >
                  Read the case study
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* full-bleed editorial hero photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mt-16 aspect-[16/8] w-full overflow-hidden bg-[#f1f0ec] sm:mt-20"
          >
            {!imageError ? (
              <Image
                src={project.image || '/placeholder.svg'}
                alt="Kindra storefront"
                fill
                sizes="100vw"
                className="object-cover object-top"
                priority
                quality={92}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-black/30" />
              </div>
            )}
          </motion.div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[220px_1fr] lg:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-5 text-xs uppercase tracking-[0.3em] text-[#999]">Contents</div>
              <nav className="space-y-2 border-l border-black/10 pl-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block text-left text-sm transition ${
                      activeSection === item.id ? 'translate-x-1 font-medium text-black' : 'text-[#999] hover:text-black'
                    }`}
                  >
                    {activeSection === item.id && (
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-black align-middle" />
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
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h2 className="font-serif text-4xl font-medium tracking-tight text-black sm:text-5xl">
                    A launch-ready commerce foundation with a fashion-first feel.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-[#444]">{t.longDescription}</p>
                </div>
                <div className="border border-black/10 p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="border border-black/10 p-3 text-black"><Database className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">Business problem</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#555]">{t.problem}</p>
                  <div className="my-6 h-px bg-black/10" />
                  <div className="mb-5 flex items-center gap-3">
                    <div className="border border-black/10 p-3 text-black"><ShoppingBag className="h-5 w-5" /></div>
                    <h3 className="text-lg font-semibold">Product answer</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#555]">{t.solution}</p>
                </div>
              </div>
            </Section>

            {/* Storefronts — gallery grid using real captures */}
            <Section id="storefronts">
              <SectionHead n="02" label="Two collections, one platform" />
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Storefronts</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <figure className="overflow-hidden border border-black/10">
                  <div className="relative aspect-[4/5]">
                    <Image src="/kindra-women.webp" alt="Kindra women's storefront" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" />
                  </div>
                  <figcaption className="border-t border-black/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.1em] text-[#888]">Women</figcaption>
                </figure>
                <figure className="overflow-hidden border border-black/10">
                  <div className="relative aspect-[4/5]">
                    <Image src="/kindra-men.webp" alt="Kindra men's storefront" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" />
                  </div>
                  <figcaption className="border-t border-black/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.1em] text-[#888]">Men</figcaption>
                </figure>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {storefrontMoments.map((moment) => {
                  const Icon = moment.icon;
                  return (
                    <div key={moment.title} className="group flex items-start gap-4 border border-black/10 p-6 transition hover:border-black/30">
                      <div className="border border-black/10 p-2.5 text-black"><Icon className="h-5 w-5" /></div>
                      <div>
                        <h3 className="text-base font-semibold text-black">{moment.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#666]">{moment.copy}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Product page detail */}
            <Section id="product">
              <SectionHead n="03" label="Where the sale happens" />
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Product page</h2>
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <figure className="overflow-hidden border border-black/10">
                  <div className="relative aspect-[4/5]">
                    <Image src="/kindra-product.webp" alt="Kindra product detail page" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" />
                  </div>
                </figure>
                <div>
                  <p className="text-lg leading-8 text-[#444]">
                    Each product page carries colour and size variants, live TND pricing, and a one-tap add-to-bag — the commerce primitives a fashion storefront actually needs, wired to inventory rather than mocked.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {keyFeaturePreview(t.keyFeatures).map((feature) => (
                      <div key={feature} className="flex items-start gap-3 border border-black/10 p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-black" />
                        <span className="text-sm leading-6 text-[#444]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Admin / operations */}
            <Section id="admin">
              <SectionHead n="04" label="Running the business" />
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Admin operations</h2>
              <div className="grid border border-black/10 md:grid-cols-3">
                {operationCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.title} className="border-black/10 p-6 md:border-r md:last:border-r-0">
                      <Icon className="mb-8 h-6 w-6 text-black" />
                      <h3 className="text-lg font-semibold text-black">{card.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#666]">{card.copy}</p>
                    </div>
                  );
                })}
              </div>
              <figure className="mt-4 overflow-hidden border border-black/10">
                <div className="relative aspect-[16/9]">
                  <Image src="/kindra-highlights.webp" alt="Kindra highlights and collections" fill sizes="100vw" className="object-cover object-top" />
                </div>
                <figcaption className="border-t border-black/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.1em] text-[#888]">Highlights — curated drops across both storefronts</figcaption>
              </figure>
            </Section>

            {/* Stack */}
            <Section id="stack">
              <SectionHead n="05" label="What it's built on" />
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Technology stack</h2>
              <div className="grid gap-5 md:grid-cols-3">
                <TechColumn title="Frontend" items={frontendTech} />
                <TechColumn title="Commerce & Data" items={backendTech} />
                <TechColumn title="Platform" items={platformTech} />
              </div>
              <p className="mt-6 flex items-center gap-3 border border-black/10 p-5 text-sm text-[#555]">
                <Server className="h-5 w-5 shrink-0 text-black" />
                Server Actions and Drizzle ORM over PostgreSQL, with Cloudflare R2 and Vercel Blob for dual image storage and a Docker deploy flow.
              </p>
            </Section>

            {/* Black contact CTA */}
            <section className="relative overflow-hidden border border-black/10 bg-black p-8 text-white sm:p-12">
              <div className="relative">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">Let&rsquo;s work together</p>
                <h2 className="mt-5 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                  Need something like Kindra built — or taken further?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
                  I partner with founders and small teams to ship production software, start to finish. Tell me what you&rsquo;re building.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href="/#contact"
                    onClick={() => trackEvent('project_cta_click', { project: 'kindra', action: 'contact' })}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.04em] text-black transition hover:bg-white/85"
                  >
                    Start a project
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={`mailto:${EMAIL}`}
                    onClick={() => trackEvent('contact_click', { project: 'kindra', method: 'email' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.06]"
                  >
                    Email me
                  </a>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('contact_click', { project: 'kindra', method: 'whatsapp' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.06]"
                  >
                    WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                {nextProject && (
                  <div className="mt-10 border-t border-white/15 pt-6">
                    <Link
                      href={`/work/${nextProject.slug}`}
                      onClick={() => trackEvent('project_cta_click', { project: 'kindra', action: 'next_project' })}
                      className="group inline-flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
                    >
                      <span className="uppercase tracking-[0.24em] text-white/40">Next case study</span>
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

function keyFeaturePreview(features: string[]): string[] {
  return features.slice(0, 4);
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
      <span className="bg-black px-2.5 py-1 font-mono text-xs font-bold text-white">{n}</span>
      <p className="text-xs uppercase tracking-[0.3em] text-[#999]">{label}</p>
    </div>
  );
}

function TechColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-black/10 p-5">
      <h3 className="mb-5 font-semibold text-black">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="border border-black/10 px-4 py-3 text-sm text-[#444]">{item}</div>
        ))}
      </div>
    </div>
  );
}
