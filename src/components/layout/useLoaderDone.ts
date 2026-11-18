"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-loader"] });
  return () => observer.disconnect();
}

const isDone = () => document.documentElement.dataset.loader !== "loading";

/**
 * True once the page loader has started lifting (or was never shown).
 * Use it to hold on-load animations until the visitor can actually see them.
 * Server render returns false, so hydration always matches.
 */
export function useLoaderDone() {
  return useSyncExternalStore(subscribe, isDone, () => false);
}
