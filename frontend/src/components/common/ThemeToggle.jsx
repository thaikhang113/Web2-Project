import { Moon, SunMedium } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext.jsx";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
    >
      {theme === "dark" ? <SunMedium size={16} /> : <Moon size={16} />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
