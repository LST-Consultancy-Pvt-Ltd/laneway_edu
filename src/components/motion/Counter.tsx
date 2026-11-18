"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type CounterProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/**
 * Counts up to `value` when scrolled into view. The final number is rendered
 * on the server, so it is correct without JS and for screen readers.
 */
export function Counter({ value, duration = 1.6, prefix = "", suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${Math.round(latest).toLocaleString("en-AU")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}${value.toLocaleString("en-AU")}${suffix}`}
    </span>
  );
}
