/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, X, Briefcase } from "lucide-react";
import DashboardLayout from "@/app/components/DashboardLayout";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";

const SKILL_SUGGESTIONS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "UI/UX Design",
  "Figma",
  "Mobile Development",
  "WordPress",
  "SEO",
  "Content Writing",
  "Video Editing",
  "Graphic Design",
  "Data Analysis",
  "Machine Learning",
];

export default function AddProjectPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string | null;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "",
    skills: [] as string[],
    experience: "any",
    type: "fixed",
  });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "business") {
      router.push("/");
      return;
    }
    setUser({ ...currentUser });
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !form.skills.includes(skill.trim())) {
      setForm(prev => ({ ...prev, skills: [...prev.skills, skill.trim()] }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API save — replace with Supabase insert
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => router.push("/dashboard/business/projects"), 1500);
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-[rgb(var(--muted))]">
        Loading...
      </div>
    );

  return (
    <DashboardLayout role="business" userName={user.name}>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
            Post a New Project
          </h1>
          <p className="text-[rgb(var(--muted))] mt-2 text-lg">
            Describe your project clearly to attract the best freelancers.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-3xl p-8 shadow-sm"
        >
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Build a Full-Stack E-Commerce App"
              className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 outline-none text-[rgb(var(--text))] text-lg font-medium placeholder:text-[rgb(var(--muted))] transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Describe your project goals, requirements, and deliverables in detail..."
              className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 outline-none text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] transition-all resize-none"
            />
          </div>

          {/* Budget + Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
                Budget (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                required
                placeholder="e.g. 50000"
                className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 outline-none text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 outline-none text-[rgb(var(--text))] transition-all"
              />
            </div>
          </div>

          {/* Category + Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] outline-none text-[rgb(var(--text))] transition-all"
              >
                <option value="">Select category...</option>
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>UI/UX Design</option>
                <option>Graphic Design</option>
                <option>Digital Marketing</option>
                <option>Video Production</option>
                <option>Writing & Content</option>
                <option>Data & Analytics</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
                Project Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] outline-none text-[rgb(var(--text))] transition-all"
              >
                <option value="fixed">Fixed Price</option>
                <option value="hourly">Hourly Rate</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
              Required Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.skills.map(skill => (
                <span
                  key={skill}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] border border-[rgb(var(--accent))]/30 rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-500 transition-colors ml-1"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(newSkill);
                  }
                }}
                placeholder="Type a skill and press Enter..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] outline-none text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] text-sm transition-all"
              />
              <button
                type="button"
                onClick={() => addSkill(newSkill)}
                className="px-4 py-2.5 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] text-sm font-medium text-[rgb(var(--text))] transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            {/* Quick Add Suggestions */}
            <div className="flex flex-wrap gap-2 mt-2">
              {SKILL_SUGGESTIONS.filter(s => !form.skills.includes(s))
                .slice(0, 8)
                .map(s => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => addSkill(s)}
                    className="px-3 py-1 text-xs rounded-full border border-dashed border-[rgb(var(--border))] text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:border-[rgb(var(--accent))] transition-colors"
                  >
                    + {s}
                  </button>
                ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
              Experience Level
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: "entry", label: "Entry Level" },
                { value: "mid", label: "Mid Level" },
                { value: "senior", label: "Senior Level" },
                { value: "any", label: "Any Level" },
              ].map(opt => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="experience"
                    value={opt.value}
                    checked={form.experience === opt.value}
                    onChange={handleChange}
                    className="accent-[rgb(var(--accent))]"
                  />
                  <span
                    className={`text-sm font-medium ${form.experience === opt.value ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text))]"}`}
                  >
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-[rgb(var(--border))]">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl font-medium text-[rgb(var(--muted))] hover:bg-[rgb(var(--bg))] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || saved}
              className="flex items-center gap-2 px-8 py-3 bg-[rgb(var(--text))] text-[rgb(var(--bg))] rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <span className="w-5 h-5 rounded-full border-2 border-[rgb(var(--bg))] border-t-transparent animate-spin" />
              ) : saved ? (
                "✓ Posted!"
              ) : (
                <>
                  <Briefcase size={18} />
                  Post Project
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </DashboardLayout>
  );
}
