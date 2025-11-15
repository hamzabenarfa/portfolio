"use client";

import Header from "@/components/header";
import Link from "next/link";
import { motion } from "framer-motion";
import { BLOG_POSTS, CURRENT_POSITION, NAV_SECTIONS, SOCIAL_LINKS, TECH_STACK, WORK_EXPERIENCE } from "@/data/consts";

// Data structures

type NavSection = typeof NAV_SECTIONS[number];



// Helper components
const Section = ({ id, children, ...props }: React.HTMLAttributes<HTMLElement> & { id: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="min-h-screen py-20 sm:py-32"
    {...props}
  >
    {children}
  </motion.section>
);

const TechTag = ({ children }: { children: string }) => (
  <span className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300">
    {children}
  </span>
);

const WorkItem = ({ job }: { job: typeof WORK_EXPERIENCE[0] }) => (
  <div className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500">
    <div className="lg:col-span-3">
      <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
        {job.year}
      </div>
    </div>
    <div className="lg:col-span-9 space-y-3">
      <div>
        <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
        <div className="text-muted-foreground">{job.company}</div>
      </div>
      <p className="text-muted-foreground leading-relaxed">{job.description}</p>
      <div className="flex flex-wrap gap-2">
        {job.tech.map((tech) => (
          <span 
            key={tech} 
            className="text-xs text-muted-foreground rounded-full py-1 group-hover:text-foreground transition-colors duration-500"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);



const SocialLink = ({ social }: { social: typeof SOCIAL_LINKS[0] }) => (
  <a
    href={social.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
  >
    <div className="space-y-2">
      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
        {social.name}
      </div>
      <div className="text-sm text-muted-foreground">{social.handle}</div>
    </div>
  </a>
);

// Main component
export default function Home() {


  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Intro Section */}
        <motion.header
          id="intro"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-h-screen flex items-center"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider ml-1.5">PORTFOLIO </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Benarfa
                  <br />
                  <span className="text-muted-foreground">Hamza</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Full Stack Developer crafting digital experiences at the intersection of
                  <span className="text-foreground"> design</span>, <span className="text-foreground">technology</span>,
                  and <span className="text-foreground"> user experience</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">{CURRENT_POSITION.title}</div>
                  <div className="text-muted-foreground">{CURRENT_POSITION.company}</div>
                  <div className="text-xs text-muted-foreground">{CURRENT_POSITION.period}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
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
              <div className="text-sm text-muted-foreground font-mono">2022 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {WORK_EXPERIENCE.map((job) => (
                <WorkItem key={job.id} job={job} />
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
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>
                <div className="space-y-4">
                  <Link
                    href="mailto:contact@benarfa.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">contact@benarfa.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <SocialLink key={social.name} social={social} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Hamza Benarfa. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built by Hamza Benarfa</div>
            </div>
          </div>
        </footer>
      </main>

    </div>
  );
}