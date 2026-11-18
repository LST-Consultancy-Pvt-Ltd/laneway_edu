import type { ReactNode } from "react";
import { WordReveal } from "@/components/motion/WordReveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Strings animate word by word; wrap words in *asterisks* for accent styling */
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Heading level — keep the document outline in order */
  as?: "h1" | "h2" | "h3";
  /** For aria-labelledby on the parent <section> */
  id?: string;
  tone?: "default" | "inverse";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  id,
  tone = "default",
  className,
  children,
}: SectionHeadingProps) {
  const inverse = tone === "inverse";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-[0.14em]",
            inverse ? "text-accent" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
          inverse ? "text-white" : "text-ink",
        )}
      >
        {typeof title === "string" ? (
          <WordReveal text={title} accentClassName={inverse ? "italic text-brand-light" : "italic text-brand"} />
        ) : (
          title
        )}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            inverse ? "text-white/80" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
