import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "lib/authOptions";

export const metadata = { title: "Dashboard — SimpleShop" };
// Ensure Node runtime for Prisma/NextAuth
export const runtime = "nodejs";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?from=/dashboard");

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <nav className="space-y-1 text-sm">
            <DashLink href="/dashboard">Overview</DashLink>
            {/* <DashLink href="/dashboard/products">Products</DashLink> */}
            <DashLink href="/dashboard/products/new">Add product</DashLink>
          </nav>
        </aside>

        {/* Main */}
        <div>{children}</div>
      </div>
    </section>
  );
}

function DashLink({ href, children }) {
  // simple active state using current pathname on client
  return (
    <Link
      href={href}
      className="block rounded-md px-3 py-2 hover:bg-[var(--background)]"
    >
      {children}
    </Link>
  );
}
