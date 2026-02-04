"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBusinessById } from "@/lib/recodd/services/market.service";
import { Profile } from "@/lib/recodd/types";
import { ContactModal } from "@/app/components/ContactModal";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import {
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Building2,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import { LayoutContainer } from "@/app/components/LayoutContainer";
import Image from "next/image";

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
      <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg))]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[rgb(var(--accent))] border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-[rgb(var(--accent))]/20 rounded-full" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg))]">
        <div className="text-center">
          <Building2
            size={64}
            className="mx-auto mb-4 text-[rgb(var(--muted))]"
          />
          <p className="text-xl text-[rgb(var(--text-secondary))]">
            Business profile not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Professional Header */}
      <div className="relative h-32 sm:h-40 md:h-48 w-full overflow-hidden bg-[rgb(var(--primary))] border-b border-[rgb(var(--border))]">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.03) 20px,
              rgba(255,255,255,0.03) 40px
            )`,
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[rgb(var(--accent))]" />
      </div>

      <LayoutContainer>
        {/* Breadcrumbs */}
        <div className="pt-4 pb-2 -mt-2 relative z-10">
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

        {/* Main Content Grid */}
        <div className="relative pb-24 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* LEFT COLUMN - Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Profile Header Card */}
              <div className="bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))] p-6 sm:p-8 -mt-16 sm:-mt-20 relative z-10 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Logo */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
                      <Image
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}&backgroundColor=f97316`}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                        width={96}
                        height={96}
                        unoptimized
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(var(--text))] tracking-tight mb-2">
                          {profile.name}
                        </h1>
                        <p className="text-base sm:text-lg text-[rgb(var(--text-secondary))] font-medium flex items-center gap-2">
                          <Briefcase
                            size={18}
                            className="text-[rgb(var(--accent))] shrink-0"
                          />
                          <span className="truncate">{profile.role}</span>
                        </p>
                      </div>
                    </div>

                    {/* Meta Info Pills */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-sm font-medium text-[rgb(var(--text-secondary))]">
                        <MapPin size={14} className="shrink-0" />
                        <span className="truncate">
                          {profile.location || "Remote"}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-sm font-medium text-[rgb(var(--text-secondary))]">
                        <Clock size={14} className="shrink-0" />
                        <span className="truncate">
                          {profile.experience || "Hiring now"}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[rgb(var(--success))]/10 border border-[rgb(var(--success))]/20 text-sm font-medium text-[rgb(var(--success))]">
                        <CheckCircle2 size={14} className="shrink-0" />
                        <span>Verified</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[rgb(var(--primary))] flex items-center justify-center">
                    <Building2
                      size={20}
                      className="text-[rgb(var(--primary-foreground))]"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[rgb(var(--text))]">
                    About the Company
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-[rgb(var(--text-secondary))] leading-relaxed">
                  Leading {profile.role} company looking for top talent. We
                  offer competitive rates and exciting projects in a dynamic
                  environment. Our team is dedicated to delivering exceptional
                  results and fostering professional growth.
                </p>
              </div>

              {/* Looking For Section */}
              <div className="bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[rgb(var(--accent))] flex items-center justify-center">
                    <Users
                      size={20}
                      className="text-[rgb(var(--accent-foreground))]"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[rgb(var(--text))]">
                    Looking For
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {profile.tags?.map((tag, index) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-lg bg-[rgb(var(--bg))] text-sm sm:text-base font-medium text-[rgb(var(--text))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))]/5 transition-all duration-200"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))] p-6 sm:p-8 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp
                        size={18}
                        className="text-[rgb(var(--accent))]"
                      />
                      <h3 className="font-semibold text-[rgb(var(--text))]">
                        Project Budget
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-[rgb(var(--text))]">
                      {profile.budget}
                    </p>
                    <p className="text-sm text-[rgb(var(--muted))]">
                      Per project
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={18} className="text-[rgb(var(--accent))]" />
                      <h3 className="font-semibold text-[rgb(var(--text))]">
                        Status
                      </h3>
                    </div>
                    <p className="text-lg font-semibold text-[rgb(var(--text-secondary))]">
                      {profile.availability || "Actively Hiring"}
                    </p>
                    <p className="text-sm text-[rgb(var(--muted))]">
                      Ready to start
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Sticky Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-6 space-y-6">
                {/* Contact Card */}
                <div className="bg-[rgb(var(--surface))] rounded-lg border-2 border-[rgb(var(--border))] p-6 shadow-sm">
                  {/* Budget */}
                  <div className="mb-6 pb-6 border-b border-[rgb(var(--border))]">
                    <p className="text-xs font-bold text-[rgb(var(--muted))] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <TrendingUp size={14} />
                      Project Budget
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[rgb(var(--text))]">
                        {profile.budget}
                      </span>
                      <span className="text-[rgb(var(--muted))] text-sm">
                        /project
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-[rgb(var(--text))]">
                      <div className="w-5 h-5 rounded-full bg-[rgb(var(--success))]/10 flex items-center justify-center shrink-0">
                        <CheckCircle2
                          size={14}
                          className="text-[rgb(var(--success))]"
                        />
                      </div>
                      <span>Verified Business</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[rgb(var(--text))]">
                      <div className="w-5 h-5 rounded-full bg-[rgb(var(--success))]/10 flex items-center justify-center shrink-0">
                        <CheckCircle2
                          size={14}
                          className="text-[rgb(var(--success))]"
                        />
                      </div>
                      <span>{profile.availability || "Actively Hiring"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[rgb(var(--text))]">
                      <div className="w-5 h-5 rounded-full bg-[rgb(var(--success))]/10 flex items-center justify-center shrink-0">
                        <CheckCircle2
                          size={14}
                          className="text-[rgb(var(--success))]"
                        />
                      </div>
                      <span>0% Commission</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Animatedbutton
                    onClick={() => setOpen(true)}
                    variant="primary"
                    className="w-full justify-center h-12 text-base font-semibold"
                  >
                    Contact {profile.name.split(" ")[0]}
                    <ArrowRight size={18} className="ml-2" />
                  </Animatedbutton>

                  <p className="text-xs text-center text-[rgb(var(--muted))] mt-4">
                    Direct connection • No middleman fees
                  </p>
                </div>

                {/* Trust Badge */}
                <div className="bg-[rgb(var(--accent))]/5 border border-[rgb(var(--accent))]/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[rgb(var(--accent))] flex items-center justify-center shrink-0">
                      <Award
                        size={20}
                        className="text-[rgb(var(--accent-foreground))]"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[rgb(var(--text))] mb-1">
                        Verified Company
                      </h4>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        This business has been verified and approved by our
                        team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>

      {/* MOBILE FLOATING CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 p-4 bg-[rgb(var(--surface))]/95 backdrop-blur-xl border-t-2 border-[rgb(var(--border))] z-50 shadow-lg">
        <div className="max-w-screen-sm mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0 bg-[rgb(var(--bg))] rounded-lg p-3 border border-[rgb(var(--border))]">
              <p className="text-xs text-[rgb(var(--muted))] font-semibold uppercase tracking-wide mb-0.5">
                Budget
              </p>
              <p className="text-xl sm:text-2xl font-bold text-[rgb(var(--text))] truncate">
                {profile.budget}
              </p>
            </div>
            <Animatedbutton
              onClick={() => setOpen(true)}
              variant="primary"
              className="px-6 sm:px-8 py-3 text-base font-semibold whitespace-nowrap"
            >
              Contact Now
            </Animatedbutton>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
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
