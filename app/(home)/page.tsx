"use client";

import Header from "@/components/header";
import JobModal from "@/components/job-modal";
import ProjectShowcase from "@/components/project-showcase";
import Link from "next/link";
import { useState } from "react";
import {
  SOCIAL_LINKS,
  WORK_EXPERIENCE,
  PROJECTS,
} from "@/data/consts";
import { WorkItem } from "./_components/work-item";
import { SocialLink } from "./_components/social-links";
import Script from "next/script";

const Section = ({
  id,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { id: string }) => (
  <section
    id={id}
    className="min-h-screen py-20 sm:py- 32"
    {...props}
  >
    {children}
  </section>
);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hamza Benarfa",
  url: "https://benarfa.com",
  image: "https://benarfa.com/og-image.png",
  jobTitle: "Full-Stack Developer & DevOps Engineer",
  description: "Freelance full-stack developer & DevOps engineer from Tunisia. I build fast, accessible, and scalable web & mobile apps with Next.js, TypeScript, React, NestJS, and cloud infrastructure.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "Tunisia",
  },
  email: "contact@benarfa.com",
  sameAs: [
    "https://github.com/hamzabenarfa",
    "https://linkedin.com/in/hamzabenarfa",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "NestJS",
    "DevOps",
    "Cloud Infrastructure",
    "Web Development",
    "Mobile App Development",
  ],
};

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
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <main className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16 pt-16 ">
        {/* Intro Section */}
        <header
          id="intro"
          className="min-h-screen flex items-center relative"
        >

          <div className="gap-12 sm:gap-16 w-full relative z-10">
            <div className="lg:col-span-3 space-y-8 sm:space-y-10">
              <div
                className="space-y-4 sm:space-y-3"
              >

                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-[0.9]">
                  <span
                    className="block font-semibold"
                  >
                    Web and mobile
                  </span>
                  <span
                    className="block text-[#C0C0C0]"
                  >
                    software Developer
                  </span>
                </h1>
              </div>

              <div
                className="space-y-6 max-w-2xl"
              >
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-[65ch] font-light">
                  Full-stack developer from <span className="text-foreground font-medium">Tunisia</span> with{" "}
                  <span className="text-foreground font-medium">3 years</span> of experience building
                  scalable web applications. I specialize in crafting{" "}
                  <span className="text-primary">pixel-perfect interfaces</span> and{" "}
                  <span className="text-primary">robust backend systems</span> using modern JavaScript ecosystems.
                </p>

                <Link
                  href="mailto:contact@benarfa.com"
                  className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
                  aria-label="Send email to contact@benarfa.com"
                >
                  <span className="text-base sm:text-lg">
                    contact@benarfa.com
                  </span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>

                {/* Social Media Icons */}
                <div className="flex items-center gap-3 pt-2">
                  {SOCIAL_LINKS.filter(social => social.name !== 'Download CV').map((social) => {
                    const Icon = social.name === 'GitHub'
                      ? () => (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      )
                      : social.name === 'LinkedIn'
                        ? () => (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        )
                        : () => (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                        );

                    return (
                      <Link
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-2.5 bg-secondary/30 border border-secondary/40 rounded-lg hover:border-primary/60 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                        aria-label={`Visit ${social.name} profile`}
                      >
                        <Icon />
                      </Link>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>
        </header>



        {/* Projects Section */}
        <Section id="projects" >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {PROJECTS.map((project) => (
                <ProjectShowcase key={project.id} project={project} />
              ))}
            </div>
          </div>
        </Section>


        <Section id="work">
          <h2 className="text-3xl sm:text-4xl font-light mb-8">Experience</h2>
          {WORK_EXPERIENCE.map((job) => (
            <WorkItem
              key={job.id}
              job={job}
              onClick={() => handleJobClick(job)}
            />
          ))}
        </Section>

        <JobModal
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          job={selectedJob}
        />

        {/* Connect Section */}
        <Section id="connect" className="flex items-center py-20 ">
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
                    aria-label="Send email to contact@benarfa.com"
                  >
                    <span className="text-base sm:text-lg">
                      contact@benarfa.com
                    </span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
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
        <footer className="py-4 border-t border-secondary/30">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                © 2025 Hamza Benarfa. All rights reserved.
              </div>

            </div>
          </div>
        </footer>
      </main>


    </div>
  );
}
