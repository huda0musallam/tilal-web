"use client";

import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";

interface ActiveNavLinksProps {
  onNavigate: (href: string) => void;
}

export default function ActiveNavLinks({ onNavigate }: ActiveNavLinksProps) {
  const pathname = usePathname();
  return <NavLinks activePath={pathname} onNavigate={onNavigate} />;
}
