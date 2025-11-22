'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/data/consts';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: { slug: string };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  const [imageError, setImageError] = useState(false);

  if (!project) {
    notFound();
  }

  const projectIndex = PROJECTS.findIndex((p) => p.slug === params.slug);
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <div className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-secondary/20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-24 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 mb-12"
        >
          {/* Header */}
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">PROJECT</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground">{project.longDescription}</p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-secondary/30">
            <div>
              <div className="text-xs text-muted-foreground font-mono mb-2">YEAR</div>
              <div className="font-light">{project.year}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-mono mb-2">STATUS</div>
              <div className="font-light">Completed</div>
            </div>
            <div className="col-span-2 sm:col-span-2">
              <div className="text-xs text-muted-foreground font-mono mb-2">LINK</div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors duration-300 truncate"
              >
                Visit Project →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden border border-secondary/30 mb-16"
        >
          {!imageError ? (
            <Image
              src={project.image || '/placeholder.svg'}
              alt={project.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <div className="text-center">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-muted-foreground">{project.title}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-12 mb-16"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              {project.content?.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Sidebar - Tech Stack */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 font-mono">TECH STACK</h3>
              <div className="space-y-2">
                {project.tech.map((tech) => (
                  <div
                    key={tech}
                    className="px-3 py-2 bg-secondary/20 border border-secondary/40 rounded-lg text-sm text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium text-center"
            >
              View Live Project
            </a>
          </div>
        </motion.div>

        {/* Navigation to other projects */}
        <div className="border-t border-secondary/30 pt-16 space-y-8">
          <h3 className="text-2xl font-light">Other Projects</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group"
              >
                <div className="p-6 border border-secondary/30 rounded-lg hover:border-primary/60 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </div>
                  <h4 className="text-lg font-light">{prevProject.title}</h4>
                </div>
              </Link>
            )}

            <Link
              href={`/projects/${nextProject.slug}`}
              className="group"
            >
              <div className="p-6 border border-secondary/30 rounded-lg hover:border-primary/60 hover:bg-primary/5 transition-all duration-300">
                <div className="flex items-center justify-end gap-2 mb-3 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-light text-right">{nextProject.title}</h4>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
