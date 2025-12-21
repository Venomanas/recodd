"use client";

import { motion } from "framer-motion";
import { Briefcase, Clock, MapPin, User } from "lucide-react";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Profile } from "@/lib/recodd/types";
import { ui } from "@/lib/recodd/ui";
import Link from "next/link";

type Props = {
  profile: Profile;
  mode: "freelancers" | "business";
  onContact: () => void;
};

export const ProfileCard = ({ profile, mode, onContact }: Props) => {
  const isFreelancer = mode === "freelancers";
  const badgeStyles: Record<string, string> = {
    "full-time":
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    "part-time": "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    contract: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    project: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      className={` rounded-2xl
         dark:bg-[rgb(var(--surface))] 
         dark:border dark:border-[rgb(var(--border))]
         p-5
         transition-all
        hover:border-zinc-700/80
        hover:shadow-lg ${ui.radius.lg} p-4 py-1.5 ${ui.shadow.soft}  transition-shadow font-normal`}
    >
      {/* Avatar */}
      <div className="shrink-0">
        <div className="w-14 h-14 rounded-2xl bg-[#E53935] flex items-center justify-center text-white shadow-md">
          <User className="w-6 h-6 opacity-90" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm dark:text-[rgb(var(--text))] md:text-base font-semibold text-black truncate tracking-tight">
              {profile.name}
            </h3>
            <p className="text-sm md:text-sm text-slate-400 flex items-center gap-1 mt-0.5">
              <Briefcase size={14} />
              <span className="truncate">{profile.role}</span>
            </p>
          </div>

          <span className="hidden md:inline-flex text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-600 border border-emerald-100 dark:border-emerald-800">
            {profile.availability ?? "Flexible"}
          </span>

          <span
            className={`px-2 py-1 text-xs rounded-full ${
              badgeStyles[profile.availability ?? "project"]
            }`}
          >
            {profile.availability}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] md:text-xs mt-1">
          <span className="inline-flex items-center gap-1 text-slate-900 dark:text-slate-500">
            <Clock size={13} />
            {profile.experience}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold  text-white dark:text-[rgb(var(--text))] ">
            {profile.budget}
          </span>
          {profile.location && (
            <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MapPin size={13} />
              {profile.location}
            </span>
          )}
        </div>

        {profile.tags && profile.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {profile.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-[10px] text-gray-700 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2 flex flex-wrap gap-2">
          {isFreelancer ? (
            <>
              <Link href={`/freelancer/${profile.id}`}>
                <Animatedbutton
                  variant="secondary"
                >
                  View profile
                </Animatedbutton>
              </Link>
              <Animatedbutton
                onClick={onContact}
                variant="primary"
              >
                Invite to project
              </Animatedbutton>
            </>
          ) : (
            <>
              <Link href={`/business/${profile.id}`}>
                <Animatedbutton 
                variant="secondary"
                >
                  View brief
                </Animatedbutton>
              </Link>
              <Animatedbutton
                onClick={onContact}
                variant="primary"
              >
                Send proposal
              </Animatedbutton>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
};
