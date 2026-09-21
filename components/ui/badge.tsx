import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex h-6 w-fit shrink-0 items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-transparent",
        secondary: "bg-secondary text-secondary-foreground border-transparent",
        outline: "border-border bg-background text-foreground",
        ghost: "text-foreground hover:bg-muted",
        destructive: "bg-destructive text-white border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const colorClasses = {
  default: "",
  info: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  success:
    "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
  warning:
    "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  danger: "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
  secondary: "bg-secondary text-secondary-foreground border-transparent",
} as const;

interface BadgeProps
  extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  label?: string;
  color?: keyof typeof colorClasses;
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  label,
  color = "default",
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), colorClasses[color], className)}
      {...props}
    >
      {label ?? children}
    </Comp>
  );
}

export { Badge, badgeVariants };
