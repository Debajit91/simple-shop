import Link from "next/link";
import { getProducts } from "../../../lib/products";


// same formatter we used before
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

export default async function ProductsPage({ searchParams }) {
  const category =
    typeof searchParams?.category === "string" ? searchParams.category : null;

  const all = await getProducts();
  const items = category ? all.filter((p) => p.category === category) : all;

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              {category ? "Filtered products" : "All products"}
            </h1>
            {category ? (
              <p className="mt-1 text-sm text-[var(--foreground)]/70">
                Category: <span className="font-medium">{category}</span>{" "}
                <Link
                  href="/products"
                  className="underline hover:no-underline ml-2"
                >
                  Clear filter
                </Link>
              </p>
            ) : (
              <p className="mt-1 text-sm text-[var(--foreground)]/70">
                Browse our latest electronics.
              </p>
            )}
          </div>
          <Link
            href="/"
            className="text-sm font-medium underline hover:no-underline"
          >
            Back to home
          </Link>
        </header>

        {/* Empty state */}
        {!items.length && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 text-sm">
            No products found{category ? ` for “${category}”` : ""}.
          </div>
        )}

        {/* Grid */}
        {!!items.length && (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <article
                key={p.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 hover:-translate-y-0.5 hover:shadow-sm transition"
              >
                {/* image */}
                <div className="aspect-[16/10] overflow-hidden rounded-lg mb-3 border border-[var(--border)]">
                  <img
                    src={
                      p.image
                    }
                    alt={p.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* content */}
                <h2 className="text-base sm:text-lg font-semibold">{p.name}</h2>
                <p className="text-sm text-[var(--foreground)]/75 mt-1">
                  {p.description}
                </p>

                {/* footer */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-mono">
                    {formatPrice(p.price)}
                  </span>
                  <Link
                    href={`/products/${p.id}`} // detail page (we’ll build next)
                    className="px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm transition hover:-translate-y-0.5
                               text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]"
                    aria-label={`View details for ${p.name}`}
                  >
                    Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
