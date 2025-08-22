"use client";

import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink"; // তোমার আগের NavLink (active state-সহ)
import Image from "next/image";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  // Navbar item-এর ইনঅ্যাক্টিভ স্টাইল (NavLink-এর inactive স্টাইলের সাথে ম্যাচ করানো)
  const navBtnCls =
    "px-3 py-2 cursor-pointer rounded-md text-sm font-medium transition text-[var(--foreground)]/80 hover:bg-[var(--card)] hover:text-[var(--foreground)]";

  // লোডিং কালে কিছু না দেখালেও হবে
  if (status === "loading") return null;

  // লগইন না করা → Login লিংক দেখাই (active state পেতে NavLink ব্যবহার)
  if (!session) {
    return <NavLink href="/login">Login</NavLink>;
  }

  // লগইন করা → ছোট অ্যাভাটার (থাকলে) + Logout বাটন
  const user = session.user || {};
  const firstName = (user.name || "").split(" ")[0];

  return (
    <div className="flex items-center gap-2">
      {/* optional avatar/name */}
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name || "User"}
          width={24}
          height={24}
          className="rounded-full"
        />
      ) : null}
      {firstName ? (
        <span className="text-sm text-[var(--foreground)]/70 hidden sm:inline">
          Hi, {firstName}
        </span>
      ) : null}

      {/* Logout as a button with nav look */}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })} // লগআউটের পর হোমে বা চাইলে "/login"
        className={navBtnCls}
      >
        Logout
      </button>
    </div>
  );
}
