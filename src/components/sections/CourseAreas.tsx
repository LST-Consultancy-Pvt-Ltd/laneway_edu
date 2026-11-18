"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CodeXml,
  HardHat,
  Lightbulb,
  Megaphone,
  MessageCircle,
  ShieldCheck,
  SquareKanban,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { courseCategories, totalCourses, type CategoryId, type CourseCategory } from "@/data/courses";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const icons: Record<CategoryId, LucideIcon> = {
  entrepreneur: Lightbulb,
  marketer: Megaphone,
  leader: Users,
  projects: SquareKanban,
  "web-developer": CodeXml,
  "cyber-security": ShieldCheck,
  trade: HardHat,
};

const LEVELS = ["Graduate Diploma", "Advanced Diploma", "Diploma", "Certificate IV", "Certificate III"] as const;
type Level = (typeof LEVELS)[number];

/** Qualification level from the course title, e.g. "Advanced Diploma". */
function levelOf(title: string): Level | undefined {
  return LEVELS.find((level) => title.startsWith(level));
}

/** Unique levels in a category, lowest to highest. */
function levelsIn(category: CourseCategory) {
  const found = new Set(category.courses.map((c) => levelOf(c.title)).filter(Boolean));
  return [...LEVELS].reverse().filter((l) => found.has(l));
}

const DEFAULT_CATEGORY: CategoryId = "leader"; // home of the featured course

/**
 * Interactive course explorer: study areas as an accessible tab list
 * (vertical on desktop, swipeable chips on mobile) and the selected area's
 * courses in a panel. All panels stay in the DOM (inactive ones `hidden`) so
 * every course link remains crawlable.
 */
