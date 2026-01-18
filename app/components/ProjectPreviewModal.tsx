"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, DollarSign, Tag } from "lucide-react";

interface ProjectPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    budget: string;
    tags: string[];
    description?: string;
  } | null;
}

export const ProjectPreviewModal = ({
  isOpen,
  onClose,
  project,
}: ProjectPreviewModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              className="
              pointer-events-auto
              w-full max-w-lg
              bg-white dark:bg-zinc-900 
              rounded-3xl 
              shadow-2xl shadow-black/20
              border border-zinc-200 dark:border-zinc-800
              overflow-hidden
            "
            >
              {/* Header */}
              <div className="relative h-32 bg-linear-to-br from-rose-500/10 to-orange-500/10 flex items-center justify-center">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-black transition-colors"
                  >
                    <X size={18} className="text-zinc-600 dark:text-zinc-400" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white text-center px-8">
                  {project.title}
                </h2>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
                      <DollarSign size={14} />
                      Budget
                    </div>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">
                      {project.budget}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
                      <Calendar size={14} />
                      Duration
                    </div>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">
                      Est. 2-3 months
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                    About the project
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    This is a placeholder description for the project. In a real
                    application, this would contain detailed requirements,
                    deliverables, and expectations for the freelancer.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                    Skills Required
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 rounded-xl font-medium text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                  >
                    Close preview
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-rose-600 text-white shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-colors flex items-center justify-center gap-2">
                    Apply to Project
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
