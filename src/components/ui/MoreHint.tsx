import type { ComponentProps } from "react";
import { ArrowLeft } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const moreHintStyles = cva("inline-flex items-center gap-1.5 font-bold", {
  variants: {
    tone: {
      primary: "text-primary",
      onPhoto: "text-sm text-on-primary-muted",
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

interface MoreHintProps extends ComponentProps<"span">, VariantProps<typeof moreHintStyles> {
  arrowSize?: number;
}

export default function MoreHint({
  className,
  tone,
  arrowSize = 18,
  children,
  ...props
}: MoreHintProps) {
  return (
    <span className={cn(moreHintStyles({ tone }), className)} {...props}>
      {children}
      <ArrowLeft
        size={arrowSize}
        className="transition-transform duration-250 group-hover:-translate-x-1"
      />
    </span>
  );
}
