'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { PROJECTS } from '@/data/consts';
import { ArrowLeft, ExternalLink, CheckCircle2, Code2, Zap, Shield, Layout, Calendar, Users, PenTool } from 'lucide-react';

import { useTranslations } from 'next-intl';

export default function ProjectManagementPage() {
  const t = useTranslations('projectsItems.project-management-app');
  const tNext = useTranslations('projectsItems.dtalk-ecosystem');
  const project = PROJECTS.find((p) => p.slug === 'project-management-app');
  const [imageError, setImageError] = useState(false);

  if (!project) return null;

  const otherProject = PROJECTS.find((p) => p.slug === 'dtalk-ecosystem');

  /* @ts-ignore */
  const keyFeatures = (t.raw('keyFeatures') as string[]) || [];

  const frontendTech = project.tech.filter(t =>
    t.includes('React') || t.includes('Next.js') || t.includes('TypeScript') ||
    t.includes('Tailwind') || t.includes('shadcn') || t.includes('Zustand') || t.includes('Framer')
  );
  const backendTech = project.tech.filter(t =>
    t.includes('MySQL') || t.includes('Prisma') || t.includes('NextAuth')
  );
  const otherTech = project.tech.filter(t =>
    !frontendTech.includes(t) && !backendTech.includes(t)
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
          {project.url && project.url !== '#' && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group px-4 py-2 overflow-hidden rounded-lg bg-linear-to-r from-primary via-primary/90 to-primary text-primary-foreground font-medium text-sm shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent" />

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
            {t('title')}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {t('description')}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="px-4 py-2 bg-secondary/30 rounded-lg border border-secondary/40">
              <div className="text-xs text-muted-foreground font-mono mb-1">TECH STACK</div>
              <div className="text-sm font-medium">{project.tech.length} Technologies</div>
            </div>
            <div className="px-4 py-2 bg-secondary/30 rounded-lg border border-secondary/40">
              <div className="text-xs text-muted-foreground font-mono mb-1">STATUS</div>
              <div className="text-sm font-medium">In Development</div>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden border border-secondary/30 mb-16 bg-linear-to-br from-secondary/20 to-primary/10"
        >
          {!imageError ? (
            <Image
              src={project.image || '/placeholder.svg'}
              alt={t('title')}
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
                <div className="text-6xl mb-4">📊</div>
                <p className="text-muted-foreground">{t('title')}</p>
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
            {keyFeatures.map((feature, index) => (
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
                {t('longDescription')}
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
                    <Layout className="w-4 h-4" />
                    Project Management
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Projects, Kanban boards, and Burn down charts for complete tracking
                  </div>
                </div>
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Team & Members
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Role-based access control and member directory management
                  </div>
                </div>
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Scheduling
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Full calendar view with appointments and recurring events
                  </div>
                </div>
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <PenTool className="w-4 h-4" />
                    Visual Tools
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Interactive whiteboard and Mermaid.js diagram support
                  </div>
                </div>
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Secure auth with NextAuth.js and session management via Prisma
                  </div>
                </div>
                <div className="p-4 bg-secondary/20 border border-secondary/40 rounded-lg">
                  <div className="text-sm font-medium mb-1">Modern Stack</div>
                  <div className="text-xs text-muted-foreground">
                    Next.js 14, React Query, Zustand, and Tailwind CSS
                  </div>
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
                      className="px-3 py-2 text-sm text-foreground"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {backendTech.length > 0 && (
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
              )}

              {otherTech.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-2 font-mono">Tools & Services</div>
                  <div className="space-y-2">
                    {otherTech.map((tech) => (
                      <div
                        key={tech}
                        className="px-3 py-2 bg-secondary/20 border border-secondary/40 rounded-lg text-sm text-foreground"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            {project.url && project.url !== '#' && (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block w-full px-8 py-4 overflow-hidden rounded-xl bg-linear-to-r from-primary via-primary/95 to-primary text-primary-foreground font-semibold text-center shadow-2xl hover:shadow-primary/60"
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
                <div className="absolute inset-0 bg-linear-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/40 to-transparent" />

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
              <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                <ArrowLeft className="w-4 h-4" />
                Previous Project
              </div>
              <h4 className="text-lg font-light">{tNext('title')}</h4>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {tNext('description')}
              </p>
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  );
}

