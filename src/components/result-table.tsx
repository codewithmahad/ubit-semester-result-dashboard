"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    SortingState,
    ColumnDef,
} from "@tanstack/react-table"
import { SemesterData } from "@/data/semester1"
import { calculateRankings, calculateCGPARankings, StudentRanking } from "@/lib/calculations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Search, CheckCircle2, ChevronUp, ChevronDown, XCircle } from "lucide-react"
import { StudentModal } from "@/components/student-modal"

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — Dark navy + premium muted medal palette
// ─────────────────────────────────────────────────────────────────────────────
const C = {
    // Base palette — dark navy, not plain black
    navy: "#0F172A",   // slate-950  — headers, rank chips
    navyMid: "#1E293B",   // slate-800  — header borders
    ink: "#1E293B",   // body text primary
    muted: "#64748B",   // slate-500  — secondary text, labels
    faint: "#94A3B8",   // slate-400  — very subtle labels
    line: "#E2E8F0",   // slate-200  — dividers

    // Medal palette — deep, dark, refined. Think Rolex not child's notebook.
    gold: "#8A6E14",   // muted antique gold
    goldBg: "#8A6E14",
    goldRow: "rgba(138,110,20,0.04)",

    silver: "#4B6280",   // steel blue-gray / gunmetal
    silverBg: "#4B6280",
    silverRow: "rgba(75,98,128,0.04)",

    bronze: "#6B4B28",   // antique bronze / dark copper
    bronzeBg: "#6B4B28",
    bronzeRow: "rgba(107,75,40,0.04)",
}

// ─────────────────────────────────────────────────────────────────────────────
// Medal SVGs
// ─────────────────────────────────────────────────────────────────────────────
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

// Medal icon chip
function MedalBadge({ cumulativeRank, semRank }: { cumulativeRank: number | null; semRank: number }) {
    const num = String(semRank).padStart(2, "0")

    if (cumulativeRank === 1) return (
        <div className="flex items-center gap-2">
            <span style={{ background: C.gold }} className="flex items-center justify-center w-6 h-6 rounded-md shrink-0">
                <CrownIcon className="w-3.5 h-3.5 text-white" />
            </span>
            <span style={{ color: C.gold }} className="font-bold text-[15px] tabular-nums">{num}</span>
        </div>
    )
    if (cumulativeRank === 2) return (
        <div className="flex items-center gap-2">
            <span style={{ background: C.silver }} className="flex items-center justify-center w-6 h-6 rounded-md shrink-0">
                <DiamondIcon className="w-3 h-3 text-white" />
            </span>
            <span style={{ color: C.silver }} className="font-bold text-[15px] tabular-nums">{num}</span>
        </div>
    )
    if (cumulativeRank === 3) return (
        <div className="flex items-center gap-2">
            <span style={{ background: C.bronze }} className="flex items-center justify-center w-6 h-6 rounded-md shrink-0">
                <ShieldIcon className="w-3 h-3 text-white" />
            </span>
            <span style={{ color: C.bronze }} className="font-bold text-[15px] tabular-nums">{num}</span>
        </div>
    )
    return <span className="font-medium text-[14px] text-slate-500 tabular-nums pl-8">{num}</span>
}

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────
interface ResultTableProps {
    data: SemesterData
    allSemData?: SemesterData[]
}

