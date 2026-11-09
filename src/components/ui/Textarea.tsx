import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { textFieldStyles } from "./Input";

interface TextareaProps extends ComponentProps<"textarea">, VariantProps<typeof textFieldStyles> {}

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(textFieldStyles(), "min-h-16 resize-y py-2 leading-6", className)}
      {...props}
    />
  );
}
