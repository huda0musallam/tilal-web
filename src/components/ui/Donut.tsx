import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const donutStyles = cva(
  "relative grid place-items-center rounded-full after:absolute after:rounded-full",
  {
    variants: {
      size: {
        md: "size-42.5 after:inset-6",
        lg: "size-47.5 after:inset-6.5",
      },
      hole: {
        muted: "after:bg-muted-surface",
        primary: "after:bg-primary",
      },
    },
    defaultVariants: {
      size: "md",
      hole: "muted",
    },
  },
);

const donutLabelStyles = cva("relative z-1 font-bold", {
  variants: {
    size: {
      md: "text-xl",
      lg: "text-2xl",
    },
    hole: {
      muted: "text-ink",
      primary: "text-on-primary",
    },
  },
  defaultVariants: {
    size: "md",
    hole: "muted",
  },
});

interface DonutProps extends ComponentProps<"div">, VariantProps<typeof donutStyles> {}

export default function Donut({ className, size, hole, children, ...props }: DonutProps) {
  return (
    <div className={cn(donutStyles({ size, hole }), className)} {...props}>
      <span className={donutLabelStyles({ size, hole })}>{children}</span>
    </div>
  );
}
