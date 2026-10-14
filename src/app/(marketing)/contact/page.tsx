import { InquiryForm } from "@/components/forms/inquiry-form";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config/site";
import { getPublicSettings } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Apex Technology in the Philippines about a website, web app, e-commerce store, or custom business system. Share your project and preferred way to reach you.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getPublicSettings({
    email: siteConfig.email,
    phone: siteConfig.phone,
    location: siteConfig.location,
    description: siteConfig.description,
    social: [...siteConfig.social],
  });

  return (
    <Container className="section grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow">Contact</p>
        <h1 className="h1 mt-3">Tell us what you are building.</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
          Share the outline. We will reply with the right next step, whether that is a short call
          or a written scope.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="text-[var(--text-secondary)]">Email</dt>
            <dd>
              <a className="font-semibold" href={`mailto:${settings.email}`}>{settings.email}</a>
            </dd>
          </div>
          {settings.phone ? (
            <div>
              <dt className="text-[var(--text-secondary)]">Phone</dt>
              <dd>
                <a className="font-semibold" href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                  {settings.phone}
                </a>
              </dd>
            </div>
          ) : null}
          <div>
            <dt className="text-[var(--text-secondary)]">Based in</dt>
            <dd className="font-semibold">{settings.location}</dd>
          </div>
        </dl>
      </div>
      <div className="lg:col-span-8">
        <InquiryForm intent="contact" />
      </div>
    </Container>
  );
}
