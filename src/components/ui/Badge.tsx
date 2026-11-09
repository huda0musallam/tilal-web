import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeStyles = cva("inline-flex items-center justify-center gap-1 rounded-xl font-medium", {
  variants: {
    variant: {
      light: "border border-sand bg-section ps-3 pe-3 pt-1 pb-1 text-sm text-coffee",
      medium: "bg-sand ps-3 pe-3 pt-1 pb-1 text-sm text-espresso",
      dark: "bg-coffee ps-3 pe-3 pt-1 pb-1 text-sm text-bg",
      count: "h-5 min-w-5 bg-olive ps-1 pe-1 text-xs text-bg tabular-nums",
    },
  },
  defaultVariants: {
    variant: "count",
  },
});

interface BadgeProps extends ComponentProps<"span">, VariantProps<typeof badgeStyles> {}

export default function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeStyles({ variant }), className)} {...props} />;
}
