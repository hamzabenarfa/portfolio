import Link from "next/link";
import { ENGAGEMENTS } from "@/data/experience";

export function Experience() {
  return (
    <section className="experience" aria-labelledby="experience-title">
      <div className="experience-head">
        <h2 id="experience-title" className="section-title">Where I’ve worked</h2>
        <Link href="/background" className="text-link">Full background</Link>
      </div>
      <ol className="experience-list">
        {ENGAGEMENTS.map((e) => (
          <li key={e.company}>
            <span className="experience-company">{e.company}</span>
            <span className="experience-role">{e.role}</span>
            <span className="experience-period">{e.period}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
