import { Boxes, CloudCog, PanelsTopLeft, WandSparkles } from "lucide-react";
import { SectionHead } from "./section-head";
import "./supporting-sections.css";

const services = [
  {
    num: "01",
    icon: WandSparkles,
    title: "Product MVPs",
    desc: "A clear path from idea to a working SaaS, dashboard, marketplace, or internal tool — including scope, architecture, build, and launch.",
    tags: ["Scoping", "Architecture", "Auth & payments", "Launch"],
  },
  {
    num: "02",
    icon: Boxes,
    title: "SaaS platforms",
    desc: "Multi-user products with the roles, admin tools, billing, analytics, and storage that a real business needs to operate.",
    tags: ["Multi-role", "Admin tools", "Billing", "Analytics"],
  },
  {
    num: "03",
    icon: PanelsTopLeft,
    title: "Editors & visual tools",
    desc: "Custom product builders, canvas-based editors, mockup generators, and image tools built around the way people create.",
    tags: ["Konva.js", "Fabric.js", "Customizers", "Image pipelines"],
  },
  {
    num: "04",
    icon: CloudCog,
    title: "DevOps & infrastructure",
    desc: "Production deployment and operations, from containers and CI/CD to monitoring and security hardening.",
    tags: ["Docker", "CI/CD", "Nginx", "Monitoring"],
  },
];

export function Capabilities() {
  return (
    <section id="services" className="section container support-services">
      <SectionHead
        index="02"
        label="Services"
        title={<>A full-stack<br />point of view.</>}
        meta={<>Four areas of practice</>}
      />
      <div className="service-list">
        {services.map(({ num, icon: Icon, title, desc, tags }) => (
          <article className="service-row" key={num}>
            <span className="service-icon" aria-hidden="true"><Icon size={21} strokeWidth={1.7} /></span>
            <div className="service-copy">
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="service-tags" aria-label={`${title} capabilities`}>
                {tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
