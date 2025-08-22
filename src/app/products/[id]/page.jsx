import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "lib/prisma";

// দাম ফরম্যাটার (আগেরটা-ই)
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



// ✅ SEO: ডাইনামিক টাইটেল/ডেস্ক্রিপশন
export async function generateMetadata({ params }) {
  const { id } = await params;
  // NOTE: getProduct server-side, তাই এখানে ব্যবহার করা safe
  // (ইচ্ছা হলে try/catch দিয়ে সেফটি রাখতে পারেন)
  try {
    const p = await prisma.product(id);
    if (!p) return { title: "Product not found — Simple Shop" };
    return {
      title: `${p.name} — Simple Shop`,
      description: p.description || "View product details.",
      openGraph: {
        title: `${p.name} — Simple Shop`,
        description: p.description || "",
        images: p.image ? [{ url: p.image, width: 1200, height: 675 }] : [],
      },
    };
  } catch {
    return { title: "Product — Simple Shop" };
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params; // URL থেকে ডাইনামিক সেগমেন্ট (/products/[id])
  const p = await prisma.product.findUnique({ where: { id } }); // data/products.json থেকে একক প্রোডাক্ট

  if (!p) notFound(); // না পেলে 404 ট্রিগার

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-[var(--foreground)]/70">
            <li>
              <Link href="/" className="underline hover:no-underline">
                Home
              </Link>
            </li>
            <li>›</li>
            <li>
              <Link href="/products" className="underline hover:no-underline">
                Products
              </Link>
            </li>
            <li>›</li>
            <li className="text-[var(--foreground)]">{p.name}</li>
          </ol>
        </nav>

        {/* content */}
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* left: image */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5">
            <div className="aspect-[16/10] overflow-hidden rounded-lg border border-[var(--border)]">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          {/* right: info */}
          <div>
            {/* title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              {p.name}
            </h1>

            {/* category badge (optional) */}
            {p.category && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border border-[var(--border)]">
                <span className="h-2 w-2 rounded-full bg-[image:var(--brand-gradient)]" />
                {p.category}
              </div>
            )}

            {/* price */}
            <div className="mt-4 text-2xl font-mono">
              {formatPrice(p.price)}
            </div>

            {/* description */}
            <p className="mt-4 text-[var(--foreground)]/80 text-base">
              {p.description}
            </p>

            {/* actions */}
            <div className="mt-6 flex gap-3">
              <AddToCartButton
                product={{
                  id: p.id,
                  name: p.name,
                  price: p.price,
                  image: p.image,
                }}
               />
              <Link
                href="/products"
                className="px-4 py-2 rounded-md text-sm font-medium border border-[var(--border)] hover:bg-[var(--card)] transition"
              >
                Back to products
              </Link>
            </div>

            {/* small meta (optional) */}
            <div className="mt-6 text-sm text-[var(--foreground)]/70">
              ID: {p.id}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
