"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const LS_KEY = "simpleshop-cart-v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id,name,price,image,qty}]

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  // actions
  function addItem(product, qty = 1) {
    const id = String(product.id);
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      const { name, price, image } = product;
      return [...prev, { id, name, price: Number(price || 0), image, qty }];
    });
  }
  function increment(id) {
    setItems((prev) =>
      prev.map((it) => (it.id === String(id) ? { ...it, qty: it.qty + 1 } : it))
    );
  }
  function decrement(id) {
    setItems((prev) =>
      prev
        .map((it) =>
          it.id === String(id) ? { ...it, qty: Math.max(1, it.qty - 1) } : it
        )
        .filter(Boolean)
    );
  }
  function removeItem(id) {
    setItems((prev) => prev.filter((it) => it.id !== String(id)));
  }
  function clear() {
    setItems([]);
  }

  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  const value = { items, addItem, increment, decrement, removeItem, clear, count, subtotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
