"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import type { StudentRanking, Course } from "@/types"
import { Badge } from "@/components/ui/badge"
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from "recharts"
import { useMemo } from "react"
import { CheckCircle2 } from "lucide-react"

// ── Medal SVGs ─────────────────────────────────────────────────
function CrownIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 19h20v2H2v-2zM2 6l5 7 5-9 5 9 5-7v11H2V6z" />
        </svg>
    )
}
function DiamondIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <polygon points="12 2 22 9 18 20 6 20 2 9" />
        </svg>
    )
}
function ShieldIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    )
}

// ── Resizable Panel Hook ───────────────────────────────────────
function useResizable(initial: number, min: number, max: number) {
    const [width, setWidth] = useState(initial)
    const dragging = useRef(false)
    const startX = useRef(0)
    const startW = useRef(0)

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        dragging.current = true
        startX.current = e.clientX
        startW.current = width
        document.body.style.userSelect = "none"
        document.body.style.cursor = "col-resize"
    }, [width])

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!dragging.current) return
            const delta = startX.current - e.clientX
            setWidth(Math.min(max, Math.max(min, startW.current + delta)))
        }
        const onUp = () => {
            dragging.current = false
            document.body.style.userSelect = ""
            document.body.style.cursor = ""
        }
        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", onUp)
        return () => {
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseup", onUp)
        }
    }, [min, max])

    return { width, onMouseDown }
}

// ── Medal config — restrained dark palette ────────────────────
type MedalRank = 1 | 2 | 3

const MEDAL = {
    1: {
        iconBg: "#8A6E14",   // antique gold — dark, muted, premium
        icon: <CrownIcon className="w-3.5 h-3.5 text-white" />,
        label: "Gold Medalist",
        labelColor: "#8A6E14",
        rankBg: "#8A6E14",
        rankText: "#fff",
        sgpaStyle: { background: "#8A6E14", color: "#fff" },
        cardBg: "#FDFAF3",
        cardBorder: "#D4B96A",
        leftAccent: "#8A6E14",
        subText: "#A08830",
    },
    2: {
        iconBg: "#4B6280",   // gunmetal steel blue-gray
        icon: <DiamondIcon className="w-3 h-3 text-white" />,
        label: "Silver Medalist",
        labelColor: "#4B6280",
        rankBg: "#4B6280",
        rankText: "#fff",
        sgpaStyle: { background: "#4B6280", color: "#fff" },
        cardBg: "#F6F8FA",
        cardBorder: "#96ADC4",
        leftAccent: "#4B6280",
        subText: "#6A8099",
    },
    3: {
        iconBg: "#6B4B28",   // antique bronze / dark copper
        icon: <ShieldIcon className="w-3 h-3 text-white" />,
        label: "Bronze Medalist",
        labelColor: "#6B4B28",
        rankBg: "#6B4B28",
        rankText: "#fff",
        sgpaStyle: { background: "#6B4B28", color: "#fff" },
        cardBg: "#FDF8F4",
        cardBorder: "#C49B74",
        leftAccent: "#6B4B28",
        subText: "#906240",
    },
}

// ── Props ──────────────────────────────────────────────────────
interface StudentModalProps {
    student: StudentRanking | null
    courses: Course[]
    open: boolean
    onOpenChange: (open: boolean) => void
    cumulativeRank?: number | null
}

