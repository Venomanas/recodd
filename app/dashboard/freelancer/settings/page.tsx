/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";

import Animatedbutton from "@/app/components/Animatedbutton";
import DashboardLayout from "@/app/components/DashboardLayout";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";

export default function FreelancerSettings() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string | null;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "John Doe",
    jobRole: "Senior Full Stack Developer",
    bio: "Passionate about building scalable web applications with Next.js and Supabase. I turn complex problems into clean, efficient code.",
    hourlyRate: "45",
    skills: ["React", "Next.js", "TypeScript", "Video Editing", "UI/UX"],
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1000",
  });

  const [newSkill, setNewSkill] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "freelancer") {
      router.push("/");
      return;
    }
    setUser({ ...currentUser });
    // In a real app, you would fetch actual profile data from Supabase here
    setFormData(prev => ({ ...prev, name: currentUser.name }));
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to Supabase Storage here
      const objectUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatarUrl: objectUrl }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Mock save delay
    await new Promise(resolve => setTimeout(resolve, 800));
    // Here you would typically commit formData to Supabase Profile table
    console.log("Saving user data:", formData);
    setIsSaving(false);
    alert("Profile saved successfully!");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout role="freelancer" userName={user.name}>
      <div className="max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
            Profile Settings
          </h1>
          <p className="text-[rgb(var(--muted))] mt-2 text-lg">
            Update your personal details, avatar, rate, and skills.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-[rgb(var(--surface))] rounded-[2.5rem] border border-[rgb(var(--border))] shadow-sm overflow-hidden flex flex-col md:flex-row relative min-h-[500px]"
        >
          {/* Avatar Upload Selection (Left Side on Desktop) */}
          <div className="md:w-[35%] relative bg-zinc-100 dark:bg-zinc-800/50 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-[rgb(var(--border))]">
            <div className="relative z-10 flex flex-col items-center gap-6 w-full">
              <div className="relative group mx-auto">
                <div className="w-40 h-40 rounded-full border-4 border-[rgb(var(--text))] shadow-xl overflow-hidden bg-[rgb(var(--surface))] relative">
                  <Image
                    src={formData.avatarUrl}
                    alt="Profile Avatar"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span
                      className="text-white text-sm font-medium flex flex-col items-center gap-1 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={20} />
                      Change
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>

              <div className="text-center w-full">
                <p className="text-sm font-medium text-[rgb(var(--muted))] my-2">
                  Allowed formats: JPG, PNG, GIF
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields (Right Side) */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center space-y-8 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-lg font-medium bg-transparent border-b border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] outline-none text-[rgb(var(--text))] placeholder-[rgb(var(--muted))] transition-all pb-2 px-1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
                  Hourly Rate ($/hr)
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  className="w-full text-lg font-medium bg-transparent border-b border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] outline-none text-[rgb(var(--text))] placeholder-[rgb(var(--muted))] transition-all pb-2 px-1"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
                  Job Role
                </label>
                <input
                  type="text"
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleInputChange}
                  className="w-full text-xl md:text-2xl font-bold bg-transparent border-b border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] outline-none text-[rgb(var(--text))] placeholder-[rgb(var(--muted))] transition-all pb-2 px-1"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
                  Bio / Description
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full text-base text-[rgb(var(--text))] bg-[rgb(var(--bg))] rounded-xl border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] outline-none resize-none h-32 p-4 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
                Experience & Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skills.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-sm font-medium text-[rgb(var(--text))] flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveSkill(tag)}
                      className="text-[rgb(var(--muted))] hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAddSkill()}
                  placeholder="e.g. Video Editing, UI/UX"
                  className="flex-1 text-sm bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] rounded-xl px-4 py-2 outline-none text-[rgb(var(--text))]"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] text-sm font-medium transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="pt-6 flex items-center gap-4 border-t border-[rgb(var(--border))] mt-auto">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-3 bg-[rgb(var(--text))] text-[rgb(var(--bg))] hover:opacity-90 rounded-xl font-bold flex items-center justify-center transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="w-5 h-5 rounded-full border-2 border-[rgb(var(--bg))] border-t-transparent animate-spin mr-2"></span>
                ) : null}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
