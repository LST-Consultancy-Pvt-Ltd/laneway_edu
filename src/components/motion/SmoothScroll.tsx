"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Lenis smooth scrolling for the whole page. Disabled when the user prefers
 * reduced motion. Anchor links (#section) are handled by Lenis too.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -96 }, autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
