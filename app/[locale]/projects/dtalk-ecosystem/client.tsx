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
  Shield,
  Cloud,
  Layout,
  Cpu,
  Zap,
  CheckCircle2,
  TerminalSquare
} from 'lucide-react';

export default function DTalkProjectPage() {
  const project = PROJECTS.find((p) => p.slug === 'dtalk-ecosystem');
  const [imageError, setImageError] = useState(false);
  const [activeSection, setActiveSection] = useState('executive-overview');
  const [isLandingPageScrolling, setIsLandingPageScrolling] = useState(false);
  const [isMobileViewScrolling, setIsMobileViewScrolling] = useState(false);
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
      const sections = ['executive-overview', 'achievements', 'architecture', 'backend', 'frontend', 'security', 'infrastructure', 'decisions'];
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
    { id: 'executive-overview', label: 'Overview' },
    { id: 'achievements', label: 'Achievement Summary' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'backend', label: 'Backend & Database' },
    { id: 'frontend', label: 'Frontend Engineering' },
    { id: 'security', label: 'Security' },
    { id: 'infrastructure', label: 'Infrastructure & DevOps' },
    { id: 'decisions', label: 'Trade-offs' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-blue-500/30">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
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
            <span className="font-mono tracking-tight hidden sm:inline">Return </span>
            <span className="font-mono tracking-tight sm:hidden text-xs">Return</span>
          </Link>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
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
                <span className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono font-medium tracking-wide uppercase">
                  Technical Case Study
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-zinc-200 to-zinc-500 mb-6 leading-[1.1]"
              >
                D-Talk Ecosystem
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl"
              >
                Architecture review and engineering interventions for a high-performance fashion-tech marketplace.
              </motion.p>
            </div>


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
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] -translate-x-px"
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

            {/* A. Executive Overview */}
            <section id="executive-overview" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">01</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Executive Overview</h2>
              </div>

              <div className="prose prose-invert prose-zinc max-w-none text-lg text-zinc-400 leading-relaxed">
                <p>
                  The D-Talk Ecosystem is a full-stack, cloud-native web application encompassing a modern, high-performance frontend canvas/dashboard and a robust Java Spring Boot backend. The system provides secure and highly scalable services backed by an optimized PostgreSQL database.
                </p>
                <p>
                  This case study details the system's architectural evolution, highlighting my strategic interventions to refactor and optimize the backend foundation, my end-to-end design and implementation of the Next.js frontend, and my complete ownership of the Azure cloud infrastructure and CI/CD pipelines.
                </p>
              </div>

              {/* Showcases - Animated Scrolling & Grid */}
              <div className="mt-12 space-y-4">
                {/* 1. Full Page Animated Scroll */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onTouchStart={() => setIsLandingPageScrolling(true)}
                  onTouchEnd={() => setIsLandingPageScrolling(false)}
                  onTouchCancel={() => setIsLandingPageScrolling(false)}
                  className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group h-[500px] w-full md:cursor-auto select-none"
                >
                  <div className="absolute inset-0 bg-zinc-900 overflow-hidden">
                    <div className={`relative w-full h-[3000px] transition-transform duration-15000 ease-linear md:group-hover:-translate-y-[calc(100%-500px)] ${isLandingPageScrolling ? '-translate-y-[calc(100%-500px)]' : ''}`}>
                      <Image
                        src="/dtalk-landing-full.webp"
                        alt="D-Talk Ecosystem - Full Landing Page"
                        fill
                        className="object-contain md:object-cover object-top pointer-events-none"
                        onError={() => setImageError(true)}
                        sizes="(max-width: 1200px) 100vw, 1200px"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 pointer-events-none">
                    <p className="text-white font-medium text-sm md:text-lg flex items-center gap-2">
                      Ecosystem Landing Page
                      <span className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full bg-white/20 hidden md:inline-block whitespace-nowrap">Hover to scroll</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 md:hidden whitespace-nowrap">Hold to scroll</span>
                    </p>
                  </div>
                </motion.div>

                {/* 2. Sub-Pages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { src: '/dtalk-about-us.webp', caption: 'About Platform' },
                    { src: '/dtalk-service.webp', caption: 'Ecosystem Services' },
                    { src: '/dtalk-ai.webp', caption: 'AI Machine Learning Features' },
                    { src: '/dtalk-auth.webp', caption: 'Authentication App Flow' }
                  ].map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group aspect-video"
                    >
                      <Image
                        src={img.src}
                        alt={`D-Talk Ecosystem - ${img.caption}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => setImageError(true)}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-6 pointer-events-none">
                        <p className="text-white/90 font-medium text-sm">{img.caption}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>


              </div>
            </section>

            {/* J. Recruiter-Focused Achievement Summary (Moved up for impact) */}
            <section id="achievements" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-900/20 border border-blue-500/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Achievement Summary</h2>
              </div>

              <div className="bg-linear-to-b from-blue-950/20 to-transparent border border-blue-900/30 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600 blur-[100px] opacity-10 pointer-events-none rounded-full" />

                <ul className="space-y-6">
                  {[
                    "Architected and provisioned an enterprise-grade cloud environment on Azure using Terraform, establishing secure, multi-environment deployments (staging/prod).",
                    "Built robust zero-downtime CI/CD pipelines using GitHub Actions, decreasing time-to-market and enforcing Trivy security scanning on all container builds.",
                    "Engineered a highly complex, Next.js 15 frontend from scratch, featuring interactive Konva.js canvas manipulations, Zustand state management, and optimistic UI updates via React Query.",
                    "Optimized a legacy Java Spring Boot backend, significantly increasing max throughput and resilience by implementing PgBouncer, JCache caching layers, and ULID indexing.",
                    "Modernized application security by stripping legacy auth and implementing a secure, stateless OAuth2 (Google) + JWT authentication flow mechanism integrated with Azure Key Vault."
                  ].map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 text-zinc-300"
                    >
                      <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </section>

            {/* B. System Architecture Analysis */}
            <section id="architecture" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">02</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">System Architecture</h2>
              </div>

              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                The application follows a decoupled client-server architecture deployed on Azure, optimizing for clear separation of concerns and independent scaling vectors.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                  <Server className="w-8 h-8 text-emerald-400 mb-6" />
                  <h3 className="text-xl font-medium text-white mb-3">Backend (API Layer)</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    A Java 17 / Spring Boot 3.1.4 application exposing RESTful endpoints. It leverages Spring WebFlux, Spring Data JPA, and Hibernate, utilizing MapStruct for fast DTO mapping and Azure Storage Blob for asset management.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                  <Layout className="w-8 h-8 text-pink-400 mb-6" />
                  <h3 className="text-xl font-medium text-white mb-3">Frontend (Presentation Layer)</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    A Next.js 15 (React 19) SPA/SSR hybrid application. It features a rich, interactive UI built with Tailwind CSS, Shadcn UI, Framer Motion, and complex canvas manipulations powered by Fabric.js and React Konva.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                  <Database className="w-8 h-8 text-sky-400 mb-6" />
                  <h3 className="text-xl font-medium text-white mb-3">Data Tier</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Azure Database for PostgreSQL Flexible Server, optimized for high throughput with connection pooling via PgBouncer to prevent starvation.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                  <Cloud className="w-8 h-8 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-medium text-white mb-3">Cloud Infrastructure</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Fully managed Azure environment using Azure Container Apps for serverless compute, Azure Key Vault for secret management, and Azure Storage for persistence.
                  </p>
                </div>
              </div>
            </section>

            {/* C. My Engineering Contributions -> Backend & D. Database */}
            <section id="backend" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">03</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Backend & Database</h2>
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Original Foundation (Inherited)</h3>
                  <div className="pl-6 border-l-2 border-zinc-800 text-zinc-400 space-y-2">
                    <p>• Initial Spring Boot project scaffolding and basic REST controller definitions.</p>
                    <p>• Baseline business logic and domain entity mapping (Hibernate).</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-white mb-6">Database & Optimization Strategy</h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    Upon inheriting the backend, database connection exhaustion and sub-optimal query execution were identified as potential bottlenecks for scalability. I implemented the following critical optimizations:
                  </p>

                  <div className="grid gap-6">
                    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex gap-6 items-start">
                      <div className="shrink-0 p-3 bg-blue-900/20 text-blue-400 rounded-lg hidden sm:block">
                        <Database className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-zinc-200 mb-2">PgBouncer Implementation</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          Configured PgBouncer directly on Azure PostgreSQL Flexible Server <code>pgbouncer.enabled = on</code>. This acts as a lightweight connection pooler, drastically reducing connection overhead and improving throughput during traffic spikes.
                        </p>
                      </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex gap-6 items-start">
                      <div className="shrink-0 p-3 bg-amber-900/20 text-amber-500 rounded-lg hidden sm:block">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-zinc-200 mb-2">JCache Caching Layer</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          Integrated Hibernate JCache backed by <strong>Ehcache</strong> to reduce repetitive database hits for frequently accessed, strictly-read data, bypassing the database entirely for high-frequency queries.
                        </p>
                      </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex gap-6 items-start">
                      <div className="shrink-0 p-3 bg-emerald-900/20 text-emerald-400 rounded-lg hidden sm:block">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-zinc-200 mb-2">ULID Adoption</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          Replaced standard random UUIDs with ULIDs (Universally Unique Lexicographically Sortable Identifiers) for database primary keys. This dramatically improves B-tree indexing performance and reduces page fragmentation in PostgreSQL inserts.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* G. Frontend Engineering Approach */}
            <section id="frontend" className="scroll-mt-32 relative">
              <div className="absolute -left-6 top-12 w-[2px] h-32 bg-linear-to-b from-transparent via-pink-500 to-transparent hidden lg:block" />

              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">04</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Frontend Engineering</h2>
              </div>

              <div className="text-lg text-zinc-400 mb-8 leading-relaxed">
                The frontend was built entirely from scratch with a focus on developer experience, rendering performance, and rich user interactivity. Full ownership was established over the presentation layer.
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500" /> Core Framework
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Leveraged Next.js 15 and React 19 App Router paradigms for optimized SSR and client-side routing.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> State Management
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Utilized <code>zustand</code> for lightweight global state, paired with <strong>TanStack React Query</strong> for aggressive data caching, background refetching, and optimistic UI updates.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Interactive UI/UX
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Polished interfaces using Tailwind CSS and Radix-based Shadcn UI primitives. Integrated <strong>Framer Motion</strong> for fluid micro-animations and Embla Carousel.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" /> Complex Graphical Canvas
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Engineered robust client-side graphical intersections using <strong>Fabric.js</strong> and <strong>React-Konva</strong>, enabling users to manipulate rich visual elements directly in the browser for product customization.
                  </p>
                </div>
              </div>
            </section>

            {/* E. Authentication & Security */}
            <section id="security" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">05</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Security & Auth Overhaul</h2>
              </div>

              <div className="bg-[#0c0c0e] rounded-3xl border border-zinc-800 p-8 md:p-12 relative overflow-hidden">
                <Shield className="absolute -right-8 -bottom-8 w-64 h-64 text-zinc-800/30 rotate-12 pointer-events-none" />

                <p className="text-zinc-300 text-lg mb-10 relative z-10 max-w-3xl leading-relaxed">
                  The legacy system lacked a secure authentication flow. I orchestrated a complete security overhaul to establish a stateless, frictionless protocol.
                </p>

                <div className="grid md:grid-cols-3 gap-8 relative z-10">
                  <div className="space-y-3">
                    <h3 className="text-white font-medium">OAuth2 Integration</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Integrated <code>spring-boot-starter-oauth2-client</code> for Google authentication, implementing custom success handlers to bridge the external OAuth2 flow into internal session state securely.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-white font-medium">Stateless JWTs</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Following successful auth, the backend generates cryptographically signed JWTs using <code>jjwt</code>. This ensures the API remains strictly stateless, facilitating effortless horizontal scaling.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-white font-medium">Key Vault SecOps</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Managed all sensitive infrastructure data (DB credentials, OAuth secrets) strictly via Azure Key Vault, retrieved dynamically during the Terraform deployment phase to prevent secret leakage.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* F. Infrastructure & DevOps Architecture */}
            <section id="infrastructure" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">06</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Infrastructure & DevOps</h2>
              </div>

              <div className="mb-12">
                <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
                  Designed a professional-grade, cloud-native DevOps workflow adhering strictly to "Infrastructure as Code" principles, built entirely from scratch.
                </p>
              </div>

              <div className="space-y-8">
                {/* Terraform Block */}
                <div className="group relative bg-[#09090b] border border-zinc-800/80 rounded-2xl p-6 md:p-8 hover:border-[#5c4ee5]/50 transition-colors">
                  <div className="flex items-start gap-6">
                    <TerminalSquare className="w-8 h-8 text-[#5c4ee5] shrink-0" />
                    <div>
                      <h3 className="text-xl font-medium text-zinc-200 mb-3">Terraform (IaC)</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                        Modularized configurations to provision identical staging and prod environments deterministically. Terraform state is securely locked and stored in Azure Blob Storage.
                      </p>
                      <div className="flex flex-wrap gap-2 font-mono text-xs text-zinc-500 mt-4">
                        <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">modules/postgresql</span>
                        <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">modules/container-app</span>
                        <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">modules/keyvault</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Serverless Block */}
                <div className="group relative bg-[#09090b] border border-zinc-800/80 rounded-2xl p-6 md:p-8 hover:border-sky-500/50 transition-colors">
                  <div className="flex items-start gap-6">
                    <Cloud className="w-8 h-8 text-sky-500 shrink-0" />
                    <div>
                      <h3 className="text-xl font-medium text-zinc-200 mb-3">Azure Container Apps (Serverless K8s)</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Deployed the Spring Boot API to Container Apps for serverless autoscaling. Containers scale elastically between 2 and 10 replicas strictly based on HTTP traffic volume metrics, bypassing the operational mass of manual K8s administration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CI/CD Block */}
                <div className="border-l-4 border-zinc-800 pl-6 lg:pl-10 space-y-8">
                  <h3 className="text-xl font-medium text-zinc-200">GitHub Actions CI/CD Pipelines</h3>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">1</span>
                        <h4 className="font-medium text-zinc-300">Continuous Integration (Build & Scan)</h4>
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed pl-9">
                        Triggers on PRs/Merges. Compiles Java/Maven, runs <strong>Trivy vulnerability scans</strong> on the Docker image, and pushes the immutable artifact tagged with the exact Git SHA to Docker Hub.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">2</span>
                        <h4 className="font-medium text-zinc-300">Continuous Deployment (Zero-Downtime)</h4>
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed pl-9">
                        Automates deployment to Azure by dynamically injecting the new Docker tag into Terraform variables and executing <code>terraform apply</code> safely. Includes automated health-check polling against Spring Actuator <code>/api/v1/actuator/health</code> to verify rollout success before marking pipeline green.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* I. Key Engineering Decisions & Trade-offs */}
            <section id="decisions" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-mono text-zinc-400">07</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Decisions & Trade-offs</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Decision 1 */}
                <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl flex flex-col h-full">
                  <div className="text-xs font-mono text-zinc-500 mb-4 tracking-wider uppercase border-b border-zinc-800 pb-4">Compute Infrastructure</div>
                  <h3 className="text-white font-medium mb-3">Azure Container Apps vs. AKS</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mt-auto">
                    Decided against Kubernetes Service (AKS) to eliminate operational cluster overhead. ACA provided the exact serverless scaling required for the stateless Spring API without the massive maintenance burden.
                  </p>
                </div>

                {/* Decision 2 */}
                <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl flex flex-col h-full">
                  <div className="text-xs font-mono text-zinc-500 mb-4 tracking-wider uppercase border-b border-zinc-800 pb-4">Connection Mechanics</div>
                  <h3 className="text-white font-medium mb-3">PgBouncer vs. HikariCP App-Pooling</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mt-auto">
                    While Hikari is used internally, utilizing PgBouncer at the infrastructural tier ensures that as the application scales out to 10+ replicas, the total physical connections hitting PostgreSQL remain strictly bounded and predictable.
                  </p>
                </div>

                {/* Decision 3 */}
                <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl flex flex-col h-full">
                  <div className="text-xs font-mono text-zinc-500 mb-4 tracking-wider uppercase border-b border-zinc-800 pb-4">Frontend Paradigm</div>
                  <h3 className="text-white font-medium mb-3">Next.js 15 App Router RSC</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mt-auto">
                    Adopted Next.js heavy reliance on React Server Components (RSC) to minimize the final JS bundle shipped to the client, accepting the steeper learning curve in exchange for superior Core Web Vitals.
                  </p>
                </div>
              </div>
            </section>

          </article>
        </div >
      </main >

    </div >
  );
}


