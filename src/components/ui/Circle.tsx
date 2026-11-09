import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const circleStyles = cva("grid shrink-0 place-items-center rounded-full font-bold", {
  variants: {
    tone: {
      primary: "bg-primary text-on-primary",
      inverse: "bg-inverse-surface text-on-inverse",
      surface: "bg-surface text-primary",
      outline: "border-2 border-line text-on-primary",
    },
    size: {
      xs: "size-5.5",
      sm: "size-8.5",
      md: "size-9",
      lg: "size-12",
    },
  },
  defaultVariants: {
    tone: "primary",
    size: "md",
  },
});

interface CircleProps extends ComponentProps<"span">, VariantProps<typeof circleStyles> {}

export default function Circle({ className, tone, size, ...props }: CircleProps) {
  return <span className={cn(circleStyles({ tone, size }), className)} {...props} />;
}
