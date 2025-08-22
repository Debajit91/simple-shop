"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("demo@simpleshop.dev");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const callbackUrl = "/products";

  const inputCls =
    "w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 mb-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40";

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", { email, password, redirect: true, callbackUrl });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Email+Password */}
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium mb-1">Email</label>
          <input
            type="email"
            required
            className={inputCls}
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Password</label>
          <input
            type="password"
            required
            className={inputCls}
            placeholder="Enter Your Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer px-4 py-2 rounded-md text-sm mb-5 font-semibold
             text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)] bg-[length:200%_200%] bg-[position:0%_50%]
             hover:bg-[position:100%_50%]
             transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
             active:translate-y-0 active:brightness-95
             disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>

      {/* OR */}
      <div className="relative my-2">
        <hr className="border-[var(--border)] mb-6" />
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--card)] px-2 text-xs text-[var(--foreground)]/60">
          OR
        </span>
      </div>

      {/* Google sign-in */}
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl })}
        className="w-full px-4 py-2 rounded-md text-sm font-semibold border border-[var(--border)] hover:bg-[var(--background)] cursor-pointer transition mb-5"
      >
        Continue with Google
      </button>

      {/* Sign up link */}
      <p className="text-sm text-[var(--foreground)]/70 text-center">
        Don’t have an account?{" "}
        <Link href="/signup" >
          Please <span className="underline hover:no-underline text-blue-500">Sign Up</span>
        </Link>
        .
      </p>
    </div>
  );
}
