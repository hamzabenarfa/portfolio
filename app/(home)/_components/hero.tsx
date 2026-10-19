"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { TesseraField, WALL } from "@/components/fx/tessera-field";
import { Magnetic } from "@/components/fx/magnetic";
import { LocalTime } from "@/components/fx/local-time";
import { TrackedLink } from "@/components/fx/tracked-link";
import { prefersReducedMotion, whenStageReady } from "@/lib/stage";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = root.current;
      if (!el || prefersReducedMotion() || !contextSafe) return;
      const name = el.querySelector<HTMLElement>(".hero-name")!;

      const squeezeOnScroll = () => {
        // Once settled, scrolling away squeezes the name back toward condensed.
        gsap.fromTo(
          name,
          { "--wdth": 125 },
          {
            "--wdth": 86,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
          },
        );
      };

      const play = contextSafe(() => {
        const enter = el.querySelectorAll("[data-enter]");
        // Scripts were slow and the CSS fallback already showed everything: don't replay it.
        if (getComputedStyle(name).opacity === "1") {
          gsap.set([name, ...enter], { autoAlpha: 1, y: 0, animation: "none" });
          squeezeOnScroll();
          return;
        }
        const lines = SplitText.create(name.querySelectorAll(".hero-line"), { type: "chars", aria: "none" });
        // Scripts own these now; drop the CSS fallback so it can't snap mid-animation.
        gsap.set([name, ...enter], { animation: "none" });
        gsap.set(name, { autoAlpha: 1 });
        const tl = gsap.timeline({ delay: 0.1 });
        // The name rises out of the wall while stretching from condensed to expanded.
        tl.from(lines.chars, { yPercent: 115, duration: 1.2, ease: "expo.out", stagger: 0.04 }, 0)
          .fromTo(name, { "--wdth": 75 }, { "--wdth": 125, duration: 1.7, ease: "expo.out" }, 0)
          .to(enter, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 }, 0.45)
          .add(squeezeOnScroll);
      });

      return whenStageReady(play);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="home-hero" id="top" aria-labelledby="hero-title">
      <div className="hero-wall">
        <TesseraField palette={WALL} className="wall-canvas" />
        <div className="hero-stage">
          <p className="hero-role" data-enter="">
            Independent full-stack developer in Tunis, working with teams worldwide.
          </p>
          <h1 id="hero-title" className="hero-name" aria-label="Hamza Benarfa">
            <span className="hero-line" aria-hidden="true">Hamza</span>
            <span className="hero-line" aria-hidden="true">Benarfa</span>
          </h1>
        </div>
      </div>
      <div className="hero-bar">
        <p className="hero-lead" data-enter="">
          I design and build web products end to end, from the first Figma frame to the deployed app, for founders and small teams.
        </p>
        <div className="hero-actions" data-enter="">
          <Magnetic strength={0.25}>
            <a href="#work" className="button button-solid">See the work</a>
          </Magnetic>
          <TrackedLink href="mailto:contact@benarfa.com" className="button button-ghost" event="contact_click" eventData={{ method: "email", source: "hero" }}>
            Email me
          </TrackedLink>
        </div>
        <p className="hero-meta" data-enter="">
          <LocalTime />
          <span>Replies within one business day</span>
        </p>
      </div>
    </section>
  );
}
