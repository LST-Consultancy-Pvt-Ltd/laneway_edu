import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { WordReveal } from "@/components/motion/WordReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images } from "@/data/images";
import { getStarted } from "@/data/home";
import { site } from "@/data/site";

/** "Ready to get started?" closing band. */
type GetStartedProps = {
  id?: string;
  /** Primary action — defaults to the contact section */
  primaryHref?: string;
  primaryLabel?: string;
};

export function GetStarted({
  id = "get-started",
  primaryHref = site.enquireHref,
  primaryLabel = "Enquire Now",
}: GetStartedProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="bg-paper py-16 sm:py-24">
      <Container>
        <FadeIn>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-dark px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-20">
            <Image
              src={images.roadAhead}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1280px) 80rem, 100vw"
              className="-z-20 object-cover opacity-30 mix-blend-luminosity"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/40"
            />
            <div className="max-w-2xl">
              <h2 id={`${id}-title`} className="text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                <WordReveal text={getStarted.title} />
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/80">{getStarted.body}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={primaryHref} variant="inverse" size="lg" icon={<ArrowRight />}>
                  {primaryLabel}
                </Button>
                <Button href="/#courses" variant="outline-inverse" size="lg">
                  Explore courses
                </Button>
              </div>
              <p className="mt-8 flex items-center gap-2 text-white/80">
                <Phone aria-hidden="true" className="size-4" />
                Prefer to talk?{" "}
                <a href={site.contact.phoneHref} className="font-semibold text-white underline underline-offset-4">
                  {site.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
