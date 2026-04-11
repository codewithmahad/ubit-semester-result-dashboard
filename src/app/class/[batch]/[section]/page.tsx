import { notFound } from "next/navigation";
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

  if (!meta) {
    notFound();
  }

  const classData = await getClassData(meta.id);
  const semestersData = await loadClassSemesters(meta.id);

  if (!classData || semestersData.length === 0) {
    notFound(); // or you could show an empty state
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      {/* Page header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-8 sm:px-10 border-t-4 border-blue-800">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-gray-500">
                {meta.program} · Batch {p.batch} · {meta.shift} Program
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight uppercase tracking-wider mt-2 mb-2">
                Class Leaderboard
              </h1>
              <p className="mt-1 text-sm text-gray-700 font-medium max-w-2xl">
                Official repository of academic performance and class standings for {meta.section}.
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-[1800px] mx-auto px-2 sm:px-4 md:px-8 py-6 pb-16 mb-16">
        <BatchMetrics data={classData} />
        
        <div className="bg-white border-t border-b sm:border border-gray-300 px-4 sm:px-6 py-2 pb-6 mb-8">
          <DashboardTabs semesters={semestersData} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
