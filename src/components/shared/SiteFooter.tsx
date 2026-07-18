import Link from "next/link";

const roleLinks = [
  { href: "/admin", label: "Store Admin" },
  { href: "/delivery", label: "Delivery Partner" },
  { href: "/superadmin", label: "Superadmin" },
  { href: "/download-app", label: "Download Android App" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-neutral-500 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} Kirana Commerce — digitizing your local store.
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {roleLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
