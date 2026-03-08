import { DashboardTabs } from "@/components/dashboard-tabs"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-zinc-900 selection:text-white">

      {/* Premium Hero Header */}
      <header className="w-full px-2 sm:px-3 pt-3 pb-0">
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #1e2a5e 100%)", minHeight: 180 }}
        >
          {/* Geometric decorative diagonals */}
          <svg className="absolute right-0 top-0 h-full opacity-20 pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="xMaxYMid slice" style={{ width: "55%" }}>
            <polygon points="120,0 400,0 400,200 220,200" fill="rgba(255,255,255,0.06)" />
            <polygon points="180,0 400,0 400,200 300,200" fill="rgba(255,255,255,0.05)" />
            <polygon points="260,0 400,0 400,200 360,200" fill="rgba(255,255,255,0.04)" />
          </svg>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between px-8 sm:px-12 py-10 gap-6">
            <div className="flex flex-col gap-4 max-w-xl">
              {/* Badge */}
              <div className="flex items-center gap-2 w-fit">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg>
                  Department of Computer Science (UBIT)
                </div>
              </div>

              {/* Title */}
              <h1
                className="font-black leading-[1.0] tracking-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "rgba(255,255,255,0.90)" }}
              >
                Academic Result<br />Dashboard
              </h1>

              {/* Subtitle */}
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", maxWidth: 420 }}>
                A dedicated page for our BSSE Batch 2025 (Evening Program) class — all semester results
                clearly organized and formatted in one place for easy reference.
              </p>
            </div>

            {/* Logo */}
            <div
              className="shrink-0 hidden sm:flex items-center justify-center w-36 h-36 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <Image
                src="/ubit-logo.jpg"
                alt="UBIT"
                width={120}
                height={120}
                className="object-contain rounded-xl"
                priority
              />
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
