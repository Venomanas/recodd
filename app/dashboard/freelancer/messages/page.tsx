/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Clock, User } from "lucide-react";
import DashboardLayout from "@/app/components/DashboardLayout";
import { getCurrentUser, isAuthenticated } from "@/lib/recodd/auth";

// Mock messages received via contact modal
const MOCK_INBOX = [
  {
    id: 1,
    from: "TechFlow Inc.",
    email: "hire@techflow.io",
    subject: "Landing Page Redesign Project",
    preview:
      "Hi! We saw your portfolio and love your UI work. We'd like to discuss a redesign project...",
    body: "Hi! We saw your portfolio and love your UI work. We'd like to discuss redesigning our landing page hero section. Our budget is around $800 and we need it done in 2 weeks. Would you be available?",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    from: "Sarah J. Bakery",
    email: "sarah@bakery.com",
    subject: "Cart Functionality Implementation",
    preview:
      "We need help implementing cart features in our Next.js app. Interested?",
    body: "We need help implementing cart features in our Next.js app. The scope includes product listing, cart management, and checkout. Budget is $1,200. Are you interested?",
    time: "Yesterday",
    read: true,
  },
  {
    id: 3,
    from: "Recodd Internal",
    email: "team@recodd.in",
    subject: "User Profile Component Update",
    preview:
      "Could you help us update the profile component to support avatar uploads?",
    body: "Could you help us update the profile component to support avatar uploads, bio editing, and skill tags? This is internal work, paid at $500. Let us know your availability.",
    time: "3 days ago",
    read: true,
  },
];

export default function FreelancerMessages() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string | null;
  } | null>(null);
  const [messages, setMessages] = useState(MOCK_INBOX);
  const [selected, setSelected] = useState<(typeof MOCK_INBOX)[0] | null>(null);

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

  const handleOpen = (msg: (typeof MOCK_INBOX)[0]) => {
    setSelected(msg);
    // Mark as read
    setMessages(prev =>
      prev.map(m => (m.id === msg.id ? { ...m, read: true } : m)),
    );
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <DashboardLayout role="freelancer" userName={user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] tracking-tight">
            Messages
          </h1>
          <p className="text-[rgb(var(--muted))] mt-2">
            Inquiries received from clients via contact form.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-280px)] min-h-[500px]">
          {/* Inbox List */}
          <div className="lg:w-80 xl:w-96 shrink-0 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[rgb(var(--border))] flex items-center justify-between">
              <span className="font-bold text-[rgb(var(--text))]">Inbox</span>
              <span className="px-2 py-0.5 bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] text-xs font-bold rounded-full">
                {messages.filter(m => !m.read).length} new
              </span>
            </div>
            <div className="overflow-y-auto flex-1 divide-y divide-[rgb(var(--border))]">
              {messages.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => handleOpen(msg)}
                  className={`w-full text-left p-4 hover:bg-[rgb(var(--bg))] transition-colors ${selected?.id === msg.id ? "bg-[rgb(var(--accent))]/5 border-l-2 border-l-[rgb(var(--accent))]" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[rgb(var(--accent))] to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {msg.from.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span
                          className={`text-sm font-semibold truncate ${!msg.read ? "text-[rgb(var(--text))]" : "text-[rgb(var(--muted))]"}`}
                        >
                          {msg.from}
                        </span>
                        <span className="text-xs text-[rgb(var(--muted))] shrink-0">
                          {msg.time}
                        </span>
                      </div>
                      <p
                        className={`text-xs font-medium truncate mb-0.5 ${!msg.read ? "text-[rgb(var(--text))]" : "text-[rgb(var(--muted))]"}`}
                      >
                        {msg.subject}
                      </p>
                      <p className="text-xs text-[rgb(var(--muted))] truncate">
                        {msg.preview}
                      </p>
                      {!msg.read && (
                        <span className="mt-1 inline-block w-2 h-2 rounded-full bg-[rgb(var(--accent))]" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="flex-1 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl overflow-hidden flex flex-col">
            {selected ? (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col h-full"
              >
                <div className="p-6 border-b border-[rgb(var(--border))]">
                  <h2 className="text-xl font-bold text-[rgb(var(--text))] mb-2">
                    {selected.subject}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--muted))]">
                    <span className="flex items-center gap-1.5">
                      <User size={14} /> {selected.from}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail size={14} /> {selected.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} /> {selected.time}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <p className="text-[rgb(var(--text))] leading-relaxed text-base">
                    {selected.body}
                  </p>
                </div>
                <div className="p-4 border-t border-[rgb(var(--border))]">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[rgb(var(--text))] text-[rgb(var(--bg))] rounded-xl font-bold hover:opacity-90 transition-opacity"
                  >
                    <Mail size={18} />
                    Reply via Email
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[rgb(var(--muted))] gap-3">
                <MessageSquare size={48} className="opacity-20" />
                <p className="font-medium">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
