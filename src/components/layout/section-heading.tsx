import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className={cn("h2 text-balance", eyebrow && "mt-2")}>{title}</h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{description}</p>
      ) : null}
    </div>
  );
}
