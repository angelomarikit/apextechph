const hits = new Map<string, number[]>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

export function rateLimit(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

const duplicates = new Map<string, number>();

export function rememberSubmission(key: string) {
  duplicates.set(key, Date.now());
}

export function isRecentDuplicate(key: string) {
  const seen = duplicates.get(key);
  if (!seen) return false;
  if (Date.now() - seen > 15 * 60 * 1000) {
    duplicates.delete(key);
    return false;
  }
  return true;
}
