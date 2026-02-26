"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Tag, Loader2 } from "lucide-react";
import { createPost } from "@/lib/recodd/galleryStore";
import { Post, PostType } from "@/lib/recodd/types";

const CATEGORIES = [
  "Development",
  "Design",
  "UI/UX",
  "Marketing",
  "Data Science",
  "Mobile Apps",
  "Webflow",
  "Consulting",
];

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (post: Post) => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function CreatePostModal({
  isOpen,
  onClose,
  onCreated,
  user,
}: CreatePostModalProps) {
  const isHiring = user.role === "business";
  const postType: PostType = isHiring ? "hiring_alert" : "work_showcase";

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Development",
    imageUrl: "",
    budget: "",
    tagInput: "",
    tags: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const addTag = () => {
    const tag = form.tagInput.trim();
    if (tag && !form.tags.includes(tag) && form.tags.length < 5) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag], tagInput: "" }));
    }
  };

  const removeTag = (tag: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.description.trim().length < 30)
      e.description = "At least 30 characters";
    if (isHiring && form.budget && isNaN(Number(form.budget)))
      e.budget = "Must be a number";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Small delay for UX feel
    await new Promise(r => setTimeout(r, 600));

    const images = form.imageUrl.trim() ? [form.imageUrl.trim()] : [];

    const newPost = createPost({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      tags: form.tags,
      images,
      type: postType,
      budget: isHiring && form.budget ? Number(form.budget) : undefined,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.role,
      authorEmail: user.email,
    });

    setLoading(false);
    onCreated(newPost);
    onClose();
    // Reset form
    setForm({
      title: "",
      description: "",
      category: "Development",
      imageUrl: "",
      budget: "",
      tagInput: "",
      tags: [],
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-lg bg-[rgb(var(--surface))] rounded-2xl border border-[rgb(var(--border))] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[rgb(var(--border))] shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-[rgb(var(--text))]">
                    {isHiring ? "Post a Job" : "Share Your Work"}
                  </h2>
                  <p className="text-xs text-[rgb(var(--muted))] mt-0.5">
                    {isHiring
                      ? "Let the community know you're hiring"
                      : "Showcase your latest portfolio piece"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-[rgb(var(--muted))] hover:bg-[rgb(var(--bg))] hover:text-[rgb(var(--text))] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-6 overflow-y-auto flex-1"
              >
                {/* Post Type Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium w-fit ${
                    isHiring
                      ? "bg-amber-500/15 text-amber-500 border border-amber-500/25"
                      : "bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] border border-[rgb(var(--accent))]/20"
                  }`}
                >
                  <span>
                    {isHiring ? "📢 Hiring Alert" : "✨ Work Showcase"}
                  </span>
                  <span className="text-xs opacity-70">as {user.name}</span>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-1.5">
                    Title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder={
                      isHiring
                        ? "e.g. Hiring: Senior React Developer"
                        : "e.g. E-Commerce Dashboard Redesign"
                    }
                    className={`w-full px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 transition ${
                      errors.title
                        ? "border-[rgb(var(--error))]"
                        : "border-[rgb(var(--border))] focus:border-[rgb(var(--accent))]"
                    }`}
                  />
                  {errors.title && (
                    <p className="text-xs text-[rgb(var(--error))] mt-1">
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-1.5">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder={
                      isHiring
                        ? "Describe the role, required skills, and what makes this opportunity exciting..."
                        : "Describe what you built, the challenge, and the results achieved..."
                    }
                    className={`w-full px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 resize-none transition ${
                      errors.description
                        ? "border-[rgb(var(--error))]"
                        : "border-[rgb(var(--border))] focus:border-[rgb(var(--accent))]"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-[rgb(var(--error))] mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-1.5">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] text-sm text-[rgb(var(--text))] outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 transition cursor-pointer"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget (hiring only) */}
                {isHiring && (
                  <div>
                    <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-1.5">
                      Rate (₹/hr) — Optional
                    </label>
                    <input
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      placeholder="e.g. 250"
                      type="number"
                      min="0"
                      className={`w-full px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 transition ${
                        errors.budget
                          ? "border-[rgb(var(--error))]"
                          : "border-[rgb(var(--border))] focus:border-[rgb(var(--accent))]"
                      }`}
                    />
                    {errors.budget && (
                      <p className="text-xs text-[rgb(var(--error))] mt-1">
                        {errors.budget}
                      </p>
                    )}
                  </div>
                )}

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-1.5">
                    <Upload size={14} className="inline mr-1" />
                    Image URL — Optional
                  </label>
                  <input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 transition"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-1.5">
                    <Tag size={14} className="inline mr-1" />
                    Tags (up to 5)
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={form.tagInput}
                      onChange={e =>
                        setForm(prev => ({
                          ...prev,
                          tagInput: e.target.value,
                        }))
                      }
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="Type a tag and press Enter"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 transition"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-3 py-2 rounded-xl bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))]/20 transition border border-[rgb(var(--accent))]/20"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  {form.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {form.tags.map(tag => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-xs text-[rgb(var(--text))]"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-[rgb(var(--muted))] hover:text-[rgb(var(--error))] transition-colors"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>{isHiring ? "Post Job" : "Publish Showcase"}</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
