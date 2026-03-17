"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/section";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ChevronDown } from "lucide-react";

export function FAQ() {
    const t = useTranslations();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const items = [0, 1, 2, 3, 4].map((i) => ({
        question: t(`faq.items.${i}.question`),
        answer: t(`faq.items.${i}.answer`),
    }));

    return (
        <Section id="faq" className="py-20 border-t border-secondary/30">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-10"
            >
                <motion.div variants={fadeInUp}>
                    <h2 className="text-3xl sm:text-4xl font-semibold">
                        {t("faq.title")}
                    </h2>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-3 max-w-3xl">
                    {items.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className="border border-secondary/30 rounded-xl overflow-hidden transition-colors hover:border-primary/30"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-medium text-foreground">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-5 pb-4 text-muted-foreground leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </Section>
    );
}
