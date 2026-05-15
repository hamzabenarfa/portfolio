import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import { SEO } from "@/components/seo/seo";
import { SERVICES } from "@/data/services";
import { getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description: "Full-stack development services for MVPs, SaaS platforms, custom editors, and launch infrastructure.",
  alternates: getAlternates("/services"),
};

export default function ServicesPage() {
  return (
    <div id="top" className="min-h-screen bg-[#0c0b09] text-[#f4efe3]">
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <p className="eyebrow eyebrow-dot">Services</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Full-stack product development from scope to launch.</h1>
        <p className="mt-6 max-w-2xl text-lg text-[#a8a195]">Commercial-intent service pages with direct answers, deliverables, related case studies, and conservative claims.</p>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SERVICES.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-3xl border border-[#2a2722] bg-[#15130f] p-6 transition hover:border-[#ff5722]">
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <p className="mt-4 text-sm leading-6 text-[#a8a195]">{service.description}</p>
              <span className="mt-6 inline-block text-sm text-[#ff7a4d]">Read service details →</span>
            </Link>
          ))}
        </div>
      </main>
      <SEO breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]} page={{ name: "Services", description: "Full-stack development services by Hamza Benarfa.", url: "/services", dateModified: "2026-05-14" }} />
    </div>
  );
}
