"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Workout } from "./types";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  addToPlan: (workout: Workout) => boolean; // returns false if cap reached
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_CAP = 5;

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on first mount
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    const storedDone = localStorage.getItem("fitlog_done");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
    if (storedDone) setDoneIds(JSON.parse(storedDone));
    setHydrated(true);
  }, []);

  // Save to localStorage whenever plan/saved/doneIds changes (after initial hydration)
  useEffect(() => {
    if (hydrated) localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("fitlog_done", JSON.stringify(doneIds));
  }, [doneIds, hydrated]);

  const addToPlan = (workout: Workout) => {
    if (plan.some((w) => w.id === workout.id)) return true; // already there
    if (plan.length >= PLAN_CAP) return false; // cap reached
    setPlan((prev) => [...prev, workout]);
    return true;
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((w) => w.id === workout.id)) return;
    setSaved((prev) => [...prev, workout]);
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  const markAsDone = (id: number) => {
    setDoneIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);
  const isDone = (id: number) => doneIds.includes(id);

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isInSaved,
        isDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}