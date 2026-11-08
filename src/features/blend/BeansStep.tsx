"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { formatPrice } from "@/shared/lib/format-price";
import type { Bean } from "./bean.types";
import { blend, useBlendStore, useShares } from "./blend.store";
import { selectedBeans, sharesSum } from "./blend.logic";
import { beanColor } from "./blend.options";
import Step from "./Step";
import styles from "./BeansStep.module.css";

interface BeansStepProps {
  beans: Bean[];
}

export default function BeansStep({ beans }: BeansStepProps) {
  const shares = useShares(beans);
  const grams = Number(useBlendStore((s) => s.total));

  const selected = selectedBeans(beans, shares);
  const sum = sharesSum(shares);

  return (
    <Step n={2} title="أنواع البن" hint="اختار نوع أو أكتر، ووزّع النسب بينهم.">
      <div className={styles.beans}>
        {beans.map((b) => {
          const isOn = b.id in shares;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => blend.toggleBean(b.id, shares)}
              aria-pressed={isOn}
              className={`${styles.bean} ${isOn ? styles.beanOn : ""}`}
            >
              <span className={styles.beanCheck} aria-hidden="true">
                {isOn && <Check size={14} />}
              </span>
              <span className={styles.beanName}>{b.name}</span>
              <span className={styles.beanNotes}>{b.notes}</span>
              <span className={styles.beanPrice}>{formatPrice(b.pricePerGram * 250)} / 250 غ</span>
            </button>
          );
        })}
      </div>

      {selected.length > 1 && (
        <div className={styles.sliders}>
          <AnimatePresence initial={false}>
            {selected.map((b) => (
              <motion.div
                key={b.id}
                className={styles.slider}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label htmlFor={`share-${b.id}`} className={styles.sliderLabel}>
                  <span>
                    <i className={styles.swatch} style={{ background: beanColor(beans, b.id) }} />
                    {b.name}
                  </span>
                  <span>
                    {shares[b.id]}% · {Math.round((grams * shares[b.id]) / 100)} غ
                  </span>
                </label>
                <input
                  id={`share-${b.id}`}
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={shares[b.id]}
                  onChange={(e) => blend.setShare(b.id, Number(e.target.value), shares)}
                  className={styles.range}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {sum !== 100 && (
            <div className={styles.warning} role="alert">
              <span>المجموع هلق {sum}%، لازم يكون 100%.</span>
              <button
                type="button"
                className={styles.link}
                onClick={() => blend.distribute(shares)}
              >
                وزّع بالتساوي
              </button>
            </div>
          )}
        </div>
      )}

      {selected.length === 0 && (
        <p className={styles.warning} role="alert">
          اختار نوع بن واحد على الأقل.
        </p>
      )}
    </Step>
  );
}
