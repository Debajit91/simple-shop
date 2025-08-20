import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavLink({href, children}) {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(href + '/')
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? "bg-indigo-100 text-indigo-700"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
