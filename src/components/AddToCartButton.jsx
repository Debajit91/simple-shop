"use client";
import { useState } from "react";
import { useCart } from "./cart/cart";

export default function AddToCartButton({ product, qty = 1, compact = false }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    if (!product || !product.id) return;
    addItem(product, qty);
    setAdded(true);
    // ছোট্ট ভিজ্যুয়াল ফিডব্যাক
    const t = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(t);
  }

  const btnSm =
    "inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold leading-none shadow-sm transition hover:-translate-y-0.5";
  const label = compact
    ? added
      ? "Added"
      : "Add"
    : added
    ? "Added!"
    : "Add to cart";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${btnSm} text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]`}
      aria-label={`Add ${product?.name || "item"} to cart`}
    >
      {/* ছোট আইকন + leading-none → উচ্চতা বাড়বে না */}
      {compact && !added ? (
        <span className="inline-flex items-center gap-1 leading-none">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
            <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
          </svg>
          {label}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
