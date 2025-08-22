export default function DashboardHome() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <h1 className="text-2xl font-extrabold">Welcome to your dashboard</h1>
      <p className="mt-2 text-sm text-[var(--foreground)]/70">
        Manage your products, orders and profile settings from here.
      </p>
    </div>
  );
}
