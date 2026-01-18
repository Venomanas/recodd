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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="
        group relative 
        rounded-3xl 
        bg-[rgb(var(--surface))] 
        p-1
        transition-all duration-300
        hover:shadow-xl hover:shadow-black/5
        bg-opacity-50 backdrop-blur-sm
      "
    >
      <div className="h-full rounded-[20px] bg-[rgb(var(--bg))] p-5 sm:p-6 border border-[rgb(var(--border))] group-hover:border-[rgb(var(--accent))/30] transition-colors duration-300 flex flex-col">
        <div className="flex gap-4 items-start">
          {/* Avatar - Real Image */}
          <div className="shrink-0 relative">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-[rgb(var(--border))] group-hover:scale-105 transition-transform duration-300">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`}
                alt={profile.name}
                className="w-full h-full object-cover bg-zinc-100 dark:bg-zinc-800"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-bold text-lg text-[rgb(var(--text))] truncate leading-tight group-hover:text-[rgb(var(--accent))] transition-colors">
                {profile.name}
              </h3>
              <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[rgb(var(--surface))] text-[rgb(var(--muted))] border border-[rgb(var(--border))]">
                {mode === "business" ? "Project" : "Pro"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[rgb(var(--muted))] mb-3">
              <Briefcase size={12} className="shrink-0" />
              <span className="truncate">{profile.role}</span>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-[rgb(var(--border))] to-transparent my-4 opacity-50" />

        {/* Details Grid - More compact */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs mb-5">
          <div className="flex items-center gap-2 text-[rgb(var(--muted))]">
            <Clock size={13} className="shrink-0 opacity-70" />
            <span className="truncate">{profile.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-[rgb(var(--muted))]">
            <MapPin size={13} className="shrink-0 opacity-70" />
            <span className="truncate">{profile.location}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-sm text-[rgb(var(--text))]">
            {profile.budget}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-5 h-14 overflow-hidden content-start">
          {profile.tags?.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="
                px-2.5 py-1 
                rounded-md 
                text-[10px] font-medium 
                bg-[rgb(var(--surface))] 
                text-[rgb(var(--muted))] 
                border border-[rgb(var(--border))]
                group-hover:border-[rgb(var(--accent))/20]
                transition-colors
              "
            >
              {tag}
            </span>
          ))}
          {profile.tags && profile.tags.length > 3 && (
            <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-[rgb(var(--surface))] text-[rgb(var(--muted))] border border-[rgb(var(--border))]">
              +{profile.tags.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Animatedbutton
            variant="secondary"
            className="w-full justify-center py-2 text-xs h-9 rounded-xl border-[rgb(var(--border))]"
            onClick={() => {}}
          >
            {mode === "business" ? "View Brief" : "View Profile"}
          </Animatedbutton>

          <Animatedbutton
            variant="primary"
            className="w-full justify-center py-2 text-xs h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20 border-transparent"
            onClick={onContact}
          >
            {mode === "business" ? "Apply Now" : "Contact"}
          </Animatedbutton>
        </div>
      </div>
    </motion.article>
  );
};
