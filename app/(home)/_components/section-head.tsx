import type { ReactNode } from "react";
import { TextReveal, FadeUp } from "@/components/fx/reveal";

export function SectionHead({
  index,
  label,
  title,
  meta,
}: {
  index: string;
  label: string;
  title: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <div>
        <FadeUp className="sec-index" y={0}>
          <span className="rule" />
          <span className="mono">
            <span className="mono-accent">{index}</span> / {label}
          </span>
        </FadeUp>
        <TextReveal as="h2" className="sec-title">
          {title}
        </TextReveal>
      </div>
      {meta ? (
        <FadeUp className="sec-meta mono" y={20} delay={0.15}>
          {meta}
        </FadeUp>
      ) : null}
    </div>
  );
}
