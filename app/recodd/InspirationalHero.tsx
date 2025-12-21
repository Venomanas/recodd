"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Aperture } from "lucide-react";

const rotating = [
  "Connect with top talent.",
  "Make your online presence.",
  "Build your dream project.",
  "Work without commissions.",
];

export const InspirationalHero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex(prev => (prev + 1) % rotating.length),
      2800
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        border-b border-gray-200 dark:border-zinc-800
        bg-white dark:bg-black
      "
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-100">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/10 dark:bg-red-600/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr,0.8fr] gap-8 md:gap-10 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* LEFT: heading + CTAs */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-2xl">
            {/* Animated heading */}
            <div className="h-16 sm:h-20 md:h-24 lg:h-28 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                >
                  {rotating[index]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-full border border-red-200 dark:border-red-500/20">
              <Aperture
                size={14}
                className="animate-spin sm:w-4 sm:h-4"
                style={{ animationDuration: "8s" }}
              />
              <span className="hidden xs:inline">
                Commission-free collaborations
              </span>
              <span className="xs:hidden">Commission-free</span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              Recodd connects freelancers and organizations without middlemen,
              fees, or friction. You keep what you earn. They get work that
              actually gets done.
            </p>

            {/* CTAs */}
            <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
              <Animatedbutton
                variant="primary"
                className="w-full xs:w-auto justify-center"
              >
                Get started as Freelancer
              </Animatedbutton>
              <Animatedbutton
                variant="secondary"
                className="w-full xs:w-auto justify-center"
              >
                Post a project
              </Animatedbutton>
            </div>

            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              No platform fees · You negotiate directly · Built for long-term
              work
            </p>
          </div>

          {/* RIGHT: stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              rounded-2xl sm:rounded-3xl
              bg-gray-50 dark:bg-zinc-900/50
              backdrop-blur-xl
              border border-gray-200 dark:border-zinc-800
              p-5 sm:p-6 md:p-8
              shadow-xl
              w-full
            "
          >
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
              Live Snapshot
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {[
                {
                  value: "120+",
                  label: "Active freelancers",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  value: "80+",
                  label: "Open briefs",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  value: "0%",
                  label: "Platform fee",
                  gradient: "from-red-500 to-orange-500",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="
                    relative
                    rounded-xl sm:rounded-2xl
                    bg-white dark:bg-zinc-800
                    border border-gray-200 dark:border-zinc-700
                    p-3 sm:p-4
                    text-center
                    group
                    cursor-default
                  "
                >
                  <div
                    className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <p className="relative text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                    {stat.value}
                  </p>
                  <p className="relative text-[9px] sm:text-xs text-gray-600 dark:text-gray-400 leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
