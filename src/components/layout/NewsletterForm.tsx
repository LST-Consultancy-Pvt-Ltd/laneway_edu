"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

/** Front-end only demo: validates and shows a confirmation (no backend). */
export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setDone(true); // TODO: connect to the newsletter platform (e.g. Mailchimp / HubSpot)
  };

  if (done) {
    return (
      <p role="status" className="flex items-center gap-3 rounded-input bg-white/10 px-5 py-4 text-white">
        <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-brand-light" />
        Thanks for subscribing — we’ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "flex items-center gap-2 rounded-button border bg-white/5 p-1.5 pl-5 transition-colors focus-within:border-white/60",
          error ? "border-[#ff9b9b]" : "border-white/20",
        )}
      >
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-11 min-w-0 flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-button bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-brand-soft"
        >
          Subscribe
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 pl-5 text-sm text-[#ffb4b4]">
          {error}
        </p>
      ) : null}
    </form>
  );
}
