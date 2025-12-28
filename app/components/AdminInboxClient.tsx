"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, User, Briefcase, Inbox } from "lucide-react";

type Message = {
  id: string;
  sender_email: string;
  message: string;
  profile_id: number;
  profile_type: string;
  is_read: boolean;
  created_at: string;
};

// FIX: Add default empty array to props to prevent build crash
export default function AdminInboxClient({
  messages = [],
}: {
  messages: Message[];
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // FIX: Add safety check (messages || []) inside the state initializer
  const [readMessages, setReadMessages] = useState<Set<string>>(
    new Set((messages || []).filter(m => m.is_read).map(m => m.id))
  );

  const handleMarkAsRead = async (messageId: string) => {
    setLoadingId(messageId);
    try {
      const response = await fetch("/api/admin/messages/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messageId }),
      });
      if (response.ok) {
        setReadMessages(prev => new Set(prev).add(messageId));
      }
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const isRead = (id: string) => readMessages.has(id);
  const safeMessages = messages || [];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
      {/* Header Stats */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--text))] tracking-tight">
            Inbox
          </h1>
          <p className="text-[rgb(var(--muted))] text-sm">
            {safeMessages.length} total messages
          </p>
        </div>
      </div>

      {safeMessages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            flex flex-col items-center justify-center py-24
            rounded-3xl
            bg-[rgb(var(--surface))]
            border border-dashed border-[rgb(var(--border))]
            text-center
          "
        >
          <div className="w-16 h-16 rounded-full bg-[rgb(var(--bg))] flex items-center justify-center mb-4 shadow-sm">
            <Inbox className="w-8 h-8 text-[rgb(var(--muted))]" />
          </div>
          <p className="text-lg font-medium text-[rgb(var(--text))]">
            All caught up!
          </p>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">
            No new messages from potential leads.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {safeMessages.map((msg, index) => {
              const read = isRead(msg.id);
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  className={`
                    group relative rounded-2xl border p-5 transition-all duration-300
                    ${
                      read
                        ? "bg-[rgb(var(--bg))] border-[rgb(var(--border))]"
                        : "bg-white dark:bg-zinc-900 border-[rgb(var(--accent))]/30 shadow-sm shadow-red-500/5"
                    }
                  `}
                >
                  {!read && (
                    <div className="absolute left-0 top-6 bottom-6 w-1 bg-[rgb(var(--accent))] rounded-r-full" />
                  )}

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-3 pl-2">
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span
                          className={`
                          flex items-center gap-1.5 px-2 py-1 rounded-md border font-medium uppercase tracking-wider
                          ${
                            msg.profile_type === "freelancer"
                              ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800"
                              : "bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800"
                          }
                        `}
                        >
                          {msg.profile_type === "freelancer" ? (
                            <User size={12} />
                          ) : (
                            <Briefcase size={12} />
                          )}
                          {msg.profile_type} #{msg.profile_id}
                        </span>
                        <span className="flex items-center gap-1 text-[rgb(var(--muted))]">
                          <Clock size={12} />
                          {new Date(msg.created_at).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>

                      <div>
                        <h3
                          className={`text-base font-semibold text-[rgb(var(--text))] ${
                            !read ? "font-bold" : ""
                          }`}
                        >
                          {msg.sender_email}
                        </h3>
                      </div>

                      <p className="text-sm text-[rgb(var(--muted))] leading-relaxed">
                        {msg.message}
                      </p>
                    </div>

                    <div className="md:self-center shrink-0">
                      {!read ? (
                        <button
                          onClick={() => handleMarkAsRead(msg.id)}
                          disabled={loadingId === msg.id}
                          className="
                            flex items-center gap-2 px-4 py-2 rounded-xl
                            text-xs font-medium
                            bg-[rgb(var(--accent))] text-white
                            hover:bg-[rgb(var(--accent-hover))]
                            shadow-lg shadow-red-500/20
                            transition-all
                          "
                        >
                          {loadingId === msg.id ? (
                            <span className="opacity-80">Syncing...</span>
                          ) : (
                            <>
                              <CheckCircle2 size={14} /> Mark Read
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20 opacity-75">
                          <CheckCircle2 size={14} /> Read
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
