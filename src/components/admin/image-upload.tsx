"use client";

import { useState } from "react";

import { uploadProjectImage } from "@/lib/admin/actions";

export function ImageUpload() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setError("");
    try {
      setUrl(await uploadProjectImage(formData));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Upload failed.");
    }
  }

  return (
    <form action={onSubmit} className="rounded-2xl border border-[var(--border-color)] bg-white p-4">
      <p className="text-sm font-semibold">Upload a project image</p>
      <input name="file" type="file" accept="image/*" required className="mt-3 block text-sm" />
      <button type="submit" className="mt-3 rounded-lg bg-[var(--brand-accent)] px-3 py-2 text-sm font-semibold text-white">
        Upload
      </button>
      {url ? <p className="mt-3 break-all text-xs">{url}</p> : null}
      {error ? <p className="mt-2 text-xs text-red-700">{error}</p> : null}
    </form>
  );
}
