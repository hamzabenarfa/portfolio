export function Hero() {
  return (
    <section className="hero" id="top">
      <h1 className="hero-title">
        <span className="line">
          <span className="inner">SaaS products,</span>
        </span>
        <span className="line">
          <span className="inner">
            dashboards <span className="accent">&amp;</span>
          </span>
        </span>
        <span className="line">
          <span className="inner">web platforms.</span>
        </span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-blurb">
          I&rsquo;m <strong>Hamza Benarfa</strong> — I work with founders and
          small teams to design, build, deploy, and maintain production‑ready
          software.{" "}
          <em style={{ fontFamily: "var(--font-instrument-serif), serif" }}>
            Frontend, backend, infrastructure, and handoff
          </em>{" "}
          — handled by one person, start to finish.
        </p>
        <div className="hero-cta-row">
          <a
            href="https://wa.me/21622633345"
            className="btn btn-accent"
            data-cursor-hover
            target="_blank"
            rel="noreferrer"
          >
            <span>Book a call</span>
            <span className="arrow">↗</span>
          </a>
          <a href="#work" className="btn" data-cursor-hover>
            <span>See selected work</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
