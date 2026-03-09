import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";

const prisma = new PrismaClient();

const DATA_DIR = path.join(process.cwd(), "data");

const FDA_URLS = {
  products: "https://www.fda.gov/media/76860/download",
  patents: "https://www.fda.gov/media/76861/download",
  exclusivity: "https://www.fda.gov/media/76862/download",
};

// --- Helpers ---

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseDate(dateStr: string | undefined): Date | null {
  if (!dateStr || dateStr.trim() === "") return null;
  const trimmed = dateStr.trim();

  if (trimmed.toLowerCase().includes("approved prior")) {
    return new Date("1982-01-01");
  }

  // Try various date formats
  // Common FDA format: "Mon DD, YYYY" e.g., "Dec 17, 1996"
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) return parsed;

  // Try MM/DD/YYYY
  const parts = trimmed.split("/");
  if (parts.length === 3) {
    const d = new Date(`${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`);
    if (!isNaN(d.getTime())) return d;
  }

  return null;
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const makeRequest = (currentUrl: string, redirectCount = 0) => {
      if (redirectCount > 5) {
        reject(new Error("Too many redirects"));
        return;
      }
      const protocol = currentUrl.startsWith("https") ? https : http;
      protocol
        .get(currentUrl, (response) => {
          if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            makeRequest(response.headers.location, redirectCount + 1);
            return;
          }
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        })
        .on("error", (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
    };
    makeRequest(url);
  });
}

async function ensureDataFiles(): Promise<void> {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const files = [
    { key: "products" as const, filename: "products.txt" },
    { key: "patents" as const, filename: "patent.txt" },
    { key: "exclusivity" as const, filename: "exclusivity.txt" },
  ];

  for (const f of files) {
    const filePath = path.join(DATA_DIR, f.filename);
    if (!fs.existsSync(filePath)) {
      console.log(`Downloading ${f.filename}...`);
      await downloadFile(FDA_URLS[f.key], filePath);
      console.log(`Downloaded ${f.filename}`);
    } else {
      console.log(`${f.filename} already exists, skipping download.`);
    }
  }
}

function parseTildeDelimited(content: string): string[][] {
  const lines = content.split("\n").filter((l) => l.trim() !== "");
  return lines.map((line) => line.split("~").map((f) => f.trim()));
}

// --- Ingest Products ---

async function ingestProducts(): Promise<void> {
  console.log("\n--- Ingesting Products ---");
  const filePath = path.join(DATA_DIR, "products.txt");
  const content = fs.readFileSync(filePath, "utf-8");
  const rows = parseTildeDelimited(content);

  // Header row:
  // Ingredient~DF;Route~Trade_Name~Applicant~Strength~Appl_Type~Appl_No~Product_No~TE_Code~Approval_Date~RLD~RS~Type~Applicant_Full_Name
  const header = rows[0];
  console.log("Header:", header.join(" | "));
  const dataRows = rows.slice(1);

  console.log(`Total product rows: ${dataRows.length}`);

  const slugCounts = new Map<string, number>();
  let brandCount = 0;
  let genericCount = 0;
  let errorCount = 0;
  let batchSize = 100;
  let batch: any[] = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    if (row.length < 10) continue;

    try {
      const activeIngredient = row[0] || "";
      const dfRoute = row[1] || "";
      const tradeName = row[2] || "";
      const applicant = row[3] || "";
      const strength = row[4] || "";
      const applType = row[5] || "";
      const applNo = row[6] || "";
      const productNo = row[7] || "";
      const teCode = row[8] || "";
      const approvalDate = row[9] || "";
      const rld = row[10] || "";
      const type = row[12] || "";
      const applicantFullName = row[13] || applicant;

      // Split DF;Route
      const dfRouteParts = dfRoute.split(";");
      const dosageForm = dfRouteParts[0]?.trim() || null;
      const route = dfRouteParts[1]?.trim() || null;

      // Generate unique slug
      const baseSlug = slugify(tradeName || activeIngredient);
      const count = slugCounts.get(baseSlug) || 0;
      slugCounts.set(baseSlug, count + 1);
      const slug = count === 0 ? baseSlug : `${baseSlug}-${count}`;

      const applicationType = applType.toUpperCase() === "N" ? "N" : "A";
      if (applicationType === "N") brandCount++;
      else genericCount++;

      const isDiscontinued = type?.toLowerCase().includes("discontinued") || false;

      batch.push({
        slug,
        tradeName: tradeName || activeIngredient,
        activeIngredient,
        dosageForm,
        route,
        strength: strength || null,
        applicant: applicantFullName || applicant || null,
        applicationType,
        applicationNumber: applNo,
        productNumber: productNo || null,
        teCode: teCode || null,
        approvalDate: parseDate(approvalDate),
        isRLD: rld?.toLowerCase() === "yes",
        isDiscontinued,
      });

      if (batch.length >= batchSize) {
        await upsertBatch(batch);
        batch = [];
        if ((i + 1) % 1000 === 0) {
          console.log(`  Processed ${i + 1}/${dataRows.length} products...`);
        }
      }
    } catch (err) {
      errorCount++;
      if (errorCount <= 5) console.error(`  Error on row ${i}:`, err);
    }
  }

  // Flush remaining
  if (batch.length > 0) {
    await upsertBatch(batch);
  }

  console.log(`Products ingested: ${dataRows.length - errorCount}`);
  console.log(`  Brand (NDA): ${brandCount}`);
  console.log(`  Generic (ANDA): ${genericCount}`);
  console.log(`  Errors: ${errorCount}`);
}

