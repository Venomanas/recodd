"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type LogoVariant = "navbar" | "footer" | "mark";

type LogoProps = {
  variant?: LogoVariant;
};

export const Logo = ({ variant = "navbar" }: LogoProps) => {
  // adjust these paths to match your /public files
  const fullSrc = "/logo-icon.webp"; // circular shutter only
  const markSrc = "/logo.webp"; // full RECODD brand

  if (variant === "footer") {
    // FOOTER: full brand logo
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center"
      >
        <Image
          src={fullSrc}
          alt="Recodd full logo"
          width={90}
          height={30}
          priority
          className="object-contain"
        />
      </motion.div>
    );
  }

  if (variant === "mark") {
    // MARK ONLY: just the red shutter for future use
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center"
      >
        <Image
          src={markSrc}
          alt="Recodd icon"
          width={40}
          height={40}
          priority
          className="object-contain"
        />
      </motion.div>
    );
  }

  // NAVBAR: icon + text (bigger)
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 select-none"
    >
      <Image
        src={markSrc}
        alt="Recodd icon"
        width={140}
        height={100}
        priority
        className="object-contain"
      />
    </motion.div>
  );
};
