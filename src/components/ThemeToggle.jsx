"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // read initial theme from localStorage OR system
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme"); // "light" | "dark" | null
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      setIsDark(saved === "dark");
    } else {
      // fallback: system preference
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      const t = prefersDark ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", t);
      setIsDark(prefersDark);
    }
  }, []);

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIsDark(!isDark);
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="p-2 rounded-md border  border-transparent hover:border-[var(--border)]"
      >
        <div className="h-5 w-5 rounded-full bg-[var(--muted)]" />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light" : "Switch to dark"}
      className="p-2 rounded-md hover:bg-[color:var(--card)] cursor-pointer"
    >
      {isDark ? (
        /* Sun icon */
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414"/>
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        /* Moon icon */
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 1 1 8.646 3.646a7 7 0 1 0 11.708 11.708z" />
        </svg>
      )}
    </button>
  );
}
