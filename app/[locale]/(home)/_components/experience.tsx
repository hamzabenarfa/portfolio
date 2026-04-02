"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { WORK_EXPERIENCE } from "@/data/consts";
import { Section } from "@/components/section";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Experience() {
    const t = useTranslations();
    const [activeIndex, setActiveIndex] = useState(0);
    const activeJob = WORK_EXPERIENCE[activeIndex];

    return (
        <Section id="work" className="py-20">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <motion.h2
                    variants={fadeInUp}
                    className="text-3xl sm:text-4xl font-light mb-10"
                >
                    {t("experience.title")}
                </motion.h2>

                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col lg:flex-row gap-0 lg:gap-8"
                >
                    {/* ── Left: Tabs ── */}
                    <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 lg:w-[340px] shrink-0 border-b lg:border-b-0 lg:border-r border-secondary/20 pb-2 lg:pb-0 lg:pr-2">
                        {WORK_EXPERIENCE.map((job, index) => (
                            <TabButton
                                key={job.id}
                                job={job}
                                isActive={index === activeIndex}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>

                    {/* ── Right: Detail Panel ── */}
                    <div className="flex-1 min-h-[320px] pt-6 lg:pt-0 lg:pl-2">
                        <AnimatePresence mode="wait">
                            <DetailPanel key={activeJob.id} job={activeJob} />
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </Section>
    );
}

/* ─────────────────────────── Tab Button ─────────────────────────── */

function TabButton({
    job,
    isActive,
    onClick,
}: {
    job: (typeof WORK_EXPERIENCE)[0];
    isActive: boolean;
    onClick: () => void;
}) {
    const t = useTranslations(`experienceItems.${job.key}`);

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                group relative flex items-center gap-4 w-full text-left
                pl-5 pr-3 py-4 transition-all duration-300
                cursor-pointer whitespace-nowrap lg:whitespace-normal
                ${isActive ? "opacity-100" : "opacity-50 hover:opacity-80"}
            `}
            aria-label={`View details for ${t("role")} at ${t("company")}`}
            aria-selected={isActive}
            role="tab"
        >
            {/* Active indicator — thin left accent */}
            <motion.span
                layoutId="activeTab"
                className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-primary hidden lg:block"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />

            {/* Company Logo */}
            <CompanyLogo logo={job.logo} company={t("company")} />

            {/* Info */}
            <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                    {t("company")}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {t("role")}
                </p>
                <p className="text-[11px] text-muted-foreground/50 mt-1">
                    {t("year")}
                </p>
            </div>
        </button>
    );
}

/* ─────────────────────────── Detail Panel ─────────────────────────── */

function DetailPanel({ job }: { job: (typeof WORK_EXPERIENCE)[0] }) {
    const t = useTranslations(`experienceItems.${job.key}`);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
        >
            {/* Header */}
            <div>
                <h3 className="text-xl sm:text-2xl font-medium text-foreground">
                    {t("role")}
                </h3>
                <p className="text-sm text-primary/80 mt-1">
                    {t("company")} &middot; {t("year")}
                </p>
            </div>

            {/* Description */}
            <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Overview
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                    {t("description")}
                </p>
            </div>

            {/* Details */}
            <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Details
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                    {t("details")}
                </p>
            </div>

            {/* Tech */}
            <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                    {job.tech.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs px-3 py-1.5 rounded-full bg-secondary/20 text-foreground border border-secondary/40 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────── Company Logo (graceful fallback) ─────────────────────────── */

function CompanyLogo({
    logo,
    company,
}: {
    logo?: string;
    company: string;
}) {
    const initials = company
        .split(/[\s-]+/)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-secondary/20 border border-secondary/30 flex items-center justify-center">
            {logo ? (
                <Image
                    src={logo}
                    alt={company}
                    fill
                    sizes="40px"
                    className="object-cover"
                    onError={(e) => {
                        // Hide the broken image — the fallback initials behind it become visible
                        (e.target as HTMLImageElement).style.display = "none";
                    }}
                />
            ) : null}
            {/* Fallback initials — always rendered behind the image */}
            <span className="text-xs font-bold text-muted-foreground select-none absolute">
                {initials}
            </span>
        </div>
    );
}
