"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Search, Code2, Gauge, Rocket } from "lucide-react";

const STEP_ICONS = [Search, Code2, Gauge, Rocket];

export function Methodology() {
    const t = useTranslations();

    const steps = [0, 1, 2, 3].map((i) => ({
        title: t(`methodology.steps.${i}.title`),
        description: t(`methodology.steps.${i}.description`),
        Icon: STEP_ICONS[i],
    }));

    return (
        <Section id="methodology" className="py-20 border-t border-secondary/30">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-12"
            >
                <motion.div variants={fadeInUp} className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-semibold">
                        {t("methodology.title")}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-[65ch]">
                        {t("methodology.description")}
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="group flex gap-4 p-5 rounded-xl border border-secondary/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                        >
                            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                                <step.Icon className="w-5 h-5" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-foreground">
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </Section>
    );
}
