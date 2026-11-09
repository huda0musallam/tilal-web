import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const messageBoxStyles = cva(
  "mx-auto grid max-w-120 justify-items-center gap-3 rounded-card border border-dashed px-6 py-8 text-center",
  {
    variants: {
      tone: {
        empty: "my-8 border-line",
        error: "my-12 border-accent bg-muted-surface",
      },
    },
    defaultVariants: {
      tone: "empty",
    },
  },
);

const messageTitleStyles = cva("font-bold text-ink", {
  variants: {
    tone: {
      empty: "text-lg",
      error: "text-xl",
    },
  },
  defaultVariants: {
    tone: "empty",
  },
});

interface MessageBoxProps
  extends Omit<ComponentProps<"div">, "title">, VariantProps<typeof messageBoxStyles> {
  title: ReactNode;
}

export default function MessageBox({
  className,
  tone,
  title,
  children,
  ...props
}: MessageBoxProps) {
  return (
    <div className={cn(messageBoxStyles({ tone }), className)} {...props}>
      <p className={messageTitleStyles({ tone })}>{title}</p>
      {children}
    </div>
  );
}
