import type { Metadata } from "next";
import Header from "@/components/header";
import { SEO } from "@/components/seo/seo";
import { SITE } from "@/data/site";
import { getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: "About Hamza Benarfa, an independent full-stack developer and DevOps engineer based in Tunisia.",
  alternates: getAlternates("/about"),
};

export default function AboutPage() {
  return (
    <div id="top" className="min-h-screen bg-[#0c0b09] text-[#f4efe3]">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-36">
        <p className="eyebrow eyebrow-dot">About</p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">I build practical software for founders and small teams.</h1>
        <div className="mt-10 space-y-6 text-lg leading-8 text-[#c9c1b4]">
          <p>{SITE.description}</p>
          <p>I usually work where frontend, backend, deployment, and product judgment meet: SaaS MVPs, operational dashboards, e-commerce foundations, custom editors, and production launch infrastructure.</p>
          <p>My preferred stack is intentionally boring: Next.js, React, TypeScript, Node/NestJS, PostgreSQL, Docker, and cloud services that are easy for a small team to operate after launch.</p>
        </div>
        <section className="mt-12 rounded-3xl border border-[#2a2722] bg-[#15130f] p-6">
          <h2 className="text-2xl font-semibold">At a glance</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div><dt className="text-sm text-[#a8a195]">Location</dt><dd>{SITE.location}</dd></div>
            <div><dt className="text-sm text-[#a8a195]">Work model</dt><dd>Remote, international clients</dd></div>
            <div><dt className="text-sm text-[#a8a195]">Focus</dt><dd>SaaS, platforms, editors, DevOps</dd></div>
            <div><dt className="text-sm text-[#a8a195]">Contact</dt><dd>{SITE.email}</dd></div>
          </dl>
        </section>
      </main>
      <SEO includeProfile breadcrumbs={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }]} page={{ name: "About Hamza Benarfa", description: SITE.description, url: "/about", dateModified: "2026-05-14" }} />
    </div>
  );
}
