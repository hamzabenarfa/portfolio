import type { ReactNode } from "react";
import { TesseraField, DOOR } from "@/components/fx/tessera-field";
import { Magnetic } from "@/components/fx/magnetic";
import { TrackedLink } from "@/components/fx/tracked-link";
import { EMAIL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL } from "@/data/contact";

export function Contact({
  title = "Have a product in mind?",
  lede = <>Tell me what you’re trying to build. I usually reply within one business day.</>,
  project,
}: {
  title?: string;
  lede?: ReactNode;
  /** Case-study slug, so contact clicks are attributed to the page they came from. */
  project?: string;
}) {
  const source: Record<string, string> = project ? { source: "case_study", project } : { source: "contact_primary" };
  return (
    <section id="contact" className="contact-wall" aria-labelledby="contact-title">
      <TesseraField palette={DOOR} intro={false} seed={23} className="contact-canvas" />
      <div className="contact-inner">
        <h2 id="contact-title" className="contact-title">{title}</h2>
        <p className="contact-lede">{lede}</p>
        <Magnetic strength={0.12} className="contact-email-wrap">
          <TrackedLink href={`mailto:${EMAIL}`} className="contact-email" event="contact_click" eventData={{ method: "email", ...source }}>
            {EMAIL}
          </TrackedLink>
        </Magnetic>
      </div>
      <div className="contact-columns">
        <div>
          <h3>Phone and WhatsApp</h3>
          <TrackedLink href={WHATSAPP_URL} target="_blank" rel="noreferrer" event="contact_click" eventData={{ method: "whatsapp", ...source }}>
            Message on WhatsApp <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span>
          </TrackedLink>
          <TrackedLink href={`tel:${PHONE_E164}`} event="contact_click" eventData={{ method: "phone", ...source }}>
            {PHONE_DISPLAY}
          </TrackedLink>
        </div>
        <div>
          <h3>Elsewhere</h3>
          <TrackedLink href="https://github.com/hamzabenarfa/" target="_blank" rel="noreferrer" event="contact_click" eventData={{ method: "github", source: "contact_grid" }}>
            GitHub <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span>
          </TrackedLink>
          <TrackedLink href="https://www.linkedin.com/in/hamzabenarfa/" target="_blank" rel="noreferrer" event="contact_click" eventData={{ method: "linkedin", source: "contact_grid" }}>
            LinkedIn <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span>
          </TrackedLink>
        </div>
        <div>
          <h3>For hiring teams</h3>
          <TrackedLink href="/benarfa-hamza-en.pdf" download event="contact_click" eventData={{ method: "cv", source: "contact_grid" }}>
            Download CV (PDF)
          </TrackedLink>
        </div>
        <div>
          <h3>Working hours</h3>
          <p>Monday to Friday</p>
          <p>09:00–19:00, Tunis time (GMT+1)</p>
        </div>
      </div>
    </section>
  );
}
