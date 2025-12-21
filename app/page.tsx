"use client";

import { Logo } from "@/app/recodd/Logo";
import { ThemeToggle } from "@/app/recodd/ThemeToggle";
import { InspirationalHero } from "@/app/recodd/InspirationalHero";
import { MarketplaceSection } from "@/app/recodd/MarketplaceSection/MarketPlaceSection";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { LayoutContainer } from "./components/LayoutContainer";

export default function RecoddApp() {
  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] transition-colors duration-500">
      {/* NAVBAR - Enhanced with backdrop blur */}
      <nav
        className="
        sticky top-0 z-50 w-full
        border-b border-gray-200/70 dark:border-zinc-800/80
        bg-white/80 dark:bg-zinc-900/80
        backdrop-blur-xl
        shadow-sm
      "
      >
        <div className="flex h-16 items-center justify-between px-4 md:px-10 lg:px-20">
          <Logo variant="navbar" />

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a
                href="/marketplace?type=freelancer"
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                For Freelancers
              </a>
              <a
                href="/marketplace?type=business"
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                For Businesses
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                How it works
              </a>
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

      {/* FOOTER - Modern design */}
      <footer
        className="
        mt-12
        border-t border-gray-200 dark:border-zinc-800
        bg-gray-50 dark:bg-zinc-950
      "
      >
        <LayoutContainer>
          <div className="w-full px-4 md:px-10 lg:px-20 py-12">
            <div className="grid gap-12 md:grid-cols-3 items-center">
              {/* Footer logo */}
              <div className="text-center md:text-left">
                <Logo variant="footer" />
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Connecting talent with opportunity. Commission-free, forever.
                </p>
              </div>

              {/* Socials */}
              <div className="flex gap-4 justify-center">
                {[
                  { Icon: FaTwitter, href: "#" },
                  { Icon: FaLinkedin, href: "#" },
                  { Icon: FaInstagram, href: "#" },
                ].map(({ Icon, href }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    className="
                      w-11 h-11 rounded-full
                      bg-gray-200 dark:bg-zinc-800
                      flex items-center justify-center
                      text-gray-600 dark:text-gray-400
                      hover:bg-red-500 hover:text-white
                      dark:hover:bg-red-600
                      transition-all duration-300
                      hover:scale-110
                    "
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              {/* Contact */}
              <div className="text-center md:text-right">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  Contact us
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  support@recodd.com
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800 text-center">
              <p className="text-xs text-gray-500">
                © 2025 Recodd. All rights reserved.
              </p>
            </div>
          </div>
        </LayoutContainer>
      </footer>
    </div>
  );
}
