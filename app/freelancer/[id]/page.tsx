"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFreelancerById } from "@/lib/recodd/services/market.service";
import { Profile } from "@/lib/recodd/types";
import { ContactModal } from "@/app/components/ContactModal";
import Animatedbutton from "@/app/components/Animatedbutton";
import { MapPin, Clock, Briefcase, CheckCircle2, User } from "lucide-react";
import { LayoutContainer } from "@/app/components/LayoutContainer";

export default function FreelancerProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getFreelancerById(id as string);
        setProfile(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[rgb(var(--accent))] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-20 text-center text-[rgb(var(--muted))]">
        Profile not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] pb-20">
      {/* 1. Header Banner */}
      <div className="h-48 md:h-64 w-full bg-linear-to-r from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <LayoutContainer>
        <div className="relative -mt-20 md:-mt-24 grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8">
          {/* LEFT: Main Info */}
          <div className="space-y-8">
            {/* Identity Block */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-[rgb(var(--surface))] border-4 border-[rgb(var(--bg))] shadow-xl flex items-center justify-center text-[rgb(var(--muted))] overflow-hidden">
                <User className="w-16 h-16 opacity-50" />
              </div>

              <div className="mt-6 space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-xl text-[rgb(var(--muted))] font-medium flex items-center gap-2">
                  <Briefcase size={20} className="text-[rgb(var(--accent))]" />
                  {profile.role}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-[rgb(var(--muted))] pt-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
                    <MapPin size={14} /> {profile.location || "Remote"}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
                    <Clock size={14} /> {profile.experience || "Available now"}
                  </span>
                </div>
              </div>
            </div>

            {/* About / Bio */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[rgb(var(--text))]">
                About
              </h3>
              <p className="text-[rgb(var(--muted))] leading-relaxed text-lg">
                Experienced {profile.role} with a proven track record.
                Passionate about building high-quality solutions and delivering
                value to clients. (This is placeholder bio text usually fetched
                from DB).
              </p>
            </div>

            {/* Skills Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[rgb(var(--text))]">
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.tags?.map(tag => (
                  <span
                    key={tag}
                    className="
                      px-4 py-2 rounded-xl 
                      bg-[rgb(var(--surface))] 
                      text-sm font-medium text-[rgb(var(--text))]
                      border border-transparent hover:border-[rgb(var(--border))]
                      transition-colors
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky "Hire Me" Card */}
          <div className="lg:pt-20">
            <div className="sticky top-24 rounded-3xl bg-[rgb(var(--surface))] p-1 shadow-2xl shadow-black/5 dark:shadow-black/20">
              <div className="bg-[rgb(var(--bg))] rounded-[20px] p-6 border border-[rgb(var(--border))] space-y-6">
                {/* Rate / Budget */}
                <div>
                  <p className="text-sm font-medium text-[rgb(var(--muted))] uppercase tracking-wider mb-1">
                    Rate
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[rgb(var(--text))]">
                      {profile.budget}
                    </span>
                    <span className="text-[rgb(var(--muted))]">/project</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-[rgb(var(--text))]">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>Verified Freelancer</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[rgb(var(--text))]">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>
                      {profile.availability || "Flexible Availability"}
                    </span>
                  </div>
                </div>

                <div className="pt-2" onClick={() => setOpen(true)}>
                  <Animatedbutton
                    variant="primary"
                    className="w-full justify-center py-4 text-base"
                  >
                    Contact {profile.name.split(" ")[0]}
                  </Animatedbutton>
                </div>

                <p className="text-xs text-center text-[rgb(var(--muted))]">
                  0% Commission. You pay directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>

      {open && (
        <ContactModal
          profileId={profile.id}
          profileType="freelancer"
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
