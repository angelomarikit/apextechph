import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ProjectMedia } from "@/components/portfolio/project-media";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProjects, getService, getServices } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graphSchema } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service" };
  return pageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  const projects = await getProjects();
  const related = service.relatedProjects
    .map((projectSlug) => projects.find((project) => project.slug === projectSlug))
    .filter((project) => project !== undefined);

  const schema = graphSchema(
    {
      "@type": "Service",
      name: service.title,
      description: service.summary,
      provider: { "@type": "Organization", name: "Apex Technology", url: absoluteUrl("/") },
      url: absoluteUrl(`/services/${service.slug}`),
      areaServed: "Philippines",
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.title, path: `/services/${service.slug}` },
    ]),
  );

  return (
    <article>
      <JsonLd data={schema} />
      <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="eyebrow">Service</p>
          <h1 className="h1 mt-3">{service.title}</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{service.description}</p>
        </div>
        <aside className="rounded-2xl bg-[var(--brand-primary)] p-6 text-white lg:col-span-5 lg:self-end">
          <p className="text-sm leading-6 text-white/80">{service.problem}</p>
          <Button href="/quote" variant="light" className="mt-6">
            Discuss this service
          </Button>
        </aside>
      </Container>
      <section className="bg-white">
        <Container className="grid gap-12 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What this engagement can include</h2>
            <ul className="mt-6 space-y-3">
              {service.offerings.map((item) => (
                <li key={item} className="border-l-2 border-[var(--brand-accent)] pl-4 text-sm leading-6">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What changes for the business</h2>
            <ul className="mt-6 space-y-3">
              {service.benefits.map((item) => (
                <li key={item} className="rounded-xl bg-[var(--background-primary)] px-4 py-3 text-sm leading-6">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Our approach</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {service.approach.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-[var(--border-color)] bg-white p-5">
              <p className="text-sm font-semibold text-[var(--brand-accent)]">0{index + 1}</p>
              <h3 className="mt-3 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
      {related.length > 0 ? (
        <section className="bg-white">
          <Container className="py-16">
            <h2 className="text-2xl font-semibold tracking-tight">Related work</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.slice(0, 2).map((project) => (
                <Link key={project.slug} href={`/work/${project.slug}`} className="block">
                  <ProjectMedia project={project} sizes="(min-width: 768px) 45vw, 100vw" />
                  <h3 className="mt-3 text-lg font-semibold">{project.clientName}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{project.solution}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Questions we hear</h2>
        <div className="mt-6 divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
          {service.faqs.map((faq) => (
            <details key={faq.question} className="group py-4">
              <summary className="cursor-pointer text-base font-semibold tracking-tight">
                {faq.question}
              </summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">{faq.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/contact">Talk with the team</Button>
        </div>
      </Container>
    </article>
  );
}
