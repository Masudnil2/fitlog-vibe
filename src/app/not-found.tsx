import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-accent font-bold text-sm tracking-[0.2em] mb-4">
        ERROR 404
      </p>
      <h1 className="font-display text-4xl md:text-6xl font-bold uppercase mb-6">
        Page Not Found
      </h1>
      <p className="text-white/50 mb-8 max-w-md">
        This route doesn&apos;t exist in FitLog. Maybe the lift you&apos;re
        looking for got racked somewhere else.
      </p>
      <Link
        href="/"
        className="bg-accent text-black font-bold text-sm tracking-wide px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}