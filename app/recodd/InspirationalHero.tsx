"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Aperture } from "lucide-react";
import Link from "next/link";
import { ProjectPreviewModal } from "@/app/components/ProjectPreviewModal";

const rotating = [
  "Connect with top talent.",
  "Make your online presence.",
  "Build your dream project.",
  "Work without commissions.",
];

export const InspirationalHero = () => {
  const [index, setIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    budget: string;
    tags: string[];
  } | null>(null);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex(prev => (prev + 1) % rotating.length),
      2800,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        border-b border-[rgb(var(--border))]
        bg-[rgb(var(--bg))]
      "
    >
      {/* NEW BACKGROUND: "Trust Grid" 
        Replaces the old animated blobs with a technical, structured grid.
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgb(var(--text)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--text)) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Fade overlay to blend grid into the bottom of the section */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[rgb(var(--bg))]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-12 py-16 sm:py-20 md:py-32 pt-32 sm:pt-40 md:pt-48">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-16 lg:gap-20 items-center max-w-[1600px] mx-auto">
          {/* LEFT: Heading + CTAs */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12 max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Animated heading - Increased height for multiline on mobile */}
            <div className="h-24 sm:h-28 md:h-32 lg:h-32 flex items-center justify-center lg:justify-start overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[rgb(var(--text))] leading-none tracking-tight"
                >
                  {rotating[index]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Badge - centered on mobile */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[rgb(var(--accent))] bg-red-50 dark:bg-red-500/10 rounded-full border border-red-200 dark:border-red-500/20">
                <Aperture
                  size={14}
                  className="animate-spin sm:w-4 sm:h-4"
                  style={{ animationDuration: "8s" }}
                />
                <span className="hidden xs:inline">
                  Commission-free collaborations
                </span>
                <span className="xs:hidden">Commission-free</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-[rgb(var(--muted))] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Recodd connects freelancers and organizations without middlemen,
              fees, or friction. You keep what you earn. They get work that
              actually gets done.
            </p>

            {/* CTAs */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/dashboard/freelancer" className="w-full sm:w-auto">
                  <Animatedbutton
                    variant="primary"
                    className="w-full sm:w-auto justify-center px-8 py-4 text-base font-semibold"
                  >
                    Get started as Freelancer
                  </Animatedbutton>
                </Link>
                <Animatedbutton
                  variant="secondary"
                  className="w-full sm:w-auto justify-center px-8 py-4 text-base font-semibold"
                >
                  Post a project
                </Animatedbutton>
              </div>

              <p className="text-xs sm:text-sm text-[rgb(var(--muted))] pt-2 font-medium">
                No platform fees · You negotiate directly · Built for long-term
                work
              </p>
            </div>
          </div>

          {/* RIGHT: Stats card (Refined "Nested Surface" Look) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              rounded-[2.5rem]
              bg-[rgb(var(--surface))] 
              p-2 
              shadow-2xl shadow-black/10 dark:shadow-black/50
              w-full max-w-xl mx-auto lg:max-w-none
            "
          >
            <div
              className="
                rounded-full
                border border-[rgb(var(--border))] 
                bg-[rgb(var(--bg))] 
                p-8 sm:p-12
              "
            >
              <div className="flex justify-between items-end mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[rgb(var(--muted))] text-center sm:text-left">
                  Project Showcase
                </p>
                <Link
                  href="/projects"
                  className="hidden sm:block text-xs font-medium text-[rgb(var(--accent))] hover:underline"
                >
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: "Fintech Dashboard",
                    budget: "$5k - $10k",
                    tags: ["React", "Node.js"],
                    gradient: "from-blue-500/10 to-cyan-500/10",
                    border: "group-hover:border-blue-500/30",
                  },
                  {
                    title: "AI Image Generator",
                    budget: "$12k Fixed",
                    tags: ["Python", "ML", "Vue"],
                    gradient: "from-purple-500/10 to-pink-500/10",
                    border: "group-hover:border-purple-500/30",
                  },
                  {
                    title: "Eco-Brand Identity",
                    budget: "$3k - $5k",
                    tags: ["Branding", "Design"],
                    gradient: "from-emerald-500/10 to-teal-500/10",
                    border: "group-hover:border-emerald-500/30",
                  },
                ].map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`
                      relative
                      rounded-2xl
                      bg-[rgb(var(--surface))]
                      border border-[rgb(var(--border))]
                      ${project.border}
                      p-4
                      flex items-center justify-between
                      group
                      cursor-pointer
                      transition-all duration-300
                    `}
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl bg-linear-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    <div className="relative flex-1">
                      <h3 className="text-sm font-bold text-[rgb(var(--text))] leading-tight mb-1">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] text-[rgb(var(--muted))] bg-[rgb(var(--bg))] px-1.5 py-0.5 rounded-sm border border-[rgb(var(--border))]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative text-right">
                      <span className="block text-xs font-bold text-[rgb(var(--text))]">
                        {project.budget}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/projects"
                className="sm:hidden mt-6 block text-center text-xs font-medium text-[rgb(var(--accent))]"
              >
                View all projects →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
