"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import HeaderLogo from "@/components/logo/HeaderLogo";
import { cart, useCart } from "@/features/cart/cart-store";
import { useFavoritesCount } from "@/features/favorites/favorites-store";
import { useFlyStore } from "@/features/fly/fly-store";
import styles from "./Header.module.css";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/blend", label: "اصنع خلطتك" },
  { href: "/brewing", label: "طرق التحضير" },
];

// نطة صغيرة للأيقونة لما توصلها صورة. key جديد = الأنيميشن بيعيد من الأول
const bumpAnimation = { scale: [1, 1.35, 1] };

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { count: cartCount } = useCart();
  const favCount = useFavoritesCount();
  const cartBump = useFlyStore((s) => s.bump.cart);
  const favBump = useFlyStore((s) => s.bump.favorites);

  // نراقب التمرير عشان نصغّر الهيدر
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // هل الرابط هو الصفحة الحالية؟
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" onClick={() => handleNavClick("/")} aria-label="التلال - الصفحة الرئيسية">
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
              onClick={() => handleNavClick(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`${styles.link} ${isActive(link.href) ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {/* المفضلة: بتفتح صفحة المنتجات على فلتر المفضلة */}
          <Link
            href="/products?fav=1"
            className={styles.iconBtn}
            data-fly-target="favorites"
            aria-label={`المفضلة، فيها ${favCount} منتجات`}
          >
            <motion.span
              key={favBump}
              className={styles.iconInner}
              animate={favBump > 0 ? bumpAnimation : undefined}
              transition={{ duration: 0.35 }}
            >
              <Heart size={22} strokeWidth={1.8} />
            </motion.span>
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </Link>

          {/* السلة */}
          <button
            type="button"
            className={styles.iconBtn}
            onClick={cart.open}
            data-fly-target="cart"
            aria-label={`السلة، فيها ${cartCount} منتجات`}
          >
            <motion.span
              key={cartBump}
              className={styles.iconInner}
              animate={cartBump > 0 ? bumpAnimation : undefined}
              transition={{ duration: 0.35 }}
            >
              <ShoppingBag size={22} strokeWidth={1.8} />
            </motion.span>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>

          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "سكّر القائمة" : "افتح القائمة"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
  // إذا كنا أصلاً بنفس الصفحة، Next.js ما بيعمل شي، فمنطلع لفوق بإيدنا
  // إذا كبسنا على الصفحة اللي نحنا فيها، Next.js ما بيعمل شي، فمنطلع لفوق بإيدنا
  function handleNavClick(href: string) {
    setMenuOpen(false);
    if (pathname === href) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }
}
