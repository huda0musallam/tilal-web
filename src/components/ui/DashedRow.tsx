import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const dashedRowStyles = cva(
  "flex items-center justify-between border-t border-dashed border-line pt-4",
);

interface DashedRowProps extends ComponentProps<"div">, VariantProps<typeof dashedRowStyles> {}

export default function DashedRow({ className, ...props }: DashedRowProps) {
  return <div className={cn(dashedRowStyles(), className)} {...props} />;
}
