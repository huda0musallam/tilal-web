"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { cart, useCart, useCartStore } from "@/features/cart/cart-store";
import { formatPrice } from "@/features/products/pricing";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";
import styles from "./CartDrawer.module.css";
import { useFavoritesStore } from "@/features/favorites/favorites-store";
export default function CartDrawer() {
  const { items, isOpen, count, total } = useCart();
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  // منقرا السلة والمفضلة المحفوظين بعد ما توصل الصفحة للمتصفح
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useFavoritesStore.persist.rehydrate();
  }, []);
  // لما يفتح الدرج: نوقف تمرير الصفحة، ونسكره بزر Esc
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cart.close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const message = buildOrderMessage(items, total, {
    name: name.trim(),
    notes: notes.trim(),
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* الخلفية الغامقة */}
          <motion.div
            className={styles.backdrop}
            onClick={cart.close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* الدرج */}
          <motion.aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
          >
            <div className={styles.header}>
              <h2 id="cart-title" className={styles.title}>
                سلتك {count > 0 && <span className={styles.count}>({count})</span>}
              </h2>
              <button
                ref={closeRef}
                type="button"
                className={styles.iconBtn}
                onClick={cart.close}
                aria-label="سكّر السلة"
              >
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className={styles.empty}>
                <ShoppingBag size={56} strokeWidth={1.2} />
                <p>سلتك فاضية لهلق.</p>
                <Link href="/products" className="btn btn-primary" onClick={cart.close}>
                  تسوّق القهوة
                </Link>
              </div>
            ) : (
              <>
                {/* المنتجات */}
                <ul className={styles.list}>
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.key}
                        className={styles.item}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <div className={styles.thumb}>
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="72px"
                            className={styles.thumbImg}
                          />
                        </div>

                        <div className={styles.info}>
                          <p className={styles.name}>{item.name}</p>
                          <p className={styles.details}>{item.details.join(" · ")}</p>

                          <div className={styles.row}>
                            <div className={styles.stepper}>
                              <button
                                type="button"
                                onClick={() => cart.setQty(item.key, item.qty + 1)}
                                aria-label={`زيد كمية ${item.name}`}
                              >
                                <Plus size={16} />
                              </button>
                              <span aria-live="polite">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => cart.setQty(item.key, item.qty - 1)}
                                aria-label={`نقّص كمية ${item.name}`}
                              >
                                <Minus size={16} />
                              </button>
                            </div>

                            <span className={styles.lineTotal}>
                              {formatPrice(item.unitPrice * item.qty)}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={styles.remove}
                          onClick={() => cart.remove(item.key)}
                          aria-label={`احذف ${item.name} من السلة`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* المجموع والإرسال */}
                <div className={styles.footer}>
                  <div className={styles.total}>
                    <span>المجموع</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اسمك (اختياري)"
                    aria-label="اسمك"
                    className={styles.input}
                  />
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="ملاحظات، متل العنوان أو نوع الطحنة (اختياري)"
                    aria-label="ملاحظات"
                    className={styles.input}
                  />

                  <a
                    href={whatsappLink(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-primary ${styles.send}`}
                  >
                    <MessageCircle size={18} />
                    أرسل الطلب عبر واتساب
                  </a>

                  <button type="button" className={styles.clear} onClick={cart.clear}>
                    فضّي السلة
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
