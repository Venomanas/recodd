"use client";

import { ChangeEvent } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  query: string;
  availability: string;
  onQueryChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
};

export const FiltersBar = ({
  query,
  availability,
  onQueryChange,
  onAvailabilityChange,
}: Props) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "project", label: "Project" },
  ];

  return (
    <div className="mb-10 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input - "Matte" Surface Style */}
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(var(--muted))] group-focus-within:text-[rgb(var(--accent))] transition-colors" />
          <input
            value={query}
            onChange={handleSearch}
            placeholder="Search by role, skill, or name..."
            className="
              w-full pl-11 pr-4 py-3.5
              text-sm
              rounded-2xl
              bg-[rgb(var(--surface))]
              border border-transparent
              text-[rgb(var(--text))]
              placeholder:text-[rgb(var(--muted))]
              focus:outline-none 
              focus:bg-[rgb(var(--bg))]
              focus:border-[rgb(var(--accent))]
              focus:ring-1 focus:ring-[rgb(var(--accent))]
              transition-all duration-200
              shadow-sm
            "
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          {filterOptions.map(opt => (
            <motion.button
              key={opt.value}
              onClick={() => onAvailabilityChange(opt.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border
                ${
                  availability === opt.value
                    ? "bg-[rgb(var(--text))] border-[rgb(var(--text))] text-[rgb(var(--bg))] shadow-md"
                    : "bg-[rgb(var(--surface))] border-transparent text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))] hover:border-[rgb(var(--border))]"
                }
              `}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
