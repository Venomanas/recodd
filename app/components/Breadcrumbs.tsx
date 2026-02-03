"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav className="flex items-center text-sm text-[rgb(var(--text-secondary))] overflow-x-auto whitespace-nowrap py-4">
      <Link
        href="/"
        className="hover:text-[rgb(var(--text))] transition-colors"
      >
        <Home size={16} />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={16} className="mx-2 text-[rgb(var(--muted))]" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[rgb(var(--text))] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[rgb(var(--text))]">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};
