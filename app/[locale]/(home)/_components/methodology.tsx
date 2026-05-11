interface Step {
  num: string;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Discovery & planning",
    desc: "Every project starts with the business problem. I map user flows, define the stack, and create a clear roadmap before any code. Reduces scope creep, aligns expectations.",
  },
  {
    num: "02",
    title: "Iterative builds",
    desc: "Weekly sprints in Next.js and TypeScript — chosen for type safety and performance. Each sprint ends with a deployable demo on staging so you watch progress in real time.",
  },
  {
    num: "03",
    title: "Quality & speed",
    desc: "Every feature ships with automated tests, responsive checks, and Lighthouse audits. Projects consistently score 90+ on Core Web Vitals.",
  },
  {
    num: "04",
    title: "Launch & support",
    desc: "I handle the full deploy pipeline — Docker, GitHub Actions CI/CD, monitoring. Post‑launch documentation and ongoing support keep things running.",
  },
];

export function Methodology() {
  return (
    <section id="process" className="container process">
      <div className="section-header reveal">
        <span className="num">[ 03 / Process ]</span>
        <h2 className="title">
          How I <em>work</em>
        </h2>
        <span className="meta">
          First call → production
          <br />
          Transparent at each step
        </span>
      </div>

      <div className="process-grid">
        {steps.map((s) => (
          <div key={s.num} className="process-step reveal">
            <span className="num">{s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
