"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResultTable } from "@/components/result-table"
import { CGPATable } from "@/components/cgpa-table"
import type { RawSemesterData } from "@/types"

interface DashboardTabsProps {
  semesters: RawSemesterData[];
}

export function DashboardTabs({ semesters }: DashboardTabsProps) {
    const defaultTab = semesters.length > 0 ? semesters[semesters.length - 1].name.replace(/\s+/g, '') : "cumulative";

    return (
        <Tabs defaultValue={defaultTab} className="w-full space-y-6">
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-100 py-2 -mx-2 sm:-mx-3 px-2 sm:px-3">
                <TabsList className="bg-zinc-100/80 border border-zinc-200 text-zinc-500 shadow-sm p-1.5 rounded-xl max-sm:flex max-sm:w-full max-sm:overflow-x-auto max-sm:no-scrollbar max-sm:justify-start max-sm:items-center">
                    {semesters.map((sem, idx) => (
                      <TabsTrigger key={idx} value={sem.name.replace(/\s+/g, '')} className="data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-md hover:text-zinc-900 rounded-lg font-bold tracking-tight px-6 sm:px-8 py-2 text-sm max-sm:text-xs max-sm:px-5 whitespace-nowrap shrink-0">
                          {sem.name.split(' ').slice(1).join(' ')}
                      </TabsTrigger>
                    ))}
                    <TabsTrigger value="cumulative" className="data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-md hover:text-zinc-900 rounded-lg font-bold tracking-tight px-6 sm:px-8 py-2 text-sm max-sm:text-xs max-sm:px-5 whitespace-nowrap shrink-0">
                        Final Cumulative
                    </TabsTrigger>
                </TabsList>
            </div>

            {semesters.map((sem, idx) => (
              <TabsContent key={idx} value={sem.name.replace(/\s+/g, '')} className="space-y-4 outline-none data-[state=inactive]:hidden">
                  <ResultTable data={sem} allSemData={semesters} />
              </TabsContent>
            ))}

            <TabsContent value="cumulative" className="space-y-4 outline-none data-[state=inactive]:hidden">
                <CGPATable semesters={semesters} />
            </TabsContent>
        </Tabs>
    )
}
