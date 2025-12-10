"use client";

import { Logo } from "@/app/recodd/Logo";
import { ThemeToggle } from "@/app/recodd/ThemeToggle";
import { InspirationalHero } from "@/app/recodd/InspirationalHero";
import { MarketplaceSection } from "@/app/recodd/MarketplaceSection/MarketPlaceSection";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function RecoddApp() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121212] transition-colors duration-300">
      {/* NAVBAR - mobile first */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200/70 dark:border-zinc-800/80 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md">
        <div className="flex h-14 md:h-16 items-center justify-between px-4 md:px-10 lg:px-20">
          {/* logo: icon + name in navbar */}
          <Logo variant="navbar" />

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-600 dark:text-gray-300">
              <button className="hover:text-[#E53935] transition-colors">
                For freelancers
              </button>
              <button className="hover:text-[#E53935] transition-colors">
                For businesses
              </button>
              <button className="hover:text-[#E53935] transition-colors">
                How it works
              </button>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <InspirationalHero />
        <MarketplaceSection />
      </main>

      {/* FOOTER - mobile first */}
      <footer className="mt-8 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
        <div className="w-full px-4 md:px-10 lg:px-20 py-8 space-y-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center">
            {/* Footer logo uses full brand variant */}
            <div className="text-center md:text-left">
              <Logo variant="footer" />
              <p className="mt-3 text-xs text-gray-500">
                Connecting talent with opportunity. Commission-free, forever.
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              {[FaTwitter, FaLinkedin, FaInstagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-gray-400 hover:text-[#E53935] transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="text-center md:text-right text-xs">
              <p className="text-slate-900 dark:text-white font-medium">
                Contact us
              </p>
              <p className="text-gray-500">support@recodd.com</p>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200 dark:bg-zinc-800" />

          <p className="text-center text-[11px] text-gray-400">
            © 2025 Recodd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
