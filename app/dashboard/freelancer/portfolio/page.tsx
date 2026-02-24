/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, ExternalLink, Trash2, MoreHorizontal } from "lucide-react";
import Image from "next/image";

import Animatedbutton from "@/app/components/Animatedbutton";
import AddProjectModal, {
  type Project,
} from "@/app/components/AddProjectModal";
import DashboardLayout from "@/app/components/DashboardLayout";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";

const STORAGE_KEY = "recodd_portfolio_projects";

const DEFAULT_PORTFOLIO: Project[] = [
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

function loadProjects(): Project[] {
  if (typeof window === "undefined") return DEFAULT_PORTFOLIO;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Project[];
  } catch {
    /* ignore */
  }
  return DEFAULT_PORTFOLIO;
}

function saveProjects(projects: Project[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    /* ignore */
  }
}

export default function FreelancerPortfolio() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string | null;
  } | null>(null);

  // Initialize from localStorage for persistence across navigation
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

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
    // Load persisted projects after auth check
    setProjects(loadProjects());
  }, [router]);

  const persistAndSet = (updated: Project[]) => {
    setProjects(updated);
    saveProjects(updated);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleAddProject = (newProject: Omit<Project, "id">) => {
    const project: Project = { ...newProject, id: Date.now() };
    persistAndSet([project, ...projects]);
  };

  const handleDeleteProject = (id: number) => {
    persistAndSet(projects.filter(p => p.id !== id));
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
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
            My Portfolio
          </h1>
          <p className="text-[rgb(var(--muted))] mt-2 text-lg">
            Manage your past work, case studies, and showcase projects here.
          </p>
        </div>

        <AddProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddProject}
        />

        {/* Save Confirmation Toast */}
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg font-semibold text-sm flex items-center gap-2"
          >
            ✓ Portfolio saved!
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mt-8">
            <h3 className="text-xl font-bold text-[rgb(var(--text))] flex items-center gap-2">
              <span className="px-3 py-1 bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] rounded-full text-sm font-medium">
                {projects.length} Projects
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group w-full rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[rgb(var(--accent))]/10 transition-all duration-300"
              >
                <div className="aspect-4/3 w-full bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                      <MoreHorizontal size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-3 bg-red-500 text-white rounded-full hover:scale-110 hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[rgb(var(--text))] mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-[rgb(var(--muted))] mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-full text-[rgb(var(--text))]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-3xl border-2 border-dashed border-[rgb(var(--border))] bg-transparent flex flex-col items-center justify-center min-h-[350px] text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))]/5 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-[rgb(var(--surface))] group-hover:bg-[rgb(var(--accent))] group-hover:text-white flex items-center justify-center mb-4 shadow-sm transition-all duration-300 group-hover:scale-110">
                <Plus size={32} />
              </div>
              <span className="font-semibold text-lg">Create New Project</span>
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
