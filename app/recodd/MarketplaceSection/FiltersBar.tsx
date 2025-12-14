"use client";

import { ChangeEvent } from "react";
import { Search } from "lucide-react";

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

  return (
    <div
      className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-3 mb-6"
    >
      {/* Search */}
      <div className="relative w-full md:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={query}
          onChange={handleSearch}
          placeholder="Search by role, skill, or name..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E53935]/70 focus:border-transparent"
        />
      </div>

      {/* Availability filter */}
      <div className="flex gap-2 text-xs">
        {["all", "full-time", "part-time", "contract", "project"].map(opt => (
          <button
            key={opt}
            onClick={() => onAvailabilityChange(opt)}
            className={`px-3 py-1.5 rounded-full border text-[11px] capitalize transition-all ${
              availability === opt
                ? "bg-[#E53935] text-white border-[#E53935]"
                : "border-gray-300 dark:border-zinc-700 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            {opt === "all" ? "Any availability" : opt}
          </button>
        ))}
      </div>
    </div>
  );
};
