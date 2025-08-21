"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";

export default function Navbar({RightSlot}) {
  const [open, setOpen] = useState(false);

  return (
     <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        borderColor: "var(--border)",
        // কাঁচের মতো হেডার: ব্যাকগ্রাউন্ড var + হালকা ট্রান্সপারেন্সি
        background: "color-mix(in oklab, var(--background) 88%, transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Brand: gradient text */}
          <Link href="/" className="text-lg font-extrabold tracking-tight select-none">
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "var(--brand-gradient)" }}
            >
              Simple
            </span>
            <span>Shop</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/#about">About Us</NavLink>

            <div className="w-2" />
            {RightSlot}

            <Link
              href="/login"
              className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium border transition hover:-translate-y-0.5 hover:shadow-sm"
              style={{
                borderColor: "var(--border)",
                backgroundImage: "var(--brand-gradient)",
                color: "var(--accent-contrast)",
              }}
            >
              Login
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded hover:bg-[var(--card)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="md:hidden px-4 pb-4 pt-1 flex flex-col gap-2 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[color:var(--muted)]">Menu</span>
            {RightSlot}
          </div>
          <NavLink href="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink href="/products" onClick={() => setOpen(false)}>Products</NavLink>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-md text-sm font-medium border transition hover:-translate-y-0.5 hover:shadow-sm"
            style={{
              borderColor: "var(--border)",
              backgroundImage: "var(--brand-gradient)",
              color: "var(--accent-contrast)",
            }}
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
}
