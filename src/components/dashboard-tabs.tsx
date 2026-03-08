"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResultTable } from "@/components/result-table"
import { CGPATable } from "@/components/cgpa-table"

import { semester1 } from "@/data/semester1"
import { semester2 } from "@/data/semester2"

export function DashboardTabs() {
    return (
        <Tabs defaultValue="semester2" className="w-full space-y-6">
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-100 py-2 -mx-2 sm:-mx-3 px-2 sm:px-3">
                <TabsList className="bg-zinc-100/80 border border-zinc-200 text-zinc-500 shadow-sm p-1.5 rounded-xl">
                    <TabsTrigger value="semester1" className="data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-md hover:text-zinc-900 rounded-lg transition-all font-bold tracking-tight px-6 sm:px-8 py-2 text-sm">
                        Semester I
                    </TabsTrigger>
                    <TabsTrigger value="semester2" className="data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-md hover:text-zinc-900 rounded-lg transition-all font-bold tracking-tight px-6 sm:px-8 py-2 text-sm">
                        Semester II
                    </TabsTrigger>
                    <TabsTrigger value="cumulative" className="data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-md hover:text-zinc-900 rounded-lg transition-all font-bold tracking-tight px-6 sm:px-8 py-2 text-sm">
                        Final Cumulative
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="semester1" className="space-y-4 outline-none data-[state=inactive]:hidden">
                <ResultTable data={semester1} allSemData={[semester1, semester2]} />
            </TabsContent>

            <TabsContent value="semester2" className="space-y-4 outline-none data-[state=inactive]:hidden">
                <ResultTable data={semester2} allSemData={[semester1, semester2]} />
            </TabsContent>

            <TabsContent value="cumulative" className="space-y-4 outline-none data-[state=inactive]:hidden">
                <CGPATable sem1Data={semester1} sem2Data={semester2} />
            </TabsContent>
        </Tabs>
    )
}
