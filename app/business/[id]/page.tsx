"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBusinessById } from "@/lib/recodd/services/market.service";
import { Profile } from "@/lib/recodd/types";
import { ContactModal } from "@/app/components/ContactModal";
import Animatedbutton from "@/app/components/Animatedbutton";
import { MapPin, Building2, Briefcase } from "lucide-react";
import { LayoutContainer } from "@/app/components/LayoutContainer";

export default function BusinessProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBusinessById(id as string);
        setProfile(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Profile not found
      </div>
    );

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] pb-20">
      {/* 1. Header Banner - Slightly different gradient for Business */}
      <div className="h-48 md:h-64 w-full bg-linear-to-r from-zinc-800 to-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%,100%_100%] animate-[shimmer_3s_infinite]"></div>
      </div>

      <LayoutContainer>
        <div className="relative -mt-20 md:-mt-24 grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8">
          {/* LEFT */}
          <div className="space-y-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white border-4 border-[rgb(var(--bg))] shadow-xl flex items-center justify-center text-zinc-800 overflow-hidden">
                <Building2 className="w-16 h-16" />
              </div>

              <div className="mt-6 space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-xl text-[rgb(var(--muted))]">
                  Looking for:{" "}
                  <span className="font-medium text-[rgb(var(--text))]">
                    {profile.role}
                  </span>
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-[rgb(var(--muted))] pt-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} /> {profile.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={16} /> {profile.availability}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[rgb(var(--text))]">
                Project Brief
              </h3>
              <p className="text-[rgb(var(--muted))] leading-relaxed text-lg">
                We are looking for a talented individual to join our team for
                this project. The ideal candidate should have experience in the
                technologies listed below.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[rgb(var(--text))]">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.tags?.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-[rgb(var(--surface))] text-sm text-[rgb(var(--text))] border border-[rgb(var(--border))]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:pt-20">
            <div className="sticky top-24 rounded-3xl bg-[rgb(var(--surface))] p-1 shadow-2xl shadow-black/5 dark:shadow-black/20">
              <div className="bg-[rgb(var(--bg))] rounded-[20px] p-6 border border-[rgb(var(--border))] space-y-6">
                <div>
                  <p className="text-sm font-medium text-[rgb(var(--muted))] uppercase tracking-wider mb-1">
                    Budget
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[rgb(var(--text))]">
                      {profile.budget}
                    </span>
                  </div>
                </div>

                <div className="pt-2" onClick={() => setOpen(true)}>
                  <Animatedbutton
                    variant="primary"
                    className="w-full justify-center py-4 text-base"
                  >
                    Apply for Role
                  </Animatedbutton>
                </div>

                <p className="text-xs text-center text-[rgb(var(--muted))]">
                  Send your proposal directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>

      {open && (
        <ContactModal
          profileId={profile.id}
          profileType="business"
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
