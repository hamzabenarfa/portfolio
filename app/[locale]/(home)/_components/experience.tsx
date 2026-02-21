"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { WORK_EXPERIENCE } from "@/data/consts";
import JobModal from "@/components/job-modal";
import { WorkItem } from "./work-item";

import { Section } from "@/components/section";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Experience() {
    const t = useTranslations();
    const [selectedJob, setSelectedJob] = useState<
        (typeof WORK_EXPERIENCE)[0] | null
    >(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleJobClick = (job: (typeof WORK_EXPERIENCE)[0]) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    return (
        <>
            <Section id="work" className="py-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl font-light mb-8"
                    >
                        {t("experience.title")}
                    </motion.h2>
                    <motion.div variants={fadeInUp}>
                        {WORK_EXPERIENCE.map((job) => (
                            <WorkItem
                                key={job.id}
                                job={job}
                                onClick={() => handleJobClick(job)}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </Section>

            <JobModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                job={selectedJob}
            />
        </>
    );
}
