import type { ReactNode } from "react";

export function SectionHead({ label, title, meta }: {
  index?: string;
  label: string;
  title: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <div><div className="sec-index"><span className="section-label">{label}</span></div><h2 className="sec-title">{title}</h2></div>
      {meta ? <div className="sec-meta">{meta}</div> : null}
    </div>
  );
}
