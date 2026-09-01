"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * This site's arrival motion. Nothing travels — it comes into focus, the same
 * move the hero lens makes. Blur is animated on the wrapper only, so text
 * never re-rasterises mid-transition on a child.
 */
export function Resolve({
  children,
  className,
  delay = 0,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, filter: "blur(12px)", scale: 1.025 }}
      whileInView={reduce ? undefined : { opacity: 1, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
