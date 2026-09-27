import { getAllWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getAllWorkouts();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-display">Total workouts: {workouts.length}</h1>
      <pre className="text-xs mt-4">{JSON.stringify(workouts[0], null, 2)}</pre>
    </div>
  );
}