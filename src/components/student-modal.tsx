"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { StudentRanking } from "@/lib/calculations"
import { Course } from "@/data/semester1"
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
import { Trophy, CheckCircle2, TrendingUp } from "lucide-react"

interface StudentModalProps {
    student: StudentRanking | null
    courses: Course[]
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function StudentModal({ student, courses, open, onOpenChange }: StudentModalProps) {

    const radarData = useMemo(() => {
        if (!student) return []
        return courses.map(course => {
            const mark = student.results[course.code]?.marks || 0
            return {
                subject: course.code,
                marks: mark,
                fullMarks: 100 // assuming 100 is max theory
            }
        })
    }, [student, courses])

    if (!student) return null

    // Aesthetics for Modal
    const isTopRanked = student.rank && student.rank <= 3
    const badgeColor = student.sgpa >= 3.8 ? "bg-amber-100 text-amber-800 border-amber-300 shadow-sm" :
        student.sgpa >= 3.0 ? "bg-emerald-100 text-emerald-800 border-emerald-300 shadow-sm" :
            "bg-slate-100 text-slate-800 border-slate-300"

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-slate-50/50 backdrop-blur-xl border-l-slate-200">
                <SheetHeader className="mb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <SheetTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">{student.name}</SheetTitle>
                            <SheetDescription className="text-slate-500 font-mono mt-1">
                                {student.roll}
                            </SheetDescription>
                        </div>
                        {student.rank && (
                            <div className="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 shrink-0">
                                <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Rank</span>
                                <span className="text-lg font-black text-indigo-600 leading-none mt-1">#{student.rank}</span>
                            </div>
                        )}
                    </div>
                </SheetHeader>

                <div className="space-y-6">

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                            <span className="text-sm font-semibold text-slate-500 mb-1">SGPA</span>
                            <Badge variant="outline" className={`text-xl px-3 py-1 ${badgeColor}`}>
                                {student.sgpa.toFixed(2)}
                            </Badge>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                            <span className="text-sm font-semibold text-slate-500 mb-1">Total Marks</span>
                            <span className="text-2xl font-black text-slate-800">{student.totalMarks}</span>
                        </div>
                    </div>

                    {/* Highlights */}
                    {isTopRanked && (
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center shadow-sm">
                            <Trophy className="w-6 h-6 text-amber-500 mr-3 shrink-0" />
                            <p className="text-sm font-medium text-amber-900 leading-tight">
                                Outstanding performance! This student ranks in the top 3 of the entire batch.
                            </p>
                        </div>
                    )}

                    {student.sgpa >= 2.0 && !isTopRanked && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 shrink-0" />
                            <p className="text-sm font-medium text-emerald-900 leading-tight">
                                Passed semester successfully in good standing.
                            </p>
                        </div>
                    )}

                    {/* Radar Chart */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-4 h-4 text-indigo-500" />
                            <h3 className="font-bold text-slate-800 text-sm">Subject Strengths</h3>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#4f46e5', fontWeight: 600 }}
                                    />
                                    <Radar
                                        name="Marks"
                                        dataKey="marks"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        fill="#818cf8"
                                        fillOpacity={0.4}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Detailed Course Breakdown */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                            <h3 className="font-bold text-slate-800 text-sm">Course Breakdown</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {courses.map(course => {
                                const res = student.results[course.code]
                                return (
                                    <div key={course.code} className="flex items-center justify-between p-3 px-4 hover:bg-slate-50/50 transition-colors">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm text-slate-900">{course.code}</span>
                                            <span className="text-xs text-slate-500 truncate max-w-[150px] sm:max-w-[200px]" title={course.name}>{course.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono font-bold text-slate-700">{res ? res.marks : "-"}</span>
                                            <Badge variant="outline" className={`w-8 justify-center rounded uppercase text-[10px] tracking-widest ${!res ? 'bg-slate-100 text-slate-400' :
                                                res.grade.startsWith('A') ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                                                    res.grade.startsWith('B') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                        res.grade.startsWith('C') ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                            'bg-red-50 text-red-700 border-red-200'
                                                }`}>
                                                {res ? res.grade : "-"}
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
