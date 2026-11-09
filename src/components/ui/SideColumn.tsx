import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const sideColumnStyles = cva("top-24 grid gap-4 lg:sticky lg:flex-10");

interface SideColumnProps extends ComponentProps<"aside">, VariantProps<typeof sideColumnStyles> {}

export default function SideColumn({ className, ...props }: SideColumnProps) {
  return <aside className={cn(sideColumnStyles(), className)} {...props} />;
}
