import { TextReveal, FadeUp } from "@/components/fx/reveal";
import { Magnetic } from "@/components/fx/magnetic";

export function Connect() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <FadeUp className="sec-index" y={0}>
          <span className="rule" />
          <span className="mono">
            <span className="mono-accent">05</span> / Let&rsquo;s talk
          </span>
        </FadeUp>

        <TextReveal as="h2" className="contact-display">
          Need a serious
          <br />
          <em>technical</em> partner?
        </TextReveal>

        <FadeUp delay={0.25}>
          <Magnetic strength={0.25}>
            <a
              href="mailto:contact@benarfa.com"
              className="contact-mail"
              data-cursor="hover"
            >
              <span className="icon">→</span>
              contact@benarfa.com
            </a>
          </Magnetic>
        </FadeUp>

        <FadeUp className="contact-grid" stagger={0.1} y={28}>
          <div>
            <h4 className="mono">[ Direct ]</h4>
            <a href="mailto:contact@benarfa.com">contact@benarfa.com</a>
            <a href="https://wa.me/21622633345" target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
          </div>
          <div>
            <h4 className="mono">[ Elsewhere ]</h4>
            <a href="https://github.com/hamzabenarfa/" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/hamzabenarfa/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
          <div>
            <h4 className="mono">[ Documents ]</h4>
            <a href="/benarfa-hamza-en.pdf" download>
              Developer CV ↓
            </a>
            <a href="/benarfa-hamza-en.pdf" download>
              For hiring teams
            </a>
          </div>
          <div>
            <h4 className="mono">[ Working hours ]</h4>
            <p>Mon — Fri</p>
            <p>09:00 — 19:00 GMT+1</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
