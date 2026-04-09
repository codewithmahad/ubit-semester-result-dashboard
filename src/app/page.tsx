import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getClassData, getClassStats } from "@/lib/data";
import { SearchOmnibar } from "@/components/search-omnibar";
import { Nav } from "@/components/nav";
import { NotificationBanner } from "@/components/notification-banner";

export const metadata = {
  title: "UBIT Results Portal",
  description:
    "Official academic result portal for BSSE Batch 2025, Department of Computer Science (UBIT), University of Karachi.",
};

export default function LandingPage() {
  const { students } = getClassData();
  const stats = getClassStats(students);
  void stats; // suppress unused warning
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <NotificationBanner />

      {/* Subtle background watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025] pointer-events-none select-none z-0">
        <Image src="/uok-logo.png" alt="" width={500} height={500} className="object-contain" />
      </div>

      <section className="relative z-10 bg-[#f5f7f8] min-h-screen pb-16">

        {/* ── Hero Search ──────────────────────────────────────── */}
        <div className="w-full max-w-[860px] mx-auto px-4 md:px-8 pt-10 md:pt-16 pb-10 md:pb-14 flex flex-col items-center text-center">
          <h1 className="text-[30px] sm:text-[42px] md:text-[54px] font-black text-[#1f2432] mb-3 md:mb-4 tracking-tighter leading-[1.1]">
            Academic Results Hub
          </h1>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-gray-500 mb-8 md:mb-10 max-w-xl leading-relaxed font-medium">
            The official portal for{" "}
            <span className="font-bold text-[#8F141B]">UBIT Students</span>.
            Instant access to your academic transcripts, GPA metrics, and class standings.
          </p>

          {/* Search card */}
          <div className="w-full max-w-[700px]">
            <SearchOmnibar />
          </div>
        </div>

        {/* ── Feature Cards ─────────────────────────────────────── */}
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

            {/* Card 1: Leaderboards */}
            <Link
              href="/leaderboards"
              className="group relative overflow-hidden rounded-2xl bg-[#f0f4f9] border border-[#e2e6ea] p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:h-[270px] transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.99]"
            >
              {/* Decorative shapes */}
              <div className="absolute right-0 bottom-0 w-52 h-52 bg-[#0056D2] opacity-[0.035] rounded-tl-[100px] -mr-6 -mb-6 transition-transform group-hover:scale-110 duration-500" />
              <div className="absolute right-10 top-0 w-28 h-28 bg-[#8F141B] opacity-[0.025] rounded-full -mt-10 transition-transform group-hover:scale-150 duration-700" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Image src="/ubit-logo.jpg" alt="" width={18} height={18} className="object-contain mix-blend-multiply opacity-40" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Ranking</span>
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-black text-[#1f2432] mb-2 leading-tight group-hover:text-[#0056D2] transition-colors">
                  Analyze Class Leaderboards
                </h3>
                <p className="text-[13px] text-gray-600 mb-6 font-medium leading-relaxed max-w-[260px]">
                  Discover top performers, official grade records, and track class-wide academic standings.
                </p>
              </div>

              <div className="relative z-10 inline-flex items-center gap-2 border border-[#1f2432] text-[#1f2432] px-4 py-2 rounded-lg font-bold text-[12px] group-hover:bg-[#1f2432] group-hover:text-white transition-all self-start">
                Explore directory <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Card 2: GPA Calculator */}
            <Link
              href="/calculator"
              className="group relative overflow-hidden rounded-2xl bg-[#00255d] border border-[#001d4a] p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:h-[270px] transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.99]"
            >
              {/* Decorative shapes */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-[#0056D2] to-[#00255d] rounded-bl-[130px] opacity-60 -mr-14 -mt-14 transition-transform group-hover:scale-105 duration-500" />
              <div className="absolute right-10 bottom-0 w-44 h-44 border-[20px] border-white/5 rounded-full -mb-18 transition-transform group-hover:scale-125 duration-700" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#8F141B] text-white text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded">Smart Tool</span>
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-black text-white mb-2 leading-tight group-hover:text-amber-400 transition-colors">
                  Calculate Target SGPA
                </h3>
                <p className="text-[13px] text-gray-300 mb-6 font-medium leading-relaxed max-w-[260px]">
                  Plan your semester results dynamically with our accurate, instant grade point estimator.
                </p>
              </div>

              <div className="relative z-10 inline-flex items-center gap-2 bg-white text-[#00255d] px-4 py-2 rounded-lg font-bold text-[12px] group-hover:bg-gray-100 transition-all shadow-sm self-start">
                Open calculator <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">

          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/ubit-logo.jpg" alt="UBIT" width={22} height={22} className="object-contain" />
              <h4 className="font-bold text-[#8F141B] text-[14px]">UBIT Results</h4>
            </div>
            <p className="text-[12px] text-gray-500 leading-relaxed mb-3">
              A fast, accessible student-built portal for academic results, transcripts, and standing metrics.
            </p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} BSSE &#39;25 Initiative
            </p>
          </div>

          <div className="flex gap-12 md:gap-16">
            <div>
              <h4 className="font-bold text-[#1f2432] text-[12px] md:text-[14px] mb-3 uppercase tracking-wider">Resources</h4>
              <ul className="flex flex-col gap-2.5 text-[12px] md:text-[13px] text-[#0056D2]">
                <li><Link href="/leaderboards" className="hover:underline">Class Leaderboards</Link></li>
                <li><Link href="/calculator" className="hover:underline">GPA Calculator</Link></li>
                <li><Link href="/developer" className="hover:underline font-semibold flex items-center gap-1">About Developer <ArrowRight className="w-3 h-3" /></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#1f2432] text-[12px] md:text-[14px] mb-3 uppercase tracking-wider">Disclaimer</h4>
              <p className="text-[11px] md:text-[12px] text-gray-500 max-w-[200px] leading-relaxed">
                Independent student project. Not an official University of Karachi website.
              </p>
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}
