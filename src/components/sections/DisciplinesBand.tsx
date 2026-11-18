"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/data/home";
import { cn } from "@/lib/utils";

/**
 * Oversized type band that slides sideways as you scroll — two rows moving in
 * opposite directions. Purely decorative (the same words appear in the hero),
 * so it is hidden from assistive tech.
 */
export function DisciplinesBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xForward = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const xBackward = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  // Repeat enough times to always overflow the widest screens
  const words = [...hero.disciplines, ...hero.disciplines, ...hero.disciplines];

  return (
    <div ref={ref} aria-hidden="true" className="select-none overflow-hidden bg-paper py-10 sm:py-14">
      {[xForward, xBackward].map((x, row) => (
        <motion.div
          key={row}
          style={reduce ? undefined : { x }}
          className={cn(
            "flex w-max items-center gap-6 whitespace-nowrap font-heading text-5xl font-semibold leading-[1.15] tracking-tight sm:gap-10 sm:text-7xl lg:text-8xl",
            row === 1 && "mt-2 sm:mt-4",
          )}
        >
          {words.map((word, i) => (
            <span key={`${row}-${word}-${i}`} className="flex items-center gap-6 sm:gap-10">
              <span
                className={cn(
                  row === 0
                    ? i % 2 === 0
                      ? "text-ink"
                      : "italic text-brand"
                    : "text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)] [paint-order:stroke]",
                  row === 1 && i % 2 === 1 && "[-webkit-text-stroke-color:var(--color-brand)]",
                )}
              >
                {word}
              </span>
              <span className="size-3 shrink-0 rounded-full bg-blush sm:size-4" />
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
