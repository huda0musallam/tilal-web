import Link from "next/link";
import styles from "./NavLinks.module.css";

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
        className={`${styles.link} ${active ? styles.active : ""}`}
      >
        {link.label}
      </Link>
    );
  });
}
