"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResultTable } from "@/components/result-table"
import { CGPATable } from "@/components/cgpa-table"
import type { RawSemesterData } from "@/types"

interface DashboardTabsProps {
  semesters: RawSemesterData[];
}

export function DashboardTabs({ semesters }: DashboardTabsProps) {
  const defaultTab = semesters.length > 0
    ? semesters[semesters.length - 1].name.replace(/\s+/g, '')
    : "cumulative";

  const tabsList = (
    <TabsList className="bg-gray-200/60 p-1.5 rounded-xl flex items-center h-12 w-full md:w-auto overflow-x-auto no-scrollbar">
      {semesters.map((sem, idx) => (
        <TabsTrigger
          key={idx}
          value={sem.name.replace(/\s+/g, '')}
          className="
            relative px-5 py-2.5 text-[13px] font-bold tracking-tight rounded-lg whitespace-nowrap shrink-0
            text-gray-500 hover:text-gray-700
            data-[state=active]:bg-[#8F141B] data-[state=active]:text-white data-[state=active]:shadow-sm
            transition-all duration-200
          "
        >
          {sem.name.split(' ').slice(1).join(' ')}
        </TabsTrigger>
      ))}
      <TabsTrigger
        value="cumulative"
        className="
          relative px-5 py-2.5 text-[13px] font-bold tracking-tight rounded-lg whitespace-nowrap shrink-0
          text-gray-500 hover:text-gray-700
          data-[state=active]:bg-[#8F141B] data-[state=active]:text-white data-[state=active]:shadow-sm
          transition-all duration-200
        "
      >
        Final Cumulative
      </TabsTrigger>
    </TabsList>
  );

  return (
    <Tabs defaultValue={defaultTab} className="w-full relative z-10">
      {/* Tab panels */}
      {semesters.map((sem, idx) => (
        <TabsContent
          key={idx}
          value={sem.name.replace(/\s+/g, '')}
          className="outline-none data-[state=inactive]:hidden m-0"
        >
          <ResultTable data={sem} allSemData={semesters} tabsList={tabsList} />
        </TabsContent>
      ))}

      <TabsContent value="cumulative" className="outline-none data-[state=inactive]:hidden m-0">
        <CGPATable semesters={semesters} tabsList={tabsList} />
      </TabsContent>
    </Tabs>
  );
}
