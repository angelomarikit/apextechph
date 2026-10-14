import Image from "next/image";

import { cn } from "@/lib/utils";

export function HeroBanner({
  className,
  priority = true,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--border-color)] bg-white shadow-[var(--shadow-soft)] transition-[box-shadow,transform] duration-500 group-hover:shadow-[0_20px_50px_-24px_rgb(22_87_181/0.35)]",
        className,
      )}
    >
      <Image
        src="/brand/hero-banner.jpg"
        alt="Apex Technology — websites, applications, and business systems for growing businesses in the Philippines"
        width={1600}
        height={1200}
        priority={priority}
        sizes="(min-width: 1024px) 520px, 100vw"
        className="h-auto w-full object-cover"
      />
    </div>
  );
}
