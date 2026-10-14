import {
  ClosingCta,
  FeaturedWork,
  Hero,
  ProcessPreview,
  ServicesOverview,
  Technology,
  TrustStrip,
  WhyApex,
} from "@/components/home/sections";
import { getProjects, getServices } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Software Development Company in the Philippines",
  description:
    "Apex Technology (APEXTECHPH) builds websites, e-commerce, web apps, and custom business systems for companies in the Philippines and internationally.",
  path: "/",
  ogImage: "/brand/hero-banner.jpg",
});

export default async function HomePage() {
  const [projects, services] = await Promise.all([getProjects(), getServices()]);
  return (
    <>
      <Hero projects={projects} />
      <TrustStrip />
      <ServicesOverview services={services} />
      <FeaturedWork projects={projects} />
      <WhyApex />
      <ProcessPreview />
      <Technology />
      <ClosingCta />
    </>
  );
}
