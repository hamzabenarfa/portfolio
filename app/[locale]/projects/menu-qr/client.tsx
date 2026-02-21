'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { PROJECTS } from '@/data/consts';
import {
  ArrowLeft,
  ExternalLink,
  Server,
  Database,
  Cloud,
  Layout,
  Zap,
  CheckCircle2,
  TerminalSquare,
  QrCode,
  LayoutDashboard,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Target,
  Lightbulb,
  Cpu,
  Star
} from 'lucide-react';

export default function MenuQRProjectPage() {
  const project = PROJECTS.find((p) => p.slug === 'menu-qr');
  const [imageError, setImageError] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isLandingPageScrolling, setIsLandingPageScrolling] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'problem-solution', 'features', 'architecture', 'impact', 'expertise'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top < 300) {
          current = section;
        }
      }

      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        current = sections[sections.length - 1];
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  if (!project) return null;

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem-solution', label: 'The Problem & Solution' },
    { id: 'features', label: 'Key Product Features' },
    { id: 'architecture', label: 'Technical Highlights' },
    { id: 'impact', label: 'Impact & Results' },
    { id: 'expertise', label: 'Expertise' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-50 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
        style={{ scaleX }}
      />

      {/* Navigation Layer */}
      <nav className="fixed top-0 w-full z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-300"
          >
            <div className="p-1.5 rounded-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-mono tracking-tight hidden sm:inline">Return to Index</span>
            <span className="font-mono tracking-tight sm:hidden text-xs">Return</span>
          </Link>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs sm:text-sm transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
            >
              <span className="hidden sm:inline">Live Environment</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </a>
          )}
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-40 pb-20 overflow-hidden border-b border-zinc-900/50 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

        <motion.div
          className="max-w-7xl mx-auto px-6 relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-mono font-medium tracking-wide uppercase">
                  B2B SaaS Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-zinc-200 to-zinc-500 mb-6 leading-[1.1]"
              >
                MenuQR
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl"
              >
                A high-performance B2B SaaS platform for intelligent, dynamic digital menus powered by Next.js and Cloudflare Workers.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full md:w-1/3"
            >
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6 overflow-hidden relative group">
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-sm font-mono text-zinc-500 mb-4 tracking-wider uppercase">Tech Stack Overview</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-300 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Table of Contents - Sticky Sidebar */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32">
              <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-6 ml-4">Contents</h4>
              <nav className="flex flex-col relative border-l border-zinc-800/50 ml-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-left text-sm py-2.5 pl-5 relative transition-all duration-300 hover:text-white ${activeSection === item.id ? 'text-white font-medium' : 'text-zinc-500'
                      }`}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] -translate-x-px"
                      />
                    )}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article Flow */}
          <article className="lg:w-3/4 space-y-32">

            {/* 1. Overview */}
            <section id="overview" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">01</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Overview</h2>
              </div>

              <div className="prose prose-invert prose-zinc max-w-none text-lg text-zinc-400 leading-relaxed">
                <p>
                  MenuQR empowers restaurants, cafes, and hospitality businesses to instantly digitize their dining experience through a robust, self-serve platform. Built for global scale and local performance, it provides a seamless interface for business owners to manage multi-tiered menus, allergen information, and table-specific QR codes.
                </p>
                <p>
                  By combining a highly interactive frontend with an edge-optimized serverless backend, the product eliminates the friction of traditional paper menus while capturing critical customer engagement data.
                </p>
              </div>

              {/* Featured Showcase */}
              <div className="mt-12 space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group aspect-[16/9] md:aspect-[21/9]"
                >
                  {!imageError ? (
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt="MenuQR Platform Dashboard"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                      <QrCode className="w-16 h-16 text-zinc-700" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-6 pointer-events-none">
                    <p className="text-white/90 font-medium text-sm">Dashboard Interface Highlights</p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* 2. The Problem & Solution */}
            <section id="problem-solution" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">02</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">The Problem & Solution</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-red-950/20 border border-red-900/30 rounded-3xl p-8 relative overflow-hidden group hover:border-red-900/50 transition-colors">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-red-600 blur-[80px] opacity-10 pointer-events-none rounded-full group-hover:opacity-20 transition-opacity" />
                  <Target className="w-8 h-8 text-red-500 mb-6" />
                  <h3 className="text-xl font-medium text-white mb-4">The Challenge</h3>
                  <p className="text-zinc-400 text-base leading-relaxed">
                    Traditional restaurants struggle with the cost and rigidity of printed menus, while existing digital solutions are often clunky, slow to load, and difficult for non-technical staff to update dynamically.
                  </p>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-900/50 transition-colors">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-emerald-600 blur-[80px] opacity-10 pointer-events-none rounded-full group-hover:opacity-20 transition-opacity" />
                  <Lightbulb className="w-8 h-8 text-emerald-500 mb-6" />
                  <h3 className="text-xl font-medium text-white mb-4">The Solution</h3>
                  <p className="text-zinc-400 text-base leading-relaxed">
                    MenuQR delivers an intuitive, drag-and-drop dashboard that allows instant menu updates, paired with a blazing-fast, edge-rendered public menu viewer. The architecture guarantees sub-second load times for end customers scanning QR codes, regardless of their global location or network conditions.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Key Product Features */}
            <section id="features" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">03</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Key Product Features</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Dynamic Menu Management",
                    desc: "Enables zero-friction, drag-and-drop ordering of categories and items, ensuring venues can instantly adapt to sold-out items or seasonal changes.",
                    icon: <LayoutDashboard className="w-6 h-6 text-orange-400" />
                  },
                  {
                    title: "Intelligent QR & Routing",
                    desc: "Generates high-resolution, table-specific QR codes that route customers to the correct digital storefront while enabling granular tracking of table engagement.",
                    icon: <QrCode className="w-6 h-6 text-sky-400" />
                  },
                  {
                    title: "Comprehensive Metadata",
                    desc: "Supports detailed dietary flags, allergen tracking, and caloric information, directly addressing modern consumer transparency demands and regulatory requirements.",
                    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  },
                  {
                    title: "Frictionless Onboarding",
                    desc: "Features a streamlined, multi-step onboarding flow with secure OTP and social authentication, allowing businesses to create a branded digital presence in minutes.",
                    icon: <Smartphone className="w-6 h-6 text-pink-400" />
                  }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">{feature.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 4. Architecture & Technical Highlights */}
            <section id="architecture" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">04</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Architecture & Technical Highlights</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-[#09090b] border border-zinc-800/80 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-zinc-700/80 transition-colors">
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-600 blur-[100px] opacity-5 pointer-events-none rounded-full group-hover:opacity-10 transition-opacity" />

                  <div className="flex items-start gap-6">
                    <Server className="w-8 h-8 text-zinc-300 shrink-0" />
                    <div>
                      <h3 className="text-xl font-medium text-zinc-200 mb-3">Core Stack</h3>
                      <p className="text-zinc-400 text-base leading-relaxed mb-4">
                        Next.js 15 (React 19), Tailwind CSS, Hono.js, Drizzle ORM, and Neon Serverless Postgres.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#09090b] border border-zinc-800/80 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-zinc-700/80 transition-colors">
                  <div className="flex items-start gap-6">
                    <Cloud className="w-8 h-8 text-sky-400 shrink-0" />
                    <div>
                      <h3 className="text-xl font-medium text-zinc-200 mb-3">Edge-Optimized Architecture</h3>
                      <p className="text-zinc-400 text-base leading-relaxed mb-4">
                        Leveraged Cloudflare Workers to deploy the Hono backend to the edge, drastically reducing TTFB (Time to First Byte) for public menu requests. Employed a scalable separation between the interactive admin dashboard and the lightweight public viewer via Next.js route groups.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#09090b] border border-zinc-800/80 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-zinc-700/80 transition-colors">
                  <div className="flex items-start gap-6">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                    <div>
                      <h3 className="text-xl font-medium text-zinc-200 mb-3">Optimization & Security</h3>
                      <p className="text-zinc-400 text-base leading-relaxed mb-4">
                        Implemented secure direct-to-Cloudflare-R2 presigned URLs for image uploads to bypass server processing bottlenecks, while utilizing Zod for rigorous end-to-end type safety and API validation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Impact & Results */}
            <section id="impact" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">05</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Impact & Results</h2>
              </div>

              <div className="bg-linear-to-b from-orange-950/10 to-transparent border border-orange-900/20 rounded-3xl p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-600 blur-[120px] opacity-10 pointer-events-none rounded-full" />

                <ul className="space-y-6 relative z-10">
                  {[
                    "Accommodated rapid data growth by designing a highly normalized, scalable Postgres schema capable of separating tenant data efficiently.",
                    "Eliminated backend latency spikes by migrating API routing to Cloudflare's edge network, ensuring immediate responses during peak dining hours.",
                    "Reduced vendor onboarding friction by providing an intuitive, wizard-driven UI that dramatically accelerates time-to-value for new restaurant sign-ups."
                  ].map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 text-zinc-300"
                    >
                      <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed md:text-lg text-zinc-300 font-light">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 6. Demonstrated Expertise */}
            <section id="expertise" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-900/20 border border-blue-500/30 flex items-center justify-center">
                  <Star className="w-4 h-4 text-blue-400" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Demonstrated Expertise</h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "System Design",
                  "B2B SaaS Architecture",
                  "Edge Computing",
                  "Full-Stack TypeScript",
                  "UI/UX Engineering",
                  "Relational Database Modeling",
                  "API Integration"
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 text-sm font-medium hover:border-zinc-700 hover:bg-zinc-800 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </section>

          </article>
        </div>
      </main>
    </div>
  );
}
