"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(prev => !prev)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="
        relative
        w-12 h-12
        rounded-full
        bg-linear-to-br from-gray-100 to-gray-200
        dark:from-slate-500 dark:to-slate-900
        shadow-lg shadow-gray-300/50 dark:shadow-black/50
        hover:shadow-xl
        transition-all duration-300
        overflow-hidden
        group
      "
    >
      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-300 transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <Moon className="w-5 h-5 text-blue-400 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>

      {/* Aperture blades animation */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent dark:via-zinc-600"
            style={{
              transform: `rotate(${i * 60}deg)`,
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-red-100"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
};
