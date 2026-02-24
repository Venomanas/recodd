/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Briefcase,
  Clock,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import DashboardLayout from "@/app/components/DashboardLayout";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";
import { ProjectDetailModal } from "@/app/components/ProjectDetailModal";

const MOCK_PROJECTS = [
  {
    id: 1,
    client: "TechFlow Inc.",
    clientId: "1",
    task: "Redesign Landing Page Hero Section",
    dueDate: "2 days left",
    status: "urgent",
    budget: "$800",
    description:
      "Complete overhaul of the hero section with modern glassmorphism effects, animation, and mobile responsiveness. Deliverables include Figma mockup + Next.js implementation.",
    type: "UI/UX Design",
  },
  {
    id: 2,
    client: "Sarah J. Bakery",
    clientId: "2",
    task: "Implement Cart Functionality",
    dueDate: "1 week left",
    status: "in-progress",
    budget: "$1,200",
    description:
      "Build full cart functionality in Next.js: product add/remove, quantity update, persisted state with Zustand, and a checkout step with form validation.",
    type: "Frontend Dev",
  },
  {
    id: 3,
    client: "Recodd Internal",
    clientId: "3",
    task: "Update User Profile Component",
    dueDate: "Completed",
    status: "completed",
    budget: "$500",
    description:
      "Refactored the user profile component to support avatar uploads, bio editing, and dynamic skill tags. Integrated with Supabase storage.",
    type: "Frontend Dev",
  },
];

const STATUS_COLOR = {
  urgent: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  "in-progress":
    "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  completed:
    "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
};

export default function FreelancerProjects() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string | null;
  } | null>(null);
  const [selected, setSelected] = useState<(typeof MOCK_PROJECTS)[0] | null>(
    null,
  );

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
  }, [router]);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <DashboardLayout role="freelancer" userName={user.name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
            My Projects
          </h1>
          <p className="text-[rgb(var(--muted))] mt-2">
            View assigned work and project details from your clients.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Project list */}
          <div className="flex-1 space-y-4">
            {MOCK_PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(project)}
                className={`group relative p-6 rounded-2xl bg-[rgb(var(--surface))] border cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(var(--accent))]/5 ${selected?.id === project.id ? "border-[rgb(var(--accent))] shadow-md shadow-[rgb(var(--accent))]/10" : "border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]/40"}`}
              >
                {/* Status indicator bar */}
                <div
                  className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full ${project.status === "urgent" ? "bg-red-500" : project.status === "in-progress" ? "bg-amber-400" : "bg-emerald-500"}`}
                />
                <div className="pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--muted))]">
                          {project.client}
                        </span>
                        {project.status === "urgent" && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center gap-1">
                            <AlertCircle size={10} /> Action Required
                          </span>
                        )}
                        {project.status === "completed" && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center gap-1">
                            <CheckCircle2 size={10} /> Completed
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-[rgb(var(--text))] group-hover:text-[rgb(var(--accent))] transition-colors">
                        {project.task}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-[rgb(var(--muted))]">
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {project.dueDate}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-[rgb(var(--text))]">
                          {project.budget}
                        </span>
                        <span>•</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLOR[project.status as keyof typeof STATUS_COLOR]}`}
                        >
                          {project.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setSelected(project);
                      }}
                      className="px-4 py-2 text-sm font-medium bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl hover:bg-[rgb(var(--accent))] hover:text-white hover:border-[rgb(var(--accent))] transition-all shrink-0"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Detail Modal */}
          <ProjectDetailModal
            isOpen={!!selected}
            onClose={() => setSelected(null)}
            project={selected}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
