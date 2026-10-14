import { getProjects } from "@/lib/content/repository";
import { createClient } from "@/lib/supabase/server";

export default async function AdminHome() {
  const projects = await getProjects();
  const supabase = await createClient();
  if (!supabase) {
    return null;
  }
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("id, status, created_at")
    .order("created_at", { ascending: false });

  const rows = inquiries ?? [];
  const counts = rows.reduce<Record<string, number>>((map, row) => {
    map[row.status] = (map[row.status] ?? 0) + 1;
    return map;
  }, {});

  return (
    <main>
      <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-[var(--border-color)] bg-white p-5">
          <p className="text-sm text-[var(--text-secondary)]">Projects on the site</p>
          <p className="mt-2 text-3xl font-semibold">{projects.length}</p>
        </article>
        <article className="rounded-2xl border border-[var(--border-color)] bg-white p-5">
          <p className="text-sm text-[var(--text-secondary)]">Featured</p>
          <p className="mt-2 text-3xl font-semibold">{projects.filter((project) => project.featured).length}</p>
        </article>
        <article className="rounded-2xl border border-[var(--border-color)] bg-white p-5">
          <p className="text-sm text-[var(--text-secondary)]">Inquiries</p>
          <p className="mt-2 text-3xl font-semibold">{rows.length}</p>
        </article>
      </div>
      <h2 className="mt-10 text-lg font-semibold">Inquiry status</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"].map((status) => (
          <li key={status} className="rounded-xl bg-white px-4 py-3 text-sm">
            {status}: {counts[status] ?? 0}
          </li>
        ))}
      </ul>
    </main>
  );
}
