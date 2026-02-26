"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Grid3X3,
  Briefcase,
  Sparkles,
  SlidersHorizontal,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { LayoutContainer } from "@/app/components/LayoutContainer";
import { PostCard } from "./PostCard";
import { CreatePostModal } from "./CreatePostModal";
import { getPosts } from "@/lib/recodd/galleryStore";
import { isAuthenticated, getCurrentUser } from "@/lib/recodd/auth";
import { Post } from "@/lib/recodd/types";

const FILTERS = [
  { key: "all", label: "All Posts", icon: Grid3X3 },
  { key: "work_showcase", label: "Showcases", icon: Sparkles },
  { key: "hiring_alert", label: "Hiring", icon: Briefcase },
];

const CATEGORIES = [
  "All",
  "Development",
  "Design",
  "UI/UX",
  "Marketing",
  "Data Science",
  "Mobile Apps",
  "Webflow",
  "Consulting",
];

export default function GalleryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<
    "all" | "work_showcase" | "hiring_alert"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
  } | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    setPosts(getPosts());
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);
    if (authStatus) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role || "freelancer",
        });
      }
    }
  }, []);

  const filteredPosts = posts.filter(post => {
    const typeMatch = filter === "all" || post.type === filter;
    const catMatch =
      categoryFilter === "All" || post.category === categoryFilter;
    return typeMatch && catMatch;
  });

  const handleCreateClick = () => {
    if (!isAuth) {
      setShowAuthPrompt(true);
      setTimeout(() => setShowAuthPrompt(false), 3000);
      return;
    }
    setIsModalOpen(true);
  };

  const handlePostCreated = useCallback((newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      <Navbar />

      {/* Hero */}
      <div className="pt-28 pb-12 bg-[rgb(var(--surface))] border-b border-[rgb(var(--border))]">
        <LayoutContainer>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] text-xs font-semibold border border-[rgb(var(--accent))]/20">
                  <Sparkles size={12} />
                  Community Gallery
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--text))] mb-3">
                Showcase & Discover
              </h1>
              <p className="text-lg text-[rgb(var(--muted))] max-w-xl">
                Explore portfolio work and job opportunities posted by the
                Recodd community.
              </p>
            </div>

            {/* Create Post CTA */}
            <motion.div
              className="shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={handleCreateClick}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold shadow-lg hover:opacity-90 transition-all"
              >
                <Plus size={20} />
                {isAuth
                  ? user?.role === "business"
                    ? "Post a Job"
                    : "Share Work"
                  : "Create Post"}
              </button>
            </motion.div>
          </div>

          {/* Auth Prompt Toast */}
          <AnimatePresence>
            {showAuthPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--accent))]/30 text-sm text-[rgb(var(--text))] max-w-md"
              >
                <Lock
                  size={16}
                  className="text-[rgb(var(--accent))] shrink-0"
                />
                <span>
                  <Link
                    href="/login"
                    className="font-semibold text-[rgb(var(--accent))] hover:underline"
                  >
                    Sign in
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-[rgb(var(--accent))] hover:underline"
                  >
                    create an account
                  </Link>{" "}
                  to post.
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutContainer>
      </div>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-[rgb(var(--surface))]/95 backdrop-blur-md border-b border-[rgb(var(--border))]">
        <LayoutContainer>
          <div className="flex flex-col sm:flex-row gap-3 py-4">
            {/* Type Filters */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))]">
              {FILTERS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as typeof filter)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filter === key
                      ? "bg-[rgb(var(--accent))] text-white shadow-sm"
                      : "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--surface))]"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
              <SlidersHorizontal
                size={15}
                className="text-[rgb(var(--muted))] shrink-0"
              />
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    categoryFilter === cat
                      ? "bg-[rgb(var(--text))] text-[rgb(var(--bg))]"
                      : "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] bg-[rgb(var(--bg))] border border-[rgb(var(--border))]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </LayoutContainer>
      </div>

      {/* Posts Grid */}
      <main className="py-10">
        <LayoutContainer>
          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-[rgb(var(--surface))] border border-[rgb(var(--border))] flex items-center justify-center mb-4">
                <Grid3X3 size={24} className="text-[rgb(var(--muted))]" />
              </div>
              <h3 className="text-xl font-bold text-[rgb(var(--text))] mb-2">
                No posts yet
              </h3>
              <p className="text-[rgb(var(--muted))] mb-6 max-w-sm">
                Be the first to share work or post a job in this category.
              </p>
              <button
                onClick={handleCreateClick}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-sm hover:opacity-90 transition"
              >
                <Plus size={16} />
                Create First Post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Stats Bar */}
          {filteredPosts.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[rgb(var(--border))] flex items-center justify-between text-sm text-[rgb(var(--muted))]">
              <span>{filteredPosts.length} posts</span>
              {!isAuth && (
                <span>
                  <Link
                    href="/signup"
                    className="text-[rgb(var(--accent))] hover:underline font-medium"
                  >
                    Join Recodd
                  </Link>{" "}
                  to create your own post
                </span>
              )}
            </div>
          )}
        </LayoutContainer>
      </main>

      {/* Create Post Modal */}
      {isAuth && user && (
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreated={handlePostCreated}
          user={user}
        />
      )}
    </div>
  );
}
