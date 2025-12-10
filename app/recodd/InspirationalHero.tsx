"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Animatedbutton from "@/app/components/Animatedbutton";

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
        w-full
        border-b border-gray-800/70
        bg-[#121212]
        bg-[radial-gradient(circle_at_top,rgba(229,57,53,0.26),rgba(18,18,18,1)_55%,#000000_100%)]`
      "
    >
      <div
        className="
          w-full
          px-4 md:px-10 lg:px-20
          py-10 md:py-16
          grid lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]
          gap-10
          items-center
        "
      >
        {/* LEFT: heading + CTAs */}
        <div className="space-y-5 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E53935]">
            Commission-free collaborations
          </p>

          <div className="h-16 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white"
              >
                {rotating[index]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <p className="text-sm md:text-base text-gray-300 max-w-xl">
            Recodd connects freelancers and organizations without middlemen,
            fees, or friction. You keep what you earn. They get work that
            actually gets done.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Animatedbutton className="px-5 py-2.5 text-sm rounded-full bg-[#E53935] text-white font-medium shadow-sm hover:shadow-md hover:-translate-y-1px  transition-all">
              Get started as Freelancer
            </Animatedbutton>
            <Animatedbutton className="px-5 py-2.5 text-sm rounded-full border border-gray-600 text-gray-100 hover:bg-gray-800/70 transition-all">
              Post a project
            </Animatedbutton>
          </div>

          <p className="text-[11px] text-gray-400">
            No platform fees · You negotiate directly · Built for long-term work
          </p>
        </div>

        {/* RIGHT: stats card, fills side so it’s not “empty” */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            rounded-2xl
            border border-gray-800
            bg-black/30
            backdrop-blur-sm
            p-5
            space-y-4
          "
        >
          <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.16em]">
            Live snapshot
          </p>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-xl border border-gray-800 bg-[#121212] p-3">
              <p className="font-semibold text-sm text-white">120+</p>
              <p className="text-[11px] text-gray-400">Active freelancers</p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-[#121212] p-3">
              <p className="font-semibold text-sm text-white">80+</p>
              <p className="text-[11px] text-gray-400">Open briefs</p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-[#121212] p-3">
              <p className="font-semibold text-sm text-[#E53935]">0%</p>
              <p className="text-[11px] text-gray-400">Platform fee</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
