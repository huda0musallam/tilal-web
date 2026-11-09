import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const inputStyles = cva(
  "h-11 w-full min-w-0 rounded-lg border border-sand bg-white ps-3 pe-3 text-base text-espresso transition placeholder:text-placeholder focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger",
);

interface InputProps extends ComponentProps<"input">, VariantProps<typeof inputStyles> {}

export default function Input({ className, ...props }: InputProps) {
  return <input className={cn(inputStyles(), className)} {...props} />;
}
