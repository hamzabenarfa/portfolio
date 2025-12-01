import { Section } from "lucide-react";
import { WORK_EXPERIENCE } from "@/data/consts";
import { WorkItem } from "./work-item";

export default function WorkSection() {

    return (
        <Section id="work" className="">
            <h2 className="text-3xl sm:text-4xl font-light mb-2.5">Experience</h2>


            {WORK_EXPERIENCE.map((job) => (
                <WorkItem
                    key={job.id}
                    job={job}
                />
            ))}
        </Section>
    )
}