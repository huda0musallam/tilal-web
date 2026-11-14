"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { cart } from "./cart.store";

interface ClearCartDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ClearCartDialog({ open, onClose }: ClearCartDialogProps) {
  function clearAndClose() {
    cart.clear();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      aria-labelledby="clear-cart-title"
      aria-describedby="clear-cart-description"
    >
      <h2 id="clear-cart-title" className="mb-2 text-2xl text-ink">
        تفضي السلة؟
      </h2>
      <p id="clear-cart-description" className="mb-6 text-muted-ink">
        رح تنشال كل المنتجات والخلطات. بتقدر تضيفهم من جديد.
      </p>
      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          خليها
        </Button>
        <Button variant="danger" onClick={clearAndClose}>
          فضّي السلة
        </Button>
      </div>
    </Modal>
  );
}
