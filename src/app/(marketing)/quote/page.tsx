import { InquiryForm } from "@/components/forms/inquiry-form";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Request a Project Quote",
  description:
    "Request a custom quote from Apex Technology for website development, e-commerce, web applications, or business systems in the Philippines.",
  path: "/quote",
});

const nextSteps = [
  ["We read the brief", "A person on the team reviews what you sent. This is not an automated quote."],
  ["We reply with questions", "If the scope is clear, we propose an approach. If it is not, we ask before guessing."],
  ["You get a written range", "Custom software is quoted from the work, not from a published package price."],
];

export default function QuotePage() {
  return (
    <Container className="section grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow">Quotation</p>
        <h1 className="h1 mt-3">Get a quote for the work, not a guess.</h1>
        <ol className="mt-8 space-y-6">
          {nextSteps.map(([title, detail], index) => (
            <li key={title}>
              <p className="text-sm font-semibold text-[var(--brand-accent)]">0{index + 1}</p>
              <h2 className="mt-1 font-semibold">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="lg:col-span-8">
        <InquiryForm intent="quote" />
      </div>
    </Container>
  );
}
