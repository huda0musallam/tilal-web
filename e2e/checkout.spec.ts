import { expect, test } from "@playwright/test";

test("a user can order a coffee for pickup through WhatsApp", async ({ page }) => {
  await page.goto("/products");

  const card = page.getByRole("article").filter({ hasText: "برازيلي غامق" });
  await card.getByRole("button", { name: "أضف للسلة" }).click();

  await page.getByRole("button", { name: /السلة/ }).click();
  await page.getByRole("link", { name: "كمّل الطلب" }).click();

  await page.getByLabel("الاسم").fill("هدى");
  await page.getByLabel("رقم التلفون").fill("905551234567");
  await page.getByRole("radio", { name: "من المحمصة" }).check();
  await page.getByRole("button", { name: /أرسل الطلب/ }).click();

  const whatsapp = page.getByRole("link", { name: /واتساب/ });
  await expect(whatsapp).toHaveAttribute("href", /wa\.me/);
  await expect(whatsapp).toHaveAttribute("href", /%D8%A8%D8%B1%D8%A7%D8%B2%D9%8A%D9%84%D9%8A/);
});
