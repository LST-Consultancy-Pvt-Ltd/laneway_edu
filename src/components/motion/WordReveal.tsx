"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

type WordRevealProps = {
  /** Plain text. Wrap words in *asterisks* to render them as accent text. */
  text: string;
  className?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  /** Fraction of the text that must be visible before animating */
  amount?: number;
};

type Word = { value: string; accent: boolean };

function parse(text: string): Word[] {
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .flatMap((segment) => {
      const accent = segment.startsWith("*") && segment.endsWith("*");
      const clean = accent ? segment.slice(1, -1) : segment;
      return clean
        .split(/\s+/)
        .filter(Boolean)
        .map((value) => ({ value, accent }));
    });
}

export function plainText(text: string) {
  return text.replace(/\*/g, "");
}

/**
 * Masked word-by-word reveal when the text scrolls into view.
 * Screen readers get the full sentence once; animated words are aria-hidden.
 */
export function WordReveal({
  text,
  className,
  accentClassName = "italic text-brand",
  delay = 0,
  stagger = 0.045,
  amount = 0.4,
}: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = parse(text);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
  };
  const word: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { y: "115%", rotate: 3 },
        show: { y: "0%", rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <span className={className}>
      <span className="sr-only">{plainText(text)}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
        variants={container}
      >
        {words.map((w, i) => (
          <Fragment key={`${w.value}-${i}`}>
            {/* Mask: padding leaves room for descenders and italic overhang */}
            <span className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] pr-[0.06em] align-bottom">
              <motion.span
                className={cn("inline-block origin-bottom-left will-change-transform", w.accent && accentClassName)}
                variants={word}
              >
                {w.value}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </span>
  );
}
