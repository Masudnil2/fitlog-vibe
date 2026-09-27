"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
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

  const sorted = useMemo(() => {
    return [...workouts].sort((a, b) => b[sortKey] - a[sortKey]);
  }, [workouts, sortKey]);

  return (
    <div>
      {/* Sort dropdown */}
      <div className="flex justify-end mb-6 relative">
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}