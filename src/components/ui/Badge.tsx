import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  brand: "bg-brand-soft text-brand-dark",
  accent: "bg-accent text-ink",
  neutral: "bg-surface text-ink border border-border",
  inverse: "bg-white/15 text-white",
} as const;

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: keyof typeof variants;
};

export function Badge({ variant = "brand", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
