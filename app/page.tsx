"use client";

import { Logo } from "@/app/recodd/Logo";
import { ThemeToggle } from "@/app/recodd/ThemeToggle";
import { InspirationalHero } from "@/app/recodd/InspirationalHero";
import { MarketplaceSection } from "@/app/recodd/MarketplaceSection/MarketPlaceSection";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { LayoutContainer } from "./components/LayoutContainer";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Import icons
import { useState } from "react";

export default function RecoddApp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="
    min-h-screen flex flex-col transition-colors duration-500 overflow-x-hidden
    "
    >
      {/* NAVBAR - Enhanced with premium glassmorphism */}
      <nav className="absolute top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-6 w-full">
        <div
          className="w-full max-w-[1600px]
      mx-auto
      bg-white/70 dark:bg-zinc-900/60
      backdrop-blur-xl
      border border-[rgba(228,228,231,0.5)] dark:border-[rgba(39,39,42,0.5)]
      shadow-sm dark:shadow-black/20
      rounded-2xl
      px-4 sm:px-6 py-3
      flex flex-col
      transition-all duration-300
      hover:bg-white/90 dark:hover:bg-zinc-900/80
      hover:shadow-md dark:hover:shadow-black/30"
        >
          <div className="flex items-center justify-between w-full">
            <Logo variant="navbar" />

            <div className="flex items-center gap-4 sm:gap-6">
              {/* DESKTOP NAV */}
              <div className="hidden md:flex items-center gap-1 text-sm font-medium bg-zinc-100/50 dark:bg-zinc-800/50 p-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
                <Link
                  href="/?type=freelancers#marketplace"
                  className="px-5 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-zinc-700 hover:shadow-sm transition-all duration-200"
                >
                  For Freelancers
                </Link>
                <Link
                  href="/?type=business#marketplace"
                  className="px-5 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-zinc-700 hover:shadow-sm transition-all duration-200"
                >
                  For Businesses
                </Link>
              </div>

              <div className="hidden sm:block w-px h-6 bg-zinc-200 dark:bg-zinc-800"></div>
              <ThemeToggle />

              {/* MOBILE HAMBURGER */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU DROPDOWN */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden md:hidden border-t border-zinc-100/10 dark:border-zinc-800/50"
              >
                <div className="flex flex-col gap-2 pt-2 pb-2">
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/?type=freelancers#marketplace"
                    className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    For Freelancers
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/?type=business#marketplace"
                    className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    For Businesses
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <InspirationalHero />
        <MarketplaceSection />
      </main>

      {/* FOOTER - Modern design with polished typography */}
      <footer
        className="
        w-full mt-auto
    bg-zinc-50/50 dark:bg-[#0c0c0e] 
    border-t border-zinc-200 dark:border-zinc-800
    backdrop-blur-sm
      "
      >
        <LayoutContainer>
          <div className="w-full py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 ">
              {/* Brand Column (Span 2) */}
              <motion.div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <Logo variant="footer" />
                  <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
                    Connecting top-tier talent with ambitious businesses.
                    <br />
                    Directly. Efficiently. Transparently.
                  </p>
                </div>

                <div className="flex gap-3">
                  {[FaTwitter, FaLinkedin, FaInstagram, FaGithub].map(
                    (Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="
                  w-10 h-10 rounded-xl
                  bg-zinc-100 dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  flex items-center justify-center
                  text-zinc-500 dark:text-zinc-400
                  hover:bg-[rgb(var(--accent))] hover:text-white hover:border-[rgb(var(--accent))]
                  dark:hover:bg-[rgb(var(--accent))] dark:hover:text-white dark:hover:border-[rgb(var(--accent))]
                  transition-all duration-200
                  hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgb(var(--accent))]/20
                "
                      >
                        <Icon size={16} />
                      </a>
                    ),
                  )}
                </div>
              </motion.div>

              <div className="hidden lg:block lg:col-span-1" />

              {/* Links Columns */}
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-10">
                {[
                  {
                    title: "Platform",
                    links: [
                      "Browse Talent",
                      "Browse Projects",
                      "How it Works",
                      "Pricing",
                    ],
                  },
                  {
                    title: "Company",
                    links: ["About Us", "Careers", "Blog", "Contact"],
                  },
                ].map(column => (
                  <div key={column.title}>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-200 tracking-tight mb-6">
                      {column.title}
                    </h3>
                    <ul className="space-y-4">
                      {column.links.map(link => (
                        <li key={link}>
                          <a
                            href="#"
                            className="text-sm
                        text-zinc-500 dark:text-zinc-400 
                        hover:text-[rgb(var(--accent))] dark:hover:text-[rgb(var(--accent))] 
                        transition-colors"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-20 pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col sm:flex-row justify-between items-center gap-6">
              <p className="text-sm text-zinc-400 dark:text-zinc-600 font-medium">
                © 2025 Recodd Inc. All rights reserved.
              </p>
              <div className="flex gap-2 items-center px-4 py-1.5 rounded-full bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  Systems Operational
                </span>
              </div>
            </div>
          </div>
        </LayoutContainer>
      </footer>
    </div>
  );
}
