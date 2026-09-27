"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Workout } from "./types";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => boolean; // returns false if cap reached
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_CAP = 5;

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on first mount
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
    setHydrated(true);
  }, []);

  // Save to localStorage whenever plan/saved changes (after initial hydration)
  useEffect(() => {
    if (hydrated) localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved, hydrated]);

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

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);

  return (
    <PlanContext.Provider
      value={{ plan, saved, addToPlan, addToSaved, removeFromPlan, removeFromSaved, isInPlan, isInSaved }}
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