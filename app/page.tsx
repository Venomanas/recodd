"use client";

import { Logo } from "@/app/recodd/Logo";
import { ThemeToggle } from "@/app/recodd/ThemeToggle";
import { InspirationalHero } from "@/app/recodd/InspirationalHero";
import { MarketplaceSection } from "@/app/recodd/MarketplaceSection/MarketPlaceSection";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";
import { LayoutContainer } from "./components/LayoutContainer";

export default function RecoddApp() {
  return (
    <div
      className="
    min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-500
    "
    >
      {/* NAVBAR - Enhanced with backdrop blur */}
      <nav
        className="
        sticky top-0 z-50 w-full
        border-b border-gray-200/70 dark:border-zinc-800
        bg-white/95 dark:bg-zinc-900/95
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
                className="text-gray-700 dark:text-gray-300 hover:text-[#EF4444] dark:hover:text-[#EF4444]transition-colors"
              >
                For Freelancers
              </a>
              <a
                href="/marketplace?type=business"
                className="text-gray-700 dark:text-gray-300 hover:text-[#EF4444] dark:hover:text-[#EF4444] transition-colors"
              >
                For Businesses
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-[#EF4444] dark:hover:text-[#EF4444] transition-colors"
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
        w-full
        mt-auto
        border-t border-gray-200 dark:border-zinc-800
        bg-gray-50 dark:bg-zinc-950
      "
      >
        <LayoutContainer>
          <div className="w-full px-4 md:px-10 lg:px-17 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Footer logo */}
              <div className="text-center md:text-left mb-4 ">
                <Logo variant="footer" />

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Connecting talent with opportunity. Commission-free, forever.
                </p>
              </div>

              {/* Socials */}
              <div className="flex gap-3 justify-center">
                {[
                  { Icon: FaTwitter, href: "#", label: "Twitter" },
                  { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
                  { Icon: FaInstagram, href: "#", label: "Instagram" },
                  { Icon: FaGithub, href: "#", label: "GitHub" },
                ].map(({ Icon, href }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    className="
                      group
                      w-10 h-10 rounded-full
                      bg-gray-200 dark:bg-zinc-800
                      flex items-center justify-center
                      text-gray-600 dark:text-gray-400
                      hover:bg-[#EF4444] hover:text-white
                        dark:hover:bg-[#EF4444]
                        transition-all duration-300
                        hover:scale-110 hover:-translate-y-1
                        shadow-sm hover:shadow-md
                    "
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                  For Freelancers
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      label: "Find Work",
                      href: "/marketplace?type=freelancer",
                    },
                    { label: "How it Works", href: "#" },
                    { label: "Success Stories", href: "#" },
                    { label: "Resources", href: "#" },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#EF4444] dark:hover:text-[#EF4444] transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Businesses */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                  For Businesses
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      label: "Post a Project",
                      href: "/marketplace?type=business",
                    },
                    { label: "Find Talent", href: "#" },
                    { label: "Pricing", href: "#" },
                    { label: "Enterprise", href: "#" },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#EF4444] dark:hover:text-[#EF4444] transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                  Contact Us
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="mailto:support@recodd.com"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#EF4444] dark:hover:text-[#EF4444] transition-colors group"
                    >
                      <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>support@recodd.com</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+1234567890"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#EF4444] dark:hover:text-[#EF4444] transition-colors group"
                    >
                      <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>+91 (234) 567-890</span>
                    </a>
                  </li>
                  <li>
                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">
                        Seawoods <br />
                        Navi Mumbai
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="
            border-t border-gray-200 dark:border-zinc-800
            py-6
          "
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
                © 2025 Recodd. All rights reserved.
              </p>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center sm:justify-end gap-6">
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Cookie Policy", href: "#" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#EF4444] dark:hover:text-[#EF4444] transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </LayoutContainer>
      </footer>
    </div>
  );
}
