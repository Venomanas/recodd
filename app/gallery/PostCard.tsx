"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Eye,
  Briefcase,
  Sparkles,
  MapPin,
  DollarSign,
} from "lucide-react";
import { Post } from "@/lib/recodd/types";
import { toggleLike, isPostLiked } from "@/lib/recodd/galleryStore";

interface PostCardProps {
  post: Post;
  onLike?: (postId: string, newCount: number) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Development: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Design: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "UI/UX": "bg-pink-500/15 text-pink-400 border-pink-500/30",
  Marketing: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  "Data Science": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  "Mobile Apps": "bg-green-500/15 text-green-400 border-green-500/30",
  Consulting: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Webflow: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
};

// Gradient backgrounds when no image
const GRADIENT_BKGS = [
  "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  "linear-gradient(135deg, #2d1b69 0%, #11264e 50%, #0d0d0d 100%)",
  "linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #6b2a00 100%)",
  "linear-gradient(135deg, #0a1a0a 0%, #0d3b0d 50%, #0f5f0f 100%)",
  "linear-gradient(135deg, #1a0a1a 0%, #3d0d3d 50%, #6b0a6b 100%)",
  "linear-gradient(135deg, #0a1a2a 0%, #0d2d4a 50%, #0f476b 100%)",
];

export function PostCard({ post, onLike }: PostCardProps) {
  const [liked, setLiked] = useState(() => isPostLiked(post.id));
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isAnimating, setIsAnimating] = useState(false);

  const gradientBg =
    GRADIENT_BKGS[
      parseInt(post.id.replace(/\D/g, "").slice(-1), 10) % GRADIENT_BKGS.length
    ];

  const categoryStyle =
    CATEGORY_COLORS[post.category] ||
    "bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] border-[rgb(var(--accent))]/20";

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
    const result = toggleLike(post.id);
    setLiked(result.liked);
    setLikeCount(result.count);
    onLike?.(post.id, result.count);
  };

  const authorInitial = post.author?.name?.charAt(0)?.toUpperCase() || "?";
  const isHiring = post.type === "hiring_alert";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[rgb(var(--surface))] border border-[rgb(var(--border))] shadow-sm hover:shadow-xl hover:border-[rgb(var(--accent))]/30 transition-all duration-300"
    >
      {/* Image / Hero Area */}
      <div
        className="relative w-full h-48 overflow-hidden shrink-0"
        style={{
          background: post.images?.[0] ? undefined : gradientBg,
        }}
      >
        {post.images?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.images[0]}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Post Type Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${
              isHiring
                ? "bg-amber-500/90 text-white border-amber-400/50"
                : "bg-[rgb(var(--accent))]/90 text-white border-[rgb(var(--accent))]/50"
            }`}
          >
            {isHiring ? (
              <>
                <Briefcase size={10} />
                Hiring
              </>
            ) : (
              <>
                <Sparkles size={10} />
                Showcase
              </>
            )}
          </span>
        </div>

        {/* Author Avatar (bottom right of image) */}
        <div className="absolute bottom-3 right-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-[rgb(var(--accent))] to-[rgb(var(--gray))] flex items-center justify-center text-white font-bold text-sm border-2 border-white/30 shadow-lg">
            {authorInitial}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Author + Category */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-medium text-[rgb(var(--text))] truncate">
              {post.author?.name || "Unknown"}
            </span>
            <span className="text-xs text-[rgb(var(--muted))] shrink-0 capitalize">
              · {post.author?.role}
            </span>
          </div>
          <span
            className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border shrink-0 ${categoryStyle}`}
          >
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-[rgb(var(--text))] leading-snug line-clamp-2 text-sm">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[rgb(var(--muted))] leading-relaxed line-clamp-3 flex-1">
          {post.description}
        </p>

        {/* Budget (for hiring posts) */}
        {isHiring && post.budget && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
            <DollarSign size={12} />
            <span>₹{post.budget}/hr</span>
          </div>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[rgb(var(--bg))] text-[rgb(var(--muted))] text-xs border border-[rgb(var(--border))]"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-md bg-[rgb(var(--bg))] text-[rgb(var(--muted))] text-xs border border-[rgb(var(--border))]">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer: Location + Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[rgb(var(--border))] mt-auto">
          <div className="flex items-center gap-1 text-xs text-[rgb(var(--muted))]">
            <MapPin size={11} />
            <span>Remote</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Views */}
            <div className="flex items-center gap-1 text-xs text-[rgb(var(--muted))]">
              <Eye size={13} />
              <span>{post.views}</span>
            </div>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-xs transition-colors group/like"
              aria-label="Like this post"
            >
              <motion.span
                animate={isAnimating ? { scale: [1, 1.5, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={`transition-colors ${
                  liked
                    ? "text-[rgb(var(--accent))]"
                    : "text-[rgb(var(--muted))] group-hover/like:text-[rgb(var(--accent))]"
                }`}
              >
                <Heart size={14} fill={liked ? "currentColor" : "none"} />
              </motion.span>
              <span
                className={
                  liked
                    ? "text-[rgb(var(--accent))]"
                    : "text-[rgb(var(--muted))]"
                }
              >
                {likeCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
