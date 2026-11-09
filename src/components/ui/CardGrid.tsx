import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const cardGridStyles = cva("mx-auto grid grid-cols-1", {
  variants: {
    layout: {
      fluid3: "max-w-105 gap-7 sm:mx-0 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3",
      fluid4: "max-w-105 gap-5 sm:mx-0 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4",
      wide3: "max-w-105 gap-7 lg:mx-0 lg:max-w-none lg:grid-cols-3",
      wide2: "max-w-180 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-2",
      full3: "gap-7 sm:grid-cols-2 lg:grid-cols-3",
      split: "gap-7 lg:grid-cols-2 lg:items-start lg:gap-14",
    },
  },
  defaultVariants: {
    layout: "fluid3",
  },
});

interface CardGridProps extends ComponentProps<"div">, VariantProps<typeof cardGridStyles> {}

export default function CardGrid({ className, layout, ...props }: CardGridProps) {
  return <div className={cn(cardGridStyles({ layout }), className)} {...props} />;
}
