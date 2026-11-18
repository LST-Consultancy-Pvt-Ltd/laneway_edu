"use client";

import { useLenis } from "lenis/react";
import { MessageSquareText, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { EnquiryForm } from "./EnquiryForm";

type MobileEnquiryProps = { courseTitle: string; courseCode: string };

/**
 * Below `lg`, the sticky sidebar form is replaced by a bottom action bar that
 * opens the form in a native <dialog> (built-in focus trap, Esc, inert page).
 */
export function MobileEnquiry({ courseTitle, courseCode }: MobileEnquiryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  const close = useCallback(() => dialogRef.current?.close(), []);
  const openSheet = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
  }, []);

  // Below lg the sidebar form is hidden, so any "#enquire" link opens the sheet.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href="#enquire"]');
      if (!link || window.matchMedia("(min-width: 1024px)").matches) return;
      e.preventDefault();
      e.stopPropagation(); // keep Lenis from scrolling to the hidden sidebar
      openSheet();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [openSheet]);

  // Close if the page is hidden by Activity after navigation.
  useLayoutEffect(() => () => close(), [close]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [open, lenis]);

  return (
    <>
      <MobileActionBar alwaysVisible>
        <button
          type="button"
          onClick={openSheet}
          aria-haspopup="dialog"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-button bg-brand px-6 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
        >
          <MessageSquareText aria-hidden="true" className="size-4" />
          Enquire about this course
        </button>
      </MobileActionBar>

      <dialog
        ref={dialogRef}
        aria-labelledby="mobile-enquiry-title"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close(); // backdrop click
        }}
        className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-[1.75rem] bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm open:animate-[sheet-in_0.35s_cubic-bezier(0.22,1,0.36,1)] sm:mx-auto sm:max-w-lg lg:hidden"
      >
        <div className="flex max-h-[92dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{courseCode}</p>
              <h2 id="mobile-enquiry-title" className="mt-1 text-xl font-semibold leading-tight">
                Enquire about this course
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-border hover:bg-surface"
            >
              <X aria-hidden="true" className="size-5" />
              <span className="sr-only">Close enquiry form</span>
            </button>
          </div>
          <div className="overflow-y-auto overscroll-contain px-5 py-5" data-lenis-prevent>
            <EnquiryForm courseTitle={courseTitle} courseCode={courseCode} />
          </div>
        </div>
      </dialog>
    </>
  );
}
