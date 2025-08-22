/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import fs from "node:fs/promises";
import path from "node:path";

const prisma = new PrismaClient();

function slugify(s = "") {
  return s.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// তোমার JSON → Prisma enum ম্যাপিং
const CAT_MAP = {
  "smartwatch": "SMART_WATCH",
  "laptop": "LAPTOP",
  "earbuds": "AIRPOD",       // enum এ AIRPOD আছে
  "tablet": "IPAD",
  "camera": "CAMERA",
  "video-camera": "VIDEO_CAMERA",
};

function normalizeCategory(raw = "") {
  const key = String(raw).toLowerCase().trim();
  return CAT_MAP[key] || "LAPTOP"; // fallback
}

// price: দশমিক থাকলে round করে integer
function normalizePrice(p) {
  const num = Number(p);
  if (!Number.isFinite(num)) return 0;
  return Math.round(num);
}

// i.ibb.co.com → i.ibb.co ফিক্সার (যদি ভুল দেয়া থাকে)
// function fixImageUrl(url = "") {
//   try {
//     const u = new URL(url);
//     if (u.hostname === "i.ibb.co.com") {
//       u.hostname = "i.ibb.co";
//       return u.toString();
//     }
//     return url;
//   } catch {
//     return url;
//   }
// }

async function main() {
  const jsonPath = path.resolve(process.cwd(), "data/products.json");
  const raw = await fs.readFile(jsonPath, "utf-8");
  const items = JSON.parse(raw);

  console.log(`Seeding ${items.length} products...\n`);

  for (const p of items) {
    const name = String(p.name || "").trim();
    if (!name) {
      console.warn("• Skipped item (no name)");
      continue;
    }

    // slug: JSON এ থাকলে সেটা, না হলে name থেকে
    const slug = p.slug ? String(p.slug).trim() : slugify(name);

    const data = {
      name,
      slug,
      price: normalizePrice(p.price),
      image: (p.image) || null,
      description: p.description || null,
      category: normalizeCategory(p.category),
    };

    // upsert: একই slug থাকলে update; নইলে create
    await prisma.product.upsert({
      where: { slug },
      update: data,
      create: data,
    });

    console.log(`✓ ${name}`);
  }

  console.log("\nDone seeding.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
