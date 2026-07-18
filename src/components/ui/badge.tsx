import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "default"
          ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
          : "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300",
        className
      )}
    >
      {children}
    </span>
  );
}
