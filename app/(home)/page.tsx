"use client";

import Header from "@/components/header";
import JobModal from "@/components/job-modal";
import ProjectShowcase from "@/components/project-showcase";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Download } from "lucide-react";
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
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="min-h-screen flex items-center relative"
        >
          {/* Background gradient decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full relative z-10">
            <div className="lg:col-span-3 space-y-8 sm:space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4 sm:space-y-3"
              >
                <div className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wider uppercase">
                  Full-Stack Developer
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[0.9]">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="block"
                  >
                    Benarfa
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="block text-[#C0C0C0]"
                  >
                    Hamza
                  </motion.span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6 max-w-2xl"
              >
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-[65ch] font-light">
                  Full-stack developer from <span className="text-foreground font-medium">Tunisia</span> with{" "}
                  <span className="text-foreground font-medium">3 years</span> of experience building 
                  scalable web applications. I specialize in crafting{" "}
                  <span className="text-primary">pixel-perfect interfaces</span> and{" "}
                  <span className="text-primary">robust backend systems</span> using modern JavaScript ecosystems.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-secondary/30 border border-secondary/40 rounded-lg w-fit">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                      <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">Available for opportunities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Tunisia</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="lg:col-span-2 flex flex-col justify-end space-y-8 sm:space-y-10 mt-8 lg:mt-0"
            >
              <div className="space-y-4 p-6 bg-secondary/20 border border-secondary/30 rounded-xl">
                <div className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
                  Currently Working
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-medium text-foreground">{CURRENT_POSITION.title}</div>
                  <div className="text-primary font-medium">
                    {CURRENT_POSITION.company}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {CURRENT_POSITION.period}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
                  Tech Focus
                </div>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACK.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                    >
                      <TechTag>{skill}</TechTag>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
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
                  <a
                    href="/benarfa-hamza-en.pdf"
                    download
                    className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Download className="w-5 h-5" />
                    <span className="text-base sm:text-lg">
                      Download CV
                    </span>
                  
                  </a>
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
