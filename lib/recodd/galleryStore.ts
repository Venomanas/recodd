/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Post, PostType } from "./types";

// ─── Mock seed data ──────────────────────────────────────────────────────────
const SEED_POSTS: Post[] = [
  {
    id: "seed-1",
    author_id: "user-seed-1",
    author: {
      id: "user-seed-1",
      email: "aarav@example.com",
      name: "Aarav Sharma",
      role: "freelancer",
      created_at: "2026-01-10T08:00:00Z",
    },
    type: "work_showcase",
    title: "E-Commerce Dashboard — Full Stack Build",
    description:
      "Built a complete e-commerce admin dashboard with React + Node.js + MongoDB. Features include real-time analytics, inventory management, order tracking, and role-based access. Delivered in 3 weeks.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Development",
    tags: ["React", "Node.js", "MongoDB", "Dashboard"],
    likes: 48,
    views: 312,
    created_at: "2026-02-20T10:00:00Z",
  },
  {
    id: "seed-2",
    author_id: "user-seed-2",
    author: {
      id: "user-seed-2",
      email: "technova@example.com",
      name: "TechNova",
      role: "business",
      created_at: "2026-01-15T08:00:00Z",
    },
    type: "hiring_alert",
    title: "Hiring: Senior React Developer (Remote)",
    description:
      "We're building the next generation of fintech tools and need a React ninja. 3+ yrs experience, strong TypeScript skills, API integration experience required. Competitive package, flexible hours.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Development",
    tags: ["React", "TypeScript", "Remote", "Fintech"],
    budget: 280,
    likes: 29,
    views: 187,
    created_at: "2026-02-21T12:30:00Z",
  },
  {
    id: "seed-3",
    author_id: "user-seed-3",
    author: {
      id: "user-seed-3",
      email: "anika@example.com",
      name: "Anika Gupta",
      role: "freelancer",
      created_at: "2026-01-20T08:00:00Z",
    },
    type: "work_showcase",
    title: "Brand Identity for Luxury Fashion Label",
    description:
      "Complete brand overhaul for a luxury fashion startup: logo suite, colour palette, typography system, packaging mockups, and brand guidelines document. 100% client satisfaction.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Design",
    tags: ["Branding", "Logo", "Luxury", "Identity"],
    likes: 73,
    views: 441,
    created_at: "2026-02-18T09:00:00Z",
  },
  {
    id: "seed-4",
    author_id: "user-seed-4",
    author: {
      id: "user-seed-4",
      email: "creativestudio@example.com",
      name: "Creative Studio",
      role: "business",
      created_at: "2026-01-22T08:00:00Z",
    },
    type: "hiring_alert",
    title: "UI/UX Designer Needed — Mobile App Project",
    description:
      "Looking for a creative UI/UX designer to revamp our mobile fitness app. Must have Figma expertise, mobile design experience, and a strong portfolio. It's a 2-month contract with potential to extend.",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    ],
    category: "UI/UX",
    tags: ["Figma", "Mobile", "UI/UX", "Contract"],
    budget: 150,
    likes: 34,
    views: 215,
    created_at: "2026-02-22T14:00:00Z",
  },
  {
    id: "seed-5",
    author_id: "user-seed-5",
    author: {
      id: "user-seed-5",
      email: "jennifer@example.com",
      name: "Jennifer Lee",
      role: "freelancer",
      created_at: "2026-01-25T08:00:00Z",
    },
    type: "work_showcase",
    title: "SaaS Onboarding Flow — UX Research & Design",
    description:
      "Conducted in-depth user research and redesigned the onboarding flow for a B2B SaaS product. Result: 40% increase in trial-to-paid conversion rate. Delivered wireframes, prototypes, and design system updates.",
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop&q=80",
    ],
    category: "UI/UX",
    tags: ["UX Research", "Prototyping", "SaaS", "Figma"],
    likes: 91,
    views: 620,
    created_at: "2026-02-15T11:00:00Z",
  },
  {
    id: "seed-6",
    author_id: "user-seed-6",
    author: {
      id: "user-seed-6",
      email: "michael@example.com",
      name: "Michael Adams",
      role: "freelancer",
      created_at: "2026-01-28T08:00:00Z",
    },
    type: "work_showcase",
    title: "SEO Campaign — 300% Organic Traffic Growth",
    description:
      "Ran a 6-month SEO campaign for a fintech startup. Achieved 300% organic traffic growth, top 3 rankings for 15 high-volume keywords, and cut PPC spend by 40%. Full technical audit, on-page, and link building.",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Marketing",
    tags: ["SEO", "Analytics", "Content", "Growth"],
    likes: 55,
    views: 389,
    created_at: "2026-02-17T13:00:00Z",
  },
];

