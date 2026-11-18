import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronRight,
  Clock,
  Globe,
  GraduationCap,
  Laptop,
  MapPin,
  Quote,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/course/EnquiryForm";
import { MobileEnquiry } from "@/components/course/MobileEnquiry";
import { FadeIn } from "@/components/motion/FadeIn";
import { WordReveal } from "@/components/motion/WordReveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GetStarted } from "@/components/sections/GetStarted";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { courseDetails, getCategory, getCourseDetail } from "@/data/courses";
import { site } from "@/data/site";

/**
 * Course pages are built entirely from static data, so require the complete
 * route (including `params`) to be prerendered. This makes navigation instant
 * and fails the build if request-time work is ever added to this route.
 */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return courseDetails.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseDetail(slug);
  if (!course) return {};
  return {
    title: `${course.code} ${course.title}`,
    description: course.overview[0],
  };
}

/**
 * The shell (header, footer, skeleton) renders instantly; everything that
 * reads the URL `params` sits inside <Suspense>. Known slugs are still fully
 * prerendered, so visitors get complete static HTML.
 */
export default function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  return (
    <Suspense fallback={<CourseSkeleton />}>
      <CourseContent params={params} />
    </Suspense>
  );
}

function CourseSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading course">
      <div className="bg-ink pb-28 pt-8 sm:pb-32 lg:pb-40 lg:pt-12">
        <Container>
          <div className="h-4 w-72 max-w-full animate-pulse rounded bg-white/10" />
          <div className="mt-16 h-6 w-40 animate-pulse rounded-full bg-white/10" />
          <div className="mt-5 h-14 w-full max-w-2xl animate-pulse rounded-xl bg-white/10" />
          <div className="mt-3 h-14 w-3/4 max-w-xl animate-pulse rounded-xl bg-white/10" />
        </Container>
      </div>
      <Container className="relative -mt-16 lg:-mt-20">
        <div className="h-28 animate-pulse rounded-card border border-border bg-paper shadow-lift" />
      </Container>
      <div className="h-[60vh]" />
    </div>
  );
}

