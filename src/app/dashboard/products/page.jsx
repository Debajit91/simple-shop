import { getServerSession } from "next-auth";
import { prisma } from "lib/prisma";
import Link from "next/link";
import { authOptions } from "lib/authOptions";

export const runtime = "nodejs";
export const metadata = { title: "My products — Dashboard" };

export default async function DashboardProducts({ searchParams }) {
  const session = await getServerSession(authOptions);
  // only my products (createdById)
  const rows = await prisma.product.findMany({
    where: { ownerEmail: session.user.email },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">My products</h1>
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center px-3 py-2 rounded-md text-sm font-semibold
                     text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]"
        >
          + Add product
        </Link>
      </div>

      {!rows.length ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 text-sm">
          You haven’t added any products yet.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(p => (
            <li key={p.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="aspect-[16/10] overflow-hidden rounded-md border border-[var(--border)] mb-3">
                <img src={p.image || ""} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-[var(--foreground)]/70 line-clamp-2">{p.description}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-mono">৳{p.price}</span>
                <Link href={`/products/${p.slug}`} className="text-xs underline">View</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
