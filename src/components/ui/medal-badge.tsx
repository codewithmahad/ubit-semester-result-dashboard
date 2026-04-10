import React from "react"

export function CrownIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 19h20v2H2v-2zM2 6l5 7 5-9 5 9 5-7v11H2V6z" />
        </svg>
    )
}

export function DiamondIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <polygon points="12 2 22 9 18 20 6 20 2 9" />
        </svg>
    )
}

export function ShieldIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    )
}

export function MedalBadge({
    medalRank,
    displayNumber,
}: {
    medalRank: number | null
    displayNumber: number
}) {
    const num = String(displayNumber).padStart(2, "0")

    if (medalRank === 1) return (
        <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="bg-ubit-gold flex items-center justify-center w-5 h-5 rounded-[4px] shrink-0 shadow-sm">
                <CrownIcon className="w-3 h-3 text-white" />
            </span>
            <span className="text-ubit-gold font-bold text-[11px] tabular-nums">{num}</span>
        </div>
    )
    
    if (medalRank === 2) return (
        <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="bg-ubit-silver flex items-center justify-center w-5 h-5 rounded-[4px] shrink-0 shadow-sm">
                <DiamondIcon className="w-2.5 h-2.5 text-white" />
            </span>
            <span className="text-ubit-silver font-bold text-[11px] tabular-nums">{num}</span>
        </div>
    )
    
    if (medalRank === 3) return (
        <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="bg-ubit-bronze flex items-center justify-center w-5 h-5 rounded-[4px] shrink-0 shadow-sm">
                <ShieldIcon className="w-2.5 h-2.5 text-white" />
            </span>
            <span className="text-ubit-bronze font-bold text-[11px] tabular-nums">{num}</span>
        </div>
    )
    
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <span className="font-medium text-[13px] text-slate-500 tabular-nums">{num}</span>
        </div>
    )
}
