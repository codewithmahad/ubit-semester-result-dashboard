import { notFound } from "next/navigation";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { Nav } from "@/components/nav";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ batch: string; section: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  return {
    title: `Class ${p.batch} (${p.section}) — Leaderboard`,
    description: `Academic results and rankings for BSSE Batch ${p.batch} ${p.section} program.`,
  };
}

export default async function ClassLeaderboardPage({ params }: Props) {
  const p = await params;
  // Only serve the one class we have data for
  if (p.batch !== "2025" || p.section !== "evening") {
    notFound();
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
                BSSE · Batch {p.batch} · {p.section} Program
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight uppercase tracking-wider mt-2 mb-2">
                Class Leaderboard
              </h1>
              <p className="mt-1 text-sm text-gray-700 font-medium max-w-2xl">
                Official repository of academic performance and class standings.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto px-0 sm:px-6 py-6 sm:py-8">
        <div className="bg-white border-t border-b sm:border border-gray-300 px-4 sm:px-6 py-2 pb-6 max-h-[calc(100vh-10rem)]">
          <DashboardTabs />
        </div>
      </main>
    </div>
  );
}
