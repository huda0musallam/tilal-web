import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeStyles = cva("inline-flex items-center justify-center gap-1 rounded-badge font-medium", {
  variants: {
    variant: {
      soft: "border border-line bg-muted-surface text-muted-ink",
      strong: "bg-strong-surface text-ink",
      inverse: "bg-inverse-surface text-on-inverse",
      count: "bg-primary text-on-primary",
    },
    size: {
      sm: "h-5 min-w-5 px-1 text-xs tabular-nums",
      md: "px-3 py-1 text-sm",
    },
  },
  defaultVariants: {
    variant: "soft",
    size: "md",
  },
});

export type BadgeVariant = NonNullable<VariantProps<typeof badgeStyles>["variant"]>;

interface BadgeProps extends ComponentProps<"span">, VariantProps<typeof badgeStyles> {}

export default function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeStyles({ variant, size }), className)} {...props} />;
}
