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
import { Badge } from "@/components/ui/badge"
import { Download, Search, CheckCircle2, ChevronUp, ChevronDown } from "lucide-react"

interface CGPATableProps {
    sem1Data: SemesterData;
    sem2Data: SemesterData;
}

export function CGPATable({ sem1Data, sem2Data }: CGPATableProps) {
    const [sorting, setSorting] = useState<SortingState>([{ id: "rank", desc: false }])
    const [globalFilter, setGlobalFilter] = useState("")
    const printRef = useRef<HTMLDivElement>(null)
    const [currentDate, setCurrentDate] = useState("")

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString())
    }, [])

    const rankedStudents = useMemo(() => calculateCGPARankings(sem1Data, sem2Data), [sem1Data, sem2Data])

    const columns = useMemo<ColumnDef<CGPARanking>[]>(() => {
        return [
            {
                accessorKey: "rank",
                header: "Final Rank",
                cell: ({ row }) => {
                    const rank = row.getValue("rank") as number
                    let color = "bg-slate-100 text-slate-800"
                    if (rank === 1) color = "bg-amber-100 text-amber-800 font-bold border-amber-300"
                    else if (rank === 2) color = "bg-slate-200 text-slate-700 font-bold border-slate-400"
                    else if (rank === 3) color = "bg-orange-100 text-orange-800 font-bold border-orange-300"
                    return <Badge variant="outline" className={color}>#{rank}</Badge>
                },
            },
            {
                accessorKey: "roll",
                header: "Roll Number",
                cell: ({ row }) => <span className="font-medium text-slate-700">{row.getValue("roll")}</span>,
            },
            {
                accessorKey: "name",
                header: "Student Name",
                cell: ({ row }) => <span className="font-semibold text-slate-900">{row.getValue("name")}</span>,
            },
            {
                accessorKey: "sem1SGPA",
                header: "Sem 1 SGPA",
                cell: ({ row }) => {
                    const sgpa = row.getValue("sem1SGPA") as number
                    if (sgpa === 0) return <span className="text-gray-400 font-mono text-sm pl-2">-</span>
                    return <span className="font-medium text-slate-700">{sgpa.toFixed(2)}</span>
                },
            },
            {
                accessorKey: "sem2SGPA",
                header: "Sem 2 SGPA (Partial)",
                cell: ({ row }) => {
                    const sgpa = row.getValue("sem2SGPA") as number
                    if (sgpa === 0) return <span className="text-gray-400 font-mono text-sm pl-2">-</span>
                    return <span className="font-medium text-slate-700">{sgpa.toFixed(2)}</span>
                },
            },
            {
                accessorKey: "totalMarks",
                header: "Grand Total Marks",
                cell: ({ row }) => <span className="font-bold text-slate-700">{row.getValue("totalMarks")}</span>
            },
            {
                accessorKey: "cgpa",
                header: "Cumulative GPA",
                cell: ({ row }) => {
                    const cgpa = row.getValue("cgpa") as number
                    const badgeColor = cgpa >= 3.8 ? "bg-amber-100 text-amber-800 border-amber-300" :
                        cgpa >= 3.0 ? "bg-emerald-100 text-emerald-800 border-emerald-300" :
                            cgpa >= 2.0 ? "bg-blue-100 text-blue-800 border-blue-300" : "bg-red-100 text-red-800 border-red-300"
                    return <Badge variant="outline" className={`shadow-xs font-bold ${badgeColor}`}>{cgpa.toFixed(2)}</Badge>
                },
            },
            {
                id: "status",
                header: "Status",
                cell: ({ row }) => {
                    const cgpa = row.original.cgpa
                    if (cgpa >= 2.0) return <span className="flex items-center text-emerald-600 text-sm font-semibold"><CheckCircle2 className="w-4 h-4 mr-1.5" /> Pass</span>
                    return <span className="text-red-600 text-sm font-semibold">Fail</span>
                }
            }
        ]
    }, [])

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
            filename: `UBIT_Cumulative_Result.pdf`,
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        }).from(element).save()
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full sm:max-w-md shrink-0">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search for student name or roll number..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 rounded-lg"
                    />
                </div>
                <Button onClick={exportPDF} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all">
                    <Download className="w-4 h-4 mr-2" /> Download Cumulative PDF
                </Button>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden" ref={printRef}>

                {/* PDF Header - Visible purely for PDF export and clean display */}
                <div className="p-8 text-center border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{sem1Data.university}</h1>
                    <h2 className="text-xl font-bold text-indigo-700 mt-2">Cumulative Final Result</h2>
                    <div className="inline-flex items-center justify-center mt-3 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                        <span className="text-sm font-semibold text-slate-600">Batch {sem1Data.batch}</span>
                    </div>
                </div>

                <div className="overflow-x-auto relative max-h-[700px] styled-scrollbar">
                    <table className="w-full text-sm text-left align-middle border-separate border-spacing-0">
                        <thead className="bg-slate-50 text-slate-600 font-semibold sticky top-0 z-30 shadow-sm shadow-slate-200/50">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => {
                                        const isRank = header.id === "rank";
                                        const isName = header.id === "name";
                                        const stickyClasses = isRank ? "sticky left-0 z-40 bg-slate-50 w-[90px] min-w-[90px] shadow-[1px_0_0_0_#e2e8f0]" :
                                            isName ? "sticky left-[90px] z-40 bg-slate-50 w-[220px] min-w-[220px] shadow-[1px_0_0_0_#e2e8f0]" : "bg-slate-50";
                                        return (
                                            <th
                                                key={header.id}
                                                className={`px-5 py-4 cursor-pointer hover:bg-slate-100 transition-colors select-none group border-b border-slate-200 ${stickyClasses}`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                <div className="flex items-center gap-1 whitespace-nowrap">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    <span className={`inline-flex flex-col transition-opacity ${header.column.getIsSorted() ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}>
                                                        {header.column.getIsSorted() === "asc" ? (
                                                            <ChevronUp className="w-4 h-4 text-indigo-600" />
                                                        ) : header.column.getIsSorted() === "desc" ? (
                                                            <ChevronDown className="w-4 h-4 text-indigo-600" />
                                                        ) : (
                                                            <div className="w-4 h-4" />
                                                        )}
                                                    </span>
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-slate-100/80">
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map(row => {
                                    const rank = row.original.rank || 0;
                                    const rowBg = rank === 1 ? "bg-amber-50 hover:bg-amber-100/60" :
                                        rank === 2 ? "bg-slate-100 hover:bg-slate-200/60" :
                                            rank === 3 ? "bg-orange-50 hover:bg-orange-100/60" : "bg-white hover:bg-slate-50";

                                    const stickyBg = rank === 1 ? "bg-amber-50" :
                                        rank === 2 ? "bg-slate-100" :
                                            rank === 3 ? "bg-orange-50" : "bg-white";

                                    const stickyHoverBg = rank === 1 ? "group-hover/row:bg-[#fef3c7]" :
                                        rank === 2 ? "group-hover/row:bg-[#e2e8f0]" :
                                            rank === 3 ? "group-hover/row:bg-[#ffedd5]" : "group-hover/row:bg-slate-50";

                                    return (
                                        <tr
                                            key={row.id}
                                            className={`transition-colors group/row ${rowBg}`}
                                        >
                                            {row.getVisibleCells().map(cell => {
                                                const isRank = cell.column.id === "rank";
                                                const isName = cell.column.id === "name";
                                                const stickyClasses = isRank ? `sticky left-0 z-20 w-[90px] min-w-[90px] ${stickyBg} ${stickyHoverBg} border-b border-slate-200/60 shadow-[1px_0_0_0_#f1f5f9] transition-colors` :
                                                    isName ? `sticky left-[90px] z-20 w-[220px] min-w-[220px] ${stickyBg} ${stickyHoverBg} border-b border-slate-200/60 shadow-[1px_0_0_0_#f1f5f9] transition-colors` : "border-b border-slate-100";
                                                return (
                                                    <td key={cell.id} className={`px-5 py-3.5 whitespace-nowrap ${stickyClasses}`}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-5 py-12 text-center border-b border-slate-100">
                                        <div className="flex flex-col items-center justify-center text-slate-500">
                                            <Search className="h-8 w-8 text-slate-300 mb-3" />
                                            <p className="text-base font-medium text-slate-900">No students found</p>
                                            <p className="text-sm mt-1">We couldn&apos;t find anyone matching your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer info for PDF context */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 font-medium text-center">
                    Generated automatically by University Cumulative Result Dashboard{currentDate ? ` - ${currentDate}` : ""}
                </div>
            </div>
        </div>
    )
}
