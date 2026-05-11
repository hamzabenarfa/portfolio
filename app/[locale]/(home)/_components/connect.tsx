export function Connect() {
  return (
    <section id="contact" className="contact ">
      <div className="container">
        <span
          className="eyebrow eyebrow-dot reveal"
          style={{ display: "inline-block", marginBottom: 24 }}
        >
          [ 06 / Let&rsquo;s talk ]
        </span>

        <h2 className="contact-display reveal">
          Need a serious <em>technical</em>
          <br />
          partner for your product?
        </h2>

        <a
          href="mailto:contact@benarfa.com"
          className="contact-mail reveal"
          data-cursor-hover
        >
          <span className="icon">→</span>
          contact@benarfa.com
        </a>

        <div className="contact-grid">
          <div>
            <h4>[ Direct ]</h4>
            <a href="mailto:contact@benarfa.com">contact@benarfa.com</a>
            <a
              href="https://wa.me/21622633345"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp ↗
            </a>
          </div>
          <div>
            <h4>[ Elsewhere ]</h4>
            <a href="https://github.com/hamzabenarfa/" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/hamzabenarfa/" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
          <div>
            <h4>[ Documents ]</h4>
            <a href="/benarfa-hamza-en.pdf" download>Developer CV ↓</a>
            <a href="/benarfa-hamza-en.pdf" download>For hiring teams</a>
          </div>
          <div>
            <h4>[ Working hours ]</h4>
            <p>Mon — Fri</p>
            <p>09:00 — 19:00 GMT+1</p>
          </div>
        </div>
      </div>
    </section>
  );
}
