import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getServices } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Software Development Services",
  description:
    "Website development, e-commerce, custom web applications, business systems, mobile apps, UI/UX, integrations, and marketing technology for Philippine businesses.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <Container className="section">
      <p className="eyebrow">Services</p>
      <h1 className="h1 mt-3 max-w-3xl">Practical software, built around the way your business works.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
        Choose the engagement that matches the problem. A website, a store, and an internal system
        are different products — we scope them that way.
      </p>
      <div className="mt-14 divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
        {services.map((service, index) => (
          <article key={service.slug} className="grid gap-4 py-8 md:grid-cols-12 md:items-start">
            <p className="font-semibold text-[var(--brand-accent)] md:col-span-1">0{index + 1}</p>
            <div className="md:col-span-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </h2>
            </div>
            <p className="text-sm leading-6 text-[var(--text-secondary)] md:col-span-5">{service.summary}</p>
            <Link
              href={`/services/${service.slug}`}
              className="text-sm font-semibold text-[var(--brand-secondary)] md:col-span-2 md:text-right"
            >
              View service
            </Link>
          </article>
        ))}
      </div>
    </Container>
  );
}
