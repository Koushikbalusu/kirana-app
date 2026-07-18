import Link from "next/link";
import { logout } from "@/actions/auth";

export function RoleShell({
  role,
  navLinks,
  userName,
  children,
}: {
  role: string;
  navLinks: { href: string; label: string }[];
  userName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-neutral-900 px-2 py-1 text-xs font-semibold text-white dark:bg-neutral-100 dark:text-neutral-900">
              {role}
            </span>
            <span className="hidden text-sm font-medium sm:inline">Kirana Commerce</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {userName && <span className="hidden text-neutral-500 sm:inline">{userName}</span>}
            <Link href="/" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
              ← Storefront
            </Link>
            {userName && (
              <form action={logout}>
                <button className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100" type="submit">
                  Log out
                </button>
              </form>
            )}
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 text-sm sm:px-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-md px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
