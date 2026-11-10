import { useSyncExternalStore } from "react";
import { savedTheme } from "./theme";

const SYSTEM_DARK = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void) {
  const root = document.documentElement;
  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ["class"] });

  const media = window.matchMedia(SYSTEM_DARK);
  const followSystem = () => {
    if (savedTheme() === null) root.classList.toggle("dark", media.matches);
  };
  media.addEventListener("change", followSystem);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", followSystem);
  };
}

const isDark = () => document.documentElement.classList.contains("dark");
const isDarkOnServer = () => false;

export function useIsDark() {
  return useSyncExternalStore(subscribe, isDark, isDarkOnServer);
}
