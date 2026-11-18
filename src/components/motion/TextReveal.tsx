"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  /** Each entry renders as its own line */
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Line index (0-based) to style as accent */
  accentLine?: number;
  accentClassName?: string;
};

/**
 * Masked, line-by-line headline reveal on page load. Renders the full
 * text for assistive tech in one piece; animated spans are aria-hidden.
 */
export function TextReveal({
  lines,
  className,
  lineClassName,
  delay = 0.1,
  accentLine,
  accentClassName,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, i) => (
          <span key={line} className={cn("block overflow-hidden pb-[0.08em]", lineClassName)}>
            <motion.span
              className={cn("block", i === accentLine && accentClassName)}
              initial={reduce ? { opacity: 0 } : { y: "105%" }}
              animate={reduce ? { opacity: 1 } : { y: "0%" }}
              transition={{
                duration: reduce ? 0.2 : 0.9,
                delay: delay + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}
