"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Check } from "lucide-react";
import type { Cardamom, Product, Weight } from "./product.types";
import { CARDAMOM_OPTIONS, WEIGHT_OPTIONS, roastLabel } from "./product.options";
import { productPrice } from "./pricing";
import { formatPrice } from "@/shared/lib/format-price";
import { cart } from "@/features/cart/cart.store";
import { favorites, useIsFavorite } from "@/features/favorites/favorites-store";
import { flyTo } from "@/features/fly/fly-store";
import styles from "./ProductCard.module.css";

type Props = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  const [weight, setWeight] = useState<Weight>("250");
  const [cardamom, setCardamom] = useState<Cardamom>("none");
  const [added, setAdded] = useState(false);
  const liked = useIsFavorite(product.id);
  const mediaRef = useRef<HTMLDivElement>(null);

  const price = productPrice(product, weight, cardamom);

  function handleAdd() {
    cart.add({ productId: product.id, weight, cardamom, qty: 1 });

    flyTo("cart", product.image, mediaRef.current);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleLike() {
    const nowLiked = favorites.toggle(product.id);
    if (nowLiked) flyTo("favorites", product.image, mediaRef.current);
  }

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
    >
      <div className={styles.media} ref={mediaRef}>
        <Image
          src={product.image}
          alt={`كيس قهوة التلال، ${product.name}`}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className={styles.image}
        />
        <span className={styles.badge}>{roastLabel(product.roast)}</span>

        <motion.button
          type="button"
          className={`${styles.like} ${liked ? styles.liked : ""}`}
          onClick={handleLike}
          whileTap={{ scale: 0.85 }}
          aria-pressed={liked}
          aria-label={liked ? `شيل ${product.name} من المفضلة` : `أضف ${product.name} للمفضلة`}
        >
          <motion.span
            key={liked ? "on" : "off"}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            style={{ display: "grid" }}
          >
            <Heart size={20} fill={liked ? "currentColor" : "none"} />
          </motion.span>
        </motion.button>
      </div>

      <div className={styles.body}>
        <div>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.notes}>{product.notes}</p>
        </div>

        <fieldset className={styles.group}>
          <legend className={styles.legend}>الوزن</legend>
          <div className={styles.options}>
            {WEIGHT_OPTIONS.map((w) => (
              <button
                key={w.value}
                type="button"
                onClick={() => setWeight(w.value)}
                aria-pressed={weight === w.value}
                className={`${styles.option} ${weight === w.value ? styles.selected : ""}`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </fieldset>

        {product.cardamom && (
          <fieldset className={styles.group}>
            <legend className={styles.legend}>الهيل</legend>
            <div className={styles.options}>
              {CARDAMOM_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCardamom(c.value)}
                  aria-pressed={cardamom === c.value}
                  className={`${styles.option} ${cardamom === c.value ? styles.selected : ""}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(price)}</span>
          <button type="button" className={`btn btn-primary ${styles.add}`} onClick={handleAdd}>
            {added ? <Check size={18} /> : <ShoppingBag size={18} />}
            {added ? "انضافت" : "أضف للسلة"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
