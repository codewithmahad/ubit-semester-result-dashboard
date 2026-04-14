import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About the Initiative | UBIT Results Portal",
  description:
    "The story behind the UBIT Results Portal — why it was built, what problem it solved, and what it means for students at the Department of Computer Science, University of Karachi.",
};

const STATS = [
  { value: "200+",   label: "Students tracked",      sub: "across active batches" },
  { value: "2",      label: "Class sections",         sub: "Morning & Evening" },
  { value: "4+",     label: "Subjects per semester",  sub: "parsed & computed" },
  { value: "< 1s",   label: "Result lookup time",     sub: "instant, zero lag" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f7f8] flex flex-col">
      <Nav />

      <main className="flex-1">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="w-full max-w-[900px] mx-auto px-4 md:px-8 pt-10 md:pt-16 pb-14 md:pb-20">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] font-bold text-gray-400 hover:text-[#8F141B] transition-colors uppercase tracking-widest mb-10 md:mb-14"
          >
            <ArrowLeft className="w-3 h-3" /> Home
          </Link>

          {/* Eyebrow */}
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8F141B] mb-5">
            BSSE 2025 &nbsp;·&nbsp; Student Initiative &nbsp;·&nbsp; University of Karachi
          </p>

          {/* Title */}
          <h1 className="text-[36px] sm:text-[52px] md:text-[68px] font-black text-[#1f2432] tracking-[-0.03em] leading-[1.0] mb-8">
            We replaced a<br />
            <span className="text-[#8F141B]">notice board</span><br />
            with a dashboard.
          </h1>

          {/* Divider line */}
          <div className="w-16 h-[3px] bg-[#8F141B] rounded-full mb-8" />

          <p className="text-[16px] md:text-[18px] text-gray-500 font-medium leading-relaxed max-w-[560px]">
            Every semester, hundreds of UBIT students searched crowded hallways
            for blurry paper printouts. This portal ended that.
          </p>
        </section>

        {/* ── BEFORE / AFTER CONTRAST ────────────────────────────────────── */}
        <section className="w-full max-w-[1100px] mx-auto px-4 md:px-8 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

            {/* BEFORE */}
            <div className="relative bg-[#1a1a2e] rounded-2xl p-7 md:p-10 overflow-hidden">
              {/* Noise overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
              />

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400/70 mb-6">
                Before — The Old Reality
              </p>

              {/* Mock notice board */}
              <div className="bg-[#111122] border border-white/5 rounded-xl p-5 mb-6 space-y-3">
                {[
                  "📋  Paper printout — Room 301 hallway",
                  "📱  WhatsApp image (blurred, 480p)",
                  "🔢  Manual CGPA calculation (error-prone)",
                  "⏳  Results delayed 2–3 weeks",
                  "❌  No cumulative ranking, no history",
                ].map((line) => (
                  <p key={line} className="text-[13px] font-mono text-red-200/50 leading-relaxed">{line}</p>
                ))}
              </div>

              <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                Tracking your academic trajectory meant cross-referencing WhatsApp
                screenshots with a calculator, semester by semester.
              </p>
            </div>

            {/* AFTER */}
            <div className="relative bg-white rounded-2xl p-7 md:p-10 border border-[#e2e6ea] overflow-hidden">
              {/* Subtle crimson gradient top-right */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#8F141B] opacity-[0.04] rounded-full pointer-events-none" />

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8F141B] mb-6">
                After — The Portal
              </p>

              <div className="bg-[#f5f7f8] border border-[#e2e6ea] rounded-xl p-5 mb-6 space-y-3">
                {[
                  { dot: "bg-green-500", text: "Instant seat number search — sub 1 second" },
                  { dot: "bg-green-500", text: "Auto-computed CGPA across all semesters" },
                  { dot: "bg-green-500", text: "Class-wide rankings with medal tiers" },
                  { dot: "bg-green-500", text: "Print-ready digital transcript" },
                  { dot: "bg-green-500", text: "Works on any device, anytime" },
                ].map(({ dot, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
                    <p className="text-[13px] font-medium text-[#1f2432] leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                One search. Your entire academic record — grades, SGPA, CGPA, rank —
                in under a second.
              </p>
            </div>
          </div>
        </section>

        {/* ── IMPACT NUMBERS ─────────────────────────────────────────────── */}
        <section className="w-full bg-white border-y border-gray-100">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {STATS.map(({ value, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center md:items-start md:text-left">
                  <p className="text-[40px] md:text-[52px] font-black text-[#1f2432] leading-none tracking-tight tabular-nums mb-2">
                    {value}
                  </p>
                  <p className="text-[13px] font-bold text-[#1f2432] mb-0.5">{label}</p>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION STATEMENT ──────────────────────────────────────────── */}
        <section className="w-full bg-[#0F172A]">
          <div className="max-w-[900px] mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8F141B] mb-8">
              Mission
            </p>
            <blockquote className="text-[22px] sm:text-[30px] md:text-[38px] font-black text-white leading-[1.2] tracking-[-0.02em] mb-8">
              &ldquo;University tooling shouldn&apos;t feel like navigating a
              bureaucracy.&rdquo;
            </blockquote>
            <p className="text-[14px] md:text-[16px] text-slate-200 font-medium leading-relaxed max-w-[520px] mx-auto">
              This portal exists because students deserve instant access to their
              own academic data — not a two-week wait and a blurry group chat screenshot.
              Built fast, designed precisely, maintained independently.
            </p>
            <div className="mt-10 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              <span className="w-8 h-px bg-slate-700" />
              BSSE Batch 2025 &nbsp;·&nbsp; Department of Computer Science
              <span className="w-8 h-px bg-slate-700" />
            </div>
          </div>
        </section>

        {/* ── CTA ROW ────────────────────────────────────────────────────── */}
        <section className="w-full max-w-[900px] mx-auto px-4 md:px-8 py-14 md:py-20">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 mb-8">
            Explore
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="group flex-1 flex items-center justify-between bg-[#1f2432] text-white px-7 py-5 rounded-2xl font-bold text-[15px] hover:bg-black transition-all shadow-sm"
            >
              <span>Open the Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/developer"
              className="group flex-1 flex items-center justify-between bg-white text-[#1f2432] px-7 py-5 rounded-2xl font-bold text-[15px] border border-[#e2e6ea] hover:border-[#8F141B]/30 hover:shadow-md transition-all"
            >
              <span>Meet the Developer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#8F141B]" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
