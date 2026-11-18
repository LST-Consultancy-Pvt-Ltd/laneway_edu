import {
  ArrowRight,
  CodeXml,
  HardHat,
  Lightbulb,
  Megaphone,
  ShieldCheck,
  SquareKanban,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { courseCategories, totalCourses, type CategoryId } from "@/data/courses";
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

export function CourseAreas() {
  return (
    <section id="courses" aria-labelledby="courses-title" className="bg-surface py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="courses-title"
            eyebrow="Courses"
            title="Find the path that fits your ambition."
            description={`${totalCourses} nationally recognised qualifications across seven areas of study, delivered in Sydney and Melbourne.`}
          />
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {courseCategories.map((category) => {
            const Icon = icons[category.id];
            const isTrade = category.id === "trade";
            return (
              <StaggerItem
                as="article"
                key={category.id}
                className={cn(
                  "group flex flex-col rounded-card border border-border bg-paper p-6 shadow-card transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift sm:p-7",
                  isTrade && "sm:col-span-2 lg:col-span-3",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
                    {category.courses.length} {category.courses.length === 1 ? "course" : "courses"}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-ink">{category.name}</h3>
                <p className="mt-2 leading-relaxed text-muted">{category.blurb}</p>

                <ul
                  className={cn(
                    "mt-6 border-t border-border pt-4",
                    isTrade && "grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3",
                  )}
                >
                  {category.courses.map((course) => (
                    <li key={course.code + course.title}>
                      {course.featured ? (
                        <Link
                          href={course.href}
                          className="group/link -mx-3 my-1 flex items-center justify-between gap-3 rounded-xl bg-brand-soft px-3 py-2.5 text-[0.9375rem] leading-snug text-brand-dark transition-colors hover:bg-brand hover:text-white"
                        >
                          <span>
                            <span className="mb-0.5 block font-mono text-[0.6875rem] font-medium tracking-wide opacity-80">
                              {course.code}
                            </span>
                            <span className="font-semibold">{course.title}</span>
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 shrink-0 transition-transform group-hover/link:translate-x-1"
                          />
                        </Link>
                      ) : (
                        <Link
                          href={course.href}
                          className="group/link flex items-start justify-between gap-3 rounded-lg py-2.5 text-[0.9375rem] leading-snug text-ink transition-colors hover:text-brand"
                        >
                          <span>
                            <span className="mb-0.5 block font-mono text-[0.6875rem] font-medium tracking-wide text-muted">
                              {course.code}
                            </span>
                            <span className="font-medium">{course.title}</span>
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="mt-4 size-4 shrink-0 text-muted opacity-0 transition-[opacity,transform] group-hover/link:translate-x-1 group-hover/link:text-brand group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
                          />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
