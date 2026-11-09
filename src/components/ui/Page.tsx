import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const pageStyles = cva("pt-8 pb-20 sm:pt-14 sm:pb-28");

interface PageProps extends ComponentProps<"main">, VariantProps<typeof pageStyles> {}

export default function Page({ className, children, ...props }: PageProps) {
  return (
    <main className={cn(pageStyles(), className)} {...props}>
      <div className="container">{children}</div>
    </main>
  );
}
