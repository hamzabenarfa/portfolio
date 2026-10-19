import Link from "next/link";
import { MosaicImage } from "@/components/fx/mosaic-image";
import { ScrollWords } from "@/components/fx/scroll-words";

export function Statement() {
  return (
    <section className="statement" aria-labelledby="statement-title">
      <h2 id="statement-title" className="visually-hidden">About Hamza</h2>
      <figure className="statement-portrait">
        <MosaicImage
          src="/avatar.jpeg"
          alt="Portrait of Hamza Benarfa"
          sizes="(max-width: 860px) 120px, 220px"
          coarseness={8}
          grout="#e1e3dc"
          objectPosition="center"
          start="top 90%"
          end="top 45%"
        />
        <figcaption>Hamza Benarfa<br />Tunis, Tunisia</figcaption>
      </figure>
      <div className="statement-body">
        <ScrollWords
          className="statement-text"
          text="I help founders and small teams turn an idea into a deployed product. One person owns the whole build, from interface and API to database and deployment, so you never coordinate between contractors."
        />
        <Link href="/background" className="text-link">My background and stack</Link>
      </div>
    </section>
  );
}
