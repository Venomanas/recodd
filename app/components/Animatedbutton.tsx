"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

type AnimatedButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
} & Omit<HTMLMotionProps<"button">, "children" | "className" | "disabled">;

const Animatedbutton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  disabled,
  variant = "primary",
  ...rest
}) => {
  const variants = {
    primary: `
      relative overflow-hidden
      bg-gradient-to-br from-red-500 to-red-600
      text-white
      hover:from-red-600 hover:to-red-700
      dark:from-red-500 dark:to-red-600
      dark:hover:from-red-600 dark:hover:to-red-700
      shadow-lg shadow-red-500/25
      hover:shadow-xl hover:shadow-red-500/40
      before:absolute before:inset-0
      before:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_70%)]
      before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
    `,
    secondary: `
      relative overflow-hidden
      bg-white dark:bg-zinc-800
      text-gray-900 dark:text-white
      border-2 border-gray-200 dark:border-zinc-700
      hover:border-red-500 dark:hover:border-red-500
      hover:text-red-600 dark:hover:text-red-400
      shadow-md hover:shadow-lg
    `,
    ghost: `
      relative overflow-hidden
      bg-transparent
      text-gray-700 dark:text-gray-300
      border border-gray-300 dark:border-zinc-600
      hover:bg-gray-100 dark:hover:bg-zinc-800
      hover:border-gray-400 dark:hover:border-zinc-500
    `,
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.05, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.95, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={clsx(
        "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        className
      )}
      disabled={disabled}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center">
        {children}
      </span>
    </motion.button>
  );
};

export default Animatedbutton;
