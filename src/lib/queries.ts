import prisma from "./db";

// Helper: fetch patents and exclusivities for a drug by applicationNumber
async function getPatentsAndExclusivities(applicationNumber: string) {
  const [patents, exclusivities] = await Promise.all([
    prisma.patent.findMany({
      where: { applicationNumber },
      orderBy: { patentExpireDate: "asc" },
    }),
    prisma.exclusivity.findMany({
      where: { applicationNumber },
      orderBy: { exclusivityDate: "asc" },
    }),
  ]);
  return { patents, exclusivities };
}

// Get a brand drug by slug with its patents and exclusivities
export async function getDrugBySlug(slug: string) {
  const drug = await prisma.drug.findUnique({ where: { slug } });
  if (!drug) return null;

  const { patents, exclusivities } = await getPatentsAndExclusivities(drug.applicationNumber);
  return { ...drug, patents, exclusivities };
}

// Get all generic equivalents for a brand drug
export async function getGenericEquivalents(
  activeIngredient: string,
  dosageForm: string | null,
  route: string | null
) {
  return prisma.drug.findMany({
    where: {
      activeIngredient,
      ...(dosageForm ? { dosageForm } : {}),
      ...(route ? { route } : {}),
      applicationType: "A",
    },
    orderBy: [{ approvalDate: "asc" }],
  });
}

// Get the brand (RLD) drug for an active ingredient
export async function getBrandDrug(activeIngredient: string) {
  const drug = await prisma.drug.findFirst({
    where: {
      activeIngredient,
      applicationType: "N",
      isRLD: true,
    },
  });
  if (!drug) return null;

  const { patents, exclusivities } = await getPatentsAndExclusivities(drug.applicationNumber);
  return { ...drug, patents, exclusivities };
}

// Get all drugs for a given active ingredient (for generic ingredient pages)
export async function getDrugsByIngredient(activeIngredient: string) {
  const drugs = await prisma.drug.findMany({
    where: { activeIngredient },
    orderBy: [{ applicationType: "asc" }, { approvalDate: "asc" }],
  });

  // Attach patents to each drug
  const results = await Promise.all(
    drugs.map(async (drug) => {
      const patents = await prisma.patent.findMany({
        where: { applicationNumber: drug.applicationNumber },
      });
      return { ...drug, patents };
    })
  );
  return results;
}

// Search drugs by name or ingredient
export async function searchDrugs(query: string, limit = 20) {
  return prisma.drug.findMany({
    where: {
      OR: [
        { tradeName: { contains: query, mode: "insensitive" } },
        { activeIngredient: { contains: query, mode: "insensitive" } },
      ],
    },
    select: { // OPTIMIZED: select only needed fields
      id: true,
      slug: true,
      tradeName: true,
      activeIngredient: true,
      applicationType: true,
      dosageForm: true,
      applicant: true,
      teCode: true,
    },
    distinct: ["tradeName"],
    take: limit,
    orderBy: { tradeName: "asc" },
  });
}

// Get all unique active ingredients for generic ingredient pages
export async function getUniqueIngredients() {
  const drugs = await prisma.drug.findMany({
    select: { activeIngredient: true },
    distinct: ["activeIngredient"],
    orderBy: { activeIngredient: "asc" },
  });
  return drugs.map((d) => d.activeIngredient);
}

// Get all brand drug slugs for static generation
export async function getAllBrandDrugSlugs() {
  return prisma.drug.findMany({
    where: { applicationType: "N" },
    select: { slug: true },
    distinct: ["slug"],
  });
}

// Get all drug slugs for sitemap
export async function getAllDrugSlugs() {
  return prisma.drug.findMany({
    select: { slug: true },
    distinct: ["slug"],
  });
}

// Get drugs by category (matching active ingredient keywords)
export async function getDrugsByCategory(keywords: string[]) {
  return prisma.drug.findMany({
    where: {
      applicationType: "N",
      OR: keywords.map((kw) => ({
        activeIngredient: { contains: kw, mode: "insensitive" as const },
      })),
    },
    select: { // OPTIMIZED: select only display fields for category table
      id: true,
      slug: true,
      tradeName: true,
      activeIngredient: true,
      applicant: true,
      applicationType: true,
    },
    distinct: ["tradeName"],
    orderBy: { tradeName: "asc" },
  });
}

// Get popular drugs for homepage
export async function getPopularDrugs(tradeNames: string[]) {
  return prisma.drug.findMany({
    where: {
      OR: tradeNames.map((name) => ({
        tradeName: { equals: name, mode: "insensitive" as const },
      })),
      applicationType: "N",
      isRLD: true,
    },
    select: { // OPTIMIZED: select only needed fields for homepage grid
      id: true,
      slug: true,
      tradeName: true,
      activeIngredient: true,
      applicationType: true,
    },
    distinct: ["tradeName"],
    orderBy: { tradeName: "asc" },
  });
}

// Get related drugs (same active ingredient prefix or same category)
export async function getRelatedDrugs(activeIngredient: string, limit = 10) {
  const prefix = activeIngredient.split(" ")[0];
  return prisma.drug.findMany({
    where: {
      applicationType: "N",
      isRLD: true,
      activeIngredient: { startsWith: prefix, mode: "insensitive" },
      NOT: { activeIngredient },
    },
    select: { // OPTIMIZED: select only needed fields
      id: true,
      slug: true,
      tradeName: true,
      activeIngredient: true,
      applicationType: true,
      dosageForm: true,
    },
    distinct: ["tradeName"],
    take: limit,
    orderBy: { tradeName: "asc" },
  });
}

