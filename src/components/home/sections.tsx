import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";
import { HeroBanner } from "@/components/home/hero-banner";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/reveal";
import { ProjectMedia } from "@/components/portfolio/project-media";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { processSteps } from "@/data/process";
import type { Project, Service } from "@/types/content";

const facts = [
  ["Philippines-based", "Local clients and international teams."],
  ["Cross-industry", "Clinics, travel, commerce, and operations."],
  ["Web & systems", "Sites, stores, and internal tools."],
  ["Idea to launch", "Discovery through agreed support."],
];

export function Hero(_props: { projects: Project[] }) {
  return (
    <section className="section relative overflow-hidden border-b border-[var(--border-color)]">
      <div
        className="pointer-events-none absolute -right-32 top-8 h-72 w-72 rounded-full bg-[var(--brand-secondary)]/10 blur-3xl animate-shimmer-edge"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div>
              <p className="eyebrow">Software development · Philippines</p>
              <h1 className="display mt-2 text-[var(--brand-primary)]">
                Technology Built for What&apos;s Next.
              </h1>
              <p className="prose-measure mt-4 text-base leading-7 text-[var(--text-secondary)]">
                We design and develop websites, applications, and custom business systems that help
                ambitious businesses grow.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/quote">Start Your Project</Button>
                <Button href="/work" variant="secondary">
                  Explore Our Work
                </Button>
              </div>
              <p className="mt-5 text-sm text-[var(--text-secondary)]">
                Your technology partner — from idea to launch.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12} y={28}>
            <div className="relative animate-float-soft">
              <div
                className="pointer-events-none absolute -inset-3 rounded-2xl bg-gradient-to-br from-[var(--brand-secondary)]/20 via-transparent to-sky-300/20 blur-2xl"
                aria-hidden
              />
              <HeroBanner className="relative group" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section className="section-muted border-b border-[var(--border-color)] py-6 md:py-7">
      <Container>
        <RevealStagger>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {facts.map(([title, detail]) => (
              <RevealItem key={title} as="li">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
                <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{detail}</p>
              </RevealItem>
            ))}
          </ul>
        </RevealStagger>
      </Container>
    </section>
  );
}

export function ServicesOverview({ services }: { services: Service[] }) {
  return (
    <section className="section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Everything you need to build, launch, and grow."
            description="Websites, stores, applications, and systems scoped around how your business actually runs."
          />
        </Reveal>
        <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <RevealItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-lg border border-[var(--border-color)] bg-white p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <span className="text-xs font-semibold text-[var(--brand-secondary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
                  {service.summary}
                </p>
                <span className="mt-3 text-sm font-medium text-[var(--brand-secondary)] group-hover:underline">
                  Learn more
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const featured = [...projects]
    .filter((p) => p.featured)
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99))
    .slice(0, 6);

  return (
    <section className="section section-muted">
      <Container>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Real projects. Real business solutions."
            description="Interfaces and platforms we have delivered for clients across different industries."
            className="mb-0"
          />
          <Button href="/work" variant="secondary" className="shrink-0">
            View portfolio
          </Button>
        </Reveal>
        <RevealStagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <RevealItem key={project.slug}>
              <Link href={`/work/${project.slug}`} className="group block">
                <ProjectMedia
                  project={project}
                  interactive
                  sizes="(min-width: 1024px) 360px, 100vw"
                />
                <h3 className="mt-3 text-base font-semibold tracking-tight group-hover:text-[var(--brand-secondary)]">
                  {project.clientName}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {project.industry} · {project.solution}
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}

const reasons = [
  ["Aligned with the business", "We start from operations and customers, then choose the right product."],
  ["Clear working rhythm", "Scope, milestones, and reviews are documented."],
  ["Right-sized builds", "A website stays a website until a system is truly needed."],
  ["Usable interfaces", "Screens are built for the device and the task."],
  ["Room to grow", "Architecture leaves space for the next release."],
  ["Support after launch", "We stay available for the support window in your agreement."],
];

export function WhyApex() {
  return (
    <section className="section">
      <Container>
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <Reveal className="lg:col-span-2">
            <SectionHeading
              eyebrow="Why Apex"
              title="More than developers. Your technology partner."
              description="Software should make operations easier and still make sense a year from now."
            />
          </Reveal>
          <RevealStagger className="grid gap-3 sm:grid-cols-2 lg:col-span-3">
            {reasons.map(([title, detail]) => (
              <RevealItem key={title}>
                <div className="h-full rounded-lg border border-[var(--border-color)] bg-white p-4 transition-shadow duration-300 hover:shadow-md">
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </Container>
    </section>
  );
}

export function ProcessPreview() {
  return (
    <section className="section bg-[var(--brand-primary)] text-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="From first conversation to final launch."
            description="The same sequence for every engagement. The depth changes with the product."
            className="[&_.eyebrow]:text-[var(--brand-bright)] [&_h2]:text-white [&_p]:text-white/75"
          />
        </Reveal>
        <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <RevealItem key={step.number}>
              <div className="h-full rounded-lg border border-white/10 bg-white/5 p-4 transition-[background-color,border-color] duration-300 hover:border-white/20 hover:bg-white/10">
                <p className="text-xs font-semibold text-[var(--brand-bright)]">{step.number}</p>
                <h3 className="mt-1 text-sm font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-white/70">{step.summary}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
        <Reveal delay={0.1}>
          <Button href="/process" variant="light" className="mt-6">
            See our process
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

const technologies = [
  ["Interfaces", ["React", "TypeScript", "Next.js", "Tailwind CSS"]],
  ["Platforms", ["Supabase", "Vercel"]],
  ["Integrations", ["REST APIs", "Third-party services", "Auth & data layers"]],
];

export function Technology() {
  return (
    <section className="section section-muted">
      <Container>
        <div className="grid gap-8 lg:grid-cols-3">
          <SectionHeading
            eyebrow="Capabilities"
            title="Modern, proven technologies."
            description="Tools we use in-house. Each client project uses the stack that fits it."
          />
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
            {technologies.map(([group, items]) => (
              <div
                key={String(group)}
                className="rounded-lg border border-[var(--border-color)] bg-white p-4"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-secondary)]">
                  {group}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-[var(--text-secondary)]">
                  {(items as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="section pt-0">
      <Container>
        <Reveal>
        <div className="rounded-xl bg-[var(--ink)] px-6 py-10 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-xl">
            <p className="eyebrow text-[var(--brand-bright)]">Start a project</p>
            <h2 className="h2 mt-2 text-white">Have an idea? Let&apos;s build something great.</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Tell us what you are building. We will help you choose the right approach.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <Button href="/quote" variant="light">
              Get a consultation
            </Button>
            <Button href="/services" variant="inverse">
              View services
            </Button>
          </div>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
