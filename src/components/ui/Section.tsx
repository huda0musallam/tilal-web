import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const sectionStyles = cva("py-20 lg:py-28", {
  variants: {
    tone: {
      page: "bg-surface",
      muted: "bg-muted-surface",
    },
  },
  defaultVariants: {
    tone: "page",
  },
});

interface SectionProps extends ComponentProps<"section">, VariantProps<typeof sectionStyles> {}

export default function Section({ className, tone, ...props }: SectionProps) {
  return <section className={cn(sectionStyles({ tone }), className)} {...props} />;
}
