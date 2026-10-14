import { updateInquiryStatus } from "@/lib/admin/actions";
import { inquiryStatuses } from "@/lib/config/site";
import { createClient } from "@/lib/supabase/server";
import type { InquiryRecord } from "@/types/content";

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;
  const supabase = await createClient();
  if (!supabase) return null;
  let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  const inquiries = ((data ?? []) as InquiryRecord[]).filter((item) => {
    const needle = q.toLowerCase();
    if (!needle) return true;
    return (
      item.full_name.toLowerCase().includes(needle) ||
      item.email.toLowerCase().includes(needle) ||
      (item.company ?? "").toLowerCase().includes(needle)
    );
  });

  return (
    <main>
      <h1 className="text-3xl font-semibold tracking-tight">Inquiries</h1>
      <form className="mt-6 flex flex-wrap gap-3" method="get">
        <input name="q" defaultValue={q} placeholder="Search name, email, company" className="rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm" />
        <select name="status" defaultValue={status} className="rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {inquiryStatuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <button className="rounded-lg bg-[var(--brand-primary)] px-3 py-2 text-sm font-semibold text-white" type="submit">
          Filter
        </button>
      </form>
      {error ? <p className="mt-4 text-sm text-red-700">Inquiries could not be loaded.</p> : null}
      <div className="mt-6 space-y-4">
        {inquiries.length === 0 ? <p className="text-sm text-[var(--text-secondary)]">No inquiries yet.</p> : null}
        {inquiries.map((item) => (
          <article key={item.id} className="rounded-2xl border border-[var(--border-color)] bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold">{item.full_name}</h2>
              <p className="text-xs text-[var(--text-secondary)]">{new Date(item.created_at).toLocaleString()}</p>
            </div>
            <p className="mt-1 text-sm">{item.email}{item.phone ? ` · ${item.phone}` : ""}{item.company ? ` · ${item.company}` : ""}</p>
            <p className="mt-2 text-sm font-medium">{item.service} · {item.estimated_budget}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.project_description}</p>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">Prefers {item.preferred_contact_method}</p>
            <form action={updateInquiryStatus} className="mt-4 flex items-center gap-2">
              <input type="hidden" name="id" value={item.id} />
              <label className="text-sm">
                Status
                <select name="status" defaultValue={item.status} className="ml-2 rounded-lg border border-[var(--border-color)] px-2 py-1">
                  {inquiryStatuses.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="text-sm font-semibold text-[var(--brand-secondary)]">Update</button>
            </form>
          </article>
        ))}
      </div>
    </main>
  );
}
