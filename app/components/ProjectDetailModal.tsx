import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const STATUS_COLOR = {
  urgent: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  "in-progress":
    "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  completed:
    "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
};

export interface ProjectDetail {
  id: number;
  client: string;
  clientId?: string;
  task: string;
  dueDate: string;
  status: string;
  budget: string;
  description?: string;
  type?: string;
}

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetail | null;
}

export function ProjectDetailModal({
  isOpen,
  onClose,
  project,
}: ProjectDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100"
          />
          <div className="fixed inset-0 z-101 flex items-center justify-center p-4 py-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto max-h-full"
            >
              <div className="flex items-center justify-between p-6 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[rgb(var(--accent))] to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
                    {project.client.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[rgb(var(--text))] text-lg md:text-xl">
                      {project.client}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full inline-block mt-1 ${
                        STATUS_COLOR[
                          project.status as keyof typeof STATUS_COLOR
                        ] || STATUS_COLOR["in-progress"]
                      }`}
                    >
                      {project.status.replace("-", " ")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))] rounded-full transition-colors self-start"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))] mb-2">
                    Project Task
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold text-[rgb(var(--text))]">
                    {project.task}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[rgb(var(--surface))] rounded-xl p-4 border border-[rgb(var(--border))]">
                    <p className="text-xs text-[rgb(var(--muted))] mb-1 font-semibold uppercase tracking-wider">
                      Budget
                    </p>
                    <p className="text-lg md:text-xl font-bold text-[rgb(var(--text))]">
                      {project.budget}
                    </p>
                  </div>
                  <div className="bg-[rgb(var(--surface))] rounded-xl p-4 border border-[rgb(var(--border))]">
                    <p className="text-xs text-[rgb(var(--muted))] mb-1 font-semibold uppercase tracking-wider">
                      Deadline
                    </p>
                    <p className="text-lg md:text-xl font-bold text-[rgb(var(--text))]">
                      {project.dueDate}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted))] mb-2">
                    Project Description
                  </p>
                  <p className="text-[rgb(var(--text))] leading-relaxed text-sm md:text-base">
                    {project.description ||
                      "No detailed description provided for this task."}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-[rgb(var(--border))] bg-[rgb(var(--surface))] space-y-3">
                <Link
                  href={`/businesses`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[rgb(var(--text))] text-[rgb(var(--bg))] rounded-xl font-bold hover:opacity-90 transition-opacity text-base shadow-md"
                >
                  <ExternalLink size={18} />
                  Visit Client Profile
                </Link>
                <button
                  onClick={onClose}
                  className="w-full py-3 font-semibold text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))] rounded-xl transition-colors border border-transparent hover:border-[rgb(var(--border))]"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
