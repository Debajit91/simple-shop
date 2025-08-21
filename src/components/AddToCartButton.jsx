"use client";
import { useCart } from "./cart/cart";

export default function AddToCartButton({ product, qty = 1 }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(product, qty)}
      className="px-4 py-2 cursor-pointer rounded-md text-sm font-semibold shadow-sm transition
                 hover:-translate-y-0.5
                 text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]"
      aria-label={`Add ${product?.name || "item"} to cart`}
    >
      Add to cart
    </button>
  );
}
