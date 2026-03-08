import { DashboardTabs } from "@/components/dashboard-tabs"
import { GraduationCap } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="w-full xl:max-w-[95%] 2xl:max-w-[1920px] mx-auto space-y-8">

        <header className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-indigo-100 bg-white mb-8">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-600 mix-blend-multiply" />

          <svg className="absolute top-0 right-0 h-full w-2/3 pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="currentColor" className="text-white" points="50,0 100,0 100,100 20,100" />
            <polygon fill="currentColor" className="text-indigo-300" points="70,0 100,0 100,100 40,100" />
          </svg>

          <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center justify-center space-x-2 text-indigo-100 font-semibold mb-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <GraduationCap className="w-5 h-5" />
                <span className="uppercase tracking-widest text-xs">Department of Computer Science (UBIT)</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md leading-tight">
                Academic Result <span className="text-indigo-200">Dashboard</span>
              </h1>
              <p className="text-indigo-100 mt-4 text-base sm:text-lg max-w-xl leading-relaxed opacity-90">
                Real-time tracking of semester GPAs, batch rankings, and comprehensive performance metrics. Export high-quality result sheets instantly.
              </p>
            </div>
          </div>
        </header>

        <section>
          <DashboardTabs />
        </section>

      </div>
    </main>
  )
}
