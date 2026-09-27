import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-accent/50 transition-colors"
    >
      {/* Image */}
      <div className="relative w-full aspect-video bg-surface">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold tracking-wider text-accent uppercase bg-accent/10 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-bold uppercase mb-2 leading-snug">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="text-white/50 text-sm mb-4">{workout.equipment}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}