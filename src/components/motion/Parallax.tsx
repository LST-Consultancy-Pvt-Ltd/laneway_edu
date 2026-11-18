"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  /** Total travel in % of the element's height (subtle by default) */
  strength?: number;
  className?: string;
};

/** Gentle scroll-linked drift for imagery. No effect with reduced motion. */
export function Parallax({ children, strength = 10, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength / 2}%`, `${strength / 2}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute -inset-y-[8%] inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
