import { TileGlyph } from "@/components/site/tile-glyph";
import { TextReveal } from "@/components/fx/reveal";

const services = [
  {
    glyph: "s../ss./sss",
    title: "Product MVPs",
    desc: "A clear path from idea to a working SaaS, dashboard, marketplace, or internal tool — including scope, architecture, build, and launch.",
    tags: ["Scoping", "Architecture", "Auth & payments", "Launch"],
  },
  {
    glyph: "bbb/bnb/bbb",
    title: "SaaS platforms",
    desc: "Multi-user products with the roles, admin tools, billing, analytics, and storage that a real business needs to operate.",
    tags: ["Multi-role", "Admin tools", "Billing", "Analytics"],
  },
  {
    glyph: "sbr/bsb/rbs",
    title: "Editors & visual tools",
    desc: "Custom product builders, canvas-based editors, mockup generators, and image tools built around the way people create.",
    tags: ["Konva.js", "Fabric.js", "Customizers", "Image pipelines"],
  },
  {
    glyph: "nbn/nbn/nbn",
    title: "DevOps & infrastructure",
    desc: "Production deployment and operations, from containers and CI/CD to monitoring and security hardening.",
    tags: ["Docker", "CI/CD", "Nginx", "Monitoring"],
  },
];

export function Services() {
  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="services-head">
        <TextReveal as="h2" id="services-title" className="section-title">What I build</TextReveal>
        <p>Four kinds of work I take on, often inside the same project.</p>
      </div>
      <div className="services-list">
        {services.map(({ glyph, title, desc, tags }) => (
          <article className="service" key={title}>
            <TileGlyph pattern={glyph} className="service-glyph" />
            <h3>{title}</h3>
            <p>{desc}</p>
            <ul className="service-tags" aria-label={`${title} includes`}>
              {tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
