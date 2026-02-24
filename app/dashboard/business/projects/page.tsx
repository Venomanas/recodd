/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Calendar, Plus } from "lucide-react";

import DashboardLayout from "@/app/components/DashboardLayout";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";

const mockPostedProjects = [
  {
    id: "1",
    title: "Full-Stack Web Application",
    description:
      "Need experienced developer for e-commerce platform built with Next.js and Supabase.",
    budget: "75,000",
    applicants: 12,
    status: "active",
    deadline: "2026-03-15",
  },
  {
    id: "2",
    title: "Mobile App UI Redesign",
    description:
      "Looking for talented designer to modernize our app using Figma.",
    budget: "45,000",
    applicants: 8,
    status: "active",
    deadline: "2026-03-01",
  },
  {
    id: "3",
    title: "SEO Optimization",
    description:
      "Expert needed for comprehensive SEO strategy and technical implementation.",
    budget: "30,000",
    applicants: 15,
    status: "in_review",
    deadline: "2026-02-25",
  },
];

export default function BusinessProjects() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string | null;
  } | null>(null);

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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout role="business" userName={user.name}>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
              Projects & Postings
            </h1>
            <p className="text-[rgb(var(--muted))] mt-2 text-lg">
              Manage your active, completed, and drafted project requirements.
            </p>
          </div>
          <button className="flex justify-center items-center gap-2 px-6 py-3 bg-[rgb(var(--accent))] text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-md shrink-0">
            <Plus size={20} />
            Post New Project
          </button>
        </div>

        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 border-b border-[rgb(var(--border))] pb-4">
            <h2 className="text-xl font-bold text-[rgb(var(--text))]">
              Active Listings
            </h2>
            <div className="flex gap-2">
              <select className="bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-[rgb(var(--text))] text-sm rounded-lg px-3 py-2 outline-none">
                <option>All Statuses</option>
                <option>Active</option>
                <option>In Review</option>
                <option>Closed</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {mockPostedProjects.map(project => (
              <div
                key={project.id}
                className="p-6 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-2xl hover:shadow-md hover:border-[rgb(var(--accent))]/50 transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-[rgb(var(--text))] group-hover:text-[rgb(var(--accent))] transition-colors">
                        {project.title}
                      </h3>
                      <span
                        className={`px-3 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full ${
                          project.status === "active"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                        }`}
                      >
                        {project.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-[rgb(var(--muted))] mb-4 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-[rgb(var(--text))] font-medium">
                        <span className="text-[rgb(var(--muted))]">
                          Budget:
                        </span>{" "}
                        ₹{project.budget}
                      </div>
                      <div className="flex items-center gap-2 text-[rgb(var(--text))] font-medium">
                        <Users size={16} className="text-[rgb(var(--muted))]" />
                        {project.applicants} Applicants
                      </div>
                      <div className="flex items-center gap-2 text-[rgb(var(--text))] font-medium">
                        <Calendar
                          size={16}
                          className="text-[rgb(var(--muted))]"
                        />
                        Deadline:{" "}
                        {new Date(project.deadline).toLocaleDateString("en-IN")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 lg:flex-col lg:items-end w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t border-[rgb(var(--border))] lg:border-t-0">
                    <button className="flex-1 lg:flex-none px-6 py-2.5 bg-[rgb(var(--text))] text-[rgb(var(--bg))] rounded-xl font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
                      Review Applicants
                    </button>
                    <button className="px-6 py-2.5 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text))] rounded-xl font-medium hover:bg-[rgb(var(--bg))] transition-colors whitespace-nowrap">
                      Edit Listing
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
