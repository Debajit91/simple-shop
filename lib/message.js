import fs from "fs/promises";
import path from "path";

const file = path.join(process.cwd(), "data", "messages.json");

async function ensureFile() {
  try {
    await fs.access(file);
  } catch {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, "[]", "utf8");
  }
}

export async function saveMessage(entry) {
  await ensureFile();
  let arr = [];
  try {
    const json = await fs.readFile(file, "utf8");
    arr = JSON.parse(json || "[]");
  } catch {
    arr = [];
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();

  arr.push({ id, createdAt, ...entry });
  await fs.writeFile(file, JSON.stringify(arr, null, 2), "utf8");
}
