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
import { calculateCGPARankings, CGPARanking } from "@/lib/calculations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Search, CheckCircle2, XCircle, ChevronUp, ChevronDown } from "lucide-react"

// ── Same design tokens as result-table ──────────────────────────
const C = {
    navy: "#0F172A",
    navyMid: "#1E293B",
    ink: "#1E293B",
    muted: "#64748B",
    faint: "#94A3B8",
    line: "#E2E8F0",
    gold: "#8A6E14",
    silver: "#4B6280",
    bronze: "#6B4B28",
    goldRow: "rgba(138,110,20,0.04)",
    silverRow: "rgba(75,98,128,0.04)",
    bronzeRow: "rgba(107,75,40,0.04)",
}

// ── Same medal SVGs as result-table ────────────────────────────
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

function MedalBadge({ rank }: { rank: number }) {
    const num = String(rank).padStart(2, "0")
    if (rank === 1) return (
        <div className="flex items-center gap-2">
            <span style={{ background: C.gold }} className="flex items-center justify-center w-6 h-6 rounded-md shrink-0">
                <CrownIcon className="w-3.5 h-3.5 text-white" />
            </span>
            <span style={{ color: C.gold }} className="font-bold text-[15px] tabular-nums">{num}</span>
        </div>
    )
    if (rank === 2) return (
        <div className="flex items-center gap-2">
            <span style={{ background: C.silver }} className="flex items-center justify-center w-6 h-6 rounded-md shrink-0">
                <DiamondIcon className="w-3 h-3 text-white" />
            </span>
            <span style={{ color: C.silver }} className="font-bold text-[15px] tabular-nums">{num}</span>
        </div>
    )
    if (rank === 3) return (
        <div className="flex items-center gap-2">
            <span style={{ background: C.bronze }} className="flex items-center justify-center w-6 h-6 rounded-md shrink-0">
                <ShieldIcon className="w-3 h-3 text-white" />
            </span>
            <span style={{ color: C.bronze }} className="font-bold text-[15px] tabular-nums">{num}</span>
        </div>
    )
    return <span className="font-medium text-[14px] text-slate-400 tabular-nums pl-8">{num}</span>
}

// ── Props ──────────────────────────────────────────────────────
interface CGPATableProps {
    sem1Data: SemesterData
    sem2Data: SemesterData
}

