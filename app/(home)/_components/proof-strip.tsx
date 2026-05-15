const laneSteps = [
  {
    num: "01",
    label: "Understand",
    title: "Choose what matters first",
    copy: "We turn the idea into a small, clear first release: who it is for, what it must do, and what can wait.",
  },
  {
    num: "02",
    label: "Plan",
    title: "Design how it works",
    copy: "Before building, I map the screens, user roles, data, admin needs, and tricky parts so the product has a real structure.",
  },
  {
    num: "03",
    label: "Build",
    title: "Ship working pieces",
    copy: "You see progress through usable product slices — not vague updates. Each slice moves closer to a launchable version.",
  },
  {
    num: "04",
    label: "Launch",
    title: "Make it ready to run",
    copy: "I finish the practical details: deployment, responsive checks, basic docs, and a clear path for what comes next.",
  },
];

const deliverables = [
  "A clear first-version scope",
  "Working product screens and flows",
  "Admin or operator tools when needed",
  "Launch notes and next-step recommendations",
];

export function ProofStrip() {
  return (
    <section className="container production-lane" aria-label="Production lane workflow">
      <div className="production-lane-header reveal">
        <span className="eyebrow eyebrow-dot">Production lane</span>
        <h2>
          From rough idea to a <em>working product</em> without the handoff chaos.
        </h2>
        <p>
          I help you decide what to build first, design how it should work, build
          the important pieces, launch it, and leave you with a clear next step.
        </p>
      </div>

      <div className="lane-board reveal">
        <div className="lane-rail" aria-hidden="true" />
        {laneSteps.map((step) => (
          <article className="lane-node" key={step.num}>
            <div className="lane-node-top">
              <span>{step.num}</span>
              <strong>{step.label}</strong>
            </div>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>

      <div className="lane-dispatch reveal-stagger">
        <article className="dispatch-terminal">
          <span className="dispatch-kicker">What you get</span>
          <ul>
            {deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="dispatch-card">
          <span>Best for</span>
          <strong>Founders or teams who need one person to own the product build from planning to launch.</strong>
        </article>
        <article className="dispatch-card">
          <span>Not for</span>
          <strong>Simple brochure pages or projects that only need a visual mockup.</strong>
        </article>
      </div>
    </section>
  );
}
