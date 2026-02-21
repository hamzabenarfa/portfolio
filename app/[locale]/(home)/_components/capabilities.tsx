"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// Capability item component
const CapabilityItem = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => (
    <div className="flex gap-4">
        <div className="w-1 bg-primary rounded-full shrink-0" />
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    </div>
);

import { Section } from "@/components/section";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Capabilities() {
    const t = useTranslations();

    return (
        <Section id="capabilities" className="py-20 border-t border-secondary/30">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-12"
            >
                <motion.div variants={fadeInUp}>
                    <h2 className="text-3xl sm:text-4xl font-semibold">
                        {t("capabilities.title")}
                    </h2>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="grid md:grid-cols-2 gap-x-16 gap-y-10"
                >
                    <CapabilityItem
                        title={t("capabilities.webDev.title")}
                        description={t("capabilities.webDev.description")}
                    />
                    <CapabilityItem
                        title={t("capabilities.mobileDev.title")}
                        description={t("capabilities.mobileDev.description")}
                    />
                    <CapabilityItem
                        title={t("capabilities.backendDev.title")}
                        description={t("capabilities.backendDev.description")}
                    />
                    <CapabilityItem
                        title={t("capabilities.productMgmt.title")}
                        description={t("capabilities.productMgmt.description")}
                    />
                </motion.div>
            </motion.div>
        </Section>
    );
}
