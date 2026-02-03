"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { ProfileCard } from "@/app/recodd/MarketplaceSection/ProfileCard";
import { Profile } from "@/lib/recodd/types";
import { getFreelancers } from "@/lib/recodd/services/market.service";

// Category mappings
const categoryConfig: Record<string, { title: string; description: string }> = {
  development: {
    title: "Development",
    description: "Expert developers for your next project",
  },
  design: {
    title: "Design",
    description: "Creative designers to bring your vision to life",
  },
  "ui-ux": {
    title: "UI/UX",
    description: "User experience specialists for exceptional interfaces",
  },
  marketing: {
    title: "Marketing",
    description: "Marketing professionals to grow your business",
  },
  "data-science": {
    title: "Data Science",
    description: "Data scientists for insights and analytics",
  },
  "mobile-apps": {
    title: "Mobile Apps",
    description: "Mobile developers for iOS and Android",
  },
  webflow: {
    title: "Webflow",
    description: "Webflow experts for no-code solutions",
  },
  consulting: {
    title: "Consulting",
    description: "Business consultants for strategic growth",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const category = categoryConfig[slug] || {
    title: "Category",
    description: "Browse talent",
  };

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const { data } = await getFreelancers();
        // Filter by category/role - in a real app, this would be done server-side
        const filtered = data.filter(
          profile =>
            profile.role?.toLowerCase().includes(slug.replace("-", " ")) ||
            profile.tags?.some((tag: string) =>
              tag.toLowerCase().includes(slug.replace("-", " ")),
            ),
        );
        setProfiles(filtered.slice(0, 5)); // Show 5 talents
      } catch (error) {
        console.error("Failed to load profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, [slug]);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-[rgb(var(--surface))] border-b border-[rgb(var(--border))]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--text))] mb-4">
            {category.title}
          </h1>
          <p className="text-lg md:text-xl text-[rgb(var(--muted))]">
            {category.description}
          </p>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="py-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[rgb(var(--accent))] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : profiles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[rgb(var(--muted))] text-lg">
                No talents found in this category yet.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[rgb(var(--text))] mb-2">
                  Featured Talent ({profiles.length})
                </h2>
                <p className="text-[rgb(var(--muted))]">
                  Top-rated professionals in {category.title.toLowerCase()}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map(profile => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    mode="freelancers"
                    onContact={() => {}}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
