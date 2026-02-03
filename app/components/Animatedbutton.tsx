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
      rounded-md
      shadow-sm
      hover:bg-[rgb(var(--accent-hover))]
      hover:-translate-y-0.5
      transition-all duration-200 ease-out
    `,
    secondary: `
      relative overflow-hidden
      bg-transparent
      text-[rgb(var(--accent))]
      border border-[rgb(var(--accent))]
      rounded-md
      hover:bg-[rgb(var(--accent)/0.05)]
      transition-all duration-200
    `,
    ghost: `
      relative overflow-hidden
      bg-transparent
      text-[rgb(var(--text-secondary))]
      rounded-md
      hover:bg-[rgb(var(--muted)/0.1)]
      transition-all duration-200
    `,
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={clsx(
        "px-6 py-2.5 text-sm font-medium transition-all duration-300",
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        className,
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
