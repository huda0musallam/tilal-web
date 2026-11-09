import type { ComponentProps } from "react";
import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { buttonStyles } from "./Button";

interface ButtonLinkProps extends ComponentProps<typeof Link>, VariantProps<typeof buttonStyles> {}

export default function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
