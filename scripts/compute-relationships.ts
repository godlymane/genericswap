import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== Computing Drug Relationships ===\n");

  // 1. Find all brand drugs and their generic equivalents
  const brandDrugs = await prisma.drug.findMany({
    where: { applicationType: "N", isRLD: true },
    select: {
      id: true,
      tradeName: true,
      activeIngredient: true,
      dosageForm: true,
      route: true,
      approvalDate: true,
    },
  });

  console.log(`Total brand (RLD) drugs: ${brandDrugs.length}`);

  let withGenerics = 0;
  let withoutGenerics = 0;
  let totalGenericCount = 0;
  const genericCounts: { name: string; ingredient: string; count: number }[] = [];

  for (const brand of brandDrugs) {
    const count = await prisma.drug.count({
      where: {
        activeIngredient: brand.activeIngredient,
        ...(brand.dosageForm ? { dosageForm: brand.dosageForm } : {}),
        ...(brand.route ? { route: brand.route } : {}),
        applicationType: "A",
      },
    });

    if (count > 0) {
      withGenerics++;
      totalGenericCount += count;
      genericCounts.push({ name: brand.tradeName, ingredient: brand.activeIngredient, count });
    } else {
      withoutGenerics++;
    }
  }

  console.log(`\n--- Generic Availability ---`);
  console.log(`Brand drugs WITH generics: ${withGenerics}`);
  console.log(`Brand drugs WITHOUT generics: ${withoutGenerics}`);
  console.log(`Average generics per brand: ${withGenerics > 0 ? (totalGenericCount / withGenerics).toFixed(1) : 0}`);

  // Top 20 drugs by generic count
  genericCounts.sort((a, b) => b.count - a.count);
  console.log(`\n--- Top 20 Drugs by Generic Count ---`);
  for (const entry of genericCounts.slice(0, 20)) {
    console.log(`  ${entry.name} (${entry.ingredient}): ${entry.count} generics`);
  }

  // 2. Category groupings by route
  console.log(`\n--- Drugs by Route ---`);
  const routeGroups = await prisma.drug.groupBy({
    by: ["route"],
    where: { applicationType: "N" },
    _count: true,
    orderBy: { _count: { route: "desc" } },
  });

  for (const group of routeGroups.slice(0, 15)) {
    console.log(`  ${group.route || "(none)"}: ${group._count} brand drugs`);
  }

  // 3. Category groupings by dosage form
  console.log(`\n--- Drugs by Dosage Form ---`);
  const formGroups = await prisma.drug.groupBy({
    by: ["dosageForm"],
    where: { applicationType: "N" },
    _count: true,
    orderBy: { _count: { dosageForm: "desc" } },
  });

  for (const group of formGroups.slice(0, 15)) {
    console.log(`  ${group.dosageForm || "(none)"}: ${group._count} brand drugs`);
  }

  // 4. Patent analysis
  console.log(`\n--- Patent Analysis ---`);
  const now = new Date();
  const activePatents = await prisma.patent.count({
    where: { patentExpireDate: { gt: now } },
  });
  const expiredPatents = await prisma.patent.count({
    where: { patentExpireDate: { lte: now } },
  });

  console.log(`Active patents (not yet expired): ${activePatents}`);
  console.log(`Expired patents: ${expiredPatents}`);

  // Drugs with patents expiring soon (next 2 years)
  const twoYearsFromNow = new Date();
  twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);

  const soonExpiring = await prisma.patent.findMany({
    where: {
      patentExpireDate: { gt: now, lt: twoYearsFromNow },
    },
    distinct: ["applicationNumber"],
    orderBy: { patentExpireDate: "asc" },
    take: 20,
  });

  console.log(`\n--- Patents Expiring Within 2 Years ---`);
  for (const patent of soonExpiring) {
    const drug = await prisma.drug.findFirst({
      where: { applicationNumber: patent.applicationNumber, applicationType: "N" },
      select: { tradeName: true, activeIngredient: true },
    });
    if (drug) {
      console.log(
        `  ${drug.tradeName} (${drug.activeIngredient}) — Patent ${patent.patentNumber} expires ${patent.patentExpireDate?.toISOString().split("T")[0]}`
      );
    }
  }

  console.log("\n=== Relationship Computation Complete ===");
}

main()
  .catch((e) => {
    console.error("Fatal error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
