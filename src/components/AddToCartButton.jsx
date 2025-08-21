"use client";
import { useState } from "react";
import { useCart } from "./cart/cart";
import Swal from "sweetalert2";

export default function AddToCartButton({ product, qty = 1, compact = false }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1600,
    timerProgressBar: true,
  });

  function handleClick() {
    // বেসিক ভ্যালিডেশন
    const valid =
      product &&
      product.id != null &&
      Number.isFinite(Number(product.price)) &&
      Number(qty) > 0;

    if (!valid) {
      Toast.fire({
        icon: "error",
        title: "This Item was Failed to Add",
      });
      return;
    }
    const existed = items.some((it) => it.id === String(product.id));

    try {
      addItem(product, qty);

      Toast.fire({
        icon: "success",
        title: existed ? "Quantity of the Item Updated" : "This Item is Added to the Cart",
      });

      // ছোট ভিজ্যুয়াল ফিডব্যাক (label “Added”)
      setAdded(true);
      const t = setTimeout(() => setAdded(false), 1200);
      return () => clearTimeout(t);
    } catch (e) {
      Toast.fire({
        icon: "error",
        title: "কিছু ভুল হয়েছে, আবার চেষ্টা করুন",
      });
    }
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
      className={`${btnSm} cursor-pointer text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]`}
      aria-label={`Add ${product?.name || "item"} to cart`}
    >
      {/* ছোট আইকন + leading-none → উচ্চতা বাড়বে না */}
      {compact ? (
        <span className="inline-flex items-center gap-1 leading-none">
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3"
            fill="currentColor"
            aria-hidden="true"
          >
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
