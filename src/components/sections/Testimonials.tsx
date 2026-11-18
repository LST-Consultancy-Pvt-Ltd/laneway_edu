"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/home";
import { cn } from "@/lib/utils";

/** Scroll-snap carousel: swipe on touch, arrow buttons on desktop, no autoplay. */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.clientWidth + 24), behavior: reduce ? "auto" : "smooth" });
  };

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
          <div className="flex gap-3">
            <CarouselButton label="Previous testimonials" disabled={!canPrev} onClick={() => scrollByCard(-1)}>
              <ArrowLeft aria-hidden="true" className="size-5" />
            </CarouselButton>
            <CarouselButton label="Next testimonials" disabled={!canNext} onClick={() => scrollByCard(1)}>
              <ArrowRight aria-hidden="true" className="size-5" />
            </CarouselButton>
          </div>
        </FadeIn>
      </Container>

      <FadeIn delay={0.1} className="mt-12 lg:mt-16">
        <ul
          ref={trackRef}
          data-lenis-prevent-horizontal
          aria-label="Testimonials from Laneway students"
          // Align the first card with the page container, let the rest bleed off-screen
          style={{
            paddingInline: "max(var(--gutter), calc((100vw - 80rem) / 2 + var(--gutter)))",
            scrollPaddingInline: "max(var(--gutter), calc((100vw - 80rem) / 2 + var(--gutter)))",
          }}
          className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 [--gutter:1rem] sm:[--gutter:1.5rem] lg:[--gutter:2rem]"
        >
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className={cn(
                "flex w-[85%] shrink-0 snap-start flex-col justify-between rounded-card border p-7 sm:w-[24rem] sm:p-8",
                i === 0 ? "border-transparent bg-brand text-white" : "border-border bg-surface text-ink",
              )}
            >
              <figure className="flex h-full flex-col justify-between gap-10">
                <blockquote>
                  <Quote
                    aria-hidden="true"
                    className={cn("size-8", i === 0 ? "text-white/50" : "text-brand")}
                    strokeWidth={1.5}
                  />
                  <p className="mt-5 font-heading text-xl leading-snug sm:text-[1.375rem]">“{t.quote}”</p>
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <Image
                    src={t.portrait}
                    alt=""
                    width={56}
                    height={56}
                    sizes="56px"
                    className="size-14 rounded-full object-cover"
                  />
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className={cn("block text-sm", i === 0 ? "text-white/80" : "text-muted")}>
                      {t.course}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="grid size-12 place-items-center rounded-full border-2 border-ink/15 text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}
