"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Recodd transformed how we hire. The quality of talent is unmatched, and the direct connection saves us weeks of negotiation.",
    name: "Sarah Jenkins",
    role: "CTO at TechFlow",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    metric: "Hired 12 developers",
    companyLogo: "TechFlow",
  },
  {
    quote:
      "Finally, a marketplace that treats freelancers with respect. No fees means I can offer better rates and keep more of what I earn.",
    name: "David Chen",
    role: "Senior Product Designer",
    image:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    metric: "Earned $150k+ in 2024",
    companyLogo: "Freelance",
  },
  {
    quote:
      "The interface is beautiful and intuitive. It's the only platform we trust for high-stakes enterprise projects.",
    name: "Emily Rodriguez",
    role: "VP of Engineering at CloudScale",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    metric: "Project success rate: 100%",
    companyLogo: "CloudScale",
  },
];

export const SocialProofSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[rgb(var(--surface))] border-b border-[rgb(var(--border))]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-10 flex justify-center text-[rgb(var(--accent))]">
          <Quote size={48} className="opacity-20" />
        </div>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <blockquote className="text-2xl md:text-3xl font-medium text-[rgb(var(--text))] leading-relaxed mb-8">
                &quot;{testimonials[current].quote}&quot;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-md">
                  <Image
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-bold text-[rgb(var(--text))]">
                    {testimonials[current].name}
                  </div>
                  <div className="text-sm text-[rgb(var(--muted))]">
                    {testimonials[current].role}
                  </div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-[rgb(var(--border))] mx-4" />
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--muted))]">
                    Impact
                  </div>
                  <div className="font-semibold text-[rgb(var(--accent))]">
                    {testimonials[current].metric}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${current === i ? "bg-[rgb(var(--accent))] w-6" : "bg-[rgb(var(--border))]"}
              `}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
