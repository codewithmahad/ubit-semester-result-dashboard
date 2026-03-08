import { DashboardTabs } from "@/components/dashboard-tabs"
import { GraduationCap } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center justify-center space-x-2 text-indigo-600 font-semibold mb-2">
              <GraduationCap className="w-5 h-5" />
              <span className="uppercase tracking-wider text-xs">Academic Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Semester Dashboard</h1>
            <p className="text-slate-500 mt-2 text-base max-w-xl leading-relaxed">
              Review grades, automatically calculate SGPA across courses, visualize rankings, and instantly export high-quality PDF reports.
            </p>
          </div>
        </header>

        <section>
          <DashboardTabs />
        </section>

      </div>
    </main>
  )
}
