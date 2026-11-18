"use client";

import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useLoaderDone } from "@/components/layout/useLoaderDone";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { totalCourses } from "@/data/courses";
import { hero } from "@/data/home";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Hold the entrance until the page loader starts lifting
  const ready = useLoaderDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-paper pb-16 pt-8 sm:pb-20 lg:pb-28 lg:pt-14"
    >
      {/* Decorative shapes echoing the methodology diagram */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-40 top-24 size-[28rem] rounded-full bg-blush-soft blur-3xl" />
        <div className="absolute -right-20 -top-32 size-[30rem] rounded-full bg-brand-soft blur-3xl" />
      </div>

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="max-w-2xl">
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-paper/80 py-1.5 pl-2 pr-4 text-sm font-medium text-ink/80 backdrop-blur"
          >
            <span className="grid size-6 place-items-center rounded-full bg-brand text-white">
              <MapPin aria-hidden="true" className="size-3.5" />
            </span>
            {hero.eyebrow}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.75rem] font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]"
          >
            <TextReveal
              lines={hero.title}
              delay={0.15}
              play={ready}
              accentLine={2}
              accentClassName="italic text-brand [font-variation-settings:'SOFT'_100]"
            />
          </h1>

          <motion.ul {...fadeUp(0.55)} className="mt-7 flex flex-wrap gap-x-1 gap-y-2 text-[0.9375rem] font-medium text-ink/80 sm:text-base">
            {hero.disciplines.map((d, i) => (
              <li key={d} className="flex items-center">
                {d}
                {i < hero.disciplines.length - 1 ? (
                  <span aria-hidden="true" className="mx-2.5 size-1.5 rounded-full bg-brand-light" />
                ) : null}
              </li>
            ))}
          </motion.ul>

          <motion.div {...fadeUp(0.7)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#courses" size="lg" icon={<ArrowDown />}>
              Explore courses
            </Button>
            <Button href={site.enquireHref} variant="outline" size="lg" icon={<ArrowRight />}>
              Enquire now
            </Button>
          </motion.div>

          <motion.dl {...fadeUp(0.85)} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted">Courses</dt>
              <dd className="mt-1 font-heading text-2xl font-semibold text-ink">{totalCourses}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted">Campuses</dt>
              <dd className="mt-1 font-heading text-2xl font-semibold text-ink">{site.campuses.length}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted">RTO</dt>
              <dd className="mt-1 font-heading text-2xl font-semibold text-ink">{site.compliance.rto}</dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-soft shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <motion.div style={reduce ? undefined : { y: imageY, scale: imageScale }} className="absolute inset-0">
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[23%_50%]"
              />
            </motion.div>
          </div>

          {/* Floating credential card */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-border bg-paper/95 p-4 shadow-lift backdrop-blur sm:left-auto sm:right-6 sm:w-72 lg:-left-10 lg:right-auto"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Nationally recognised</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/80">
              Registered Training Organisation {site.compliance.rto} · CRICOS Provider {site.compliance.cricos}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
