import Link from "next/link";

import AddToCartButton from "../../components/AddToCartButton";
import { prisma } from "lib/prisma";

export const metadata = { title: "Products — SimpleShop" };


function formatPrice(n) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(Number(n || 0));
  } catch {
    return `$${Number(n || 0).toFixed(2)}`;
  }
}

const btnSm =
  "inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold leading-none shadow-sm transition hover:-translate-y-0.5";

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;

  const pick = (v) => Array.isArray(v) ? v.at(-1) : (typeof v === "string" ? v : null);

  const qSlug = (pick(sp?.q) || "").trim();
  const catSlug = (pick(sp?.category) || "").trim().toLowerCase();

  const category = typeof sp?.category === "string" ? sp.category : null;
  const q = typeof sp?.q === "string" ? sp.q.trim() : "";

  const CAT_MAP = {
    "smartwatch":  "SMART_WATCH",
    "laptop":      "LAPTOP",
    "earbuds":     "AIRPOD",       // enum এ AIRPOD
    "tablet":      "IPAD",
    "camera":      "CAMERA",
    "video-camera":"VIDEO_CAMERA",

    // যদি কখনো enum ভ্যালু দিয়েও কল হয়, সেগুলোকেও সাপোর্ট দেই
    "SMART_WATCH":"SMART_WATCH",
    "LAPTOP":"LAPTOP",
    "AIRPOD":"AIRPOD",
    "IPAD":"IPAD",
    "CAMERA":"CAMERA",
    "VIDEO_CAMERA":"VIDEO_CAMERA",
  };

  // Prisma enum ভ্যালু (না পেলে null)
  const categoryEnum = CAT_MAP[catSlug] || null;

  const items = await prisma.product.findMany({
    where: {
      AND: [
        categoryEnum ? { category: categoryEnum } : {},
        qSlug
          ? {
              OR: [
                { name:        { contains: qSlug, mode: "insensitive" } },
                { description: { contains: qSlug, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });



  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              {category || q ? "Products" : "All products"}
            </h1>

            {/* Active filters line */}
            <p className="mt-1 text-sm text-[var(--foreground)]/70">
              {category ? (
                <>
                  Category: <span className="font-medium">{category}</span>{" "}
                </>
              ) : null}
              {q ? (
                <>
                  {category ? "• " : null}
                  Search: <span className="font-medium">“{q}”</span>{" "}
                </>
              ) : (
                !category && "Browse our latest electronics."
              )}
              {(category || q) && (
                <>
                  {" "}
                  <Link
                    href="/products"
                    className="underline hover:no-underline ml-1"
                  >
                    Clear
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* Search form (GET) — category preserve করবে */}
          <form method="get" className="flex items-center gap-2">
            {category && (
              <input type="hidden" name="category" value={category} />
            )}
            <label htmlFor="q" className="sr-only">
              Search products
            </label>
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Search products…"
              className="w-56 sm:w-64 rounded-md border border-[var(--border)] bg-[var(--background)]
                         px-3 py-2 text-sm outline-none
                         focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold shadow-sm
                         text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]
                         hover:-translate-y-0.5 transition"
              aria-label="Search"
            >
              {/* magnifier icon */}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8L20 22l2-2-6.5-6.5zM5 10.5A5.5 5.5 0 1 1 10.5 16 5.5 5.5 0 0 1 5 10.5z" />
              </svg>
              Search
            </button>
          </form>
        </header>

        {/* Empty state */}
        {!items.length && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 text-sm">
            No products found
            {category ? ` for “${category}”` : ""}
            {q ? (category ? ` matching “${q}”` : ` for “${q}”`) : ""}.
          </div>
        )}

        {/* Grid */}
        {!!items.length && (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <article
                key={p.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4
                           hover:-translate-y-0.5 hover:shadow-sm transition"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-lg mb-3 border border-[var(--border)]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h2 className="text-base sm:text-lg font-semibold">{p.name}</h2>
                <p className="text-sm text-[var(--foreground)]/75 mt-1">
                  {p.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-mono">
                    {formatPrice(p.price)}
                  </span>
                  <Link
                    href={`/products/${p.id}`}
                    className={`${btnSm} border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--card)]`}
                    aria-label={`View details for ${p.name}`}
                  >
                    Details
                  </Link>
                  <AddToCartButton
                    compact
                    product={{
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: p.image,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
