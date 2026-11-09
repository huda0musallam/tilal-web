import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const textareaStyles = cva(
  "min-h-24 w-full min-w-0 resize-y rounded-lg border border-sand bg-white ps-3 pe-3 pt-2 pb-2 text-base text-espresso transition placeholder:text-placeholder focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger",
);

interface TextareaProps extends ComponentProps<"textarea">, VariantProps<typeof textareaStyles> {}

export default function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cn(textareaStyles(), className)} {...props} />;
}
