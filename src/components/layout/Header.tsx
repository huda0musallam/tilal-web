"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import HeaderLogo from "@/components/logo/HeaderLogo";
import { cart, useCart } from "@/lib/cart-store";
import styles from "./Header.module.css";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/blend", label: "اصنع خلطتك" },
  { href: "/brewing", label: "طرق التحضير" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { count: cartCount } = useCart();
  // نراقب التمرير عشان نصغّر الهيدر
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // هل الرابط هو الصفحة الحالية؟
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" aria-label="التلال - الصفحة الرئيسية">
          <HeaderLogo className={styles.logo} />
        </Link>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="القائمة الرئيسية"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`${styles.link} ${isActive(link.href) ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={`السلة، فيها ${cartCount} منتجات`}
          >
            <ShoppingBag size={22} strokeWidth={1.8} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={cart.open}
            aria-label={`السلة، فيها ${cartCount} منتجات`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
