"use client";

import {
  useLayoutEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const modalStyles = cva(
  "w-11/12 overflow-hidden border border-line bg-surface text-ink transition duration-200 ease-out backdrop:bg-scrim/45 open:flex open:flex-col motion-reduce:transition-none",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
      },
      side: {
        center: "m-auto rounded-panel starting:opacity-0",
        end: "my-0 ms-auto me-0 h-full max-h-full starting:translate-x-full rtl:starting:-translate-x-full",
      },
    },
    defaultVariants: {
      size: "md",
      side: "center",
    },
  },
);

interface ModalBaseProps
  extends ComponentPropsWithoutRef<"dialog">, VariantProps<typeof modalStyles> {
  open: boolean;
  onClose: () => void;
}

type ModalName =
  | { "aria-labelledby": string; "aria-label"?: never }
  | { "aria-label": string; "aria-labelledby"?: never };

type ModalProps = ModalBaseProps & ModalName;

export default function Modal({
  open,
  onClose,
  onClick,
  onPointerDown,
  size,
  side,
  className,
  children,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = useRef(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    dialog.showModal();
    return () => dialog.close();
  }, [open]);

  function handlePointerDown(event: PointerEvent<HTMLDialogElement>) {
    onPointerDown?.(event);
    pressStartedOnBackdrop.current = event.target === event.currentTarget;
  }

  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    onClick?.(event);
    if (event.target === event.currentTarget && pressStartedOnBackdrop.current) {
      dialogRef.current?.close();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      className={cn(modalStyles({ size, side }), className)}
      {...props}
    >
      <div className="min-h-0 grow overflow-y-auto p-6">{children}</div>
    </dialog>
  );
}
