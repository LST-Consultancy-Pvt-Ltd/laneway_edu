"use client";

import { Pause, Play, Quote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials, type Testimonial } from "@/data/home";
import { cn } from "@/lib/utils";

/**
 * Continuous testimonial marquee.
 * - Pauses on hover, on keyboard focus, or via the Pause button (WCAG 2.2.2).
 * - With reduced motion it becomes a static, swipeable row.
 * - The second copy of the track exists only for the seamless loop and is
 *   hidden from assistive tech.
 */
export function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="overflow-hidden bg-paper py-20 sm:py-28">
      <Container>
        <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="testimonials-title"
            eyebrow="Student stories"
            title={
              <>
                Don’t just take <span className="italic text-brand">our word</span> for it.
              </>
            }
          />
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex h-11 items-center gap-2 self-start rounded-full border-2 border-ink/15 px-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand motion-reduce:hidden md:self-auto"
          >
            {paused ? (
              <Play aria-hidden="true" className="size-4" />
            ) : (
              <Pause aria-hidden="true" className="size-4" />
            )}
            {paused ? "Play" : "Pause"}
            <span className="sr-only"> student stories animation</span>
          </button>
        </FadeIn>
      </Container>

      <FadeIn delay={0.1} className="-mb-14 mt-8 lg:mt-12">
        <div
          className={cn(
            "group relative",
            // Soft fade at both edges
            "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
            // Reduced motion: no animation, swipe/scroll instead
            "motion-reduce:scrollbar-none motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]",
          )}
          data-lenis-prevent-horizontal
        >
          <div
            className={cn(
              // Generous padding so hover shadows aren't clipped by the edge-fade mask
              "flex w-max animate-marquee-slow pb-16 pt-4",
              "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
              paused && "[animation-play-state:paused]",
              "motion-reduce:animate-none motion-reduce:px-4 sm:motion-reduce:px-6 lg:motion-reduce:px-8",
            )}
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                aria-label={copy === 0 ? "Testimonials from Laneway students" : undefined}
                // Gap + trailing padding keep both halves identical for a seamless loop
                className={cn("flex shrink-0 gap-6 pr-6", copy === 1 && "motion-reduce:hidden")}
              >
                {testimonials.map((t, i) => (
                  <TestimonialCard key={`${copy}-${t.name}`} testimonial={t} featured={i % 4 === 0} />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function TestimonialCard({ testimonial: t, featured }: { testimonial: Testimonial; featured: boolean }) {
  return (
    <li
      className={cn(
        "flex w-[19rem] shrink-0 rounded-card border p-7 transition-[transform,box-shadow] duration-500 ease-out-soft sm:w-[23rem] sm:p-8",
        "shadow-[0_1px_2px_rgb(17_17_17/0.03)]",
        "hover:-translate-y-1.5 hover:shadow-[0_2px_6px_rgb(17_17_17/0.04),0_18px_36px_-12px_rgb(17_17_17/0.16)]",
        featured ? "border-transparent bg-brand text-white" : "border-border bg-surface text-ink",
      )}
    >
      <figure className="flex h-full w-full flex-col justify-between gap-8">
        <blockquote>
          <Quote
            aria-hidden="true"
            className={cn("size-8", featured ? "text-white/50" : "text-brand")}
            strokeWidth={1.5}
          />
          <p className="mt-5 font-heading text-xl leading-snug sm:text-[1.3rem]">“{t.quote}”</p>
        </blockquote>
        <figcaption className="flex items-center gap-4">
          <Image
            src={t.portrait}
            alt=""
            width={56}
            height={56}
            sizes="56px"
            className={cn("size-14 rounded-full object-cover ring-2", featured ? "ring-white/30" : "ring-paper")}
          />
          <span>
            <span className="block font-semibold">{t.name}</span>
            <span className={cn("block text-sm", featured ? "text-white/80" : "text-muted")}>{t.course}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}
