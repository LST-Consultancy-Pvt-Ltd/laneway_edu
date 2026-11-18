"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "motion/react";

type StaggerProps = HTMLMotionProps<"div"> & {
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "ol";
};

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({
  stagger = 0.09,
  delay = 0,
  amount = 0.15,
  as = "div",
  children,
  ...props
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
      {...props}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & {
  as?: "div" | "li" | "article";
  distance?: number;
};

export function StaggerItem({ as = "div", distance = 24, children, ...props }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const Component = motion[as] as typeof motion.div;
  return (
    <Component variants={variants} {...props}>
      {children}
    </Component>
  );
}
