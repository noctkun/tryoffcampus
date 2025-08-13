import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-black dark:border dark:border-primary-500 text-gray-800 dark:text-primary-300 hover:bg-gray-300 dark:hover:bg-gray-900 dark:hover:border-primary-400 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
