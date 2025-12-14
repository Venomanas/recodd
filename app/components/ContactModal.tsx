"use client";

import { useState } from "react";
import Animatedbutton from "@/app/components/Animatedbutton";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-6 space-y-4">
        {success ? (
          <>
            <h3 className="text-lg font-semibold">Message sent</h3>
            <p className="text-sm text-gray-500">
              The recipient will get back to you soon.
            </p>
            <Animatedbutton onClick={onClose} className="w-full">
              Close
            </Animatedbutton>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold">Contact</h3>

            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <textarea
              placeholder="Write your message..."
              className="w-full rounded-lg border px-3 py-2 text-sm min-h-[120px]"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />

            <div className="flex gap-2">
              <Animatedbutton
                onClick={handleSubmit}
                className="flex-1 bg-[#E53935] text-white"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </Animatedbutton>

              <Animatedbutton onClick={onClose} className="flex-1 border">
                Cancel
              </Animatedbutton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
