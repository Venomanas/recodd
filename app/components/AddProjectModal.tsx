"use client";

import { useState } from "react";
import { X, Upload, Plus, Loader2 } from "lucide-react";
import Image from "next/image";
import Animatedbutton from "@/app/components/Animatedbutton";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Omit<Project, "id">) => void;
}

// Sample project images for demo (since we can't upload)
const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
];

const SUGGESTED_TAGS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "UI/UX",
  "Mobile",
  "Web App",
  "API",
  "Database",
  "Figma",
  "Tailwind",
];

export default function AddProjectModal({
  isOpen,
  onClose,
  onAdd,
}: AddProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag) && tags.length < 6) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleAddCustomTag = () => {
    if (
      customTag.trim() &&
      !tags.includes(customTag.trim()) &&
      tags.length < 6
    ) {
      setTags([...tags, customTag.trim()]);
      setCustomTag("");
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    onAdd({
      title: title.trim(),
      description: description.trim(),
      image: selectedImage,
      tags,
      link: link.trim() || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setLink("");
    setSelectedImage(SAMPLE_IMAGES[0]);
    setTags([]);
    setStep(1);
    setLoading(false);
    onClose();
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-2xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-3xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[rgb(var(--border))]">
            <div>
              <h2 className="text-2xl font-bold text-[rgb(var(--text))]">
                Add New Project
              </h2>
              <p className="text-sm text-[rgb(var(--muted))] mt-1">
                Step {step} of 2 -{" "}
                {step === 1 ? "Project Details" : "Choose Cover Image"}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-[rgb(var(--bg))] rounded-xl transition-colors"
            >
              <X size={24} className="text-[rgb(var(--muted))]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {step === 1 ? (
              <div className="space-y-6">
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="E.g., E-Commerce Dashboard"
                    className="w-full px-4 py-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))] transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Briefly describe your project..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))] transition-all resize-none"
                  />
                </div>

                {/* Project Link */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-2">
                    Project Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))] transition-all"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-2">
                    Technologies / Tags
                  </label>

                  {/* Selected Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] rounded-full text-sm font-medium"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:bg-[rgb(var(--accent))]/20 rounded-full p-0.5"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Suggested Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {SUGGESTED_TAGS.filter(t => !tags.includes(t)).map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleAddTag(tag)}
                        className="px-3 py-1.5 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-full text-sm text-[rgb(var(--muted))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>

                  {/* Custom Tag Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customTag}
                      onChange={e => setCustomTag(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleAddCustomTag()}
                      placeholder="Add custom tag..."
                      className="flex-1 px-4 py-2 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-sm text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                    <button
                      onClick={handleAddCustomTag}
                      className="px-4 py-2 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-sm font-medium hover:bg-[rgb(var(--accent))] hover:text-white hover:border-[rgb(var(--accent))] transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Image Selection */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-4">
                    Choose Cover Image
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {SAMPLE_IMAGES.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === img
                            ? "border-[rgb(var(--accent))] ring-2 ring-[rgb(var(--accent))]/30"
                            : "border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]/50"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Sample ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        {selectedImage === img && (
                          <div className="absolute inset-0 bg-[rgb(var(--accent))]/20 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-[rgb(var(--accent))] flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--text))] mb-3">
                    Preview
                  </label>
                  <div className="p-4 bg-[rgb(var(--bg))] rounded-2xl border border-[rgb(var(--border))]">
                    <div className="aspect-video w-full max-w-sm rounded-xl overflow-hidden bg-zinc-800 relative mx-auto">
                      <Image
                        src={selectedImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="400px"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h4 className="font-bold text-[rgb(var(--text))]">
                        {title || "Project Title"}
                      </h4>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1 mt-2">
                          {tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded text-[rgb(var(--muted))]"
                            >
                              {tag}
                            </span>
                          ))}
                          {tags.length > 3 && (
                            <span className="text-xs text-[rgb(var(--muted))]">
                              +{tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))]/50">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 rounded-xl font-medium text-[rgb(var(--muted))] hover:bg-[rgb(var(--surface))] transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step === 1 ? (
              <Animatedbutton
                onClick={() => setStep(2)}
                variant="primary"
                disabled={!title.trim()}
                className="px-8"
              >
                Next: Choose Image
              </Animatedbutton>
            ) : (
              <Animatedbutton
                onClick={handleSubmit}
                variant="primary"
                disabled={loading}
                className="px-8"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  "Add Project"
                )}
              </Animatedbutton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
