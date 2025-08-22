import Link from "next/link";

export const metadata = { title: "Page not found — SimpleShop" };

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-mono text-[var(--foreground)]/60">Error 404</p>

          <h1
            className="mt-2 text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text"
            style={{ backgroundImage: "var(--brand-gradient)" }}
          >
            We couldn’t find that page
          </h1>

          <p className="mt-3 text-sm text-[var(--foreground)]/75">
            The link might be broken or the page may have moved.
          </p>

          {/* Quick actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold
                         border border-[var(--border)] hover:bg-[var(--background)] transition"
            >
              ← Back to Home
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold
                         text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)] shadow-sm
                         hover:-translate-y-0.5 transition"
            >
              Browse products
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold
                         border border-[var(--border)] hover:bg-[var(--background)] transition"
            >
              Contact support
            </Link>
          </div>

          {/* Optional: quick search that goes to /products?q=... */}
          <form method="get" action="/products" className="mt-8 flex items-center gap-2 justify-center">
            <label htmlFor="q" className="sr-only">Search products</label>
            <input
              id="q"
              name="q"
              placeholder="Search products…"
              className="w-64 rounded-md border border-[var(--border)] bg-[var(--background)]
                         px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            />
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 rounded-md text-sm font-semibold shadow-sm
                         text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)] transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
