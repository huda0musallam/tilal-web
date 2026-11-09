import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import SectionLabel from "./SectionLabel";

const pageHeaderStyles = cva("text-center", {
  variants: {
    width: {
      full: "",
      narrow: "mx-auto max-w-155",
    },
    spacing: {
      md: "mb-10",
      lg: "mb-12",
    },
  },
  defaultVariants: {
    width: "full",
    spacing: "md",
  },
});

interface PageHeaderProps
  extends Omit<ComponentProps<"header">, "title">, VariantProps<typeof pageHeaderStyles> {
  label: ReactNode;
  title: ReactNode;
}

export default function PageHeader({
  label,
  title,
  width,
  spacing,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <header className={cn(pageHeaderStyles({ width, spacing }), className)} {...props}>
      <SectionLabel spacing="page">{label}</SectionLabel>
      <h1 className="mb-2">{title}</h1>
      {children && <p>{children}</p>}
    </header>
  );
}
