import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export const ThemeSwitch = ({ onChange }) => {
  // Run only once on mount
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    onChange(isDark ? 'dark' : 'light');
  }, []); // Empty dependency array ensures this runs only once

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    onChange(isDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 flex rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-800"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
    </button>
  );
};