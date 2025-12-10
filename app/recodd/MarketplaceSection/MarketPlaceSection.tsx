"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Profile } from "@/lib/recodd/types";
import { freelancers, businesses } from "@/lib/recodd/mockData";
import { FiltersBar } from "@/app/recodd/MarketplaceSection/FiltersBar";
import { ProfileCard } from "@/app/recodd/MarketplaceSection/ProfileCard";

type Tab = "freelancers" | "business";

export const MarketplaceSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("freelancers");
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState<string>("all");

  const source: Profile[] =
    activeTab === "freelancers" ? freelancers : businesses;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return source.filter(profile => {
      const matchesQuery =
        !q ||
        profile.name.toLowerCase().includes(q) ||
        profile.role.toLowerCase().includes(q) ||
        profile.tags?.some(tag => tag.toLowerCase().includes(q));

      const matchesAvailability =
        availability === "all" || profile.availability === availability;

      return matchesQuery && matchesAvailability;
    });
  }, [source, query, availability]);

  const heading = activeTab === "freelancers" ? "Find talent" : "Find projects";
  const subheading =
    activeTab === "freelancers"
      ? "Browse highly skilled professionals ready to start immediately."
      : "Discover organizations actively hiring for real projects.";

  return (
    <section className="w-full px-4 py-10 md:px-10 md:py-12 lg:px-20">
      {/* Desktop tabs */}
      <div className="hidden md:flex items-center justify-between gap-6 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {heading}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {subheading}
          </p>
        </div>

        <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-full">
          <Animatedbutton
            onClick={() => setActiveTab("freelancers")}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === "freelancers"
                ? "bg-[#E53935] text-white shadow-sm"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-zinc-700"
            }`}
          >
            Freelancers
          </Animatedbutton>
          <Animatedbutton
            onClick={() => setActiveTab("business")}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === "business"
                ? "bg-[#E53935] text-white shadow-sm"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-zinc-700"
            }`}
          >
            Businesses
          </Animatedbutton>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden mb-5 bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl flex">
        <Animatedbutton
          onClick={() => setActiveTab("freelancers")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === "freelancers"
              ? "bg-[#E53935] text-white shadow-sm"
              : "text-gray-700 dark:text-gray-200"
          }`}
        >
          Freelancers
        </Animatedbutton>
        <Animatedbutton
          onClick={() => setActiveTab("business")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === "business"
              ? "bg-[#E53935] text-white shadow-sm"
              : "text-gray-700 dark:text-gray-200"
          }`}
        >
          Businesses
        </Animatedbutton>
      </div>

      {/* Heading (small screens) */}
      <div className="md:hidden mb-3">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {heading}
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {subheading}
        </p>
      </div>

      {/* Filters */}
      <FiltersBar
        query={query}
        availability={availability}
        onQueryChange={setQuery}
        onAvailabilityChange={setAvailability}
      />

      {/* List */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 dark:border-zinc-700 p-8 text-center text-sm text-gray-500 dark:text-gray-400">
          No matches yet. Try adjusting your filters or searching for a
          different skill.
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          >
            {filtered.map(profile => (
              <ProfileCard
                key={`${profile.type}-${profile.id}`}
                profile={profile}
                mode={activeTab}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};
