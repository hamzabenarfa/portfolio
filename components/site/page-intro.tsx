import type { ReactNode } from "react";
import { TesseraField, WALL } from "@/components/fx/tessera-field";

/** Standalone-page opener: a shorter stretch of the tiled wall with the page title laid on it. */
export function PageIntro({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="page-intro" id="top" aria-labelledby={id}>
      <div className="page-wall">
        <TesseraField palette={WALL} seed={41} className="wall-canvas" />
        <h1 id={id} className="page-title">{title}</h1>
      </div>
      <div className="page-bar">{children}</div>
    </section>
  );
}
