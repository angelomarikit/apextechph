import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "header" | "footer";
};

export function Logo({ className, size = "header" }: LogoProps) {
  const isFooter = size === "footer";

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="APEXTECHPH home"
    >
      <span
        className={cn(
          "font-semibold uppercase tracking-[0.22em]",
          isFooter
            ? "text-base text-white sm:text-lg"
            : "text-[0.8125rem] text-[var(--brand-primary)] sm:text-sm",
        )}
      >
        APEXTECHPH
      </span>
    </Link>
  );
}
