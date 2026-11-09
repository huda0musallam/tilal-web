import Link from "next/link";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/blend", label: "اصنع خلطتك" },
  { href: "/brewing", label: "طرق التحضير" },
];

interface NavLinksProps {
  activePath: string | null;
  onNavigate: (href: string) => void;
}

function isActive(href: string, path: string | null) {
  if (path === null) return false;
  return href === "/" ? path === "/" : path.startsWith(href);
}

export default function NavLinks({ activePath, onNavigate }: NavLinksProps) {
  return LINKS.map((link) => {
    const active = isActive(link.href, activePath);
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => onNavigate(link.href)}
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative border-b border-muted-surface py-3 font-medium text-muted-ink transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:hidden after:h-0.5 after:scale-x-0 after:rounded-xs after:bg-accent after:transition-transform after:duration-250 hover:text-ink hover:after:scale-x-100 md:border-b-0 md:py-1 md:after:block",
          active && "text-ink after:scale-x-100",
        )}
      >
        {link.label}
      </Link>
    );
  });
}
