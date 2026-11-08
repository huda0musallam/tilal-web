import { z } from "zod";

export const DELIVERY_OPTIONS = [
  { value: "delivery", label: "توصيل للبيت" },
  { value: "pickup", label: "باخدها من المحمصة" },
] as const;

const PHONE = /^\+?[0-9\s-]+$/;

const digitCount = (value: string) => value.replace(/\D/g, "").length;

export const checkoutSchema = z
  .object({
    name: z.string().trim().min(2, { error: "اكتب اسمك، حرفين على الأقل." }),
    phone: z
      .string()
      .trim()
      .min(1, { error: "اكتب رقم تلفونك لنتواصل معك." })
      .refine((v) => PHONE.test(v) && digitCount(v) >= 7 && digitCount(v) <= 15, {
        error: "رقم التلفون مش صحيح. استعمل أرقام بس، مع + بالبداية إذا بدك.",
      }),
    delivery: z.enum(["delivery", "pickup"], { error: "اختار كيف بدك تستلم طلبك." }),
    address: z.string().trim(),
    notes: z.string().trim().max(300, { error: "الملاحظات طويلة، خليها أقل من 300 حرف." }),
  })
  .refine((data) => data.delivery === "pickup" || data.address.length >= 5, {
    path: ["address"],
    error: "اكتب عنوان التوصيل، المنطقة والشارع على الأقل.",
  });

export type CheckoutValues = z.infer<typeof checkoutSchema>;

export const CHECKOUT_DEFAULTS: CheckoutValues = {
  name: "",
  phone: "",
  delivery: "delivery",
  address: "",
  notes: "",
};
