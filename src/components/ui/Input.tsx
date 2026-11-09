import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const fieldSurfaceStyles = cva(
  "border border-line bg-field transition focus-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger",
);

export const textFieldStyles = cva(
  cn(
    fieldSurfaceStyles(),
    "w-full min-w-0 rounded-control px-3 text-base text-ink placeholder:text-placeholder",
  ),
);

interface InputProps extends ComponentProps<"input">, VariantProps<typeof textFieldStyles> {}

export default function Input({ className, ...props }: InputProps) {
  return <input className={cn(textFieldStyles(), "h-11", className)} {...props} />;
}
