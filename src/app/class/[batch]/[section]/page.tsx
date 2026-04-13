import { notFound } from "next/navigation";
import Link from "next/link";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { BatchMetrics } from "@/components/batch-metrics";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { CLASS_REGISTRY } from "@/data/registry";
import { getClassData, loadClassSemesters } from "@/lib/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ batch: string; section: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  return {
    title: `Class ${p.batch} (${p.section}) — Leaderboard`,
    description: `Academic results and rankings for Batch ${p.batch} ${p.section} program.`,
  };
}

export default async function ClassLeaderboardPage({ params }: Props) {
  const p = await params;
  const meta = CLASS_REGISTRY.find(
    (c) => c.batch === p.batch && c.id.endsWith(p.section)
  );

  if (!meta) notFound();

  const classData = await getClassData(meta.id);
  const semestersData = await loadClassSemesters(meta.id);

  if (!classData || semestersData.length === 0) notFound();

  return (
    <div className="min-h-screen bg-[#f5f7f8] flex flex-col">
      <Nav />

      {/* ── Page Header ──────────────────────────────────────────────── */}
      <header className="relative bg-white border-b border-gray-100 overflow-hidden">
        {/* Crimson left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8F141B]" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,#8F141B 39px,#8F141B 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,#8F141B 39px,#8F141B 40px)",
          }}
        />

        {/* Crimson radial glow */}
        <div className="absolute -right-32 -top-32 w-80 h-80 rounded-full bg-[#8F141B] opacity-[0.04] pointer-events-none" />

        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 py-8 sm:py-10 pl-8 sm:pl-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/leaderboards"
              className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 hover:text-[#8F141B] transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 rotate-180" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8h12M8 2l6 6-6 6" />
              </svg>
              Leaderboards
            </Link>
            <span className="text-gray-200">·</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
              {meta.program} &nbsp;·&nbsp; Batch {p.batch} &nbsp;·&nbsp; {meta.shift} Program
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-[28px] sm:text-[38px] md:text-[46px] font-black text-[#1f2432] leading-none tracking-tight mb-3">
                Class Leaderboard
              </h1>
              <p className="text-[13px] sm:text-[14px] text-gray-500 font-medium max-w-lg leading-relaxed">
                Official academic performance records and class standings for{" "}
                <span className="font-bold text-[#1f2432]">{meta.section}</span>.
              </p>
            </div>

            {/* Section badge */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-end gap-1">
                <div className="inline-flex items-center gap-2 bg-[#8F141B]/[0.07] border border-[#8F141B]/20 rounded-full px-3.5 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8F141B] animate-pulse" />
                  <span className="text-[11px] font-black text-[#8F141B] uppercase tracking-widest">Active</span>
                </div>
                {meta.cr && (
                  <span className="text-[11px] text-gray-400 font-semibold">
                    CR: <span className="text-[#1f2432]">{meta.cr}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto px-3 sm:px-6 md:px-10 py-8 pb-20">
        <BatchMetrics data={classData} />

        {/* Table section */}
        <DashboardTabs semesters={semestersData} />
      </main>

      <Footer />
    </div>
  );
}
