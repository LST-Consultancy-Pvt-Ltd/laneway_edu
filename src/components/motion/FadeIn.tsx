"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "none";

type FadeInProps = HTMLMotionProps<"div"> & {
  direction?: Direction;
  delay?: number;
  distance?: number;
  duration?: number;
  /** Fraction of the element that must be visible before animating */
  amount?: number;
};

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/** Fades + slides content in once when it scrolls into view. */
export function FadeIn({
  direction = "up",
  delay = 0,
  distance = 28,
  duration = 0.7,
  amount = 0.2,
  children,
  ...props
}: FadeInProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduce ? 0.2 : duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
