import Link from "next/link";
import { redirect } from "next/navigation";

import { signOut } from "@/lib/admin/actions";
import { isSupabaseConfigured } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";

const links = [
  ["/admin", "Overview"],
  ["/admin/projects", "Projects"],
  ["/admin/services", "Services"],
  ["/admin/inquiries", "Inquiries"],
  ["/admin/settings", "Settings"],
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Admin is waiting on Supabase</h1>
        <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
          Add the URL and anon key from <code>.env.example</code>, apply{" "}
          <code>supabase/migrations/001_initial.sql</code>, create a user in Supabase
          Authentication, and insert that user id into <code>admin_users</code>. The public site
          keeps running from the local portfolio until then.
        </p>
      </main>
    );
  }

  const supabase = await createClient();
  if (!supabase) redirect("/admin/login");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) {
    return (
      <main className="mx-auto max-w-xl px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">This account is not an administrator</h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Signed in as {user.email}. Ask an owner to add this user id to admin_users.
        </p>
        <form action={signOut} className="mt-6">
          <button className="text-sm font-semibold text-[var(--brand-secondary)]" type="submit">
            Sign out
          </button>
        </form>
      </main>
    );
  }

  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[220px_1fr]">
      <aside className="border-b border-[var(--border-color)] bg-white p-5 lg:border-b-0 lg:border-r">
        <p className="text-sm font-semibold">Apex admin</p>
        <nav className="mt-4 flex gap-3 overflow-auto lg:flex-col" aria-label="Admin">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              {label}
            </Link>
          ))}
        </nav>
        <form action={signOut} className="mt-6">
          <button type="submit" className="text-sm font-semibold text-[var(--brand-secondary)]">
            Sign out
          </button>
        </form>
      </aside>
      <div className="p-6 lg:p-10">{children}</div>
    </div>
  );
}
