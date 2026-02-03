import React from "react";
import { motion } from "framer-motion";

// type Props = object;

export default function Anas({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col min-h-screen"
    >
      {children}
    </motion.div>
  );
}
