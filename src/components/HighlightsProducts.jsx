import Link from "next/link";
import { getProducts } from "../../lib/products";


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

export default async function HighlightsProducts() {
  const all = await getProducts();

  // Option A: প্রথম ৩টা দেখাও
  const items = all.slice(0, 3);

  // Option B (পরে চাইলে): featured ফিল্টার
  // const items = all.filter(p => p.featured).slice(0, 3);

  if (!items.length) {
    return (
      <section id="highlights" className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Product highlights</h2>
          <p className="text-[color:var(--foreground)]/75">No products yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="highlights" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Product highlights</h2>
          <Link
            href="/products"
            className="text-sm font-medium underline hover:no-underline"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border p-3 sm:p-4 hover:-translate-y-0.5 hover:shadow-sm transition"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div
                className="aspect-[16/10] overflow-hidden rounded-lg border mb-3"
                style={{ borderColor: "var(--border)" }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className="text-base sm:text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-[color:var(--foreground)]/75 mt-1 line-clamp-2">
                {p.description}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-mono">{formatPrice(p.price)}</span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/products/${p.id}`}
                    className="px-3 py-1.5 rounded-md text-xs font-medium border hover:bg-[var(--background)] transition"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                    aria-label={`View details for ${p.name}`}
                  >
                    Details
                  </Link>
                  <Link
                    href={`/products/${p.id}`}
                    className="px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm hover:-translate-y-0.5 transition"
                    style={{
                      backgroundImage: "var(--brand-gradient)",
                      color: "var(--accent-contrast)",
                    }}
                    aria-label={`Buy ${p.name}`}
                  >
                    Buy
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
