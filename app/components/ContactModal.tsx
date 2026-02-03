"use client";

import { useState } from "react";
import Animatedbutton from "@/app/components/Animatedbutton";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-[480px] rounded-xl bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[rgb(var(--success))/0.1] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[rgb(var(--success))]" />
                  </div>
                  <h3 className="text-xl font-bold text-[rgb(var(--text))] mb-2">
                    Message Sent
                  </h3>
                  <p className="text-[rgb(var(--text-secondary))] mb-8">
                    We've sent a confirmation to{" "}
                    <span className="font-semibold">{email}</span>
                  </p>
                  <Animatedbutton
                    onClick={onClose}
                    variant="secondary"
                    className="w-full"
                  >
                    Close
                  </Animatedbutton>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-[rgb(var(--text))] mb-2">
                      Get in Touch
                    </h3>
                    <p className="text-[rgb(var(--text-secondary))] text-sm">
                      Fill out the form below to start a conversation.
                    </p>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 p-3 rounded-md bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-[rgb(var(--text))]"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        className={`
                            w-full h-12 px-4 rounded-md 
                            bg-white dark:bg-zinc-900
                            border ${error && !email ? "border-red-500" : "border-[rgb(var(--border))]"}
                            focus:outline-none focus:border-[rgb(var(--accent))] focus:ring-1 focus:ring-[rgb(var(--accent))]
                            transition-all duration-200
                        `}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="text-sm font-semibold text-[rgb(var(--text))]"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="Tell us about your project..."
                        value={message}
                        onChange={e => {
                          setMessage(e.target.value);
                          if (error) setError("");
                        }}
                        rows={4}
                        className={`
                            w-full p-4 rounded-md 
                            bg-white dark:bg-zinc-900
                            border ${error && !message ? "border-red-500" : "border-[rgb(var(--border))]"}
                            focus:outline-none focus:border-[rgb(var(--accent))] focus:ring-1 focus:ring-[rgb(var(--accent))]
                            transition-all duration-200 resize-none
                        `}
                      />
                    </div>

                    <Animatedbutton
                      onClick={handleSubmit}
                      variant="primary"
                      className="w-full justify-center h-[52px] text-base font-semibold mt-2"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Animatedbutton>

                    <p className="text-xs text-center text-[rgb(var(--muted))] pt-2">
                      Your contact info is never shared with third parties.
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
