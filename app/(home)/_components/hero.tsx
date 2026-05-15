export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-orb" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />


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
        <div className="hero-copy">
          <p className="hero-blurb">
            I&rsquo;m <strong>Hamza Benarfa</strong> — a full-stack product engineer
            for founders and small teams who need the first serious version of a
            SaaS, marketplace, dashboard, or custom workflow shipped end to end.
          </p>

        </div>
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
