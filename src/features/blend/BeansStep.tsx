"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format-price";
import type { Bean } from "./bean.types";
import { blend, useBlendStore, useShares } from "./blend.store";
import { selectedBeans, sharesSum } from "./blend.logic";
import { beanColor } from "./blend.options";
import { swatchClass } from "./blend.classes";
import Step from "./Step";

const sliderTextClass = "flex items-center gap-2";
const warningClass = "mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-danger";

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
      <div className="grid grid-cols-fit gap-3">
        {beans.map((b) => {
          const isOn = b.id in shares;
          return (
            <Button
              key={b.id}
              variant={isOn ? "optionSelected" : "option"}
              size="option"
              onClick={() => blend.toggleBean(b.id, shares)}
              aria-pressed={isOn}
            >
              <span
                className={cn(
                  "absolute end-3.5 top-3.5 grid size-5.5 place-items-center rounded-full border-2 text-on-primary",
                  isOn ? "border-primary bg-primary" : "border-line",
                )}
                aria-hidden="true"
              >
                {isOn && <Check size={14} />}
              </span>
              <span className="text-lg font-bold text-ink">{b.name}</span>
              <span className="text-sm text-muted-ink">{b.notes}</span>
              <span className="mt-1 text-sm font-bold text-primary">
                {formatPrice(b.pricePerGram * 250)} / 250 غ
              </span>
            </Button>
          );
        })}
      </div>

      {selected.length > 1 && (
        <div className="mt-5 grid gap-3.5">
          <AnimatePresence initial={false}>
            {selected.map((b) => (
              <motion.div
                key={b.id}
                className="overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Label
                  htmlFor={`share-${b.id}`}
                  className="mb-1.5 flex justify-between text-base leading-7"
                >
                  <span className={sliderTextClass}>
                    <i className={swatchClass} style={{ background: beanColor(beans, b.id) }} />
                    {b.name}
                  </span>
                  <span className={sliderTextClass}>
                    {shares[b.id]}% · {Math.round((grams * shares[b.id]) / 100)} غ
                  </span>
                </Label>
                <input
                  id={`share-${b.id}`}
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={shares[b.id]}
                  onChange={(e) => blend.setShare(b.id, Number(e.target.value), shares)}
                  className="w-full accent-primary"
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {sum !== 100 && (
            <div className={warningClass} role="alert">
              <span>المجموع هلق {sum}%، لازم يكون 100%.</span>
              <Button
                variant="link"
                size="bare"
                className="p-0"
                onClick={() => blend.distribute(shares)}
              >
                وزّع بالتساوي
              </Button>
            </div>
          )}
        </div>
      )}

      {selected.length === 0 && (
        <p className={warningClass} role="alert">
          اختار نوع بن واحد على الأقل.
        </p>
      )}
    </Step>
  );
}
