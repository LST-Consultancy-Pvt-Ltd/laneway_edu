import { Check } from "lucide-react";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Parallax } from "@/components/motion/Parallax";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { concierge } from "@/data/home";

export function Concierge() {
  return (
    <section id="student-support" aria-labelledby="concierge-title" className="bg-surface py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn direction="right" className="order-last lg:order-first">
          <Parallax strength={12} className="aspect-[4/3] rounded-[2rem] shadow-lift lg:aspect-[5/6]">
            <Image
              src={concierge.image}
              alt={concierge.imageAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Parallax>
        </FadeIn>

        <div>
          <FadeIn>
            <SectionHeading
              id="concierge-title"
              eyebrow={concierge.eyebrow}
              title={concierge.title}
              description={concierge.body}
            />
          </FadeIn>
          <p className="mt-8 font-semibold text-ink">We’ve got your back with:</p>
          <Stagger as="ul" stagger={0.06} className="mt-4 grid gap-3 sm:grid-cols-2">
            {concierge.services.map((service) => (
              <StaggerItem
                as="li"
                key={service}
                distance={14}
                className="flex items-start gap-3 rounded-2xl bg-paper p-4 text-[0.9375rem] leading-snug text-ink shadow-card"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                </span>
                {service}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
