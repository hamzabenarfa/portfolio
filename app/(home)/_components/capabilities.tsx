interface ServiceItem {
  num: string;
  glyph: string;
  title: string;
  desc: string;
  outcome: string;
  deliverables: string[];
}

const services: ServiceItem[] = [
  {
    num: "01",
    glyph: "MVP",
    title: "Product MVP Build",
    desc: "For founders who need a working SaaS, dashboard, marketplace, or internal tool — from idea to launch. I handle scope, architecture, frontend, backend, auth, payments, storage, and deployment.",
    outcome: "A usable first version with the critical path live, not a prototype stuck in Figma.",
    deliverables: ["Product scope", "Core flows", "Deployable app"],
  },
  {
    num: "02",
    glyph: "SaaS",
    title: "SaaS Platform Development",
    desc: "For businesses that need a real multi-user platform. Multi-role access, admin panels, analytics, file storage, billing, and scalable architecture — not just a website.",
    outcome: "The platform pieces users, admins, and operators need to work from day one.",
    deliverables: ["Auth/RBAC", "Admin panels", "Billing/data"],
  },
  {
    num: "03",
    glyph: "CE",
    title: "Custom Editors & Visual Tools",
    desc: "Canvas-based product customizers, Canva-style editors, mockup generators, and image manipulation tools. Konva.js and Fabric.js specialist — this is a genuine differentiator.",
    outcome: "Interactive product experiences that are hard to copy with templates or basic CRUD.",
    deliverables: ["Canvas UX", "State model", "Export flows"],
  },
  {
    num: "04",
    glyph: "OPS",
    title: "DevOps & Launch Infrastructure",
    desc: "Docker, GitHub Actions CI/CD, Nginx, cloud deployment, monitoring, and security hardening. For teams that need production stability handled without a dedicated ops hire.",
    outcome: "A launch path with repeatable deploys, environment clarity, and fewer midnight surprises.",
    deliverables: ["CI/CD", "Docker", "Runbook"],
  },
];

export function Capabilities() {
  return (
    <section id="services" className="container services">
      <div className="section-header reveal">
        <span className="num">[ 02 / Services ]</span>
        <h2 className="title">
          What I <em>build</em>
        </h2>
        <span className="meta">04 areas of practice</span>
      </div>

      <div className="services-grid">
        {services.map((s) => (
          <article key={s.num} className="service reveal">
            <span className="num">{s.num}</span>
            <div className="service-copy">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-outcome">
                <span>Outcome</span>
                <strong>{s.outcome}</strong>
              </div>
              <div className="service-tags">
                {s.deliverables.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <span className="glyph">{s.glyph}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
