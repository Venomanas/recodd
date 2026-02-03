"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBusinessById } from "@/lib/recodd/services/market.service";
import { Profile } from "@/lib/recodd/types";
import { ContactModal } from "@/app/components/ContactModal";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { MapPin, Clock, Briefcase, CheckCircle2 } from "lucide-react";
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
        Business profile not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] pb-24 md:pb-20">
      {/* 1. Header Banner */}
      <div className="h-48 md:h-64 w-full bg-linear-to-r from-[rgb(var(--surface))] to-[rgb(var(--bg))] relative overflow-hidden border-b border-[rgb(var(--border))]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <LayoutContainer>
        <div className="py-4">
          <Breadcrumbs
            items={[
              { label: "Businesses", href: "/?type=business" },
              {
                label: profile.role,
                href: `/?type=business&q=${profile.role}`,
              },
              { label: profile.name },
            ]}
          />
        </div>

        <div className="relative -mt-12 md:-mt-16 grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8">
          {/* LEFT: Main Info */}
          <div className="space-y-8">
            {/* Identity Block */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[rgb(var(--surface))] border-4 border-white dark:border-[rgb(var(--bg))] shadow-xl flex items-center justify-center text-[rgb(var(--muted))] overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`}
                  alt={profile.name}
                  className="w-full h-full object-cover bg-zinc-100 dark:bg-zinc-800"
                />
              </div>

              <div className="mt-6 space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-xl text-[rgb(var(--text-secondary))] font-medium flex items-center gap-2">
                  <Briefcase size={20} className="text-[rgb(var(--accent))]" />
                  {profile.role}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-[rgb(var(--muted))] pt-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
                    <MapPin size={14} /> {profile.location || "Remote"}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
                    <Clock size={14} /> {profile.experience || "Hiring now"}
                  </span>
                </div>
              </div>
            </div>

            {/* About / Bio */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[rgb(var(--text))]">
                About
              </h3>
              <p className="text-[rgb(var(--text-secondary))] leading-relaxed text-lg">
                Leading {profile.role} company looking for top talent. We offer
                competitive rates and exciting projects. (This is placeholder
                bio text usually fetched from DB).
              </p>
            </div>

            {/* Skills / Requirements */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[rgb(var(--text))]">
                Looking For
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.tags?.map(tag => (
                  <span
                    key={tag}
                    className="
                      px-4 py-2 rounded-full 
                      bg-[rgb(var(--surface))] 
                      text-sm font-medium text-[rgb(var(--text-secondary))]
                      border border-[rgb(var(--border))]
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Desktop Sticky "Contact" Card */}
          <div className="hidden lg:block lg:pt-24">
            <div className="sticky top-24 rounded-2xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-6 shadow-xl shadow-black/5 dark:shadow-black/20">
              {/* Budget */}
              <div className="mb-6">
                <p className="text-xs font-bold text-[rgb(var(--muted))] uppercase tracking-wider mb-1">
                  Project Budget
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[rgb(var(--text))]">
                    {profile.budget}
                  </span>
                  <span className="text-[rgb(var(--muted))]">/project</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-[rgb(var(--text))]">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Verified Business</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[rgb(var(--text))]">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>{profile.availability || "Actively Hiring"}</span>
                </div>
              </div>

              <Animatedbutton
                onClick={() => setOpen(true)}
                variant="primary"
                className="w-full justify-center h-12 text-base"
              >
                Contact {profile.name.split(" ")[0]}
              </Animatedbutton>

              <p className="text-xs text-center text-[rgb(var(--muted))] mt-4">
                0% Commission. Direct connection.
              </p>
            </div>
          </div>
        </div>
      </LayoutContainer>

      {/* MOBILE STICKY CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 p-4 bg-[rgb(var(--surface))] border-t border-[rgb(var(--border))] z-40">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-[rgb(var(--muted))] font-medium uppercase">
              Budget
            </p>
            <p className="text-lg font-bold text-[rgb(var(--text))]">
              {profile.budget}
            </p>
          </div>
          <Animatedbutton
            onClick={() => setOpen(true)}
            variant="primary"
            className="flex-1 justify-center h-12 text-base"
          >
            Contact {profile.name.split(" ")[0]}
          </Animatedbutton>
        </div>
      </div>

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
