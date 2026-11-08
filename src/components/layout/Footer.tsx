import Link from "next/link";
import { MessageCircle } from "lucide-react";
import StampLogo from "@/components/logo/StampLogo";
import { whatsappLink } from "@/lib/whatsapp";
import styles from "./Footer.module.css";

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

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <svg
        className={styles.hills}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 120 L0 50 C160 10 320 30 470 70 C620 105 760 30 920 25 C1080 20 1200 75 1330 55 C1390 45 1420 40 1440 38 L1440 120 Z"
          fill="#6B7A45"
        />
        <path
          d="M0 120 L0 80 C180 40 300 45 460 75 C600 100 720 55 880 50 C1040 45 1160 95 1300 80 C1370 72 1410 68 1440 65 L1440 120 Z"
          fill="var(--olive)"
        />
      </svg>

      <div className={styles.body}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.brand}>
            <StampLogo className={styles.stamp} ink="#F7F2EA" />
            <p className={styles.tagline}>قهوة محمّصة بالبيت بحب، من التلال لفنجانك.</p>
          </div>

          <nav aria-label="روابط الموقع">
            <p className={styles.heading}>الموقع</p>
            <ul className={styles.list}>
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className={styles.link}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="طرق التحضير">
            <p className={styles.heading}>طرق التحضير</p>
            <ul className={styles.list}>
              {METHODS.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className={styles.link}>
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={styles.heading}>تواصل معنا</p>
            <p className={styles.contactText}>اطلب أو اسأل عن أي شي، منحكي عالواتساب.</p>
            <a
              href={whatsappLink("مرحبا، عندي سؤال عن قهوة التلال")}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${styles.whatsapp}`}
            >
              <MessageCircle size={18} />
              اطلب عبر واتساب
            </a>
          </div>
        </div>

        <div className={`container ${styles.bottom}`}>
          <p>© ٢٠٢٦ التلال · قهوة محمّصة بالبيت بحب</p>
        </div>
      </div>
    </footer>
  );
}
