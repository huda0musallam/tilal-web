import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-control border border-transparent font-medium whitespace-nowrap transition focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-97 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary-hover",
        secondary: "border-line-strong bg-transparent text-muted-ink hover:bg-muted-surface",
        ghost: "bg-transparent text-muted-ink hover:bg-muted-surface",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-12 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonStyles> {}

export default function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...props} />
  );
}
