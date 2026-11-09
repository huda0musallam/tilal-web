import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent font-medium whitespace-nowrap transition focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-97 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-olive text-bg hover:bg-olive-dark",
        secondary: "border-coffee bg-transparent text-coffee hover:bg-section",
        ghost: "bg-transparent text-coffee hover:bg-section",
      },
      size: {
        sm: "h-9 ps-3 pe-3 text-sm",
        md: "h-11 ps-6 pe-6 text-base",
        lg: "h-12 ps-8 pe-8 text-lg",
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
