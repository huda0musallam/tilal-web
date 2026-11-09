import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const textareaStyles = cva(
  "min-h-16 w-full min-w-0 resize-y rounded-control border border-line bg-field px-3 py-2 text-base text-ink transition placeholder:text-placeholder focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger",
);

interface TextareaProps extends ComponentProps<"textarea">, VariantProps<typeof textareaStyles> {}

export default function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cn(textareaStyles(), className)} {...props} />;
}
