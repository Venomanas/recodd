"use client";

import Logo from "@/app/recodd/Logo";
import { Navbar } from "@/app/components/Navbar";

import { InspirationalHero } from "@/app/recodd/InspirationalHero";

import { CategorySection } from "@/app/recodd/CategorySection";
import { MarketplaceSection } from "@/app/recodd/MarketplaceSection/MarketPlaceSection";
import { SocialProofSection } from "@/app/recodd/SocialProofSection";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { LayoutContainer } from "./components/LayoutContainer";

import { motion } from "framer-motion";

export default function RecoddApp() {
  // Remove unused states
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [scrolled, setScrolled] = useState(false);

  // Remove unused useEffect
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 20);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Also remove unused imports if you want to clean further:
  // import { useState, useEffect } from "react"; -> change to just import { motion } from "framer-motion";

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 overflow-x-hidden bg-[rgb(var(--bg))]">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <InspirationalHero />
        {/* TrustBar Removed - Feedback Step 13 */}
        {/* Remove or comment out unused component */}
        {/* <TrustBar /> */}
        <CategorySection />

        {/* Marketplace Section covers "Featured Profiles" */}
        <div id="marketplace">
          <MarketplaceSection />
        </div>

        <SocialProofSection />
      </main>

      {/* FOOTER */}
      <footer className="w-full py-16 bg-[rgb(var(--bg))] border-t border-[rgb(var(--border))]">
        <LayoutContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-6">
              <Logo />
              <p className="max-w-xs text-sm text-[rgb(var(--muted))] leading-relaxed">
                Recodd is the leading professional marketplace for direct talent
                connection. Reliable, fast, and fee-free.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: FaTwitter, href: "#", label: "Twitter" },
                  {
                    Icon: FaLinkedin,
                    href: "https://www.linkedin.com/in/recodd-agency-a95254353",
                    label: "LinkedIn",
                  },
                  {
                    Icon: FaInstagram,
                    href: "https://www.instagram.com/recodd.agency",
                    label: "Instagram",
                  },
                  { Icon: FaGithub, href: "#", label: "GitHub" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={
                      social.href !== "#" ? "noopener noreferrer" : undefined
                    }
                    aria-label={social.label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-[rgb(var(--surface))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--muted))] hover:bg-[rgb(var(--accent))] hover:text-white transition-colors cursor-pointer"
                  >
                    <social.Icon size={14} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-1" />
            <div className="lg:col-span-2 grid grid-cols-2 gap-10">
              <div>
                <h4 className="font-bold text-[rgb(var(--text))] mb-4">
                  Platform
                </h4>
                <ul className="space-y-3 text-sm text-[rgb(var(--muted))]">
                  <li>
                    <a href="#" className="hover:text-[rgb(var(--accent))]">
                      Browse Talent
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[rgb(var(--accent))]">
                      Browse Work
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[rgb(var(--accent))]">
                      Enterprise
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[rgb(var(--text))] mb-4">
                  Support
                </h4>
                <ul className="space-y-3 text-sm text-[rgb(var(--muted))]">
                  <li>
                    <a href="#" className="hover:text-[rgb(var(--accent))]">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[rgb(var(--accent))]">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[rgb(var(--accent))]">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-[rgb(var(--border))] flex flex-col sm:flex-row justify-between items-center text-xs text-[rgb(var(--muted))]">
            <p>© 2026 Recodd Inc. All rights reserved.</p>
          </div>
        </LayoutContainer>
      </footer>
    </div>
  );
}
