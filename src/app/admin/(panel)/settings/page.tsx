import { saveSetting } from "@/lib/admin/actions";
import { siteConfig } from "@/lib/config/site";
import { createClient } from "@/lib/supabase/server";

const fields = [
  ["email", "Public email", siteConfig.email],
  ["phone", "Public phone", siteConfig.phone],
  ["location", "Location", siteConfig.location],
  ["metadata_description", "Default meta description", siteConfig.description],
] as const;

export default async function SettingsPage() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase.from("site_settings").select("key, value");
  const current = new Map((data ?? []).map((row) => [row.key, typeof row.value === "string" ? row.value : ""]));

  return (
    <main>
      <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
        Leave the phone blank until a real public number is confirmed. Social links can be added
        in the database as a <code>social</code> setting: an array of {"{ label, href }"} objects.
      </p>
      <div className="mt-8 grid max-w-xl gap-4">
        {fields.map(([key, label, fallback]) => (
          <form key={key} action={saveSetting} className="rounded-2xl border border-[var(--border-color)] bg-white p-4">
            <input type="hidden" name="key" value={key} />
            <label className="block text-sm font-medium">
              {label}
              <input
                name="value"
                defaultValue={current.get(key) || fallback}
                className="mt-1 w-full rounded-lg border border-[var(--border-color)] px-3 py-2"
              />
            </label>
            <button type="submit" className="mt-3 text-sm font-semibold text-[var(--brand-secondary)]">
              Save
            </button>
          </form>
        ))}
      </div>
    </main>
  );
}
