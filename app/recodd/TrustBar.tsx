"use client";

import React from "react";
import { motion } from "framer-motion";

const companies = ["Microsoft", "Airbnb", "Google", "Spotify", "Amazon"];

// Placeholder for logos since we don't have SVGs. Using text for now or simple shapes.
const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
    <div className="w-6 h-6 rounded-full bg-current" />
    <span className="text-lg font-bold text-[rgb(var(--text))]">{name}</span>
  </div>
);

export const TrustBar = () => {
  return (
    <section className="w-full py-10 border-b border-[rgb(var(--border))] bg-white dark:bg-zinc-900/50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <p className="text-center text-sm font-semibold text-[rgb(var(--muted))] uppercase tracking-widest mb-8">
          Trusted by 500+ businesses
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
          {companies.map(company => (
            <LogoPlaceholder key={company} name={company} />
          ))}
        </div>
      </div>
    </section>
  );
};
