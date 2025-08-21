import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        {/* Left: copy */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border border-[var(--border)]">
            <span className="h-2 w-2 rounded-full bg-[image:var(--brand-gradient)]" />
            About SimpleShop
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
            Trusted quality. Designed to convert.
          </h2>

          <p className="text-[var(--foreground)]/80">
            SimpleShop is a modern destination for premium electronics. We pair
            precise product presentation with fast, consistent performance so
            you can discover the right device quickly and purchase with
            confidence. Every touchpoint is built for clarity, accessibility,
            and speed—on mobile and desktop.
          </p>

          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span
                className="mt-0.5 h-4 w-4 bg-green-500 rounded-sm"
                aria-hidden="true"
              />
              Consistent, high-resolution imagery and responsive layouts for
              clear product comparison.
            </li>
            <li className="flex items-start gap-2">
              <span
                className="mt-0.5 h-4 w-4 bg-green-500 rounded-sm"
                aria-hidden="true"
              />
              Private, secure account access and a streamlined checkout built
              for customer confidence.
            </li>
            <li className="flex items-start gap-2">
              <span
                className="mt-0.5 h-4 w-4 bg-green-500 rounded-sm"
                aria-hidden="true"
              />
              Reliable performance and scalable infrastructure to keep your
              experience fast—24/7.
            </li>
          </ul>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition hover:-translate-y-0.5
                         text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]"
            >
              Browse products
            </Link>
            <a
              href="#faq"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-[var(--border)] hover:bg-[var(--card)] transition"
            >
              Read FAQ
            </a>
          </div>
        </div>

        {/* Right: image card */}
        <div className="relative">
          <div className="rounded-xl border border-[var(--border)] p-4 sm:p-5 bg-[var(--card)] max-w-xl ml-auto">
            <div className="aspect-[16/10] overflow-hidden rounded-lg mb-4 border border-[var(--border)]">
              <img
                src="https://i.ibb.co.com/Mx07YCg3/about.jpg" /* replace with brand imagery when ready */
                alt="Modern storefront preview"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="text-sm font-semibold text-transparent bg-clip-text bg-[image:var(--brand-gradient)]">
              Premium tech. Zero friction.
            </div>
          </div>

          <div className="absolute -z-10 blur-3xl rounded-full opacity-30 w-56 h-56 right-4 -top-6 bg-[image:var(--brand-gradient)]" />
        </div>
      </div>
    </section>
  );
}
