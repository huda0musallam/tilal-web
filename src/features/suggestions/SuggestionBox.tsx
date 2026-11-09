"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { apiKeys } from "@/lib/api/client";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Label, { labelStyles } from "@/components/ui/Label";
import Section from "@/components/ui/Section";
import { sectionLabelClass } from "@/components/ui/shared-classes";
import Textarea from "@/components/ui/Textarea";
import { postSuggestion } from "./suggestions.api";

type Errors = { message?: string; rating?: string };

const fieldClass = "grid gap-1.5";
const errorClass = "text-sm text-danger";

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
    <Section tone="muted">
      <div className="container grid grid-cols-1 items-center gap-8 lg:flex lg:gap-16">
        <div className="lg:flex-10">
          <p className={sectionLabelClass}>اقتراحاتكم</p>
          <h2 className="mb-3">رأيك بيفرق معنا</h2>
          <p>اقتراح، تعليق، أو خلطة بتحلم فيها، احكيلنا.</p>
        </div>

        <Card tone="page" radius="media" className="lg:flex-12 lg:p-8">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="thanks"
                className="grid justify-items-center gap-4 py-8 text-center text-primary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                role="status"
              >
                <CheckCircle2 size={48} strokeWidth={1.5} />
                <p className="text-xl font-bold text-ink">وصلتنا كلماتك، شكراً إلك.</p>
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
                className="grid gap-5"
              >
                <div className={fieldClass}>
                  <Label htmlFor="s-name">
                    اسمك <span className="text-xs font-normal text-muted-ink">(اختياري)</span>
                  </Label>
                  <Input
                    id="s-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="رنا"
                  />
                </div>

                <div className={fieldClass}>
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
                    <p id="s-message-error" className={errorClass}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className={fieldClass}>
                  <span id="s-rating-label" className={labelStyles()}>
                    تقييمك
                  </span>
                  <div
                    role="radiogroup"
                    aria-labelledby="s-rating-label"
                    className="flex gap-1"
                    onMouseLeave={() => setHovered(0)}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Button
                        key={n}
                        variant="ghost"
                        size="bare"
                        role="radio"
                        aria-checked={rating === n}
                        aria-label={`${n} من 5`}
                        onClick={() => {
                          setRating(n);
                          if (errors.rating) setErrors({ ...errors, rating: undefined });
                        }}
                        onMouseEnter={() => setHovered(n)}
                        className="border-0 duration-150 hover:scale-115 hover:bg-transparent"
                      >
                        <Star
                          size={28}
                          fill={n <= shown ? "currentColor" : "none"}
                          className={n <= shown ? "text-accent" : "text-line"}
                        />
                      </Button>
                    ))}
                  </div>
                  {errors.rating && <p className={errorClass}>{errors.rating}</p>}
                </div>

                {sendError && (
                  <p className={errorClass} role="alert">
                    ما قدرنا نبعت رسالتك، جرّب كمان مرة.
                  </p>
                )}

                <Button type="submit" className="justify-self-start" disabled={isMutating}>
                  <Send size={18} />
                  {isMutating ? "عم نبعت..." : "أرسل"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </Section>
  );
}
