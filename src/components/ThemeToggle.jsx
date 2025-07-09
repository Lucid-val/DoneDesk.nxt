import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark"); // Remove both classes first
    document.documentElement.classList.add(newTheme);

    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    // 1. Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    
    // 2. If no saved theme, check system preference
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches 
      ? "dark" 
      : "light";
    
    // 3. Use saved theme if exists, otherwise use system theme
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
    
    // Cleanup function to remove class when component unmounts
    return () => {
      document.documentElement.classList.remove(initialTheme);
    };
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden px-6 py-3 rounded-full"
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-full shadow-lg" />

        {/* Aero (light) gradient */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={{
            opacity: theme === "light" ? 1 : 0,
            background:
              "linear-gradient(135deg, rgba(0,180,255,0.3) 0%, rgba(0,255,180,0.3) 50%, rgba(255,255,255,0.3) 100%)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Neo (dark) gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full"
          initial={false}
          animate={{ opacity: theme === "dark" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Label */}
        <motion.span
          key={theme}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 flex items-center gap-2 text-sm font-medium text-white"
        >
          {theme === "light" ? (
            <>
              <CloudIcon className="w-4 h-4" />
              Aero
            </>
          ) : (
            <>
              <MoonIcon className="w-4 h-4" />
              Neo
            </>
          )}
        </motion.span>
      </motion.button>
    </div>
  );
}

// Icons (remain the same)
function CloudIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}

export default ThemeToggle;