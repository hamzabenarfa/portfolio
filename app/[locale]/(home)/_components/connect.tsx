"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/data/consts";
import { SocialLink } from "./social-links";
import { ArrowRight } from "lucide-react";

const Section = ({
    id,
    children,
    className = "",
    ...props
}: React.HTMLAttributes<HTMLElement> & { id: string }) => (
    <section id={id} className={`min-h-screen py-10 ${className}`} {...props}>
        {children}
    </section>
);

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export function Connect() {
    const t = useTranslations();

    return (
        <Section id="connect" className="flex items-center py-20">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid lg:grid-cols-2 gap-12 sm:gap-16 w-full"
            >
                <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
                        {t("connect.title")}
                        <br />
                        <span className="text-primary">{t("connect.titleHighlight")}</span>
                    </h2>
                    <div className="space-y-6">
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
                            {t("connect.description")}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="mailto:contact@benarfa.com"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300"
                            >
                                {t("connect.cta")}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                            </a>
                            <a
                                href="/benarfa-hamza-en.pdf"
                                download
                                className="inline-flex items-center gap-2 px-6 py-3 border border-secondary/40 rounded-lg font-medium hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
                            >
                                {t("connect.downloadCV")}
                            </a>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8">
                    <div className="text-sm text-muted-foreground font-mono">
                        {t("connect.connectLabel")}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {SOCIAL_LINKS.map((social) => (
                            <SocialLink key={social.name} social={social} />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </Section>
    );
}
