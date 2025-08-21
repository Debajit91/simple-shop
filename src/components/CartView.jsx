"use client";
import Link from "next/link";
import { useCart } from "./cart/cart";

function formatPrice(n) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n||0));
  } catch {
    return `$${Number(n||0).toFixed(2)}`;
  }
}

export default function CartView() {
  const { items, increment, decrement, removeItem, clear, subtotal } = useCart();

  if (!items.length) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 text-sm">
        Your cart is empty. <Link href="/products" className="underline hover:no-underline ml-1">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* list */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((it) => (
          <div key={it.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 flex gap-4">
            <div className="h-24 w-32 rounded-md overflow-hidden border border-[var(--border)]">
              <img
                src={it.image || "https://picsum.photos/seed/simpleshop-card/400/250"}
                alt={it.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{it.name}</h3>
                  <div className="text-sm text-[var(--foreground)]/70">Unit: {formatPrice(it.price)}</div>
                </div>
                <button
                  onClick={() => removeItem(it.id)}
                  className="text-sm underline hover:no-underline"
                  aria-label={`Remove ${it.name}`}
                >
                  Remove
                </button>
              </div>

              {/* qty controls */}
              <div className="mt-3 flex items-center gap-3">
                <div className="inline-flex items-center rounded-md border border-[var(--border)]">
                  <button onClick={() => decrement(it.id)} className="px-2 py-1">−</button>
                  <span className="px-3 select-none">{it.qty}</span>
                  <button onClick={() => increment(it.id)} className="px-2 py-1">+</button>
                </div>
                <div className="text-sm text-[var(--foreground)]/80">
                  Line total: <span className="font-mono">{formatPrice(it.price * it.qty)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div>
          <button onClick={clear} className="text-sm underline hover:no-underline">Clear cart</button>
        </div>
      </div>

      {/* summary */}
      <aside className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 h-fit">
        <h2 className="text-lg font-semibold mb-3">Order summary</h2>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Subtotal</span>
          <span className="font-mono">{formatPrice(subtotal)}</span>
        </div>
        <p className="text-xs text-[var(--foreground)]/70 mb-4">Taxes & shipping calculated at checkout.</p>
        <button
          type="button"
          disabled
          title="Checkout coming soon"
          className="w-full px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition
                     text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)] disabled:opacity-60"
        >
          Checkout
        </button>
      </aside>
    </div>
  );
}
