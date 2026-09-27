"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/lib/PlanContext";

const navLinks = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo - left */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-lg font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Nav links - middle */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Badges - right */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="px-3 py-1 rounded-full bg-accent text-black text-xs font-bold"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="px-3 py-1 rounded-full border border-white/30 text-white text-xs font-bold"
          >
            Saved {saved.length}
          </Link>
        </div>
      </nav>
    </header>
  );
}