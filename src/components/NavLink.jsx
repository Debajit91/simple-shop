import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NavLink({ href, children, onClick, className = "" }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  useEffect(() => {
    const update = () => setHash(window.location.hash || "");
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash || "" : "");
  }, [pathname]);

  // Parse target path + hash
  const hasHash = href.includes("#");
  let targetPath = href;
  let targetHash = "";
  if (hasHash) {
    const [p, h] = href.split("#");
    targetPath = p || pathname; // if href is just "#about", keep current path
    targetHash = h ? `#${h}` : "";
  }

  // Active logic
  let active = false;
  if (hasHash) {
    // e.g. "/#about" → active when path matches and hash matches
    const onSamePath = (targetPath || "/") === (pathname || "/");
    active = onSamePath && hash === targetHash;
  } else if (href === "/") {
    // Home is only active on "/" with NO hash
    active = pathname === "/" && hash === "";
  } else {
    active = pathname === href || pathname.startsWith(href + "/");
  }

  const base = "px-3 py-2 rounded-md text-sm font-medium transition";
  const activeClasses = "bg-[var(--foreground)] text-[var(--background)]";
  const inactiveClasses =
    "text-[var(--foreground)]/80 hover:bg-[var(--card)] hover:text-[var(--foreground)]";

  // External / special protocols should use <a>
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isExternal || href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`${base} ${
          active ? activeClasses : inactiveClasses
        } ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${
        active ? activeClasses : inactiveClasses
      } ${className}`}
    >
      {children}
    </Link>
  );
}
