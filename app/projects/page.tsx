import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import { SEO } from "@/components/seo/seo";
import { PROJECTS } from "@/data/consts";
import { getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected case studies by Hamza Benarfa across SaaS, e-commerce, marketplaces, custom editors, and launch infrastructure.",
  alternates: getAlternates("/projects"),
};

export default function ProjectsPage() {
  return (
    <div id="top" className="min-h-screen bg-[#0c0b09] text-[#f4efe3]">
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <p className="eyebrow eyebrow-dot">Case studies</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Projects with product, engineering, and launch context.</h1>
        <p className="mt-6 max-w-2xl text-lg text-[#a8a195]">A concise index of public portfolio case studies. Each page includes the problem, implementation choices, stack, and outcome.</p>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="rounded-3xl border border-[#2a2722] bg-[#15130f] p-6 transition hover:border-[#ff5722]">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff7a4d]">{project.year} · {project.category}</span>
              <h2 className="mt-4 text-2xl font-semibold">{project.title}</h2>
              <p className="mt-4 text-sm leading-6 text-[#a8a195]">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((item) => <span key={item} className="rounded-full border border-[#2a2722] px-3 py-1 text-xs text-[#a8a195]">{item}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SEO
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Projects", url: "/projects" }]}
        page={{ name: "Projects", description: "Selected case studies by Hamza Benarfa.", url: "/projects", dateModified: "2026-05-14" }}
      />
    </div>
  );
}
