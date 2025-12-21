"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Clock, User, Briefcase } from "lucide-react";

type Message = {
  id: string;
  sender_email: string;
  message: string;
  profile_id: number;
  profile_type: string;
  is_read: boolean;
  created_at: string;
};

export default function AdminInboxClient({
  messages,
}: {
  messages: Message[];
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [readMessages, setReadMessages] = useState<Set<string>>(
    new Set(messages.filter(m => m.is_read).map(m => m.id))
  );

  const handleMarkAsRead = async (messageId: string) => {
    setLoadingId(messageId);

    try {
      const response = await fetch("/api/admin/messages/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            text-center py-16 px-6
            rounded-2xl
            bg-gray-50 dark:bg-zinc-900
            border-2 border-dashed border-gray-300 dark:border-zinc-700
          "
        >
          <Mail className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No messages yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            When users contact profiles, their messages will appear here.
          </p>
        </motion.div>
      ) : (
        messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              relative
              rounded-2xl
              border-2
              p-6
              transition-all duration-300
              ${
                isRead(msg.id)
                  ? "border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  : "border-red-500/40 dark:border-red-500/40 bg-red-50/50 dark:bg-red-500/5"
              }
              hover:shadow-lg
            `}
          >
            {/* Read indicator badge */}
            <div className="absolute top-4 right-4">
              {isRead(msg.id) ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                    Read
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-semibold text-red-700 dark:text-red-400">
                    New
                  </span>
                </motion.div>
              )}
            </div>

            {/* Header */}
            <div className="mb-4 pr-24">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {msg.sender_email}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(msg.created_at).toLocaleString()}
                </span>

                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
                  {msg.profile_type === "freelancer" ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Briefcase className="w-3.5 h-3.5" />
                  )}
                  <span className="capitalize">{msg.profile_type}</span>
                  <span className="text-gray-400">#{msg.profile_id}</span>
                </span>
              </div>
            </div>

            {/* Message content */}
            <div className="mb-4 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                {msg.message}
              </p>
            </div>

            {/* Action button */}
            {!isRead(msg.id) && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMarkAsRead(msg.id)}
                disabled={loadingId === msg.id}
                className="
                  w-full sm:w-auto
                  px-6 py-2.5
                  rounded-xl
                  bg-linear-to-r from-red-500 to-red-600
                  hover:from-red-600 hover:to-red-700
                  text-white text-sm font-semibold
                  shadow-md hover:shadow-lg
                  transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                "
              >
                {loadingId === msg.id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Marking as read...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark as read</span>
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
        ))
      )}
    </div>
  );
}
