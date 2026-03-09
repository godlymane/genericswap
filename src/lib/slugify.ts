const slugCounts = new Map<string, number>();

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and hyphens)
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}

export function uniqueSlugify(text: string): string {
  const base = slugify(text);
  const count = slugCounts.get(base) || 0;
  slugCounts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

export function resetSlugCounter(): void {
  slugCounts.clear();
}

export function comparisonSlug(drug1: string, drug2: string): string {
  return `${slugify(drug1)}-vs-${slugify(drug2)}`;
}
