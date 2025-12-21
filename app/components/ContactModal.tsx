"use client";

import { useState } from "react";
import Animatedbutton from "@/app/components/Animatedbutton";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle } from "lucide-react";

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
    setLoading(true);
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
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
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
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="
            w-full max-w-md
            rounded-3xl
            bg-white dark:bg-zinc-900
            border border-gray-200 dark:border-zinc-800
            shadow-2xl
            overflow-hidden
          "
        >
          {/* Header */}
          <div className="relative p-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {success ? "Message Sent!" : "Get in Touch"}
              </h3>
              <button
                onClick={onClose}
                className="
                  w-8 h-8 rounded-full
                  flex items-center justify-center
                  hover:bg-gray-100 dark:hover:bg-zinc-800
                  transition-colors
                "
              >
                <X size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Your message has been sent successfully. The recipient will
                  get back to you soon.
                </p>
                <Animatedbutton
                  onClick={onClose}
                  variant="primary"
                  className="w-full"
                >
                  Close
                </Animatedbutton>
              </motion.div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="
                      w-full px-4 py-3 rounded-xl
                      border border-gray-300 dark:border-zinc-700
                      bg-white dark:bg-zinc-800
                      text-gray-900 dark:text-white
                      placeholder:text-gray-400
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                      transition-all
                    "
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Write your message here..."
                    className="
                      w-full px-4 py-3 rounded-xl
                      border border-gray-300 dark:border-zinc-700
                      bg-white dark:bg-zinc-800
                      text-gray-900 dark:text-white
                      placeholder:text-gray-400
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                      transition-all
                      min-h-[140px]
                      resize-none
                    "
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Animatedbutton
                    onClick={handleSubmit}
                    variant="primary"
                    className="flex-1"
                    disabled={loading || !email || !message}
                  >
                    <Send size={16} />
                    {loading ? "Sending..." : "Send Message"}
                  </Animatedbutton>
                  <Animatedbutton
                    onClick={onClose}
                    variant="ghost"
                    className="flex-1"
                  >
                    Cancel
                  </Animatedbutton>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
