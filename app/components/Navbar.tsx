/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/app/recodd/Logo";
import { ThemeToggle } from "@/app/recodd/ThemeToggle";
import Animatedbutton from "@/app/components/Animatedbutton";
import {
  isAuthenticated,
  getCurrentUser,
  clearAuthData,
  getDashboardRoute,
} from "@/lib/recodd/auth";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Authentication state
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string | null;
  } | null>(null);

  useEffect(() => {
    // Update auth state
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);

    if (authStatus) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser({
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
        });
      }
    }
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/freelancers?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    clearAuthData();
    setIsAuth(false);
    setUser(null);
    setProfileMenuOpen(false);
    router.push("/");
  };

  const handleDashboardClick = () => {
    if (user?.role) {
      const dashboardRoute = getDashboardRoute(
        user.role as "freelancer" | "business" | "admin",
      );
      router.push(dashboardRoute);
    }
    setProfileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex justify-center w-full bg-[rgb(var(--surface))]/95 backdrop-blur-md border-b border-[rgb(var(--border))] shadow-sm">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="shrink-0">
          <Link href="/">
            <Logo size={36} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          <Link
            href="/freelancers"
            className="text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--accent))] transition-colors"
          >
            Find Talent
          </Link>
          <Link
            href="/businesses"
            className="text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--accent))] transition-colors"
          >
            Find Work
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative w-full max-w-[400px] lg:max-w-[500px] group"
          >
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] group-focus-within:text-[rgb(var(--accent))] transition-colors pointer-events-none"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for talent or projects..."
              className="
                  w-full pl-12 pr-4 py-2.5
                  rounded-full
                  bg-[rgb(var(--bg))]
                  border border-[rgb(var(--border))]
                  focus:border-[rgb(var(--accent))]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[rgb(var(--accent))]/20
                  text-sm text-[rgb(var(--text))]
                  placeholder:text-[rgb(var(--muted))]
                  transition-all duration-300
              "
            />
          </form>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          {isAuth && user ? (
            <>
              {/* Create Post Button for Freelancers & Businesses */}
              {(user.role === "freelancer" || user.role === "business") && (
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[rgb(var(--accent))] border border-[rgb(var(--accent))] rounded-lg hover:bg-[rgb(var(--accent))] hover:text-white transition-all">
                  <Plus size={18} />
                  <span>Create Post</span>
                </button>
              )}

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[rgb(var(--bg))] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-[rgb(var(--accent))] to-[rgb(var(--gray))] flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={16} className="text-[rgb(var(--muted))]" />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl shadow-(--shadow-lg) py-2 z-50">
                    <div className="px-4 py-3 border-b border-[rgb(var(--border))]">
                      <p className="text-sm font-semibold text-[rgb(var(--text))]">
                        {user.name}
                      </p>
                      <p className="text-xs text-[rgb(var(--muted))] truncate">
                        {user.email}
                      </p>
                      {user.role && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] rounded-full capitalize">
                          {user.role}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleDashboardClick}
                      className="w-full text-left px-4 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))] transition-colors"
                    >
                      Dashboard
                    </button>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))] transition-colors"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      View Profile
                    </Link>

                    <hr className="my-1 border-[rgb(var(--border))]" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-[rgb(var(--error))] hover:bg-[rgb(var(--bg))] transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Animatedbutton variant="ghost" className="text-sm">
                  Sign In
                </Animatedbutton>
              </Link>
              <Link href="/signup">
                <Animatedbutton variant="primary" className="text-sm">
                  Get Started
                </Animatedbutton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
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
              {/* Mobile Search */}
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
                  className="w-full pl-10 p-3 rounded-lg bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
                />
              </form>

              {/* Mobile Nav Links */}
              <Link
                href="/freelancers"
                className="font-medium text-lg text-[rgb(var(--text))]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Talent
              </Link>
              <Link
                href="/businesses"
                className="font-medium text-lg text-[rgb(var(--text))]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Work
              </Link>

              {isAuth && user ? (
                <>
                  <hr className="border-[rgb(var(--border))]" />
                  <button
                    onClick={() => {
                      handleDashboardClick();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left font-medium text-lg text-[rgb(var(--text))]"
                  >
                    Dashboard
                  </button>
                  <Link
                    href="/profile"
                    className="font-medium text-lg text-[rgb(var(--text))]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left font-medium text-lg text-[rgb(var(--error))]"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-medium text-lg text-[rgb(var(--text))]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link href="/signup" className="w-full">
                    <Animatedbutton
                      variant="primary"
                      className="w-full justify-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Animatedbutton>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