export function ResultTable({ data, allSemData }: ResultTableProps) {
    const [sorting, setSorting] = useState<SortingState>([{ id: "rank", desc: false }])
    const [globalFilter, setGlobalFilter] = useState("")
    const printRef = useRef<HTMLDivElement>(null)
    const [currentDate, setCurrentDate] = useState("")
    const [selectedStudent, setSelectedStudent] = useState<StudentRanking | null>(null)

    useEffect(() => { setCurrentDate(new Date().toLocaleDateString()) }, [])

    const rankedStudents = useMemo(() => calculateRankings(data.courses, data.students), [data])

    const cumulativeRankMap = useMemo(() => {
        const map = new Map<string, number>()
        if (!allSemData || allSemData.length < 2) return map
        calculateCGPARankings(allSemData[0], allSemData[1])
            .forEach(r => { if (r.rank !== undefined) map.set(r.roll, r.rank) })
        return map
    }, [allSemData])

    // ── Grade text color — refined, dark tones ────────────────────
    function gradeColor(grade: string) {
        if (grade === "F") return "#EF4444"  // red-500
        if (grade.startsWith("A")) return C.muted    // slate-500 — dark, calm
        if (grade.startsWith("B")) return "#7C8FA6"  // slightly lighter blue-gray
        return "#9EB0C4"                              // C/D — even lighter
    }

    // ── SGPA chip style ───────────────────────────────────────────
    function sgpaChip(sgpa: number, cr: number | undefined) {
        if (cr === 1) return { background: C.gold, color: "#fff" }
        if (cr === 2) return { background: C.silver, color: "#fff" }
        if (cr === 3) return { background: C.bronze, color: "#fff" }
        if (sgpa >= 3.8) return { background: C.navy, color: "#fff" }
        if (sgpa >= 2.0) return { background: "#F1F5F9", color: C.ink, border: "1px solid #CBD5E1" }
        return { background: "#FFF1F2", color: "#E11D48", border: "1px solid #FECDD3" }
    }

    // ── Row background ─────────────────────────────────────────────
    function rowBg(roll: string) {
        const cr = cumulativeRankMap.get(roll)
        if (cr === 1) return C.goldRow
        if (cr === 2) return C.silverRow
        if (cr === 3) return C.bronzeRow
        return "transparent"
    }

    // ── Column definitions ────────────────────────────────────────
    const columns = useMemo<ColumnDef<StudentRanking>[]>(() => {
        const baseCols: ColumnDef<StudentRanking>[] = [
            {
                accessorKey: "rank",
                header: () => <Th>Rank</Th>,
                cell: ({ row }) => (
                    <MedalBadge
                        cumulativeRank={cumulativeRankMap.get(row.original.roll) ?? null}
                        semRank={row.getValue("rank") as number}
                    />
                ),
            },
            {
                accessorKey: "roll",
                header: () => <Th>Roll No.</Th>,
                cell: ({ row }) => (
                    <span className="font-mono text-[11px] font-medium tracking-wide" style={{ color: C.muted }}>
                        {row.getValue("roll")}
                    </span>
                ),
            },
            {
                accessorKey: "name",
                header: () => <Th>Student Name</Th>,
                cell: ({ row }) => (
                    <span className="font-semibold text-[13px] tracking-tight" style={{ color: C.ink }}>
                        {row.getValue("name")}
                    </span>
                ),
            },
        ]

        const courseCols = data.courses.map((course): ColumnDef<StudentRanking> => ({
            id: course.code,
            enableSorting: false,  // no accidental re-sort on course headers
            header: () => (
                <div className="flex flex-col items-center text-center leading-tight">
                    <span className="text-[11px] font-bold tracking-wide" style={{ color: "#F1F5F9" }}>{course.code}</span>
                    <span className="text-[9px] font-medium uppercase tracking-widest mt-0.5" style={{ color: "#94A3B8" }}>{course.creditHours} cr</span>
                </div>
            ),
            accessorFn: row => row.results[course.code],
            cell: ({ getValue }) => {
                const res = getValue() as { marks: number; grade: string } | undefined
                if (!res) return <span className="text-slate-300 flex justify-center">–</span>
                return (
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[14px] tabular-nums font-semibold leading-tight" style={{ color: C.ink }}>{res.marks}</span>
                        <span className="text-[10px] tracking-wide mt-0.5 font-medium" style={{ color: gradeColor(res.grade) }}>{res.grade}</span>
                    </div>
                )
            },
        }))

        const endCols: ColumnDef<StudentRanking>[] = [
            {
                accessorKey: "totalMarks",
                header: () => <Th>Total</Th>,
                cell: ({ row }) => (
                    <span className="font-semibold text-[14px] tabular-nums" style={{ color: C.ink }}>
                        {row.getValue("totalMarks")}
                    </span>
                ),
            },
            {
                accessorKey: "sgpa",
                header: () => <Th>SGPA</Th>,
                cell: ({ row }) => {
                    const sgpa = row.getValue("sgpa") as number
                    const cr = cumulativeRankMap.get(row.original.roll)
                    const chip = sgpaChip(sgpa, cr)
                    return (
                        <span
                            style={chip}
                            className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[13px] font-bold tabular-nums"
                        >
                            {sgpa.toFixed(2)}
                        </span>
                    )
                },
            },
            {
                id: "status",
                enableSorting: false,
                header: () => <Th>Status</Th>,
                cell: ({ row }) => {
                    const failCount = Object.values(row.original.results)
                        .filter(r => r.grade === "F" || r.gradePoint === 0).length
                    if (failCount > 0) return (
                        <div className="flex items-center gap-1.5">
                            <XCircle className="w-3.5 h-3.5 shrink-0" style={{ color: C.faint }} />
                            <span className="text-[12px] font-semibold" style={{ color: C.muted }}>Fail <span style={{ color: C.faint }}>({failCount})</span></span>
                        </div>
                    )
                    return (
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#16A34A" }} />
                            <span className="text-[12px] font-semibold" style={{ color: "#15803D" }}>Pass</span>
                        </div>
                    )
                },
            },
        ]
        return [...baseCols, ...courseCols, ...endCols]
    }, [data.courses, cumulativeRankMap])

    const table = useReactTable({
        data: rankedStudents,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString",
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    const exportPDF = async () => {
        const element = printRef.current
        if (!element) return
        const html2pdf = (await import("html2pdf.js")).default
        html2pdf().set({
            margin: 0.3,
            filename: `${data.batch.replace(/[^a-zA-Z0-9]/g, "_")}_Result.pdf`,
            image: { type: "jpeg", quality: 1.0 },
            html2canvas: { scale: 3, useCORS: true },
            jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
        }).from(element).save()
    }

    // Sticky offsets: rank(90) | roll(130) | name(190)
    function thStickyClass(id: string) {
        if (id === "rank") return "max-sm:static sticky left-0 z-40"
        if (id === "roll") return "max-sm:static max-sm:shadow-none sticky left-[90px] z-40 shadow-[1px_0_0_#1E293B]"
        if (id === "name") return "max-sm:static max-sm:shadow-none sticky left-[220px] z-40 shadow-[2px_0_0_#1E293B]"
        return ""
    }
    function tdStickyClass(id: string) {
        if (id === "rank") return "max-sm:static sticky left-0 z-20"
        if (id === "roll") return "max-sm:static max-sm:shadow-none sticky left-[90px] z-20 shadow-[1px_0_0_#F1F5F9]"
        if (id === "name") return "max-sm:static max-sm:shadow-none sticky left-[220px] z-20 shadow-[2px_0_0_#F1F5F9]"
        return ""
    }
    function thStickyStyle(id: string): React.CSSProperties {
        if (id === "rank") return { width: 90, minWidth: 90, background: C.navy }
        if (id === "roll") return { width: 130, minWidth: 130, background: C.navy }
        if (id === "name") return { width: 190, minWidth: 190, background: C.navy }
        return {}
    }
    function tdStickyStyle(id: string, bg: string): React.CSSProperties {
        if (id === "rank") return { width: 90, minWidth: 90, background: bg || "#fff" }
        if (id === "roll") return { width: 130, minWidth: 130, background: bg || "#fff" }
        if (id === "name") return { width: 190, minWidth: 190, background: bg || "#fff" }
        return {}
    }

    return (
        <div className="space-y-3">
            {/* Controls — sticky below the tab bar */}
            <div className="sticky bg-white/95 backdrop-blur-sm py-2" style={{ top: 52, zIndex: 35 }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5" style={{ color: C.faint }} />
                        <Input
                            placeholder="Search name or roll number..."
                            value={globalFilter}
                            onChange={e => setGlobalFilter(e.target.value)}
                            className="pl-9 h-9 bg-white border-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-slate-400 rounded-lg text-[13px] font-medium text-slate-700"
                        />
                    </div>
                    <Button
                        onClick={exportPDF}
                        className="w-full sm:w-auto h-9 font-semibold text-[13px] px-5 rounded-lg tracking-tight transition-all"
                        style={{ background: C.navy, color: "#fff" }}
                    >
                        <Download className="w-3.5 h-3.5 mr-2" /> Download PDF
                    </Button>
                </div>
            </div>

            {/* Table card */}
            <div
                ref={printRef}
                className="rounded-xl overflow-hidden shadow-sm"
                style={{ border: "1px solid #E2E8F0" }}
            >
                {/* ── STICKY HEADER WRAPPER ─────────────────────────────
                    Key CSS trick: overflow-x:auto + overflow-y:clip
                    overflow-y:clip does NOT create a scroll container,
                    so position:sticky on thead is relative to the PAGE scroll,
                    not this wrapper. Horizontal scroll works via overflow-x:auto.
                ──────────────────────────────────────────────────────── */}
                <div style={{ overflowX: "auto", overflowY: "clip" }}>
                    <table className="w-full text-sm text-left align-middle border-separate border-spacing-0">

                        {/* DARK HEADER — sticky to top of scroll container */}
                        <thead style={{ position: "sticky", top: 0, zIndex: 20 }}>
                            {table.getHeaderGroups().map(hg => (
                                <tr key={hg.id} style={{ background: C.navy }}>
                                    {hg.headers.map(h => {
                                        const sortable = h.column.getCanSort()
                                        return (
                                            <th
                                                key={h.id}
                                                className={thStickyClass(h.id)}
                                                style={{
                                                    ...thStickyStyle(h.id),
                                                    borderBottom: `1px solid ${C.navyMid}`,
                                                    padding: "10px 16px",
                                                    userSelect: "none",
                                                    cursor: sortable ? "pointer" : "default",
                                                    background: thStickyStyle(h.id).background || C.navy,
                                                    whiteSpace: "nowrap",
                                                }}
                                                onClick={sortable ? h.column.getToggleSortingHandler() : undefined}
                                            >
                                                <div className="flex items-center gap-1">
                                                    {flexRender(h.column.columnDef.header, h.getContext())}
                                                    {sortable && (
                                                        <span style={{ opacity: h.column.getIsSorted() ? 1 : 0.25, transition: "opacity 0.15s" }}>
                                                            {h.column.getIsSorted() === "asc"
                                                                ? <ChevronUp className="w-3 h-3 text-slate-400" />
                                                                : <ChevronDown className="w-3 h-3 text-slate-400" />}
                                                        </span>
                                                    )}
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>

                        <tbody style={{ background: "#fff" }}>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map(row => {
                                    const bg = rowBg(row.original.roll)
                                    return (
                                        <tr
                                            key={row.id}
                                            onClick={() => setSelectedStudent(row.original)}
                                            style={{ background: bg, cursor: "pointer" }}
                                            className="group/row transition-colors hover:bg-slate-50"
                                        >
                                            {row.getVisibleCells().map(cell => (
                                                <td
                                                    key={cell.id}
                                                    className={tdStickyClass(cell.column.id)}
                                                    style={{
                                                        ...tdStickyStyle(cell.column.id, bg === "transparent" ? "#fff" : bg),
                                                        padding: "12px 16px",
                                                        borderBottom: "1px solid #F1F5F9",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} style={{ padding: "56px 0", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>
                                        <div className="flex flex-col items-center" style={{ color: C.faint }}>
                                            <Search className="h-6 w-6 mb-2 opacity-30" />
                                            <p className="text-[13px] font-semibold text-slate-700">No students found</p>
                                            <p className="text-[11px] mt-0.5">Try adjusting your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer bar — legend + date */}
                <div
                    style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "8px 20px", fontSize: 11, color: C.faint, letterSpacing: "0.06em", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        {[
                            { label: "Gold", color: C.gold, icon: <CrownIcon className="w-2.5 h-2.5" /> },
                            { label: "Silver", color: C.silver, icon: <DiamondIcon className="w-2.5 h-2.5" /> },
                            { label: "Bronze", color: C.bronze, icon: <ShieldIcon className="w-2.5 h-2.5" /> },
                        ].map(m => (
                            <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <span style={{ background: m.color, color: "#fff", borderRadius: 4, padding: "2px 4px", display: "flex" }}>{m.icon}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.faint }}>{m.label}</span>
                            </div>
                        ))}
                        <span style={{ color: "#CBD5E1", fontSize: 10 }}>— Cumulative GPA rank</span>
                    </div>
                    <span>{data.university} · {currentDate || "—"}</span>
                </div>
            </div>



            <StudentModal
                student={selectedStudent}
                courses={data.courses}
                open={!!selectedStudent}
                onOpenChange={open => !open && setSelectedStudent(null)}
                cumulativeRank={selectedStudent ? (cumulativeRankMap.get(selectedStudent.roll) ?? null) : null}
            />
        </div>
    )
}

// ── Tiny header label helper ───────────────────────────────────
function Th({ children }: { children: React.ReactNode }) {
    return (
        <span style={{ color: "#F1F5F9", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {children}
        </span>
    )
}
