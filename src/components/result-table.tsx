"use client"

import { useState, useMemo, useRef } from "react"
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
import { calculateRankings, StudentRanking } from "@/lib/calculations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Search, CheckCircle2, ChevronUp, ChevronDown } from "lucide-react"

// @ts-expect-error - html2pdf.js does not provide native generic typescript types
import html2pdf from "html2pdf.js"

interface ResultTableProps {
    data: SemesterData
}

export function ResultTable({ data }: ResultTableProps) {
    const [sorting, setSorting] = useState<SortingState>([{ id: "rank", desc: false }])
    const [globalFilter, setGlobalFilter] = useState("")
    const printRef = useRef<HTMLDivElement>(null)

    const rankedStudents = useMemo(() => calculateRankings(data.courses, data.students), [data])

    const columns = useMemo<ColumnDef<StudentRanking>[]>(() => {
        const baseCols: ColumnDef<StudentRanking>[] = [
            {
                accessorKey: "rank",
                header: "Rank",
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
        ]

        const courseCols = data.courses.map((course): ColumnDef<StudentRanking> => ({
            id: course.code,
            header: course.code,
            accessorFn: (row) => row.results[course.code],
            cell: ({ getValue }) => {
                const res = getValue() as { marks: number; grade: string } | undefined
                if (!res) return <span className="text-gray-400 font-mono text-sm pl-2">-</span>
                return (
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-bold text-slate-900">{res.marks}</span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-widest mt-1">
                            {res.grade}
                        </span>
                    </div>
                )
            },
            sortingFn: (rowA, rowB, columnId) => {
                const a = rowA.original.results[columnId]?.marks || 0
                const b = rowB.original.results[columnId]?.marks || 0
                return a - b
            }
        }))

        const endCols: ColumnDef<StudentRanking>[] = [
            {
                accessorKey: "totalMarks",
                header: "Total",
                cell: ({ row }) => <span className="font-bold text-slate-700">{row.getValue("totalMarks")}</span>
            },
            {
                accessorKey: "sgpa",
                header: "SGPA",
                cell: ({ row }) => {
                    const sgpa = row.getValue("sgpa") as number
                    return <Badge variant={sgpa >= 2.0 ? "default" : "destructive"} className="shadow-xs">{sgpa.toFixed(2)}</Badge>
                },
            },
            {
                id: "status",
                header: "Status",
                cell: ({ row }) => {
                    const sgpa = row.original.sgpa
                    if (sgpa >= 2.0) return <span className="flex items-center text-emerald-600 text-sm font-semibold"><CheckCircle2 className="w-4 h-4 mr-1.5" /> Pass</span>
                    return <span className="text-red-600 text-sm font-semibold">Fail</span>
                }
            }
        ]

        return [...baseCols, ...courseCols, ...endCols]
    }, [data.courses])

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

    const exportPDF = () => {
        const element = printRef.current
        if (!element) return

        const opt = {
            margin: 0.3,
            filename: `${data.batch.replace(/[^a-zA-Z0-9]/g, "_")}_Result.pdf`,
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        }

        html2pdf().set(opt).from(element).save()
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
                    <Download className="w-4 h-4 mr-2" /> Download Result PDF
                </Button>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden" ref={printRef}>

                {/* PDF Header - Visible purely for PDF export and clean display */}
                <div className="p-8 text-center border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{data.university}</h1>
                    <h2 className="text-xl font-bold text-indigo-700 mt-2">{data.name}</h2>
                    <div className="inline-flex items-center justify-center mt-3 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                        <span className="text-sm font-semibold text-slate-600">Batch {data.batch}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left align-middle">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-5 py-4 cursor-pointer hover:bg-slate-100 transition-colors select-none group"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <div className="flex items-center gap-1 whitespace-nowrap">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                <span className="inline-flex flex-col opacity-0 group-hover:opacity-50 aria-[sort=true]:opacity-100 transition-opacity" aria-sort={header.column.getIsSorted() ? "true" : "false"}>
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
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map(row => {
                                    const rank = row.original.rank || 0;
                                    return (
                                        <tr
                                            key={row.id}
                                            className={`transition-colors hover:bg-slate-50/80 ${rank === 1 ? "bg-amber-50/40 hover:bg-amber-50/60" :
                                                    rank === 2 ? "bg-slate-50/80" :
                                                        rank === 3 ? "bg-orange-50/30" : ""
                                                }`}
                                        >
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id} className="px-5 py-3.5 whitespace-nowrap">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-5 py-12 text-center">
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
                    Generated automatically by University Semester Result Dashboard - {new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    )
}