async function CourseContent({ params }: { params: PageProps<"/courses/[slug]">["params"] }) {
  const { slug } = await params;
  const course = getCourseDetail(slug);
  if (!course) notFound();

  const category = getCategory(course.categoryId);
  const related = (category?.courses ?? []).filter((c) => c.code !== course.code);
  const international = course.entryRequirements.filter((r) => r.startsWith("International"));
  const general = course.entryRequirements.filter((r) => !r.startsWith("International"));

  const facts = [
    { icon: ShieldCheck, label: "CRICOS course code", value: course.facts.cricos },
    { icon: Clock, label: "Duration", value: course.facts.duration },
    { icon: CalendarDays, label: "Study periods", value: course.facts.studyPeriods },
    { icon: MapPin, label: "Campus", value: course.facts.campus },
    { icon: Laptop, label: "Delivery mode", value: course.facts.delivery },
  ];

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "entry", label: "Entry requirements" },
    { id: "careers", label: "Employment opportunities" },
    { id: "intakes", label: "Intakes & fees" },
    { id: "student-story", label: "Student story" },
  ];

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section aria-labelledby="course-title" className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src={course.heroImage}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="-z-20 object-cover opacity-40"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />

        <Container className="pb-28 pt-8 sm:pb-32 lg:pb-40 lg:pt-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link href="/#courses" className="hover:text-white">
                  Courses
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <span>{category?.name}</span>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <span aria-current="page" className="text-white">
                  {course.title}
                </span>
              </li>
            </ol>
          </nav>

          <FadeIn className="mt-10 max-w-3xl lg:mt-16">
            <div className="flex flex-wrap gap-2">
              <Badge variant="inverse" className="font-mono">
                {course.code}
              </Badge>
              <Badge variant="inverse">Nationally recognised</Badge>
            </div>
            <h1 id="course-title" className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[4rem]">
              <WordReveal text={course.title} delay={0.1} stagger={0.06} amount={0.1} />
            </h1>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-white/80">
              <span>{course.facts.duration}</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-white/40" />
              <span>{course.facts.delivery} delivery</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-white/40" />
              <span>{course.facts.campus}</span>
            </p>
            <div className="mt-9 hidden gap-3 lg:flex">
              <Button href="#enquire" variant="inverse" size="lg" icon={<ArrowRight />}>
                Enquire Now
              </Button>
              <Button href="#entry" variant="outline-inverse" size="lg">
                Entry requirements
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ───────── Key facts bar ───────── */}
      <Container className="relative z-10 -mt-16 lg:-mt-20">
        <FadeIn amount={0.1}>
          <dl className="grid grid-cols-2 overflow-hidden rounded-card border border-border bg-paper shadow-lift sm:grid-cols-3 lg:grid-cols-5">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col-reverse gap-1 border-b border-r border-border p-5 last:col-span-2 sm:p-6 sm:last:col-span-1 lg:border-b-0 lg:last:border-r-0"
              >
                <dd className="font-heading text-lg font-semibold text-ink sm:text-xl">{fact.value}</dd>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <fact.icon aria-hidden="true" className="size-4 text-brand" />
                  {fact.label}
                </dt>
              </div>
            ))}
          </dl>
        </FadeIn>
      </Container>

      {/* ───────── Body + sticky sidebar ───────── */}
      <Container className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16 lg:py-24 xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="min-w-0">
          {/* In-page navigation */}
          <nav aria-label="On this page" className="-mx-4 mb-14 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:px-0">
            <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex h-10 items-center whitespace-nowrap rounded-full border border-border px-4 text-sm font-medium text-ink/80 transition-colors hover:border-brand hover:text-brand"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Overview */}
          <section id="overview" aria-labelledby="overview-title" className="scroll-mt-28">
            <FadeIn>
              <figure className="relative border-l-4 border-brand pl-6 sm:pl-8">
                <Quote aria-hidden="true" className="absolute -left-0.5 -top-10 size-8 text-brand-light" />
                <blockquote className="font-heading text-3xl font-medium italic leading-tight text-ink sm:text-4xl">
                  ‘{course.quote[0]} <span className="text-brand">{course.quote[1]}</span>’
                </blockquote>
              </figure>
            </FadeIn>
            <FadeIn delay={0.1} className="mt-12">
              <h2 id="overview-title" className="text-3xl font-semibold text-ink sm:text-4xl">
                <WordReveal text="Course overview" />
              </h2>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted">
                {course.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </FadeIn>
          </section>

          {/* Entry requirements */}
          <section id="entry" aria-labelledby="entry-title" className="mt-20 scroll-mt-28">
            <FadeIn>
              <h2 id="entry-title" className="text-3xl font-semibold text-ink sm:text-4xl">
                <WordReveal text="Entry requirements" />
              </h2>
            </FadeIn>
            <Stagger className="mt-8 grid gap-5 md:grid-cols-2">
              <StaggerItem className="rounded-card border border-border bg-surface p-6 sm:p-7">
                <span className="grid size-11 place-items-center rounded-2xl bg-paper text-brand shadow-card">
                  <GraduationCap aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold tracking-normal text-ink">All students</h3>
                <ul className="mt-3 space-y-3">
                  {general.map((r) => (
                    <li key={r} className="flex gap-3 leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                      {r}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
              <StaggerItem className="rounded-card border border-border bg-surface p-6 sm:p-7">
                <span className="grid size-11 place-items-center rounded-2xl bg-paper text-brand shadow-card">
                  <Globe aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold tracking-normal text-ink">International students</h3>
                <ul className="mt-3 space-y-3">
                  {international.map((r) => (
                    <li key={r} className="flex gap-3 leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                      {r}
                    </li>
                  ))}
                  <li className="flex gap-3 leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>
                      CRICOS registered — course code <strong className="text-ink">{course.facts.cricos}</strong>
                    </span>
                  </li>
                </ul>
              </StaggerItem>
            </Stagger>
          </section>

          {/* Careers */}
          <section id="careers" aria-labelledby="careers-title" className="mt-20 scroll-mt-28">
            <FadeIn>
              <h2 id="careers-title" className="text-3xl font-semibold text-ink sm:text-4xl">
                <WordReveal text="Employment opportunities" />
              </h2>
              <p className="mt-3 text-lg text-muted">Where this diploma can take you.</p>
            </FadeIn>
            <Stagger as="ul" className="mt-8 grid gap-4 sm:grid-cols-2">
              {course.careers.map((career) => (
                <StaggerItem
                  as="li"
                  key={career}
                  className="group flex items-center gap-4 rounded-card border border-border bg-paper p-5 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Briefcase aria-hidden="true" className="size-5" />
                  </span>
                  <span className="font-heading text-xl font-semibold text-ink">{career}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          {/* Intakes & fees */}
          <section id="intakes" aria-labelledby="intakes-title" className="mt-20 scroll-mt-28">
            <FadeIn>
              <div className="grid gap-6 rounded-[1.75rem] bg-brand-soft p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h2 id="intakes-title" className="text-2xl font-semibold text-ink sm:text-3xl">
                    <WordReveal text="Intake dates & fee information" />
                  </h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink/75">
                    Send us an enquiry and our admissions team will share upcoming start dates and fees for
                    domestic and international students.
                  </p>
                  <p className="mt-4 text-sm text-ink/70">
                    Or call{" "}
                    <a href={site.contact.phoneHref} className="font-semibold text-ink underline underline-offset-4">
                      {site.contact.phone}
                    </a>
                  </p>
                </div>
                <Button href="#enquire" className="hidden lg:inline-flex" icon={<ArrowRight />}>
                  Ask about intakes &amp; fees
                </Button>
              </div>
            </FadeIn>
          </section>

          {/* Student story */}
          <section id="student-story" aria-labelledby="story-title" className="mt-20 scroll-mt-28">
            <FadeIn>
              <h2 id="story-title" className="text-3xl font-semibold text-ink sm:text-4xl">
                <WordReveal text="Don’t just take *our word* for it" />
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="mt-8">
              <figure className="grid gap-8 overflow-hidden rounded-card bg-ink p-7 text-white sm:p-10 md:grid-cols-[12rem_1fr] md:gap-10">
                <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full ring-4 ring-brand md:mx-0 md:w-full">
                  <Image
                    src={course.testimonial.portrait}
                    alt={`Portrait of ${course.testimonial.name}`}
                    fill
                    placeholder="blur"
                    sizes="12rem"
                    className="object-cover"
                  />
                </div>
                <div>
                  <blockquote className="space-y-4 leading-relaxed text-white/80">
                    <p className="font-heading text-2xl font-medium leading-snug text-white">
                      “{course.testimonial.paragraphs[0]}”
                    </p>
                    {course.testimonial.paragraphs.slice(1).map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-white/15 pt-5">
                    <span className="block font-semibold">{course.testimonial.name}</span>
                    <span className="block text-sm text-white/70">
                      {course.code} {course.title}
                    </span>
                  </figcaption>
                </div>
              </figure>
            </FadeIn>
          </section>
        </div>

        {/* Sticky enquiry sidebar (desktop) */}
        <aside id="enquire" aria-labelledby="enquire-title" className="hidden scroll-mt-28 lg:block">
          <div className="sticky top-28 rounded-card border border-border bg-paper p-7 shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{course.code}</p>
            <h2 id="enquire-title" className="mt-2 text-2xl font-semibold leading-tight text-ink">
              Enquire about this course
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Get intake dates, fees and personalised advice from our admissions team.
            </p>
            <div className="mt-6">
              <EnquiryForm courseTitle={course.title} courseCode={course.code} />
            </div>
          </div>
        </aside>
      </Container>

      {/* ───────── Related courses ───────── */}
      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="bg-surface py-20 sm:py-24">
          <Container>
            <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand">
                  Keep growing as a {category?.name.toLowerCase()}
                </p>
                <h2 id="related-title" className="text-3xl font-semibold text-ink sm:text-4xl">
                  <WordReveal text="Related courses" />
                </h2>
              </div>
              <Link
                href="/#courses"
                className="group inline-flex items-center gap-2 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand"
              >
                View all courses
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
            <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <StaggerItem key={r.code + r.title} as="article">
                  <Link
                    href={r.href}
                    className="group flex h-full flex-col justify-between rounded-card border border-border bg-paper p-7 shadow-card transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div>
                      <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <BookOpen aria-hidden="true" className="size-5" />
                      </span>
                      <p className="mt-6 font-mono text-xs font-medium tracking-wide text-muted">{r.code}</p>
                      <h3 className="mt-1 text-xl font-semibold leading-snug text-ink group-hover:text-brand">{r.title}</h3>
                    </div>
                    <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      View course
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      ) : null}

      <GetStarted id="course-get-started" primaryHref="#enquire" primaryLabel="Enquire about this course" />
      <MobileEnquiry courseTitle={course.title} courseCode={course.code} />
    </>
  );
}