export function CGPATable({ sem1Data, sem2Data }: CGPATableProps) {
    const [sorting, setSorting] = useState<SortingState>([{ id: "rank", desc: false }])
    const [globalFilter, setGlobalFilter] = useState("")
    const printRef = useRef<HTMLDivElement>(null)
    const [currentDate, setCurrentDate] = useState("")

    useEffect(() => { setCurrentDate(new Date().toLocaleDateString()) }, [])

    const rankedStudents = useMemo(() => calculateCGPARankings(sem1Data, sem2Data), [sem1Data, sem2Data])

    const columns = useMemo<ColumnDef<CGPARanking>[]>(() => [
        {
            accessorKey: "rank",
            header: () => <Th>Final Rank</Th>,
            cell: ({ row }) => <MedalBadge rank={row.getValue("rank") as number} />,
        },
        {
            accessorKey: "roll",
            header: () => <Th>Roll No.</Th>,
            cell: ({ row }) => (
                <span className="font-mono text-[11px] font-medium tracking-wide" style={{ color: C.faint }}>
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
        {
            accessorKey: "sem1SGPA",
            header: () => <Th>Sem 1 SGPA</Th>,
            cell: ({ row }) => {
                const v = row.getValue("sem1SGPA") as number
                return v === 0
                    ? <span style={{ color: C.faint }}>–</span>
                    : <span className="font-semibold text-[13px] tabular-nums" style={{ color: C.ink }}>{v.toFixed(2)}</span>
            },
        },
        {
            accessorKey: "sem2SGPA",
            header: () => <Th>Sem 2 SGPA</Th>,
            cell: ({ row }) => {
                const v = row.getValue("sem2SGPA") as number
                return v === 0
                    ? <span style={{ color: C.faint }}>–</span>
                    : <span className="font-semibold text-[13px] tabular-nums" style={{ color: C.ink }}>{v.toFixed(2)}</span>
            },
        },
        {
            accessorKey: "totalMarks",
            header: () => <Th>Grand Total</Th>,
            cell: ({ row }) => (
                <span className="font-semibold text-[14px] tabular-nums" style={{ color: C.ink }}>
                    {row.getValue("totalMarks")}
                </span>
            ),
        },
        {
            accessorKey: "cgpa",
            header: () => <Th>Cumulative GPA</Th>,
            cell: ({ row }) => {
                const cgpa = row.getValue("cgpa") as number
                const rank = row.original.rank || 0
                const chipStyle =
                    rank === 1 ? { background: C.gold, color: "#fff" } :
                        rank === 2 ? { background: C.silver, color: "#fff" } :
                            rank === 3 ? { background: C.bronze, color: "#fff" } :
                                cgpa >= 3.8 ? { background: C.navy, color: "#fff" } :
                                    cgpa >= 2.0 ? { background: "#F1F5F9", color: C.ink, border: "1px solid #CBD5E1" } :
                                        { background: "#FFF1F2", color: "#E11D48", border: "1px solid #FECDD3" }
                return (
                    <span
                        style={chipStyle}
                        className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[13px] font-bold tabular-nums"
                    >
                        {cgpa.toFixed(2)}
                    </span>
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
                    <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: C.muted }} />
                        <span className="text-[12px] font-semibold" style={{ color: C.muted }}>Pass</span>
                    </div>
                )
                return (
                    <div className="flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 shrink-0" style={{ color: C.faint }} />
                        <span className="text-[12px] font-semibold" style={{ color: C.muted }}>Fail</span>
                    </div>
                )
            },
        },
    ], [])

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
    function rowBg(rank: number) {
        if (rank === 1) return C.goldRow
        if (rank === 2) return C.silverRow
        if (rank === 3) return C.bronzeRow
        return "transparent"
    }

    // Sticky col px offsets — rank(90) + roll(130) + name(190)
    function thSticky(id: string): React.CSSProperties {
        if (id === "rank") return { position: "sticky", left: 0, zIndex: 40, width: 90, minWidth: 90, background: C.navy }
        if (id === "roll") return { position: "sticky", left: 90, zIndex: 40, width: 130, minWidth: 130, background: C.navy, boxShadow: "1px 0 0 #1E293B" }
        if (id === "name") return { position: "sticky", left: 220, zIndex: 40, width: 220, minWidth: 220, background: C.navy, boxShadow: "2px 0 0 #1E293B" }
        return {}
    }
    function tdSticky(id: string, bg: string): React.CSSProperties {
        if (id === "rank") return { position: "sticky", left: 0, zIndex: 20, width: 90, minWidth: 90, background: bg }
        if (id === "roll") return { position: "sticky", left: 90, zIndex: 20, width: 130, minWidth: 130, background: bg, boxShadow: "1px 0 0 #F1F5F9" }
        if (id === "name") return { position: "sticky", left: 220, zIndex: 20, width: 220, minWidth: 220, background: bg, boxShadow: "2px 0 0 #F1F5F9" }
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

                <div style={{ overflowX: "auto", overflowY: "clip" }}>
                    <table className="w-full text-sm text-left align-middle border-separate border-spacing-0">

                        {/* Dark navy sticky header */}
                        <thead style={{ position: "sticky", top: 0, zIndex: 20 }}>
                            {table.getHeaderGroups().map(hg => (
                                <tr key={hg.id} style={{ background: C.navy }}>
                                    {hg.headers.map(h => {
                                        const sortable = h.column.getCanSort()
                                        return (
                                            <th
                                                key={h.id}
                                                style={{
                                                    ...thSticky(h.id),
                                                    borderBottom: `1px solid ${C.navyMid}`,
                                                    padding: "10px 16px",
                                                    userSelect: "none",
                                                    cursor: sortable ? "pointer" : "default",
                                                    background: thSticky(h.id).background || C.navy,
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
                                    const rank = row.original.rank || 0
                                    const bg = rowBg(rank) === "transparent" ? "#fff" : rowBg(rank)
                                    return (
                                        <tr
                                            key={row.id}
                                            style={{ background: bg }}
                                            className="group/row transition-colors hover:bg-slate-50"
                                        >
                                            {row.getVisibleCells().map(cell => (
                                                <td
                                                    key={cell.id}
                                                    style={{
                                                        ...tdSticky(cell.column.id, bg),
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
                                            <p className="text-[13px] font-semibold" style={{ color: C.ink }}>No students found</p>
                                            <p className="text-[11px] mt-0.5">Try adjusting your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer — legend + date */}
                <div style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "8px 20px", fontSize: 11, color: C.faint, letterSpacing: "0.06em", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
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
                    <span>{sem1Data.university} · {currentDate || "—"}</span>
                </div>
            </div>


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
