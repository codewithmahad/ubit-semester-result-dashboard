import { DashboardTabs } from "@/components/dashboard-tabs"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-zinc-900 selection:text-white">

      {/* Compact Hero Header */}
      <header className="relative w-full border-b border-zinc-100 bg-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="max-w-[1800px] mx-auto px-6 sm:px-10 py-8 flex items-center gap-6 relative z-10">
            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-1 ring-zinc-200 bg-white shadow-md overflow-hidden flex items-center justify-center">
              <Image
                src="/ubit-logo.jpg"
                alt="UBIT"
                width={80}
                height={80}
                className="object-contain mix-blend-multiply p-1"
                priority
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">DCS · UBIT · University of Karachi</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tighter leading-tight">
                Semester Result Dashboard
              </h1>
              <p className="text-sm font-medium text-zinc-400 mt-0.5 tracking-tight">
                BSSE Batch 2025 — Evening Program
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - no padding / max-w constraints so table fills the full viewport */}
      <div className="max-w-[1800px] mx-auto px-2 sm:px-3 pt-3 pb-4">
        <DashboardTabs />
      </div>

    </main>
  )
}
