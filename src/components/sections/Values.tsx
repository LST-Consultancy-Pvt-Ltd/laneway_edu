import { HeartHandshake } from "lucide-react";
import Image from "next/image";
import { Counter } from "@/components/motion/Counter";
import { FadeIn } from "@/components/motion/FadeIn";
import { Parallax } from "@/components/motion/Parallax";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialPurpose, values } from "@/data/home";

export function Values() {
  return (
    <section id="our-why" aria-labelledby="values-title" className="bg-ink py-20 text-white sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionHeading
                id="values-title"
                tone="inverse"
                eyebrow={values.eyebrow}
                title={values.title}
                description={values.lead}
              />
            </FadeIn>
            <FadeIn delay={0.1} className="mt-10 hidden lg:block">
              <Parallax strength={14} className="aspect-[4/5] rounded-card">
                <Image
                  src={values.image}
                  alt={values.imageAlt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
            </FadeIn>
          </div>

          <Stagger className="grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:col-span-7 lg:self-start">
            {values.items.map((item, i) => (
              <StaggerItem key={item.title} className="flex flex-col bg-ink p-7 sm:p-9">
                <span aria-hidden="true" className="font-heading text-5xl font-light text-brand-light/80">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-2xl font-semibold capitalize">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Social purpose */}
        <FadeIn className="mt-16 lg:mt-24">
          <div className="grid gap-10 overflow-hidden rounded-[2rem] bg-blush p-8 text-ink sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink/70">
                <HeartHandshake aria-hidden="true" className="size-4" />
                {socialPurpose.eyebrow}
              </p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{socialPurpose.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink/80">{socialPurpose.body}</p>
              <p className="mt-3 leading-relaxed text-ink/70">{socialPurpose.detail}</p>
            </div>
            <div>
              <dl className="grid grid-cols-2 gap-4">
                {socialPurpose.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse rounded-card bg-paper/70 p-6 backdrop-blur">
                    <dt className="mt-2 text-sm leading-snug text-ink/70">{stat.label}</dt>
                    <dd className="font-heading text-5xl font-semibold text-ink sm:text-6xl">
                      <Counter value={stat.value} />
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm font-medium text-ink/70">{socialPurpose.partnerLabel}</p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
