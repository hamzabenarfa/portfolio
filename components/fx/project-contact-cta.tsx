"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/lib/track";

interface NextProject {
  href: string;
  title: string;
}

interface ProjectContactCTAProps {
  /** Project slug, sent with funnel events so drop-off is attributable per case study. */
  project: string;
  /** Project display name, woven into the headline. */
  projectTitle: string;
  /** Per-page accent so the CTA reads as native to each case study. */
  accentText: string;
  accentBg: string;
  accentBgHover: string;
  accentGlow: string;
  /** Optional "next case study" affordance for pages that lack one. */
  next?: NextProject;
}

const EMAIL = "contact@benarfa.com";
const WHATSAPP = "https://wa.me/21622633345";

/**
 * Closing call-to-action for project case studies. This is the step that
 * converts a credibility read into an inquiry — without it the
 * project → contact journey dead-ends. Primary action routes to the home
 * contact section; direct email/WhatsApp give a one-tap path for high-intent
 * visitors. Every action is tracked so the funnel is measurable.
 */
export function ProjectContactCTA({
  project,
  projectTitle,
  accentText,
  accentBg,
  accentBgHover,
  accentGlow,
  next,
}: ProjectContactCTAProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 sm:p-12">
      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${accentGlow}`}
        aria-hidden="true"
      />
      <div className="relative">
        <p
          className={`text-xs font-medium uppercase tracking-[0.3em] ${accentText}`}
        >
          Let&rsquo;s work together
        </p>
        <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Need something like {projectTitle} built — or taken further?
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-stone-400">
          I partner with founders and small teams to ship production software,
          start to finish. Tell me what you&rsquo;re building.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/#contact"
            onClick={() =>
              trackEvent("project_cta_click", { project, action: "contact" })
            }
            className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#0a0a0a] transition ${accentBg} ${accentBgHover}`}
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>

          <a
            href={`mailto:${EMAIL}`}
            onClick={() =>
              trackEvent("contact_click", { project, method: "email" })
            }
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
          >
            Email me
          </a>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("contact_click", { project, method: "whatsapp" })
            }
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
          >
            WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {next && (
          <div className="mt-10 border-t border-white/10 pt-6">
            <Link
              href={next.href}
              onClick={() =>
                trackEvent("project_cta_click", { project, action: "next_project" })
              }
              className="group inline-flex items-center gap-3 text-sm text-stone-400 transition hover:text-white"
            >
              <span className="uppercase tracking-[0.24em] text-stone-500">
                Next case study
              </span>
              <span className="font-semibold text-stone-200">{next.title}</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
