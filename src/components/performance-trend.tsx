"use client";

import { useMemo } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine
} from "recharts";
import { TrendingUp, Activity, Target } from "lucide-react";
import type { SemesterRecord } from "@/types";

interface PerformanceTrendProps {
  semesters: SemesterRecord[];
  cgpa: number;
}

/**
 * PerformanceTrend — A high-end visualization of a student's SGPA over time.
 * Uses Recharts AreaChart for a premium "filled line" aesthetic with
 * institutional maroon/blue accents.
 */
export function PerformanceTrend({ semesters, cgpa }: PerformanceTrendProps) {
  const chartData = useMemo(() => {
    return semesters
      .sort((a, b) => a.semesterNum - b.semesterNum)
      .map(sem => ({
        name: `Sem ${sem.semesterNum}`,
        fullName: sem.semesterName,
        sgpa: sem.sgpa,
        credits: sem.totalCredits
      }));
  }, [semesters]);

  if (semesters.length < 2) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Activity className="w-6 h-6 text-slate-300" />
        </div>
        <h3 className="text-[15px] font-black text-[#1f2432] mb-1">Trajectory Data Pending</h3>
        <p className="text-[12px] text-gray-500 font-medium max-w-[240px]">
          We need at least two semesters of active result data to generate a performance trend visualization.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-4.5 h-4.5 text-[#8F141B]" />
          </div>
          <div>
            <h3 className="text-[15px] font-black text-[#1f2432] tracking-tight">Academic Trajectory</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Performance over Time</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <Target className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Target: 4.0</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="p-6 h-[280px] sm:h-[320px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSgpa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8F141B" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#8F141B" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 800, fill: "#94a3b8" }}
              dy={10}
            />
            <YAxis 
              domain={[0, 4.0]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
              dx={-5}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{data.fullName}</p>
                      <div className="flex items-end gap-1.5">
                        <span className="text-[20px] font-black text-white leading-none">{data.sgpa.toFixed(2)}</span>
                        <span className="text-[10px] font-bold text-[#34d399] mb-0.5 uppercase tracking-wider">SGPA</span>
                      </div>
                      <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-widest">Laden with {data.credits} Credits</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine 
              y={cgpa} 
              stroke="#0056D2" 
              strokeDasharray="4 4" 
              strokeOpacity={0.4}
              label={{ 
                position: 'right', 
                value: `CGPA: ${cgpa.toFixed(2)}`, 
                fill: '#0056D2', 
                fontSize: 9, 
                fontWeight: 800,
                offset: 10
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="sgpa" 
              stroke="#8F141B" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorSgpa)" 
              animationDuration={1500}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#8F141B" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insight Footer */}
      <div className="bg-slate-50 border-t border-gray-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#0056D2] animate-pulse" />
          <p className="text-[11px] font-bold text-slate-500">
            Horizontal blue line indicates steady state <span className="text-[#1f2432] font-black">CGPA Reference</span>
          </p>
        </div>
      </div>
    </div>
  );
}
