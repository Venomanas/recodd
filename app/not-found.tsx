"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Animatedbutton from "@/app/components/Animatedbutton";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[rgb(var(--bg))]">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgb(var(--text)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--text)) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[rgb(var(--bg))] to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center px-4"
      >
        <div className="w-20 h-20 mx-auto bg-[rgb(var(--surface))] rounded-3xl flex items-center justify-center border border-[rgb(var(--border))] mb-6 shadow-xl shadow-black/5">
          <AlertCircle className="w-10 h-10 text-[rgb(var(--accent))]" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--text))] mb-3 tracking-tight">
          Page not found
        </h1>
        <p className="text-[rgb(var(--muted))] text-lg mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or deleted.
        </p>

        <Link href="/">
          <Animatedbutton variant="primary" className="mx-auto">
            Return Home
          </Animatedbutton>
        </Link>
      </motion.div>
    </div>
  );
}
