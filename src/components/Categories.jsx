import Link from "next/link";

const categories = [
  {
    slug: "smartwatch",
    title: "Smart Watch",
    image: "https://i.ibb.co.com/Ngn1VjT6/smart-watch.jpg"
  },
  {
    slug: "laptop",
    title: "Laptop",
    image: "https://i.ibb.co.com/dsC9cC86/laptop.jpg"
  },
  {
    slug: "earbuds",
    title: "Airpods / Earbuds",
    image: "https://i.ibb.co.com/TD8ySrxV/airpods.jpg"
  },
  {
    slug: "tablet",
    title: "iPad / Tablet",
    image: "https://i.ibb.co.com/zh4L271j/ipad.jpg"
  },
  {
    slug: "camera",
    title: "Camera",
    image: "https://i.ibb.co.com/4w4p4dQD/canon.jpg"
  },
  {
    slug: "video-camera",
    title: "Video Camera",
    image: "https://i.ibb.co.com/CpDtRsF8/video-camera.jpg"
  }
];

export default function Categories() {
  return (
    <section id="categories" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Shop By Category</h2>
          <Link
            href="/products"
            className="text-sm font-medium underline hover:no-underline"
          >
            View all products
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${encodeURIComponent(c.slug)}`}
              className="group rounded-xl border overflow-hidden hover:-translate-y-0.5 hover:shadow-sm transition"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
              aria-label={`Browse ${c.title}`}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover transition group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flex items-center justify-between p-4">
                <h3 className="text-base sm:text-lg font-semibold">{c.title}</h3>
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundImage: "var(--brand-gradient)" }}
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