export function StudentModal({ student, courses, open, onOpenChange, cumulativeRank }: StudentModalProps) {
    const { width, onMouseDown } = useResizable(440, 360, 720)

    const radarData = useMemo(() => {
        if (!student) return []
        return courses.map(course => ({
            subject: course.code,
            marks: student.results[course.code]?.marks || 0
        }))
    }, [student, courses])

    if (!student) return null

    const medalRank = (cumulativeRank === 1 || cumulativeRank === 2 || cumulativeRank === 3)
        ? cumulativeRank as MedalRank
        : null
    const medal = medalRank ? MEDAL[medalRank] : null
    const passed = student.sgpa >= 2.0

    const sgpaStyle: React.CSSProperties = medal
        ? medal.sgpaStyle as React.CSSProperties
        : student.sgpa >= 3.8 ? { background: "#0F172A", color: "#fff" }
            : student.sgpa >= 2.0 ? { background: "#F1F5F9", color: "#334155", border: "1px solid #CBD5E1" }
                : { background: "#FFF1F2", color: "#E11D48", border: "1px solid #FECDD3" }

    function gradeColor(grade: string): React.CSSProperties {
        if (grade === "F") return { background: "#FFF1F2", color: "#E11D48", border: "1px solid #FECDD3" }
        if (grade.startsWith("A")) return { background: "#F8FAFC", color: "#334155", border: "1px solid #CBD5E1" }
        if (grade.startsWith("B")) return { background: "#F8FAFC", color: "#475569", border: "1px solid #E2E8F0" }
        return { background: "#F8FAFC", color: "#64748B", border: "1px solid #E2E8F0" }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                style={{ width: "100%", maxWidth: `${width}px` }}
                className="p-0 flex flex-col overflow-hidden bg-white sm:border-l border-zinc-200 shadow-2xl"
            >
                {/* Resize Handle - hidden on mobile */}
                <div
                    onMouseDown={onMouseDown}
                    className="absolute left-0 top-0 h-full w-1.5 cursor-col-resize z-50 group hidden sm:block"
                >
                    <div className="w-px h-10 bg-zinc-200 group-hover:bg-zinc-400 rounded-full absolute left-0.5 top-1/2 -translate-y-1/2 transition-all duration-200" />
                </div>

                {/* ── Header ─────────────────────────────────── */}
                <SheetHeader className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pr-12 pr-10 border-b border-zinc-100 shrink-0 bg-white text-left">
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="min-w-0 flex-1">
                            {medal && (
                                <div className="flex items-center gap-1.5 mb-2">
                                    <div className="flex items-center justify-center w-4 h-4 rounded" style={{ background: medal.iconBg }}>
                                        {medal.icon}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${medal.labelColor}`}>
                                        {medal.label}
                                    </span>
                                </div>
                            )}
                            <SheetTitle className="text-[17px] font-bold text-zinc-950 tracking-tight leading-snug">
                                {student.name}
                            </SheetTitle>
                            <SheetDescription className="font-mono text-[11px] font-medium text-zinc-400 tracking-wider mt-0.5">
                                {student.roll}
                            </SheetDescription>
                        </div>

                        {student.rank && (
                            <div
                                className="flex flex-col items-center justify-center rounded-xl shrink-0 px-2 sm:px-3 py-1.5 sm:py-2"
                                style={medal ? { background: medal.rankBg, border: "none" } : { background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                            >
                                <span className="text-[7px] sm:text-[8px] uppercase font-bold tracking-[0.2em] leading-none" style={{ color: medal ? "rgba(255,255,255,0.6)" : "#94A3B8" }}>
                                    Sem.&nbsp;Rank
                                </span>
                                <span className="text-[18px] sm:text-[22px] font-black leading-tight tabular-nums" style={{ color: medal ? medal.rankText : "#0F172A" }}>
                                    #{student.rank}
                                </span>
                            </div>
                        )}
                    </div>
                </SheetHeader>

                {/* ── Content ────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3 styled-scrollbar">

                    {/* SGPA + Marks */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 flex flex-col items-center gap-1.5">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">SGPA</span>
                            <div className={`text-[26px] font-black tabular-nums tracking-tight leading-none px-4 py-1.5 rounded-xl`} style={sgpaStyle}>
                                {student.sgpa.toFixed(2)}
                            </div>
                        </div>
                        <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 flex flex-col items-center gap-1.5">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">Marks</span>
                            <span className="text-[32px] font-black tabular-nums tracking-tight text-zinc-950 leading-none">
                                {student.totalMarks}
                            </span>
                        </div>
                    </div>

                    {/* Medal card — clean, no color flood */}
                    {medal && (
                        <div
                            className="rounded-xl border p-3.5"
                            style={{
                                background: medal.cardBg,
                                borderColor: medal.cardBorder,
                                borderLeftColor: medal.leftAccent,
                                borderLeftWidth: 3,
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style={{ background: medal.iconBg }}>
                                    {medal.icon}
                                </div>
                                <div>
                                    <div className="text-[13px] font-bold tracking-tight" style={{ color: medal.labelColor }}>
                                        #{cumulativeRank} Overall · {medal.label}
                                    </div>
                                    <div className="text-[11px] font-medium mt-0.5" style={{ color: medal.subText }}>
                                        Ranked by cumulative GPA across all semesters
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Passed — non-medalist */}
                    {passed && !medal && (
                        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0" />
                            <div>
                                <div className="text-[13px] font-bold text-zinc-800 tracking-tight">Passed</div>
                                <div className="text-[11px] font-medium text-zinc-400 mt-0.5">Semester completed successfully</div>
                            </div>
                        </div>
                    )}

                    {/* Radar */}
                    <div className="bg-white rounded-xl border border-zinc-100">
                        <div className="px-4 pt-3.5 pb-1 flex items-center gap-2">
                            <svg className="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Performance Radar</span>
                        </div>
                        <div className="h-52 w-full px-2 pb-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData}>
                                    <PolarGrid stroke="#f4f4f5" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 600 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #f4f4f5', backgroundColor: '#fff', fontSize: 12, fontWeight: 700, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                                        itemStyle={{ color: '#09090b' }}
                                    />
                                    <Radar name="Marks" dataKey="marks" stroke="#18181b" strokeWidth={2} fill="#18181b" fillOpacity={0.06} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Course breakdown */}
                    <div className="bg-white rounded-xl border border-zinc-100 overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-zinc-100">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Course Breakdown</span>
                        </div>
                        <div className="divide-y divide-zinc-50">
                            {courses.map(course => {
                                const res = student.results[course.code]
                                return (
                                    <div key={course.code} className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50/60 transition-colors">
                                        <div className="flex flex-col min-w-0 pr-3">
                                            <span className="text-[13px] font-semibold text-zinc-900 tracking-tight leading-tight">{course.code}</span>
                                            <span className="text-[10px] font-medium text-zinc-400 truncate leading-tight mt-0.5">{course.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 shrink-0">
                                            <span className="text-[15px] font-semibold text-zinc-900 tabular-nums w-8 text-right">
                                                {res ? res.marks : "–"}
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="w-10 h-6 justify-center rounded-lg font-bold text-[10px] tracking-wide"
                                                style={res ? gradeColor(res.grade) : { background: "#F8FAFC", color: "#94A3B8", border: "1px solid #E2E8F0" }}
                                            >
                                                {res ? res.grade : "–"}
                                            </Badge>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </SheetContent>
        </Sheet>
    )
}
