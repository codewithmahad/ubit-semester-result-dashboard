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
import type { RawSemesterData, CGPARanking, StudentRanking } from "@/types"
import { calculateCGPARankings, calculateRankings } from "@/lib/utils/academic-math"
import { Download, Search, CheckCircle2, XCircle, ChevronUp, ChevronDown } from "lucide-react"
import { StudentModal } from "@/components/student-modal"
import { TableEmptyState } from "@/components/table-empty-state"
import { saveToRecentViews } from "@/lib/recent-views"

import { MedalBadge, CrownIcon, DiamondIcon, ShieldIcon } from "@/components/ui/medal-badge"
interface CGPATableProps {
    semesters: RawSemesterData[]
    tabsList?: React.ReactNode
}

export function CGPATable({ semesters, tabsList }: CGPATableProps) {
    const [sorting, setSorting] = useState<SortingState>([{ id: "rank", desc: false }])
    const [globalFilter, setGlobalFilter] = useState("")
    const printRef = useRef<HTMLDivElement>(null)
    const [currentDate, setCurrentDate] = useState("")
    const [selectedStudent, setSelectedStudent] = useState<StudentRanking | null>(null)

    useEffect(() => { setCurrentDate(new Date().toLocaleDateString()) }, [])

    const rankedStudents = useMemo(() => calculateCGPARankings(semesters), [semesters])

    const columns = useMemo<ColumnDef<CGPARanking>[]>(() => {
        const baseCols: ColumnDef<CGPARanking>[] = [
            {
                accessorKey: "rank",
                header: () => <Th>Final Rank</Th>,
                cell: ({ row }) => <MedalBadge medalRank={row.getValue("rank") as number} displayNumber={row.getValue("rank") as number} />,
            },
            {
                accessorKey: "roll",
                header: () => <Th>Roll No.</Th>,
                cell: ({ row }) => (
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wide text-ubit-muted">
                        {row.getValue("roll")}
                    </span>
                ),
            },
            {
                accessorKey: "name",
                header: () => <Th>Student Name</Th>,
                cell: ({ row }) => (
                    <span className="font-bold text-[11px] sm:text-[13px] tracking-tight text-ubit-ink">
                        {row.getValue("name")}
                    </span>
                ),
            },
        ];

        const semCols: ColumnDef<CGPARanking>[] = semesters.map((sem, idx) => ({
            id: `sem${idx}`,
            header: () => <Th>{sem.name.split(' ').slice(1).join(' ')} SGPA</Th>,
            cell: ({ row }) => {
                const stat = row.original.semesterStats?.find(s => s.name === sem.name);
                const v = stat ? stat.sgpa : 0;
                return (
                    <div className="flex justify-center items-center w-full">
                        {v === 0
                            ? <span className="text-ubit-faint">–</span>
                            : <span className="font-bold text-[11px] sm:text-[13px] tabular-nums text-ubit-ink">{v.toFixed(2)}</span>}
                    </div>
                )
            },
        }));

        const endCols: ColumnDef<CGPARanking>[] = [
            {
                accessorKey: "totalMarks",
                header: () => <Th>Grand Total</Th>,
                cell: ({ row }) => (
                    <div className="flex justify-center items-center w-full">
                        <span className="font-bold text-[12px] sm:text-[14px] tabular-nums text-ubit-ink">
                            {row.getValue("totalMarks")}
                        </span>
                    </div>
                ),
            },
            {
                accessorKey: "cgpa",
                header: () => <Th>Cumulative GPA</Th>,
                cell: ({ row }) => {
                    const cgpa = row.getValue("cgpa") as number
                    const rank = row.original.rank || 0
                    const chipClass =
                        rank === 1 ? "bg-ubit-gold text-white" :
                            rank === 2 ? "bg-ubit-silver text-white" :
                                rank === 3 ? "bg-ubit-bronze text-white" :
                                    cgpa >= 3.8 ? "bg-ubit-navy text-white" :
                                        cgpa >= 2.0 ? "bg-slate-100 text-ubit-ink border border-slate-300" :
                                            "bg-rose-50 text-rose-600 border border-rose-200"
                    return (
                        <div className="flex justify-center items-center w-full">
                            <span
                                className={`inline-flex items-center justify-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[11px] sm:text-[13px] font-bold tabular-nums ${chipClass}`}
                            >
                                {cgpa.toFixed(2)}
                            </span>
                        </div>
                    )
                },
            },
            {
                id: "status",
                enableSorting: false,
                header: () => <Th>Status</Th>,
                cell: ({ row }) => {
                    const cgpa = row.original.cgpa
                    if (cgpa >= 2.0) return (
                        <div className="flex justify-center items-center gap-1.5 w-full">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#16A34A" }} />
                            <span className="text-[12px] font-semibold" style={{ color: "#15803D" }}>Pass</span>
                        </div>
                    )
                    return (
                        <div className="flex justify-center items-center gap-1.5 w-full">
                            <XCircle className="w-3.5 h-3.5 shrink-0 text-ubit-faint" />
                            <span className="text-[12px] font-semibold text-ubit-muted">Fail</span>
                        </div>
                    )
                },
            },
        ];

        return [...baseCols, ...semCols, ...endCols];
    }, [semesters])

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
            filename: "UBIT_Cumulative_Result.pdf",
            image: { type: "jpeg", quality: 1.0 },
            html2canvas: { scale: 3, useCORS: true },
            jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
        }).from(element).save()
    }

    // Row background
    function rowBgClass(rank: number) {
        if (rank === 1) return "bg-ubit-goldrow"
        if (rank === 2) return "bg-ubit-silverrow"
        if (rank === 3) return "bg-ubit-bronzerow"
        return ""
    }

    // Sticky col px offsets — rank(90) + roll(130) + name(220)
    function thStickyClass(id: string) {
        if (id === "rank") return "bg-ubit-navy w-[52px] min-w-[52px] sm:w-[90px] sm:min-w-[90px] max-md:static sticky left-0 z-30 shadow-[1px_0_0_#1E293B]"
        if (id === "roll") return "bg-ubit-navy w-[100px] min-w-[100px] sm:w-[130px] sm:min-w-[130px] max-md:static max-md:shadow-none sticky left-[90px] z-30 shadow-[2px_0_0_#1E293B]"
        if (id === "name") return "bg-ubit-navy w-[160px] min-w-[160px] sm:w-[220px] sm:min-w-[220px] max-md:static max-md:shadow-none sticky left-[220px] z-30 shadow-[2px_0_0_#1E293B]"
        return ""
    }
    function tdStickyClass(id: string, bgClass?: string) {
        if (id === "rank") return `${bgClass || "bg-white"} w-[52px] min-w-[52px] sm:w-[90px] sm:min-w-[90px] max-md:static sticky left-0 z-10 shadow-[1px_0_0_#F1F5F9]`
        if (id === "roll") return `${bgClass || "bg-white"} w-[100px] min-w-[100px] sm:w-[130px] sm:min-w-[130px] max-md:static max-md:shadow-none sticky left-[90px] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]`
        if (id === "name") return `${bgClass || "bg-white"} w-[160px] min-w-[160px] sm:w-[220px] sm:min-w-[220px] max-md:static max-md:shadow-none sticky left-[220px] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]`
    }
    return (
        <div className="space-y-3 relative z-10 w-full overflow-hidden">
            {/* ── Floating Premium Controls ────────────────────────────── */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-transparent pb-3">
                {/* Search */}
                <div className="relative w-full md:w-[280px] group order-2 md:order-1 flex-shrink-0">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#8F141B] transition-colors" />
                    <input
                        placeholder="Search name or roll number..."
                        value={globalFilter}
                        onChange={e => setGlobalFilter(e.target.value)}
                        className="w-full h-[46px] pl-[42px] pr-4 text-[13px] font-medium text-gray-700 placeholder:text-gray-400 bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] outline-none focus:border-[#8F141B]/40 focus:ring-4 focus:ring-[#8F141B]/10 transition-all"
                    />
                </div>

                {/* Tabs Center */}
                <div className="flex justify-center order-1 md:order-2 w-full md:w-auto">
                    {tabsList}
                </div>

                {/* Download */}
                <button
                    onClick={exportPDF}
                    className="no-print inline-flex items-center justify-center gap-2 h-[46px] px-6 bg-ubit-navy hover:bg-[#2a3040] text-white text-[13px] font-bold tracking-wide rounded-xl shadow-[0_2px_10px_-4px_rgba(31,36,50,0.4)] transition-all hover:shadow-lg active:scale-[0.98] shrink-0 order-3 w-full md:w-auto"
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </button>
            </div>

            {/* ── Table Card ──────────────────────────────────────── */}
            <div
                ref={printRef}
                className="bg-white rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative"
            >
                {/* Scrollbar top right corner fix */}
                <div className="absolute top-0 right-0 w-[6px] h-[36px] md:h-[41px] bg-ubit-navy rounded-tr-2xl z-30 pointer-events-none" />

                <div className="overflow-auto max-h-[70vh] w-full styled-scrollbar rounded-2xl" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <table className="w-full text-sm text-left align-middle border-separate border-spacing-0">

                        <thead className="sticky top-0 z-20">
                            {table.getHeaderGroups().map(hg => (
                                <tr key={hg.id} className="bg-ubit-navy">
                                    {hg.headers.map(h => {
                                        const sortable = h.column.getCanSort()
                                        return (
                                            <th
                                                key={h.id}
                                                className={`${thStickyClass(h.id)} max-md:px-2.5 max-md:py-2 md:px-4 md:py-2.5`}
                                                style={{
                                                    userSelect: "none",
                                                    cursor: sortable ? "pointer" : "default",
                                                    whiteSpace: "nowrap",
                                                }}
                                                onClick={sortable ? h.column.getToggleSortingHandler() : undefined}
                                            >
                                                <div className={`flex items-center ${["roll", "name"].includes(h.id) ? "justify-start" : "justify-center"} gap-1`}>
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
                                    const rank = row.original.rank || 0
                                    const bgClass = rowBgClass(rank)
                                    return (
                                        <tr
                                            key={row.id}
                                            onClick={() => {
                                                const studentRaw = semesters[0]?.students?.find(s => s.roll === row.original.roll)
                                                if (studentRaw) {
                                                    const s1RankItem = calculateRankings(semesters[0].courses, semesters[0].students).find(s => s.roll === row.original.roll)
                                                    setSelectedStudent(s1RankItem || null)
                                                    
                                                    // Save to recent views
                                                    saveToRecentViews({
                                                      roll: row.original.roll,
                                                      name: row.original.name,
                                                      batch: semesters[0]?.batch.split(" ")[0] || "2025",
                                                      shift: semesters[0]?.batch.includes("Morning") ? "Morning" : "Evening"
                                                    })
                                                }
                                            }}
                                            style={{ cursor: "pointer" }}
                                            className={`group/row transition-colors hover:bg-slate-50 ${bgClass || "bg-white"}`}
                                        >
                                            {row.getVisibleCells().map(cell => (
                                                <td
                                                    key={cell.id}
                                                    className={`${tdStickyClass(cell.column.id, bgClass)} max-md:px-2.5 max-md:py-2.5 md:px-4 md:py-3`}
                                                    style={{
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
                                    <td colSpan={columns.length} className="border-b border-zinc-100">
                                        <TableEmptyState onReset={() => setGlobalFilter("")} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer — legend + date */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border-t border-slate-200 py-2 px-5 text-[11px] text-ubit-faint tracking-wider">
                    <div className="flex items-center gap-3">
                        {[
                            { label: "Gold", colorClass: "bg-ubit-gold", icon: <CrownIcon className="w-2.5 h-2.5 text-white" /> },
                            { label: "Silver", colorClass: "bg-ubit-silver", icon: <DiamondIcon className="w-2.5 h-2.5 text-white" /> },
                            { label: "Bronze", colorClass: "bg-ubit-bronze", icon: <ShieldIcon className="w-2.5 h-2.5 text-white" /> },
                        ].map(m => (
                            <div key={m.label} className="flex items-center gap-1.5">
                                <span className={`${m.colorClass} rounded px-1 py-0.5 flex items-center`}>{m.icon}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-ubit-faint">{m.label}</span>
                            </div>
                        ))}
                        <span className="text-slate-300 text-[10px]">— Cumulative GPA rank</span>
                    </div>
                    <span>{semesters[0]?.university ?? "UBIT - University of Karachi"} · {currentDate || "—"}</span>
                </div>
            </div>

            <StudentModal
                student={selectedStudent}
                courses={semesters[0]?.courses || []}
                open={!!selectedStudent}
                onOpenChange={(o) => { if (!o) setSelectedStudent(null) }}
                cumulativeRank={selectedStudent ? rankedStudents.find(r => r.roll === selectedStudent.roll)?.rank || null : null}
            />
        </div>
    )
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <span style={{ color: "#F1F5F9", fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>
            {children}
        </span>
    )
}
