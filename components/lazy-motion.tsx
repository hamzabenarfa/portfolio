"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LazyMotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Lazy-loaded motion component that only animates when in viewport
 * Reduces initial JavaScript execution and improves LCP
 */
export function LazyMotion({ children, className, delay = 0 }: LazyMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