export function CourseAreas() {
  const baseId = useId();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<CategoryId>(DEFAULT_CATEGORY);
  const tabRefs = useRef<Partial<Record<CategoryId, HTMLButtonElement | null>>>({});
  const areaCount = courseCategories.length;

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: areaCount - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = courseCategories[(keys[e.key] + areaCount) % areaCount];
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <section id="courses" aria-labelledby="courses-title" className="relative overflow-hidden bg-surface py-20 sm:py-28">
      {/* Soft brand glow behind the explorer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-40 size-[34rem] rounded-full bg-brand-soft/70 blur-3xl" />
        <div className="absolute -left-24 bottom-0 size-[26rem] rounded-full bg-blush-soft blur-3xl" />
      </div>

      <Container className="relative">
        {/* Heading row */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="courses-title"
            eyebrow="Courses"
            title="Find the path that fits your *ambition.*"
            description="Nationally recognised qualifications, taught by entrepreneurs, coaches and industry experts."
          />
          <FadeIn delay={0.1} className="flex flex-col gap-5 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <dl className="flex gap-8">
              {[
                { value: totalCourses, label: "Courses" },
                { value: areaCount, label: "Study areas" },
                { value: site.campuses.length, label: "Cities" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted">{stat.label}</dt>
                  <dd className="font-heading text-3xl font-semibold text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <Button href={site.enquireHref} variant="outline" size="sm" icon={<ArrowRight />}>
              Enquire about a course
            </Button>
          </FadeIn>
        </div>

        {/* Explorer */}
        <FadeIn delay={0.1} amount={0.1} className="mt-12 lg:mt-14">
          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-paper shadow-[0_2px_6px_rgb(17_17_17/0.04),0_30px_60px_-30px_rgb(17_17_17/0.18)] lg:grid lg:grid-cols-[19rem_minmax(0,1fr)] xl:grid-cols-[21rem_minmax(0,1fr)]">
            {/* Study areas (tabs) */}
            <div className="border-b border-border bg-surface/60 lg:border-b-0 lg:border-r">
              <p className="hidden px-7 pb-3 pt-7 text-xs font-semibold uppercase tracking-[0.14em] text-muted lg:block">
                Areas of study
              </p>
              <div
                role="tablist"
                aria-label="Areas of study"
                aria-orientation="vertical"
                className="scrollbar-none flex gap-2 overflow-x-auto p-3 sm:p-4 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-4 lg:pb-6 lg:pt-0"
                data-lenis-prevent-horizontal
              >
                {courseCategories.map((category, index) => {
                  const Icon = icons[category.id];
                  const selected = category.id === active;
                  return (
                    <button
                      key={category.id}
                      ref={(el) => {
                        tabRefs.current[category.id] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`${baseId}-tab-${category.id}`}
                      aria-selected={selected}
                      aria-controls={`${baseId}-panel-${category.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(category.id)}
                      onKeyDown={(e) => onTabKeyDown(e, index)}
                      className={cn(
                        "group relative flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors lg:w-full lg:py-3",
                        selected ? "text-white" : "text-ink hover:bg-paper",
                      )}
                    >
                      {selected ? (
                        <motion.span
                          layoutId={`${baseId}-active`}
                          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                          className="absolute inset-0 rounded-2xl bg-ink shadow-lift"
                        />
                      ) : null}
                      <span
                        className={cn(
                          "relative grid size-9 shrink-0 place-items-center rounded-xl transition-colors lg:size-10",
                          selected ? "bg-white/10 text-brand-light" : "bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white",
                        )}
                      >
                        <Icon aria-hidden="true" className="size-[1.125rem]" />
                      </span>
                      <span className="relative whitespace-nowrap font-semibold lg:flex-1">{category.name}</span>
                      <span
                        className={cn(
                          "relative hidden min-w-7 rounded-full px-2 py-0.5 text-center text-xs font-semibold tabular-nums sm:inline-block",
                          selected ? "bg-white/15 text-white" : "bg-surface text-muted",
                        )}
                      >
                        {category.courses.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Panels */}
            <div className="min-w-0">
              {courseCategories.map((category) => {
                const Icon = icons[category.id];
                const selected = category.id === active;
                return (
                  <div
                    key={category.id}
                    role="tabpanel"
                    id={`${baseId}-panel-${category.id}`}
                    aria-labelledby={`${baseId}-tab-${category.id}`}
                    hidden={!selected}
                    tabIndex={0}
                    className="flex h-full flex-col focus-visible:outline-offset-[-3px]"
                  >
                    {/* Panel header */}
                    <div className="relative overflow-hidden border-b border-border px-6 pb-7 pt-8 sm:px-10 sm:pt-10">
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1}
                        className="pointer-events-none absolute -right-6 -top-6 size-48 text-brand-soft sm:size-56"
                      />
                      <div className="relative animate-[panel-in_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                          {category.courses.length} {category.courses.length === 1 ? "course" : "courses"}
                        </p>
                        <h3 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">{category.name}</h3>
                        <p className="mt-2 max-w-xl text-lg leading-relaxed text-muted">{category.blurb}</p>
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Qualification levels">
                          {levelsIn(category).map((level) => (
                            <li
                              key={level}
                              className="rounded-full border border-border bg-paper px-3 py-1 text-xs font-semibold text-ink/80"
                            >
                              {level}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Course rows */}
                    <ul
                      className={cn(
                        "flex-1 divide-y divide-border px-3 py-3 sm:px-6",
                        category.courses.length > 4 && "md:grid md:grid-cols-2 md:gap-x-6 md:divide-y-0",
                      )}
                    >
                      {category.courses.map((course, i) => {
                        const level = levelOf(course.title);
                        return (
                          <li
                            key={course.code + course.title}
                            style={{ animationDelay: `${0.08 + i * 0.05}s` }}
                            className={cn(
                              "animate-[panel-in_0.5s_cubic-bezier(0.22,1,0.36,1)_both]",
                              category.courses.length > 4 && "md:border-b md:border-border",
                            )}
                          >
                            <Link
                              href={course.href}
                              className="group flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors hover:bg-surface sm:px-4"
                            >
                              <span className="min-w-0 flex-1">
                                <span className="flex flex-wrap items-center gap-2">
                                  {level ? (
                                    <span className="rounded-md bg-brand-soft px-2 py-0.5 text-[0.6875rem] font-semibold text-brand-dark">
                                      {level}
                                    </span>
                                  ) : null}
                                  <span className="font-mono text-[0.6875rem] font-medium tracking-wide text-muted">
                                    {course.code}
                                  </span>
                                  {course.featured ? (
                                    <span className="rounded-md bg-ink px-2 py-0.5 text-[0.6875rem] font-semibold text-white">
                                      Featured
                                    </span>
                                  ) : null}
                                </span>
                                <span className="mt-1.5 block font-heading text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-brand sm:text-xl">
                                  {course.title}
                                </span>
                              </span>
                              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-ink transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="size-4 transition-transform duration-300 group-hover:rotate-45"
                                />
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Help strip */}
                    <div className="flex flex-col gap-3 border-t border-border bg-surface/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                      <p className="flex items-center gap-3 text-[0.9375rem] text-ink/80">
                        <MessageCircle aria-hidden="true" className="size-5 shrink-0 text-brand" />
                        Not sure which course is right for you?
                      </p>
                      <Link
                        href={site.enquireHref}
                        className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand"
                      >
                        Talk to our admissions team
                        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
