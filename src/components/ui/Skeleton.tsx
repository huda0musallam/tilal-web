import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const skeletonStyles = cva("", {
  variants: {
    variant: {
      muted: "animate-shimmer bg-muted-surface",
      strong: "animate-shimmer-soft bg-strong-surface",
    },
  },
  defaultVariants: {
    variant: "muted",
  },
});

interface SkeletonProps extends ComponentProps<"div">, VariantProps<typeof skeletonStyles> {}

export default function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return <div className={cn(skeletonStyles({ variant }), className)} {...props} />;
}
