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
  bg-[rgb(var(--accent))] 
  text-white
  font-semibold tracking-wide
  shadow-[0_0_20px_-5px_rgb(var(--accent)/0.5)]
  hover:shadow-[0_0_25px_-5px_rgb(var(--accent)/0.6)]
  hover:bg-[rgb(var(--accent-hover))]
  hover:-translate-y-0.5
  transition-all duration-300 ease-out
`,
    secondary: `
  relative overflow-hidden
  bg-transparent
  text-[rgb(var(--text))]
  border border-[rgb(var(--border))]
  hover:border-[rgb(var(--accent))]
  hover:text-[rgb(var(--accent))]
  hover:bg-[rgb(var(--accent)/0.05)]
  transition-all duration-300
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
