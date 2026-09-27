import Link from "next/link";

export default function EmptyPlanState() {
  return (
    <div className="text-center py-20">
      <h3 className="font-display text-2xl font-bold uppercase mb-2">
        Nothing Here Yet
      </h3>
      <p className="text-white/50 mb-6">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="inline-block bg-accent text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
      >
        Go to workouts
      </Link>
    </div>
  );
}