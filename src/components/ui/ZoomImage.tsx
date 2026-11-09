import type { ComponentProps } from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const zoomImageStyles = cva("object-cover transition-transform duration-600", {
  variants: {
    zoom: {
      sm: "group-hover:scale-104",
      md: "group-hover:scale-105",
      lg: "group-hover:scale-106",
    },
  },
  defaultVariants: {
    zoom: "md",
  },
});

interface ZoomImageProps
  extends ComponentProps<typeof Image>, VariantProps<typeof zoomImageStyles> {}

export default function ZoomImage({ className, zoom, alt, ...props }: ZoomImageProps) {
  return <Image alt={alt} className={cn(zoomImageStyles({ zoom }), className)} {...props} />;
}
