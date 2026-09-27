import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/lib/PlanContext";
import Navbar from "@/components/Navbar";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense gym companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable} font-sans antialiased`}>
        <PlanProvider>
          <Navbar />
          {children}
        </PlanProvider>
      </body>
    </html>
  );
}