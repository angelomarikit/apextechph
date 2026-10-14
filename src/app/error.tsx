"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-6 py-24">
      <p className="eyebrow">Error</p>
      <h1 className="h2 mt-3">We couldn&apos;t load this page.</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        Refresh to try again. If it keeps happening, use the contact page and tell us what you were opening.
      </p>
      <Button type="button" onClick={() => reset()} className="mt-6">
        Try again
      </Button>
    </div>
  );
}
