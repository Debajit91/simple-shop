import fs from "fs/promises";
import path from "path";

const file = path.join(process.cwd(), "data", "products.json");

export async function getProducts() {
  const json = await fs.readFile(file, "utf8");
  return JSON.parse(json);
}

export async function getProduct(id) {
  const items = await getProducts();
  return items.find((p) => p.id === id) ?? null;
}
