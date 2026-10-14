import { saveService } from "@/lib/admin/actions";
import { getServices } from "@/lib/content/repository";

const input = "mt-1 w-full rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm";

export default async function ServicesAdminPage() {
  const services = await getServices();
  return (
    <main>
      <h1 className="text-3xl font-semibold tracking-tight">Services</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
        Saving updates the public title, summary, description, order, and visibility for a service
        that already exists in the site. Offerings and FAQs stay in the codebase.
      </p>
      <div className="mt-8 space-y-4">
        {services.map((service) => (
          <details key={service.slug} className="rounded-2xl border border-[var(--border-color)] bg-white p-4">
            <summary className="cursor-pointer font-semibold">{service.title}</summary>
            <form action={saveService} className="mt-4 grid gap-3">
              <input type="hidden" name="slug" value={service.slug} />
              <label className="text-sm">Title<input name="title" defaultValue={service.title} className={input} /></label>
              <label className="text-sm">Summary<textarea name="summary" defaultValue={service.summary} className={input} rows={3} /></label>
              <label className="text-sm">Description<textarea name="description" defaultValue={service.description} className={input} rows={4} /></label>
              <label className="text-sm">Display order<input name="display_order" type="number" defaultValue={service.displayOrder} className={input} /></label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="published" defaultChecked={service.published} /> Published
              </label>
              <button type="submit" className="w-fit rounded-lg bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white">
                Save
              </button>
            </form>
          </details>
        ))}
      </div>
    </main>
  );
}
