
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has dark mode preference
    const isDarkMode = localStorage.getItem("darkMode") === "true" || 
                      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isDarkMode);
    updateTheme(isDarkMode);
  }, []);

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      
      if ('Notification' in window && Notification.permission === 'granted') {
        document.body.setAttribute('data-notification-theme', 'dark');
      }
    } else {
      document.documentElement.classList.remove("dark");
      document.body.removeAttribute('data-notification-theme');
    }
    localStorage.setItem("darkMode", String(isDark));
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateTheme(newDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-105"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <Sun size={18} className="text-foreground" />
      ) : (
        <Moon size={18} className="text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle;
