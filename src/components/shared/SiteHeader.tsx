"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useTranslation } from "@/i18n";
import { useCartStore } from "@/stores/cartStore";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const itemCount = useCartStore((s) => s.lines.reduce((n, l) => n + l.quantity, 0));

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/orders", label: t.nav.orders },
    { href: "/download-app", label: t.nav.downloadApp },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {t.appName}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link href="/cart" className="relative rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-900 px-1 text-[10px] text-white dark:bg-neutral-100 dark:text-neutral-900">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-neutral-200 px-4 py-2 text-sm dark:border-neutral-800 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-2 py-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
