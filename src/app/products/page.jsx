import Link from "next/link";
import { prisma } from "lib/prisma";

export const metadata = { title: "Products — SimpleShop" };

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams; // Next.js 15: await

  // helper: string/array—শেষ ভ্যালু নাও
  const pick = (v) =>
    Array.isArray(v) ? v.at(-1) : typeof v === "string" ? v : null;

  const qSlug = (pick(sp?.q) || "").trim();
  const catRaw = (pick(sp?.category) || "").trim().toLowerCase();

  const SORT_DEFAULT = "new";
  const sort = (pick(sp?.sort) || SORT_DEFAULT).toLowerCase();
  const SORT_LABELS = {
    new: "Newest",
    "price-asc": "Price: Low → High",
    "price-desc": "Price: High → Low",
  };
  const VALID_SORTS = new Set(Object.keys(SORT_LABELS));
  const sortKey = VALID_SORTS.has(sort) ? sort : SORT_DEFAULT;

  // UI slug -> Prisma enum
  const CAT_MAP = {
    smartwatch: "SMART_WATCH",
    laptop: "LAPTOP",
    earbuds: "AIRPOD",
    tablet: "IPAD",
    camera: "CAMERA",
    "video-camera": "VIDEO_CAMERA",
    // enum নামও সাপোর্ট
    SMART_WATCH: "SMART_WATCH",
    LAPTOP: "LAPTOP",
    AIRPOD: "AIRPOD",
    IPAD: "IPAD",
    CAMERA: "CAMERA",
    VIDEO_CAMERA: "VIDEO_CAMERA",
  };
  const categoryEnum = CAT_MAP[catRaw] || null;

  // ── পেজিনেশন ইনপুট ──────────────────────────────────────────────
  const PER_PAGE_DEFAULT = 6;
  const minPP = 6,
    maxPP = 48;

  const page = Math.max(1, parseInt(pick(sp?.page) || "1", 10) || 1);
  const perPageInput = parseInt(
    pick(sp?.per_page) || `${PER_PAGE_DEFAULT}`,
    10
  );
  const perPage = Math.min(
    maxPP,
    Math.max(
      minPP,
      Number.isFinite(perPageInput) ? perPageInput : PER_PAGE_DEFAULT
    )
  );

  // ফিল্টার অবজেক্ট
  const where = {
    AND: [
      categoryEnum ? { category: categoryEnum } : {},
      qSlug
        ? {
            OR: [
              { name: { contains: qSlug, mode: "insensitive" } },
              { description: { contains: qSlug, mode: "insensitive" } },
            ],
          }
        : {},
    ],
  };

  let orderBy = [{ createdAt: "desc" }];
  if (sortKey === "price-asc")
    orderBy = [{ price: "asc" }, { createdAt: "desc" }];
  if (sortKey === "price-desc")
    orderBy = [{ price: "desc" }, { createdAt: "desc" }];

  // মোট গণনা + পেজ ডাটা
  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  // কুয়েরি-স্ট্রিং বিল্ডার: category/q/per_page প্রিজার্ভ করে page বদলায়
  const makeHref = (targetPage) => {
    const params = new URLSearchParams();
    if (categoryEnum) params.set("category", catRaw); // UI slug রেখে দিচ্ছি
    if (qSlug) params.set("q", qSlug);
    if (perPage !== PER_PAGE_DEFAULT) params.set("per_page", String(perPage));
    if (sortKey !== SORT_DEFAULT) params.set("sort", sortKey);
    params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/products?${qs}` : "/products";
  };

  // সুন্দর লেবেল (UI তে দেখানোর জন্য)
  const LABELS = {
    SMART_WATCH: "Smart Watch",
    LAPTOP: "Laptop",
    AIRPOD: "AirPods",
    IPAD: "iPad",
    CAMERA: "Camera",
    VIDEO_CAMERA: "Video Camera",
  };
  const categoryLabel = categoryEnum ? LABELS[categoryEnum] : null;

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              {categoryEnum || qSlug ? "Products" : "All products"}
            </h1>
            <p className="mt-1 text-sm text-[var(--foreground)]/70">
              {categoryLabel && (
                <>
                  Category: <span className="font-medium">{categoryLabel}</span>{" "}
                </>
              )}
              Sort: <span className="font-medium">{SORT_LABELS[sortKey]}</span>
              {qSlug ? (
                <>
                  {categoryLabel ? "• " : null}Search:{" "}
                  <span className="font-medium">“{qSlug}”</span>{" "}
                </>
              ) : (
                !categoryLabel && "Browse our latest electronics."
              )}
              {total ? (
                <>
                  {" "}
                  • Showing{" "}
                  <span className="font-medium">
                    {(page - 1) * perPage + 1}
                  </span>
                  –
                  <span className="font-medium">
                    {Math.min(page * perPage, total)}
                  </span>{" "}
                  of <span className="font-medium">{total}</span>
                </>
              ) : null}
              {(categoryEnum || qSlug || page > 1) && (
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

          {/* Search form (GET) — category/page/per_page preserve করবে */}
          <form method="get" className="flex items-center gap-2">
            {categoryEnum && (
              <input type="hidden" name="category" value={catRaw} />
            )}
            {page !== 1 && <input type="hidden" name="page" value={page} />}
            {perPage !== PER_PAGE_DEFAULT && (
              <input type="hidden" name="per_page" value={perPage} />
            )}

            <label htmlFor="sort" className="sr-only">
              Sort
            </label>
            {/* <select
              id="sort"
              name="sort"
              defaultValue={sortKey}
              className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-2 text-sm"
            >
              <option value="new">Newest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select> */}

            <label htmlFor="q" className="sr-only">
              Search products
            </label>
            <input
              id="q"
              name="q"
              defaultValue={qSlug}
              placeholder="Search products…"
              className="w-56 sm:w-64 rounded-md border border-[var(--border)] bg-[var(--background)]
                         px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold shadow-sm
                         text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]
                         hover:-translate-y-0.5 transition"
            >
              {/* magnifier */}
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
            No products found{categoryLabel ? ` for “${categoryLabel}”` : ""}
            {qSlug
              ? categoryLabel
                ? ` matching “${qSlug}”`
                : ` for “${qSlug}”`
              : ""}
            .
          </div>
        )}

        {/* Grid */}
        {!!items.length && (
          <>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <article
                  key={p.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 hover:-translate-y-0.5 hover:shadow-sm transition"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-lg mb-3 border border-[var(--border)]">
                    <img
                      src={p.image || ""}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold">
                    {p.name}
                  </h2>
                  <p className="text-sm text-[var(--foreground)]/75 mt-1">
                    {p.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-mono">
                      ${(p.price ?? 0).toLocaleString()}
                    </span>
                    <Link
                      href={`/products/${p.slug}`}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold leading-none shadow-sm border border-[var(--border)] hover:bg-[var(--card)]"
                    >
                      Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              page={page}
              totalPages={totalPages}
              makeHref={makeHref}
            />
          </>
        )}
      </div>
    </section>
  );
}

/** Simple pagination component (server) */
function Pagination({ page, totalPages, makeHref }) {
  if (totalPages <= 1) return null;

  // window: current ±2, plus first/last with ellipses
  const pages = [];
  const push = (n) => pages.push(n);
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  if (start > 1) {
    push(1);
    if (start > 2) push("…");
  }
  for (let i = start; i <= end; i++) push(i);
  if (end < totalPages) {
    if (end < totalPages - 1) push("…");
    push(totalPages);
  }

  const baseBtn = "px-3 py-2 rounded-md text-sm border border-[var(--border)]";
  const active = "bg-[var(--background)] font-semibold";
  const linkCls = "hover:-translate-y-0.5 transition inline-flex items-center";

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      {/* Prev */}
      <Link
        href={makeHref(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={`${baseBtn} ${linkCls} ${
          page === 1 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Prev
      </Link>

      {/* Numbers */}
      {pages.map((p, idx) =>
        p === "…" ? (
          <span key={`e${idx}`} className="px-2 text-sm select-none">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={makeHref(p)}
            className={`${baseBtn} ${linkCls} ${p === page ? active : ""}`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      <Link
        href={makeHref(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={`${baseBtn} ${linkCls} ${
          page === totalPages ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
