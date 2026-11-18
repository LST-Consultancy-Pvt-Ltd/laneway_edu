"use client";

import { ArrowRight, ChevronDown, Mail, MapPin, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import { courseCategories, LEADERSHIP_SLUG, totalCourses } from "@/data/courses";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

type MenuId = "courses" | "campuses";

const navLinkClass =
  "relative inline-flex h-11 items-center gap-1 rounded-full px-3.5 text-[0.9375rem] font-medium text-ink/80 " +
  "transition-colors hover:bg-ink/[0.04] hover:text-ink aria-expanded:bg-ink/[0.04] aria-expanded:text-ink";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Partial<Record<MenuId, HTMLButtonElement | null>>>({});
  const coursesId = useId();
  const campusesId = useId();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 48));

  const close = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(null);
  }, []);

  // Pages stay mounted (hidden) after navigation with Cache Components —
  // reset transient menus when this header is hidden.
  useLayoutEffect(() => () => close(), [close]);

  // Esc closes and returns focus to the trigger; click outside closes.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerRefs.current[openMenu]?.focus();
        close();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu, close]);

  const hoverOpenedAt = useRef(0);
  const openOnHover = (id: MenuId) => {
    window.clearTimeout(closeTimer.current);
    if (openMenu !== id) hoverOpenedAt.current = Date.now();
    setOpenMenu(id);
  };
  const closeOnLeave = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  };
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  // A click that lands right after hover opened the menu should keep it open.
  const toggle = (id: MenuId) => {
    const justHoverOpened = Date.now() - hoverOpenedAt.current < 500;
    setOpenMenu((current) => (current === id && !justHoverOpened ? null : id));
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {/* Utility bar — scrolls away above the sticky header */}
      <div className="hidden bg-ink text-white/80 lg:block">
        <Container className="flex h-10 items-center justify-between text-[0.8125rem]">
          <p className="tracking-wide">
            RTO {site.compliance.rto} <span aria-hidden="true" className="mx-2 text-white/30">|</span> CRICOS{" "}
            {site.compliance.cricos}
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <Phone aria-hidden="true" className="size-3.5" />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail aria-hidden="true" className="size-3.5" />
                {site.contact.email}
              </a>
            </li>
          </ul>
        </Container>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[box-shadow,background-color,border-color] duration-300",
          scrolled || openMenu
            ? "border-border bg-paper/95 shadow-[0_6px_30px_-12px_rgb(17_17_17/0.18)] backdrop-blur-md"
            : "border-transparent bg-paper",
        )}
      >
        <nav ref={navRef} aria-label="Main" onMouseLeave={closeOnLeave}>
          <Container
            className={cn(
              "flex h-[4.5rem] items-center justify-between gap-6 lg:h-20",
            )}
          >
            <Logo priority className={cn("transition-[width] duration-300", scrolled ? "w-32 lg:w-36" : "w-36 lg:w-[10.5rem]")} />

            {/* Desktop navigation */}
            <ul className="hidden items-center gap-0.5 xl:flex">
              <li onMouseEnter={() => openOnHover("courses")}>
                <button
                  ref={(el) => {
                    triggerRefs.current.courses = el;
                  }}
                  type="button"
                  className={navLinkClass}
                  aria-expanded={openMenu === "courses"}
                  aria-controls={coursesId}
                  onClick={() => toggle("courses")}
                >
                  Courses
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("size-4 transition-transform duration-200", openMenu === "courses" && "rotate-180")}
                  />
                </button>
              </li>
              <li className="relative" onMouseEnter={() => openOnHover("campuses")}>
                <button
                  ref={(el) => {
                    triggerRefs.current.campuses = el;
                  }}
                  type="button"
                  className={navLinkClass}
                  aria-expanded={openMenu === "campuses"}
                  aria-controls={campusesId}
                  onClick={() => toggle("campuses")}
                >
                  Campuses
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("size-4 transition-transform duration-200", openMenu === "campuses" && "rotate-180")}
                  />
                </button>
                <AnimatePresence>
                  {openMenu === "campuses" ? (
                    <motion.div
                      id={campusesId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
                    >
                      <ul className="rounded-card border border-border bg-paper p-2 shadow-lift">
                        {site.campusLinks.map((link) => (
                          <li key={link.href}>
                            <SmartLink
                              href={link.href}
                              onClick={close}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
                            >
                              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                                <MapPin aria-hidden="true" className="size-4" />
                              </span>
                              <span>
                                <span className="block font-semibold text-ink group-hover:text-brand">
                                  {link.label}
                                </span>
                                <span className="block text-sm text-muted">{link.description}</span>
                              </span>
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
              {site.primaryNav.map((link) => (
                <li key={link.href} onMouseEnter={closeOnLeave}>
                  <SmartLink href={link.href} className={navLinkClass} onClick={close}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Button
                href={site.enquireHref}
                size="sm"
                className="hidden sm:inline-flex"
                icon={<ArrowRight />}
                onClick={close}
              >
                Enquire Now
              </Button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-expanded={mobileOpen}
                aria-haspopup="dialog"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-surface xl:hidden"
              >
                <Menu aria-hidden="true" className="size-5" />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </Container>

          {/* Courses mega menu */}
          <AnimatePresence>
            {openMenu === "courses" ? (
              <motion.div
                id={coursesId}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => openOnHover("courses")}
                className="absolute inset-x-0 top-full hidden border-t border-border bg-paper shadow-lift xl:block"
                data-lenis-prevent
              >
                <Container className="grid max-h-[calc(100dvh-8rem)] grid-cols-[1fr_18rem] gap-10 overflow-y-auto py-10">
                  <div className="grid grid-cols-4 gap-x-8 gap-y-8">
                    {courseCategories.map((category) => (
                      <div
                        key={category.id}
                        className={cn(category.id === "trade" && "col-span-2 row-span-2")}
                      >
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                          {category.name}
                        </p>
                        <ul
                          className={cn(
                            "space-y-1",
                            category.id === "trade" && "grid grid-cols-2 gap-x-6 gap-y-1 space-y-0",
                          )}
                        >
                          {category.courses.map((course) => (
                            <li key={course.code + course.title}>
                              {course.featured ? (
                                <Link
                                  href={course.href}
                                  onClick={close}
                                  className="group -mx-2 block rounded-lg bg-brand-soft px-2 py-1.5 text-sm font-semibold leading-snug text-brand-dark transition-colors hover:bg-brand hover:text-white"
                                >
                                  <span className="mr-1.5 font-mono text-[0.6875rem] font-medium opacity-80">
                                    {course.code}
                                  </span>
                                  {course.title}
                                </Link>
                              ) : (
                                <Link
                                  href={course.href}
                                  onClick={close}
                                  className="group -mx-2 block rounded-lg px-2 py-1.5 text-sm leading-snug text-ink/80 transition-colors hover:bg-surface hover:text-ink"
                                >
                                  <span className="mr-1.5 font-mono text-[0.6875rem] font-medium text-muted">
                                    {course.code}
                                  </span>
                                  <span className="group-hover:underline group-hover:decoration-brand group-hover:underline-offset-4">
                                    {course.title}
                                  </span>
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col justify-between rounded-card bg-ink p-7 text-white">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-light">
                        Featured course
                      </p>
                      <p className="mt-3 font-heading text-2xl leading-tight">
                        Diploma of Leadership and Management
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">
                        52 weeks · Sydney &amp; Melbourne · Blended delivery
                      </p>
                    </div>
                    <div className="mt-8 space-y-3">
                      <Button
                        href={`/courses/${LEADERSHIP_SLUG}`}
                        variant="inverse"
                        size="sm"
                        className="w-full"
                        onClick={close}
                        icon={<ArrowRight />}
                      >
                        View course
                      </Button>
                      <p className="text-center text-xs text-white/70">
                        {totalCourses} nationally recognised courses
                      </p>
                    </div>
                  </div>
                </Container>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </>
  );
}
