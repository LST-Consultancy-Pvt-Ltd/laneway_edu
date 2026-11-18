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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-paper pt-8 lg:pt-14 xl:flex xl:min-h-[46rem] xl:items-center xl:py-20"
    >
      {/* Decorative shapes echoing the methodology diagram */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-40 top-24 size-[28rem] rounded-full bg-blush-soft blur-3xl" />
        <div className="absolute -right-20 -top-32 size-[30rem] rounded-full bg-brand-soft blur-3xl" />
      </div>

      {/* Desktop: full-height background image on the right, fading into the page on
          its left and bottom edges so the text keeps a clean background. Fades in simply. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[55%] xl:block"
      >
        <div className="absolute inset-0 [-webkit-mask-composite:source-in] [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_18%),linear-gradient(to_top,transparent,black_20%)]">
          <motion.div style={reduce ? undefined : { y: imageY }} className="absolute inset-0">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1280px) 55vw, 1px"
              className="object-cover object-[15%_50%]"
            />
          </motion.div>
        </div>
      </motion.div>

      <Container className="relative">
        {/* Tablets & small laptops (stacked layout): centred. Desktop (xl): left, beside the background image. */}
        <div className="max-w-2xl md:mx-auto md:text-center xl:mx-0 xl:max-w-xl xl:text-left">
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

          <motion.ul {...fadeUp(0.55)} className="mt-7 flex flex-wrap gap-x-1 gap-y-2 text-[0.9375rem] font-medium text-ink/80 sm:text-base md:justify-center xl:justify-start">
            {hero.disciplines.map((d, i) => (
              <li key={d} className="flex items-center">
                {d}
                {i < hero.disciplines.length - 1 ? (
                  <span aria-hidden="true" className="mx-2.5 size-1.5 rounded-full bg-brand-light" />
                ) : null}
              </li>
            ))}
          </motion.ul>

          <motion.div {...fadeUp(0.7)} className="mt-9 flex flex-col gap-3 sm:flex-row md:justify-center xl:justify-start">
            <Button href="#courses" size="lg" icon={<ArrowDown />}>
              Explore courses
            </Button>
            <Button href={site.enquireHref} variant="outline" size="lg" icon={<ArrowRight />}>
              Enquire now
            </Button>
          </motion.div>

          <motion.dl {...fadeUp(0.85)} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6 md:mx-auto xl:mx-0">
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

        {/* Phones & tablets: full-bleed image under the text (edge fades in from the top) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative -mx-4 mt-10 aspect-[4/3] sm:-mx-6 sm:aspect-[16/9] lg:-mx-8 xl:hidden"
        >
          <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_28%)]">
            <div className="absolute inset-0">
              <Image
                src={hero.image}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 1px, 100vw"
                className="object-cover object-[35%_45%]"
              />
            </div>
          </div>
        </motion.div>

        {/* Floating credential card */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 1.2, ease }}
          className="relative z-10 -mt-14 mb-10 ml-auto w-full max-w-xs md:mx-auto md:text-left rounded-2xl border border-border bg-paper/95 p-4 shadow-lift backdrop-blur sm:mr-2 xl:absolute xl:bottom-0 xl:right-8 xl:m-0 xl:-mb-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Nationally recognised</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/80">
            Registered Training Organisation {site.compliance.rto} · CRICOS Provider {site.compliance.cricos}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
