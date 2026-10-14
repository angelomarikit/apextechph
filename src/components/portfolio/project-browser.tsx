"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ProjectMedia } from "@/components/portfolio/project-media";
import type { Project } from "@/types/content";

export function ProjectBrowser({
  projects,
  industries,
  solutions,
}: {
  projects: Project[];
  industries: string[];
  solutions: string[];
}) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All");
  const [solution, setSolution] = useState("All");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery =
        needle.length === 0 ||
        project.clientName.toLowerCase().includes(needle) ||
        project.title.toLowerCase().includes(needle);
      const matchesIndustry = industry === "All" || project.industry === industry;
      const matchesSolution = solution === "All" || project.solution === solution;
      return matchesQuery && matchesIndustry && matchesSolution;
    });
  }, [projects, query, industry, solution]);

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-[var(--border-color)] bg-white p-4 md:grid-cols-[1fr_auto_auto]">
        <label className="text-sm font-medium">
          Search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Client or project name"
            className="mt-1.5 w-full rounded-lg border border-[var(--border-color)] px-3 py-2.5 text-sm"
          />
        </label>
        <label className="text-sm font-medium">
          Industry
          <select
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[var(--border-color)] px-3 py-2.5 text-sm md:min-w-48"
          >
            <option>All</option>
            {industries.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Solution
          <select
            value={solution}
            onChange={(event) => setSolution(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[var(--border-color)] px-3 py-2.5 text-sm md:min-w-52"
          >
            <option>All</option>
            {solutions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-4 text-sm text-[var(--text-secondary)]" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      {visible.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[var(--border-color)] bg-white px-6 py-16 text-center">
          <p className="text-lg font-semibold">No projects match that filter.</p>
          <button
            type="button"
            className="mt-3 text-sm font-semibold text-[var(--brand-secondary)]"
            onClick={() => {
              setQuery("");
              setIndustry("All");
              setSolution("All");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {visible.map((project) => (
            <article key={project.slug}>
              <Link href={`/work/${project.slug}`} className="group block">
                <ProjectMedia project={project} sizes="(min-width: 768px) 45vw, 100vw" />
                <h2 className="mt-4 text-2xl font-semibold tracking-tight">{project.clientName}</h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {project.industry} · {project.solution}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{project.summary}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
