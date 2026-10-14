import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { processSteps } from "@/data/process";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Our Development Process",
  description:
    "See how Apex Technology delivers software projects—from discovery and planning through design, development, testing, launch, and support.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <article>
      <Container className="section">
        <p className="eyebrow">Our process</p>
        <h1 className="h1 mt-3 max-w-3xl">A clear path from the first conversation to a launch you can operate.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
          The sequence stays the same. The depth of each step changes with the product. A landing
          page does not get the same plan as a clinic system.
        </p>
      </Container>
      <Container className="pb-8">
        <ol className="relative border-l border-[var(--border-color)] md:border-l-0">
          {processSteps.map((step) => (
            <li key={step.number} className="grid gap-3 pb-12 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="text-sm font-semibold text-[var(--brand-accent)]">{step.number}</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">{step.title}</h2>
              </div>
              <div className="md:col-span-8 md:border-t md:border-[var(--border-color)] md:pt-4">
                <p className="font-medium">{step.summary}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
      <section className="bg-white">
        <Container className="grid gap-10 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What we ask from you</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              <li>Someone who can describe the operation and approve decisions.</li>
              <li>Existing copy, photos, or records when the product depends on them.</li>
              <li>Access to tools or vendors when an integration is in scope.</li>
              <li>Time to review milestones before the next one starts.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What you receive</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              <li>A written scope for the release we agreed to build.</li>
              <li>Interfaces you can review before they are treated as final.</li>
              <li>A deployed product and the support window in the agreement.</li>
              <li>A short list of what was intentionally left for a later release.</li>
            </ul>
          </div>
        </Container>
      </section>
      <Container className="py-14">
        <Button href="/quote">Plan a project</Button>
      </Container>
    </article>
  );
}
