import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CalculatorClient } from "@/components/calculator-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPA Calculator | UBIT Results Portal",
  description: "Estimate your SGPA instantly using the official UBIT grading scale.",
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[#f5f7f8] flex flex-col">
      <Nav />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-6 md:py-10 md:px-8">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-[24px] sm:text-[32px] md:text-[40px] font-black text-[#1f2432] tracking-tight leading-tight mb-2">
            Semester GPA Calculator
          </h1>
          <p className="text-[13px] md:text-[15px] text-gray-500 font-medium leading-relaxed max-w-xl">
            Estimate your SGPA instantly. Enter expected marks — the tool auto-computes grades using the official UBIT grading scale.
          </p>
        </div>

        <CalculatorClient />
      </main>
      <Footer />
    </div>
  );
}
