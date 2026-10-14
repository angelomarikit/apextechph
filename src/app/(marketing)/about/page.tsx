import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getFeaturedProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about Apex Technology (APEXTECHPH)—a Philippines-based team building websites, applications, and business systems with a practical, business-first approach.",
  path: "/about",
});

const differences = [
  ["Business first", "We ask what the operation needs before we recommend a product type."],
  ["Scope you can read", "Features, milestones, and support are written down. Surprises are treated as decisions."],
  ["Interfaces with a job", "A page or screen has to help someone finish a task, not only fill a layout."],
  ["A path after launch", "The first release is built so the next one has somewhere to attach."],
];

export default function AboutPage() {
  const selected = getFeaturedProjects().slice(0, 3);
  return (
    <article>
      <Container className="section grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">About</p>
          <h1 className="h1 mt-3">Technology Expertise. Business-First Thinking.</h1>
        </div>
        <p className="text-lg leading-8 text-[var(--text-secondary)] lg:col-span-5 lg:pt-16">
          Apex Technology builds practical digital solutions for businesses that need reliable
          technology, modern interfaces, and systems designed around real operations.
        </p>
      </Container>
      <section className="bg-white">
        <Container className="grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-semibold tracking-tight">What we build</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              The work spans websites, software applications, business automation, digital
              commerce, management platforms, and custom integrations. A project uses the pieces
              it needs. We do not dress a brochure site up as a platform, or force a platform onto
              a business that needed a clear website.
            </p>
          </div>
          <blockquote className="border-l-2 border-[var(--brand-accent)] pl-6 text-2xl font-medium leading-snug tracking-tight text-[var(--brand-primary)] lg:col-span-7">
            We believe great software should do more than look impressive. It should make business
            operations easier, improve customer experiences and support long-term growth.
          </blockquote>
        </Container>
      </section>
      <Container className="grid gap-6 py-16 md:grid-cols-2">
        <section className="rounded-2xl bg-[var(--brand-primary)] p-8 text-white">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-bright)]">Mission</h2>
          <p className="mt-4 text-lg leading-8">
            Help businesses ship digital products that their customers can use and their teams can
            operate.
          </p>
        </section>
        <section className="rounded-2xl border border-[var(--border-color)] bg-white p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-secondary)]">Vision</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            Be the technology partner a growing company keeps — from the first public website to
            the system that runs the work behind it.
          </p>
        </section>
      </Container>
      <section className="bg-white">
        <Container className="py-16">
          <h2 className="text-3xl font-semibold tracking-tight">What makes the work different</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {differences.map(([title, detail]) => (
              <div key={title} className="border-t border-[var(--border-color)] pt-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Container className="py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight">Selected work</h2>
          <Link href="/work" className="text-sm font-semibold text-[var(--brand-secondary)]">
            All projects
          </Link>
        </div>
        <ul className="mt-8 divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
          {selected.map((project) => (
            <li key={project.slug}>
              <Link href={`/work/${project.slug}`} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="text-lg font-semibold">{project.clientName}</span>
                <span className="text-sm text-[var(--text-secondary)]">{project.industry} · {project.solution}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href="/contact">Start a conversation</Button>
        </div>
      </Container>
    </article>
  );
}
