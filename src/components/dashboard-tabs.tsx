"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResultTable } from "@/components/result-table"
import { CGPATable } from "@/components/cgpa-table"

import { semester1 } from "@/data/semester1"
import { semester2 } from "@/data/semester2"

export function DashboardTabs() {
    return (
        <Tabs defaultValue="semester2" className="w-full space-y-6">
            <div className="flex justify-center sm:justify-start">
                <TabsList className="bg-white border text-slate-800 shadow-sm p-1 rounded-lg">
                    <TabsTrigger value="semester1" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all font-medium px-4 sm:px-6">
                        Semester I
                    </TabsTrigger>
                    <TabsTrigger value="semester2" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all font-medium px-4 sm:px-6">
                        Semester II
                    </TabsTrigger>
                    <TabsTrigger value="cumulative" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all font-medium px-4 sm:px-6">
                        Final Cumulative
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="semester1" className="space-y-4 outline-none data-[state=inactive]:hidden">
                <ResultTable data={semester1} />
            </TabsContent>

            <TabsContent value="semester2" className="space-y-4 outline-none data-[state=inactive]:hidden">
                <ResultTable data={semester2} />
            </TabsContent>

            <TabsContent value="cumulative" className="space-y-4 outline-none data-[state=inactive]:hidden">
                <CGPATable sem1Data={semester1} sem2Data={semester2} />
            </TabsContent>
        </Tabs>
    )
}
