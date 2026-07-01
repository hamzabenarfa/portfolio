import { TextReveal, FadeUp } from "@/components/fx/reveal";
import { Magnetic } from "@/components/fx/magnetic";
import { TrackedLink } from "@/components/fx/tracked-link";

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
            <TrackedLink
              href="mailto:contact@benarfa.com"
              className="contact-mail"
              data-cursor="hover"
              event="contact_click"
              eventData={{ method: "email", source: "contact_primary" }}
            >
              <span className="icon">→</span>
              contact@benarfa.com
            </TrackedLink>
          </Magnetic>
        </FadeUp>

        <FadeUp className="contact-grid" stagger={0.1} y={28}>
          <div>
            <h4 className="mono">[ Direct ]</h4>
            <TrackedLink
              href="mailto:contact@benarfa.com"
              event="contact_click"
              eventData={{ method: "email", source: "contact_grid" }}
            >
              contact@benarfa.com
            </TrackedLink>
            <TrackedLink
              href="https://wa.me/21622633345"
              target="_blank"
              rel="noreferrer"
              event="contact_click"
              eventData={{ method: "whatsapp", source: "contact_grid" }}
            >
              WhatsApp ↗
            </TrackedLink>
          </div>
          <div>
            <h4 className="mono">[ Elsewhere ]</h4>
            <TrackedLink
              href="https://github.com/hamzabenarfa/"
              target="_blank"
              rel="noreferrer"
              event="contact_click"
              eventData={{ method: "github", source: "contact_grid" }}
            >
              GitHub ↗
            </TrackedLink>
            <TrackedLink
              href="https://www.linkedin.com/in/hamzabenarfa/"
              target="_blank"
              rel="noreferrer"
              event="contact_click"
              eventData={{ method: "linkedin", source: "contact_grid" }}
            >
              LinkedIn ↗
            </TrackedLink>
          </div>
          <div>
            <h4 className="mono">[ Documents ]</h4>
            <TrackedLink
              href="/benarfa-hamza-en.pdf"
              download
              event="contact_click"
              eventData={{ method: "cv", source: "contact_grid" }}
            >
              Developer CV ↓
            </TrackedLink>
            <TrackedLink
              href="/benarfa-hamza-en.pdf"
              download
              event="contact_click"
              eventData={{ method: "cv", source: "contact_grid_hiring" }}
            >
              For hiring teams
            </TrackedLink>
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
