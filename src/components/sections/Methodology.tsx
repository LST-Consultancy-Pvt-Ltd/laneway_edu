import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { methodology } from "@/data/home";

const dotColours = ["bg-brand-light", "bg-blush", "bg-[#d5d6d5]"];

export function Methodology() {
  return (
    <section id="how-we-teach" aria-labelledby="method-title" className="overflow-hidden bg-paper py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <FadeIn>
            <SectionHeading id="method-title" eyebrow={methodology.eyebrow} title={methodology.title} />
            <p className="mt-6 text-lg leading-relaxed text-ink/80">{methodology.lead}</p>
            <p className="mt-4 leading-relaxed text-muted">{methodology.body}</p>
          </FadeIn>

          <Stagger as="ol" className="mt-10 space-y-4">
            {methodology.pillars.map((pillar, i) => (
              <StaggerItem
                as="li"
                key={pillar.title}
                className="flex gap-5 rounded-card border border-border p-5 transition-colors hover:border-brand/40 hover:bg-surface"
              >
                <span
                  aria-hidden="true"
                  className={`mt-1 grid size-10 shrink-0 place-items-center rounded-full font-heading text-lg font-semibold text-ink ${dotColours[i]}`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-sans text-lg font-semibold tracking-normal text-ink">{pillar.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{pillar.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <FadeIn direction="left" delay={0.1} className="relative mx-auto w-full max-w-lg">
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-surface" />
          <Image
            src={methodology.image}
            alt={methodology.imageAlt}
            sizes="(min-width: 1024px) 32rem, 90vw"
            className="relative h-auto w-full"
          />
        </FadeIn>
      </Container>
    </section>
  );
}
