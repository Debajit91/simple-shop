"use client";
import { useCart } from "./cart/cart";


export default function CartBadge() {
  const { count } = useCart();
  if (!count) return null;
  return (
    <span
      className="ml-1 inline-flex items-center justify-center rounded-full text-[10px] px-1.5 h-4
                 bg-[image:var(--brand-gradient)] text-[var(--accent-contrast)]"
      aria-live="polite"
    >
      {count}
    </span>
  );
}
