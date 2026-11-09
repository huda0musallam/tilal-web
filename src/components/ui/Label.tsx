import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const labelStyles = cva("block text-sm leading-5 font-medium text-ink");

interface LabelProps extends ComponentProps<"label">, VariantProps<typeof labelStyles> {}

export default function Label({ className, ...props }: LabelProps) {
  return <label className={cn(labelStyles(), className)} {...props} />;
}
