"use client";

import { useState } from "react";
import Animatedbutton from "@/app/components/Animatedbutton";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCircle2,
  Mail,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

type Props = {
  profileId: number;
  profileType: "freelancer" | "business";
  onClose: () => void;
};

export const ContactModal = ({ profileId, profileType, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (message.trim().length < 10) {
      setError("Message must be at least 10 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          message: message.trim(),
          profileId,
          profileType,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-lg rounded-3xl bg-[rgb(var(--bg))] border-2 border-[rgb(var(--border))] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-linear-to-br from-[rgb(var(--accent))]/5 via-transparent to-transparent pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-xl hover:bg-[rgb(var(--surface))] text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-all duration-200 z-10 hover:scale-110 active:scale-95"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          <div className="relative">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-20 px-8 text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 rounded-full bg-linear-to-br from-emerald-500/20 to-green-500/20 border-2 border-emerald-500/30 flex items-center justify-center"
                  >
                    <CheckCircle2
                      className="w-12 h-12 text-emerald-500"
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold text-[rgb(var(--text))] mb-3">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-[rgb(var(--muted))] text-base max-w-sm mx-auto leading-relaxed">
                      Your message has been delivered. You&apos;ll receive a
                      response at{" "}
                      <span className="text-[rgb(var(--accent))] font-semibold">
                        {email}
                      </span>
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-xs pt-2"
                  >
                    <Animatedbutton
                      onClick={onClose}
                      variant="secondary"
                      className="w-full justify-center py-3.5"
                    >
                      Close
                    </Animatedbutton>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 sm:p-10"
                >
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-[rgb(var(--text))] tracking-tight mb-2">
                      Get in Touch
                    </h3>
                    <p className="text-[rgb(var(--muted))] text-base">
                      Send a direct message to start the conversation.
                    </p>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="mb-6 p-4 rounded-xl bg-red-500/10 border-2 border-red-500/20 flex items-start gap-3"
                      >
                        <AlertCircle
                          className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                          strokeWidth={2.5}
                        />
                        <p className="text-sm text-red-400 font-medium">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-6">
                    <div className="space-y-2.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))] ml-1 block"
                      >
                        Your Email
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-[rgb(var(--accent))]/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--muted))] group-focus-within:text-[rgb(var(--accent))] transition-all duration-200 z-10"
                          strokeWidth={2.5}
                        />
                        <input
                          id="email"
                          type="email"
                          placeholder="name@company.com"
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value);
                            if (error) setError("");
                          }}
                          className="relative w-full pl-12 pr-4 py-4 rounded-xl bg-[rgb(var(--surface))] border-2 border-transparent text-[rgb(var(--text))] text-base placeholder:text-[rgb(var(--muted))] focus:outline-none focus:bg-[rgb(var(--bg))] focus:border-[rgb(var(--accent))] hover:border-[rgb(var(--border))] transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <label
                        htmlFor="message"
                        className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))] ml-1 block"
                      >
                        Message
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-[rgb(var(--accent))]/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                        <MessageSquare
                          className="absolute left-4 top-4 w-5 h-5 text-[rgb(var(--muted))] group-focus-within:text-[rgb(var(--accent))] transition-all duration-200 z-10"
                          strokeWidth={2.5}
                        />
                        <textarea
                          id="message"
                          placeholder="Hi, I'm interested in your project..."
                          value={message}
                          onChange={e => {
                            setMessage(e.target.value);
                            if (error) setError("");
                          }}
                          rows={5}
                          className="relative w-full pl-12 pr-4 py-4 min-h-[150px] rounded-xl bg-[rgb(var(--surface))] border-2 border-transparent text-[rgb(var(--text))] text-base placeholder:text-[rgb(var(--muted))] focus:outline-none focus:bg-[rgb(var(--bg))] focus:border-[rgb(var(--accent))] hover:border-[rgb(var(--border))] transition-all duration-200 resize-none leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Animatedbutton
                        onClick={onClose}
                        variant="ghost"
                        className="flex-1 justify-center py-4 text-base font-semibold"
                      >
                        Cancel
                      </Animatedbutton>

                      <Animatedbutton
                        onClick={handleSubmit}
                        variant="primary"
                        className="flex-2 justify-center py-4 text-base font-semibold"
                        disabled={loading || !email.trim() || !message.trim()}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2.5">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2.5">
                            <Send size={18} strokeWidth={2.5} />
                            <span>Send Message</span>
                          </div>
                        )}
                      </Animatedbutton>
                    </div>

                    <p className="text-[11px] text-center text-[rgb(var(--muted))] pt-3 leading-relaxed">
                      By sending this message, you agree to our{" "}
                      <span className="text-[rgb(var(--text))] font-medium">
                        Terms of Service
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
