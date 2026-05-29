"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { useCart } from "./CartProvider";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/admin", label: "Admin" }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="glass-nav sticky top-0 z-40 border-b border-white/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-ink via-slate-700 to-accent-blue text-sm text-white shadow-soft">
            TD
          </span>
          <span className="text-lg">TrendDrop</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded-md px-3 py-2 text-sm font-medium transition hover:bg-white hover:shadow-sm",
                pathname === item.href ? "bg-white text-accent-blue shadow-sm" : "text-slate-600"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            aria-label="Open admin dashboard"
            className="hidden h-10 w-10 place-items-center rounded-md border border-line bg-white/70 text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-sm sm:grid"
          >
            <BarChart3 size={18} />
          </Link>
          <Link
            href="/cart"
            aria-label="Open cart"
            className="shine-button relative grid h-10 w-10 place-items-center rounded-md bg-ink text-white transition hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-soft"
          >
            <ShoppingBag size={18} />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent-emerald px-1 text-[11px] font-semibold text-white">
                {itemCount}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-md border border-line bg-white/70 transition hover:bg-white md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-line bg-white/95 px-4 py-3 shadow-soft backdrop-blur md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
