export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export const themeScript = `(function(){try{var s=localStorage.getItem("${STORAGE_KEY}");var d=s==="dark"||(s!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}
