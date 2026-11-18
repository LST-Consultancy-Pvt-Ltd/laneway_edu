import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { partners } from "@/data/home";

/** Slow CSS marquee (pauses on hover, static with reduced motion). */
export function Partners() {
  // Each half of the track must be identical for a seamless loop.
  const half = [...partners.logos, ...partners.logos, ...partners.logos];
  return (
    <section id="partners" aria-labelledby="partners-title" className="border-y border-border bg-surface py-16 sm:py-20">
      <FadeIn>
        <h2
          id="partners-title"
          className="px-4 text-center font-sans text-sm font-semibold uppercase tracking-[0.16em] text-muted"
        >
          {partners.title}
        </h2>
      </FadeIn>

      {/* Accessible static list for assistive tech */}
      <ul className="sr-only">
        {partners.logos.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {half.map((logo, i) => (
                <li key={`${copy}-${logo.name}-${i}`} className="mx-6 sm:mx-10">
                  <div className="flex h-24 w-44 items-center justify-center rounded-2xl bg-paper px-6 shadow-card sm:w-52">
                    <Image
                      src={logo.image}
                      alt=""
                      sizes="160px"
                      className="max-h-14 w-auto object-contain grayscale transition duration-300 hover:grayscale-0"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
