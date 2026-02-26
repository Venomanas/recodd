"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Briefcase, Heart, Eye } from "lucide-react";
import Link from "next/link";
import { getTopPosts } from "@/lib/recodd/galleryStore";
import { Post } from "@/lib/recodd/types";
import { LayoutContainer } from "@/app/components/LayoutContainer";

// Mini post card for the teaser
function MiniPostCard({ post, index }: { post: Post; index: number }) {
  const isHiring = post.type === "hiring_alert";
  const authorInitial = post.author?.name?.charAt(0)?.toUpperCase() || "?";

  const GRADIENTS = [
    "from-[#1a1a2e] to-[#0f3460]",
    "from-[#2d1b69] to-[#11264e]",
    "from-[#1a0a00] to-[#6b2a00]",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[rgb(var(--surface))] border border-[rgb(var(--border))] shadow-sm hover:shadow-xl hover:border-[rgb(var(--accent))]/30 transition-all duration-300"
    >
      {/* Image / Gradient Hero */}
      <div className="relative w-full h-44 overflow-hidden shrink-0">
        {post.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.images[0]}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className={`w-full h-full bg-linear-to-br ${GRADIENTS[index % GRADIENTS.length]}`}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm border ${
              isHiring
                ? "bg-amber-500/85 text-white border-amber-400/40"
                : "bg-[rgb(var(--accent))]/85 text-white border-[rgb(var(--accent))]/40"
            }`}
          >
            {isHiring ? <Briefcase size={9} /> : <Sparkles size={9} />}
            {isHiring ? "Hiring" : "Showcase"}
          </span>
        </div>

        {/* Avatar */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-linear-to-br from-[rgb(var(--accent))] to-[rgb(var(--gray))] flex items-center justify-center text-white font-bold text-sm border-2 border-white/30 shadow-md">
          {authorInitial}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[rgb(var(--muted))] truncate">
            {post.author?.name}
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-[rgb(var(--bg))] border border-[rgb(var(--border))] text-[rgb(var(--muted))]">
            {post.category}
          </span>
        </div>
        <h3 className="font-bold text-sm text-[rgb(var(--text))] line-clamp-2 leading-snug">
          {post.title}
        </h3>

        <div className="flex items-center gap-3 mt-1 text-xs text-[rgb(var(--muted))]">
          <span className="flex items-center gap-1">
            <Heart size={11} className="text-[rgb(var(--accent))]" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={11} />
            {post.views}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function GalleryTeaser() {
  const [topPosts, setTopPosts] = useState<Post[]>([]);

  useEffect(() => {
    setTopPosts(getTopPosts(3));
  }, []);

  return (
    <section className="py-24 bg-[rgb(var(--bg))] border-b border-[rgb(var(--border))]">
      <LayoutContainer>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] text-xs font-semibold border border-[rgb(var(--accent))]/20">
                <Sparkles size={11} />
                Community Gallery
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] mb-3">
              Top Community Posts
            </h2>
            <p className="text-[rgb(var(--muted))] max-w-md text-base">
              Discover standout portfolios and exciting job opportunities shared
              by the Recodd community.
            </p>
          </div>

          <Link href="/gallery">
            <motion.button
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgb(var(--border))] text-[rgb(var(--text))] text-sm font-semibold hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition-all shrink-0"
            >
              View All Posts
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Cards Grid */}
        {topPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPosts.map((post, i) => (
              <MiniPostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[rgb(var(--muted))]">
            Loading posts...
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/gallery">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold hover:opacity-90 transition shadow-lg shadow-[rgb(var(--accent))]/20"
            >
              <Sparkles size={16} />
              Explore Full Gallery
              <ArrowRight size={16} />
            </motion.button>
          </Link>
          <Link href="/signup">
            <span className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] transition-colors cursor-pointer">
              Not a member?{" "}
              <span className="font-semibold underline underline-offset-2">
                Join free
              </span>
            </span>
          </Link>
        </motion.div>
      </LayoutContainer>
    </section>
  );
}
