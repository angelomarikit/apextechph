"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createBrowserSupabase } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    const form = new FormData(event.currentTarget);
    setPending(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });
    setPending(false);
    if (signInError) {
      setError("Those credentials were not accepted.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <p className="eyebrow">Apex Technology</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Admin sign in</h1>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Administrator accounts are created manually. There is no public registration.
      </p>
      {!configured ? (
        <p className="mt-6 rounded-xl border border-[var(--border-color)] bg-white p-4 text-sm">
          Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY before this sign-in can
          connect.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-[var(--border-color)] bg-white p-6">
          <label className="block text-sm font-medium">
            Email
            <input name="email" type="email" required autoComplete="username" className="mt-1 w-full rounded-lg border border-[var(--border-color)] px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input name="password" type="password" required autoComplete="current-password" className="mt-1 w-full rounded-lg border border-[var(--border-color)] px-3 py-2" />
          </label>
          {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
          <Button type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</Button>
        </form>
      )}
    </main>
  );
}
