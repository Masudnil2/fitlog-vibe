"use client";

import { toast } from "react-toastify";
import { Plus, Bookmark } from "lucide-react";
import { usePlan } from "@/lib/PlanContext";
import { Workout } from "@/lib/types";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isInSaved, isDone } = usePlan();

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const done = isDone(workout.id);

  const handleAddToPlan = () => {
    const success = addToPlan(workout);
    if (!success) {
      toast.error("Today's plan is full (5 lifts max)");
      return;
    }
    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    addToSaved(workout);
    toast.success("Saved for later");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleAddToPlan}
        disabled={inPlan}
        className="flex items-center justify-center gap-2 bg-accent text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={18} />
        {inPlan ? "Already in plan" : "Add to today's plan"}
      </button>

      <button
        onClick={handleSave}
        disabled={inSaved}
        className="flex items-center justify-center gap-2 border border-white/30 text-white font-bold text-sm px-6 py-3 rounded-full hover:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Bookmark size={18} />
        {inSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}