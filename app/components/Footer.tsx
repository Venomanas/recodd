"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/app/recodd/Logo";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { LayoutContainer } from "./LayoutContainer";
import { Mail, ArrowUpRight } from "lucide-react";

const SOCIALS = [
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
];

const FOOTER_LINKS = {
  Platform: [
    { label: "Find Talent", href: "/freelancers" },
    { label: "Find Work", href: "/businesses" },
    { label: "Gallery", href: "/gallery" },
    { label: "Enterprise", href: "#" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full bg-[rgb(var(--surface))] border-t border-[rgb(var(--border))]">
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-linear-to-r from-transparent via-[rgb(var(--accent))]/40 to-transparent" />

      <LayoutContainer>
        {/* Main Grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-12 xl:gap-8">
          {/* Brand Column */}
          <div className="xl:col-span-2 flex flex-col gap-5">
            <Logo />
            <p className="text-sm text-[rgb(var(--muted))] leading-relaxed max-w-xs">
              The professional marketplace for direct talent connection. No
              middlemen, no platform fees — just real work, real people.
            </p>

            {/* Contact Email */}
            <a
              href="mailto:hello@recodd.agency"
              className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] transition-colors group w-fit"
            >
              <Mail
                size={14}
                className="group-hover:text-[rgb(var(--accent))] transition-colors"
              />
              hello@recodd.agency
            </a>

            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--muted))] hover:bg-[rgb(var(--accent))] hover:text-white hover:border-[rgb(var(--accent))] transition-all cursor-pointer shadow-sm"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden xl:block xl:col-span-1" />

          {/* Link Columns */}
          <div className="xl:col-span-2 grid grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h4 className="font-bold text-[rgb(var(--text))] mb-4 text-sm tracking-wide">
                  {section}
                </h4>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="group inline-flex items-center gap-1 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] transition-colors"
                      >
                        {label}
                        {href.startsWith("http") && (
                          <ArrowUpRight
                            size={11}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[rgb(var(--border))] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[rgb(var(--muted))]">
          <div className="flex items-center gap-2">
            <span>© 2026 Recodd Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              Built with{" "}
              <span className="text-[rgb(var(--accent))] text-base leading-none">
                ♥
              </span>{" "}
              in India 🇮🇳
            </span>
            <span className="hidden sm:block w-px h-3 bg-[rgb(var(--border))]" />
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </LayoutContainer>
    </footer>
  );
}
