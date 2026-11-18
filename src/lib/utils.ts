import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** tailwind-merge, taught about our custom radius / shadow / font tokens. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ["card", "button", "input"],
      shadow: ["card", "lift"],
      font: ["heading"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True for links that leave this site (absolute URLs, mail, phone). */
export function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}
