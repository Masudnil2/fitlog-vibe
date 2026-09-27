"use client";

import { useState, useEffect } from "react";
import { usePlan } from "@/lib/PlanContext";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import EmptyPlanState from "@/components/EmptyPlanState";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const { plan, saved } = usePlan();
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const activeList = activeTab === "plan" ? plan : saved;

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold uppercase mb-2">
        My Plan
      </h1>
      <p className="text-white/50 mb-8">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-white/10 rounded-2xl p-5 text-center">
          <p className="text-2xl md:text-3xl font-display font-bold text-accent">{plan.length}</p>
          <p className="text-xs text-white/50 uppercase tracking-wide mt-1">Exercises</p>
        </div>
        <div className="bg-card border border-white/10 rounded-2xl p-5 text-center">
          <p className="text-2xl md:text-3xl font-display font-bold text-accent">{totalMinutes}</p>
          <p className="text-xs text-white/50 uppercase tracking-wide mt-1">Minutes</p>
        </div>
        <div className="bg-card border border-white/10 rounded-2xl p-5 text-center">
          <p className="text-2xl md:text-3xl font-display font-bold text-accent">{totalCalories}</p>
          <p className="text-xs text-white/50 uppercase tracking-wide mt-1">Calories</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10">
        <button
          onClick={() => setActiveTab("plan")}
          className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors ${
            activeTab === "plan" ? "border-accent text-accent" : "border-transparent text-white/50"
          }`}
        >
          Today&apos;s Plan
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors ${
            activeTab === "saved" ? "border-accent text-accent" : "border-transparent text-white/50"
          }`}
        >
          Saved
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-center text-white/50 py-16">Loading workouts…</p>
      ) : activeList.length === 0 ? (
        <EmptyPlanState />
      ) : (
        <div className="space-y-4">
          {activeList.map((workout) => (
            <PlanWorkoutCard key={workout.id} workout={workout} listType={activeTab} />
          ))}
        </div>
      )}
    </main>
  );
}