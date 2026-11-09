import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const centeredStackStyles = cva("grid justify-items-center gap-4 text-center");

const messageBoxStyles = cva(
  "mx-auto grid max-w-120 justify-items-center gap-3 rounded-card border border-dashed px-6 py-8 text-center",
  {
    variants: {
      tone: {
        empty: "my-8 border-line",
        error: "my-12 border-accent bg-muted-surface",
        callout: "my-0 max-w-none justify-items-stretch border-accent p-6",
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
      callout: "",
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
