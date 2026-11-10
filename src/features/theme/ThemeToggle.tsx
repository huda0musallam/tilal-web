"use client";

import { Moon, Sun } from "lucide-react";
import Button from "@/components/ui/Button";
import { setTheme } from "./theme";
import { useIsDark } from "./use-is-dark";

export default function ThemeToggle() {
  const dark = useIsDark();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "حوّل للوضع الفاتح" : "حوّل للوضع الغامق"}
    >
      {dark ? <Sun size={22} /> : <Moon size={22} />}
    </Button>
  );
}
