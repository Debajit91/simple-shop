"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        {/* Left: content */}
        <div className="space-y-6">
          {/* badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border border-[var(--border)]">
            <span className="h-2 w-2 rounded-full bg-[image:var(--brand-gradient)]" />
            New arrivals in tech
          </div>

          {/* headline */}
          <h1 id="hero-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Premium electronics,{" "}
            <span className="text-transparent bg-clip-text bg-[image:var(--brand-gradient)]">
              delivered with care
            </span>
            .
          </h1>

          {/* subheadline */}
          <p className="text-base sm:text-lg text-justify text-[var(--foreground)]/80">
            Shop curated laptops, tablets, wearables, and professional cameras. Transparent pricing,
            quick checkout, and responsive support — built for a seamless experience across devices.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition hover:-translate-y-0.5
                         text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]"
            >
              Shop products
            </Link>
            <a
              href="#categories"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-[var(--border)] hover:bg-[var(--card)] transition"
            >
              Explore categories
            </a>
          </div>

          {/* trust row */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-[var(--foreground)]/70">
            <li className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6l-9-4zm0 4 6 2v4c0 3.9-2.8 7.2-6 8-3.2-.8-6-4.1-6-8V8l6-2z" />
              </svg>
              Secure checkout
            </li>
            <li className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M3 7h18l-2 9H5L3 7zm5 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 16 18z" />
              </svg>
              Fast delivery options
            </li>
            <li className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 6v6h6v2H10V6h2zM6 4h12a2 2 0 0 1 2 2v12l-4-3-4 3-4-3-4 3V6a2 2 0 0 1 2-2z" />
              </svg>
              7-day easy returns
            </li>
          </ul>
        </div>

        {/* Right: visual */}
        <div className="relative">
          <div className="rounded-xl border border-[var(--border)] p-4 sm:p-5 bg-[var(--card)] max-w-xl ml-auto">
            <div className="aspect-[16/10] overflow-hidden rounded-lg mb-4 border border-[var(--border)]">
              <img
                src="https://i.ibb.co.com/Ngn1VjT6/smart-watch.jpg?w=1200&q=80&auto=format&fit=crop"   /* ← use your professional image URL */
                alt="Featured product assortment"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/simpleshop-hero/1200/675";
                }}
              />
            </div>
            <div className="text-sm text-[var(--foreground)]/75">
              High-resolution imagery and consistent presentation across categories.
            </div>
          </div>

          <div className="absolute -z-10 blur-3xl rounded-full opacity-30 w-56 h-56 right-4 -top-6 bg-[image:var(--brand-gradient)]" />
        </div>
      </div>
    </section>
  );
}
