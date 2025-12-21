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
    <div
      className="
      flex flex-col lg:flex-row gap-4
      rounded-2xl
      bg-white dark:bg-zinc-900
      border border-gray-200 dark:border-zinc-800
      p-4
      mb-8
      shadow-lg
    "
    >
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          value={query}
          onChange={handleSearch}
          placeholder="Search by role, skill, or name..."
          className="
            w-full pl-12 pr-4 py-3
            text-sm
            rounded-xl
            border border-gray-300 dark:border-zinc-700
            bg-gray-50 dark:bg-zinc-800
            text-gray-900 dark:text-white
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
            transition-all
          "
        />
      </div>

      {/* Availability filters */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map(opt => (
          <motion.button
            key={opt.value}
            onClick={() => onAvailabilityChange(opt.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 rounded-xl
              text-xs font-medium
              border transition-all duration-200
              ${
                availability === opt.value
                  ? "bg-linear-to-r from-red-500 to-red-600 text-white border-red-500 shadow-lg shadow-red-500/30"
                  : "border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
              }
            `}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
