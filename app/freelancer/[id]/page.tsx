"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFreelancerById } from "@/lib/recodd/services/market.service";
import { Profile } from "@/lib/recodd/types";
import { ContactModal } from "@/app/components/ContactModal";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import {
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Star,
  Award,
  DollarSign,
  ArrowRight,
  Zap,
} from "lucide-react";
import { LayoutContainer } from "@/app/components/LayoutContainer";
import Image from "next/image";

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
          <Star size={64} className="mx-auto mb-4 text-[rgb(var(--muted))]" />
          <p className="text-xl text-[rgb(var(--text-secondary))]">
            Profile not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Professional Header with Accent */}
      <div className="relative h-32 sm:h-40 md:h-56 lg:h-64 w-full overflow-hidden bg-[rgb(var(--primary))] border-b border-[rgb(var(--border))]">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 30px,
              rgba(255,255,255,0.03) 30px,
              rgba(255,255,255,0.03) 60px
            )`,
            }}
          />
        </div>
        {/* Accent strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[rgb(var(--accent))]" />

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 border-l-2 border-b-2 border-[rgb(var(--accent))]/20 opacity-30" />
      </div>

      <LayoutContainer>
        {/* Breadcrumbs */}
        <div className="pt-4 pb-2 -mt-2 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Freelancers", href: "/?type=freelancers" },
              {
                label: profile.role,
                href: `/?type=freelancers&q=${profile.role}`,
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
              <div className="bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))] p-6 sm:p-8 -mt-20 sm:-mt-24 md:-mt-32 relative z-10 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-lg overflow-hidden border-2 border-[rgb(var(--border))] bg-[rgb(var(--bg))] shadow-sm">
                        <Image
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                          width={144}
                          height={144}
                          unoptimized
                          loading="lazy"
                        />
                      </div>
                      {/* Verification Badge */}
                      <div className="absolute -bottom-2 -right-2 bg-[rgb(var(--success))] rounded-lg p-1.5 shadow-md border-2 border-[rgb(var(--surface))]">
                        <CheckCircle2 size={18} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
                            {profile.name}
                          </h1>
                          <div className="w-2 h-2 rounded-full bg-[rgb(var(--accent))] animate-pulse" />
                        </div>
                        <p className="text-base sm:text-lg text-[rgb(var(--text-secondary))] font-semibold flex items-center gap-2 mb-3">
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
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-sm font-semibold text-[rgb(var(--text-secondary))]">
                        <MapPin size={14} className="shrink-0" />
                        <span className="truncate">
                          {profile.location || "Remote"}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-sm font-semibold text-[rgb(var(--text-secondary))]">
                        <Clock size={14} className="shrink-0" />
                        <span className="truncate">
                          {profile.experience || "Available now"}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[rgb(var(--success))]/10 border border-[rgb(var(--success))]/20 text-sm font-semibold text-[rgb(var(--success))]">
                        <CheckCircle2 size={14} className="shrink-0" />
                        <span>Verified</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[rgb(var(--primary))] flex items-center justify-center">
                    <Star
                      size={20}
                      className="text-[rgb(var(--primary-foreground))]"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[rgb(var(--text))]">
                    About Me
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-[rgb(var(--text-secondary))] leading-relaxed">
                  Experienced {profile.role} with a proven track record of
                  delivering high-quality solutions. I&apos;m passionate about
                  creating exceptional work and building meaningful partnerships
                  with clients. My approach combines technical expertise with
                  creative problem-solving to bring your vision to life.
                </p>
              </div>

              {/* Skills Section */}
              <div className="bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[rgb(var(--accent))] flex items-center justify-center">
                    <Award
                      size={20}
                      className="text-[rgb(var(--accent-foreground))]"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[rgb(var(--text))]">
                    Skills & Expertise
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {profile.tags?.map((tag, index) => (
                    <span
                      key={tag}
                      className="px-4 py-2.5 rounded-lg bg-[rgb(var(--bg))] text-sm sm:text-base font-semibold text-[rgb(var(--text))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))]/5 transition-all duration-200"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats & Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))] p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[rgb(var(--accent))]/10 flex items-center justify-center">
                      <DollarSign
                        size={20}
                        className="text-[rgb(var(--accent))]"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-[rgb(var(--muted))] font-semibold uppercase tracking-wide">
                        Rate
                      </p>
                      <p className="text-2xl font-bold text-[rgb(var(--text))]">
                        {profile.budget}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Competitive project-based pricing
                  </p>
                </div>

                <div className="bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))] p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[rgb(var(--success))]/10 flex items-center justify-center">
                      <Zap size={20} className="text-[rgb(var(--success))]" />
                    </div>
                    <div>
                      <p className="text-xs text-[rgb(var(--muted))] font-semibold uppercase tracking-wide">
                        Availability
                      </p>
                      <p className="text-lg font-bold text-[rgb(var(--text))]">
                        {profile.availability || "Available"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Ready to start your project
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Sticky Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-6 space-y-6">
                {/* Hire Card */}
                <div className="bg-[rgb(var(--surface))] rounded-lg border-2 border-[rgb(var(--border))] p-6 shadow-sm">
                  {/* Rate */}
                  <div className="mb-6 pb-6 border-b border-[rgb(var(--border))]">
                    <p className="text-xs font-bold text-[rgb(var(--muted))] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <DollarSign size={14} />
                      Freelance Rate
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[rgb(var(--text))]">
                        {profile.budget}
                      </span>
                      <span className="text-[rgb(var(--muted))] text-sm font-medium">
                        /project
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-7">
                    <div className="flex items-center gap-3 text-sm font-medium text-[rgb(var(--text))]">
                      <div className="w-5 h-5 rounded-full bg-[rgb(var(--success))]/10 flex items-center justify-center shrink-0">
                        <CheckCircle2
                          size={14}
                          className="text-[rgb(var(--success))]"
                        />
                      </div>
                      <span>Verified Freelancer</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-[rgb(var(--text))]">
                      <div className="w-5 h-5 rounded-full bg-[rgb(var(--success))]/10 flex items-center justify-center shrink-0">
                        <CheckCircle2
                          size={14}
                          className="text-[rgb(var(--success))]"
                        />
                      </div>
                      <span>
                        {profile.availability || "Flexible Availability"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-[rgb(var(--text))]">
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
                    className="w-full justify-center h-12 text-base font-bold"
                  >
                    Hire {profile.name.split(" ")[0]}
                    <ArrowRight size={18} className="ml-2" />
                  </Animatedbutton>

                  <p className="text-xs text-center text-[rgb(var(--muted))] mt-4 font-medium">
                    Direct hire • Pay freelancer directly
                  </p>
                </div>

                {/* Trust Badge */}
                <div className="bg-[rgb(var(--accent))]/5 border border-[rgb(var(--accent))]/20 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[rgb(var(--accent))] flex items-center justify-center shrink-0">
                      <Award
                        size={20}
                        className="text-[rgb(var(--accent-foreground))]"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[rgb(var(--text))] mb-1">
                        Verified Freelancer
                      </h4>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        This freelancer has been verified and approved by our
                        team.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Why Hire */}
                <div className="bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))] p-5 shadow-sm">
                  <h4 className="font-semibold text-[rgb(var(--text))] mb-3 flex items-center gap-2">
                    <Zap size={16} className="text-[rgb(var(--accent))]" />
                    Why Hire Direct
                  </h4>
                  <ul className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
                    <li className="flex items-start gap-2">
                      <span className="text-[rgb(var(--accent))] mt-0.5">
                        •
                      </span>
                      <span>No platform fees or commissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[rgb(var(--accent))] mt-0.5">
                        •
                      </span>
                      <span>Direct communication with freelancer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[rgb(var(--accent))] mt-0.5">
                        •
                      </span>
                      <span>Flexible payment terms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>

      {/* MOBILE FLOATING CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 p-4 bg-[rgb(var(--surface))]/95 backdrop-blur-xl border-t-2 border-[rgb(var(--border))] z-50 shadow-lg">
        <div className="max-w-screen-sm mx-auto">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-1 min-w-0 bg-[rgb(var(--bg))] rounded-lg p-3 border border-[rgb(var(--border))]">
              <p className="text-xs text-[rgb(var(--muted))] font-bold uppercase tracking-wide mb-0.5">
                Rate
              </p>
              <p className="text-xl sm:text-2xl font-bold text-[rgb(var(--text))] truncate">
                {profile.budget}
              </p>
            </div>
            <Animatedbutton
              onClick={() => setOpen(true)}
              variant="primary"
              className="px-6 sm:px-8 py-3.5 text-base font-bold whitespace-nowrap"
            >
              Hire Now
            </Animatedbutton>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
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