const STORAGE_KEY = "recodd_gallery_posts";
const LIKED_KEY = "recodd_gallery_liked";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function loadPosts(): Post[] {
  if (typeof window === "undefined") return SEED_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_POSTS;
    const stored: Post[] = JSON.parse(raw);
    // Merge: stored posts first (newer), then any seed posts not in stored
    const storedIds = new Set(stored.map(p => p.id));
    const seeds = SEED_POSTS.filter(p => !storedIds.has(p.id));
    return [...stored, ...seeds].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  } catch {
    return SEED_POSTS;
  }
}

function savePosts(posts: Post[]) {
  if (typeof window === "undefined") return;
  // Only save user-created posts (not seeds) to avoid bloat
  const userPosts = posts.filter(p => !p.id.startsWith("seed-"));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userPosts));
}

function loadLiked(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveLiked(liked: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LIKED_KEY, JSON.stringify([...liked]));
}

// ─── Public API ───────────────────────────────────────────────────────────────
export function getPosts(): Post[] {
  return loadPosts();
}

export function getTopPosts(n = 3): Post[] {
  return [...loadPosts()].sort((a, b) => b.likes - a.likes).slice(0, n);
}

export function createPost(data: {
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  type: PostType;
  budget?: number;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorEmail: string;
}): Post {
  const newPost: Post = {
    id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    author_id: data.authorId,
    author: {
      id: data.authorId,
      email: data.authorEmail,
      name: data.authorName,
      role: data.authorRole as any,
      created_at: new Date().toISOString(),
    },
    type: data.type,
    title: data.title,
    description: data.description,
    images: data.images,
    category: data.category,
    tags: data.tags,
    budget: data.budget,
    likes: 0,
    views: 0,
    created_at: new Date().toISOString(),
  };

  const all = loadPosts();
  const userPosts = all.filter(p => !p.id.startsWith("seed-"));
  savePosts([newPost, ...userPosts]);
  return newPost;
}

export function toggleLike(postId: string): { liked: boolean; count: number } {
  const liked = loadLiked();
  const posts = loadPosts();

  const isNowLiked = !liked.has(postId);
  if (isNowLiked) {
    liked.add(postId);
  } else {
    liked.delete(postId);
  }
  saveLiked(liked);

  // Update count only for user-created posts (seeds keep their counts as-is in memory)
  const post = posts.find(p => p.id === postId);
  const count = post
    ? isNowLiked
      ? post.likes + 1
      : Math.max(0, post.likes - 1)
    : 0;

  // Persist updated count for user posts
  if (post && !postId.startsWith("seed-")) {
    const userPosts = posts
      .filter(p => !p.id.startsWith("seed-"))
      .map(p => (p.id === postId ? { ...p, likes: count } : p));
    savePosts(userPosts);
  }

  return { liked: isNowLiked, count };
}

export function isPostLiked(postId: string): boolean {
  return loadLiked().has(postId);
}

export function incrementView(postId: string) {
  if (postId.startsWith("seed-")) return; // skip seed posts
  const posts = loadPosts();
  const userPosts = posts
    .filter(p => !p.id.startsWith("seed-"))
    .map(p => (p.id === postId ? { ...p, views: p.views + 1 } : p));
  savePosts(userPosts);
}
