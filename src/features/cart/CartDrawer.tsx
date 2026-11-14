"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import { centeredStackStyles } from "@/components/ui/MessageBox";
import Modal from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format-price";
import { useFavoritesStore } from "@/features/favorites/favorites.store";
import { cart, useCartCount, useCartOpen, useCartStore } from "./cart.store";
import { lineTotal } from "./cart.logic";
import { useCartItems } from "./use-cart-items";
import ClearCartDialog from "./ClearCartDialog";

const emptyClass = cn(centeredStackStyles(), "flex-1 place-content-center p-6 text-line");
const stepperButtonClass = "size-7";

export default function CartDrawer() {
  const isOpen = useCartOpen();
  const count = useCartCount();
  const { hasLines, ready, failed, items, total, retry } = useCartItems();
  const [confirmingClear, setConfirmingClear] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    useFavoritesStore.persist.rehydrate();
  }, []);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={cart.close}
        side="end"
        aria-labelledby="cart-title"
        className="w-full max-w-105 border-0 shadow-drawer duration-350 backdrop:duration-350"
        bodyClassName="flex flex-col overflow-hidden p-0"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 id="cart-title" className="text-3xl">
            سلتك{" "}
            {count > 0 && <span className="font-sans text-base text-muted-ink">({count})</span>}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="size-10"
            onClick={cart.close}
            aria-label="سكّر السلة"
          >
            <X size={22} />
          </Button>
        </div>

        {hasLines && !ready ? (
          <div className={emptyClass} role={failed ? "alert" : "status"}>
            <ShoppingBag size={56} strokeWidth={1.2} />
            {failed ? (
              <>
                <p>ما قدرنا نجيب تفاصيل سلتك هلق.</p>
                <Button variant="secondary" onClick={retry}>
                  جرّب مرة تانية
                </Button>
              </>
            ) : (
              <p>عم نجيب تفاصيل سلتك...</p>
            )}
          </div>
        ) : items.length === 0 ? (
          <div className={emptyClass}>
            <ShoppingBag size={56} strokeWidth={1.2} />
            <p>سلتك فاضية لهلق.</p>
            <ButtonLink href="/products" onClick={cart.close}>
              تسوّق القهوة
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="min-h-0 flex-1 list-none overflow-y-auto px-6 py-2">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.key}
                    className="flex gap-3.5 border-b border-muted-surface py-4"
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="relative size-18 shrink-0 overflow-hidden rounded-thumb">
                      <Image src={item.image} alt="" fill sizes="72px" className="object-cover" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-ink">{item.name}</p>
                      <p className="mb-2 text-xs">{item.details.join(" · ")}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-pill border border-line p-0.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={stepperButtonClass}
                            onClick={() => cart.setQty(item.key, item.qty + 1)}
                            aria-label={`زيد كمية ${item.name}`}
                          >
                            <Plus size={16} />
                          </Button>
                          <span className="min-w-5 text-center font-bold" aria-live="polite">
                            {item.qty}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={stepperButtonClass}
                            onClick={() => cart.setQty(item.key, item.qty - 1)}
                            aria-label={`نقّص كمية ${item.name}`}
                          >
                            <Minus size={16} />
                          </Button>
                        </div>

                        <span className="font-bold text-ink">{formatPrice(lineTotal(item))}</span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="bare"
                      className="self-start border-0 p-1 text-accent hover:bg-transparent hover:text-danger"
                      onClick={() => cart.remove(item.key)}
                      aria-label={`احذف ${item.name} من السلة`}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="grid gap-2.5 border-t border-line bg-muted-surface px-6 py-5">
              <div className="mb-1 flex justify-between text-lg">
                <span>المجموع</span>
                <strong className="text-2xl text-ink">{formatPrice(total)}</strong>
              </div>

              <ButtonLink href="/checkout" className="mt-1 w-full" onClick={cart.close}>
                كمّل الطلب
                <ArrowLeft size={18} />
              </ButtonLink>

              <Button
                variant="link"
                size="bare"
                className="p-0 text-sm font-normal text-muted-ink"
                onClick={() => setConfirmingClear(true)}
              >
                فضّي السلة
              </Button>
            </div>
          </>
        )}
      </Modal>
      <ClearCartDialog open={confirmingClear} onClose={() => setConfirmingClear(false)} />
    </>
  );
}
