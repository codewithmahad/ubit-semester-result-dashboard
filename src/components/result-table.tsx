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
import type { RawSemesterData, StudentRanking } from "@/types"
import { calculateRankings, calculateCGPARankings } from "@/lib/utils/academic-math"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Search, CheckCircle2, ChevronUp, ChevronDown, XCircle } from "lucide-react"
import { StudentModal } from "@/components/student-modal"

import { getGradeColor } from "@/lib/utils/academic-math"
import { MedalBadge, CrownIcon, DiamondIcon, ShieldIcon } from "@/components/ui/medal-badge"

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────
interface ResultTableProps {
    data: RawSemesterData
    allSemData?: RawSemesterData[]
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

    // ── Grade text color — semantic ────────────────────────────
    function gradeColor(grade: string) {
        if (grade === "F") return "text-ubit-grade-fail"
        if (grade.startsWith("A")) return "text-ubit-grade-a"
        if (grade.startsWith("B")) return "text-ubit-grade-b"
        return "text-ubit-grade-c"
    }

    // ── SGPA chip style ───────────────────────────────────────────
    function sgpaChipClass(sgpa: number, cr: number | undefined) {
        if (cr === 1) return "bg-ubit-gold text-white"
        if (cr === 2) return "bg-ubit-silver text-white"
        if (cr === 3) return "bg-ubit-bronze text-white"
        if (sgpa >= 3.8) return "bg-ubit-navy text-white"
        if (sgpa >= 2.0) return "bg-slate-100 text-ubit-ink border border-slate-300"
        return "bg-rose-50 text-rose-600 border border-rose-200"
    }

    // ── Row background ─────────────────────────────────────────────
    function rowBgClass(roll: string) {
        const cr = cumulativeRankMap.get(roll)
        if (cr === 1) return "bg-ubit-goldrow"
        if (cr === 2) return "bg-ubit-silverrow"
        if (cr === 3) return "bg-ubit-bronzerow"
        return ""
    }

