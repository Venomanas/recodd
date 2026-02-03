"use client";

import { motion } from "framer-motion";
import Animatedbutton from "@/app/components/Animatedbutton";
import Link from "next/link";
import Image from "next/image";

export const InspirationalHero = () => {
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
      {/* Background Pattern: Subtle Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgb(var(--text)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--text)) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[rgb(var(--bg))]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-12 py-16 sm:py-20 md:py-24 pt-32 sm:pt-40 md:pt-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1600px] mx-auto">
          {/* LEFT: Heading + CTAs */}
          <div className="space-y-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[rgb(var(--text))] leading-tight tracking-tight"
            >
              Hire the world’s best professional talent.
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-lg md:text-xl text-[rgb(var(--muted))] leading-relaxed"
            >
              Recodd connects you with top-tier freelancers and businesses
              directly. No middlemen, no hidden fees, <span className="font-bold text-[rgb(var(--accent))]">Commission free platform</span>, just professional work.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <Link href="/freelancers" className="w-full sm:w-auto">
                <Animatedbutton
                  variant="primary"
                  className="w-full sm:w-auto justify-center px-8 h-12 text-base font-semibold"
                >
                  Hire Talent
                </Animatedbutton>
              </Link>
              <Link href="/businesses" className="w-full sm:w-auto">
                <Animatedbutton
                  variant="secondary"
                  className="w-full sm:w-auto justify-center px-8 h-12 text-base font-semibold"
                >
                  Find Work
                </Animatedbutton>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-[rgb(var(--muted))] pt-2 font-medium"
            >
              Trusted by leading companies worldwide.
            </motion.p>
          </div>

          {/* RIGHT: Professional Photography */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/50"
          >
            {/* Placeholder for professional photography */}
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Professionals collaborating"
              className="object-cover"
              fill
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,..." // In real app, generate base64
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
