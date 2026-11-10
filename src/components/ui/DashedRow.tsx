import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const dashedRowStyles = cva("border-dashed border-line", {
  variants: {
    sides: {
      top: "flex items-center justify-between border-t border-x-0 border-b-0 pt-4",
      block: "grid border-y border-x-0 py-3",
    },
  },
  defaultVariants: {
    sides: "top",
  },
});

interface DashedRowProps extends ComponentProps<"div">, VariantProps<typeof dashedRowStyles> {}

export default function DashedRow({ className, sides, ...props }: DashedRowProps) {
  return <div className={cn(dashedRowStyles({ sides }), className)} {...props} />;
}
