import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
        brand:
          "bg-[var(--color-brand)] text-[var(--color-brand-foreground)]",
        accent:
          "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]",
        outline:
          "border border-[var(--color-border)] text-[var(--color-foreground)]",
        success:
          "bg-[var(--color-success)]/10 text-[var(--color-success)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
