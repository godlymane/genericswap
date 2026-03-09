import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log("=== Generating URL Slugs ===\n");

  const drugs = await prisma.drug.findMany({
    select: { id: true, tradeName: true, slug: true },
  });

  const slugMap = new Map<string, number>();
  let updated = 0;

  for (const drug of drugs) {
    const baseSlug = slugify(drug.tradeName);
    if (!baseSlug) continue;

    const count = slugMap.get(baseSlug) || 0;
    slugMap.set(baseSlug, count + 1);
    const newSlug = count === 0 ? baseSlug : `${baseSlug}-${count}`;

    if (drug.slug !== newSlug) {
      try {
        await prisma.drug.update({
          where: { id: drug.id },
          data: { slug: newSlug },
        });
        updated++;
      } catch {
        // Slug conflict, add random suffix
        const fallback = `${newSlug}-${Math.random().toString(36).slice(2, 5)}`;
        await prisma.drug.update({
          where: { id: drug.id },
          data: { slug: fallback },
        });
        updated++;
      }
    }
  }

  console.log(`Updated ${updated} slugs out of ${drugs.length} drugs.`);
  console.log(`Unique base slugs: ${slugMap.size}`);
}

main()
  .catch((e) => {
    console.error("Fatal error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
