"use client";

import { Phone } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState, type ReactNode } from "react";
import { site } from "@/data/site";

/**
 * Sticky bottom action bar for phones/tablets. By default it appears after the
 * hero so it never covers the first screen. Pages provide their own action.
 */
export function MobileActionBar({
  children,
  alwaysVisible = false,
}: {
  children: ReactNode;
  /** Show immediately instead of after scrolling past the hero */
  alwaysVisible?: boolean;
}) {
  const { scrollY } = useScroll();
  const [scrolledPast, setScrolledPast] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolledPast(y > 480));
  const visible = alwaysVisible || scrolledPast;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-paper/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_-12px_rgb(17_17_17/0.2)] backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <a
              href={site.contact.phoneHref}
              className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink/15 text-ink"
            >
              <Phone aria-hidden="true" className="size-5" />
              <span className="sr-only">Call {site.contact.phone}</span>
            </a>
            <div className="flex-1 [&>*]:w-full">{children}</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
