/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/app/recodd/Logo";
import { ThemeToggle } from "@/app/recodd/ThemeToggle";
import Animatedbutton from "@/app/components/Animatedbutton";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Mock authentication - Check localStorage for auth status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    // Check if user is authenticated (using localStorage for demo)
    const authStatus = localStorage.getItem("recodd_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setUser({
        name: localStorage.getItem("recodd_user_name") || "User",
        email: localStorage.getItem("recodd_user_email") || "user@recodd.com",
      });
    }
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Default to freelancers search - users can filter on the page
    router.push(`/freelancers?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex justify-center w-full bg-white/90 dark:bg-[rgb(var(--surface))]/90 backdrop-blur-md border-b border-[rgb(var(--border))]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* 1. Logo */}
        <div className="shrink-0">
          <Link href="/">
            <Logo variant="navbar" />
          </Link>
        </div>

        {/* 2. Primary Nav & Search (Desktop) */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <Link
            href="/freelancers"
            className="text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--accent))] transition-colors"
          >
            Freelancers
          </Link>
          <Link
            href="/businesses"
            className="text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--accent))] transition-colors"
          >
            Businesses
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative w-full max-w-[400px] lg:max-w-[600px] group"
          >
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] group-focus-within:text-[rgb(var(--accent))] transition-colors pointer-events-none"
              size={16}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for talent or projects..."
              className="
                  w-full pl-10 pr-4 py-2 
                  rounded-full 
                  bg-[rgb(var(--bg))] dark:bg-[rgb(var(--surface))]
                  border-2 border-transparent
                  focus:border-[rgb(var(--accent))]
                  focus:outline-none
                  text-sm text-[rgb(var(--text))]
                  placeholder:text-[rgb(var(--muted))]
                  transition-all duration-300
              "
            />
          </form>
        </div>

        {/* 3. CTA Cluster */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[rgb(var(--surface))] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[rgb(var(--accent))] flex items-center justify-center text-white font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <ChevronDown size={16} className="text-[rgb(var(--muted))]" />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-12 w-48 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-lg shadow-xl py-2 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))] transition-colors"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Profile Dashboard
                  </Link>
                  
                  <hr className="my-2 border-[rgb(var(--border))]" />
                  <button
                    onClick={() => {
                      localStorage.removeItem("recodd_auth");
                      localStorage.removeItem("recodd_user_name");
                      localStorage.removeItem("recodd_user_email");
                      setIsAuthenticated(false);
                      setUser(null);
                      setProfileMenuOpen(false);
                      router.push("/");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[rgb(var(--bg))] transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Animatedbutton variant="ghost" className="text-sm">
                  Sign In
                </Animatedbutton>
              </Link>
              <Link href="/signup">
                <Animatedbutton variant="primary" className="text-sm">
                  Post Project
                </Animatedbutton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 text-[rgb(var(--text))]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-20 left-0 right-0 bg-[rgb(var(--surface))] border-b border-[rgb(var(--border))] md:hidden overflow-hidden shadow-xl"
          >
            <div className="flex flex-col gap-4 p-6">
              <form onSubmit={handleSearch} className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] pointer-events-none"
                  size={16}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 p-3 rounded-lg bg-[rgb(var(--bg))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
                />
              </form>
              <Link
                href="/freelancers"
                className="font-medium text-lg text-[rgb(var(--text))]"
              >
                Freelancers
              </Link>
              <Link
                href="/businesses"
                className="font-medium text-lg text-[rgb(var(--text))]"
              >
                Businesses
              </Link>
              <Link
                href="/login"
                className="font-medium text-lg text-[rgb(var(--text))]"
              >
                Sign In
              </Link>
              <Link href="/post-project" className="w-full">
                <Animatedbutton
                  variant="primary"
                  className="w-full justify-center"
                >
                  Post Project
                </Animatedbutton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
