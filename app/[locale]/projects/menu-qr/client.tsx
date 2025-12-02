'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { PROJECTS } from '@/data/consts';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Code2, 
  Zap, 
  Shield, 
  Globe, 
  QrCode, 
  BarChart3, 
  Sparkles,
  Clock,
  Languages,
  GripVertical
} from 'lucide-react';

export default function MenuQRProjectPage() {
  const project = PROJECTS.find((p) => p.slug === 'menu-qr');
  const [imageError, setImageError] = useState(false);

  if (!project) return null;

  const otherProject = PROJECTS.find((p) => p.slug === 'dtalk-ecosystem');

  const keyFeatures = [
    'AI-powered menu digitization with 99% accuracy - drag & drop PDF for instant structuring',
    'Real-time menu updates - edit prices, hide sold-out items during service',
    'Multilingual support with 100+ languages and RTL support for Arabic',
    'Comprehensive analytics dashboard with revenue tracking and order insights',
    '8-step onboarding wizard for seamless restaurant profile setup',
    'Customizable QR codes with instant PDF export for table printing',
    'Hierarchical menu organization with drag-and-drop reordering',
    'Enterprise-grade security with JWT, OAuth 2.0, and role-based access control',
  ];

  const frontendTech = project.tech.filter(t =>
    t.includes('React') || t.includes('Next.js') || t.includes('TypeScript') ||
    t.includes('Tailwind') || t.includes('Framer') || t.includes('shadcn')
  );
  
  const backendTech = project.tech.filter(t =>
    t.includes('NestJS') || t.includes('PostgreSQL') || t.includes('Prisma') ||
    t.includes('Redis') || t.includes('JWT')
  );
  
  const toolsTech = project.tech.filter(t =>
    t.includes('Zod') || t.includes('dnd-kit') || t.includes('intl')
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <div className="fixed top-0 w-full z-40 bg-background/95 backdrop-blur-md border-b border-secondary/20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          {project.url && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group px-4 py-2 overflow-hidden rounded-lg bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground font-medium text-sm shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <span className="relative flex items-center gap-2">
                Visit Live Site
                <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </motion.a>
          )}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 pt-24 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 mb-12"
        >
          <div className="text-xs text-muted-foreground font-mono tracking-wider">
            PROJECT
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            The frictionless way to manage restaurant menus. Launch your digital menu in 60 seconds,
            update prices mid-service, switch languages instantly, and increase table turnover with
            comprehensive analytics.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="px-4 py-2 bg-secondary/30 rounded-lg border border-secondary/40">
              <div className="text-xs text-muted-foreground font-mono mb-1">TECH STACK</div>
              <div className="text-sm font-medium">{project.tech.length} Technologies</div>
            </div>
            <div className="px-4 py-2 bg-secondary/30 rounded-lg border border-secondary/40">
              <div className="text-xs text-muted-foreground font-mono mb-1">ARCHITECTURE</div>
              <div className="text-sm font-medium">Full-Stack SaaS</div>
            </div>
            <div className="px-4 py-2 bg-secondary/30 rounded-lg border border-secondary/40">
              <div className="text-xs text-muted-foreground font-mono mb-1">STATUS</div>
              <div className="text-sm font-medium">Production</div>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden border border-secondary/30 mb-16 bg-gradient-to-br from-secondary/20 to-primary/10"
        >
          {!imageError ? (
            <Image
              src={project.image || '/placeholder.svg'}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="object-cover"
              onError={() => setImageError(true)}
              priority
              quality={90}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-16 h-16 mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">{project.title}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-light mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyFeatures.slice(0, 8).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="p-6 bg-secondary/20 border border-secondary/40 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                <p className="text-sm leading-relaxed text-foreground">{feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-light mb-6">Overview</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-6">
                {project.longDescription}
              </p>
            </div>

            {/* Technical Highlights */}
            <div className="space-y-6">
              <h3 className="text-xl font-light flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Technical Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Digitization
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Drag & drop PDF processing with 99% accuracy for instant menu structuring
                  </div>
                </div>
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Real-Time Updates
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Edit prices in 1 click, hide sold-out items instantly during service
                  </div>
                </div>
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <Languages className="w-4 h-4" />
                    Multilingual
                  </div>
                  <div className="text-xs text-muted-foreground">
                    100+ languages with cultural context preservation and RTL support
                  </div>
                </div>
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Revenue tracking, order volume metrics, and top items analysis
                  </div>
                </div>
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <GripVertical className="w-4 h-4" />
                    Drag & Drop Editor
                  </div>
                  <div className="text-xs text-muted-foreground">
                    @dnd-kit integration for intuitive menu and category reordering
                  </div>
                </div>
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Enterprise Security
                  </div>
                  <div className="text-xs text-muted-foreground">
                    JWT auth, Google OAuth 2.0, Argon2 hashing, role-based access
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-light flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Architecture
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
                  <h4 className="text-sm font-semibold mb-2">Backend (NestJS 10)</h4>
                  <p className="text-xs text-muted-foreground">
                    Modular architecture with Prisma ORM, Redis caching (cache-aside pattern), 
                    Swagger API documentation, and comprehensive E2E testing with Supertest.
                  </p>
                </div>
                <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
                  <h4 className="text-sm font-semibold mb-2">Frontend (Next.js 15.5)</h4>
                  <p className="text-xs text-muted-foreground">
                    App Router with React 19, server components, optimistic UI updates, 
                    client-side image compression, and next-intl for internationalization.
                  </p>
                </div>
                <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
                  <h4 className="text-sm font-semibold mb-2">Database Schema</h4>
                  <p className="text-xs text-muted-foreground">
                    PostgreSQL with Prisma: User → Business → Menu → Category → MenuItem 
                    relationships with strategic indexing for query optimization.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 font-mono tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4" />
                TECH STACK
              </h3>

              <div className="mb-4">
                <div className="text-xs text-muted-foreground mb-2 font-mono">Frontend</div>
                <div className="space-y-2">
                  {frontendTech.map((tech) => (
                    <div
                      key={tech}
                      className="px-3 py-2 bg-secondary/20 border border-secondary/40 rounded-lg text-sm text-foreground"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-muted-foreground mb-2 font-mono">Backend</div>
                <div className="space-y-2">
                  {backendTech.map((tech) => (
                    <div
                      key={tech}
                      className="px-3 py-2 bg-secondary/20 border border-secondary/40 rounded-lg text-sm text-foreground"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-2 font-mono">Tools & Libraries</div>
                <div className="space-y-2">
                  {toolsTech.map((tech) => (
                    <div
                      key={tech}
                      className="px-3 py-2 bg-secondary/20 border border-secondary/40 rounded-lg text-sm text-foreground"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {project.url && (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block w-full px-8 py-4 overflow-hidden rounded-xl bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground font-semibold text-center shadow-2xl hover:shadow-primary/60"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0 20px 25px -5px rgba(var(--primary), 0.3)",
                    "0 25px 50px -12px rgba(var(--primary), 0.5)",
                    "0 20px 25px -5px rgba(var(--primary), 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-xl bg-primary/30 animate-ping" />
                </div>

                <span className="relative flex items-center justify-center gap-2 text-base">
                  View Live Project
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Navigation to other projects */}
        {otherProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="border-t border-secondary/30 pt-12 space-y-6"
          >
            <h3 className="text-xl font-light">Explore Other Projects</h3>
            <Link
              href={`/projects/${otherProject.slug}`}
              className="group p-6 border border-secondary/30 rounded-xl hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 block"
            >
              <div className="flex items-center justify-end gap-2 mb-3 text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                Next Project
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </div>
              <h4 className="text-lg font-light text-right">{otherProject.title}</h4>
              <p className="text-sm text-muted-foreground mt-2 text-right line-clamp-2">
                {otherProject.description}
              </p>
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  );
}

