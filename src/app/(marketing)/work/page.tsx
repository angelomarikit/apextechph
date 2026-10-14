import { ProjectBrowser } from "@/components/portfolio/project-browser";
import { Container } from "@/components/ui/container";
import { getProjects } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Portfolio & Client Projects",
  description:
    "Explore websites, e-commerce stores, booking platforms, and custom business systems built by Apex Technology for clients across the Philippines.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await getProjects();
  const industries = [...new Set(projects.map((project) => project.industry))].sort();
  const solutions = [...new Set(projects.map((project) => project.solution))].sort();
  return (
    <Container className="section">
      <p className="eyebrow">Portfolio</p>
      <h1 className="h1 mt-3 max-w-3xl">Work shaped around real operations.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
        Each project below is documented from the interface that was delivered. We do not publish
        results we cannot verify.
      </p>
      <div className="mt-12">
        <ProjectBrowser projects={projects} industries={industries} solutions={solutions} />
      </div>
    </Container>
  );
}
