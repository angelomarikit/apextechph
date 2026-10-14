"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navItems } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/content";

export function SiteHeader({ services }: { services: Pick<Service, "slug" | "navLabel">[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState({ path: pathname, open: false, services: false });
  if (menu.path !== pathname) {
    setMenu({ path: pathname, open: false, services: false });
  }
  const open = menu.open;
  const servicesOpen = menu.services;
  const menuId = useId();
  const servicesId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-[var(--border-color)] bg-white/95 backdrop-blur-sm transition-shadow",
        scrolled && "shadow-sm",
      )}
    >
      <Container className="flex h-14 items-center gap-4 sm:h-16">
        <Logo />
        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Primary">
          {navItems.map((item) =>
            item.href === "/services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setMenu((c) => ({ ...c, services: true }))}
                onMouseLeave={() => setMenu((c) => ({ ...c, services: false }))}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-md px-2.5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                    pathname.startsWith("/services") && "text-[var(--text-primary)]",
                  )}
                  aria-expanded={servicesOpen}
                  aria-controls={servicesId}
                >
                  {item.label}
                </Link>
                <div
                  id={servicesId}
                  className={cn("absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-1", !servicesOpen && "hidden")}
                >
                  <div className="rounded-lg border border-[var(--border-color)] bg-white p-1 shadow-lg">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block rounded-md px-3 py-2 text-sm hover:bg-[var(--background-secondary)]"
                      >
                        {service.navLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-2.5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  pathname === item.href && "text-[var(--text-primary)]",
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="hidden lg:block">
          <Button href="/quote">Start a Project</Button>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex size-10 items-center justify-center rounded-md border border-[var(--border-color)] lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setMenu((c) => ({ ...c, open: !c.open }))}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </Container>
      {open ? (
        <div id={menuId} className="border-t border-[var(--border-color)] lg:hidden">
          <Container className="space-y-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-2 py-2.5 text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/quote" className="mt-3 w-full">
              Start a Project
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
