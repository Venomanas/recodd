/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/DashboardLayout";
import StatsCard from "@/app/components/StatsCard";
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  Shield,
  AlertTriangle,
  Trash2,
  Ban,
  Eye,
} from "lucide-react";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";

// Mock data
const mockStats = {
  totalUsers: 1247,
  totalFreelancers: 823,
  totalBusinesses: 394,
  platformRevenue: 2350000,
  activeProjects: 156,
  monthlyGrowth: 12.5,
};

const mockUsers = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "freelancer",
    projectsServed: 24,
    joinedDate: "2025-06-15",
    status: "active",
  },
  {
    id: "2",
    name: "TechStart Inc.",
    email: "contact@techstart.com",
    role: "business",
    projectsPosted: 12,
    joinedDate: "2025-08-20",
    status: "active",
  },
  {
    id: "3",
    name: "Rahul Verma",
    email: "rahul@example.com",
    role: "freelancer",
    projectsServed: 18,
    joinedDate: "2025-07-10",
    status: "active",
  },
  {
    id: "4",
    name: "StartupX",
    email: "hello@startupx.com",
    role: "business",
    projectsPosted: 8,
    joinedDate: "2025-09-05",
    status: "suspended",
  },
];

const mockRecentActivity = [
  {
    id: "1",
    action: "New user registered",
    user: "Amit Kumar (Freelancer)",
    time: "10 min ago",
  },
  {
    id: "2",
    action: "Project completed",
    details: "E-commerce Platform - ₹75,000",
    time: "1 hour ago",
  },
  {
    id: "3",
    action: "Payment processed",
    details: "₹45,000 to Priya Sharma",
    time: "3 hours ago",
  },
  {
    id: "4",
    action: "Reported content",
    details: "Review flagged by user",
    time: "5 hours ago",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string | null;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    "all" | "freelancer" | "business"
  >("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") {
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

  const filteredUsers = mockUsers.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId: string) => {
    // In production, call API to delete user
    console.log("Deleting user:", userId);
    setShowDeleteConfirm(null);
  };

  return (
    <DashboardLayout role="admin" userName={user.name}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[rgb(var(--text))] mb-2">
          Admin Dashboard 🛡️
        </h1>
        <p className="text-[rgb(var(--text-secondary))]">
          Platform overview and user management.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={mockStats.totalUsers}
          icon={Users}
          trend="up"
          trendValue={`+${mockStats.monthlyGrowth}%`}
          subtitle="This month"
          color="blue"
        />
        <StatsCard
          title="Revenue"
          value={`₹${(mockStats.platformRevenue / 100000).toFixed(1)}L`}
          icon={DollarSign}
          trend="up"
          trendValue="+18.2%"
          subtitle="Last 30 days"
          color="green"
        />
        <StatsCard
          title="Active Projects"
          value={mockStats.activeProjects}
          icon={Briefcase}
          subtitle="Platform-wide"
          color="purple"
        />
        <StatsCard
          title="Growth Rate"
          value={`${mockStats.monthlyGrowth}%`}
          icon={TrendingUp}
          trend="up"
          trendValue="+2.1%"
          subtitle="Month over month"
          color="red"
        />
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--muted))] mb-1">
                Total Freelancers
              </p>
              <p className="text-3xl font-bold text-[rgb(var(--text))]">
                {mockStats.totalFreelancers}
              </p>
            </div>
            <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
              <Users size={28} />
            </div>
          </div>
          <div className="mt-4 text-sm text-[rgb(var(--muted))]">
            {(
              (mockStats.totalFreelancers / mockStats.totalUsers) *
              100
            ).toFixed(1)}
            % of total users
          </div>
        </div>

        <div className="p-6 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--muted))] mb-1">
                Total Businesses
              </p>
              <p className="text-3xl font-bold text-[rgb(var(--text))]">
                {mockStats.totalBusinesses}
              </p>
            </div>
            <div className="p-4 bg-purple-100 text-purple-600 rounded-xl">
              <Briefcase size={28} />
            </div>
          </div>
          <div className="mt-4 text-sm text-[rgb(var(--muted))]">
            {((mockStats.totalBusinesses / mockStats.totalUsers) * 100).toFixed(
              1,
            )}
            % of total users
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management Table */}
        <div className="lg:col-span-2 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[rgb(var(--text))]">
                User Management
              </h2>
              <Shield size={20} className="text-[rgb(var(--accent))]" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/20"
              />
              <select
                value={selectedRole}
                onChange={e =>
                  setSelectedRole(
                    e.target.value as "all" | "freelancer" | "business",
                  )
                }
                className="px-4 py-2 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/20"
              >
                <option value="all">All Roles</option>
                <option value="freelancer">Freelancers</option>
                <option value="business">Businesses</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredUsers.map(u => (
              <div
                key={u.id}
                className="p-4 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl hover:shadow-(--shadow-sm) transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[rgb(var(--accent))] to-[rgb(var(--gray))] flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {u.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[rgb(var(--text))] truncate">
                          {u.name}
                        </h3>
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${
                            u.role === "freelancer"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {u.role}
                        </span>
                        {u.status === "suspended" && (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                            Suspended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[rgb(var(--muted))] truncate">
                        {u.email}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-[rgb(var(--muted))]">
                        <span>
                          {u.role === "freelancer"
                            ? `${(u as any).projectsServed} projects served`
                            : `${(u as any).projectsPosted} projects posted`}
                        </span>
                        <span>•</span>
                        <span>
                          Joined{" "}
                          {new Date(u.joinedDate).toLocaleDateString("en-IN", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-2 hover:bg-yellow-100 text-yellow-600 rounded-lg transition-colors"
                      title="Suspend User"
                    >
                      <Ban size={16} />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(u.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                {showDeleteConfirm === u.id && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-700 text-sm mb-2">
                      <AlertTriangle size={16} />
                      <span className="font-semibold">Are you sure?</span>
                    </div>
                    <p className="text-xs text-red-600 mb-3">
                      This action cannot be undone. The user&apos;s account and all
                      associated data will be permanently deleted.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-3 py-1.5 bg-white border border-red-200 text-red-700 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[rgb(var(--text))] mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {mockRecentActivity.map(activity => (
              <div
                key={activity.id}
                className="p-3 bg-[rgb(var(--bg))] rounded-lg border border-[rgb(var(--border))]"
              >
                <p className="text-sm font-medium text-[rgb(var(--text))] mb-1">
                  {activity.action}
                </p>
                <p className="text-xs text-[rgb(var(--muted))]">
                  {activity.user || activity.details}
                </p>
                <p className="text-xs text-[rgb(var(--muted))] mt-1">
                  {activity.time}
                </p>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-sm text-[rgb(var(--accent))] font-medium hover:underline">
            View All Activity
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
