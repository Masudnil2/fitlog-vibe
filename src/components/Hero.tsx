import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left - Text */}
        <div>
          <p className="text-accent font-bold text-sm tracking-[0.2em] mb-4">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase leading-tight mb-6">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-md mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          
           <a href="#library"
            className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm tracking-wide px-6 py-3 rounded-full hover:bg-accent/90 transition-colors">
        
            BROWSE WORKOUTS
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Right - Banner Image */}
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <Image
            src="/banner.png"
            alt="Workout illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}