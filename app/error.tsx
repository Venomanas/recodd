"use client";

import { useEffect } from "react";
import Animatedbutton from "@/app/components/Animatedbutton";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[rgb(var(--bg))] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="w-20 h-20 mx-auto bg-red-50 dark:bg-red-900/10 rounded-3xl flex items-center justify-center border border-red-100 dark:border-red-900/20 mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        <h2 className="text-3xl font-bold text-[rgb(var(--text))] mb-3">
          Something went wrong
        </h2>
        <p className="text-[rgb(var(--muted))] mb-8">
          We encountered an unexpected error. Our team has been notified.
        </p>

        <Animatedbutton
          onClick={() => reset()}
          variant="primary"
          className="mx-auto w-full sm:w-auto justify-center"
        >
          <RefreshCw size={18} className="mr-2" />
          Try Again
        </Animatedbutton>
      </motion.div>
    </div>
  );
}
