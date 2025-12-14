"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Animatedbutton from "@/app/components/Animatedbutton";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <Animatedbutton
      onClick={() => setIsDark(prev => !prev)}
      className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
    >
      {isDark ? (
        <Sun size={18} className="text-amber-400" />
      ) : (
        <Moon size={18} className="text-slate-300" />
      )}
    </Animatedbutton>
  );
};
