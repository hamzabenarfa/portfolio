import { WORK_EXPERIENCE } from "@/data/consts";

export const WorkItem = ({
    job,
    onClick,
  }: {
    job: (typeof WORK_EXPERIENCE)[0];
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className="group grid lg:grid-cols-12 gap-4 sm:gap-6 py-6 sm:py-8 border-b border-secondary/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer rounded-lg px-4 -mx-4"
    >
      <div className="lg:col-span-3">
        <div className="text-lg sm:text-xl font-light text-muted-foreground group-hover:text-primary transition-colors duration-300">
          {job.year}
        </div>
      </div>
      <div className="lg:col-span-9 space-y-3">
        <div>
          <h3 className="text-lg sm:text-xl font-medium text-foreground">{job.role}</h3>
          <div className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 mt-0.5">{job.company}</div>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[70ch]">{job.description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {job.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-secondary/30 text-muted-foreground border border-secondary/40 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );