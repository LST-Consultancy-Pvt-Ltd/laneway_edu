import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
};

/** Official Laneway logo (stored locally). `light` inverts it for dark backgrounds. */
export function Logo({ tone = "dark", className, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center rounded-md", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src={images.logo}
        alt=""
        priority={priority}
        sizes="180px"
        className={cn("h-auto w-full", tone === "light" && "brightness-0 invert")}
      />
    </Link>
  );
}
