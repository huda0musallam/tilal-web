import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const cardStyles = cva("rounded-panel border border-sand p-6", {
  variants: {
    tone: {
      page: "bg-bg",
      section: "bg-section",
    },
  },
  defaultVariants: {
    tone: "section",
  },
});

interface CardProps extends ComponentProps<"div">, VariantProps<typeof cardStyles> {}

export default function Card({ className, tone, ...props }: CardProps) {
  return <div className={cn(cardStyles({ tone }), className)} {...props} />;
}
