import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

export function ProjectMedia({
  project,
  imageIndex = 0,
  priority = false,
  className,
  framed = true,
  interactive = false,
  sizes = "(min-width: 1024px) 560px, 100vw",
}: {
  project: Project;
  imageIndex?: number;
  priority?: boolean;
  className?: string;
  framed?: boolean;
  interactive?: boolean;
  sizes?: string;
}) {
  const image = project.images[imageIndex] ?? project.images[0];
  if (!image) return null;

  const aspect =
    project.presentation === "phone"
      ? "aspect-[9/16] max-w-[220px]"
      : project.presentation === "dashboard"
        ? "aspect-[16/10]"
        : "aspect-[16/10]";

  const inner = (
    <div className={cn("relative overflow-hidden bg-slate-100", aspect)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover object-top transition-transform duration-700 ease-out",
          interactive && "group-hover:scale-[1.03]",
        )}
      />
      {interactive ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
      ) : null}
    </div>
  );

  if (!framed) {
    return (
      <div className={cn("overflow-hidden rounded-lg border border-[var(--border-color)]", className)}>
        {inner}
      </div>
    );
  }

  if (project.presentation === "phone") {
    return <div className={cn("mx-auto", className)}>{inner}</div>;
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-[var(--border-color)] bg-white shadow-[var(--shadow-soft)] transition-[box-shadow,border-color,transform] duration-500",
        interactive &&
          "group-hover:-translate-y-1 group-hover:border-slate-300 group-hover:shadow-[0_20px_50px_-24px_rgb(22_87_181/0.35)]",
        className,
      )}
    >
      {framed && project.presentation === "browser" ? (
        <div
          className="flex items-center gap-1 border-b border-[var(--border-color)] bg-[var(--background-secondary)] px-3 py-2"
          aria-hidden="true"
        >
          <span className="size-1.5 rounded-full bg-slate-300" />
          <span className="size-1.5 rounded-full bg-slate-300" />
          <span className="size-1.5 rounded-full bg-slate-300" />
        </div>
      ) : null}
      {inner}
    </div>
  );
}
