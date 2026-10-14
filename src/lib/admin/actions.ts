"use server";

import { revalidatePath } from "next/cache";

import { inquiryStatusSchema } from "@/lib/validation/inquiry";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in required.");
  const { data } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!data) throw new Error("This account is not an administrator.");
  return supabase;
}

export async function signOut() {
  const supabase = await createClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function saveProject(formData: FormData) {
  const supabase = await requireAdmin();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");
  const title = String(formData.get("title") ?? "").trim();
  const clientName = String(formData.get("client_name") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!slug || !title || !clientName || summary.length < 10 || description.length < 10) {
    throw new Error("Slug, title, client, summary, and description are required.");
  }

  const lines = (name: string) =>
    String(formData.get(name) ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

  const gallery = lines("gallery").map((src) => ({
    src,
    alt: title,
    kind: "interface" as const,
  }));
  const cover = String(formData.get("cover_image") ?? "").trim() || gallery[0]?.src || "";
  if (!cover) throw new Error("Add a cover image path or URL.");

  const record = {
    slug,
    title,
    client_name: clientName,
    industry: String(formData.get("industry") ?? "").trim() || "Other",
    category: String(formData.get("category") ?? "").trim() || "Corporate Website",
    summary,
    description,
    requirements: lines("requirements"),
    features: lines("features"),
    deliverables: lines("deliverables"),
    cover_image: cover,
    cover_alt: String(formData.get("cover_alt") ?? title),
    gallery,
    website_url: String(formData.get("website_url") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    homepage_order: Number(formData.get("homepage_order") || 0) || null,
    presentation: String(formData.get("presentation") ?? "browser"),
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("projects").upsert(record, { onConflict: "slug" });
  if (error) throw new Error(error.message);
  revalidatePath("/work");
  revalidatePath("/");
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  const { error } = await supabase.from("projects").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidatePath("/work");
}

export async function saveService(formData: FormData) {
  const supabase = await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  const { error } = await supabase
    .from("services")
    .upsert(
      {
        slug,
        title: String(formData.get("title") ?? ""),
        summary: String(formData.get("summary") ?? ""),
        description: String(formData.get("description") ?? ""),
        display_order: Number(formData.get("display_order") ?? 0),
        published: formData.get("published") === "on",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    );
  if (error) throw new Error(error.message);
  revalidatePath("/services");
}

export async function updateInquiryStatus(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = inquiryStatusSchema.parse(String(formData.get("status") ?? ""));
  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/inquiries");
}

export async function saveSetting(formData: FormData) {
  const supabase = await requireAdmin();
  const key = String(formData.get("key") ?? "");
  const raw = String(formData.get("value") ?? "");
  if (!["email", "phone", "location", "metadata_description"].includes(key)) {
    throw new Error("Unknown setting.");
  }
  const { error } = await supabase.from("site_settings").upsert({
    key,
    value: raw,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidatePath("/");
}

export async function uploadProjectImage(formData: FormData) {
  const supabase = await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) throw new Error("Choose an image file.");
  if (!file.type.startsWith("image/")) throw new Error("Only image files can be uploaded.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Images must be under 8 MB.");
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "");
  const path = `${Date.now()}-${safeName || "image"}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from("project-media").upload(path, bytes, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("project-media").getPublicUrl(path);
  return data.publicUrl;
}
