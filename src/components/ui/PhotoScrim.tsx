import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const photoScrimStyles = cva("absolute inset-0 bg-linear-to-t/srgb from-scrim/85 from-0%", {
  variants: {
    fade: {
      short: "via-scrim/40 via-40% to-scrim/0 to-65%",
      long: "via-scrim/35 via-55% to-scrim/10 to-100%",
    },
  },
  defaultVariants: {
    fade: "short",
  },
});

interface PhotoScrimProps extends ComponentProps<"div">, VariantProps<typeof photoScrimStyles> {}

export default function PhotoScrim({ className, fade, ...props }: PhotoScrimProps) {
  return <div className={cn(photoScrimStyles({ fade }), className)} {...props} />;
}
