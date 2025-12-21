/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Profile } from "@/lib/recodd/types";
import {
  getFreelancers,
  getBusinesses,
} from "@/lib/recodd/services/market.service";
import { FiltersBar } from "@/app/recodd/MarketplaceSection/FiltersBar";
import { ProfileCard } from "@/app/recodd/MarketplaceSection/ProfileCard";
import { LayoutContainer } from "@/app/components/LayoutContainer";
import { ContactModal } from "@/app/components/ContactModal";

type Tab = "freelancers" | "business";

export const MarketplaceSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("freelancers");
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState<string>("all");
  const [data, setData] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const source = data;

  useEffect(() => {
    setLoading(true);
    setError(null);
    const load = async () => {
      try {
        const res =
          activeTab === "freelancers"
            ? await getFreelancers()
            : await getBusinesses();
        setData(res.data);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeTab]);

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

  const heading = activeTab === "freelancers" ? "Find Talent" : "Find Projects";
  const subheading =
    activeTab === "freelancers"
      ? "Browse highly skilled professionals ready to start immediately."
      : "Discover organizations actively hiring for real projects.";

  return (
    <section
      className="
      relative w-full py-16 md:py-20
      bg-white dark:bg-black
    "
    >
      <LayoutContainer>
        {/* Header with tabs */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {heading}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              {subheading}
            </p>
          </div>

          {/* Desktop tabs */}
          <div className="hidden md:flex gap-2">
            {(["freelancers", "business"] as Tab[]).map(tab => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-semibold
                  transition-all duration-300
                  ${
                    activeTab === tab
                      ? "bg-[#EF4444] text-white shadow-lg"
                      : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  }
                `}
              >
                {tab === "freelancers" ? "Freelancers" : "Businesses"}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden mb-6 flex gap-2">
          {(["freelancers", "business"] as Tab[]).map(tab => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileTap={{ scale: 0.95 }}
              className={`
                flex-1 py-3 rounded-full text-sm font-semibold
                transition-all duration-300
                ${
                  activeTab === tab
                    ? "bg-[#EF4444] text-white shadow-lg"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
                }
              `}
            >
              {tab === "freelancers" ? "Freelancers" : "Businesses"}
            </motion.button>
          ))}
        </div>

        {/* Filters */}
        <FiltersBar
          query={query}
          availability={availability}
          onQueryChange={setQuery}
          onAvailabilityChange={setAvailability}
        />

        {/* List */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Loading {activeTab}...
            </p>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-3xl border-2 border-dashed border-gray-300 dark:border-zinc-700 p-12 text-center"
          >
            <p className="text-base text-gray-500 dark:text-gray-400">
              No matches found. Try adjusting your filters or search terms.
            </p>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(profile => (
                <ProfileCard
                  key={`${profile.type}-${profile.id}`}
                  profile={profile}
                  mode={activeTab}
                  onContact={() => setSelectedProfile(profile)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {selectedProfile && (
          <ContactModal
            profileId={selectedProfile.id}
            profileType={selectedProfile.type}
            onClose={() => setSelectedProfile(null)}
          />
        )}
      </LayoutContainer>
    </section>
  );
};
