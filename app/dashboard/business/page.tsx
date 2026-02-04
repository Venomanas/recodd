"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/DashboardLayout";
import StatsCard from "@/app/components/StatsCard";
import {
  Briefcase,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  FileText,
  MessageSquare,
  Plus,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";

// Mock data
const mockStats = {
  totalProjects: 15,
  activeProjects: 6,
  freelancersHired: 23,
  totalSpent: 450000,
};

const mockPostedProjects = [
  {
    id: "1",
    title: "Full-Stack Web Application",
    description: "Need experienced developer for e-commerce platform",
    budget: 75000,
    applicants: 12,
    status: "active",
    deadline: "2026-03-15",
  },
  {
    id: "2",
    title: "Mobile App UI Redesign",
    description: "Looking for talented designer to modernize our app",
    budget: 45000,
    applicants: 8,
    status: "active",
    deadline: "2026-03-01",
  },
  {
    id: "3",
    title: "SEO Optimization",
    description: "Expert needed for comprehensive SEO strategy",
    budget: 30000,
    applicants: 15,
    status: "in_review",
    deadline: "2026-02-25",
  },
];

const mockHiredFreelancers = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Frontend Developer",
    project: "E-commerce Platform",
    hourlyRate: 1200,
    hoursWorked: 45,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Rahul Verma",
    role: "UI/UX Designer",
    project: "Mobile App Redesign",
    hourlyRate: 1000,
    hoursWorked: 32,
    rating: 4.8,
  },
];

export default function BusinessDashboard() {
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
    <DashboardLayout role="business" userName={user.name}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[rgb(var(--text))] mb-2">
          Business Dashboard 🚀
        </h1>
        <p className="text-[rgb(var(--text-secondary))]">
          Manage your projects and hired talent from one place.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Spent"
          value={`₹${mockStats.totalSpent.toLocaleString("en-IN")}`}
          icon={DollarSign}
          trend="up"
          trendValue="+8.2%"
          subtitle="Last 30 days"
          color="red"
        />
        <StatsCard
          title="Active Projects"
          value={mockStats.activeProjects}
          icon={Briefcase}
          subtitle={`${mockStats.totalProjects} total`}
          color="blue"
        />
        <StatsCard
          title="Hired Freelancers"
          value={mockStats.freelancersHired}
          icon={Users}
          trend="up"
          trendValue="+3 this month"
          color="purple"
        />
        <StatsCard
          title="Avg. Completion"
          value="14 days"
          icon={Clock}
          trend="down"
          trendValue="-2 days"
          subtitle="Faster delivery"
          color="green"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button className="p-5 bg-linear-to-br from-[rgb(var(--accent))] to-[rgb(var(--accent))]/80 text-white rounded-2xl hover:shadow-(--shadow-lg) transition-all text-left group">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <Plus size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Post New Project</h3>
              <p className="text-sm opacity-90">Find the perfect freelancer</p>
            </div>
          </div>
        </button>

        <button className="p-5 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl hover:border-[rgb(var(--accent))] hover:shadow-(--shadow-sm) transition-all text-left group">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-[rgb(var(--text))] group-hover:text-[rgb(var(--accent))]">
                Browse Talent
              </h3>
              <p className="text-sm text-[rgb(var(--muted))]">
                Explore freelancers
              </p>
            </div>
          </div>
        </button>

        <button className="p-5 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl hover:border-[rgb(var(--accent))] hover:shadow-(--shadow-sm) transition-all text-left group">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-[rgb(var(--text))] group-hover:text-[rgb(var(--accent))]">
                View Analytics
              </h3>
              <p className="text-sm text-[rgb(var(--muted))]">
                Track performance
              </p>
            </div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posted Projects */}
        <div className="lg:col-span-2 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[rgb(var(--text))]">
              Posted Projects
            </h2>
            <button className="text-sm text-[rgb(var(--accent))] hover:underline font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {mockPostedProjects.map(project => (
              <div
                key={project.id}
                className="p-5 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl hover:shadow-(--shadow-sm) transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[rgb(var(--text))] mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[rgb(var(--muted))] line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ml-3 ${
                      project.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.status === "active" ? "Active" : "In Review"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-[rgb(var(--muted))]">
                      <Users size={14} />
                      <span>{project.applicants} applicants</span>
                    </div>
                    <div className="flex items-center gap-1 text-[rgb(var(--muted))]">
                      <Calendar size={14} />
                      <span>
                        {new Date(project.deadline).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>
                  <div className="font-semibold text-[rgb(var(--text))]">
                    ₹{project.budget.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button className="px-4 py-2 text-sm font-medium bg-[rgb(var(--accent))] text-white rounded-lg hover:bg-[rgb(var(--accent-hover))] transition-colors">
                    View Applicants
                  </button>
                  <button className="px-4 py-2 text-sm font-medium border border-[rgb(var(--border))] rounded-lg hover:bg-[rgb(var(--bg))] transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hired Freelancers */}
        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[rgb(var(--text))] mb-6">
            Hired Talent
          </h2>

          <div className="space-y-4">
            {mockHiredFreelancers.map(freelancer => (
              <div
                key={freelancer.id}
                className="p-4 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-[rgb(var(--accent))] to-[rgb(var(--gray))] flex items-center justify-center text-white font-bold shadow-md">
                    {freelancer.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[rgb(var(--text))]">
                      {freelancer.name}
                    </h3>
                    <p className="text-xs text-[rgb(var(--muted))]">
                      {freelancer.role}
                    </p>
                    <p className="text-xs text-[rgb(var(--text-secondary))] mt-1">
                      {freelancer.project}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-green-600" />
                        <span className="text-xs text-[rgb(var(--muted))]">
                          {freelancer.hoursWorked}h worked
                        </span>
                      </div>
                      <span className="text-xs text-[rgb(var(--muted))]">
                        •
                      </span>
                      <span className="text-xs text-yellow-600">
                        ★ {freelancer.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-3 py-2 text-xs font-medium text-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))]/5 rounded-lg transition-colors">
                  Send Message
                </button>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-sm text-[rgb(var(--accent))] font-medium hover:underline">
            View All Freelancers
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
