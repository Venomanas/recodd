"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  User,
  Briefcase,
  Inbox,
  Archive,
  MessageSquare,
  ArrowLeft,
  Trash2,
  Mail,
} from "lucide-react";
import Animatedbutton from "@/app/components/Animatedbutton";

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
  messages = [],
}: {
  messages: Message[];
}) {
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [readMessages, setReadMessages] = useState<Set<string>>(
    new Set((messages || []).filter(m => m.is_read).map(m => m.id)),
  );

  const handleMarkAsRead = async (messageId: string) => {
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
    }
  };

  const isRead = (id: string) => readMessages.has(id);
  const safeMessages = messages || [];

  const filteredMessages = safeMessages.filter(msg => {
    if (filter === "unread") return !isRead(msg.id);
    if (filter === "archived") return isRead(msg.id); // Assuming read = archived for simplicity or add functionality later
    return true;
  });

  const selectedMessage = safeMessages.find(m => m.id === selectedId);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] bg-white dark:bg-zinc-900 mx-auto max-w-[1600px] border-x border-[rgb(var(--border))]">
      {/* SIDEBAR */}
      <div className="w-full lg:w-[240px] border-b lg:border-b-0 lg:border-r border-[rgb(var(--border))] p-4 bg-[rgb(var(--bg))]">
        <div className="mb-6 px-3 pt-2">
          <h2 className="font-bold text-lg text-[rgb(var(--text))]">Inbox</h2>
        </div>
        <nav className="space-y-1">
          {[
            { id: "all", label: "All Messages", icon: Inbox },
            { id: "unread", label: "Unread", icon: Mail },
            { id: "archived", label: "Archived", icon: Archive },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setFilter(item.id as any);
                setSelectedId(null);
              }}
              className={`
                w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${
                  filter === item.id
                    ? "bg-[rgb(var(--surface))] text-[rgb(var(--text))] shadow-sm border border-[rgb(var(--border))]"
                    : "text-[rgb(var(--muted))] hover:bg-[rgb(var(--surface))] hover:text-[rgb(var(--text))]"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                <span>{item.label}</span>
              </div>
              {item.id === "unread" && (
                <span className="bg-[rgb(var(--accent))] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {safeMessages.filter(m => !isRead(m.id)).length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {selectedMessage ? (
          /* MESSAGE DETAIL VIEW */
          <div className="flex-1 flex flex-col h-full bg-white dark:bg-zinc-900">
            <div className="p-4 border-b border-[rgb(var(--border))] flex items-center justify-between bg-[rgb(var(--surface))]">
              <button
                onClick={() => setSelectedId(null)}
                className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-lg hover:bg-[rgb(var(--bg))] text-[rgb(var(--muted))] hover:text-red-500"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-[rgb(var(--bg))] text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
                  title="Archive"
                >
                  <Archive size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              <div className="max-w-3xl mx-auto space-y-8">
                {/* Sender Card */}
                <div className="flex items-start justify-between gap-4 pb-8 border-b border-[rgb(var(--border))]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[rgb(var(--surface))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--text-secondary))]">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[rgb(var(--text))]">
                        {selectedMessage.sender_email}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted))]">
                        <span>
                          {selectedMessage.profile_type === "freelancer"
                            ? "Freelancer"
                            : "Business"}{" "}
                          #{selectedMessage.profile_id}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(
                            selectedMessage.created_at,
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!isRead(selectedMessage.id) && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                      className="px-3 py-1.5 bg-[rgb(var(--accent))] text-white text-xs font-bold rounded-md"
                    >
                      Mark Read
                    </button>
                  )}
                </div>

                {/* Message Body */}
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg text-[rgb(var(--text))] leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-8 flex gap-4">
                  <Animatedbutton variant="primary" className="px-6 py-2.5">
                    Reply via Email
                  </Animatedbutton>
                  <Animatedbutton variant="secondary" className="px-6 py-2.5">
                    View Profile
                  </Animatedbutton>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* MESSAGE LIST */
          <div className="flex-1 flex flex-col h-full bg-[rgb(var(--bg))]">
            {filteredMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[rgb(var(--muted))]">
                <Inbox size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">No messages found</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredMessages.map(msg => {
                  const read = isRead(msg.id);
                  return (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedId(msg.id);
                        if (!read) handleMarkAsRead(msg.id);
                      }}
                      className={`
                                    group relative flex items-center gap-4 p-5 cursor-pointer border-b border-[rgb(var(--border))] hover:bg-[rgb(var(--surface))] transition-colors
                                    ${!read ? "bg-white dark:bg-zinc-900 border-l-4 border-l-[rgb(var(--accent))] pl-4" : "opacity-80 pl-5"}
                                `}
                    >
                      <div className="shrink-0">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${!read ? "bg-[rgb(var(--accent))]" : "bg-transparent"}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-[200px,1fr,120px] gap-4 items-center">
                        <h4
                          className={`text-sm truncate ${!read ? "font-bold text-[rgb(var(--text))]" : "font-medium text-[rgb(var(--text-secondary))]"}`}
                        >
                          {msg.sender_email}
                        </h4>

                        <p className="text-sm text-[rgb(var(--muted))] truncate">
                          {msg.message}
                        </p>

                        <div className="text-xs text-[rgb(var(--muted))] text-right whitespace-nowrap">
                          {new Date(msg.created_at).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric" },
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
