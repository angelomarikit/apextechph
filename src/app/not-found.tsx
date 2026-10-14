import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config/site";
import { getPublicSettings, getServices } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const services = await getServices();
  const settings = await getPublicSettings({
    email: siteConfig.email,
    phone: siteConfig.phone,
    location: siteConfig.location,
    description: siteConfig.description,
    social: [...siteConfig.social],
  });

  return (
    <>
      <SiteHeader services={services} />
      <main id="content">
        <Container className="py-24">
          <p className="eyebrow">404</p>
          <h1 className="h1 mt-3">That page is not on this site.</h1>
          <p className="mt-4 max-w-lg text-[var(--text-secondary)]">
            The address may be out of date. The work, services, and contact pages are the useful
            places to continue.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/">Back home</Button>
            <Button href="/work" variant="secondary">
              View our work
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter services={services} settings={settings} />
    </>
  );
}
