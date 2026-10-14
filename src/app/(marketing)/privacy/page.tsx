import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Apex Technology collects, uses, and stores information submitted through the APEXTECHPH website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="prose-measure py-16 lg:py-24">
      <p className="eyebrow">Legal</p>
      <h1 className="h1 mt-3">Privacy Policy</h1>
      <p className="mt-4 text-sm text-[var(--text-secondary)]">Last updated {new Date().getFullYear()}.</p>
      <div className="mt-8 space-y-6 text-sm leading-7 text-[var(--text-secondary)]">
        <p>
          Apex Technology, based in the Philippines, operates this website. This policy explains
          what we collect when you browse the site or send an inquiry.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Information you send us</h2>
        <p>
          The contact and quote forms ask for your name, email, phone number, company, the service
          you are interested in, a budget category, a project description, your preferred contact
          method, and your consent to store the inquiry. We use that information to reply and to
          keep a record of the conversation.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">How it is stored</h2>
        <p>
          When the inquiry database is connected, submissions are stored in our project database
          with access limited to authorized administrators. We do not sell inquiry records. We do
          not collect card numbers on this website.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Cookies</h2>
        <p>
          The public site does not require an account. If you sign in to the private admin area,
          the authentication provider sets cookies needed to keep that session.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">How long we keep inquiries</h2>
        <p>
          We keep inquiry records for as long as they are useful to the conversation and our
          ordinary business records, then delete or anonymize them. You can ask us to update or
          delete your inquiry by emailing {siteConfig.email}.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Contact</h2>
        <p>
          Questions about this policy can be sent to {siteConfig.email}.
        </p>
      </div>
    </Container>
  );
}
