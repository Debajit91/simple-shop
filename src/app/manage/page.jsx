import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import { redirect } from "next/navigation";
import ManageForm from "./ManageForm";

export const metadata = { title: "Manage products — SimpleShop" };

export default async function ManagePage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?from=/manage");

  const sp = await searchParams;
  const added = sp?.added === "1";

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Product Management</h1>
        <p className="mt-1 text-sm text-[var(--foreground)]/70">
          Create new products.
        </p>

        {added ? (
          <div className="mt-4 rounded-md border border-green-300/60 bg-green-50/60 p-3 text-sm text-green-700">
            Product added successfully.
          </div>
        ) : null}

        <ManageForm />
      </div>
    </section>
  );
}
