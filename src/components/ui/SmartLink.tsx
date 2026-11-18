import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { isExternalHref } from "@/lib/utils";

type SmartLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  /** Open external links in a new tab (with an sr-only hint) */
  newTab?: boolean;
};

/**
 * Internal paths use next/link; absolute URLs (maps), mailto: and tel:
 * render a plain anchor.
 */
export function SmartLink({ href, newTab = false, children, ...props }: SmartLinkProps) {
  if (!isExternalHref(href)) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
      {children}
      {newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
