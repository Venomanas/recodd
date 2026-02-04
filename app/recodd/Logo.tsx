"use client";

import { motion } from "framer-motion";
import { Aperture } from "lucide-react";

type LogoVariant = "navbar" | "footer" | "mark";
type LogoProps = { variant?: LogoVariant };

export const Logo = ({ variant = "navbar" }: LogoProps) => {
  // Using Lucide icon for simplicity if images aren't loading,
  // or wrap your Image component in these styles.

  if (variant === "footer") {
    return (
      <motion.div className="flex items-center gap-3 select-none">
        <div
          className="
          w-8 h-8 rounded-lg 
          bg-[rgb(var(--accent))] 
          flex items-center justify-center 
          shadow-lg shadow-red-500/20
        "
        >
          <Aperture className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-[rgb(var(--text))]">
          Recodd
        </span>
      </motion.div>
    );
  }

  // Navbar Variant
  return (
    <motion.div className="flex items-center gap-2.5 select-none group cursor-pointer">
      <div
        className="
        w-8 h-8 rounded-lg 
          bg-[rgb(var(--accent))] 
          flex items-center justify-center 
          shadow-lg shadow-red-500/20
      "
      >
        <Aperture className="w-5 h-5 text-white" />
      </div>
      <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white md:hidden ">
        Recodd
      </span>
    </motion.div>
  );
};
