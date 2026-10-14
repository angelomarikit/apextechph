import { services as localServices } from "@/data/services";
import { projects as localProjects } from "@/data/projects";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/public";
import type { Project, ProjectImage, Service } from "@/types/content";

type ProjectRow = {
  slug: string;
  title: string;
  client_name: string;
  industry: string;
  category: string;
  summary: string;
  description: string;
  requirements: string[] | null;
  features: string[] | null;
  deliverables: string[] | null;
  cover_image: string;
  cover_alt: string | null;
  gallery: ProjectImage[] | null;
  website_url: string | null;
  featured: boolean;
  homepage_order: number | null;
  presentation: Project["presentation"] | null;
  published: boolean;
};

type ServiceRow = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  display_order: number;
  published: boolean;
};

function mergeProject(row: ProjectRow, local?: Project): Project {
  const images =
    row.gallery && row.gallery.length > 0
      ? row.gallery
      : local?.images ?? [
          {
            src: row.cover_image,
            alt: row.cover_alt || row.title,
            kind: "interface" as const,
          },
        ];

  return {
    slug: row.slug,
    title: row.title,
    clientName: row.client_name,
    industry: row.industry,
    solution: (row.category as Project["solution"]) || local?.solution || "Corporate Website",
    summary: row.summary,
    overview: row.description,
    requirements: row.requirements?.length ? row.requirements : local?.requirements ?? [],
    features: row.features?.length ? row.features : local?.features ?? [],
    deliverables: row.deliverables?.length ? row.deliverables : local?.deliverables ?? [],
    images,
    websiteUrl: row.website_url,
    featured: row.featured,
    homepageOrder: row.homepage_order,
    presentation: row.presentation ?? local?.presentation ?? "browser",
    published: row.published,
  };
}

export async function getProjects() {
  const map = new Map(localProjects.map((project) => [project.slug, project]));
  if (!isSupabaseConfigured()) return [...map.values()];

  try {
    const supabase = createPublicClient();
    if (!supabase) return [...map.values()];
    const { data, error } = await supabase.from("projects").select("*");
    if (error || !data) return [...map.values()];
    for (const row of data as ProjectRow[]) {
      if (!row.published) {
        map.delete(row.slug);
        continue;
      }
      map.set(row.slug, mergeProject(row, map.get(row.slug)));
    }
  } catch {
    return [...map.values()];
  }

  return [...map.values()].filter((project) => project.published);
}

export async function getProject(slug: string) {
  const all = await getProjects();
  return all.find((project) => project.slug === slug) ?? null;
}

export function sortFeatured(projects: Project[]) {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));
}

function mergeService(row: ServiceRow, local: Service): Service {
  return {
    ...local,
    title: row.title || local.title,
    summary: row.summary || local.summary,
    description: row.description || local.description,
    displayOrder: row.display_order ?? local.displayOrder,
    published: row.published,
  };
}

export async function getServices() {
  const map = new Map(localServices.map((service) => [service.slug, service]));
  if (!isSupabaseConfigured()) {
    return [...map.values()].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  try {
    const supabase = createPublicClient();
    if (!supabase) return [...map.values()];
    const { data, error } = await supabase.from("services").select("*");
    if (error || !data) return [...map.values()].sort((a, b) => a.displayOrder - b.displayOrder);
    for (const row of data as ServiceRow[]) {
      const local = map.get(row.slug);
      if (!local) continue;
      if (!row.published) {
        map.delete(row.slug);
        continue;
      }
      map.set(row.slug, mergeService(row, local));
    }
  } catch {
    return [...map.values()].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  return [...map.values()]
    .filter((service) => service.published)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getService(slug: string) {
  const all = await getServices();
  return all.find((service) => service.slug === slug) ?? null;
}

export type PublicSettings = {
  email: string;
  phone: string;
  location: string;
  description: string;
  social: { label: string; href: string }[];
};

export async function getPublicSettings(fallback: PublicSettings): Promise<PublicSettings> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    const supabase = createPublicClient();
    if (!supabase) return fallback;
    const { data, error } = await supabase.from("site_settings").select("key, value");
    if (error || !data) return fallback;
    const next = { ...fallback, social: [...fallback.social] };
    for (const row of data as { key: string; value: unknown }[]) {
      if (row.key === "email" && typeof row.value === "string" && row.value.includes("@")) {
        next.email = row.value;
      }
      if (row.key === "phone" && typeof row.value === "string") next.phone = row.value;
      if (row.key === "location" && typeof row.value === "string" && row.value.trim()) {
        next.location = row.value;
      }
      if (row.key === "metadata_description" && typeof row.value === "string" && row.value.trim()) {
        next.description = row.value;
      }
      if (row.key === "social" && Array.isArray(row.value)) {
        next.social = row.value.filter(
          (item): item is { label: string; href: string } =>
            Boolean(item) &&
            typeof item === "object" &&
            typeof (item as { label?: string }).label === "string" &&
            typeof (item as { href?: string }).href === "string" &&
            (item as { href: string }).href.startsWith("http"),
        );
      }
    }
    return next;
  } catch {
    return fallback;
  }
}
