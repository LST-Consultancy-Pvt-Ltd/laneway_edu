import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "group/button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button font-semibold " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out-soft " +
  "hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-brand text-white shadow-sm hover:bg-brand-dark hover:shadow-md",
  accent: "bg-accent text-ink shadow-sm hover:shadow-md hover:brightness-105",
  outline: "border-2 border-ink/15 bg-paper text-ink hover:border-brand hover:text-brand",
  ghost: "text-ink hover:bg-ink/5",
  inverse: "bg-white text-ink shadow-sm hover:bg-surface hover:shadow-md",
  "outline-inverse": "border-2 border-white/40 text-white hover:border-white hover:bg-white/10",
} as const;

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional trailing icon, nudged on hover */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = StyleProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof StyleProps> & { href?: undefined };

type ButtonAsLink = StyleProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof StyleProps | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<StyleProps, "variant" | "size" | "className">) {
  return cn(base, variants[variant], sizes[size], className);
}

function Inner({ icon, children }: Pick<StyleProps, "icon" | "children">) {
  return (
    <>
      {children}
      {icon ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/button:translate-x-0.5 [&>svg]:size-4"
        >
          {icon}
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, icon, className, children, href, ...rest } = props;
    const classes = buttonClasses({ variant, size, className });
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      const opensNewTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          <Inner icon={icon}>{children}</Inner>
          {opensNewTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        <Inner icon={icon}>{children}</Inner>
      </Link>
    );
  }

  const { variant, size, icon, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
