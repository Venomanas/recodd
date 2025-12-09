"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

type AnimatedButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & Omit<HTMLMotionProps<"button">, "children" | "className" | "disabled">;

const Animatedbutton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  disabled,
  ...rest
}) => {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 0 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className={clsx(
        "px-6 py-2 rounded-full text-sm font-medium transition-all",
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Animatedbutton;
