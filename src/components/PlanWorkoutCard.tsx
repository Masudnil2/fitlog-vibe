"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { toast } from "react-toastify";
import { usePlan } from "@/lib/PlanContext";
import { Workout } from "@/lib/types";

export default function PlanWorkoutCard({
  workout,
  listType,
}: {
  workout: Workout;
  listType: "plan" | "saved";
}) {
  const { removeFromPlan, removeFromSaved, markAsDone, isDone } = usePlan();
  const done = isDone(workout.id);

  const handleRemove = () => {
    if (listType === "plan") removeFromPlan(workout.id);
    else removeFromSaved(workout.id);
    toast.info("Removed");
  };

  const handleMarkDone = () => {
    markAsDone(workout.id);
    toast.success("Marked as done");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-card border border-white/10 rounded-2xl p-4">
      <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-surface">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-lg font-bold uppercase mb-1">
            {workout.name}
            {done && (
              <span className="ml-2 text-xs text-accent align-middle">✓ Done</span>
            )}
          </h3>
          <p className="text-white/50 text-sm mb-2">{workout.equipment}</p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1"><Clock size={14} />{workout.duration} min</span>
            <span className="flex items-center gap-1"><Flame size={14} />{workout.caloriesBurned} kcal</span>
            <span className="flex items-center gap-1"><Star size={14} className="text-accent" />{workout.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Link
            href={`/workout/${workout.id}`}
            className="text-xs font-bold px-4 py-2 rounded-full border border-white/30 hover:border-white transition-colors"
          >
            View Details
          </Link>

          {listType === "plan" && !done && (
            <button
              onClick={handleMarkDone}
              className="flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-full bg-accent text-black hover:bg-accent/90 transition-colors"
            >
              <Check size={14} /> Mark as Done
            </button>
          )}

          <button
            onClick={handleRemove}
            className="ml-auto flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/60 hover:text-red-400 hover:border-red-400 transition-colors"
            aria-label="Remove"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}