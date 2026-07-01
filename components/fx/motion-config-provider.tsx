"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * App-wide framer-motion config. `reducedMotion="user"` makes every
 * framer animation honor the visitor's `prefers-reduced-motion` setting —
 * transform/layout motion is skipped while opacity fades are kept — so the
 * animation-heavy case-study pages stay accessible without per-page guards.
 */
export function MotionConfigProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
