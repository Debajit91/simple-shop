"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Text content */}
        <div className="space-y-5">
          {/* Tiny badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundImage: "var(--brand-gradient)" }}
            />
            New: Simple & secure product browsing
          </div>

          {/* Headline */}
          <h1
            id="hero-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
          >
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "var(--brand-gradient)" }}
            >
              Build. Browse. Buy.
            </span>{" "}
            with SimpleShop
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[color:var(--foreground)]/80">
            Explore products SimpleShop. Log in later to manage items—today,
            just enjoy the browsing experience.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold shadow-sm hover:-translate-y-0.5 transition"
              style={{
                backgroundImage: "var(--brand-gradient)",
                color: "var(--accent-contrast)",
              }}
            >
              Browse Products
            </Link>

            <a
              href="#highlights"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border hover:bg-[var(--card)] transition"
              style={{ borderColor: "var(--border)" }}
            >
              See highlights
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-3 pt-3">
            {/* Star icon */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <p className="text-sm text-[color:var(--foreground)]/70">
              Browse Products & Stay with Us.
            </p>
          </div>
        </div>

        {/* Right: visual mock card */}
        <div className="relative">
          <div
            className="rounded-xl border shadow-sm p-4 sm:p-5 max-w-md ml-auto"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            {/* Fake product card */}
            <div
              className="aspect-[16/10] overflow-hidden rounded-lg mb-4 border"
              style={{ borderColor: "var(--border)" }}
            >
              {/* ইমেজের বদলে ইমোজি/গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড */}
              <div
                className="w-full h-full grid place-items-center text-6xl select-none"
                style={{
                  backgroundImage: "var(--brand-gradient)",
                  color: "var(--accent-contrast)",
                }}
              >
                <img
                  src="https://i.ibb.co.com/Ngn1VjT6/smart-watch.jpg?w=1200&q=80&auto=format&fit=crop"
                  alt="Featured product preview"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    // fallback (optional)
                    e.currentTarget.src =
                      "https://picsum.photos/seed/simpleshop-hero/1200/675";
                  }}
                />
              </div>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">Widget Pro</div>
                <div className="text-sm text-[color:var(--foreground)]/70">
                  A handy widget for everyday tasks
                </div>
              </div>
              
            </div>

            {/* <div className="mt-4 flex gap-2">
              <button
                className="px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm hover:-translate-y-0.5 transition"
                style={{
                  backgroundImage: "var(--brand-gradient)",
                  color: "var(--accent-contrast)",
                }}
              >
                Add to cart
              </button>
              <button
                className="px-3 py-1.5 rounded-md text-xs font-medium border hover:bg-[var(--background)] transition"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                Details
              </button>
            </div> */}
          </div>

          {/* floating glow */}
          <div
            className="absolute -z-10 blur-3xl rounded-full opacity-30 w-56 h-56 right-4 -top-6"
            style={{ backgroundImage: "var(--brand-gradient)" }}
          />
        </div>
      </div>
    </section>
  );
}
