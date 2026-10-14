import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "border border-transparent bg-[var(--brand-secondary)] !text-white shadow-[0_1px_2px_rgb(15_23_42/0.08),0_4px_12px_-2px_rgb(22_87_181/0.35)] hover:bg-[#124a9e] hover:shadow-[0_4px_16px_-2px_rgb(22_87_181/0.45)] active:bg-[#0f3d85] active:scale-[0.98]",
  secondary:
    "border border-[var(--border-color)] bg-white !text-[var(--text-primary)] shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:shadow active:bg-slate-100 active:scale-[0.98]",
  ghost:
    "border border-transparent bg-transparent !text-[var(--text-primary)] hover:bg-slate-100 active:bg-slate-200/80",
  light:
    "border border-transparent bg-white !text-[var(--brand-primary)] shadow-sm hover:bg-slate-50 active:bg-slate-100 active:scale-[0.98]",
  inverse:
    "border border-white/40 bg-white/10 !text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/15 active:bg-white/20 active:scale-[0.98]",
};

const base =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold leading-none no-underline transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "primary",
  className,
  children,
  href,
  target,
  rel,
  ...props
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel} data-button>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
