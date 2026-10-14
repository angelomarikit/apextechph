import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProject, getProjects } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graphSchema } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project" };
  const cover = project.images[0];
  return pageMetadata({
    title: `${project.clientName} Case Study`,
    description: `${project.summary} ${project.industry} · ${project.solution} by Apex Technology.`,
    path: `/work/${project.slug}`,
    ogImage: cover ? { url: cover.src, alt: cover.alt } : undefined,
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const cover = project.images[0];

  const structuredData = graphSchema(
    {
      "@type": "WebPage",
      name: project.clientName,
      description: project.summary,
      url: absoluteUrl(`/work/${project.slug}`),
      about: { "@type": "Thing", name: project.solution },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Our Work", path: "/work" },
      { name: project.clientName, path: `/work/${project.slug}` },
    ]),
  );

  return (
    <article>
      <JsonLd data={structuredData} />
      <Container className="py-14 lg:py-20">
        <p className="eyebrow">{project.solution}</p>
        <h1 className="h1 mt-3 max-w-4xl">{project.clientName}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{project.summary}</p>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
          <div>
            <dt className="text-[var(--text-secondary)]">Industry</dt>
            <dd className="font-semibold">{project.industry}</dd>
          </div>
          <div>
            <dt className="text-[var(--text-secondary)]">Solution</dt>
            <dd className="font-semibold">{project.solution}</dd>
          </div>
          {project.websiteUrl ? (
            <div>
              <dt className="text-[var(--text-secondary)]">Live site</dt>
              <dd>
                <a href={project.websiteUrl} className="font-semibold text-[var(--brand-secondary)]" rel="noreferrer">
                  Visit website
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </Container>
      {cover ? (
        <Container className="pb-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[#e8eef6]">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-contain object-top"
            />
          </div>
        </Container>
      ) : null}
      <Container className="grid gap-12 py-12 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{project.overview}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">What the work needed</h2>
            <ul className="mt-3 space-y-2">
              {project.requirements.map((item) => (
                <li key={item} className="text-sm leading-6 text-[var(--text-secondary)]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">What was implemented</h2>
            <ul className="mt-3 space-y-2">
              {project.features.map((item) => (
                <li key={item} className="border-l-2 border-[var(--brand-accent)] pl-4 text-sm leading-6">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="h-fit rounded-2xl border border-[var(--border-color)] bg-white p-6 lg:col-span-4 lg:col-start-9">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand-secondary)]">
            Delivered
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {project.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-5 text-[var(--text-secondary)]">
            Technical notes are limited to what the delivered interface shows. We do not assign a
            stack to a project unless that stack is confirmed.
          </p>
        </aside>
      </Container>
      {project.images.length > 1 ? (
        <section className="bg-white">
          <Container className="py-16">
            <h2 className="text-2xl font-semibold tracking-tight">Interface gallery</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {project.images.slice(1).map((image) => (
                <figure key={image.src} className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[#e8eef6]">
                  <div className="relative aspect-[16/10]">
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover object-top" />
                  </div>
                  <figcaption className="px-4 py-3 text-xs text-[var(--text-secondary)]">{image.alt}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      <Container className="flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        {next ? (
          <Link href={`/work/${next.slug}`} className="text-sm font-semibold text-[var(--brand-secondary)]">
            Next project: {next.clientName}
          </Link>
        ) : <span />}
        <Button href="/quote">Start your project</Button>
      </Container>
    </article>
  );
}
