import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import { StructuredData } from "@/components/seo/structured-seo-data";
import { SEO } from "@/components/seo/seo";
import { PROJECTS } from "@/data/consts";
import { getService, SERVICES } from "@/data/services";
import { getAlternates } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: getAlternates(`/services/${service.slug}`),
    openGraph: {
      title: service.title,
      description: service.description,
      url: `/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedProjects = PROJECTS.filter((project) => service.relatedProjectSlugs.includes(project.slug));

  return (
    <div id="top" className="min-h-screen bg-[#0c0b09] text-[#f4efe3]">
      <Header />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-36">
        <Link href="/services" className="text-sm text-[#ff7a4d]">← Services</Link>
        <p className="eyebrow eyebrow-dot mt-10">Service</p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">{service.title}</h1>
        <section className="mt-10 rounded-3xl border border-[#ff5722]/40 bg-[#15130f] p-6">
          <h2 className="text-xl font-semibold">Direct answer</h2>
          <p className="mt-4 text-lg leading-8 text-[#c9c1b4]">{service.answer}</p>
        </section>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-[#2a2722] bg-[#15130f] p-6">
            <h2 className="text-2xl font-semibold">Typical outcomes</h2>
            <ul className="mt-5 space-y-3 text-[#c9c1b4]">
              {service.outcomes.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </section>
          <section className="rounded-3xl border border-[#2a2722] bg-[#15130f] p-6">
            <h2 className="text-2xl font-semibold">Deliverables</h2>
            <ul className="mt-5 space-y-3 text-[#c9c1b4]">
              {service.deliverables.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </section>
        </div>
        {relatedProjects.length > 0 && (
          <section className="mt-10 rounded-3xl border border-[#2a2722] bg-[#15130f] p-6">
            <h2 className="text-2xl font-semibold">Related case studies</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {relatedProjects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="rounded-2xl border border-[#2a2722] p-4 transition hover:border-[#ff5722]">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-[#a8a195]">{project.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SEO
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: service.shortTitle, url: `/services/${service.slug}` }]}
        page={{ name: service.title, description: service.description, url: `/services/${service.slug}`, dateModified: service.updatedAt }}
      />
      <StructuredData type="Service" service={service} />
    </div>
  );
}
