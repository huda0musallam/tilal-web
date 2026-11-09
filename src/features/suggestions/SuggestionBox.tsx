"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { apiKeys } from "@/lib/api/client";
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
                <button type="button" className="btn btn-outline" onClick={writeAnother}>
                  اكتب اقتراح تاني
                </button>
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
                  <label htmlFor="s-name" className={styles.fieldLabel}>
                    اسمك <span className={styles.optional}>(اختياري)</span>
                  </label>
                  <input
                    id="s-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="رنا"
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="s-message" className={styles.fieldLabel}>
                    اقتراحك
                  </label>
                  <textarea
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
                    className={`${styles.input} ${errors.message ? styles.invalid : ""}`}
                  />
                  {errors.message && (
                    <p id="s-message-error" className={styles.error}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className={styles.field}>
                  <span id="s-rating-label" className={styles.fieldLabel}>
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

                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submit}`}
                  disabled={isMutating}
                >
                  <Send size={18} />
                  {isMutating ? "عم نبعت..." : "أرسل"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
