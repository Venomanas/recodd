"use client";

import React from "react";
import Link from "next/link";
import {
  Code,
  PenTool,
  Layout,
  Megaphone,
  Database,
  Smartphone,
  Globe,
  Briefcase,
} from "lucide-react";

const categories = [
  {
    icon: Code,
    title: "Development",
    count: "1.2k+ projects",
    slug: "development",
  },
  { icon: PenTool, title: "Design", count: "850+ projects", slug: "design" },
  { icon: Layout, title: "UI/UX", count: "600+ projects", slug: "ui-ux" },
  {
    icon: Megaphone,
    title: "Marketing",
    count: "400+ projects",
    slug: "marketing",
  },
  {
    icon: Database,
    title: "Data Science",
    count: "300+ projects",
    slug: "data-science",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    count: "500+ projects",
    slug: "mobile-apps",
  },
  { icon: Globe, title: "Webflow", count: "200+ projects", slug: "webflow" },
  {
    icon: Briefcase,
    title: "Consulting",
    count: "150+ projects",
    slug: "consulting",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-20 bg-[rgb(var(--surface))] border-b border-[rgb(var(--border))]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-[rgb(var(--text))] mb-10 text-center md:text-left">
          Explore by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/category/${cat.slug}`}
              className="
                group
                flex flex-col items-start p-6
                bg-[rgb(var(--bg))]
                border border-[rgb(var(--border))]
                rounded-xl
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5
                hover:border-[rgb(var(--accent))/30]
                cursor-pointer
              "
            >
              <div className="p-3 rounded-lg bg-[rgb(var(--surface))] border border-[rgb(var(--border))] mb-4 text-[rgb(var(--text))] group-hover:text-[rgb(var(--accent))] transition-colors">
                <cat.icon size={24} />
              </div>
              <h3 className="font-semibold text-lg text-[rgb(var(--text))] mb-1">
                {cat.title}
              </h3>
              <p className="text-sm text-[rgb(var(--muted))]">{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
