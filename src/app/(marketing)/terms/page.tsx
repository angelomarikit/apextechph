import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms for using the Apex Technology website and submitting project inquiries.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="prose-measure py-16 lg:py-24">
      <p className="eyebrow">Legal</p>
      <h1 className="h1 mt-3">Terms of Service</h1>
      <div className="mt-8 space-y-6 text-sm leading-7 text-[var(--text-secondary)]">
        <p>
          These terms cover use of the Apex Technology website. A paid project is governed by the
          proposal or agreement for that work, which controls if it differs from this page.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">The website</h2>
        <p>
          Content is provided so you can understand our services and send an inquiry. Portfolio
          pages describe work based on the interfaces delivered. They are not a promise that a new
          project will look the same or produce a particular business result.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Inquiries</h2>
        <p>
          Sending a form does not create a contract and does not reserve a start date. We reply
          when we can give the inquiry proper attention. Do not include passwords, payment card
          numbers, or other sensitive secrets in the project description.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Pricing</h2>
        <p>
          This website does not publish a binding price list. Quotations are prepared from the
          agreed scope. Historical package prices, if mentioned in older materials, are not current
          offers unless a proposal says so.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Acceptable use</h2>
        <p>
          Do not misuse the forms, attempt to access the admin area without authorization, or
          interfere with the site. We may ignore or discard submissions that look automated or abusive.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Liability</h2>
        <p>
          The site is provided as available. We are not liable for decisions you make solely from
          marketing pages. Project liability, if any, is defined in the contract for that project.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Law</h2>
        <p>
          These terms are governed by the laws of the Republic of the Philippines. Questions can be
          sent to {siteConfig.email}.
        </p>
      </div>
    </Container>
  );
}
