import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Product not found</h1>
        <p className="mt-2 text-[var(--foreground)]/75">
          The item you’re looking for doesn’t exist or may have been removed.
        </p>
        <div className="mt-4">
          <Link href="/products" className="underline hover:no-underline">
            Back to products
          </Link>
        </div>
      </div>
    </section>
  );
}
