import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/fx/tracked-link";

export function Connect() {
  return (
    <section id="contact" className="contact support-contact">
      <div className="container">
        <div className="contact-intro">
          <div className="support-eyebrow">Your next chapter</div>
          <h2 className="contact-display">Have a good idea?<br />Let’s make it real.</h2>
          <p className="contact-lede">Have a product in mind? Tell me what you&rsquo;re trying to build.</p>
          <TrackedLink
            href="mailto:contact@benarfa.com"
            className="contact-mail"
            event="contact_click"
            eventData={{ method: "email", source: "contact_primary" }}
          >
            <span>contact@benarfa.com</span><ArrowUpRight size={20} aria-hidden="true" />
          </TrackedLink>
          <div className="contact-author">
            <Image src="/avatar.jpeg" alt="Hamza Benarfa" width={48} height={48} />
            <span><strong>Hamza Benarfa</strong><small>Full-stack developer · Tunis, Tunisia</small></span>
            <span className="contact-availability"><i aria-hidden="true" /> Usually replies within one business day</span>
          </div>
        </div>

        <div className="contact-grid">
          <div>
            <h3>Direct</h3>
            <TrackedLink href="mailto:contact@benarfa.com" event="contact_click" eventData={{ method: "email", source: "contact_grid" }}>Email me</TrackedLink>
          </div>
          <div>
            <h3>Elsewhere</h3>
            <TrackedLink href="https://github.com/hamzabenarfa/" target="_blank" rel="noreferrer" event="contact_click" eventData={{ method: "github", source: "contact_grid" }}>GitHub ↗</TrackedLink>
            <TrackedLink href="https://www.linkedin.com/in/hamzabenarfa/" target="_blank" rel="noreferrer" event="contact_click" eventData={{ method: "linkedin", source: "contact_grid" }}>LinkedIn ↗</TrackedLink>
          </div>
          <div>
            <h3>Documents</h3>
            <TrackedLink href="/benarfa-hamza-en.pdf" download event="contact_click" eventData={{ method: "cv", source: "contact_grid" }}>Developer CV ↓</TrackedLink>
            <TrackedLink href="/benarfa-hamza-en.pdf" download event="contact_click" eventData={{ method: "cv", source: "contact_grid_hiring" }}>For hiring teams</TrackedLink>
          </div>
          <div>
            <h3>Working hours</h3>
            <p>Mon — Fri</p>
            <p>09:00 — 19:00 GMT+1</p>
          </div>
        </div>
      </div>
    </section>
  );
}
