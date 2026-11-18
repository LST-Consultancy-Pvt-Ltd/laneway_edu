import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export function Campuses() {
  return (
    <section id="campuses" aria-labelledby="campuses-title" className="bg-paper py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            id="campuses-title"
            eyebrow="Campuses"
            title="Study in the heart of Sydney and Melbourne."
          />
        </FadeIn>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
          {site.campuses.map((campus) => (
            <StaggerItem
              as="article"
              key={campus.id}
              id={campus.id}
              aria-labelledby={`${campus.id}-title`}
              className="group scroll-mt-28 overflow-hidden rounded-card border border-border bg-paper shadow-card transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={campus.image}
                  alt={campus.imageAlt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3.5 py-1.5 text-sm font-semibold text-ink backdrop-blur">
                  {campus.city}
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <h3 id={`${campus.id}-title`} className="text-2xl font-semibold text-ink sm:text-3xl">
                  {campus.name}
                </h3>
                <address className="mt-5 space-y-3 not-italic">
                  <p className="flex gap-3 text-ink/80">
                    <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
                    <span>
                      {campus.address[0]}
                      <br />
                      {campus.address[1]}
                    </span>
                  </p>
                  <p>
                    <a href={site.contact.phoneHref} className="flex gap-3 text-ink/80 hover:text-brand">
                      <Phone aria-hidden="true" className="size-5 shrink-0 text-brand" />
                      {site.contact.phone}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${site.contact.email}`} className="flex gap-3 text-ink/80 hover:text-brand">
                      <Mail aria-hidden="true" className="size-5 shrink-0 text-brand" />
                      {site.contact.email}
                    </a>
                  </p>
                </address>
                <a
                  href={campus.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex h-11 items-center gap-2 rounded-button border-2 border-ink/15 px-5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  Get directions
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only">to {campus.name} (opens Google Maps in a new tab)</span>
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
