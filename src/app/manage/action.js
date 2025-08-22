"use server";


import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "lib/prisma";
import { authOptions } from "lib/authOptions";

function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// enum ভ্যালুগুলোর allow-list (Prisma enum-এর সাথে ম্যাচ করতে UPPER_SNAKE_CASE)
const ALLOWED_CATEGORIES = [
  "SMART_WATCH",
  "LAPTOP",
  "AIRPOD",
  "IPAD",
  "CAMERA",
  "VIDEO_CAMERA",
];

export async function createProduct(prevState, formData) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?from=/manage");

  const name = String(formData.get("name") || "").trim();
  const priceStr = String(formData.get("price") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const description = String(formData.get("description") || "").trim();

  // NEW: category
  const categoryRaw = String(formData.get("category") || "").toUpperCase().trim();
  if (!ALLOWED_CATEGORIES.includes(categoryRaw)) {
    return { error: "Please select a valid category." };
  }

  if (!name) return { error: "Name is required." };
  const priceNumber = Number(priceStr);
  if (!priceStr || Number.isNaN(priceNumber) || priceNumber <= 0) {
    return { error: "Enter a valid price." };
  }

  const slug = slugify(name);

  try {
    await prisma.product.create({
      data: {
        name,
        slug,
        price: Math.round(priceNumber),
        image: image || null,
        description: description || null,
        category: categoryRaw,     ownerEmail: session.user?.email || null,        
      },
    });
    return { ok: true };
    
  } catch (e) {
    if (e?.code === "P2002") return { error: "A product with this name already exists." };
    console.error("createProduct error:", e);
    return { error: "Server error. Please try again." };
  }
}
