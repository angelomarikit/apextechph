import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config/site";
import type { Service } from "@/types/content";

export function SiteFooter({
  services,
  settings,
}: {
  services: Pick<Service, "slug" | "title">[];
  settings: { email: string; phone: string; location: string; social: { label: string; href: string }[] };
}) {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--ink)] text-white">
      <Container className="grid gap-8 py-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <Logo size="footer" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
            {siteConfig.tagline} Websites, applications, and business systems for teams in the
            Philippines and abroad.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Services</p>
          <ul className="mt-3 space-y-1.5 text-sm text-white/75">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Company</p>
          <ul className="mt-3 space-y-1.5 text-sm text-white/75">
            <li><Link href="/work" className="hover:text-white">Our Work</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/process" className="hover:text-white">Our Process</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Contact</p>
          <ul className="mt-3 space-y-1.5 text-sm text-white/75">
            <li>
              <Link href="/contact" className="hover:text-white">
                Get in touch
              </Link>
            </li>
            {settings.phone ? (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </li>
            ) : null}
            <li>{settings.location}</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Apex Technology</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
