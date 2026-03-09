/**
 * GenericSwap Database Setup Script
 *
 * Usage:
 *   1. Create a Supabase project at https://supabase.com
 *   2. Copy connection string from Settings > Database > Connection string (URI)
 *   3. Create .env file:  DATABASE_URL="postgresql://..."
 *   4. Run:  npx tsx scripts/setup-db.ts
 *
 * This script will:
 *   - Push Prisma schema to Supabase
 *   - Generate Prisma client
 *   - Create a default API key for testing
 *   - Print next steps for data ingestion
 */

import { execSync } from "child_process";
import { randomBytes } from "crypto";
import { existsSync, readFileSync } from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");

function run(cmd: string) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: "inherit" });
}

async function main() {
  console.log("=== GenericSwap Database Setup ===\n");

  // Check .env
  const envPath = path.join(ROOT, ".env");
  if (!existsSync(envPath)) {
    console.error("ERROR: .env file not found!");
    console.log("\nCreate a .env file with:");
    console.log('  DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres"');
    console.log('  NEXT_PUBLIC_SITE_URL="https://genericswap.com"');
    process.exit(1);
  }

  const envContent = readFileSync(envPath, "utf-8");
  if (!envContent.includes("DATABASE_URL") || envContent.includes("[PASSWORD]")) {
    console.error("ERROR: DATABASE_URL not properly configured in .env");
    console.log("Replace [PASSWORD] and [PROJECT_REF] with your Supabase credentials.");
    process.exit(1);
  }

  // Step 1: Generate Prisma client
  console.log("\n[1/3] Generating Prisma client...");
  run("npx prisma generate");

  // Step 2: Push schema to database
  console.log("\n[2/3] Pushing schema to database...");
  run("npx prisma db push");

  // Step 3: Create default API key
  console.log("\n[3/3] Creating default API key...");
  const apiKey = `gs_${randomBytes(24).toString("hex")}`;

  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const existing = await prisma.apiKey.findFirst({ where: { name: "default" } });
    if (!existing) {
      await prisma.apiKey.create({
        data: {
          key: apiKey,
          name: "default",
          email: "admin@genericswap.com",
          rateLimit: 1000,
        },
      });
      console.log(`\nAPI Key created: ${apiKey}`);
      console.log("Save this key — it won't be shown again.");
    } else {
      console.log(`\nDefault API key already exists: ${existing.key}`);
    }

    await prisma.$disconnect();
  } catch (e) {
    console.log("Could not create API key (run after first prisma generate):", e);
    console.log(`\nManually create API key after setup by running prisma studio.`);
  }

  console.log("\n=== Setup Complete! ===");
  console.log("\nNext steps:");
  console.log("  1. Download FDA Orange Book data files");
  console.log("  2. Run:  npm run ingest");
  console.log("  3. Run:  npm run dev");
  console.log("  4. Visit http://localhost:3000");
}

main().catch(console.error);
