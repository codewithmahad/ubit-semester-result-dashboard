"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Medal, 
  ArrowUpRight, 
  Filter, 
  Download,
  Activity
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const gpaData = [
    { range: "4.0", count: 12 },
    { range: "3.7-3.9", count: 45 },
    { range: "3.3-3.6", count: 120 },
    { range: "3.0-3.2", count: 180 },
    { range: "2.5-2.9", count: 240 },
    { range: "2.0-2.4", count: 154 },
    { range: "< 2.0", count: 42 },
  ];

  const batchPerformance = [
    { name: "BSSE-25 (M)", gpa: 3.42 },
    { name: "BSSE-25 (E)", gpa: 3.15 },
    { name: "BSCS-24 (M)", gpa: 3.32 },
    { name: "BSCS-24 (E)", gpa: 3.08 },
    { name: "BSSE-23 (M)", gpa: 3.51 },
  ];

  const COLORS = ["#0F172A", "#8F141B", "#1e293b", "#334155", "#475569"];

  return (
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Institutional Analytics
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Academic pulse and performance metrics for all departments.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <Download className="w-4 h-4" />
              Download Report
           </button>
           <button className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-[13px] font-bold shadow-lg flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Custom Range
           </button>
        </div>
      </header>

      {/* Analytics Overview Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        
        {/* GPA Distribution Chart */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-[18px] font-black text-[#0F172A] tracking-tight">GPA Distribution</h3>
                 <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest mt-1">Global Standing</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                 <TrendingUp className="w-5 h-5" />
              </div>
           </div>
           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={gpaData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                       dataKey="range" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                    />
                    <Tooltip 
                       contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", fontSize: "12px", fontWeight: "700" }}
                       cursor={{ fill: "#f8fafc" }}
                    />
                    <Bar dataKey="count" fill="#0F172A" radius={[6, 6, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Batch-wise Performance */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-[18px] font-black text-[#0F172A] tracking-tight">Batch comparison</h3>
                 <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest mt-1">Avg. CGPA per Cohort</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                 <Medal className="w-5 h-5" />
              </div>
           </div>
           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={batchPerformance} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <defs>
                       <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8F141B" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#8F141B" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                    />
                    <YAxis 
                       domain={[0, 4.0]}
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                    />
                    <Tooltip 
                       contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", fontSize: "12px", fontWeight: "700" }}
                    />
                    <Area type="monotone" dataKey="gpa" stroke="#8F141B" strokeWidth={3} fillOpacity={1} fill="url(#colorGpa)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top Performers Card */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[20px] font-black tracking-tighter text-[#0F172A]">Institutional Top Performers</h3>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Live Ranking</span>
              </div>
           </div>
           
           <div className="space-y-4">
              {[
                { name: "Kazim Hussain", batch: "BSSE-25 (E)", gpa: 3.84, rank: 1 },
                { name: "Kaaif Ahmed Khan", batch: "BSSE-25 (M)", gpa: 3.72, rank: 2 },
                { name: "Syed Azfar Abbas", batch: "BSCS-24 (M)", gpa: 3.91, rank: 1 },
              ].map((perf, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-[#8F141B]/20 transition-all group cursor-default">
                   <div className="flex items-center gap-5">
                      <div className="text-[18px] font-black text-slate-300 group-hover:text-[#8F141B] transition-colors">#{perf.rank}</div>
                      <div>
                         <p className="text-[15px] font-bold text-[#0F172A]">{perf.name}</p>
                         <p className="text-[12px] text-slate-400 font-medium uppercase tracking-widest">{perf.batch}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[20px] font-black text-[#0F172A]">{perf.gpa.toFixed(2)}</p>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">GPA Index</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Global Health Card */}
        <div className="bg-[#0F172A] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 flex flex-col h-full">
              <Activity className="w-10 h-10 text-[#8F141B] mb-8" />
              <h3 className="text-[22px] font-black tracking-tight mb-4 leading-tight">Academic Health is Optimal</h3>
              <p className="text-[14px] text-slate-400 font-medium leading-relaxed mb-10">
                 Current data indicates a **14% year-over-year** increase in average CGPA across Software Engineering cohorts.
              </p>
              
              <div className="mt-auto space-y-6">
                 <div>
                    <div className="flex justify-between text-[12px] font-black uppercase tracking-widest text-slate-500 mb-2">
                       <span>Data Sync Velocity</span>
                       <span>98%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-[#8F141B] rounded-full" style={{ width: "98%" }} />
                    </div>
                 </div>
                 
                 <button className="w-full py-4 bg-white text-[#0F172A] rounded-2xl text-[14px] font-black tracking-widest uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                    Generate Full Audit
                 </button>
              </div>
           </div>
           
           {/* Visual Decor */}
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#8F141B]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

      </div>

    </main>
  );
}
