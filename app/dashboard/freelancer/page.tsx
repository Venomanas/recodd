"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Briefcase,
  Clock,
  AlertCircle,
  MoreHorizontal,
  ExternalLink,
  ArrowLeft,
  Trash2,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import Animatedbutton from "@/app/components/Animatedbutton";
import AddProjectModal, {
  type Project,
} from "@/app/components/AddProjectModal";

// --- MOCK DATA (Replace with Supabase later) ---
const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    client: "TechFlow Inc.",
    task: "Redesign Landing Page Hero Section",
    dueDate: "2 days left",
    status: "urgent", // Crimson
    budget: "$800",
  },
  {
    id: 2,
    client: "Sarah J. Bakery",
    task: "Implement Cart Functionality",
    dueDate: "1 week left",
    status: "in-progress", // Yellow
    budget: "$1,200",
  },
  {
    id: 3,
    client: "Recodd Internal",
    task: "Update User Profile Component",
    dueDate: "Completed",
    status: "completed", // Green
    budget: "$500",
  },
];

const INITIAL_PORTFOLIO: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description:
      "A complete admin dashboard for managing online store operations",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2670",
    tags: ["React", "Tailwind"],
  },
  {
    id: 2,
    title: "Finance App UI",
    description: "Modern fintech application interface design",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1470",
    tags: ["Figma", "Next.js"],
  },
];

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio">(
    "overview",
  );

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] pt-32 pb-20 px-6 sm:px-12 lg:px-24">
      {/* Back to Home Button */}
      <div className="fixed top-24 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] hover:bg-[rgb(var(--accent))] hover:text-white hover:border-[rgb(var(--accent))] transition-all shadow-md"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
              Freelancer Dashboard
            </h1>
            <p className="text-[rgb(var(--muted))] mt-2 text-lg">
              Welcome back, Anas. You have{" "}
              <span className="text-[rgb(var(--accent))] font-semibold">
                2 active tasks
              </span>
              .
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "overview"
                  ? "bg-[rgb(var(--text))] text-[rgb(var(--bg))]"
                  : "bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--muted))]"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "portfolio"
                  ? "bg-[rgb(var(--text))] text-[rgb(var(--bg))]"
                  : "bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--muted))]"
              }`}
            >
              My Portfolio
            </button>
          </div>
        </div>

        {activeTab === "overview" ? <OverviewSection /> : <PortfolioSection />}
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: OVERVIEW (The Indicators) ---
function OverviewSection() {
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-12">
      {/* LEFT: Assigned Work */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-[rgb(var(--text))] flex items-center gap-2">
          <Briefcase size={20} className="text-[rgb(var(--accent))]" />
          Assigned Work
        </h2>

        <div className="grid gap-4">
          {MOCK_ASSIGNMENTS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="
                group relative p-6 rounded-2xl
                bg-[rgb(var(--surface))]
                border border-[rgb(var(--border))]
                hover:border-[rgb(var(--accent))]/30
                shadow-sm hover:shadow-lg hover:shadow-[rgb(var(--accent))]/5
                transition-all duration-300
              "
            >
              {/* THE INDICATOR BAR (Left Side) */}
              <div
                className={`
                  absolute left-0 top-6 bottom-6 w-1 rounded-r-full
                  ${
                    item.status === "urgent"
                      ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                      : ""
                  }
                  ${
                    item.status === "in-progress"
                      ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                      : ""
                  }
                  ${item.status === "completed" ? "bg-emerald-500" : ""}
                `}
              />

              <div className="pl-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--muted))]">
                      {item.client}
                    </span>
                    {item.status === "urgent" && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center gap-1">
                        <AlertCircle size={10} /> Action Required
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[rgb(var(--text))] group-hover:text-[rgb(var(--accent))] transition-colors">
                    {item.task}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[rgb(var(--muted))]">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {item.dueDate}
                    </span>
                    <span>•</span>
                    <span>{item.budget}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 text-sm font-medium bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl hover:bg-[rgb(var(--accent))] hover:text-white hover:border-[rgb(var(--accent))] transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: Quick Stats */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-[rgb(var(--text))]">
          Your Stats
        </h2>
        <div className="p-8 rounded-3xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-[rgb(var(--muted))]">Total Earnings</p>
              <p className="text-3xl font-bold text-[rgb(var(--text))]">
                $4,250
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600">
              <span className="text-lg font-bold">↑</span>
            </div>
          </div>
          <div className="w-full h-px bg-[rgb(var(--border))]" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[rgb(var(--muted))]">Completed</p>
              <p className="text-xl font-bold text-[rgb(var(--text))]">12</p>
            </div>
            <div>
              <p className="text-xs text-[rgb(var(--muted))]">Pending</p>
              <p className="text-xl font-bold text-[rgb(var(--text))]">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ProfileCard() {
  return (
    <div className="w-full bg-[rgb(var(--surface))] rounded-[2.5rem] border border-[rgb(var(--border))] shadow-sm overflow-hidden flex flex-col md:flex-row relative min-h-[500px]">
      {/* LEFT SIDE: Inputs & Info */}
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center space-y-8 z-10">
        {/* Header Inputs */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
              Job Role
            </label>
            <input
              type="text"
              defaultValue="Senior Full Stack Developer"
              className="w-full text-2xl md:text-4xl font-bold bg-transparent border-b border-transparent hover:border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] outline-none text-[rgb(var(--text))] placeholder-[rgb(var(--muted))] transition-all pb-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
              Bio / Description
            </label>
            <textarea
              defaultValue="Passionate about building scalable web applications with Next.js and Supabase. I turn complex problems into clean, efficient code."
              className="w-full text-lg text-[rgb(var(--muted))] bg-transparent border-l-2 border-transparent hover:border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] outline-none resize-none h-32 pl-4 transition-all"
            />
          </div>
        </div>

        {/* Experience Tag Input */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))]">
            Experience & Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "UI/UX", "3+ Years"].map(
              tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-sm font-medium text-[rgb(var(--text))]"
                >
                  {tag}
                </span>
              ),
            )}
            <button className="px-3 py-1.5 rounded-lg border border-dashed border-[rgb(var(--muted))] text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:border-[rgb(var(--accent))] transition-colors">
              + Add Skill
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center gap-4">
          <Animatedbutton variant="primary" className="px-8">
            Save Changes
          </Animatedbutton>
          <button className="px-6 py-2.5 rounded-xl font-medium text-[rgb(var(--muted))] hover:bg-[rgb(var(--bg))] transition-colors">
            Cancel
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: The Curved Avatar Section */}
      <div className="md:w-[40%] relative bg-zinc-100 dark:bg-zinc-800/50 flex flex-col items-center justify-center p-8">
        {/* The Curve Effect using CSS Clip-path or a simple SVG Overlay */}
        <div className="absolute top-0 bottom-0 -left-16 w-24 hidden md:block">
          {/* This SVG creates the inward curve matching your wireframe */}
          <svg
            height="100%"
            width="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M100 0 H0 V100 H100 V0 Z"
              fill="currentColor"
              className="text-zinc-100 dark:text-zinc-800/50 hidden"
            />
            {/* Simple curve implementation */}
            <path
              d="M100,0 C20,25 20,75 100,100 Z"
              fill="currentColor"
              className="text-zinc-100 dark:text-zinc-900"
              style={{ transform: "scaleX(-1)" }}
            />
          </svg>
        </div>

        {/* The visual separator curve logic - simpler CSS approach */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-[rgb(var(--surface))] rounded-r-[50%] scale-x-150 -translate-x-1/2 z-0 hidden md:block"></div>

        {/* Avatar & Edit */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full border-4 border-[rgb(var(--surface))] shadow-xl overflow-hidden bg-white">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1000"
                alt="Profile"
                height={100}
                width={100}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-[rgb(var(--text))] text-[rgb(var(--bg))] rounded-full shadow-lg hover:scale-110 transition-transform">
              <span className="sr-only">Edit</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-[rgb(var(--muted))] mb-2">
              Profile Status
            </p>
            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
              Public & Visible
            </span>
          </div>
        </div>

        {/* Recodd Logo Watermark (as requested in diagram) */}
        <div className="absolute bottom-6 right-6 opacity-20 grayscale">
          {/* Assuming you have a small logo component or SVG */}
          <div className="font-bold text-2xl tracking-tighter">Recodd</div>
        </div>
      </div>
    </div>
  );
}

// --- UPDATED PORTFOLIO SECTION ---
function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PORTFOLIO);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProject = (newProject: Omit<Project, "id">) => {
    const project: Project = {
      ...newProject,
      id: Date.now(),
    };
    setProjects(prev => [project, ...prev]);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <>
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProject}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-12"
      >
        {/* 1. The Profile Card (Matches Wireframe) */}
        <ProfileCard />

        {/* 2. The Projects Grid (The "Work" below the profile) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[rgb(var(--text))] flex items-center gap-2">
              <Briefcase size={20} className="text-[rgb(var(--accent))]" />
              My Projects
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] rounded-full">
                {projects.length}
              </span>
            </h3>
            <Animatedbutton
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              className="px-4 py-2"
            >
              <Plus size={18} className="mr-2" />
              Add Project
            </Animatedbutton>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="group rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
              >
                <div className="aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform">
                      <MoreHorizontal size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 bg-red-500 rounded-full text-white hover:scale-110 hover:bg-red-600 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[rgb(var(--text))] mb-1">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-[rgb(var(--muted))] mb-3 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-md text-[rgb(var(--muted))]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* "Add New" Button Card */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-2xl border-2 border-dashed border-[rgb(var(--border))] bg-transparent flex flex-col items-center justify-center min-h-[300px] text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))]/5 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[rgb(var(--surface))] group-hover:bg-white flex items-center justify-center mb-4 shadow-sm transition-colors">
                <Plus size={32} />
              </div>
              <span className="font-medium">Add New Project</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
