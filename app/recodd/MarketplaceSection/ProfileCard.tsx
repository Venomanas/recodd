"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Clock, MapPin } from "lucide-react";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Profile } from "@/lib/recodd/types";

type Props = {
  profile: Profile;
  mode: "freelancers" | "business";
  onContact: () => void;
};

export const ProfileCard = ({ profile, mode, onContact }: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="
        group relative 
        flex flex-col
        rounded-xl
        bg-[rgb(var(--surface))]
        border border-[rgb(var(--border))]
        p-6
        transition-all duration-300
        hover:border-[rgb(var(--text-secondary)/0.3)]
        hover:-translate-y-0.5
        hover:shadow-lg hover:shadow-black/5
      "
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar - 64x64px */}
        <div className="shrink-0 relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-[rgb(var(--border))] bg-zinc-50 dark:bg-zinc-800">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`}
              alt={profile.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <h3 className="font-semibold text-lg text-[rgb(var(--text))] truncate leading-tight mb-1">
            {profile.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm font-normal text-[rgb(var(--muted))]">
            <Briefcase size={14} className="shrink-0" />
            <span className="truncate">{profile.role}</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-5">
        <div className="flex items-center gap-2 text-xs text-[rgb(var(--muted))]">
          <Clock size={14} className="shrink-0" />
          <span className="truncate">{profile.experience}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[rgb(var(--muted))]">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{profile.location}</span>
        </div>
      </div>

      <div className="mt-auto mb-5">
        <span className="font-bold text-sm text-[rgb(var(--text))]">
          {profile.budget}
        </span>
      </div>

      {/* Tags (Max 4 pills) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {profile.tags?.slice(0, 4).map(tag => (
          <span
            key={tag}
            className="
              px-2.5 py-1 
              rounded-full 
              text-[11px] font-medium 
              bg-zinc-50 dark:bg-zinc-800
              text-white 
              border border-[rgb(var(--border))]
            "
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-3">
        <Animatedbutton
          variant="primary"
          className="w-full justify-center h-11 text-sm rounded-md"
          onClick={onContact}
        >
          {mode === "business" ? "Apply Now" : "Contact"}
        </Animatedbutton>
        <Link
          href={`/${mode === "business" ? "business" : "freelancer"}/${profile.id}`}
          className="w-full text-center text-sm font-medium text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] transition-colors py-2"
        >
          View Profile
        </Link>
      </div>
    </motion.article>
  );
};
