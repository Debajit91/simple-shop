"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* brand / logo */}
          <Link href="/" className="text-lg font-bold text-gray-700">
            Simple<span className="text-indigo-600">Shop</span>
          </Link>

          {/* desktop links */}
          <nav className="hidden md:flex gap-4 items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <Link
              href="/login"
              className="ml-4 px-3 py-2 rounded-md border text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>
          </nav>

          {/* mobile toggle */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <Link
            href="/login"
            className="px-3 py-2 rounded-md border text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
}
