import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { intro } from "@/data/home";

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="bg-paper py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-7">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand">{intro.eyebrow}</p>
          <h2
            id="intro-title"
            className="text-3xl font-semibold leading-[1.12] text-ink sm:text-4xl lg:text-[3.25rem]"
          >
            {intro.title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15} className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-5 lg:pt-10">
          {intro.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <a
            href="#our-why"
            className="group inline-flex items-center gap-2 pt-2 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand"
          >
            Discover our why
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </FadeIn>
      </Container>
    </section>
  );
}
