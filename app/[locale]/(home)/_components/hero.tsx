"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@/data/consts";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";


export function Hero() {
    const t = useTranslations();

    return (
        <section id="intro" aria-label="Introduction" className="min-h-screen flex items-center relative">
            <div className="gap-12 sm:gap-16 w-full relative z-10">
                <motion.div
                    className="lg:col-span-3 space-y-8 sm:space-y-10"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {/* Tagline */}
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>{t("hero.tagline")}</span>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-3">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-[0.9]">
                            <span className="block font-semibold">
                                {t("hero.title.line1")}
                            </span>
                            <span className="block text-primary">
                                {t("hero.title.line2")}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="space-y-6 max-w-2xl">
                        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-[65ch] font-light">
                            {t.rich("hero.description", {
                                country: (chunks) => (
                                    <span className="text-foreground font-medium">
                                        {chunks}
                                    </span>
                                ),
                                highlight: (chunks) => (
                                    <span className="text-primary font-medium">
                                        {chunks}
                                    </span>
                                ),
                            })}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                href="#projects"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300"
                            >
                                <Rocket className="w-4 h-4" />
                                {t("hero.cta.viewWork")}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                            </Link>
                            <a
                                href="mailto:contact@benarfa.com"
                                className="group inline-flex items-center gap-2 px-6 py-3 border border-secondary/40 rounded-lg font-medium hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
                            >
                                {t("hero.cta.letsTalk")}
                            </a>
                        </div>

                        {/* Stats Badges */}
                        <div className="flex flex-wrap gap-6 pt-2">
                            {(["yearsExperience", "projectsShipped", "clientSatisfaction"] as const).map((key) => (
                                <div key={key} className="flex flex-col">
                                    <span className="text-2xl sm:text-3xl font-semibold text-primary">
                                        {t(`stats.${key}Value`)}
                                    </span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                        {t(`stats.${key}`)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {SOCIAL_LINKS.filter(
                                (social) => social.name !== "Download CV"
                            ).map((social) => {
                                const Icon =
                                    social.name === "GitHub"
                                        ? () => (
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        )
                                        : social.name === "LinkedIn"
                                            ? () => (
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            )
                                            : () => (
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                </svg>
                                            );

                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-2.5 bg-secondary/30 border border-secondary/40 rounded-lg hover:border-primary/60 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                                        aria-label={`Visit ${social.name} profile`}
                                    >
                                        <Icon />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
