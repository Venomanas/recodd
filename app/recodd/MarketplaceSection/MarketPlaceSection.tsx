/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
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
import { useSearchParams } from "next/navigation";
import SkeletonCard from "./SkeletonCard";

type Tab = "freelancers" | "business";

// We wrap the content in a separate component to safely use useSearchParams

const MarketplaceContent = () => {
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState<string>("all");
  const [data, setData] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const SearchParams = useSearchParams();
  const typeParam = SearchParams.get("type");
  const initialTab: "freelancers" | "business" =
    typeParam === "business" ? "business" : "freelancers";

  const [activeTab, setActiveTab] = useState<"freelancers" | "business">(
    initialTab
  );

  useEffect(() => {
    const type = SearchParams.get("type");
    if (type === "business") setActiveTab("business");
    else if (
      type === "freelancer" ||
      type === "freelance" ||
      type === "freelancers"
    )
      setActiveTab("freelancers");
  }, [SearchParams]);
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
      id="marketplace"
      className="
      relative w-full py-16 md:py-20
      bg-[rgb(var(--bg))] scroll-mt-20
    "
    >
      <LayoutContainer>
        {/* Header with tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] mb-3 tracking-tight">
              {heading}
            </h2>
            <p className="text-base text-[rgb(var(--muted))] max-w-lg leading-relaxed">
              {subheading}
            </p>
          </div>

          {/* Desktop tabs */}
          <div className="hidden md:flex bg-[rgb(var(--surface))] p-1.5 rounded-full border border-[rgb(var(--border))]">
            {(["freelancers", "business"] as Tab[]).map(tab => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    activeTab === tab
                      ? "text-[rgb(var(--text))] shadow-sm bg-[rgb(var(--bg))]"
                      : "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
                  }
                `}
              >
                {tab === "freelancers" ? "Freelancers" : "Businesses"}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden mb-8 flex bg-[rgb(var(--surface))] p-1 rounded-xl">
          {(["freelancers", "business"] as Tab[]).map(tab => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileTap={{ scale: 0.95 }}
              className={`
                flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                ${
                  activeTab === tab
                    ? "bg-[rgb(var(--bg))] text-[rgb(var(--text))] shadow-sm"
                    : "text-[rgb(var(--muted))]"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-3xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-12 text-center"
          >
            <p className="text-base text-[rgb(var(--muted))]">
              No matches found. Try adjusting your filters or search terms.
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
          >
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

export const MarketplaceSection = () => {
  return (
    <Suspense
      fallback={<div className="py-20 text-center">Loading marketplace...</div>}
    >
      <MarketplaceContent />
    </Suspense>
  );
};
