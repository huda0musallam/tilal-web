"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { apiKeys } from "@/lib/api/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Textarea from "@/components/ui/Textarea";
import { postSuggestion } from "./suggestions.api";
import styles from "./SuggestionBox.module.css";

type Errors = { message?: string; rating?: string };

export default function SuggestionBox() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const {
    trigger,
    isMutating,
    error: sendError,
    reset,
  } = useSWRMutation(apiKeys.suggestions, postSuggestion);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const next: Errors = {};
    if (message.trim().length < 3) next.message = "اكتب اقتراحك أو تعليقك أول.";
    if (rating === 0) next.rating = "اختار تقييم من نجمة لخمس نجوم.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    try {
      await trigger({
        name: name.trim() || undefined,
        message: message.trim(),
        rating,
        createdAt: new Date().toISOString(),
      });
      setSent(true);
      setName("");
      setMessage("");
      setRating(0);
    } catch {}
  }

  function writeAnother() {
    setSent(false);
    reset();
  }

  const shown = hovered || rating;

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro}>
          <p className={styles.label}>اقتراحاتكم</p>
          <h2>رأيك بيفرق معنا</h2>
          <p>اقتراح، تعليق، أو خلطة بتحلم فيها، احكيلنا.</p>
        </div>

        <div className={styles.box}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="thanks"
                className={styles.thanks}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                role="status"
              >
                <CheckCircle2 size={48} strokeWidth={1.5} />
                <p className={styles.thanksTitle}>وصلتنا كلماتك، شكراً إلك.</p>
                <Button variant="secondary" onClick={writeAnother}>
                  اكتب اقتراح تاني
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.form}
              >
                <div className={styles.field}>
                  <Label htmlFor="s-name">
                    اسمك <span className={styles.optional}>(اختياري)</span>
                  </Label>
                  <Input
                    id="s-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="رنا"
                  />
                </div>

                <div className={styles.field}>
                  <Label htmlFor="s-message">اقتراحك</Label>
                  <Textarea
                    id="s-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="اكتب اقتراحك هون"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "s-message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="s-message-error" className={styles.error}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className={styles.field}>
                  <span id="s-rating-label" className={styles.ratingLabel}>
                    تقييمك
                  </span>
                  <div
                    role="radiogroup"
                    aria-labelledby="s-rating-label"
                    className={styles.stars}
                    onMouseLeave={() => setHovered(0)}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={rating === n}
                        aria-label={`${n} من 5`}
                        onClick={() => {
                          setRating(n);
                          if (errors.rating) setErrors({ ...errors, rating: undefined });
                        }}
                        onMouseEnter={() => setHovered(n)}
                        className={styles.starBtn}
                      >
                        <Star
                          size={28}
                          fill={n <= shown ? "currentColor" : "none"}
                          className={n <= shown ? styles.starOn : styles.starOff}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && <p className={styles.error}>{errors.rating}</p>}
                </div>

                {sendError && (
                  <p className={styles.error} role="alert">
                    ما قدرنا نبعت رسالتك، جرّب كمان مرة.
                  </p>
                )}

                <Button type="submit" className={styles.submit} disabled={isMutating}>
                  <Send size={18} />
                  {isMutating ? "عم نبعت..." : "أرسل"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
