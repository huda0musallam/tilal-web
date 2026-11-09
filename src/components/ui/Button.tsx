import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonStyles = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-control border border-transparent font-medium whitespace-nowrap transition duration-200 focus-ring active:scale-97 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary-hover",
        secondary: "border-line-strong bg-transparent text-muted-ink hover:bg-muted-surface",
        ghost: "bg-transparent text-muted-ink hover:bg-muted-surface",
        inverse: "bg-surface text-primary hover:bg-muted-surface",
        link: "border-0 bg-transparent font-bold text-primary underline",
        chip: "rounded-pill border-line bg-surface text-muted-ink hover:border-accent",
        chipSelected:
          "rounded-pill border-inverse-surface bg-inverse-surface text-on-inverse hover:border-inverse-surface",
        option: "border-line bg-surface hover:border-accent",
        optionSelected: "border-primary bg-muted-surface hover:border-primary",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "px-6 py-3",
        lg: "h-12 px-8 text-lg",
        icon: "relative size-11 rounded-full",
        bare: "p-0.5",
        chip: "px-4.5 py-2",
        chipSm: "px-3.5 py-1.5 text-sm font-normal",
        option:
          "relative grid items-stretch justify-normal gap-1 rounded-panel border-2 p-4 text-start font-normal whitespace-normal",
      },
    },
    compoundVariants: [{ variant: "chip", size: "chipSm", class: "bg-transparent" }],
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
