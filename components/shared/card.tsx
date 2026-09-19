import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-default bg-surface p-6 transition-all duration-300 hover:bg-surface-hover hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}