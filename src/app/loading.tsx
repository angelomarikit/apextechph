export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-live="polite" aria-busy="true">
      <p className="sr-only">Loading page</p>
      <div className="h-3 w-24 rounded bg-[var(--background-secondary)]" />
      <div className="mt-6 h-12 w-2/3 rounded bg-[var(--background-secondary)]" />
      <div className="mt-8 h-64 rounded-2xl bg-[var(--background-secondary)]" />
    </div>
  );
}
