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

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      {/* Sticky tab bar */}
      <div className="sticky top-[60px] md:top-[68px] z-40 bg-white border-b border-gray-100 px-4 sm:px-6">
        <TabsList className="bg-transparent border-0 shadow-none p-0 gap-1 h-auto flex items-end max-sm:overflow-x-auto max-sm:no-scrollbar">
          {semesters.map((sem, idx) => (
            <TabsTrigger
              key={idx}
              value={sem.name.replace(/\s+/g, '')}
              className="
                relative px-4 sm:px-6 py-4 text-[12px] sm:text-[13px] font-bold tracking-tight 
                text-gray-400 rounded-none border-0 shadow-none bg-transparent
                data-[state=active]:text-[#1f2432] data-[state=active]:bg-transparent data-[state=active]:shadow-none
                hover:text-[#1f2432] transition-colors whitespace-nowrap shrink-0
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px]
                after:bg-[#8F141B] after:scale-x-0 after:transition-transform after:duration-200
                data-[state=active]:after:scale-x-100
              "
            >
              {sem.name.split(' ').slice(1).join(' ')}
            </TabsTrigger>
          ))}
          <TabsTrigger
            value="cumulative"
            className="
              relative px-4 sm:px-6 py-4 text-[12px] sm:text-[13px] font-bold tracking-tight
              text-gray-400 rounded-none border-0 shadow-none bg-transparent
              data-[state=active]:text-[#1f2432] data-[state=active]:bg-transparent data-[state=active]:shadow-none
              hover:text-[#1f2432] transition-colors whitespace-nowrap shrink-0
              after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px]
              after:bg-[#8F141B] after:scale-x-0 after:transition-transform after:duration-200
              data-[state=active]:after:scale-x-100
            "
          >
            Final Cumulative
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Tab panels */}
      {semesters.map((sem, idx) => (
        <TabsContent
          key={idx}
          value={sem.name.replace(/\s+/g, '')}
          className="outline-none data-[state=inactive]:hidden m-0"
        >
          <ResultTable data={sem} allSemData={semesters} />
        </TabsContent>
      ))}

      <TabsContent value="cumulative" className="outline-none data-[state=inactive]:hidden m-0">
        <CGPATable semesters={semesters} />
      </TabsContent>
    </Tabs>
  );
}
