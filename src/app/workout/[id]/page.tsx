import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left - Image */}
      <div className="relative w-full aspect-square bg-surface rounded-2xl overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right - Details */}
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold tracking-wider text-accent uppercase bg-accent/10 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold uppercase mb-4 leading-tight">
          {workout.name}
        </h1>

        <p className="text-white/60 mb-8">{workout.description}</p>

        {/* Key Specs */}
        <div className="border border-white/10 rounded-2xl overflow-hidden mb-8">
          {[
            ["EQUIPMENT", workout.equipment],
            ["DIFFICULTY", workout.difficulty],
            ["SETS", workout.sets],
            ["REPS", workout.reps],
            ["DURATION", `${workout.duration} min`],
            ["CALORIES", `${workout.caloriesBurned} kcal`],
            ["RATING", workout.rating],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between px-5 py-3 border-b border-white/10 last:border-b-0 text-sm"
            >
              <span className="text-white/50 font-medium">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h2 className="font-display text-xl font-bold uppercase mb-4">
            Instructions
          </h2>
          <ol className="space-y-3">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-white/70 text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <WorkoutActions workout={workout} />
      </div>
    </main>
  );
}