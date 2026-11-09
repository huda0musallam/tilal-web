import type { ComponentProps } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const backLinkStyles = cva("inline-flex items-center gap-1.5 font-medium", {
  variants: {
    tone: {
      page: "self-start text-muted-ink hover:text-primary",
      onPhoto: "text-on-primary-muted hover:text-on-primary",
    },
  },
  defaultVariants: {
    tone: "page",
  },
});

interface BackLinkProps extends ComponentProps<typeof Link>, VariantProps<typeof backLinkStyles> {}

export default function BackLink({ className, tone, children, ...props }: BackLinkProps) {
  return (
    <Link className={cn(backLinkStyles({ tone }), className)} {...props}>
      <ArrowRight size={18} aria-hidden="true" />
      {children}
    </Link>
  );
}
