import Link from "next/link";
import { MessageCircle } from "lucide-react";
import StampLogo from "@/components/logo/StampLogo";
import ButtonLink from "@/components/ui/ButtonLink";
import { whatsappLink } from "@/features/cart/whatsapp";

const PAGES = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/blend", label: "اصنع خلطتك" },
  { href: "/brewing", label: "طرق التحضير" },
];

const METHODS = [
  { href: "/brewing/v60", label: "V60" },
  { href: "/brewing/moka", label: "موكا" },
  { href: "/brewing/cold-brew", label: "كولد برو" },
  { href: "/brewing/arabic", label: "عربية بالهيل" },
];

const headingClass = "mb-4 text-lg font-bold text-on-primary";
const listClass = "grid list-none gap-2.5";
const linkClass = "text-on-primary-muted transition-colors duration-200 hover:text-on-primary";

export default function Footer() {
  return (
    <footer className="-mt-px text-on-primary">
      <svg
        className="-mb-px block h-15 w-full sm:h-22.5"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 120 L0 50 C160 10 320 30 470 70 C620 105 760 30 920 25 C1080 20 1200 75 1330 55 C1390 45 1420 40 1440 38 L1440 120 Z"
          fill="var(--hill)"
        />
        <path
          d="M0 120 L0 80 C180 40 300 45 460 75 C600 100 720 55 880 50 C1040 45 1160 95 1300 80 C1370 72 1410 68 1440 65 L1440 120 Z"
          fill="var(--primary)"
        />
      </svg>

      <div className="bg-primary pt-8 pb-6">
        <div className="container grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 lg:flex">
          <div className="col-span-full lg:flex-14">
            <StampLogo className="mb-4 h-auto w-30" ink="var(--on-primary)" />
            <p className="max-w-65 text-text-on-dark">قهوة محمّصة بالبيت بحب، من التلال لفنجانك.</p>
          </div>

          <nav aria-label="روابط الموقع" className="lg:flex-10">
            <p className={headingClass}>الموقع</p>
            <ul className={listClass}>
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className={linkClass}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="طرق التحضير" className="lg:flex-10">
            <p className={headingClass}>طرق التحضير</p>
            <ul className={listClass}>
              {METHODS.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className={linkClass}>
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:flex-13">
            <p className={headingClass}>تواصل معنا</p>
            <p className="mb-4 text-text-on-dark">اطلب أو اسأل عن أي شي، منحكي عالواتساب.</p>
            <ButtonLink
              href={whatsappLink("مرحبا، عندي سؤال عن قهوة التلال")}
              target="_blank"
              rel="noopener noreferrer"
              variant="inverse"
            >
              <MessageCircle size={18} />
              اطلب عبر واتساب
            </ButtonLink>
          </div>
        </div>

        <div className="container border-t border-on-primary/20 pt-6 text-center">
          <p className="text-sm text-on-primary-muted">© ٢٠٢٦ التلال · قهوة محمّصة بالبيت بحب</p>
        </div>
      </div>
    </footer>
  );
}