    // ── Column definitions ────────────────────────────────────────
    const columns = useMemo<ColumnDef<StudentRanking>[]>(() => {
        const baseCols: ColumnDef<StudentRanking>[] = [
            {
                accessorKey: "rank",
                header: () => <Th>Rank</Th>,
                cell: ({ row }) => (
                    <MedalBadge
                        medalRank={cumulativeRankMap.get(row.original.roll) ?? null}
                        displayNumber={row.getValue("rank") as number}
                    />
                ),
            },
            {
                accessorKey: "roll",
                header: () => <Th>Seat No.</Th>,
                cell: ({ row }) => (
                    <span className="font-mono text-[11px] sm:text-[13px] font-bold tracking-wide text-ubit-ink">
                        {row.getValue("roll")}
                    </span>
                ),
            },
        ]

        const courseCols = data.courses.map((course): ColumnDef<StudentRanking> => ({
            id: course.code,
            enableSorting: false,  // no accidental re-sort on course headers
            header: () => (
                <div className="flex flex-col items-center text-center leading-tight">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wide" style={{ color: "#F1F5F9" }}>{course.code}</span>
                    <span className="text-[8px] sm:text-[9px] font-medium uppercase tracking-widest mt-0.5" style={{ color: "#94A3B8" }}>{course.creditHours} cr</span>
                </div>
            ),
            accessorFn: row => row.results[course.code],
            cell: ({ getValue }) => {
                const res = getValue() as { marks: number; grade: string } | undefined
                if (!res) return <span className="text-slate-300 flex justify-center">–</span>
                return (
                    <div className="flex flex-col items-center text-center w-full">
                        <span className="text-[12px] sm:text-[14px] tabular-nums font-bold leading-tight text-ubit-ink">{res.marks}</span>
                        <span className={`text-[9px] sm:text-[10px] tracking-wide mt-0.5 font-bold ${gradeColor(res.grade)}`}>{res.grade}</span>
                    </div>
                )
            },
        }))

        const endCols: ColumnDef<StudentRanking>[] = [
            {
                accessorKey: "totalMarks",
                header: () => <Th>Total</Th>,
                cell: ({ row }) => (
                    <div className="flex justify-center items-center w-full">
                        <span className="font-bold text-[12px] sm:text-[14px] tabular-nums text-ubit-ink">
                            {row.getValue("totalMarks")}
                        </span>
                    </div>
                ),
            },
            {
                accessorKey: "sgpa",
                header: () => <Th>SGPA</Th>,
                cell: ({ row }) => {
                    const sgpa = row.getValue("sgpa") as number
                    const cr = cumulativeRankMap.get(row.original.roll)
                    const chip = sgpaChipClass(sgpa, cr)
                    return (
                        <div className="flex justify-center items-center w-full">
                            <span
                                className={`inline-flex items-center justify-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[11px] sm:text-[13px] font-bold tabular-nums ${chip}`}
                            >
                                {sgpa.toFixed(2)}
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
                    const failCount = Object.values(row.original.results)
                        .filter(r => r.grade === "F" || r.gradePoint === 0).length
                    if (failCount > 0) return (
                        <div className="flex justify-center items-center gap-1.5 w-full">
                            <XCircle className="w-3.5 h-3.5 shrink-0 text-ubit-faint" />
                            <span className="text-[12px] font-semibold text-ubit-muted">Fail <span className="text-ubit-faint">({failCount})</span></span>
                        </div>
                    )
                    return (
                        <div className="flex justify-center items-center gap-1.5 w-full">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#16A34A" }} />
                            <span className="text-[11px] sm:text-[12px] font-bold" style={{ color: "#15803D" }}>Pass</span>
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

    function thStickyClass(id: string) {
        if (id === "rank") return "bg-ubit-navy w-[52px] min-w-[52px] sm:w-[90px] sm:min-w-[90px] max-md:static sticky left-0 z-30 shadow-[1px_0_0_#1E293B]"
        if (id === "roll") return "bg-ubit-navy w-[120px] min-w-[120px] sm:w-[150px] sm:min-w-[150px] max-md:static max-md:shadow-none sticky left-[90px] z-30 shadow-[2px_0_0_#1E293B]"
        return ""
    }
    function tdStickyClass(id: string, bgClass: string) {
        if (id === "rank") return `${bgClass || "bg-white"} w-[52px] min-w-[52px] sm:w-[90px] sm:min-w-[90px] max-md:static sticky left-0 z-10 shadow-[1px_0_0_#F1F5F9]`
        if (id === "roll") return `${bgClass || "bg-white"} w-[120px] min-w-[120px] sm:w-[150px] sm:min-w-[150px] max-md:static max-md:shadow-none sticky left-[90px] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]`
        return ""
    }

    return (
        <div className="space-y-3">
            {/* Controls */}
            <div className="bg-white/95 pb-2 pt-0 z-10 relative">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-ubit-faint" />
                        <Input
                            placeholder="Search seat number..."
                            value={globalFilter}
                            onChange={e => setGlobalFilter(e.target.value)}
                            className="pl-9 h-9 border-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-slate-400 rounded-lg text-[13px] font-medium text-slate-700"
                        />
                    </div>
                    <Button
                        onClick={exportPDF}
                        className="w-full sm:w-auto h-9 font-semibold text-[13px] px-5 rounded-lg tracking-tight transition-all bg-ubit-navy text-white hover:bg-ubit-navymid"
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
                <div className="overflow-auto max-h-[70vh] w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
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
                                                <div className={`flex items-center ${["roll", "name"].includes(h.id) ? "justify-start" : "justify-center"} gap-1 w-full`}>
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
                                    const bgClass = rowBgClass(row.original.roll)
                                    return (
                                        <tr
                                            key={row.id}
                                            onClick={() => setSelectedStudent(row.original)}
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
                                    <td colSpan={columns.length} style={{ padding: "56px 0", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>
                                        <div className="flex flex-col items-center text-ubit-faint">
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
                    className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border-t border-slate-200 py-2 px-5 text-[11px] text-ubit-faint tracking-wider"
                >
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
