"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Aperture } from "lucide-react";

type LogoVariant = "navbar" | "footer" | "mark";

type LogoProps = {
  variant?: LogoVariant;
};

export const Logo = ({ variant = "navbar" }: LogoProps) => {
  const fullSrc = "/logo.webp"; // Your full brand logo
  const markSrc = "/logo-icon.webp"; // Your icon logo

  if (variant === "footer") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-500 to-[#EF4444] flex items-center justify-center shadow-lg shadow-red-500/30">
          {/* <Aperture className="w-6 h-6 text-white" /> */}

          <Image
            src={fullSrc}
            alt="Recodd full logo"
            width={100}
            height={100}
            priority
            className="object-contain"
          />
        </div>
      </motion.div>
    );
  }

  if (variant === "mark") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ rotate: 12 }}
        transition={{ duration: 0.3 }}
        className="flex items-center"
      >
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
          <Aperture className="w-7 h-7 text-white" />
        </div>
      </motion.div>
    );
  }

  // NAVBAR: icon + text
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 select-none"
    >
      <motion.div
        whileHover={{ rotate: 12, scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="w-10 h-10 rounded-xl bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30"
      >
        <Aperture className="w-6 h-6 text-white" /> 
        <Image
        src={markSrc}
        alt="Recodd"
        width={100}
        height={100}
        priority
        className="object-contain"
      />
      </motion.div>
      
    </motion.div>
  );
};