async function upsertBatch(batch: any[]): Promise<void> {
  for (const drug of batch) {
    try {
      await prisma.drug.upsert({
        where: {
          applicationNumber_productNumber: {
            applicationNumber: drug.applicationNumber,
            productNumber: drug.productNumber || "001",
          },
        },
        update: {
          tradeName: drug.tradeName,
          activeIngredient: drug.activeIngredient,
          dosageForm: drug.dosageForm,
          route: drug.route,
          strength: drug.strength,
          applicant: drug.applicant,
          applicationType: drug.applicationType,
          teCode: drug.teCode,
          approvalDate: drug.approvalDate,
          isRLD: drug.isRLD,
          isDiscontinued: drug.isDiscontinued,
        },
        create: {
          slug: drug.slug,
          tradeName: drug.tradeName,
          activeIngredient: drug.activeIngredient,
          dosageForm: drug.dosageForm,
          route: drug.route,
          strength: drug.strength,
          applicant: drug.applicant,
          applicationType: drug.applicationType,
          applicationNumber: drug.applicationNumber,
          productNumber: drug.productNumber || "001",
          teCode: drug.teCode,
          approvalDate: drug.approvalDate,
          isRLD: drug.isRLD,
          isDiscontinued: drug.isDiscontinued,
        },
      });
    } catch (err: any) {
      // If slug already exists, try with a random suffix
      if (err?.code === "P2002" && err?.meta?.target?.includes("slug")) {
        drug.slug = `${drug.slug}-${Math.random().toString(36).slice(2, 6)}`;
        await prisma.drug.create({ data: drug });
      }
    }
  }
}

// --- Ingest Patents ---

