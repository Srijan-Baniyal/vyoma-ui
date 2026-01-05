"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import * as React from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-10 w-10 items-center justify-center">
        <div className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </div>
    );
  }

  return (
    <motion.button
      className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      transition={{ duration: 0.15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative h-5 w-5">
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <motion.div
              animate={{ rotate: 0, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
              exit={{ rotate: 90, opacity: 0 }}
              initial={{ rotate: -90, opacity: 0 }}
              key="sun"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Sun className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: 0, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
              exit={{ rotate: -90, opacity: 0 }}
              initial={{ rotate: 90, opacity: 0 }}
              key="moon"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Moon className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Elegant background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        style={{
          background:
            theme === "light"
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.2 }}
        whileHover={{ opacity: 1 }}
      />

      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
}
