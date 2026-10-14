import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config/site";
import { getPublicSettings, getServices } from "@/lib/content/repository";
import { graphSchema, organizationSchema, websiteSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSettings({
    email: siteConfig.email,
    phone: siteConfig.phone,
    location: siteConfig.location,
    description: siteConfig.description,
    social: [...siteConfig.social],
  });
  return { description: settings.description };
}

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const services = await getServices();
  const settings = await getPublicSettings({
    email: siteConfig.email,
    phone: siteConfig.phone,
    location: siteConfig.location,
    description: siteConfig.description,
    social: [...siteConfig.social],
  });

  const structuredData = graphSchema(
    organizationSchema({ email: settings.email, phone: settings.phone || undefined }),
    websiteSchema(),
  );

  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader services={services} />
      <main id="content">{children}</main>
      <SiteFooter services={services} settings={settings} />
    </>
  );
}
