import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const sectionLabelStyles = cva("font-bold text-primary", {
  variants: {
    spacing: {
      section: "mb-2",
      page: "mb-1",
    },
  },
  defaultVariants: {
    spacing: "section",
  },
});

interface SectionLabelProps extends ComponentProps<"p">, VariantProps<typeof sectionLabelStyles> {}

export default function SectionLabel({ className, spacing, ...props }: SectionLabelProps) {
  return <p className={cn(sectionLabelStyles({ spacing }), className)} {...props} />;
}
