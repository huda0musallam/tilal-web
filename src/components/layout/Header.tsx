"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import HeaderLogo from "@/components/logo/HeaderLogo";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import { cart, useCartCount } from "@/features/cart/cart.store";
import { useFavoritesCount } from "@/features/favorites/favorites.store";
import { useFlyStore } from "@/features/fly/fly.store";
import ThemeToggle from "@/features/theme/ThemeToggle";
import { cn } from "@/lib/cn";
import ActiveNavLinks from "./ActiveNavLinks";
import NavLinks from "./NavLinks";

const bumpAnimation = { scale: [1, 1.35, 1] };
const countBadgeClass = "absolute end-0.5 top-1";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = useCartCount();
  const favCount = useFavoritesCount();
  const cartBump = useFlyStore((s) => s.bump.cart);
  const favBump = useFlyStore((s) => s.bump.favorites);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-line bg-surface/85 backdrop-blur-md" : "border-transparent bg-surface",
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between gap-6 transition-all duration-300",
          scrolled ? "h-17" : "h-18 md:h-22",
        )}
      >
        <Link href="/" onClick={() => handleNavClick("/")} aria-label="التلال - الصفحة الرئيسية">
          <HeaderLogo
            className={cn(
              "block w-auto transition-all duration-300",
              scrolled ? "h-12.5" : "h-13 md:h-16",
            )}
          />
        </Link>

        <nav
          className={cn(
            "absolute inset-x-0 top-full flex flex-col border-b border-line bg-surface px-5 pt-2 pb-4 transition-all duration-250 md:static md:visible md:translate-y-0 md:flex-row md:gap-8 md:border-b-0 md:bg-transparent md:p-0 md:opacity-100 md:transition-none",
            menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
          )}
          aria-label="القائمة الرئيسية"
        >
          <Suspense fallback={<NavLinks activePath={null} onNavigate={handleNavClick} />}>
            <ActiveNavLinks onNavigate={handleNavClick} />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/products?fav=1"
            variant="ghost"
            size="icon"
            data-fly-target="favorites"
            aria-label={`المفضلة، فيها ${favCount} منتجات`}
          >
            <motion.span
              key={favBump}
              className="grid"
              animate={favBump > 0 ? bumpAnimation : undefined}
              transition={{ duration: 0.35 }}
            >
              <Heart size={22} strokeWidth={1.8} />
            </motion.span>
            {favCount > 0 && (
              <Badge variant="count" size="sm" className={countBadgeClass}>
                {favCount}
              </Badge>
            )}
          </ButtonLink>

          <Button
            variant="ghost"
            size="icon"
            onClick={cart.open}
            data-fly-target="cart"
            aria-label={`السلة، فيها ${cartCount} منتجات`}
          >
            <motion.span
              key={cartBump}
              className="grid"
              animate={cartBump > 0 ? bumpAnimation : undefined}
              transition={{ duration: 0.35 }}
            >
              <ShoppingBag size={22} strokeWidth={1.8} />
            </motion.span>
            {cartCount > 0 && (
              <Badge variant="count" size="sm" className={countBadgeClass}>
                {cartCount}
              </Badge>
            )}
          </Button>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "سكّر القائمة" : "افتح القائمة"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
    </header>
  );
  function handleNavClick(href: string) {
    setMenuOpen(false);
    if (window.location.pathname === href) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }
}
