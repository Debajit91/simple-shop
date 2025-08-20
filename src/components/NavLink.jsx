import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavLink({href, children, onClick}) {
    const pathname = usePathname();
  const isHome = href === "/";
  const active =
    (isHome && pathname === "/") || (!isHome && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "px-3 py-2 rounded-md text-sm font-medium transition",
        active
          ? "bg-[var(--card)] text-[var(--foreground)]"
          : "text-[color:var(--foreground)]/80 hover:bg-[var(--foreground)] hover:text-[var(--background)]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