// Count generics for a brand drug
export async function countGenerics(
  activeIngredient: string,
  dosageForm: string | null,
  route: string | null
) {
  return prisma.drug.count({
    where: {
      activeIngredient,
      ...(dosageForm ? { dosageForm } : {}),
      ...(route ? { route } : {}),
      applicationType: "A",
    },
  });
}

// Get all brand drugs with generic counts for category pages
export async function getBrandDrugsWithGenericCounts(keywords: string[]) {
  const brands = await getDrugsByCategory(keywords);

  if (brands.length === 0) return [];

  // Batch-count all generics in ONE query instead of N+1 individual counts
  const uniqueIngredients = [...new Set(brands.map((d) => d.activeIngredient))];
  const genericCounts = await prisma.drug.groupBy({
    by: ["activeIngredient"],
    where: {
      applicationType: "A",
      activeIngredient: { in: uniqueIngredients },
    },
    _count: true,
  });

  const countMap = new Map(
    genericCounts.map((g) => [g.activeIngredient, g._count])
  );

  return brands.map((drug) => ({
    ...drug,
    genericCount: countMap.get(drug.activeIngredient) || 0,
  }));
}

// Upcoming patent cliffs (expiring in next N years)
export async function getUpcomingPatentCliffs(years = 5) {
  const now = new Date();
  const future = new Date();
  future.setFullYear(future.getFullYear() + years);

  const patents = await prisma.patent.findMany({
    where: {
      patentExpireDate: { gte: now, lte: future },
    },
    orderBy: { patentExpireDate: "asc" },
  });

  // Look up drugs for each patent
  type DrugRecord = NonNullable<Awaited<ReturnType<typeof prisma.drug.findFirst>>>;
  const drugMap = new Map<string, { drug: DrugRecord; earliestExpiry: Date; patentCount: number }>();

  for (const p of patents) {
    if (!p.patentExpireDate) continue;
    const drug = await prisma.drug.findFirst({
      where: { applicationNumber: p.applicationNumber, applicationType: "N" },
    });
    if (!drug) continue;

    const key = drug.tradeName;
    const existing = drugMap.get(key);
    if (!existing || p.patentExpireDate < existing.earliestExpiry) {
      drugMap.set(key, {
        drug,
        earliestExpiry: p.patentExpireDate,
        patentCount: (existing?.patentCount || 0) + 1,
      });
    } else {
      existing.patentCount++;
    }
  }

  return Array.from(drugMap.values())
    .sort((a, b) => a.earliestExpiry.getTime() - b.earliestExpiry.getTime());
}

// Recently approved generics
export async function getRecentlyApprovedGenerics(months = 12) {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);

  return prisma.drug.findMany({
    where: {
      applicationType: "A",
      approvalDate: { gte: cutoff },
    },
    select: { // OPTIMIZED: select only needed fields
      id: true,
      slug: true,
      tradeName: true,
      activeIngredient: true,
      applicant: true,
      approvalDate: true,
      dosageForm: true,
    },
    orderBy: { approvalDate: "desc" },
    take: 50,
  });
}

// Advanced search with filters
export async function advancedSearch({
  query,
  dosageForm,
  route,
  teCode,
  applicationType,
  limit = 50,
}: {
  query?: string;
  dosageForm?: string;
  route?: string;
  teCode?: string;
  applicationType?: string;
  limit?: number;
}) {
  return prisma.drug.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { tradeName: { contains: query, mode: "insensitive" } },
                { activeIngredient: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        dosageForm ? { dosageForm } : {},
        route ? { route } : {},
        teCode ? { teCode: { startsWith: teCode, mode: "insensitive" as const } } : {},
        applicationType ? { applicationType } : {},
      ],
    },
    distinct: ["tradeName"],
    take: limit,
    orderBy: { tradeName: "asc" },
  });
}

// Get all unique dosage forms for filter dropdowns
export async function getUniqueDosageForms() {
  const drugs = await prisma.drug.findMany({
    select: { dosageForm: true },
    distinct: ["dosageForm"],
    where: { dosageForm: { not: null } },
    orderBy: { dosageForm: "asc" },
  });
  return drugs.map((d) => d.dosageForm).filter(Boolean) as string[];
}

// Get all unique routes for filter dropdowns
export async function getUniqueRoutes() {
  const drugs = await prisma.drug.findMany({
    select: { route: true },
    distinct: ["route"],
    where: { route: { not: null } },
    orderBy: { route: "asc" },
  });
  return drugs.map((d) => d.route).filter(Boolean) as string[];
}

// Stats for homepage
export async function getStats() {
  const [totalDrugs, brandDrugs, genericDrugs, totalPatents] = await Promise.all([
    prisma.drug.count(),
    prisma.drug.count({ where: { applicationType: "N" } }),
    prisma.drug.count({ where: { applicationType: "A" } }),
    prisma.patent.count(),
  ]);

  return { totalDrugs, brandDrugs, genericDrugs, totalPatents };
}
