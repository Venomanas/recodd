"use client";

import { motion } from "framer-motion";
import { Briefcase, Clock, MapPin, User } from "lucide-react";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Profile } from "@/lib/recodd/types";
import Link from "next/link";

type Props = {
  profile: Profile;
  mode: "freelancers" | "business";
  onContact: () => void;
};

export const ProfileCard = ({ profile, mode, onContact }: Props) => {
  const isFreelancer = mode === "freelancers";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      className="
        group relative 
        rounded-3xl 
        bg-[rgb(var(--surface))] 
        p-1
        transition-all duration-300
        hover:shadow-xl hover:shadow-black/5
      "
    >
      <div className="h-full rounded-[20px] bg-[rgb(var(--bg))] p-5 border border-[rgb(var(--border))] group-hover:border-[rgb(var(--accent))/30] transition-colors duration-300">
        <div className="flex gap-4">
          {/* Avatar - Squircle Shape for Modern Tech feel */}
          <div className="shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center text-[rgb(var(--muted))] shadow-inner border border-[rgb(var(--border))]">
              <User className="w-6 h-6" />
            </div>
          </div>

          {/* Header Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-semibold text-[rgb(var(--text))] truncate tracking-tight">
                  {profile.name}
                </h3>
                <p className="text-sm text-[rgb(var(--muted))] flex items-center gap-1.5 mt-1">
                  <Briefcase size={14} />
                  <span className="truncate">{profile.role}</span>
                </p>
              </div>

              {/* Availability Badge - Now Clean & Monotone */}
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[rgb(var(--surface))] text-[10px] font-medium text-[rgb(var(--text))] border border-[rgb(var(--border))] uppercase tracking-wide">
                {profile.availability || "Flexible"}
              </span>
            </div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="mt-5 flex flex-wrap gap-y-2 gap-x-4 text-xs text-[rgb(var(--muted))] py-4 border-t border-b border-[rgb(var(--border))] border-dashed">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {profile.experience}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {profile.location || "Remote"}
          </span>
          <span className="font-semibold text-[rgb(var(--text))] ml-auto">
            {profile.budget}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {profile.tags?.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-[rgb(var(--surface))] text-[11px] font-medium text-[rgb(var(--muted))]"
            >
              {tag}
            </span>
          ))}
          {profile.tags && profile.tags.length > 3 && (
            <span className="px-2.5 py-1 text-[11px] text-[rgb(var(--muted))]">
              +{profile.tags.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          {isFreelancer ? (
            <>
              <Link href={`/freelancer/${profile.id}`} className="flex-1">
                <Animatedbutton
                  variant="secondary"
                  className="w-full justify-center"
                >
                  View
                </Animatedbutton>
              </Link>
              <div className="flex-1" onClick={onContact}>
                <Animatedbutton
                  variant="primary"
                  className="w-full justify-center"
                >
                  Invite
                </Animatedbutton>
              </div>
            </>
          ) : (
            <>
              <Link href={`/business/${profile.id}`} className="flex-1">
                <Animatedbutton
                  variant="secondary"
                  className="w-full justify-center"
                >
                  Brief
                </Animatedbutton>
              </Link>
              <div className="flex-1" onClick={onContact}>
                <Animatedbutton
                  variant="primary"
                  className="w-full justify-center"
                >
                  Apply
                </Animatedbutton>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
};
