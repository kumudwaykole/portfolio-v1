"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-reveal wrapper for MDX blocks. Kept in its own client module so the
 * component map in caseStudyMdx.tsx can stay a server module — a "use client"
 * object export reaches server code as an opaque proxy, and MDX would not be
 * able to read the component names off it.
 */
export function RevealBlock({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
