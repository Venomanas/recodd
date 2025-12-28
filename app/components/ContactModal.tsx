"use client";

import { useState } from "react";
import Animatedbutton from "@/app/components/Animatedbutton";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Mail, MessageSquare } from "lucide-react";

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

  const handleSubmit = async () => {
    // 1. Safety check to prevent empty submissions
    if (!email || !message) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
          profileId,
          profileType,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        // Optional: Handle non-500 errors (like 400 validation) here
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Network error:", error);
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
        className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm px-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="
            w-full max-w-lg
            rounded-3xl
            bg-[rgb(var(--bg))]
            border border-[rgb(var(--border))]
            shadow-2xl shadow-black/20
            overflow-hidden
            relative
          "
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[rgb(var(--surface))] text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-1">
            <div className="bg-[rgb(var(--bg))] rounded-[20px] overflow-hidden">
              <AnimatePresence mode="wait">
                {success ? (
                  /* SUCCESS STATE */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center py-16 px-8 text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[rgb(var(--text))]">
                        Message Sent!
                      </h3>
                      <p className="text-[rgb(var(--muted))] mt-2 max-w-xs mx-auto">
                        Your message has been delivered securely. They will
                        contact you at <strong>{email}</strong>.
                      </p>
                    </div>
                    <div className="w-full max-w-xs">
                      {/* Corrected: onClick is on the button */}
                      <Animatedbutton
                        onClick={onClose}
                        variant="secondary"
                        className="w-full justify-center"
                      >
                        Close
                      </Animatedbutton>
                    </div>
                  </motion.div>
                ) : (
                  /* FORM STATE */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 sm:p-8"
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-[rgb(var(--text))] tracking-tight">
                        Get in Touch
                      </h3>
                      <p className="text-[rgb(var(--muted))] mt-1">
                        Send a direct message to start the conversation.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Email Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--muted))] ml-1">
                          Your Email
                        </label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--muted))] group-focus-within:text-[rgb(var(--accent))] transition-colors" />
                          <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="
                              w-full pl-12 pr-4 py-3.5
                              rounded-xl
                              bg-[rgb(var(--surface))]
                              border-2 border-transparent
                              text-[rgb(var(--text))]
                              placeholder:text-[rgb(var(--muted))]
                              focus:outline-none 
                              focus:bg-[rgb(var(--bg))]
                              focus:border-[rgb(var(--accent))]
                              transition-all duration-200
                            "
                          />
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--muted))] ml-1">
                          Message
                        </label>
                        <div className="relative group">
                          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[rgb(var(--muted))] group-focus-within:text-[rgb(var(--accent))] transition-colors" />
                          <textarea
                            placeholder="Hi, I'm interested in your project..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="
                              w-full pl-12 pr-4 py-3.5
                              min-h-[140px]
                              rounded-xl
                              bg-[rgb(var(--surface))]
                              border-2 border-transparent
                              text-[rgb(var(--text))]
                              placeholder:text-[rgb(var(--muted))]
                              focus:outline-none 
                              focus:bg-[rgb(var(--bg))]
                              focus:border-[rgb(var(--accent))]
                              transition-all duration-200
                              resize-none
                            "
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        <div className="flex-1" onClick={onClose}>
                          <Animatedbutton
                            variant="ghost"
                            className="w-full justify-center"
                          >
                            Cancel
                          </Animatedbutton>
                        </div>
                        {/* FIX: onClick is applied to the Animatedbutton component, not the div wrapper.
                           This ensures 'disabled' prop prevents the click.
                        */}
                        <div className="flex-2">
                          <Animatedbutton
                            onClick={handleSubmit}
                            variant="primary"
                            className="w-full justify-center"
                            disabled={loading || !email || !message}
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Sending...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Send size={16} />
                                <span>Send Message</span>
                              </div>
                            )}
                          </Animatedbutton>
                        </div>
                      </div>

                      <p className="text-[10px] text-center text-[rgb(var(--muted))] pt-2">
                        By sending this message, you agree to our Terms of
                        Service.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
