"use client";

import Header from "@/components/header";
import JobModal from "@/components/job-modal";
import ProjectShowcase from "@/components/project-showcase";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  CURRENT_POSITION,
  SOCIAL_LINKS,
  TECH_STACK,
  WORK_EXPERIENCE,
  PROJECTS,
} from "@/data/consts";
import { TechTag } from "./_components/tech-tag";
import { WorkItem } from "./_components/work-item";
import { SocialLink } from "./_components/social-links";

const Section = ({
  id,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { id: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="min-h-screen py-20 sm:py-32"
    {...props}
  >
    {children}
  </motion.section>
);






export default function Home() {
  const [selectedJob, setSelectedJob] = useState<
    (typeof WORK_EXPERIENCE)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJobClick = (job: (typeof WORK_EXPERIENCE)[0]) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Header />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
        {/* Intro Section */}
        <motion.header
          id="intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="min-h-screen flex items-center"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider ml-1.5">
                  PORTFOLIO{" "}
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Benarfa
                  <br />
                  <span className="text-primary">Hamza</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-2xl">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
                  Full-stack developer from Tunisia with 3 years of experience building 
                  scalable web applications. I specialize in crafting pixel-perfect interfaces 
                  and robust backend systems using modern JavaScript ecosystems.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Available for opportunities</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  CURRENTLY
                </div>
                <div className="space-y-2">
                  <div className="text-foreground">{CURRENT_POSITION.title}</div>
                  <div className="text-primary/70">
                    {CURRENT_POSITION.company}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {CURRENT_POSITION.period}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  FOCUS
                </div>
                <div className="flex flex-wrap gap-2 cursor-pointer">
                  {TECH_STACK.map((skill) => (
                    <TechTag key={skill}>{skill}</TechTag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Work Section */}
        <Section id="work">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Selected Work</h2>
              <div className="text-sm text-muted-foreground font-mono">
                2022 — 2025
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {WORK_EXPERIENCE.map((job) => (
                <WorkItem
                  key={job.id}
                  job={job}
                  onClick={() => handleJobClick(job)}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Featured Projects</h2>
              <div className="text-sm text-muted-foreground font-mono">
                2022 — 2024
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {PROJECTS.map((project) => (
                <ProjectShowcase key={project.id} project={project} />
              ))}
            </div>
          </div>
        </Section>

        {/* Connect Section */}
        <Section id="connect" className="flex items-center py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>
              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
                  Open to new opportunities, collaborations, and meaningful conversations 
                  about building exceptional digital products. Let's connect and explore 
                  how we can work together.
                </p>
                <div className="space-y-4">
                  <Link
                    href="mailto:contact@benarfa.com"
                    className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">
                      contact@benarfa.com
                    </span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">
                ELSEWHERE
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <SocialLink key={social.name} social={social} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="py-12 sm:py-16 border-t border-secondary/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                © 2025 Hamza Benarfa. All rights reserved.
              </div>
              <div className="text-xs text-muted-foreground">
                Built by Hamza Benarfa
              </div>
            </div>
          </div>
        </footer>
      </main>

      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
}
