"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { usePlan } from "@/lib/PlanContext";

const navLinks = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-lg font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-sm tracking-wide transition-colors ${
                  isActive ? "text-accent" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="px-3 py-1 rounded-full bg-accent text-black text-xs font-bold"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="hidden sm:inline-block px-3 py-1 rounded-full border border-white/30 text-white text-xs font-bold"
          >
            Saved {saved.length}
          </Link>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-medium text-sm ${
                  isActive ? "text-accent" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/my-plan"
            onClick={() => setMobileOpen(false)}
            className="text-xs font-bold text-white/50"
          >
            Saved: {saved.length}
          </Link>
        </div>
      )}
    </header>
  );
}