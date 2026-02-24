/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

import DashboardLayout from "@/app/components/DashboardLayout";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";
import {
  ProjectDetailModal,
  ProjectDetail,
} from "@/app/components/ProjectDetailModal";

// --- MOCK DATA (Replace with Supabase later) ---
const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    client: "TechFlow Inc.",
    task: "Redesign Landing Page Hero Section",
    dueDate: "2 days left",
    status: "urgent",
    budget: "$800",
    profileUrl: "/businesses",
  },
  {
    id: 2,
    client: "Sarah J. Bakery",
    task: "Implement Cart Functionality",
    dueDate: "1 week left",
    status: "in-progress",
    budget: "$1,200",
    profileUrl: "/businesses",
  },
  {
    id: 3,
    client: "Recodd Internal",
    task: "Update User Profile Component",
    dueDate: "Completed",
    status: "completed",
    budget: "$500",
    profileUrl: "/businesses",
  },
];

export default function FreelancerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string | null;
  } | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(
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

    setUser({
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
    });
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout role="freelancer" userName={user.name}>
      <div className="space-y-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
              Freelancer Dashboard
            </h1>
            <p className="text-[rgb(var(--muted))] mt-2 text-lg">
              Welcome back, {user.name}. You have{" "}
              <span className="text-[rgb(var(--accent))] font-semibold">
                2 active tasks
              </span>
              .
            </p>
          </div>
        </div>

        <OverviewSection onSelectProject={setSelectedProject} />
      </div>

      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </DashboardLayout>
  );
}

// --- SUB-COMPONENT: OVERVIEW (The Indicators) ---
function OverviewSection({
  onSelectProject,
}: {
  onSelectProject: (project: any) => void;
}) {
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
                  <button
                    onClick={() => onSelectProject(item)}
                    className="px-4 py-2 text-sm font-medium bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl hover:bg-[rgb(var(--accent))] hover:text-white hover:border-[rgb(var(--accent))] transition-all"
                  >
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
