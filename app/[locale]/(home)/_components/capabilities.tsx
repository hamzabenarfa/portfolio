interface ServiceItem {
  num: string;
  glyph: string;
  title: string;
  desc: string;
}

const services: ServiceItem[] = [
  {
    num: "01",
    glyph: "W",
    title: "Web Apps",
    desc: "Full‑stack web apps with Next.js — from marketing pages to complex dashboards with auth, payments, and real‑time features.",
  },
  {
    num: "02",
    glyph: "M",
    title: "Mobile Apps",
    desc: "Cross‑platform iOS and Android apps using React Native and Expo, sharing logic with the web wherever it makes sense.",
  },
  {
    num: "03",
    glyph: "A",
    title: "APIs & Backend",
    desc: "REST and GraphQL APIs in Node and NestJS, backed by PostgreSQL or MongoDB. Tested, typed, documented.",
  },
  {
    num: "04",
    glyph: "V",
    title: "MVPs end‑to‑end",
    desc: "Turning ideas into working products. I handle the full stack so founders can focus on customers, not architecture decisions.",
  },
];

export function Capabilities() {
  return (
    <section className="container services">
      <div className="section-header reveal">
        <span className="num">[ 03 / Services ]</span>
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
