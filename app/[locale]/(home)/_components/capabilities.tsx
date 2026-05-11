interface ServiceItem {
  num: string;
  glyph: string;
  title: string;
  desc: string;
}

const services: ServiceItem[] = [
  {
    num: "01",
    glyph: "MVP",
    title: "Product MVP Build",
    desc: "For founders who need a working SaaS, dashboard, marketplace, or internal tool — from idea to launch. I handle scope, architecture, frontend, backend, auth, payments, storage, and deployment.",
  },
  {
    num: "02",
    glyph: "SaaS",
    title: "SaaS Platform Development",
    desc: "For businesses that need a real multi-user platform. Multi-role access, admin panels, analytics, file storage, billing, and scalable architecture — not just a website.",
  },
  {
    num: "03",
    glyph: "CE",
    title: "Custom Editors & Visual Tools",
    desc: "Canvas-based product customizers, Canva-style editors, mockup generators, and image manipulation tools. Konva.js and Fabric.js specialist — this is a genuine differentiator.",
  },
  {
    num: "04",
    glyph: "OPS",
    title: "DevOps & Launch Infrastructure",
    desc: "Docker, GitHub Actions CI/CD, Nginx, cloud deployment, monitoring, and security hardening. For teams that need production stability handled without a dedicated ops hire.",
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
          <div key={s.num} className="service reveal">
            <span className="num">{s.num}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
            <span className="glyph">{s.glyph}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
