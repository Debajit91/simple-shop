"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";
import CartBadge from "./CartBadge";

export default function Navbar({ RightSlot }) {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession(); // ← v4
  const user = session?.user;
  const firstName = user?.name?.split(" ")?.[0] || "";

  // logout helper (mobile-এ মেনু বন্ধ করেও দিচ্ছি)
  const handleLogout = async () => {
    setOpen(false);
    await signOut({ callbackUrl: "/" }); // চাইলে "/login" দিতে পারো
  };

  // common gradient button style (তোমার Login বাটনের মতোই)
  const gradientBtnCls =
    "ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium border transition hover:-translate-y-0.5 hover:shadow-sm";
  const gradientBtnStyle = {
    borderColor: "var(--border)",
    backgroundImage: "var(--brand-gradient)",
    color: "var(--accent-contrast)",
  };

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--background) 88%, transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="text-lg font-extrabold tracking-tight select-none">
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--brand-gradient)" }}>
              Simple
            </span>
            <span>Shop</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/#about">About Us</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            {session && <NavLink href='/manage'>Add Product</NavLink>}
            <NavLink href="/cart">
              Cart <CartBadge />
            </NavLink>

            <div className="w-2" />
            {RightSlot}

            {/* Auth area: loading অবস্থায় কিছু না দেখালেও হবে */}
            {status !== "loading" && (
              !session ? (
                // Logged out → Login
                <Link href="/login" className={gradientBtnCls} style={gradientBtnStyle}>
                  Login
                </Link>
              ) : (
                // Logged in → avatar/name + Logout
                <div className="ml-2 inline-flex items-center gap-2">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : null}
                  {firstName ? (
                    <span className="text-sm text-[var(--foreground)]/70 hidden sm:inline">Hi, {firstName}</span>
                  ) : null}
                  <button type="button" onClick={handleLogout} className={gradientBtnCls} style={gradientBtnStyle}>
                    Logout
                  </button>
                </div>
              )
            )}
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
        <nav className="md:hidden px-4 pb-4 pt-1 flex flex-col gap-2 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[color:var(--muted)]">Menu</span>
            {RightSlot}
          </div>
          <NavLink href="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink href="/products" onClick={() => setOpen(false)}>Products</NavLink>
          <NavLink href="/#about" onClick={() => setOpen(false)}>About Us</NavLink>
          <NavLink href="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
          {session && <NavLink href='/manage'>Add Product</NavLink>}
          <NavLink href="/cart" onClick={() => setOpen(false)}>Cart</NavLink>

          {/* Auth in mobile */}
          {status !== "loading" && (
            !session ? (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium border transition hover:-translate-y-0.5 hover:shadow-sm"
                style={gradientBtnStyle}
              >
                Login
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium border transition hover:-translate-y-0.5 hover:shadow-sm"
                style={gradientBtnStyle}
              >
                Logout
              </button>
            )
          )}
        </nav>
      )}
    </header>
  );
}
