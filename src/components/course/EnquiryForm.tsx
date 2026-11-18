"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  residency: "" | "domestic" | "international";
  campus: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

const initial: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  residency: "",
  campus: "",
  message: "",
  consent: false,
};

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.firstName.trim()) e.firstName = "Enter your first name.";
  if (!f.lastName.trim()) e.lastName = "Enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (f.phone.trim() && !/^[+()\d\s-]{8,20}$/.test(f.phone.trim()))
    e.phone = "Enter a valid phone number, e.g. 0412 345 678.";
  if (!f.residency) e.residency = "Tell us whether you’re a domestic or international student.";
  if (!f.campus) e.campus = "Choose a preferred campus.";
  if (!f.consent) e.consent = "Please agree so we can contact you.";
  return e;
}

const inputClass =
  "block h-12 w-full rounded-input border bg-paper px-4 text-ink placeholder:text-muted/70 " +
  "transition-[border-color,box-shadow] focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

/** Front-end only course enquiry form with inline validation (no backend). */
export function EnquiryForm({ courseTitle, courseCode }: { courseTitle: string; courseCode: string }) {
  const id = useId();
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate(fields);
    setErrors(result);
    const firstInvalid = Object.keys(result)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // TODO: send to CRM (e.g. HubSpot / Salesforce) via a server action.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div role="status" className="py-6 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-soft text-brand">
          <CircleCheck aria-hidden="true" className="size-7" />
        </span>
        <p className="mt-5 font-heading text-2xl font-semibold text-ink">Thanks, {fields.firstName}!</p>
        <p className="mt-2 leading-relaxed text-muted">
          Our admissions team will be in touch about the {courseTitle} shortly. Need an answer sooner? Call{" "}
          <a href={site.contact.phoneHref} className="font-semibold text-brand underline underline-offset-4">
            {site.contact.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(initial);
            setSubmitted(false);
          }}
          className="mt-6 text-sm font-semibold text-ink underline underline-offset-4 hover:text-brand"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-4">
      <input type="hidden" name="course" value={`${courseCode} ${courseTitle}`} />
      {errorCount > 0 ? (
        <p role="alert" className="rounded-input bg-[#fdecec] px-4 py-3 text-sm font-medium text-[#9b1c1c]">
          Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} below.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-first`} label="First name" error={errors.firstName}>
          <input
            id={`${id}-first`}
            name="firstName"
            autoComplete="given-name"
            value={fields.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? `${id}-first-error` : undefined}
            className={cn(inputClass, errors.firstName ? "border-[#c53030]" : "border-border")}
          />
        </Field>
        <Field id={`${id}-last`} label="Last name" error={errors.lastName}>
          <input
            id={`${id}-last`}
            name="lastName"
            autoComplete="family-name"
            value={fields.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={errors.lastName ? `${id}-last-error` : undefined}
            className={cn(inputClass, errors.lastName ? "border-[#c53030]" : "border-border")}
          />
        </Field>
      </div>

      <Field id={`${id}-email`} label="Email" error={errors.email}>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(e) => set("email", e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={cn(inputClass, errors.email ? "border-[#c53030]" : "border-border")}
        />
      </Field>

      <Field id={`${id}-phone`} label="Phone" optional error={errors.phone}>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={fields.phone}
          onChange={(e) => set("phone", e.target.value)}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
          className={cn(inputClass, errors.phone ? "border-[#c53030]" : "border-border")}
        />
      </Field>

      <fieldset aria-describedby={errors.residency ? `${id}-res-error` : undefined}>
        <legend className="mb-1.5 text-sm font-semibold text-ink">I am a…</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["domestic", "international"] as const).map((value) => (
            <label
              key={value}
              className={cn(
                "flex h-12 cursor-pointer items-center justify-center rounded-input border text-sm font-medium capitalize transition-colors",
                "has-[:checked]:border-brand has-[:checked]:bg-brand-soft has-[:checked]:text-brand-dark",
                "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/25",
                errors.residency ? "border-[#c53030]" : "border-border hover:border-ink/30",
              )}
            >
              <input
                type="radio"
                name="residency"
                value={value}
                checked={fields.residency === value}
                onChange={() => set("residency", value)}
                className="sr-only"
              />
              {value} student
            </label>
          ))}
        </div>
        {errors.residency ? <ErrorText id={`${id}-res-error`}>{errors.residency}</ErrorText> : null}
      </fieldset>

      <Field id={`${id}-campus`} label="Preferred campus" error={errors.campus}>
        <select
          id={`${id}-campus`}
          name="campus"
          value={fields.campus}
          onChange={(e) => set("campus", e.target.value)}
          aria-invalid={errors.campus ? true : undefined}
          aria-describedby={errors.campus ? `${id}-campus-error` : undefined}
          className={cn(inputClass, "appearance-none bg-[length:1.25rem] bg-[right_0.875rem_center] bg-no-repeat pr-10", errors.campus ? "border-[#c53030]" : "border-border")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2359616c' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="">Select a campus</option>
          {site.campuses.map((c) => (
            <option key={c.id} value={c.city}>
              {c.city}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${id}-message`} label="Your question" optional>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={3}
          value={fields.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Ask about intake dates, fees, entry requirements…"
          className={cn(inputClass, "h-auto resize-y border-border py-3")}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="consent"
            checked={fields.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-[var(--color-brand)]"
          />
          <span>
            I agree to Laneway Education contacting me about this course, in line with the Privacy Policy.
          </span>
        </label>
        {errors.consent ? <ErrorText id={`${id}-consent-error`}>{errors.consent}</ErrorText> : null}
      </div>

      <button
        type="submit"
        className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-button bg-brand px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
      >
        Send enquiry
        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-ink">
        {label}
        {optional ? <span className="text-xs font-normal text-muted">Optional</span> : null}
      </label>
      {children}
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-[#b42318]">
      {children}
    </p>
  );
}
