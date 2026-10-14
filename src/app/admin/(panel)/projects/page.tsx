import { ImageUpload } from "@/components/admin/image-upload";
import { deleteProject, saveProject } from "@/lib/admin/actions";
import { getProjects } from "@/lib/content/repository";

const input = "mt-1 w-full rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm";

export default async function ProjectsAdminPage() {
  const projects = await getProjects();
  return (
    <main>
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
        The public site shows the built-in portfolio until a published database record replaces a
        slug. Saving here upserts that record. Uncheck published to hide a project.
      </p>
      <div className="mt-6 max-w-xl">
        <ImageUpload />
      </div>
      <div className="mt-8 space-y-4">
        <details className="rounded-2xl border border-[var(--border-color)] bg-white p-4" open>
          <summary className="cursor-pointer font-semibold">Add a project</summary>
          <ProjectForm />
        </details>
        {projects.map((project) => (
          <details key={project.slug} className="rounded-2xl border border-[var(--border-color)] bg-white p-4">
            <summary className="cursor-pointer font-semibold">{project.clientName}</summary>
            <ProjectForm
              slug={project.slug}
              title={project.title}
              clientName={project.clientName}
              industry={project.industry}
              category={project.solution}
              summary={project.summary}
              description={project.overview}
              requirements={project.requirements.join("\n")}
              features={project.features.join("\n")}
              deliverables={project.deliverables.join("\n")}
              cover={project.images[0]?.src ?? ""}
              gallery={project.images.map((image) => image.src).join("\n")}
              website={project.websiteUrl ?? ""}
              featured={project.featured}
              published={project.published}
              presentation={project.presentation}
              order={project.homepageOrder ?? ""}
            />
            <form action={deleteProject} className="mt-3">
              <input type="hidden" name="slug" value={project.slug} />
              <button type="submit" className="text-sm text-red-700">
                Delete database record
              </button>
            </form>
          </details>
        ))}
      </div>
    </main>
  );
}

function ProjectForm(props: {
  slug?: string;
  title?: string;
  clientName?: string;
  industry?: string;
  category?: string;
  summary?: string;
  description?: string;
  requirements?: string;
  features?: string;
  deliverables?: string;
  cover?: string;
  gallery?: string;
  website?: string;
  featured?: boolean;
  published?: boolean;
  presentation?: string;
  order?: number | "";
}) {
  return (
    <form action={saveProject} className="mt-4 grid gap-3">
      <label className="text-sm">Slug<input name="slug" defaultValue={props.slug} className={input} required /></label>
      <label className="text-sm">Title<input name="title" defaultValue={props.title} className={input} required /></label>
      <label className="text-sm">Client<input name="client_name" defaultValue={props.clientName} className={input} required /></label>
      <label className="text-sm">Industry<input name="industry" defaultValue={props.industry} className={input} /></label>
      <label className="text-sm">Solution type<input name="category" defaultValue={props.category} className={input} /></label>
      <label className="text-sm">Summary<textarea name="summary" defaultValue={props.summary} className={input} rows={3} /></label>
      <label className="text-sm">Description<textarea name="description" defaultValue={props.description} className={input} rows={4} /></label>
      <label className="text-sm">Requirements, one per line<textarea name="requirements" defaultValue={props.requirements} className={input} rows={3} /></label>
      <label className="text-sm">Features, one per line<textarea name="features" defaultValue={props.features} className={input} rows={3} /></label>
      <label className="text-sm">Deliverables, one per line<textarea name="deliverables" defaultValue={props.deliverables} className={input} rows={3} /></label>
      <label className="text-sm">Cover image<input name="cover_image" defaultValue={props.cover} className={input} /></label>
      <label className="text-sm">Gallery URLs, one per line<textarea name="gallery" defaultValue={props.gallery} className={input} rows={3} /></label>
      <label className="text-sm">Website URL<input name="website_url" defaultValue={props.website} className={input} /></label>
      <label className="text-sm">Homepage order<input name="homepage_order" defaultValue={props.order} className={input} /></label>
      <label className="text-sm">Presentation
        <select name="presentation" defaultValue={props.presentation ?? "browser"} className={input}>
          <option value="browser">browser</option>
          <option value="phone">phone</option>
          <option value="dashboard">dashboard</option>
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" defaultChecked={props.featured} /> Featured</label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={props.published ?? true} /> Published</label>
      <button type="submit" className="w-fit rounded-lg bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white">Save</button>
    </form>
  );
}
