"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type ScrollHighlightProps = {
  text: string;
  className?: string;
  /** Opacity of words that haven't been "read" yet */
  dimOpacity?: number;
};

/**
 * Words brighten one by one as the paragraph scrolls through the viewport.
 * The text stays real and readable for assistive tech; only opacity changes.
 */
export function ScrollHighlight({ text, className, dimOpacity = 0.18 }: ScrollHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(/\s+/).filter(Boolean);

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          dim={dimOpacity}
          last={i === words.length - 1}
        >
          {word}
        </Word>
      ))}
    </span>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
  last,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
  last: boolean;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>
      {last ? null : " "}
    </>
  );
}
