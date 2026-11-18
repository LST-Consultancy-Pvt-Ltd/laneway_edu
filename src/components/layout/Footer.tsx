import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import Link from "next/link";
import { courseCategories, LEADERSHIP_SLUG } from "@/data/courses";
import { newsletter } from "@/data/home";
import { site } from "@/data/site";
import { WordReveal } from "@/components/motion/WordReveal";
import { NewsletterForm } from "./NewsletterForm";

const linkClass = "text-[0.9375rem] text-white/70 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <Container className="grid gap-8 py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:py-16">
          <div>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              <WordReveal text={newsletter.title} />
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-white/70">{site.mission}</p>
          </div>
          <div>
            <NewsletterForm />
            <p className="mt-3 pl-5 text-sm text-white/70">
              {newsletter.privacyNote} Privacy Policy.
            </p>
          </div>
        </Container>
      </div>

      {/* Main footer */}
      <Container className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo tone="light" className="w-40" />
          <p className="mt-6 max-w-sm leading-relaxed text-white/70">{site.description}</p>

          <ul className="mt-8 space-y-3 text-[0.9375rem]">
            <li>
              <a href={site.contact.phoneHref} className="inline-flex items-center gap-3 text-white hover:text-brand-light">
                <Phone aria-hidden="true" className="size-4 text-brand-light" />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-3 text-white hover:text-brand-light"
              >
                <Mail aria-hidden="true" className="size-4 text-brand-light" />
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-labelledby="footer-courses" className="lg:col-span-4">
          <h2 id="footer-courses" className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white">
            Areas of study
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            {courseCategories.map((category) => (
              <li key={category.id} className="text-[0.9375rem] text-white/70">
                {category.name}
              </li>
            ))}
          </ul>
          <Link
            href={`/courses/${LEADERSHIP_SLUG}`}
            className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-white underline decoration-brand-light decoration-2 underline-offset-[6px] hover:text-brand-light"
          >
            Featured: Diploma of Leadership and Management
          </Link>
        </nav>

        {site.footerColumns.map((column) => (
          <nav key={column.title} aria-labelledby={`footer-${column.title}`} className="lg:col-span-2">
            <h2
              id={`footer-${column.title}`}
              className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white"
            >
              {column.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <SmartLink href={link.href} className={linkClass}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      {/* Campuses */}
      <Container>
        <ul className="grid gap-4 border-t border-white/10 py-10 sm:grid-cols-2">
          {site.campuses.map((campus) => (
            <li key={campus.id}>
              <a
                href={campus.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-card border border-white/10 p-5 transition-colors hover:border-white/30 hover:bg-white/[0.03]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <MapPin aria-hidden="true" className="size-4" />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{campus.name}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-white/70">
                    {campus.address.join(", ")}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                />
                <span className="sr-only">(open in Google Maps, new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>

      {/* Legal */}
      <div className="border-t border-white/10">
        <Container className="space-y-4 pb-28 pt-8 text-sm text-white/70 lg:pb-8">
          <p className="max-w-3xl leading-relaxed">{site.acknowledgement}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {site.copyrightYear} {site.name}. All rights reserved.
            </p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <span>RTO {site.compliance.rto}</span>
              <span>CRICOS Provider {site.compliance.cricos}</span>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
