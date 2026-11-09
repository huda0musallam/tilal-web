"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import type { CartItem } from "@/features/cart/cart.types";
import { whatsappLink } from "@/features/cart/whatsapp";
import Button from "@/components/ui/Button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/shadcn/field";
import Input from "@/components/ui/Input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import Textarea from "@/components/ui/Textarea";
import {
  CHECKOUT_DEFAULTS,
  DELIVERY_OPTIONS,
  checkoutSchema,
  type CheckoutValues,
} from "./checkout.schema";
import { buildOrderMessage } from "./order-message";

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
}

export default function CheckoutForm({ items, total }: CheckoutFormProps) {
  const [sentLink, setSentLink] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: CHECKOUT_DEFAULTS,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const delivery = useWatch({ control, name: "delivery" });

  function onSubmit(values: CheckoutValues) {
    const link = whatsappLink(buildOrderMessage(items, total, values));
    setSentLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="checkout-name">الاسم</FieldLabel>
          <Input
            id="checkout-name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={Boolean(errors.phone)}>
          <FieldLabel htmlFor="checkout-phone">رقم التلفون</FieldLabel>
          <Input
            id="checkout-phone"
            type="tel"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+90 535 000 0000"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          <FieldDescription>منحكي معك على هالرقم لنأكد الطلب.</FieldDescription>
          <FieldError errors={[errors.phone]} />
        </Field>

        <Controller
          control={control}
          name="delivery"
          render={({ field, fieldState }) => (
            <FieldSet data-invalid={fieldState.invalid}>
              <FieldLegend variant="label">طريقة الاستلام</FieldLegend>
              <RadioGroup
                dir="rtl"
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              >
                {DELIVERY_OPTIONS.map((option) => (
                  <Field key={option.value} orientation="horizontal">
                    <RadioGroupItem value={option.value} id={`checkout-${option.value}`} />
                    <FieldLabel htmlFor={`checkout-${option.value}`} className="font-normal">
                      {option.label}
                    </FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
              <FieldError errors={[fieldState.error]} />
            </FieldSet>
          )}
        />

        {delivery === "delivery" && (
          <Field data-invalid={Boolean(errors.address)}>
            <FieldLabel htmlFor="checkout-address">عنوان التوصيل</FieldLabel>
            <Textarea
              id="checkout-address"
              rows={2}
              autoComplete="street-address"
              aria-invalid={Boolean(errors.address)}
              {...register("address")}
            />
            <FieldError errors={[errors.address]} />
          </Field>
        )}

        <Field data-invalid={Boolean(errors.notes)}>
          <FieldLabel htmlFor="checkout-notes">ملاحظات (اختياري)</FieldLabel>
          <Textarea
            id="checkout-notes"
            rows={3}
            placeholder="متل وقت التوصيل المناسب، أو إذا بدك الطحنة ناعمة أكتر"
            aria-invalid={Boolean(errors.notes)}
            {...register("notes")}
          />
          <FieldError errors={[errors.notes]} />
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full">
        <MessageCircle size={16} aria-hidden="true" />
        أرسل الطلب عبر واتساب
      </Button>

      {sentLink && (
        <p role="status" className="text-center text-sm leading-5 text-muted-ink">
          فتحنالك واتساب مع رسالة الطلب. إذا ما انفتح،{" "}
          <a
            href={sentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary underline"
          >
            اكبس هون
          </a>
          .
        </p>
      )}
    </form>
  );
}
