import { cn } from "@/lib/utils";

export function DocsText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-base leading-7 text-zinc-600 dark:text-zinc-400",
        className,
      )}
    >
      {children}
    </p>
  );
}
