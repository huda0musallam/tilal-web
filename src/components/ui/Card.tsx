import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const cardStyles = cva("", {
  variants: {
    tone: {
      page: "bg-surface",
      section: "bg-muted-surface",
    },
    radius: {
      panel: "rounded-panel",
      card: "rounded-card",
      media: "rounded-media",
    },
    padding: {
      none: "",
      md: "p-6",
    },
    bordered: {
      true: "border border-line",
      false: "",
    },
    lift: {
      true: "transition duration-350 hover:-translate-y-1.5 hover:shadow-lift",
      false: "",
    },
  },
  defaultVariants: {
    tone: "section",
    radius: "panel",
    padding: "md",
    bordered: true,
    lift: false,
  },
});

interface CardProps extends ComponentProps<"div">, VariantProps<typeof cardStyles> {}

export default function Card({
  className,
  tone,
  radius,
  padding,
  bordered,
  lift,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardStyles({ tone, radius, padding, bordered, lift }), className)}
      {...props}
    />
  );
}
