"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
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
    <html lang="en">
      <body className="bg-[#f5f7fb] px-6 py-24 text-[#101828]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1657b5]">Something went wrong</p>
        <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight">This page did not load.</h1>
        <p className="mt-4 max-w-lg text-sm leading-6 text-[#3d4c63]">
          The problem is on our side. You can try again, or return home and continue from there.
        </p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-[#2f7cf6] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <Button href="/">Home</Button>
        </div>
      </body>
    </html>
  );
}
