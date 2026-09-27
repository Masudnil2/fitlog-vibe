"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Workout } from "@/lib/types";
import WorkoutCard from "./WorkoutCard";

type SortKey = "duration" | "caloriesBurned" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function LibraryGrid({ workouts }: { workouts: Workout[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workouts;
    return workouts.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [workouts, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => b[sortKey] - a[sortKey]);
  }, [filtered, sortKey]);

  return (
    <div>
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tag..."
            className="w-full bg-card border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:border-accent/50"
          />
        </div>

        <div className="relative self-end sm:self-auto">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 text-sm font-medium border border-white/20 rounded-full px-4 py-2 hover:border-white/40 transition-colors"
          >
            Sort By: {sortOptions.find((o) => o.key === sortKey)?.label}
            <ChevronDown size={16} />
          </button>

          {open && (
            <div className="absolute top-full mt-2 right-0 bg-card border border-white/10 rounded-xl overflow-hidden z-10 min-w-[160px]">
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSortKey(opt.key);
                    setOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${
                    sortKey === opt.key ? "text-accent" : "text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {sorted.length === 0 ? (
        <p className="text-center text-white/50 py-16">
          No workouts match &quot;{query}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
}