"use client";

import { Logo } from "@/app/recodd/Logo";
import { ThemeToggle } from "@/app/recodd/ThemeToggle";
import { InspirationalHero } from "@/app/recodd/InspirationalHero";
import { MarketplaceSection } from "@/app/recodd/MarketplaceSection/MarketPlaceSection";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { LayoutContainer } from "./components/LayoutContainer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RecoddApp() {
  return (
    <div
      className="
    min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-500
    "
    >
      {/* NAVBAR - Enhanced with backdrop blur */}
      <nav className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 backdrop-blur-xs">
        <div
          className="w-full max-w-[1600px]
      mx-auto
      bg-white/80 dark:bg-zinc-900/80
      backdrop-blur-xl
      border border-zinc-200/50 dark:border-zinc-800/50
      shadow-sm dark:shadow-black/20
      rounded-2xl
      px-4 sm:px-6 py-3
      flex items-center justify-between
      transition-all duration-300"
        >
          <Logo variant="navbar" />

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-full border border-zinc-200 dark:border-zinc-800">
              <Link
                href="/?type=freelancers#marketplace"
                className="px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-zinc-700 transition-all"
              >
                For Freelancers
              </Link>
              <Link
                href="/?type=business#marketplace"
                className="px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-zinc-700 transition-all"
              >
                For Businesses
              </Link>
              {/* additional things */}
              {/* <a
                href="#"
                className="hidden sm:block text-sm font-medium text-zinc-500 hover:text-[rgb(var(--accent))] transition-colors"
              >
                How it works
              </a> */}
            </div>
            <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 hidden sm:block"></div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <InspirationalHero />
        <MarketplaceSection />
      </main>

      {/* FOOTER - Modern design */}
      <footer
        className="
        w-full mt-auto
    bg-zinc-50 dark:bg-[rgb(var(--bg))] 
    border-t border-zinc-200 dark:border-zinc-800
      "
      >
        <LayoutContainer>
          <div className="w-full py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
              {/* Brand Column (Span 2) */}
              <motion.div className="lg:col-span-2 space-y-6">
                <Logo variant="footer" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
                  Connecting talent with opportunity directly.
                  <br />
                  No middlemen. No commissions. Just work.
                </p>
                <div className="flex gap-4 pt-2">
                  {[FaTwitter, FaLinkedin, FaInstagram, FaGithub].map(
                    (Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="
                  w-8 h-8 rounded-full
                  bg-zinc-200 dark:bg-zinc-800 
                  flex items-center justify-center
                  text-zinc-600 dark:text-zinc-400
                  hover:bg-[rgb(var(--accent))] hover:text-white
                  dark:hover:bg-[rgb(var(--accent))] dark:hover:text-white
                  transition-all duration-200
                "
                      >
                        <Icon size={14} />
                      </a>
                    )
                  )}
                </div>
              </motion.div>

              {/* Links Columns */}
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
                {
                  title: "Legal",
                  links: ["Terms", "Privacy", "Guidelines", "Licenses"],
                },
              ].map(column => (
                <div key={column.title}>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map(link => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-[rgb(var(--accent))] transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-zinc-400">
                © 2025 Recodd Inc. All rights reserved.
              </p>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-medium text-zinc-500">
                  All Systems Operational
                </span>
              </div>
            </div>
          </div>
        </LayoutContainer>
      </footer>
    </div>
  );
}
