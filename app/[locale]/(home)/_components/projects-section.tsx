"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/consts";
import ProjectShowcase from "@/components/project-showcase";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function ProjectsSection() {
    const t = useTranslations();

    // Get featured project
    const featuredProject = PROJECTS.find((p) => p.featured);
    const otherProjects = PROJECTS.filter((p) => !p.featured);

    return (
        <>
            {/* Featured Project Section */}
            {featuredProject && (
                <Section id="featured" className="py-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-3">
                            <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
                                {t("featured.label")}
                            </div>
                        </motion.div>

                        <Link href={`/projects/${featuredProject.slug}`}>
                            <motion.div
                                variants={fadeInUp}
                                className="group grid lg:grid-cols-2 gap-8 p-6 sm:p-8 border border-secondary/30 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] rounded-xl overflow-hidden bg-linear-to-br from-secondary/20 to-primary/10">
                                    <Image
                                        src={featuredProject.image}
                                        alt={t(`projectsItems.${featuredProject.slug}.title`)}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-6 flex flex-col justify-center">
                                    <div className="space-y-2">
                                        <div className="text-sm text-primary font-medium">
                                            {t(`projectsItems.${featuredProject.slug}.category`)}
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light group-hover:text-primary transition-colors">
                                            {t(`projectsItems.${featuredProject.slug}.title`)}
                                        </h2>
                                        <p className="text-base text-muted-foreground">
                                            {t(`projectsItems.${featuredProject.slug}.subtitle`)}
                                        </p>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {t(`projectsItems.${featuredProject.slug}.description`)}
                                    </p>


                                    {/* Tech preview */}
                                    <div className="flex flex-wrap gap-2">
                                        {featuredProject.tech.slice(0, 5).map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {featuredProject.tech.length > 5 && (
                                            <span className="text-xs px-2.5 py-1 text-muted-foreground">
                                                +{featuredProject.tech.length - 5} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                                        <span className="font-medium">
                                            {t("featured.viewCaseStudy")}
                                        </span>
                                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                </Section>
            )}

            {/* Other Projects Section */}
            <Section id="projects">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="space-y-12 sm:space-y-16"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
                    >
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-light">
                                {t("projects.title")}
                            </h2>
                            <p className="text-muted-foreground mt-2">
                                {t("projects.description")}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                    >
                        {otherProjects.map((project) => (
                            <ProjectShowcase key={project.id} project={project} />
                        ))}
                    </motion.div>
                </motion.div>
            </Section>
        </>
    );
}
