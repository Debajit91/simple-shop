import ManageForm from "@/app/manage/ManageForm"; // reuse the same form
export const metadata = { title: "Add product — Dashboard" };

export default function NewProductPage() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <h1 className="text-xl font-bold">Add product</h1>
      <ManageForm />
    </div>
  );
}