async function ingestPatents(): Promise<void> {
  console.log("\n--- Ingesting Patents ---");
  const filePath = path.join(DATA_DIR, "patent.txt");
  const content = fs.readFileSync(filePath, "utf-8");
  const rows = parseTildeDelimited(content);

  // Header: Appl_Type~Appl_No~Product_No~Patent_No~Patent_Expire_Date_Text~Drug_Substance_Flag~Drug_Product_Flag~Patent_Use_Code~Delist_Flag~Submission_Date
  const header = rows[0];
  console.log("Patent header:", header.join(" | "));
  const dataRows = rows.slice(1);
  console.log(`Total patent rows: ${dataRows.length}`);

  let count = 0;
  let errorCount = 0;

  for (const row of dataRows) {
    if (row.length < 5) continue;
    try {
      const applNo = row[1]?.trim();
      const patentNo = row[3]?.trim();
      const patentExpire = row[4]?.trim();
      const drugSubstanceFlag = row[5]?.trim()?.toUpperCase() === "Y";
      const drugProductFlag = row[6]?.trim()?.toUpperCase() === "Y";
      const patentUseCode = row[7]?.trim() || null;

      if (!applNo || !patentNo) continue;

      // Check if the drug exists
      const drugExists = await prisma.drug.findFirst({
        where: { applicationNumber: applNo },
        select: { id: true },
      });

      if (!drugExists) continue;

      await prisma.patent.upsert({
        where: { id: `${applNo}-${patentNo}` },
        update: {
          patentExpireDate: parseDate(patentExpire),
          drugSubstanceFlag,
          drugProductFlag,
          patentUseCode,
        },
        create: {
          id: `${applNo}-${patentNo}`,
          applicationNumber: applNo,
          patentNumber: patentNo,
          patentExpireDate: parseDate(patentExpire),
          drugSubstanceFlag,
          drugProductFlag,
          patentUseCode,
        },
      });
      count++;
    } catch (err) {
      errorCount++;
      if (errorCount <= 3) console.error("  Patent error:", err);
    }
  }

  console.log(`Patents ingested: ${count}, Errors: ${errorCount}`);
}

// --- Ingest Exclusivities ---

async function ingestExclusivities(): Promise<void> {
  console.log("\n--- Ingesting Exclusivities ---");
  const filePath = path.join(DATA_DIR, "exclusivity.txt");
  const content = fs.readFileSync(filePath, "utf-8");
  const rows = parseTildeDelimited(content);

  // Header: Appl_Type~Appl_No~Product_No~Exclusivity_Code~Exclusivity_Date
  const header = rows[0];
  console.log("Exclusivity header:", header.join(" | "));
  const dataRows = rows.slice(1);
  console.log(`Total exclusivity rows: ${dataRows.length}`);

  let count = 0;
  let errorCount = 0;

  for (const row of dataRows) {
    if (row.length < 4) continue;
    try {
      const applNo = row[1]?.trim();
      const productNo = row[2]?.trim();
      const exclCode = row[3]?.trim() || null;
      const exclDate = row[4]?.trim();

      if (!applNo) continue;

      const drugExists = await prisma.drug.findFirst({
        where: { applicationNumber: applNo },
        select: { id: true },
      });

      if (!drugExists) continue;

      const uniqueId = `${applNo}-${productNo || "000"}-${exclCode || "NONE"}`;

      await prisma.exclusivity.upsert({
        where: { id: uniqueId },
        update: {
          exclusivityCode: exclCode,
          exclusivityDate: parseDate(exclDate),
        },
        create: {
          id: uniqueId,
          applicationNumber: applNo,
          exclusivityCode: exclCode,
          exclusivityDate: parseDate(exclDate),
        },
      });
      count++;
    } catch (err) {
      errorCount++;
      if (errorCount <= 3) console.error("  Exclusivity error:", err);
    }
  }

  console.log(`Exclusivities ingested: ${count}, Errors: ${errorCount}`);
}

// --- Main ---

async function main() {
  console.log("=== FDA Orange Book Data Ingestion ===\n");

  await ensureDataFiles();
  await ingestProducts();
  await ingestPatents();
  await ingestExclusivities();

  // Final stats
  const [drugs, patents, exclusivities] = await Promise.all([
    prisma.drug.count(),
    prisma.patent.count(),
    prisma.exclusivity.count(),
  ]);

  console.log("\n=== Final Database Stats ===");
  console.log(`Total drugs: ${drugs}`);
  console.log(`Total patents: ${patents}`);
  console.log(`Total exclusivities: ${exclusivities}`);

  const brandCount = await prisma.drug.count({ where: { applicationType: "N" } });
  const genericCount = await prisma.drug.count({ where: { applicationType: "A" } });
  console.log(`Brand drugs (NDA): ${brandCount}`);
  console.log(`Generic drugs (ANDA): ${genericCount}`);
}

main()
  .catch((e) => {
    console.error("Fatal error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
