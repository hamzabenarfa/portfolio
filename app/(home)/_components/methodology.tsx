import { SectionHead } from "./section-head";

const steps = [
  { num: "01", title: "Find the signal", desc: "Start with the business problem. Map the user journey, agree on the right scope, and choose a stack that fits." },
  { num: "02", title: "Build in the open", desc: "Work in focused weekly sprints, with a deployable staging demo at the end of each one." },
  { num: "03", title: "Make it ready", desc: "Check the experience across screen sizes, test core flows, and tune performance before launch." },
  { num: "04", title: "Ship & support", desc: "Handle deployment and handover, with documentation and ongoing support to keep the product moving." },
];

export function Methodology() {
  return (
    <section id="process" className="section process-section support-process">
      <div className="container">
        <SectionHead
          index="03"
          label="Process"
          title={<>Good work.<br />Clear process.</>}
          meta={<>From first call to production<br />Clear progress at every step</>}
        />
        <div className="process-steps">
          {steps.map((step) => (
            <article className="process-step" key={step.num}>
              <span className="process-step-number">{step.num}</span>
              <div className="process-step-copy">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
