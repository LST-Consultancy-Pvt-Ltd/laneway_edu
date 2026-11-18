"use client";

import { useLenis } from "lenis/react";
import { ArrowRight, ChevronDown, ChevronRight, Mail, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import { courseCategories } from "@/data/courses";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = { open: boolean; onClose: () => void };

// Each sub-link is its own bordered row so wrapped titles can't run into the next link.
const subListClass = "divide-y divide-border overflow-hidden rounded-xl border border-border";
const subLinkClass =
  "flex min-h-14 items-center gap-3 px-4 py-3 transition-colors hover:bg-surface active:bg-surface";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const lenis = useLenis();
  const titleId = useId();

  // Close when the page is hidden by Activity (Cache Components navigation).
  useLayoutEffect(() => () => onClose(), [onClose]);

  // Scroll lock, focus management, Esc + focus trap
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose, lenis]);

  const toggleSection = (id: string) => setExpanded((current) => (current === id ? null : id));

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl"
          >
            <h2 id={titleId} className="sr-only">
              Site menu
            </h2>
            <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-border px-5">
              <Logo className="w-32" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-surface"
              >
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-5 py-4" data-lenis-prevent>
              <ul className="divide-y divide-border">
                <li>
                  <SectionToggle
                    label="Courses"
                    id="courses"
                    expanded={expanded === "courses"}
                    onToggle={toggleSection}
                  />
                  <Collapse open={expanded === "courses"} id="mobile-courses">
                    <div className="space-y-5 pb-5">
                      {courseCategories.map((category) => (
                        <div key={category.id}>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                            {category.name}
                          </p>
                          <ul className={subListClass}>
                            {category.courses.map((course) => (
                              <li key={course.code + course.title}>
                                <SmartLink
                                  href={course.href}
                                  onClick={onClose}
                                  className={cn(subLinkClass, course.featured && "bg-brand-soft hover:bg-brand-soft")}
                                >
                                  <span className="min-w-0 flex-1">
                                    <span className="block font-mono text-[0.6875rem] tracking-wide text-muted">
                                      {course.code}
                                    </span>
                                    <span
                                      className={cn(
                                        "mt-0.5 block text-[0.9375rem] leading-snug text-ink",
                                        course.featured && "font-semibold text-brand-dark",
                                      )}
                                    >
                                      {course.title}
                                    </span>
                                  </span>
                                  <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                                </SmartLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Collapse>
                </li>
                <li>
                  <SectionToggle
                    label="Campuses"
                    id="campuses"
                    expanded={expanded === "campuses"}
                    onToggle={toggleSection}
                  />
                  <Collapse open={expanded === "campuses"} id="mobile-campuses">
                    <div className="pb-5">
                      <ul className={subListClass}>
                        {site.campusLinks.map((link) => (
                          <li key={link.href}>
                            <SmartLink href={link.href} onClick={onClose} className={subLinkClass}>
                              <span className="min-w-0 flex-1">
                                <span className="block font-medium leading-snug text-ink">{link.label}</span>
                                <span className="mt-0.5 block text-sm text-muted">{link.description}</span>
                              </span>
                              <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Collapse>
                </li>
                {site.primaryNav.map((link) => (
                  <li key={link.href}>
                    <SmartLink
                      href={link.href}
                      onClick={onClose}
                      className="flex min-h-14 items-center font-heading text-xl text-ink hover:text-brand"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="shrink-0 space-y-4 border-t border-border bg-surface px-5 py-5">
              <Button href={site.enquireHref} className="w-full" icon={<ArrowRight />} onClick={onClose}>
                Enquire Now
              </Button>
              <div className="text-sm">
                <div className="space-y-1.5">
                  <a href={site.contact.phoneHref} className="flex items-center gap-2 text-ink hover:text-brand">
                    <Phone aria-hidden="true" className="size-4 text-brand" />
                    {site.contact.phone}
                  </a>
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 text-ink hover:text-brand">
                    <Mail aria-hidden="true" className="size-4 text-brand" />
                    {site.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function SectionToggle({
  label,
  id,
  expanded,
  onToggle,
}: {
  label: string;
  id: string;
  expanded: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls={`mobile-${id}`}
      onClick={() => onToggle(id)}
      className="flex min-h-14 w-full items-center justify-between font-heading text-xl text-ink"
    >
      {label}
      <ChevronDown
        aria-hidden="true"
        className={cn("size-5 text-muted transition-transform duration-300", expanded && "rotate-180 text-brand")}
      />
    </button>
  );
}

function Collapse({ open, id, children }: { open: boolean; id: string; children: ReactNode }) {
  return (
    <div
      id={id}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out-soft",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
      inert={!open}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
