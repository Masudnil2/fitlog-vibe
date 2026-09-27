import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";
import LibraryGrid from "./LibaryGrid";

export default async function Library() {
  const workouts = await getAllWorkouts();

  return (
    <section id="library" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-2">
        The Library
      </h2>
      <p className="text-white/50 mb-10">
        Twelve lifts covering every major muscle group.
      </p>

      <LibraryGrid workouts={workouts} />

    </section>
  );
}