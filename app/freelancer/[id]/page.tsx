"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFreelancerById } from "@/lib/recodd/services/market.service";
import { Profile } from "@/lib/recodd/types";
import { ContactModal } from "@/app/components/ContactModal";
import Animatedbutton from "@/app/components/Animatedbutton";

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
    return <div className="py-20 text-center">Loading profile…</div>;
  }

  if (!profile) {
    return <div className="py-20 text-center">Profile not found</div>;
  }

  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-semibold">{profile.name}</h1>
        <p className="text-gray-500">{profile.role}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-400 items-center">
          <span>{profile.experience}</span>
          <span>{profile.budget}</span>
          <span>{profile.location}</span>

          <Animatedbutton
            onClick={() => setOpen(true)}
            className="bg-[#E53935] text-white"
          >
            Contact freelancer
          </Animatedbutton>
        </div>

        <div className="flex gap-2 flex-wrap">
          {profile.tags?.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-gray-100  text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {open && (
        <ContactModal
          profileId={profile.id}
          profileType="freelancer"
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}
