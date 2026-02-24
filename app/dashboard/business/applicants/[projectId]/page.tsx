/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  MessageSquare,
  Star,
  CheckCircle2,
  Clock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import DashboardLayout from "@/app/components/DashboardLayout";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";

// Mock applicant data — replace with Supabase query
const MOCK_APPLICANTS = [
  {
    id: 1,
    name: "Priya Sharma",
    jobTitle: "Frontend Developer",
    avatar: "P",
    bio: "5 years building responsive UIs with React and TypeScript.",
    skills: ["React", "TypeScript", "Next.js"],
    rate: "₹1,200/hr",
    rating: 4.9,
    completedJobs: 47,
    responseTime: "< 1 hour",
    status: "new",
    profileId: "1",
  },
  {
    id: 2,
    name: "Rahul Verma",
    jobTitle: "UI/UX Designer",
    avatar: "R",
    bio: "Crafting beautiful digital experiences using Figma and design systems.",
    skills: ["Figma", "UI/UX", "Branding"],
    rate: "₹1,000/hr",
    rating: 4.8,
    completedJobs: 38,
    responseTime: "< 2 hours",
    status: "shortlisted",
    profileId: "2",
  },
  {
    id: 3,
    name: "Aditya Singh",
    jobTitle: "Full Stack Developer",
    avatar: "A",
    bio: "Building end-to-end web applications with Node.js and React.",
    skills: ["Node.js", "React", "MongoDB"],
    rate: "₹1,500/hr",
    rating: 4.7,
    completedJobs: 62,
    responseTime: "< 3 hours",
    status: "new",
    profileId: "3",
  },
  {
    id: 4,
    name: "Meera Nair",
    jobTitle: "Backend Engineer",
    avatar: "M",
    bio: "Scalable API design, cloud infra and DevOps enthusiast.",
    skills: ["Python", "AWS", "Django"],
    rate: "₹1,100/hr",
    rating: 4.6,
    completedJobs: 29,
    responseTime: "< 4 hours",
    status: "new",
    profileId: "4",
  },
  {
    id: 5,
    name: "Kabir Khan",
    jobTitle: "Mobile App Developer",
    avatar: "K",
    bio: "Cross-platform mobile apps using React Native and Flutter.",
    skills: ["React Native", "Flutter", "iOS"],
    rate: "₹1,300/hr",
    rating: 4.9,
    completedJobs: 55,
    responseTime: "< 1 hour",
    status: "shortlisted",
    profileId: "5",
  },
];

const PROJECT_TITLES: Record<string, string> = {
  "1": "Full-Stack Web Application",
  "2": "Mobile App UI Redesign",
  "3": "SEO Optimization",
};

export default function ViewApplicantsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId =
    typeof params?.projectId === "string" ? params.projectId : "1";

  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string | null;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [applicants, setApplicants] = useState(MOCK_APPLICANTS);

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

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return applicants;
    return applicants.filter(
      a =>
        a.name.toLowerCase().includes(q) ||
        a.jobTitle.toLowerCase().includes(q) ||
        a.skills.some(s => s.toLowerCase().includes(q)),
    );
  }, [searchQuery, applicants]);

  const handleShortlist = (id: number) => {
    setApplicants(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, status: a.status === "shortlisted" ? "new" : "shortlisted" }
          : a,
      ),
    );
  };

  const projectTitle = PROJECT_TITLES[projectId] ?? "Your Project";

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-[rgb(var(--muted))]">
        Loading...
      </div>
    );

  return (
    <DashboardLayout role="business" userName={user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <Link
              href="/dashboard/business/projects"
              className="inline-flex items-center gap-1.5 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] transition-colors mb-3"
            >
              <ArrowLeft size={16} /> Back to Projects
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
              Applicants
            </h1>
            <p className="text-[rgb(var(--muted))] mt-1 text-lg">
              Reviewing applications for:{" "}
              <span className="text-[rgb(var(--text))] font-semibold">
                {projectTitle}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3 py-1 bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] font-semibold rounded-full text-sm">
              {applicants.length} Total
            </span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 font-semibold rounded-full text-sm">
              {applicants.filter(a => a.status === "shortlisted").length}{" "}
              Shortlisted
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))]"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, job title, or skill..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 outline-none text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] transition-all"
          />
        </div>

        {/* Applicant Cards */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-[rgb(var(--muted))]">
              <Search size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">No applicants match your search.</p>
            </div>
          )}
          {filtered.map((applicant, i) => (
            <motion.div
              key={applicant.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-6 bg-[rgb(var(--surface))] border rounded-2xl transition-all group hover:shadow-lg hover:shadow-[rgb(var(--accent))]/5 ${
                applicant.status === "shortlisted"
                  ? "border-amber-400/40"
                  : "border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]/30"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left: Avatar + Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-linear-to-br from-[rgb(var(--accent))] to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {applicant.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-[rgb(var(--text))]">
                        {applicant.name}
                      </h3>
                      {applicant.status === "shortlisted" && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                          ⭐ Shortlisted
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[rgb(var(--accent))] font-medium mb-2">
                      {applicant.jobTitle}
                    </p>
                    <p className="text-sm text-[rgb(var(--muted))] mb-3 max-w-lg">
                      {applicant.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {applicant.skills.map(s => (
                        <span
                          key={s}
                          className="px-2.5 py-1 text-xs font-semibold bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-full text-[rgb(var(--text))]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--muted))]">
                      <span className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500" />{" "}
                        {applicant.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={14} className="text-green-500" />{" "}
                        {applicant.completedJobs} jobs done
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {applicant.responseTime}
                      </span>
                      <span className="font-semibold text-[rgb(var(--text))]">
                        {applicant.rate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-row lg:flex-col gap-2 items-center lg:items-end shrink-0">
                  <Link
                    href={`/freelancer/${applicant.profileId}`}
                    className="px-5 py-2.5 bg-[rgb(var(--text))] text-[rgb(var(--bg))] rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity text-center whitespace-nowrap"
                  >
                    View Profile
                  </Link>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl font-medium text-sm text-[rgb(var(--text))] hover:border-[rgb(var(--accent))] transition-colors whitespace-nowrap">
                    <MessageSquare size={16} />
                    Message
                  </button>
                  <button
                    onClick={() => handleShortlist(applicant.id)}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                      applicant.status === "shortlisted"
                        ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-300"
                        : "bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
                    }`}
                  >
                    {applicant.status === "shortlisted"
                      ? "✓ Shortlisted"
                      : "Shortlist"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
