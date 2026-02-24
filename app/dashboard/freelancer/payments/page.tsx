/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowDownLeft,
} from "lucide-react";
import DashboardLayout from "@/app/components/DashboardLayout";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";

const MOCK_PAYMENTS = [
  {
    id: 1,
    from: "TechFlow Inc.",
    project: "Landing Page Redesign",
    amount: 800,
    status: "received",
    date: "2026-02-20",
    method: "Bank Transfer",
  },
  {
    id: 2,
    from: "Sarah J. Bakery",
    project: "Cart Functionality",
    amount: 1200,
    status: "pending",
    date: "2026-02-22",
    method: "UPI",
  },
  {
    id: 3,
    from: "Recodd Internal",
    project: "Profile Component Update",
    amount: 500,
    status: "received",
    date: "2026-02-15",
    method: "Bank Transfer",
  },
  {
    id: 4,
    from: "DesignStudio Co.",
    project: "Brand Identity Kit",
    amount: 2500,
    status: "received",
    date: "2026-01-30",
    method: "UPI",
  },
];

export default function FreelancerPayments() {
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
    if (!currentUser || currentUser.role !== "freelancer") {
      router.push("/");
      return;
    }
    setUser({ ...currentUser });
  }, [router]);

  const totalReceived = MOCK_PAYMENTS.filter(
    p => p.status === "received",
  ).reduce((a, p) => a + p.amount, 0);
  const totalPending = MOCK_PAYMENTS.filter(p => p.status === "pending").reduce(
    (a, p) => a + p.amount,
    0,
  );

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
            Payments
          </h1>
          <p className="text-[rgb(var(--muted))] mt-2">
            Track all payments received from clients.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <DollarSign
                  size={20}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <span className="text-sm font-semibold text-[rgb(var(--muted))] uppercase tracking-wide">
                Total Received
              </span>
            </div>
            <p className="text-3xl font-bold text-[rgb(var(--text))]">
              ₹{totalReceived.toLocaleString("en-IN")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock
                  size={20}
                  className="text-amber-600 dark:text-amber-400"
                />
              </div>
              <span className="text-sm font-semibold text-[rgb(var(--muted))] uppercase tracking-wide">
                Pending
              </span>
            </div>
            <p className="text-3xl font-bold text-[rgb(var(--text))]">
              ₹{totalPending.toLocaleString("en-IN")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[rgb(var(--accent))]/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-[rgb(var(--accent))]" />
              </div>
              <span className="text-sm font-semibold text-[rgb(var(--muted))] uppercase tracking-wide">
                Projects Paid
              </span>
            </div>
            <p className="text-3xl font-bold text-[rgb(var(--text))]">
              {MOCK_PAYMENTS.filter(p => p.status === "received").length}
            </p>
          </motion.div>
        </div>

        {/* Transactions list */}
        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[rgb(var(--border))]">
            <h2 className="text-xl font-bold text-[rgb(var(--text))]">
              Transaction History
            </h2>
          </div>
          <div className="divide-y divide-[rgb(var(--border))]">
            {MOCK_PAYMENTS.map((payment, i) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-[rgb(var(--bg))] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${payment.status === "received" ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}
                  >
                    {payment.status === "received" ? (
                      <ArrowDownLeft
                        size={20}
                        className="text-green-600 dark:text-green-400"
                      />
                    ) : (
                      <Clock
                        size={20}
                        className="text-amber-600 dark:text-amber-400"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[rgb(var(--text))]">
                      {payment.project}
                    </p>
                    <p className="text-sm text-[rgb(var(--muted))]">
                      {payment.from} • {payment.method}
                    </p>
                    <p className="text-xs text-[rgb(var(--muted))] mt-0.5">
                      {new Date(payment.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <p
                    className={`text-xl font-bold ${payment.status === "received" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}
                  >
                    {payment.status === "received" ? "+" : ""}₹
                    {payment.amount.toLocaleString("en-IN")}
                  </p>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${payment.status === "received" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"}`}
                  >
                    {payment.status === "received" ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={11} />
                        Received
                      </span>
                    ) : (
                      "Pending"
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
